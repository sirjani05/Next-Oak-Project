"use client";

import { useState } from "react";
import { FileText, MapPin, Plus } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { programme } from "@/data/programme";
import { PlatformHeader } from "@/components/platform-header";

export default function ProgramPage() {
  const [day, setDay] = useState(0);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const sessions = programme[day].sessions;
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack program-stack">
        <div className="platform-mobile-heading">
          <p>OAK Partner Convening 2026</p>
          <h1>Programme</h1>
          <span>Schedule · 9–11 March 2026</span>
        </div>
        <div className="program-days">
          {programme.map((item, index) => (
            <button
              className={day === index ? "active" : ""}
              onClick={() => setDay(index)}
              key={item.day}
            >
              <span>{item.day.replace("Day ", "DAY ")}</span>
              <strong>{item.date}</strong>
            </button>
          ))}
        </div>
        <div className="program-session-list">
          {sessions.map((session) => (
            <article className="program-session" key={session.title}>
              <time>{session.time}</time>
              <div>
                <span className="session-badge">{session.type}</span>
                <h2>{session.title}</h2>
                <span className="session-place">
                  <MapPin />
                  {session.location}
                </span>
              </div>
              <button
                aria-label={`Add note to ${session.title}`}
                onClick={() => setSelected(session.title)}
              >
                <Plus />
              </button>
            </article>
          ))}
        </div>
        <section className="takeaways-card">
          <FileText />
          <div>
            <h2>Key takeaways</h2>
            <p>
              Capture local notes linked to this programme. Notes are stored on
              this device for this session.
            </p>
          </div>
        </section>
        {selected && (
          <div className="notes-panel">
            <label htmlFor="session-note">Note for {selected}</label>
            <textarea
              id="session-note"
              rows={4}
              value={notes[selected] ?? ""}
              onChange={(event) =>
                setNotes({ ...notes, [selected]: event.target.value })
              }
              placeholder="Add a note..."
            />
            <button
              className="mobile-primary-button"
              onClick={() => setSelected(null)}
            >
              Save note
            </button>
          </div>
        )}
      </div>
      <MobileNav />
    </div>
  );
}
