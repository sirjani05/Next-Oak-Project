import { ArrowUpRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";

export default function AboutPage() {
  return (
    <main>
      <Header />
      <div className="page-intro">
        <p className="eyebrow">About the convening</p>
        <h1>
          A room for
          <br />
          <em>what comes next.</em>
        </h1>
        <p>
          The Partner Convening brings partners together in Geneva for three
          days of dialogue, learning, collaboration and shared action.
        </p>
      </div>
      <section className="about-body">
        <div className="section-kicker">
          <span>01</span>
          <span>What to expect</span>
        </div>
        <div className="about-grid">
          <h2>
            Useful
            <br />
            <em>by design.</em>
          </h2>
          <div>
            <p className="intro-lede">
              This is a moment to step out of the day-to-day and listen closely.
            </p>
            <p>
              Partners will exchange ideas, learn from one another, explore
              emerging challenges and strengthen the relationships that make
              long-term impact possible.
            </p>
            <p>
              We are committed to an inclusive gathering where people can
              participate fully. During registration, you can share dietary,
              accessibility, travel and accommodation requirements with the
              convening team.
            </p>
            <a className="text-link" href="/register">
              Register for the convening <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
