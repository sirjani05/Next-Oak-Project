"use client";

import { Download, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { readRegistration, type Registration } from "@/lib/session";

export default function QrCodePage() {
  const [registration] = useState<Registration | null>(() =>
    readRegistration(),
  );
  const id = registration?.id ?? "OAK-2026-7842-XKPH";
  return (
    <div className="mobile-product-page">
      <div className="mobile-product-stack qr-stack">
        <section className="mobile-banner">
          <p className="qr-eyebrow">OAK FOUNDATION</p>
          <h1>Your Entry Pass</h1>
          <p>Partner Convening 2026 · Harare</p>
        </section>
        <section className="qr-pass-card">
          <div className="qr-pass-heading">
            <span>PARTNER CONVENING</span>
            <strong>
              {registration
                ? `${registration.firstName} ${registration.lastName}`
                : "Maria Schmidt"}
            </strong>
            <small>
              {registration?.organisation ?? "Open Society Foundations"}
            </small>
          </div>
          <QRCodeSVG
            value={id}
            size={190}
            bgColor="#ffffff"
            fgColor="#142a4a"
          />
          <div className="qr-id">
            <span>REGISTRATION ID</span>
            <strong>{id}</strong>
          </div>
          <p>
            <MapPin /> Cresta Lodge, Harare · 9–11 November 2026
          </p>
        </section>
        <button className="mobile-primary-button">
          <Download />
          Download QR Code
        </button>
        <p className="mobile-footnote">
          Present this pass at the event entrance for check-in.
        </p>
      </div>
      <MobileNav />
    </div>
  );
}
