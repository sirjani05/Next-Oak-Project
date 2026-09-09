"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronDown,
  FileText,
  LayoutGrid,
  MapPin,
  Menu,
  Users,
} from "lucide-react";

const days = [
  { label: "Mon", name: "Day 1", date: "9 Mar" },
  { label: "Tue", name: "Day 2", date: "10 Mar" },
  { label: "Wed", name: "Day 3", date: "11 Mar" },
];
const filters = ["All", "Plenary", "Breakout", "Workshop", "Social"];
const sessions = [
  {
    day: 0,
    time: "09:00 – 10:30",
    title: "Opening Plenary: Pathways to Impact",
    type: "Plenary",
    speaker: "Dr. Helena Moreau",
    organisation: "OAK Foundation",
    location: "Main Hall A",
    featured: true,
  },
  {
    day: 0,
    time: "10:50 – 12:00",
    title: "Thematic Dialogue: Climate Justice & Grantmaking",
    type: "Breakout",
    speaker: "Samuel Okafor",
    organisation: "Africa Climate Alliance",
    location: "Conference Room B2",
  },
  {
    day: 0,
    time: "10:50 – 12:00",
    title: "Workshop: Measuring Long-term Change",
    type: "Workshop",
    speaker: "Dr. Ingrid Holm",
    organisation: "Nordic Evaluation Centre",
    location: "Workshop Room C",
  },
  {
    day: 0,
    time: "13:30 – 14:30",
    title: "Partner Spotlight: Rights-Based Approaches",
    type: "Plenary",
    speaker: "Fatima Zahra Benali",
    organisation: "MENA Rights Group",
    location: "Main Hall A",
  },
  {
    day: 0,
    time: "14:45 – 16:00",
    title: "Digital Rights in Authoritarian Contexts",
    type: "Breakout",
    speaker: "Li Wei",
    organisation: "Digital Frontiers Institute",
    location: "Conference Room B1",
  },
  {
    day: 0,
    time: "18:00 – 20:00",
    title: "Welcome Reception & Dinner",
    type: "Social",
    location: "Rooftop Terrace",
  },
  {
    day: 1,
    time: "09:00 – 10:30",
    title: "Opening the Field: Shared Questions",
    type: "Plenary",
    location: "Main Hall A",
  },
  {
    day: 1,
    time: "10:50 – 12:00",
    title: "Strategic Communications Workshop",
    type: "Workshop",
    location: "Workshop Room C",
  },
  {
    day: 1,
    time: "13:30 – 14:30",
    title: "Peer Exchange: What We Are Learning",
    type: "Breakout",
    location: "Conference Room B2",
  },
  {
    day: 2,
    time: "09:00 – 10:30",
    title: "From Learning to Shared Action",
    type: "Plenary",
    location: "Main Hall A",
  },
  {
    day: 2,
    time: "10:50 – 12:00",
    title: "Building the Conditions for Collaboration",
    type: "Workshop",
    location: "Workshop Room C",
  },
  {
    day: 2,
    time: "13:30 – 14:30",
    title: "Closing Plenary & Next Steps",
    type: "Plenary",
    location: "Main Hall A",
  },
];

export default function Home() {
  const [day, setDay] = useState(0);
  const [filter, setFilter] = useState("All");
  const visibleSessions = sessions.filter(
    (session) =>
      session.day === day && (filter === "All" || session.type === filter),
  );
  return (
    <main className="platform-shell">
      <aside className="platform-sidebar">
        <div className="platform-logo">
          <span>OAK</span>
          <small>
            Partner Convening
            <br />
            2026
          </small>
        </div>
        <div className="platform-event">
          <span>PARTNER CONVENING 2026</span>
          <strong>
            9–11 March
            <br />
            Geneva
          </strong>
        </div>
        <nav className="platform-nav" aria-label="Platform navigation">
          <Link className="active" href="/">
            <CalendarDays size={17} />
            Programme
          </Link>
          <Link href="/about">
            <Users size={17} />
            Partners
          </Link>
          <Link href="/register">
            <LayoutGrid size={17} />
            Registration
          </Link>
        </nav>
        <div className="sidebar-bottom">
          <Link href="/about">
            <FileText size={16} />
            Event information
          </Link>
          <span className="status-dot">
            ● <span>Platform online</span>
          </span>
        </div>
      </aside>
      <section className="platform-main">
        <header className="platform-topbar">
          <button className="mobile-menu" aria-label="Open navigation">
            <Menu size={21} />
          </button>
          <div>
            <span className="topbar-kicker">Partner Convening 2026</span>
            <h1>Programme</h1>
          </div>
          <div className="topbar-actions">
            <span className="user-avatar">MS</span>
            <span className="user-name">Maria Schmidt</span>
            <ChevronDown size={15} />
          </div>
        </header>
        <div className="platform-content">
          <div className="workspace-tabs">
            <button className="selected">Schedule</button>
            <button>Docs</button>
            <span className="workspace-date">
              <CalendarDays size={14} /> 9–11 March 2026
            </span>
          </div>
          <div className="schedule-header">
            <div>
              <p className="platform-eyebrow">OAK Partner Convening 2026</p>
              <h2>Programme</h2>
            </div>
            <button className="export-button">
              <FileText size={15} /> Programme PDF
            </button>
          </div>
          <div className="day-switcher">
            {days.map((item, index) => (
              <button
                key={item.name}
                className={day === index ? "selected" : ""}
                onClick={() => setDay(index)}
              >
                <span>{item.label}</span>
                <strong>{item.name}</strong>
                <small>{item.date}</small>
              </button>
            ))}
          </div>
          <div className="schedule-tools">
            <div className="schedule-meta">
              <span>Schedule</span>
              <span>{visibleSessions.length} sessions</span>
            </div>
            <div className="platform-filters">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "selected" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="day-events">
            <div className="event-marker">
              <span>08:00</span>
              <i />
            </div>
            <div className="schedule-note">
              Registration &amp; Welcome Coffee
            </div>
            <div className="event-marker">
              <span>10:30</span>
              <i />
            </div>
            <div className="schedule-note">Coffee Break</div>
            {visibleSessions.map((session) => (
              <article
                className={`platform-session ${session.featured ? "featured" : ""}`}
                key={`${session.day}-${session.time}-${session.title}`}
              >
                <div className="session-time">{session.time}</div>
                <div className="session-body">
                  <span className="session-badge">
                    {session.featured ? "Featured" : session.type}
                  </span>
                  <h3>{session.title}</h3>
                  {session.speaker && (
                    <p>
                      {session.speaker} · {session.organisation}
                    </p>
                  )}
                  <span className="session-place">
                    <MapPin size={13} />
                    {session.location}
                  </span>
                </div>
                <span className="session-type-label">{session.type}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
