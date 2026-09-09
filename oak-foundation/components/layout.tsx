import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { event } from "@/data/event";

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="OAK Foundation home">
        <span className="brand-mark">OAK</span>
        <span className="brand-event">
          Partner Convening
          <br />
          2026
        </span>
      </Link>
      <nav className="nav-links" aria-label="Primary navigation">
        <Link href="/programme">Programme</Link>
        <Link href="/about">About</Link>
        <Link className="nav-cta" href="/register">
          Register <ArrowUpRight size={15} />
        </Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span className="footer-oak">OAK</span>
        <p>{event.name}</p>
      </div>
      <div>
        <p>
          {event.location} · {event.dates}
        </p>
        <p className="footer-muted">
          Registration data is secured and handled in accordance with GDPR.
        </p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/programme">Programme</Link>
        <Link href="/register">Register</Link>
        <Link href="/about">About</Link>
      </nav>
    </footer>
  );
}
