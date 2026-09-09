"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { readRegistration, type Registration } from "@/lib/session";

export default function PassPage({ params }: { params: { id: string } }) {
  const [registration] = useState<Registration | null>(() =>
    readRegistration(),
  );
  const id = params.id || registration?.id || "OAK-2026-7842-XKPH";
  return (
    <div className="mobile-product-page">
      <div className="mobile-product-stack pass-page">
        <section className="pass-complete-banner">
          <p>REGISTRATION COMPLETE</p>
          <h1>
            You&apos;re Registered,
            <br />
            <strong>{registration?.firstName ?? "Maria"}!</strong>
          </h1>
        </section>
        <section className="pass-detail-card">
          <h2>Registration Details</h2>
          <div className="pass-detail-grid">
            <span>
              Name
              <strong>
                {registration
                  ? `${registration.firstName} ${registration.lastName}`
                  : "Maria Schmidt"}
              </strong>
            </span>
            <span>
              Organisation
              <strong>
                {registration?.organisation ?? "Open Society Foundations"}
              </strong>
            </span>
            <span>
              Role<strong>{registration?.role ?? "Partner"}</strong>
            </span>
            <span>
              Email
              <strong>
                {registration?.email ?? "participant@example.org"}
              </strong>
            </span>
            <span>
              Event dates<strong>9–11 November 2026</strong>
            </span>
            <span>
              Location<strong>Cresta Lodge, Harare</strong>
            </span>
          </div>
        </section>
        <section className="entry-pass-card">
          <p className="mobile-label">YOUR ENTRY PASS</p>
          <QRCodeSVG
            value={id}
            size={180}
            bgColor="#ffffff"
            fgColor="#142a4a"
          />
          <strong>{id}</strong>
          <span>Present at event entrance for check-in</span>
        </section>
        <button className="mobile-primary-button">
          <Download />
          Download QR Code
        </button>
        <Link className="mobile-secondary-button" href="/register">
          Register another attendee
        </Link>
      </div>
      <MobileNav />
    </div>
  );
}
