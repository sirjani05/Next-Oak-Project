"use client";

import { AlertTriangle, Phone, RefreshCw, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const reasons = [
  "QR code belongs to a different event",
  "Registration was not completed",
  "Code has been altered or corrupted",
  "Attendee registered under a different email",
];
export default function CheckInFailedPage() {
  const router = useRouter();
  return (
    <div className="mobile-product-page">
      <div className="mobile-product-stack checkin-stack">
        <section className="checkin-failed-banner">
          <div className="checkin-icon">
            <XCircle />
          </div>
          <div>
            <small>CHECK-IN FAILED</small>
            <h1>QR Not Recognised</h1>
            <p>Code is invalid or unregistered</p>
          </div>
        </section>
        <section className="mobile-card reasons-card">
          <h2>
            <AlertTriangle />
            Possible reasons
          </h2>
          <ul>
            {reasons.map((reason) => (
              <li key={reason}>
                <i />
                {reason}
              </li>
            ))}
          </ul>
        </section>
        <div className="failed-actions">
          <button
            className="mobile-primary-button"
            onClick={() => router.push("/check-in")}
          >
            <RefreshCw />
            Try Again
          </button>
          <a
            className="mobile-secondary-button"
            href="mailto:coordination@oakfoundation.org"
          >
            <Phone />
            Contact Coordination Team
          </a>
        </div>
      </div>
    </div>
  );
}
