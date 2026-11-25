"use client";

/*
 * Every piece of text shown to applicants on this page is copied verbatim
 * from "01b-ES-TNS2027 Abstract Submission Form Emerging Scientists.docx".
 * Do not reword it here; change the source document first.
 */

import Link from "next/link";
import {
  ES_CATEGORIES,
  ES_DECLARATIONS,
  ES_UNDER_AGE_MESSAGE,
  emptyEmergingInput,
  getCategoryGroup,
  getExplorerAgeStatus,
  validateEmergingAbstract,
  type EmergingAbstractInput,
} from "@/lib/abstractForm";
import {
  ApplicantSection,
  CallIntroduction,
  CategoryPicker,
  CheckboxField,
  DeclarationsSection,
  KeyDatesTable,
  ScientificAbstractSection,
  SubmitActions,
  TextField,
  base,
  styles,
  useAbstractForm,
} from "./AbstractFormParts";

const KEY_DATES: [string, string][] = [
  ["Call opens", "25 November 2026"],
  ["Submission deadline", "26 January 2027, 11:59 PM ET"],
  ["Decisions sent", "By 10 February 2027"],
  ["Register with discount code", "By 26 February 2027"],
  ["5-slide deck due", "By 26 February 2027"],
  ["Decks live on TNS website", "From 1 March 2027"],
  ["Summit", "27–29 April 2027, MaRS Discovery District, Toronto"],
];

function isIneligibleExplorer(form: EmergingAbstractInput) {
  return (
    getCategoryGroup(form.category) === "explorers" &&
    getExplorerAgeStatus(form.dateOfBirth) === "ineligible"
  );
}

export default function EmergingScientistsAbstractForm() {
  const {
    form,
    setField,
    handleText,
    setDeclaration,
    visibleErrors: errors,
    isSubmitting,
    error,
    handleSubmit,
  } = useAbstractForm<EmergingAbstractInput>({
    initial: emptyEmergingInput,
    validate: validateEmergingAbstract,
    program: "emerging",
    thankYouPath: "/abstract-form/emerging-scientists/thank-you",
    blockedMessage: (f) => (isIneligibleExplorer(f) ? ES_UNDER_AGE_MESSAGE : null),
  });

  const group = getCategoryGroup(form.category);
  const ageStatus =
    group === "explorers" ? getExplorerAgeStatus(form.dateOfBirth) : "unknown";
  const isMinor = ageStatus === "minor";
  const isIneligible = ageStatus === "ineligible";
  const isExplorer = group === "explorers";

  const f = (name: keyof EmergingAbstractInput & string) => ({
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

  return (
    <section className={base.page}>
      <div className={base.shell}>
        <div className={base.hero}>
          <h1>TNS2027 Abstract Submission Form: Emerging Scientists Program</h1>
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
                  Emerging Scientists are students currently enrolled in a
                  degree program or in high school. Choose the category that
                  matches your status on the day of submission.
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
                    {ES_CATEGORIES.map((c) => (
                      <tr key={c.value}>
                        <td><strong>{c.label}</strong></td>
                        <td>{c.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className={styles.prose}>
                <p>
                  <strong>Note:</strong> If you are employed in research (for
                  example as a technician, research assistant or postdoctoral
                  fellow), please submit under the{" "}
                  <Link href="/abstract-form/early-career-scientists">
                    Early Career Scientists call
                  </Link>{" "}
                  instead.
                </p>
              </div>

              <div className={styles.callout}>
                <h3 className={styles.subhead} style={{ marginTop: 0 }}>
                  Important for ES Explorers: additional requirements
                </h3>
                <p>
                  <strong>Age &amp; Consent Requirements:</strong> Applicants
                  must be at least <strong>16 years old by 25 April 2027</strong>{" "}
                  to participate.
                </p>
                <ul className={styles.infoList}>
                  <li>
                    <strong>
                      Under 18 on 25 April 2027 (ages 16–17 on 25 April 2027,
                      including 15-year-old applicants turning 16 before this
                      day):
                    </strong>{" "}
                    Must provide an emergency contact upon submission. If
                    accepted, a parent or legal guardian must sign a consent
                    form prior to the event.
                  </li>
                  <li>
                    <strong>18 or older on 25 April 2027 (High School):</strong>{" "}
                    Must provide an emergency contact upon submission.
                  </li>
                </ul>
              </div>

              <div className={styles.prose}>
                <h3 className={styles.subhead}>Presentation format and selection</h3>
                <p>
                  <strong>
                    There are no physical posters and no poster boards at
                    TNS2027.
                  </strong>{" "}
                  Every selected presenter submits a{" "}
                  <strong>5-slide digital pitch deck</strong>:
                </p>
                <ul className={styles.infoList}>
                  <li>
                    Your deck is hosted on the TNS website and opens from a{" "}
                    <strong>QR code on your badge</strong>, so anyone you meet
                    can view it on their electronic device.
                  </li>
                  <li>
                    You present it <strong>in person by pitching</strong> at
                    the Emerging Scientists pitch lunch. The format, style of
                    presentation will be provided once your abstract is
                    accepted.
                  </li>
                </ul>
                <p><strong>Selected presenters must attend in person.</strong></p>
                <p>
                  <strong>Selection.</strong> Up to <strong>40</strong>{" "}
                  Emerging Scientist abstracts will be selected. From these, the top scoring
                  abstract presenters are invited to present on the main stage
                  on Day 2 Enlighten-me Chapter day:
                </p>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.infoTable}>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Stage format</th>
                      <th>Spots</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>ES Scholars</td><td>12-minute talk</td><td>Up to 2</td></tr>
                    <tr><td>ES Scholars</td><td>Pecha Kucha (20 slides × 20 seconds)</td><td>Up to 6</td></tr>
                    <tr><td>ES Explorers</td><td>3-minute talk with one slide</td><td>Up to 3</td></tr>
                  </tbody>
                </table>
              </div>
              <div className={styles.prose}>
                <p>
                  <strong>
                    Note: Every selected presenter, whether or not chosen for
                    the stage, prepares a 5-slide pitch deck and pitches at the
                    ES lunch on Day 2.
                  </strong>
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
                  <li>Background and research question</li>
                  <li>Approach and methods</li>
                  <li>Key findings (1–2)</li>
                  <li>Conclusion and future directions</li>
                </ol>
                <p>
                  Decks are hosted on the TNS website from March 1, 2027 and
                  open from the QR code on your badge during the summit.
                </p>

                <h3 className={styles.subhead}>Registration and presenter discount</h3>
                <p>
                  Selected presenters must register for TNS2027 and pay the
                  registration fee.
                </p>
                <p>
                  <strong>Please wait for your abstract decision before registering.</strong>{" "}
                  Accepted presenters receive a personal code for{" "}
                  <strong>10% off</strong> registration with their acceptance
                  email.
                </p>
                <p>
                  <strong>Register with your code by 26 February 2027</strong>{" "}
                  to confirm your place. Places not confirmed by then may be offered to
                  waitlisted applicants.
                </p>

                <h3 className={styles.subhead}>What selected presenters receive</h3>
                <p>
                  Selected Emerging Scientists join a dedicated program built
                  around presenting with confidence.
                </p>
                <ul className={styles.infoList}>
                  <li>
                    <strong>
                      Participation in a special pitch workshop (Day 1, lunch
                      &amp; learn).
                    </strong>{" "}
                    A presentation and pitching workshop, so you are ready
                    before you pitch.
                  </li>
                  <li>
                    <strong>Emerging Scientists pitch lunch (Day 2, lunch).</strong>{" "}
                    Pitch your work directly to invited scientists, industry
                    leaders and partners.
                  </li>
                  <li>
                    <strong>Your deck online before the summit.</strong> Your
                    deck and abstract are hosted on the TNS website from March
                    1, 2027, giving you about two months of visibility.
                  </li>
                  <li>
                    <strong>Written feedback.</strong> Personal written
                    feedback on your pitch, focused on helping you grow as a
                    scientist.
                  </li>
                  <li>
                    <strong>Certificate of selection</strong> for your CV and
                    LinkedIn.
                  </li>
                  <li>
                    <strong>People&apos;s Choice award</strong>, voted by
                    guests at the pitch lunch.
                  </li>
                </ul>
              </div>
            </section>

            {/* A. Your details */}
            <ApplicantSection {...sectionProps} />

            {/* B. Category and studies */}
            <section className={base.section}>
              <div className={base.sectionHeader}>
                <h2>B. Category and studies</h2>
              </div>

              <CategoryPicker
                categories={ES_CATEGORIES}
                value={form.category}
                onChange={handleText}
                error={errors.category}
                disabled={isSubmitting}
              />

              {group && (
                <div className={base.grid2}>
                  {group === "scholars" && (
                    <>
                      <TextField {...f("programAndYear")} label="Program and year (e.g. PhD, Year 3)" required />
                      <TextField {...f("universityAndDepartment")} label="University and department" required />
                    </>
                  )}
                  {isExplorer && (
                    <TextField {...f("schoolAndGrade")} label="School name and grade" required full />
                  )}
                </div>
              )}

              <div className={base.field}>
                <p className={styles.groupLabel}>
                  Supervisor, teacher or mentor: name and email
                  <span className={base.required}>*</span>
                </p>
                <p className={base.hint}>Confirms the work is genuine</p>
                <div className={base.grid2}>
                  <TextField {...f("supervisorName")} label="Name" required />
                  <TextField {...f("supervisorEmail")} label="Email" required type="email" />
                </div>
              </div>
            </section>

            {/* C. Explorers safeguarding (Explorers only) */}
            {isExplorer && (
              <section className={base.section}>
                <div className={base.sectionHeader}>
                  <h2>C. Explorers safeguarding (Explorers only)</h2>
                </div>

                <div className={base.grid2}>
                  <TextField
                    {...f("dateOfBirth")}
                    label="Date of birth"
                    required
                    type="date"
                    full
                    hint="Under 16 on 25 April 2027 = not eligible; 16–17 triggers consent"
                  />
                </div>

                {isIneligible && (
                  <div className={styles.blocked} role="alert">
                    {ES_UNDER_AGE_MESSAGE}
                  </div>
                )}

                {!isIneligible && ageStatus !== "unknown" && (
                  <>
                    {isMinor && (
                      <div className={base.field}>
                        <p className={styles.groupLabel}>
                          Parent or guardian: name, email, phone
                          <span className={base.required}>*</span>
                        </p>
                        <div className={base.grid2}>
                          <TextField {...f("guardianName")} label="Name" required full />
                          <TextField {...f("guardianEmail")} label="Email" required type="email" />
                          <TextField {...f("guardianPhone")} label="Phone" required type="tel" />
                        </div>
                      </div>
                    )}

                    <div className={base.field}>
                      <p className={styles.groupLabel}>
                        Emergency contact: name, relationship, phone
                        <span className={base.required}>*</span>
                      </p>
                      <div className={base.grid2}>
                        <TextField {...f("emergencyName")} label="Name" required />
                        <TextField {...f("emergencyRelationship")} label="Relationship" required />
                        <TextField {...f("emergencyPhone")} label="Phone" required type="tel" />
                      </div>
                    </div>

                    {isMinor && (
                      <div className={base.field}>
                        <p className={styles.groupLabel}>Consent acknowledgement</p>
                        <CheckboxField
                          checked={form.guardianConsentAcknowledged}
                          onChange={(checked) =>
                            setField("guardianConsentAcknowledged", checked)
                          }
                          label="I understand a signed parent/guardian consent form will be required if I am selected."
                          required
                          disabled={isSubmitting}
                        />
                        <p className={base.hint}>
                          The form itself is emailed after acceptance, not
                          uploaded here.
                        </p>
                        {errors.guardianConsentAcknowledged && (
                          <p className={styles.fieldError}>
                            {errors.guardianConsentAcknowledged}
                          </p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </section>
            )}

            {/* D. Scientific Abstract Submission */}
            <ScientificAbstractSection {...sectionProps} letter="D" />

            {/* E. Declarations */}
            <DeclarationsSection
              letter="E"
              declarations={ES_DECLARATIONS}
              values={form.declarations}
              onToggle={setDeclaration}
              errors={errors}
              disabled={isSubmitting}
            />

            <SubmitActions error={error} isSubmitting={isSubmitting} disabled={isIneligible} />
          </form>
        </div>
      </div>
    </section>
  );
}
