"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { ArrowUpRight, Printer } from "lucide-react";
import { Header, Footer } from "@/components/layout";

type Registration = {
  firstName: string;
  lastName: string;
  organisation: string;
  id: string;
};
export default function SuccessPage() {
  const [registration] = useState<Registration | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("oak-registration");
    return saved ? (JSON.parse(saved) as Registration) : null;
  });
  if (!registration)
    return (
      <main>
        <Header />
        <section className="empty-state">
          <h1>
            No confirmation
            <br />
            <em>found.</em>
          </h1>
          <p>Complete registration first to create your event pass.</p>
          <Link className="button button-dark" href="/register">
            Go to registration <ArrowUpRight size={17} />
          </Link>
        </section>
        <Footer />
      </main>
    );
  return (
    <main>
      <Header />
      <section className="confirmation">
        <div>
          <p className="eyebrow">Registration confirmed</p>
          <h1>
            You’re
            <br />
            <em>expected.</em>
          </h1>
          <p>Keep this pass handy when you arrive at Cresta Lodge, Harare.</p>
          <div className="confirmation-actions">
            <button
              className="button button-dark"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              Print confirmation
            </button>
            <Link className="text-link" href="/">
              Return home <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="pass">
          <span className="footer-oak">OAK FOUNDATION</span>
          <p className="pass-title">
            Partner Convening
            <br />
            2026
          </p>
          <div className="pass-person">
            <strong>
              {registration.firstName} {registration.lastName}
            </strong>
            <span>{registration.organisation}</span>
          </div>
          <p>Cresta Lodge, Harare · 9–11 November 2026</p>
          <QRCodeSVG
            value={registration.id}
            size={150}
            bgColor="#f3f0e8"
            fgColor="#1d2421"
          />
          <small>
            Registration ID
            <br />
            <strong>{registration.id}</strong>
          </small>
        </div>
      </section>
      <Footer />
    </main>
  );
}
