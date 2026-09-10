"use server";

import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/lib/session";

const validRoles: UserRole[] = [
  "Partner",
  "OAK Staff",
  "Coordination Team",
  "Presenter",
  "Observer",
];

type RegistrationInput = {
  firstName: string;
  lastName: string;
  organisation: string;
  subPartner: string;
  role: UserRole;
  email: string;
  phone: string;
  dietaryRequirements: string;
  accessibilityRequirements: string;
  travelRequirements: string;
  accommodationRequirements: string;
  agreeToTerms: boolean;
};

export type RegistrationResult =
  | { ok: true; id: string; destination: string }
  | { ok: false; error: string; existingUser?: boolean; status?: number };

function clean(value: string) {
  return value.trim();
}

export async function registerAttendee(
  input: RegistrationInput,
): Promise<RegistrationResult> {
  const values = {
    firstName: clean(input.firstName),
    lastName: clean(input.lastName),
    organisation: clean(input.organisation),
    subPartner: clean(input.subPartner),
    email: clean(input.email).toLowerCase(),
    phone: clean(input.phone),
    dietaryRequirements: clean(input.dietaryRequirements),
    accessibilityRequirements: clean(input.accessibilityRequirements),
    travelRequirements: clean(input.travelRequirements),
    accommodationRequirements: clean(input.accommodationRequirements),
  };

  if (
    !values.firstName ||
    !values.lastName ||
    !values.organisation ||
    !values.email ||
    !input.role ||
    !input.agreeToTerms
  ) {
    return { ok: false, error: "Complete the required fields and consent." };
  }
  if (!validRoles.includes(input.role)) {
    return { ok: false, error: "Select a valid attendee role." };
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const qrCode =
    input.role === "Partner"
      ? `OAK-2026-${randomUUID().slice(0, 4).toUpperCase()}-${randomUUID().slice(0, 4).toUpperCase()}`
      : null;
  try {
    const supabase = await createClient();
    const { data: existingAttendee, error: lookupError } = await supabase
      .from("attendees")
      .select("id")
      .eq("email", values.email)
      .maybeSingle();

    if (lookupError) {
      console.error("Registration email lookup failed:", lookupError.message);
    }
    if (existingAttendee) {
      return {
        ok: false,
        error: "This email is already registered.",
        existingUser: true,
        status: 409,
      };
    }

    const { error } = await supabase.from("attendees").insert({
      qr_code: qrCode,
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      phone: values.phone || null,
      organization: values.organisation,
      sub_partner: values.subPartner || null,
      role: input.role,
      dietary_requirements: values.dietaryRequirements || null,
      accessibility_requirements: values.accessibilityRequirements || null,
      travel_accommodation:
        [values.travelRequirements, values.accommodationRequirements]
          .filter(Boolean)
          .join("; ") || null,
      consent_agreed: true,
    });

    if (error) {
      console.error("Registration insert failed:", error.message);
      if (error.code === "23505") {
        return {
          ok: false,
          error: "This email is already registered.",
          existingUser: true,
          status: 409,
        };
      }
      return {
        ok: false,
        error: "Registration could not be saved. Try again.",
      };
    }
  } catch (error) {
    console.error(
      "Registration insert failed:",
      error instanceof Error ? error.message : String(error),
    );
    return { ok: false, error: "Registration could not be saved. Try again." };
  }

  return {
    ok: true,
    id: qrCode ?? "",
    destination:
      input.role === "Partner"
        ? `/pass/${qrCode}`
        : input.role === "Coordination Team"
          ? "/check-in"
          : "/programme",
  };
}
