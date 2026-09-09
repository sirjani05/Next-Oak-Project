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
import { useState } from "react";
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
    href: "/check-in",
    label: "Check In",
    icon: ScanLine,
    roles: ["Coordination Team"],
  },
  {
    href: "/program",
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
    href: "/attendance",
    label: "Attendance",
    icon: Users,
    roles: ["Coordination Team"],
  },
  { href: "/qr-code", label: "QR Pass", icon: QrCode, roles: ["Partner"] },
];

export function MobileNav() {
  const pathname = usePathname();
  const [role] = useState<UserRole | null>(
    () => readRegistration()?.role ?? null,
  );
  const visible = items.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );
  return (
    <nav className="mobile-bottom-nav" aria-label="App navigation">
      {visible.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            className={pathname === item.href ? "active" : ""}
            href={item.href}
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
