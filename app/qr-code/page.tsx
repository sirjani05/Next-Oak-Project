"use client";

import { Download, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { readRegistration, type Registration } from "@/lib/session";

export default function QrCodePage() {
  const [registration, setRegistration] = useState<Registration | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() =>
      setRegistration(readRegistration()),
    );
    return () => cancelAnimationFrame(frame);
  }, []);
  const id = registration?.id ?? "OAK-2026-7842-XKPH";
  const downloadQrCode = () => {
    const svg = document.querySelector<SVGSVGElement>(".qr-pass-card svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 570;
      canvas.height = 570;
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
        <button className="mobile-primary-button" onClick={downloadQrCode}>
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
