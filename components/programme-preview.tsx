"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { programme, type SessionType } from "@/data/programme";

const filters: ("All" | SessionType)[] = [
  "All",
  "Plenary",
  "Breakout",
  "Workshop",
  "Social",
];

export function ProgrammePreview() {
  const [dayIndex, setDayIndex] = useState(0);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const sessions = programme[dayIndex].sessions.filter(
    (session) => filter === "All" || session.type === filter,
  );
  return (
    <section className="programme-section" id="programme-preview">
      <div className="section-kicker">
        <span>02</span>
        <span>Programme preview</span>
      </div>
      <div className="programme-heading">
        <h2>
          Make space
          <br />
          <em>for the useful.</em>
        </h2>
        <p>
          A considered rhythm of plenaries, workshops and the informal moments
          where good partnership takes shape.
        </p>
      </div>
      <div className="day-tabs" role="tablist" aria-label="Programme days">
        {programme.map((day, index) => (
          <button
            key={day.day}
            className={dayIndex === index ? "active" : ""}
            onClick={() => setDayIndex(index)}
            role="tab"
            aria-selected={dayIndex === index}
          >
            <span>{day.day}</span>
            <strong>{day.date}</strong>
          </button>
        ))}
      </div>
      <div className="filter-row" aria-label="Filter session types">
        {filters.map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="session-list" aria-live="polite">
        {sessions.map((session) => (
          <article
            className="session-row"
            key={`${session.time}-${session.title}`}
          >
            <time>{session.time}</time>
            <div className="session-type">{session.type}</div>
            <h3>{session.title}</h3>
            <div className="session-location">
              <MapPin size={14} />
              {session.location}
            </div>
            <ArrowUpRight className="session-arrow" size={20} />
          </article>
        ))}
      </div>
      <div className="programme-more">
        <a href="/programme">
          View full programme <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
