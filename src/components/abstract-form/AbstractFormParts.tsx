"use client";

import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ABSTRACT_MAX_WORDS,
  SCIENTIFIC_AREAS,
  TITLE_MAX_CHARS,
  countWords,
  parseKeywords,
  type AbstractProgram,
  type CommonAbstractInput,
  type Declaration,
  type FieldErrors,
} from "@/lib/abstractForm";
import base from "../SpeakerDetailsForm.module.css";
import styles from "../AbstractSubmissionForm.module.css";

export { base, styles };

type InputEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type TextChangeHandler = (e: InputEvent) => void;

// ---------------------------------------------------------------------------
// State + submit
// ---------------------------------------------------------------------------

export function useAbstractForm<T extends CommonAbstractInput>(options: {
  initial: () => T;
  validate: (form: T) => FieldErrors;
  program: AbstractProgram;
  thankYouPath: string;
  /** Message shown instead of the generic one when submit is blocked. */
  blockedMessage?: (form: T) => string | null;
}) {
  const router = useRouter();
  const [form, setForm] = useState<T>(options.initial);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverErrors, setServerErrors] = useState<FieldErrors>({});

  const { validate } = options;
  const errors = useMemo(() => validate(form), [form, validate]);
  const visibleErrors: FieldErrors = showErrors
    ? { ...serverErrors, ...errors }
    : {};

  function clearServerError(key: string) {
    if (!serverErrors[key]) return;
    setServerErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function setField<K extends keyof T>(key: K, value: T[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
    clearServerError(key as string);
  }

  const handleText: TextChangeHandler = (e) => {
    setField(e.target.name as keyof T, e.target.value as T[keyof T]);
  };

  function setDeclaration(key: string, checked: boolean) {
    setForm((prev) => ({
      ...prev,
      declarations: { ...prev.declarations, [key]: checked },
    }));
    clearServerError(`declarations.${key}`);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowErrors(true);
    setError(null);

    if (Object.keys(errors).length > 0) {
      setError(
        options.blockedMessage?.(form) ??
          "Please fix the highlighted fields before submitting."
      );
      requestAnimationFrame(() => {
        document
          .querySelector("[data-invalid='true']")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/abstract-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, program: options.program }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.fieldErrors) setServerErrors(result.fieldErrors);
        throw new Error(result?.error || "Failed to submit your abstract.");
      }

      router.push(options.thankYouPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  }

  return {
    form,
    setField,
    handleText,
    setDeclaration,
    visibleErrors,
    isSubmitting,
    error,
    handleSubmit,
  };
}

// ---------------------------------------------------------------------------
// Fields
// ---------------------------------------------------------------------------

interface TextFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: TextChangeHandler;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  type?: string;
  hint?: ReactNode;
  full?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: "numeric" | "text";
  placeholder?: string;
  extra?: ReactNode;
}

export function TextField(props: TextFieldProps) {
  const id = `f-${props.name}`;
  const inputClass = `${props.multiline ? base.textarea : base.input} ${
    props.error ? styles.inputError : ""
  }`;
  const common = {
    id,
    name: props.name,
    value: props.value,
    onChange: props.onChange,
    disabled: props.disabled,
    className: inputClass,
    maxLength: props.maxLength,
    placeholder: props.placeholder,
    "aria-invalid": Boolean(props.error),
    "aria-describedby": props.hint ? `${id}-hint` : undefined,
    "data-invalid": props.error ? "true" : undefined,
  };

  // Half-width fields sit side by side in a two-column grid. A hint above the
  // input would push that input lower than its neighbour, so it goes below.
  // Full-width fields keep instructions above, where they are read first.
  const hint = props.hint ? (
    <p id={`${id}-hint`} className={base.hint}>
      {props.hint}
    </p>
  ) : null;
  const hintAbove = Boolean(props.full);

  return (
    <div className={`${base.field} ${props.full ? base.fieldFull : ""}`}>
      <label className={base.label} htmlFor={id}>
        {props.label}
        {props.required && <span className={base.required}>*</span>}
      </label>
      {hintAbove && hint}
      {props.multiline ? (
        <textarea
          {...common}
          style={props.rows ? { minHeight: props.rows * 26 } : undefined}
        />
      ) : (
        <input
          {...common}
          type={props.type ?? "text"}
          autoComplete={props.autoComplete}
          inputMode={props.inputMode}
        />
      )}
      {!hintAbove && hint}
      {props.extra}
      {props.error && <p className={styles.fieldError}>{props.error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: TextChangeHandler;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  full?: boolean;
  placeholder?: string;
}

export function SelectField(props: SelectFieldProps) {
  const id = `f-${props.name}`;
  return (
    <div
      className={`${base.field} ${props.full ? base.fieldFull : ""}`}
      data-invalid={props.error ? "true" : undefined}
    >
      <label className={base.label} htmlFor={id}>
        {props.label}
        {props.required && <span className={base.required}>*</span>}
      </label>
      <select
        id={id}
        name={props.name}
        className={`${base.select} ${props.error ? styles.inputError : ""}`}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      >
        <option value="">{props.placeholder ?? "Select an option"}</option>
        {props.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {props.error && <p className={styles.fieldError}>{props.error}</p>}
    </div>
  );
}

export function CategoryPicker(props: {
  categories: readonly { value: string; label: string; description: string }[];
  value: string;
  onChange: TextChangeHandler;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <fieldset
      className={base.field}
      data-invalid={props.error ? "true" : undefined}
    >
      <legend className={base.label}>
        Category<span className={base.required}>*</span>
      </legend>
      <div className={styles.categoryOptions}>
        {props.categories.map((c) => (
          <label
            key={c.value}
            className={`${styles.categoryOption} ${
              props.value === c.value ? styles.categoryOptionActive : ""
            }`}
          >
            <input
              type="radio"
              name="category"
              value={c.value}
              checked={props.value === c.value}
              onChange={props.onChange}
              disabled={props.disabled}
            />
            <span>
              <span className={styles.categoryTitle}>{c.label}</span>
              <span className={styles.categoryDesc}>{c.description}</span>
            </span>
          </label>
        ))}
      </div>
      {props.error && <p className={styles.fieldError}>{props.error}</p>}
    </fieldset>
  );
}

export function CheckboxField(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  required?: boolean;
  error?: string;
  disabled?: boolean;
}) {
  return (
    <label
      className={styles.checkbox}
      data-invalid={props.error ? "true" : undefined}
    >
      <input
        type="checkbox"
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
        disabled={props.disabled}
      />
      <span>
        {props.label}
        {props.required && <span className={base.required}>*</span>}
        {props.error && <span className={styles.fieldError}> {props.error}</span>}
      </span>
    </label>
  );
}

// ---------------------------------------------------------------------------
// Sections shared by both programs
// ---------------------------------------------------------------------------

interface SectionProps {
  form: CommonAbstractInput;
  onChange: TextChangeHandler;
  errors: FieldErrors;
  disabled: boolean;
}

export function KeyDatesTable({ rows }: { rows: [string, string][] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.infoTable}>
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([milestone, date]) => (
            <tr key={milestone}>
              <td>{milestone}</td>
              <td>{date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApplicantSection({ form, onChange, errors, disabled }: SectionProps) {
  const f = (name: keyof CommonAbstractInput & string) => ({
    name,
    value: form[name] as string,
    onChange,
    error: errors[name],
    disabled,
  });

  return (
    <section className={base.section}>
      <div className={base.sectionHeader}>
        <h2>A. Your details</h2>
      </div>
      <div className={base.grid2}>
        <TextField {...f("firstName")} label="First name" required autoComplete="given-name" />
        <TextField {...f("lastName")} label="Last name" required autoComplete="family-name" />
        <TextField {...f("preferredName")} label="Preferred name" hint="For your badge" />
        <TextField {...f("pronouns")} label="Pronouns" />
        <TextField {...f("email")} label="Email" required type="email" autoComplete="email" hint="Confirmation sent here" />
        <TextField {...f("phone")} label="Phone" required type="tel" autoComplete="tel" />
        <TextField {...f("location")} label="City, province/state, country" required full />
        <TextField
          {...f("linkedinUrl")}
          label="LinkedIn profile"
          type="url"
          full
          hint="Used for Spotlight features"
          placeholder="https://www.linkedin.com/in/..."
        />
      </div>
    </section>
  );
}

export function ScientificAbstractSection({
  letter,
  children,
  ...props
}: SectionProps & { letter: string; children?: ReactNode }) {
  const { form, onChange, errors, disabled } = props;
  const f = (name: keyof CommonAbstractInput & string) => ({
    name,
    value: form[name] as string,
    onChange,
    error: errors[name],
    disabled,
  });
  const wordCount = countWords(form.abstract);
  const keywordCount = parseKeywords(form.keywords).length;

  return (
    <section className={base.section}>
      <div className={base.sectionHeader}>
        <h2>{letter}. Scientific Abstract Submission</h2>
      </div>

      <div className={base.grid2}>
        <TextField
          {...f("title")}
          label="Abstract title"
          required
          full
          maxLength={TITLE_MAX_CHARS}
          hint="Max 180 characters, including spaces"
          extra={
            <span className={styles.counter}>
              {form.title.length} / {TITLE_MAX_CHARS} characters
            </span>
          }
        />
        <TextField
          {...f("authors")}
          label="Authors"
          required
          full
          multiline
          rows={3}
          hint="All authors in order; presenting author must be the applicant"
        />
        <TextField
          {...f("affiliations")}
          label="Affiliations"
          required
          full
          multiline
          rows={3}
          hint="Numbered to match the authors"
        />
        <SelectField
          {...f("scientificArea")}
          label="Scientific area"
          required
          full={form.scientificArea !== "Other"}
          options={SCIENTIFIC_AREAS}
          placeholder="Select an area"
        />
        {form.scientificArea === "Other" && (
          <TextField {...f("scientificAreaOther")} label="Your scientific area" required />
        )}
        <TextField
          {...f("abstract")}
          label="Abstract"
          required
          full
          multiline
          rows={12}
          hint="Max 250 words, excluding title, authors and affiliations. Include background, aims, methods, results and conclusions, without section headers. The work presented must reflect the submitted abstract"
          extra={
            <span
              className={`${styles.counter} ${
                wordCount > ABSTRACT_MAX_WORDS ? styles.counterOver : ""
              }`}
            >
              {wordCount} / {ABSTRACT_MAX_WORDS} words
            </span>
          }
        />
        <TextField
          {...f("keywords")}
          label="Keywords"
          required
          full
          hint="3–5"
          placeholder="Separate keywords with commas"
          extra={<span className={styles.counter}>{keywordCount} keywords</span>}
        />
      </div>
      {children}
    </section>
  );
}

export function DeclarationsSection(props: {
  letter: string;
  declarations: readonly Declaration[];
  values: Record<string, boolean>;
  onToggle: (key: string, checked: boolean) => void;
  errors: FieldErrors;
  disabled: boolean;
}) {
  return (
    <section className={base.section}>
      <div className={base.sectionHeader}>
        <h2>{props.letter}. Declarations</h2>
      </div>
      <div className={base.checklist}>
        {props.declarations.map((d) => (
          <CheckboxField
            key={d.key}
            checked={Boolean(props.values[d.key])}
            onChange={(checked) => props.onToggle(d.key, checked)}
            label={d.label}
            required
            error={props.errors[`declarations.${d.key}`]}
            disabled={props.disabled}
          />
        ))}
      </div>
    </section>
  );
}

export function SubmitActions(props: {
  error: string | null;
  isSubmitting: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={base.actions}>
      {props.error && (
        <p className={`${base.message} ${base.messageError}`} role="alert">
          {props.error}
        </p>
      )}
      <button
        type="submit"
        className={base.submit}
        disabled={props.isSubmitting || props.disabled}
      >
        {props.isSubmitting ? "Submitting..." : "Submit abstract"}
      </button>
    </div>
  );
}

export function AbstractThankYou(props: { kicker: string }) {
  return (
    <section className={base.page}>
      <div className={base.shell}>
        <div className={base.hero}>
          <p className={base.kicker}>{props.kicker}</p>
          <h1>Thank you</h1>
          <p>
            Your abstract was submitted successfully. We appreciate you sharing
            your research with True North Spatial 2027.
          </p>
        </div>

        <div className={base.card}>
          <div className={base.thankYouBody}>
            <p className={base.thankYouLead}>
              Decisions will be sent by 10 February 2027.
            </p>
            <p>
              Please wait for your decision before registering. If your abstract
              is accepted, you will receive a personal code for 10% off
              registration, along with details on preparing your 5-slide pitch
              deck.
            </p>
            <Link href="/" className={base.lumaButton}>
              Return to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "Introduction" section. Verbatim from both TNS2027 call documents (ES and
 * ECS use the same text, including the last line). `callLine` lets a page
 * override that last line if the source document changes.
 */
export function CallIntroduction({ callLine }: { callLine?: ReactNode }) {
  return (
    <section className={base.section}>
      <div className={base.sectionHeader}>
        <h2>Introduction</h2>
      </div>
      <div className={styles.prose}>
        <p><strong>Panoramics - A Vision is proud to present</strong></p>
        <p className={styles.introLead}>True North Spatial 2027</p>
        <p className={styles.introTagline}>
          Find your True North, Find your Panorama
        </p>
        <p>
          At True North Spatial, Panoramics - A Vision invites you to find your
          True North - the identity you hold as an individual, as a team, as an
          organization.
        </p>
        <p>
          Your identity is the foundation of your creative individuality and
          the responsibility you carry in shaping the experiences of those
          around you. It is what allows you to move from tunnel vision to
          panorama - the expansive view that connects your work to the
          collective, and lets you respond, react, and collaborate
          meaningfully.
        </p>
        <p>
          In a field as multi-scaled and multi-institutional as spatial and
          single-cell biology, finding your True North is what makes collective
          vision possible.
        </p>
        <p>True North Spatial 2027 is built on this idea.</p>
        <p>In the second edition of True North Spatial, we now level up.</p>
        <p>
          True North Spatial 2027 takes place <strong>27–29 April 2027</strong>{" "}
          in Toronto.
        </p>
        <p>
          {callLine ?? (
            <>
              This call is for the <strong>Emerging Scientists</strong>:
              students who want to present their research and build the skills
              to share it.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
