"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Header, Footer } from "@/components/layout";

type FormData = {
  firstName: string;
  lastName: string;
  organisation: string;
  role: string;
  email: string;
  phone: string;
  dietary: string;
  accessibility: string;
  travel: string;
  consent: boolean;
};
const initial: FormData = {
  firstName: "",
  lastName: "",
  organisation: "",
  role: "",
  email: "",
  phone: "",
  dietary: "",
  accessibility: "",
  travel: "",
  consent: false,
};

export default function RegisterPage() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const update = (field: keyof FormData, value: string | boolean) =>
    setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: typeof errors = {};
    for (const field of [
      "firstName",
      "lastName",
      "organisation",
      "role",
      "email",
    ] as const)
      if (!form[field].trim()) next[field] = "This field is required.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      next.email = "Please enter a valid email address.";
    if (!form.consent) next.consent = "Please agree before continuing.";
    setErrors(next);
    if (!Object.keys(next).length) {
      const id = `OAK-PC26-${crypto.randomUUID().slice(0, 6).toUpperCase()}`;
      localStorage.setItem("oak-registration", JSON.stringify({ ...form, id }));
      setSubmitted(true);
    }
  };
  if (submitted)
    return (
      <main>
        <Header />
        <section className="form-success">
          <div className="success-icon">
            <Check />
          </div>
          <p className="eyebrow">Registration received</p>
          <h1>
            You’re
            <br />
            <em>registered.</em>
          </h1>
          <p>
            Your details have been saved for the Partner Convening 2026. Your
            registration confirmation is ready to view.
          </p>
          <a className="button button-dark" href="/register/success">
            View confirmation <ArrowUpRight size={17} />
          </a>
        </section>
        <Footer />
      </main>
    );
  return (
    <main>
      <Header />
      <div className="page-intro register-intro">
        <p className="eyebrow">Registration</p>
        <h1>
          Make your
          <br />
          <em>place here.</em>
        </h1>
        <p>
          Tell us how to make the convening work well for you. Required fields
          are marked with an asterisk.
        </p>
      </div>
      <form className="registration-form" onSubmit={submit} noValidate>
        <FormSection number="01" title="Your details">
          <div className="form-grid">
            <Field
              label="First name"
              name="firstName"
              value={form.firstName}
              error={errors.firstName}
              update={update}
              required
            />
            <Field
              label="Last name"
              name="lastName"
              value={form.lastName}
              error={errors.lastName}
              update={update}
              required
            />
            <Field
              label="Email address"
              name="email"
              type="email"
              value={form.email}
              error={errors.email}
              update={update}
              required
            />
            <Field
              label="Phone number"
              name="phone"
              value={form.phone}
              error={errors.phone}
              update={update}
            />
          </div>
        </FormSection>
        <FormSection number="02" title="Your organisation">
          <div className="form-grid">
            <Field
              label="Organisation"
              name="organisation"
              value={form.organisation}
              error={errors.organisation}
              update={update}
              required
            />
            <Field
              label="Role / capacity"
              name="role"
              value={form.role}
              error={errors.role}
              update={update}
              required
            />
          </div>
        </FormSection>
        <FormSection number="03" title="Your requirements">
          <Field
            label="Dietary requirements"
            name="dietary"
            value={form.dietary}
            error={errors.dietary}
            update={update}
            textarea
          />
          <Field
            label="Accessibility requirements"
            name="accessibility"
            value={form.accessibility}
            error={errors.accessibility}
            update={update}
            textarea
          />
        </FormSection>
        <FormSection number="04" title="Travel & accommodation">
          <Field
            label="Travel and accommodation information"
            name="travel"
            value={form.travel}
            error={errors.travel}
            update={update}
            textarea
          />
        </FormSection>
        <FormSection number="05" title="Privacy & consent">
          <label className="consent">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(event) => update("consent", event.target.checked)}
            />
            <span>
              I agree to OAK Foundation&apos;s privacy policy and consent to my
              registration data being used for event coordination.
            </span>
          </label>
          {errors.consent && <p className="field-error">{errors.consent}</p>}
          <button className="button button-dark form-submit" type="submit">
            Complete registration <ArrowUpRight size={17} />
          </button>
        </FormSection>
      </form>
      <Footer />
    </main>
  );
}

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="form-section">
      <div className="form-section-title">
        <span>{number}</span>
        <h2>{title}</h2>
      </div>
      <div className="form-section-fields">{children}</div>
    </section>
  );
}
function Field({
  label,
  name,
  value,
  error,
  update,
  required,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: keyof FormData;
  value: string;
  error?: string;
  update: (field: keyof FormData, value: string) => void;
  required?: boolean;
  type?: string;
  textarea?: boolean;
}) {
  const inputProps = {
    id: name,
    name,
    value,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => update(name, event.target.value),
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${name}-error` : undefined,
  };
  return (
    <label className="field">
      {label}
      {required && " *"}
      {textarea ? (
        <textarea {...inputProps} rows={3} />
      ) : (
        <input {...inputProps} type={type} />
      )}
      {error && (
        <span className="field-error" id={`${name}-error`}>
          {error}
        </span>
      )}
    </label>
  );
}
