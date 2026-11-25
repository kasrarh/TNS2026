"use client";

import Link from "next/link";
import {
  ABSTRACT_DEADLINES,
  ES_CATEGORIES,
  ES_DECLARATIONS,
  emptyEmergingInput,
  getCategoryGroup,
  getExplorerAgeStatus,
  validateEmergingAbstract,
  type EmergingAbstractInput,
} from "@/lib/abstractForm";
import {
  ApplicantSection,
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
  ["Submission deadline", ABSTRACT_DEADLINES.emerging.label],
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
    blockedMessage: (f) =>
      isIneligibleExplorer(f)
        ? "ES Explorers must be at least 16 years old on 25 April 2027."
        : null,
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
          <p className={base.kicker}>TNS2027 Call for Abstracts</p>
          <h1>Emerging Scientists Program</h1>
          <p>
            This call is for Emerging Scientists: students who want to present
            their research at True North Spatial 2027 and build the skills to
            share it. The summit takes place 27 to 29 April 2027 at the MaRS
            Discovery District in Toronto.
          </p>
          <p>
            <strong>Deadline: {ABSTRACT_DEADLINES.emerging.label}.</strong> No
            late submissions will be accepted.
          </p>
        </div>

        <div className={base.card}>
          <form className={base.form} onSubmit={handleSubmit} noValidate>
            <section className={base.section}>
              <div className={base.sectionHeader}>
                <h2>Before you start</h2>
                <p>
                  Read the key dates, who can submit and how selection works.
                  All times are Eastern Time (Toronto).
                </p>
              </div>

              <KeyDatesTable rows={KEY_DATES} />

              <details className={styles.details}>
                <summary>Presentation format, selection and what you receive</summary>
                <div className={styles.detailsBody}>
                  <h3>Presentation format</h3>
                  <p className={base.hint}>
                    There are no physical posters at TNS2027. Every selected
                    presenter submits a 5-slide digital pitch deck, hosted on
                    the TNS website and opened from a QR code on your badge.
                    You pitch it in person at the Emerging Scientists pitch
                    lunch. Selected presenters must attend in person.
                  </p>
                  <ul className={styles.infoList}>
                    <li>Title, authors and affiliations</li>
                    <li>Background and research question</li>
                    <li>Approach and methods</li>
                    <li>Key findings (1–2)</li>
                    <li>Conclusion and future directions</li>
                  </ul>

                  <h3>Selection</h3>
                  <p className={base.hint}>
                    Up to 40 Emerging Scientist abstracts will be selected. The
                    top-scoring presenters are invited to the main stage on Day
                    2, Enlighten-me Chapter day:
                  </p>
                  <div className={styles.tableWrap}>
                    <table className={styles.infoTable}>
                      <thead>
                        <tr><th>Category</th><th>Stage format</th><th>Spots</th></tr>
                      </thead>
                      <tbody>
                        <tr><td>ES Scholars</td><td>12-minute talk</td><td>Up to 2</td></tr>
                        <tr><td>ES Scholars</td><td>Pecha Kucha (20 slides × 20 seconds)</td><td>Up to 6</td></tr>
                        <tr><td>ES Explorers</td><td>3-minute talk with one slide</td><td>Up to 3</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h3>Registration</h3>
                  <p className={base.hint}>
                    Selected presenters must register and pay the registration
                    fee. Please wait for your decision before registering:
                    accepted presenters receive a personal code for 10% off.
                    Register by 26 February 2027 to confirm your place.
                  </p>

                  <h3>What selected presenters receive</h3>
                  <ul className={styles.infoList}>
                    <li>A pitch workshop (Day 1, lunch &amp; learn)</li>
                    <li>The Emerging Scientists pitch lunch (Day 2)</li>
                    <li>Your deck and abstract online from 1 March 2027</li>
                    <li>Personal written feedback on your pitch</li>
                    <li>A certificate of selection for your CV and LinkedIn</li>
                    <li>A chance at the People&apos;s Choice award</li>
                  </ul>
                </div>
              </details>
            </section>

            <ApplicantSection {...sectionProps} />

            <section className={base.section}>
              <div className={base.sectionHeader}>
                <h2>B. Category and studies</h2>
                <p>
                  Choose the category that matches your status on the day you
                  submit.
                </p>
              </div>

              <CategoryPicker
                categories={ES_CATEGORIES}
                value={form.category}
                onChange={handleText}
                error={errors.category}
                disabled={isSubmitting}
              />

              <p className={base.travelNote}>
                If you are employed in research (for example as a technician,
                research assistant or postdoctoral fellow), please submit under
                the{" "}
                <Link href="/abstract-form/early-career-scientists">
                  Early Career Scientists call
                </Link>{" "}
                instead.
              </p>

              {group && (
                <div className={base.grid2}>
                  {group === "scholars" && (
                    <>
                      <TextField {...f("programAndYear")} label="Program and year" required hint="For example: PhD, Year 3" />
                      <TextField {...f("universityAndDepartment")} label="University and department" required />
                    </>
                  )}
                  {isExplorer && (
                    <TextField {...f("schoolAndGrade")} label="School name and grade" required full />
                  )}
                  <TextField
                    {...f("supervisorName")}
                    label="Supervisor, teacher or mentor: name"
                    required
                    hint="Confirms the work is genuine."
                  />
                  <TextField
                    {...f("supervisorEmail")}
                    label="Supervisor, teacher or mentor: email"
                    required
                    type="email"
                  />
                </div>
              )}
            </section>

            {isExplorer && (
              <section className={base.section}>
                <div className={base.sectionHeader}>
                  <h2>C. ES Explorers safeguarding</h2>
                  <p>
                    ES Explorers must be at least 16 years old on 25 April
                    2027. Everyone provides an emergency contact. If you are
                    under 18 on that day, we also need a parent or guardian.
                  </p>
                </div>

                <div className={base.grid2}>
                  <TextField {...f("dateOfBirth")} label="Date of birth" required type="date" full />
                </div>

                {isIneligible && (
                  <div className={styles.blocked} role="alert">
                    Thank you for your interest in TNS2027. ES Explorers must
                    be at least 16 years old on 25 April 2027, so we can&apos;t
                    accept a submission this year. We hope to see you at a
                    future True North Spatial.
                  </div>
                )}

                {!isIneligible && ageStatus !== "unknown" && (
                  <>
                    {isMinor && (
                      <>
                        <h3 className={base.label}>Parent or guardian</h3>
                        <div className={base.grid2}>
                          <TextField {...f("guardianName")} label="Parent or guardian name" required full />
                          <TextField {...f("guardianEmail")} label="Parent or guardian email" required type="email" />
                          <TextField {...f("guardianPhone")} label="Parent or guardian phone" required type="tel" />
                        </div>
                      </>
                    )}

                    <h3 className={base.label}>Emergency contact</h3>
                    <div className={base.grid2}>
                      <TextField {...f("emergencyName")} label="Emergency contact name" required />
                      <TextField {...f("emergencyRelationship")} label="Relationship to you" required />
                      <TextField {...f("emergencyPhone")} label="Emergency contact phone" required type="tel" />
                    </div>

                    {isMinor && (
                      <div className={base.field}>
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
                          The consent form is emailed to you after acceptance.
                          You don&apos;t need to upload anything now.
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

            <ScientificAbstractSection {...sectionProps} letter={isExplorer ? "D" : "C"} />

            <DeclarationsSection
              letter={isExplorer ? "E" : "D"}
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
