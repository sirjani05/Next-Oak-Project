"use client";

import { CheckCircle2, Clock, MapPin, Scan } from "lucide-react";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";

export default function CheckInSuccessPage() {
  const router = useRouter();
  return (
    <div className="mobile-product-page">
      <div className="mobile-product-stack checkin-stack">
        <section className="checkin-success-banner">
          <div className="checkin-icon">
            <CheckCircle2 />
          </div>
          <div>
            <h1>Checked In Successfully</h1>
            <p>
              <Clock />
              09:34 · 9 March 2026
            </p>
          </div>
        </section>
        <section className="mobile-card attendee-card">
          <div className="attendee-profile">
            <span className="large-avatar">MS</span>
            <div>
              <h2>Maria Schmidt</h2>
              <p>Open Society Foundations</p>
              <span className="role-pill partner">• Partner</span>
            </div>
          </div>
          <div className="attendee-summary">
            <div>
              <small>NEXT SESSION</small>
              <strong>Opening Plenary</strong>
            </div>
            <div>
              <small>
                <MapPin /> VENUE
              </small>
              <strong>Main Hall A</strong>
            </div>
          </div>
        </section>
        <section className="mobile-card live-status">
          <div className="mobile-label">LIVE EVENT STATUS</div>
          <div className="live-line">
            <i /> <strong>Opening Plenary starting at 09:30</strong>
          </div>
          <p>74 of 110 attendees checked in · Main Hall A</p>
          <div className="progress-track">
            <span />
          </div>
        </section>
        <button
          className="mobile-primary-button scan-next"
          onClick={() => router.push("/check-in")}
        >
          <Scan />
          Scan Next Attendee
        </button>
      </div>
      <MobileNav />
    </div>
  );
}
