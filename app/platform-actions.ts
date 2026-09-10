"use server";

import { createClient } from "@/lib/supabase/server";
import { roleFromUser } from "@/lib/auth";
import type { UserRole } from "@/lib/session";
import { isDuplicateCheckIn } from "@/lib/authorization";

type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

type Attendee = {
  id: string;
  first_name: string;
  last_name: string;
  organization: string;
  role: UserRole;
  qr_code: string | null;
  email?: string;
};

async function authorized(roles: UserRole[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = user ? roleFromUser(user) : null;
  return role && roles.includes(role) ? supabase : null;
}

export async function getProgrammeSessions(): Promise<ActionResult<unknown[]>> {
  const supabase = await authorized([
    "OAK Staff",
    "Presenter",
    "Observer",
    "Coordination Team",
  ]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { data, error } = await supabase
    .from("program_sessions")
    .select(
      "id, title, speaker, start_time, end_time, location, category, day_number",
    )
    .order("start_time");
  return error
    ? { ok: false, error: "Programme could not be loaded." }
    : { ok: true, data: data ?? [] };
}

export async function getPartners(): Promise<ActionResult<unknown[]>> {
  const supabase = await authorized([
    "Partner",
    "OAK Staff",
    "Presenter",
    "Observer",
    "Coordination Team",
  ]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { data, error } = await supabase
    .from("partners")
    .select(
      "id, name, region, org_type, focus_areas, website_url, contact_email, logo_url, about_text",
    )
    .order("name");
  return error
    ? { ok: false, error: "Partners could not be loaded." }
    : { ok: true, data: data ?? [] };
}

export async function getPartner(id: string): Promise<ActionResult<unknown>> {
  const supabase = await authorized([
    "Partner",
    "OAK Staff",
    "Presenter",
    "Observer",
    "Coordination Team",
  ]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { data, error } = await supabase
    .from("partners")
    .select(
      "id, name, region, org_type, partner_since, about_text, focus_areas, website_url, contact_email, logo_url",
    )
    .eq("id", id)
    .maybeSingle();
  if (error || !data)
    return { ok: false, error: "Partner could not be loaded." };
  return { ok: true, data };
}

export async function lookupAttendee(
  qrCode: string,
): Promise<ActionResult<Attendee>> {
  const supabase = await authorized(["Coordination Team"]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { data, error } = await supabase
    .from("attendees")
    .select("id, first_name, last_name, organization, role, qr_code, email")
    .eq("qr_code", qrCode.trim())
    .maybeSingle();
  if (error || !data) return { ok: false, error: "QR code not recognised." };
  return { ok: true, data: data as Attendee };
}

export async function checkInAttendee(
  qrCode: string,
): Promise<ActionResult<Attendee>> {
  const attendee = await lookupAttendee(qrCode);
  if (!attendee.ok) return attendee;
  const supabase = await authorized(["Coordination Team"]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const { error } = await supabase
    .from("check_ins")
    .insert({ attendee_id: attendee.data.id });
  if (isDuplicateCheckIn(error?.code))
    return { ok: false, error: "Attendee is already checked in today." };
  if (error) return { ok: false, error: "Check-in could not be completed." };
  return attendee;
}

export async function getAttendance(): Promise<
  ActionResult<{ attendees: Attendee[]; checkedInIds: string[] }>
> {
  const supabase = await authorized(["Coordination Team"]);
  if (!supabase) return { ok: false, error: "Unauthorized" };
  const [
    { data: attendees, error: attendeeError },
    { data: checkIns, error: checkInError },
  ] = await Promise.all([
    supabase
      .from("attendees")
      .select("id, first_name, last_name, organization, role, qr_code, email")
      .order("last_name"),
    supabase
      .from("check_ins")
      .select("attendee_id")
      .eq("check_in_date", new Date().toISOString().slice(0, 10)),
  ]);
  if (attendeeError || checkInError)
    return { ok: false, error: "Attendance could not be loaded." };
  return {
    ok: true,
    data: {
      attendees: (attendees ?? []) as Attendee[],
      checkedInIds: (checkIns ?? []).map((item) => item.attendee_id),
    },
  };
}
