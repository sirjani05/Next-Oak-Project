"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  Globe,
  QrCode,
  ScanLine,
  UserPlus,
  LayoutGrid,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readRegistration, type UserRole } from "@/lib/session";
import logo from "@/Logo-Oak-Foundation.svg.svg";

type PlatformLink = {
  href: string;
  label: string;
  icon: typeof CalendarDays;
  roles?: UserRole[];
};

const links: PlatformLink[] = [
  { href: "/register", label: "Register", icon: UserPlus },
  {
    href: "/check-in",
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
    icon: Globe,
    roles: [
      "Partner",
      "OAK Staff",
      "Presenter",
      "Observer",
      "Coordination Team",
    ],
  },
  {
    href: "/attendance",
    label: "Attendance",
    icon: LayoutGrid,
    roles: ["Coordination Team"],
  },
  { href: "/pass", label: "Entry Pass", icon: QrCode, roles: ["Partner"] },
];

export function PlatformHeader() {
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
  const visibleLinks = links.filter(
    (link) =>
      hasMounted && (!link.roles || (role && link.roles.includes(role))),
  );

  return (
    <aside className="platform-header">
      <Link
        className="platform-brand"
        href="/register"
        aria-label="OAK Foundation home"
      >
        <Image
          src={logo}
          alt="OAK Foundation"
          width={122}
          height={76}
          priority
        />
        <strong>PARTNER CONVENING 2026</strong>
      </Link>
      <nav aria-label="Platform navigation" className="platform-nav">
        {hasMounted &&
          visibleLinks.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href ||
              (link.href !== "/register" &&
                pathname.startsWith(`${link.href}/`));
            const href =
              link.href === "/pass" ? `/pass/${registrationId}` : link.href;
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
      <div className="sidebar-location">
        <span className="sidebar-location-icon">
          <Globe size={18} />
        </span>
        <span>
          <strong>Harare, Zimbabwe</strong>
          <small>9–11 March 2026</small>
        </span>
      </div>
    </aside>
  );
}
