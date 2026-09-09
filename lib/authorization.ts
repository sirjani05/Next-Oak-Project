import type { UserRole } from "./session";

export const routeRoles: Record<string, UserRole[]> = {
  "/pass": ["Partner"],
  "/programme": ["OAK Staff", "Presenter", "Observer", "Coordination Team"],
  "/partners": [
    "Partner",
    "OAK Staff",
    "Presenter",
    "Observer",
    "Coordination Team",
  ],
  "/check-in": ["Coordination Team"],
  "/attendance": ["Coordination Team"],
};

export function canAccess(pathname: string, role: UserRole | null) {
  const route = Object.keys(routeRoles).find(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  return !route || (role !== null && routeRoles[route].includes(role));
}

export function isDuplicateCheckIn(errorCode: string | null | undefined) {
  return errorCode === "23505";
}

export function isPartnerQrCode(value: string | null | undefined) {
  return (
    typeof value === "string" &&
    /^OAK-2026-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(value)
  );
}
