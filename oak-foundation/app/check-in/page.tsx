"use client";

import { useState } from "react";
import { Scan } from "lucide-react";
import { useRouter } from "next/navigation";
import { MobileNav } from "@/components/mobile-nav";

const attendees = [
  {
    name: "Maria Schmidt",
    code: "OAK-2026-7842-XKPH",
    initials: "MS",
    role: "Partner",
    roleClass: "partner",
  },
  {
    name: "James Odhiambo",
    code: "OAK-2026-1193-JMQA",
    initials: "JO",
    role: "OAK Staff",
    roleClass: "staff",
  },
  {
    name: "Awa Diallo",
    code: "OAK-2026-3310-ADGE",
    initials: "AD",
    role: "Coordination Team",
    roleClass: "coordination",
  },
  {
    name: "Fatima Z. Benali",
    code: "OAK-2026-5592-FMIN",
    initials: "FZB",
    role: "Partner",
    roleClass: "partner",
  },
];

export default function CheckInScannerPage() {
  const router = useRouter();
  const [manualCode, setManualCode] = useState("");
  const checkCode = (code: string) =>
    router.push(
      code === attendees[0].code ? "/check-in/success" : "/check-in/failed",
    );
  return (
    <div className="mobile-product-page">
      <div className="mobile-product-stack checkin-stack">
        <div className="checkin-heading">
          <h1>Event Check-In</h1>
          <p>Scan an attendee QR code to check them in</p>
        </div>
        <section className="scanner-card">
          <div className="scanner-reticle">
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>Position QR code within the frame</p>
          <div className="scanner-tip">
            <Scan />
            <span>Hold camera steady · Auto-scans in 1–2 seconds</span>
          </div>
        </section>
        <section className="mobile-card compact-card">
          <div className="mobile-label">SIMULATE QR SCAN</div>
          <div className="attendee-list">
            {attendees.map((attendee) => (
              <button
                className="attendee-row"
                key={attendee.code}
                onClick={() => checkCode(attendee.code)}
              >
                <span className="attendee-avatar">{attendee.initials}</span>
                <span className="attendee-details">
                  <strong>{attendee.name}</strong>
                  <small>{attendee.code}</small>
                </span>
                <span className={`role-pill ${attendee.roleClass}`}>
                  • {attendee.role}
                </span>
              </button>
            ))}
          </div>
        </section>
        <section className="mobile-card compact-card">
          <div className="mobile-label">MANUAL CODE ENTRY</div>
          <div className="manual-entry">
            <input
              value={manualCode}
              onChange={(event) =>
                setManualCode(event.target.value.toUpperCase())
              }
              placeholder="OAK-2026-XXXX-XXXX"
            />
            <button onClick={() => checkCode(manualCode)}>Check</button>
          </div>
        </section>
      </div>
      <MobileNav />
    </div>
  );
}
