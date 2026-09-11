"use client";

import { FormEvent, useState } from "react";
import { Calendar, ChevronDown, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/lib/session";
import { registerAttendee } from "@/app/register/actions";
import { PlatformHeader } from "@/components/platform-header";

type FormData = {
  firstName: string;
  lastName: string;
  organisation: string;
  subPartner: string;
  role: UserRole | "";
  email: string;
  phone: string;
  dietaryRequirements: string;
  accessibilityRequirements: string;
  travelRequirements: string;
  accommodationRequirements: string;
  agreeToTerms: boolean;
};
const initial: FormData = {
  firstName: "",
  lastName: "",
  organisation: "",
  subPartner: "",
  role: "",
  email: "",
  phone: "",
  dietaryRequirements: "",
  accessibilityRequirements: "",
  travelRequirements: "",
  accommodationRequirements: "",
  agreeToTerms: false,
};

export default function RegistrationPage() {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (
      !form.firstName ||
      !form.lastName ||
      !form.organisation ||
      !form.role ||
      !form.email ||
      !form.agreeToTerms
    ) {
      setError(
        "Please complete the required fields and agree to the privacy policy.",
      );
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    const result = await registerAttendee({
      ...form,
      role: form.role as UserRole,
    });
    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    router.push(result.destination);
  };
  return (
    <div className="mobile-product-page">
      <PlatformHeader />
      <div className="mobile-product-stack">
        <div className="register-intro">
          <section className="mobile-banner">
            <h1>Partner Convening 2026</h1>
            <p>Geneva · 9–11 March 2026</p>
          </section>
          <div className="mobile-stats">
            <Stat icon={<User />} value="110+" label="Attendees" />
            <Stat icon={<Calendar />} value="24" label="Sessions" />
            <Stat icon={<Users />} value="38" label="Partners" />
          </div>
        </div>
        <section className="mobile-card">
          <h2>Registration Form</h2>
          <form onSubmit={submit} className="mobile-form">
            <div className="mobile-two-col">
              <Field
                label="FIRST NAME"
                value={form.firstName}
                onChange={(value) => update("firstName", value)}
                required
                placeholder="Maria"
              />
              <Field
                label="LAST NAME"
                value={form.lastName}
                onChange={(value) => update("lastName", value)}
                required
                placeholder="Schmidt"
              />
            </div>
            <Field
              label="ORGANISATION"
              value={form.organisation}
              onChange={(value) => update("organisation", value)}
              placeholder="Your organisation name"
              required
            />
            <Field
              label="SUB-PARTNER / PROGRAMME AREA"
              value={form.subPartner}
              onChange={(value) => update("subPartner", value)}
              placeholder="Optional"
            />
            <label className="mobile-field">
              ROLE / CAPACITY <span>*</span>
              <div className="mobile-select-wrap">
                <select
                  value={form.role}
                  onChange={(event) => update("role", event.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option>Partner</option>
                  <option>OAK Staff</option>
                  <option>Coordination Team</option>
                  <option>Presenter</option>
                  <option>Observer</option>
                </select>
                <ChevronDown />
              </div>
            </label>
            <Field
              label="EMAIL ADDRESS"
              type="email"
              value={form.email}
              onChange={(value) => update("email", value)}
              placeholder="you@organisation.org"
              required
            />
            <Field
              label="PHONE NUMBER"
              type="tel"
              value={form.phone}
              onChange={(value) => update("phone", value)}
              placeholder="+41 xx xxx xx xx"
            />
            <div className="requirements-box">
              <div className="mobile-label">REQUIREMENTS</div>
              <Field
                label="DIETARY REQUIREMENTS"
                value={form.dietaryRequirements}
                onChange={(value) => update("dietaryRequirements", value)}
                placeholder="e.g. Vegetarian, Halal, Gluten-free"
                compact
              />
              <Field
                label="ACCESSIBILITY REQUIREMENTS"
                value={form.accessibilityRequirements}
                onChange={(value) => update("accessibilityRequirements", value)}
                placeholder="e.g. Wheelchair access, hearing loop"
                compact
              />
              <Field
                label="TRAVEL & ACCOMMODATION"
                value={form.travelRequirements}
                onChange={(value) => update("travelRequirements", value)}
                placeholder="e.g. Flight from London, hotel needed"
                compact
              />
              <Field
                label="ACCOMMODATION REQUIREMENTS"
                value={form.accommodationRequirements}
                onChange={(value) => update("accommodationRequirements", value)}
                placeholder="e.g. Single room, shared room"
                compact
              />
            </div>
            <label className="mobile-consent">
              <input
                type="checkbox"
                checked={form.agreeToTerms}
                onChange={(event) =>
                  update("agreeToTerms", event.target.checked)
                }
              />
              <span>
                I agree to OAK Foundation&apos;s{" "}
                <a href="#privacy">privacy policy</a> and consent to my
                registration data being used for event coordination.
              </span>
            </label>
            {error && (
              <p className="mobile-error" role="alert">
                {error}
              </p>
            )}
            <button className="mobile-primary-button" type="submit">
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>
        </section>
        <p className="mobile-footnote">
          Your details are secured and handled by OAK Foundation in accordance
          with GDPR.
        </p>
      </div>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="mobile-stat">
      <span>{icon}</span>
      <strong>{value}</strong>
      <small>{label}</small>
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  compact,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  compact?: boolean;
}) {
  return (
    <label className={`mobile-field ${compact ? "compact" : ""}`}>
      <span className="field-label-row">
        {label}
        {required && <span> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
