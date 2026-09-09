"use client";

import Link from "next/link";
import { ArrowRight, ScanLine, Users } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";

export default function AttendancePage() {
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack">
        <div className="platform-mobile-heading">
          <p>Partner Convening 2026</p>
          <h1>Attendance</h1>
          <span>Check-in tracking · 9–11 March 2026</span>
        </div>
        <div className="attendance-stats">
          <Stat label="Expected" value="110" />
          <Stat label="Checked In" value="0" />
          <Stat label="Pending" value="110" />
        </div>
        <section className="mobile-card attendance-empty">
          <div className="attendance-icon">
            <Users />
          </div>
          <h2>No check-ins yet</h2>
          <p>
            Attendees will appear here once they have been scanned in at the
            event entrance.
          </p>
          <Link className="mobile-primary-button" href="/admin/check-in">
            <ScanLine />
            Go to Check-In Scanner <ArrowRight />
          </Link>
        </section>
      </div>
      <MobileNav />
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
