"use client";

import Link from "next/link";
import {
  CalendarDays,
  LayoutGrid,
  QrCode,
  ScanLine,
  UserPlus,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { event } from "@/data/event";
import { readRegistration, type UserRole } from "@/lib/session";

type PlatformLink = {
  href: string;
  label: string;
  icon: typeof CalendarDays;
  roles?: UserRole[];
};

const links: PlatformLink[] = [
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
    icon: LayoutGrid,
    roles: [
      "Partner",
      "OAK Staff",
      "Presenter",
      "Observer",
      "Coordination Team",
    ],
  },
  {
    href: "/admin/attendance",
    label: "Attendance",
    icon: Users,
    roles: ["Coordination Team"],
  },
  { href: "/pass", label: "QR Pass", icon: QrCode, roles: ["Partner"] },
];

export function PlatformHeader() {
  const pathname = usePathname();
  const [role] = useState<UserRole | null>(
    () => readRegistration()?.role ?? null,
  );
  const visibleLinks = links.filter(
    (link) => !link.roles || (role && link.roles.includes(role)),
  );

  return (
    <header className="platform-header">
      <Link className="platform-brand" href="/register">
        <strong>OAK FOUNDATION</strong>
        <span>PARTNER CONVENING 2026</span>
        <small>
          {event.location} | {event.dates}
        </small>
      </Link>
      <nav aria-label="Platform navigation" className="platform-nav">
        {visibleLinks.map((link) => {
          const Icon = link.icon;
          const active =
            pathname === link.href ||
            (link.href !== "/register" && pathname.startsWith(`${link.href}/`));
          const href =
            link.href === "/pass"
              ? `/pass/${readRegistration()?.id ?? ""}`
              : link.href;
          return (
            <Link
              className={active ? "active" : ""}
              href={href}
              key={link.href}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
