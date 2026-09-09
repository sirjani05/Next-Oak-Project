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
  subPartner?: string;
  role: UserRole;
  email: string;
  phone?: string;
  dietary?: string;
  accessibility?: string;
  travel?: string;
  accommodation?: string;
  id: string;
};

export const sessionKey = "oak-registration";

export function defaultDestination(role: UserRole) {
  if (role === "Partner") return "/pass";
  if (role === "Coordination Team") return "/admin/check-in";
  return "/programme";
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
