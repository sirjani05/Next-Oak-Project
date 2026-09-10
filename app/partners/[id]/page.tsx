"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Globe, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";
import { getPartner } from "@/app/platform-actions";

type Partner = {
  id: string;
  name: string;
  region: string;
  org_type: string;
  partner_since: number | null;
  about_text: string | null;
  focus_areas: string[];
  website_url: string | null;
  contact_email: string | null;
  logo_url: string | null;
};

export default function PartnerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const [hasMounted, setHasMounted] = useState(false);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHasMounted(true);
      void getPartner(params.id).then((result) => {
        if (result.ok) setPartner(result.data as Partner);
        else setError(result.error);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [params.id]);

  if (!hasMounted) return null;
  if (error) {
    return (
      <div className="mobile-product-page">
        <PlatformHeader />
        <div className="mobile-product-stack partner-profile-stack">
          <p className="mobile-error" role="alert">
            {error}
          </p>
          <Link className="mobile-secondary-button" href="/partners">
            <ArrowLeft /> Partner Directory
          </Link>
        </div>
        <MobileNav />
      </div>
    );
  }
  if (!partner) return null;

  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <main className="mobile-product-stack partner-profile-stack">
        <Link className="partner-back-link" href="/partners">
          <ArrowLeft size={15} /> Partner Directory
        </Link>
        <section className="partner-profile-hero">
          <p>
            {partner.org_type} · PARTNER SINCE {partner.partner_since ?? ""}
          </p>
          <h1>{partner.name}</h1>
          <div className="partner-focus-list">
            {partner.focus_areas.map((focus) => (
              <span key={focus}>{focus}</span>
            ))}
          </div>
        </section>
        <section className="partner-profile-card">
          <p className="mobile-label">ABOUT</p>
          <p>
            {partner.about_text ??
              "Partner profile information has not been published yet."}
          </p>
        </section>
        <section className="partner-profile-card">
          <p className="mobile-label">CONTACT AT CONVENING</p>
          <div className="partner-contact-row">
            <span className="partner-contact-avatar">OS</span>
            <div>
              <strong>Convening contact</strong>
              <small>
                {partner.contact_email ?? "Contact details unavailable"}
              </small>
            </div>
          </div>
        </section>
        <div className="partner-profile-actions">
          {partner.website_url && (
            <a
              className="mobile-primary-button"
              href={partner.website_url}
              target="_blank"
              rel="noreferrer"
            >
              <Globe /> Visit Website <ExternalLink />
            </a>
          )}
          {partner.contact_email && (
            <a
              className="mobile-secondary-button"
              href={`mailto:${partner.contact_email}`}
            >
              <Mail /> Send Message
            </a>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
