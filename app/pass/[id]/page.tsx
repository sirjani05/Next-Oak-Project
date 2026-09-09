"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { readRegistration, type Registration } from "@/lib/session";
import { PlatformHeader } from "@/components/platform-header";

export default function PassPage({ params }: { params: { id: string } }) {
  const [registration] = useState<Registration | null>(() =>
    readRegistration(),
  );
  const id = params.id || registration?.id || "OAK-2026-7842-XKPH";
  const downloadQrCode = () => {
    const svg = document.querySelector<SVGSVGElement>(".entry-pass-card svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 540;
      canvas.height = 540;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const link = document.createElement("a");
      link.download = `${id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgData)}`;
  };
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
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
              Event dates<strong>9–11 March 2026</strong>
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
        <button className="mobile-primary-button" onClick={downloadQrCode}>
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
