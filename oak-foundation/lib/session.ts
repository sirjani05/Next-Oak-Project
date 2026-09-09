export type UserRole =
  | "Partner"
  | "OAK Staff"
  | "Coordination Team"
  | "Presenter"
  | "Observer";

export type Registration = {
  firstName: string;
  lastName: string;
  organisation: string;
  role: UserRole;
  email: string;
  id: string;
};

export const sessionKey = "oak-registration";

export function defaultDestination(role: UserRole) {
  if (role === "Partner") return "/qr-code";
  if (role === "Coordination Team") return "/check-in";
  return "/program";
}

export function readRegistration(): Registration | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(sessionKey);
  if (!saved) return null;
  try {
    return JSON.parse(saved) as Registration;
  } catch {
    return null;
  }
}
