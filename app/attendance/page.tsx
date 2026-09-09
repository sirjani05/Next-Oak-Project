"use client";

import Link from "next/link";
import { ArrowRight, ScanLine, Users } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";
import { useEffect, useMemo, useState } from "react";
import { getAttendance } from "@/app/platform-actions";
import type { UserRole } from "@/lib/session";

export default function AttendancePage() {
  const [attendees, setAttendees] = useState<
    Array<{
      id: string;
      first_name: string;
      last_name: string;
      organization: string;
      role: UserRole;
    }>
  >([]);
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [error, setError] = useState("");
  useEffect(() => {
    void getAttendance().then((result) => {
      if (result.ok) {
        setAttendees(result.data.attendees);
        setCheckedInIds(result.data.checkedInIds);
      } else setError(result.error);
    });
  }, []);
  const filtered = useMemo(
    () =>
      attendees.filter(
        (attendee) =>
          (role === "All roles" || attendee.role === role) &&
          `${attendee.first_name} ${attendee.last_name} ${attendee.organization}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [attendees, query, role],
  );
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack">
        <div className="platform-mobile-heading">
          <p>Partner Convening 2026</p>
          <h1>Attendance</h1>
          <span>Check-in tracking · 9–11 November 2026</span>
        </div>
        <div className="attendance-stats">
          <Stat label="Expected" value="110" />
          <Stat label="Checked In" value={String(checkedInIds.length)} />
          <Stat
            label="Pending"
            value={String(Math.max(attendees.length - checkedInIds.length, 0))}
          />
        </div>
        <input
          className="attendance-filter"
          placeholder="Search name or organization"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="attendance-filter"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        >
          <option>All roles</option>
          <option>Partner</option>
          <option>OAK Staff</option>
          <option>Presenter</option>
          <option>Observer</option>
          <option>Coordination Team</option>
        </select>
        {error && (
          <p className="mobile-error" role="alert">
            {error}
          </p>
        )}
        {attendees.length > 0 && (
          <div className="attendance-table">
            {filtered.map((attendee) => (
              <div className="attendance-row" key={attendee.id}>
                <strong>
                  {attendee.first_name} {attendee.last_name}
                </strong>
                <span>{attendee.organization}</span>
                <span>{attendee.role}</span>
                <span>
                  {checkedInIds.includes(attendee.id)
                    ? "Checked In"
                    : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
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
