"use client";

import { useEffect, useState } from "react";
import { FileText, MapPin, Plus } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { PlatformHeader } from "@/components/platform-header";
import { getProgrammeSessions } from "@/app/platform-actions";

type ProgrammeSession = {
  id: string;
  title: string;
  speaker: string | null;
  start_time: string;
  location: string;
  category: "Plenary" | "Breakout" | "Workshop" | "Social";
  day_number: number;
};

const days = ["Day 1", "Day 2", "Day 3"];
export default function ProgramPage() {
  const [day, setDay] = useState(0);
  const [sessions, setSessions] = useState<ProgrammeSession[]>([]);
  const [loadError, setLoadError] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    void getProgrammeSessions().then((result) => {
      if (result.ok) setSessions(result.data as ProgrammeSession[]);
      else setLoadError(result.error);
    });
  }, []);
  const daySessions = sessions.filter(
    (session) => session.day_number === day + 1,
  );
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack program-stack">
        <div className="platform-mobile-heading">
          <p>OAK Partner Convening 2026</p>
          <h1>Programme</h1>
          <span>Schedule · 9–11 November 2026</span>
        </div>
        <div className="program-days">
          {days.map((item, index) => (
            <button
              className={day === index ? "active" : ""}
              onClick={() => setDay(index)}
              key={item}
            >
              <span>{item.replace("Day ", "DAY ")}</span>
              <strong>{9 + index} Nov</strong>
            </button>
          ))}
        </div>
        <div className="program-session-list">
          {daySessions.map((session) => (
            <article className="program-session" key={session.id}>
              <time>
                {new Date(session.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
              <div>
                <span className="session-badge">{session.category}</span>
                <h2>{session.title}</h2>
                <span className="session-place">
                  <MapPin />
                  {session.location}
                </span>
              </div>
              <button
                aria-label={`Add note to ${session.title}`}
                onClick={() => setSelected(session.id)}
              >
                <Plus />
              </button>
            </article>
          ))}
        </div>
        {loadError && (
          <p className="mobile-error" role="alert">
            {loadError}
          </p>
        )}
        {!loadError && sessions.length === 0 && (
          <p className="mobile-footnote">
            No programme sessions have been published yet.
          </p>
        )}
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
            <label htmlFor="session-note">Session note</label>
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
