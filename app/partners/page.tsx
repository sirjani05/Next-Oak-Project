"use client";

import { useEffect, useMemo, useState } from "react";
import { Mail, Search } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";
import { getPartners } from "@/app/platform-actions";
import Link from "next/link";

type Partner = {
  id: string;
  name: string;
  region: string;
  org_type: string;
  focus_areas: string[];
  contact_email: string | null;
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [error, setError] = useState("");
  useEffect(() => {
    void getPartners().then((result) => {
      if (result.ok) setPartners(result.data as Partner[]);
      else setError(result.error);
    });
  }, []);
  const filtered = useMemo(
    () =>
      partners.filter(
        (partner) =>
          (region === "All Regions" || partner.region === region) &&
          `${partner.name} ${partner.org_type} ${partner.focus_areas.join(" ")}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [partners, query, region],
  );
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
          <input
            placeholder="Search partners"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="filter-row" role="group" aria-label="Partner regions">
          {[
            "All Regions",
            "Global",
            "Sub-Saharan Africa",
            "Northern Europe",
            "Middle East & North Africa",
          ].map((item) => (
            <button
              className={region === item ? "active" : ""}
              key={item}
              onClick={() => setRegion(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {error && (
          <p className="mobile-error" role="alert">
            {error}
          </p>
        )}
        <div className="partner-grid">
          {filtered.map((partner) => (
            <Link
              className="partner-card"
              href={`/partners/${partner.id}`}
              key={partner.id}
            >
              <span className="partner-logo">
                {partner.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h2>{partner.name}</h2>
                <p>
                  {partner.org_type} · {partner.region}
                </p>
              </div>
              <span aria-label={`Contact ${partner.name}`}>
                <Mail />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
