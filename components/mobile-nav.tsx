"use client";

import Link from "next/link";
import {
  CalendarDays,
  Grid2X2,
  QrCode,
  ScanLine,
  UserPlus,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readRegistration, type UserRole } from "@/lib/session";

type NavItem = {
  href: string;
  label: string;
  icon: typeof CalendarDays;
  roles?: UserRole[];
};
const items: NavItem[] = [
  { href: "/register", label: "Register", icon: UserPlus },
  {
    href: "/admin/check-in",
    label: "Check In",
    icon: ScanLine,
    roles: ["Coordination Team"],
  },
  {
    href: "/programme",
    label: "Programme",
    icon: CalendarDays,
    roles: ["OAK Staff", "Presenter", "Observer", "Coordination Team"],
  },
  {
    href: "/partners",
    label: "Partners",
    icon: Grid2X2,
    roles: ["OAK Staff", "Presenter", "Observer", "Coordination Team"],
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    icon: Users,
    roles: ["Coordination Team"],
  },
  { href: "/pass", label: "QR Pass", icon: QrCode, roles: ["Partner"] },
];

export function MobileNav() {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [registrationId, setRegistrationId] = useState("");
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasMounted(true);
      const registration = readRegistration();
      setRole(registration?.role ?? null);
      setRegistrationId(registration?.id ?? "");
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  if (!hasMounted) return null;
  const visible = items.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );
  return (
    <nav className="mobile-bottom-nav" aria-label="App navigation">
      {visible.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            className={
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "active"
                : ""
            }
            href={item.href === "/pass" ? `/pass/${registrationId}` : item.href}
            key={item.href}
          >
            <Icon />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
