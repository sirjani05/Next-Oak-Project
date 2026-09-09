import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";

import type { UserRole } from "@/lib/session";

const roles: UserRole[] = [
  "Partner",
  "OAK Staff",
  "Coordination Team",
  "Presenter",
  "Observer",
];

function metadataRole(user: User): UserRole | null {
  const role = user.app_metadata?.role ?? user.user_metadata?.role;
  return typeof role === "string" && roles.includes(role as UserRole)
    ? (role as UserRole)
    : null;
}

export function roleFromUser(user: User): UserRole | null {
  return metadataRole(user);
}

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return { supabase, user };
}

export async function requireRole(allowedRoles: UserRole[]) {
  const { supabase, user } = await requireAdmin();
  const role = roleFromUser(user);
  if (!role || !allowedRoles.includes(role)) redirect("/register");
  return { supabase, user, role };
}
