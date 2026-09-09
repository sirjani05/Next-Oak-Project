"use client";

import { Mail, Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";

const partners = [
  {
    name: "Open Society Foundations",
    category: "Rights & Governance",
    initials: "OS",
  },
  { name: "MENA Rights Group", category: "Human Rights", initials: "MR" },
  {
    name: "Africa Climate Alliance",
    category: "Climate Justice",
    initials: "AC",
  },
  {
    name: "Digital Frontiers Institute",
    category: "Digital Rights",
    initials: "DF",
  },
];
export default function PartnersPage() {
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack">
        <div className="platform-mobile-heading">
          <p>Partner Convening 2026</p>
          <h1>Partners</h1>
          <span>People and organisations in the room</span>
        </div>
        <div className="partner-search">
          <Search />
          <input placeholder="Search partners" />
        </div>
        <div className="partner-grid">
          {partners.map((partner) => (
            <article className="partner-card" key={partner.name}>
              <span className="partner-logo">{partner.initials}</span>
              <div>
                <h2>{partner.name}</h2>
                <p>{partner.category}</p>
              </div>
              <button aria-label={`Contact ${partner.name}`}>
                <Mail />
              </button>
            </article>
          ))}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
