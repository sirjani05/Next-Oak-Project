import Link from "next/link";
export default function NotFound() {
  return (
    <main>
      <section className="empty-state">
        <p className="eyebrow">404</p>
        <h1>
          This page
          <br />
          <em>moved on.</em>
        </h1>
        <p>The page you are looking for is not part of this programme.</p>
        <Link className="button button-dark" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
