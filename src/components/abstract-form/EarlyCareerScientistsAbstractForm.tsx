"use client";

/*
 * Every piece of text shown to applicants on this page is copied verbatim
 * (including bold) from
 * "01a-ECS-TNS2027 Abstract Submission Form Early Career Scientists.docx".
 * Do not reword it here; change the source document first.
 */

import Link from "next/link";
import {
  ECS_CATEGORIES,
  ECS_DECLARATIONS,
  ECS_INVESTIGATOR_CATEGORY,
  ECS_LOOKING_FOR,
  ECS_SECTORS,
  emptyEarlyCareerInput,
  validateEarlyCareerAbstract,
  type EarlyCareerAbstractInput,
} from "@/lib/abstractForm";
import {
  ApplicantSection,
  CallIntroduction,
  CategoryPicker,
  CheckboxField,
  DeclarationsSection,
  KeyDatesTable,
  ScientificAbstractSection,
  SelectField,
  SubmitActions,
  TextField,
  base,
  styles,
  useAbstractForm,
} from "./AbstractFormParts";

const KEY_DATES: [string, string][] = [
  ["Call opens", "Week of 25 November 2026"],
  ["Submission deadline", "31 January 2027, 11:59 PM ET"],
  ["Decisions sent", "By 10 February 2027"],
  ["Register with presenter code", "By 26 February 2027"],
  ["5-slide deck and Spotlight video due", "By 28 February 2027"],
  ["Decks live on TNS website", "From 1 March 2027"],
  ["Summit", "27–29 April 2027, MaRS Discovery District, Toronto"],
];

/** The document bolds "5 years" inside the Early-Career Investigators description. */
function categoryDescription(description: string) {
  const parts = description.split("5 years");
  if (parts.length !== 2) return description;
  return (
    <>
      {parts[0]}
      <strong>5 years</strong>
      {parts[1]}
    </>
  );
}

export default function EarlyCareerScientistsAbstractForm() {
  const {
    form,
    setField,
    handleText,
    setDeclaration,
    visibleErrors: errors,
    isSubmitting,
    error,
    handleSubmit,
  } = useAbstractForm<EarlyCareerAbstractInput>({
    initial: emptyEarlyCareerInput,
    validate: validateEarlyCareerAbstract,
    program: "early-career",
    thankYouPath: "/abstract-form/early-career-scientists/thank-you",
  });

  const isInvestigator = form.category === ECS_INVESTIGATOR_CATEGORY;

  const f = (name: keyof EarlyCareerAbstractInput & string) => ({
    name,
    value: form[name] as string,
    onChange: handleText,
    error: errors[name],
    disabled: isSubmitting,
  });
  const sectionProps = {
    form,
    onChange: handleText,
    errors,
    disabled: isSubmitting,
  };

  function toggleLookingFor(option: string, checked: boolean) {
    const next = checked
      ? [...form.lookingFor, option]
      : form.lookingFor.filter((v) => v !== option);
    setField("lookingFor", next);
  }

  return (
    <section className={base.page}>
      <div className={base.shell}>
        <div className={base.hero}>
          <h1>TNS2027 Abstract Submission Form: Early Career Scientist</h1>
          <p>
            <strong>Deadline - 26 January 2027</strong>
          </p>
        </div>

        <div className={base.card}>
          <form className={base.form} onSubmit={handleSubmit} noValidate>
            <CallIntroduction />

            {/* General information */}
            <section className={base.section}>
              <div className={base.sectionHeader}>
                <h2>General Information</h2>
              </div>

              <div className={styles.prose}>
                <h3 className={styles.subhead}>Key milestones</h3>
                <p>
                  All times are Eastern Time (Toronto).{" "}
                  <strong>No late submissions will be accepted.</strong>
                </p>
              </div>
              <KeyDatesTable rows={KEY_DATES} />

              <div className={styles.prose}>
                <h3 className={styles.subhead}>Who can submit</h3>
                <p>
                  Early Career Scientists are professionals working in
                  research, in academia, hospitals, institutes, industry or
                  startups, within roughly the first <strong>10 years</strong>{" "}
                  of their research career (excluding career breaks such as
                  parental leave).
                </p>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.infoTable}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Who it covers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ECS_CATEGORIES.map((c) => (
                      <tr key={c.value}>
                        <td><strong>{c.label}</strong></td>
                        <td>{categoryDescription(c.description)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.prose}>
                <p>
                  <strong>Note:</strong> If you are enrolled in a degree
                  program (including MD/PhD), please submit under the{" "}
                  <Link href="/abstract-form/emerging-scientists">
                    Emerging Scientists call
                  </Link>{" "}
                  instead.
                </p>

                <h3 className={styles.subhead}>Presentation format and selection</h3>
                <p>
                  <strong>
                    There are no physical posters and no poster screens at
                    TNS2027.
                  </strong>{" "}
                  Every selected presenter gives a{" "}
                  <strong>5-slide digital pitch deck</strong>:
                </p>
                <ul className={styles.infoList}>
                  <li>
                    Your deck is hosted on the TNS website and opens from a{" "}
                    <strong>QR code on your badge</strong>, so anyone you meet
                    can view it on their phone.
                  </li>
                  <li>
                    You present it <strong>in person by pitching</strong>: at
                    the Early Career Scientists pitch session on Day 1, you
                    host your own standing table during lunch while attendees,
                    partners and vendors come to hear about your work.
                  </li>
                </ul>
                <p>Selected presenters must attend in person.</p>
                <p>
                  <strong>Selection.</strong> Up to <strong>25</strong> Early
                  Career Scientist abstracts will be selected. From these,{" "}
                  <strong>6</strong> are invited to give a{" "}
                  <strong>20-minute talk</strong> in the main program, two on
                  each day of the summit.
                </p>
                <p>
                  Every selected presenter, whether or not chosen for a talk,
                  prepares a 5-slide pitch deck and pitches at the session.
                </p>

                <h3 className={styles.subhead}>Your 5-slide pitch deck</h3>
                <p>
                  Selected presenters prepare a 5-slide digital pitch deck, the
                  business-standard format. There are no physical posters, PDF
                  posters or printed materials. The following format will be
                  used for each digital pitch deck.
                </p>
                <ol className={styles.infoList} style={{ listStyle: "decimal" }}>
                  <li>Title, authors and affiliations</li>
                  <li>Background and the problem you are solving</li>
                  <li>Approach and methods</li>
                  <li>Key findings (1–2)</li>
                  <li>
                    Impact, next steps and what you are looking for
                    (collaborators, partners, opportunities)
                  </li>
                </ol>
                <p>
                  Decks are hosted on the TNS website from 1 March 2027 and
                  open from the QR code on your badge.
                </p>

                <h3 className={styles.subhead}>Registration and presenter discount</h3>
                <p>
                  Selected presenters must register for TNS2027 and pay the
                  registration fee.
                </p>
                <p>
                  <strong>Please wait for your decision before registering.</strong>{" "}
                  Accepted presenters receive a personal code for{" "}
                  <strong>10% off</strong> registration with their acceptance
                  email.
                </p>
                <p>
                  <strong>Register with your code by 26 February 2027</strong>{" "}
                  to confirm your place. Places not confirmed by then may be
                  offered to waitlisted applicants.
                </p>

                <h3 className={styles.subhead}>What selected presenters receive</h3>
                <p>
                  Selected Early Career Scientists join a professional program
                  built around visibility and career growth.
                </p>
                <ul className={styles.infoList}>
                  <li>
                    <strong>Pitch session during lunch (Day 1).</strong> Host
                    your own table and meet attendees, partners and technology
                    leaders.
                  </li>
                  <li>
                    <strong>
                      Participation in an Early Career Scientists breakfast
                      workshop (Day 2, early morning).
                    </strong>{" "}
                    An exclusive professional development session for selected
                    ECS.
                  </li>
                  <li>
                    <strong>Your deck online before the summit.</strong> Your
                    deck and abstract are hosted on the TNS website from 1
                    March 2027, giving you about two months of visibility.
                  </li>
                  <li>
                    <strong>Written feedback.</strong> Personal written
                    feedback on your pitch, focused on advancing your career.
                  </li>
                  <li>
                    <strong>Certificate of selection</strong> for your CV and
                    LinkedIn.
                  </li>
                  <li>
                    <strong>People&apos;s Choice award.</strong>
                  </li>
                </ul>
              </div>
            </section>

            {/* A. Your details */}
            <ApplicantSection {...sectionProps} />

            {/* B. Role and eligibility */}
            <section className={base.section}>
              <div className={base.sectionHeader}>
                <h2>B. Role and eligibility</h2>
              </div>

              <CategoryPicker
                categories={ECS_CATEGORIES}
                value={form.category}
                onChange={handleText}
                error={errors.category}
                disabled={isSubmitting}
              />

              <div className={base.grid2}>
                <TextField
                  {...f("jobTitle")}
                  label="Job title"
                  required
                  hint="e.g. Postdoctoral Fellow, Staff Scientist"
                />
                <TextField
                  {...f("organizationAndDepartment")}
                  label="Organization and department"
                  required
                  hint="University, hospital, institute or company"
                />
                <SelectField
                  {...f("sector")}
                  label="Sector"
                  required
                  full={form.sector !== "Other"}
                  options={ECS_SECTORS}
                  placeholder="Select a sector"
                />
                {form.sector === "Other" && (
                  <TextField {...f("sectorOther")} label="Other" required />
                )}
                <TextField
                  {...f("highestDegree")}
                  label="Highest degree and year awarded"
                  required
                  full
                  hint="Any degree; a PhD is not required"
                />
                <TextField
                  {...f("researchStartYear")}
                  label="Year you began your research career"
                  required
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="YYYY"
                />
                {isInvestigator && (
                  <TextField
                    {...f("firstAppointmentYear")}
                    label="Year of first independent appointment"
                    required
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="YYYY"
                  />
                )}
                <TextField
                  {...f("careerBreaks")}
                  label="Career breaks to exclude"
                  full
                  hint="e.g. parental leave, months"
                />
              </div>
            </section>

            {/* C. Scientific Abstract Submission */}
            <ScientificAbstractSection {...sectionProps} letter="C">
              <fieldset className={base.field}>
                <legend className={base.label}>
                  What are you looking for at TNS2027?
                </legend>
                <p className={base.hint}>
                  Helps match you with the right people at the pitch session
                </p>
                <div className={base.grid2}>
                  {ECS_LOOKING_FOR.map((option) => (
                    <CheckboxField
                      key={option}
                      checked={form.lookingFor.includes(option)}
                      onChange={(checked) => toggleLookingFor(option, checked)}
                      label={option}
                      disabled={isSubmitting}
                    />
                  ))}
                </div>
                {form.lookingFor.includes("Other") && (
                  <TextField {...f("lookingForOther")} label="Other" />
                )}
                {errors.lookingFor && (
                  <p className={styles.fieldError}>{errors.lookingFor}</p>
                )}
              </fieldset>
            </ScientificAbstractSection>

            {/* D. Declarations */}
            <DeclarationsSection
              letter="D"
              declarations={ECS_DECLARATIONS}
              values={form.declarations}
              onToggle={setDeclaration}
              errors={errors}
              disabled={isSubmitting}
            />

            <SubmitActions error={error} isSubmitting={isSubmitting} />
          </form>
        </div>
      </div>
    </section>
  );
}
