import { Header, Footer } from "@/components/layout";
import { ProgrammePreview } from "@/components/programme-preview";

export default function ProgrammePage() {
  return (
    <main>
      <Header />
      <div className="page-intro">
        <p className="eyebrow">The programme</p>
        <h1>
          Time well
          <br />
          <em>spent together.</em>
        </h1>
        <p>
          Three days of shared learning, meaningful dialogue and space to make
          connections that last beyond Geneva.
        </p>
      </div>
      <ProgrammePreview />
      <Footer />
    </main>
  );
}
