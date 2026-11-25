"use client";

import Link from "next/link";
import {
  ABSTRACT_DEADLINES,
  ECS_CATEGORIES,
  ECS_DECLARATIONS,
  ECS_INVESTIGATOR_CATEGORY,
  ECS_INVESTIGATOR_WINDOW_YEARS,
  ECS_LOOKING_FOR,
  ECS_RESEARCH_WINDOW_YEARS,
  ECS_SECTORS,
  emptyEarlyCareerInput,
  getEarlyCareerFlags,
  validateEarlyCareerAbstract,
  type EarlyCareerAbstractInput,
} from "@/lib/abstractForm";
import {
  ApplicantSection,
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
  ["Submission deadline", ABSTRACT_DEADLINES["early-career"].label],
  ["Decisions sent", "By 10 February 2027"],
  ["Register with presenter code", "By 26 February 2027"],
  ["5-slide deck and Spotlight video due", "By 28 February 2027"],
  ["Decks live on TNS website", "From 1 March 2027"],
  ["Summit", "27–29 April 2027, MaRS Discovery District, Toronto"],
];

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
  const flags = getEarlyCareerFlags(form);
  const showWindowNote =
    flags.outsideResearchWindow || flags.outsideInvestigatorWindow;

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
          <p className={base.kicker}>TNS2027 Call for Abstracts</p>
          <h1>Early Career Scientists Program</h1>
          <p>
            This call is for Early Career Scientists: professionals in the
            first years of their research career who want to pitch their work
            to the True North Spatial 2027 community. The summit takes place 27
            to 29 April 2027 at the MaRS Discovery District in Toronto.
          </p>
          <p>
            <strong>Deadline: {ABSTRACT_DEADLINES["early-career"].label}.</strong>{" "}
            No late submissions will be accepted.
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
                <summary>Who can submit, selection and what you receive</summary>
                <div className={styles.detailsBody}>
                  <h3>Who can submit</h3>
                  <p className={base.hint}>
                    Early Career Scientists are professionals working in
                    research, in academia, hospitals, institutes, industry or
                    startups, within roughly the first 10 years of their
                    research career (excluding career breaks such as parental
                    leave).
                  </p>

                  <h3>Presentation format</h3>
                  <p className={base.hint}>
                    There are no physical posters or poster screens at TNS2027.
                    Every selected presenter gives a 5-slide digital pitch
                    deck, hosted on the TNS website and opened from a QR code
                    on your badge. At the Early Career Scientists pitch session
                    on Day 1, you host your own standing table during lunch
                    while attendees, partners and vendors come to hear about
                    your work. Selected presenters must attend in person.
                  </p>
                  <ul className={styles.infoList}>
                    <li>Title, authors and affiliations</li>
                    <li>Background and the problem you are solving</li>
                    <li>Approach and methods</li>
                    <li>Key findings (1–2)</li>
                    <li>
                      Impact, next steps and what you are looking for
                      (collaborators, partners, opportunities)
                    </li>
                  </ul>

                  <h3>Selection</h3>
                  <p className={base.hint}>
                    Up to 25 Early Career Scientist abstracts will be selected.
                    From these, 6 are invited to give a 20-minute talk in the
                    main program, two on each day of the summit. Every selected
                    presenter prepares a 5-slide pitch deck and pitches at the
                    session.
                  </p>

                  <h3>Registration</h3>
                  <p className={base.hint}>
                    Selected presenters must register and pay the registration
                    fee. Please wait for your decision before registering:
                    accepted presenters receive a personal code for 10% off.
                    Register by 26 February 2027 to confirm your place.
                  </p>

                  <h3>What selected presenters receive</h3>
                  <ul className={styles.infoList}>
                    <li>Your own table at the pitch session (Day 1, lunch)</li>
                    <li>An Early Career Scientists breakfast workshop (Day 2, early morning)</li>
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
                <h2>B. Role and eligibility</h2>
                <p>Choose the category that best matches your current role.</p>
              </div>

              <CategoryPicker
                categories={ECS_CATEGORIES}
                value={form.category}
                onChange={handleText}
                error={errors.category}
                disabled={isSubmitting}
              />

              <p className={base.travelNote}>
                If you are enrolled in a degree program (including MD/PhD),
                please submit under the{" "}
                <Link href="/abstract-form/emerging-scientists">
                  Emerging Scientists call
                </Link>{" "}
                instead.
              </p>

              <div className={base.grid2}>
                <TextField {...f("jobTitle")} label="Job title" required hint="For example: Postdoctoral Fellow, Staff Scientist" />
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
                  <TextField {...f("sectorOther")} label="Your sector" required />
                )}
                <TextField
                  {...f("highestDegree")}
                  label="Highest degree and year awarded"
                  required
                  full
                  hint="Any degree; a PhD is not required. For example: MSc, 2019"
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
                  hint="Optional. For example: parental leave, 12 months"
                />
              </div>

              {showWindowNote && (
                <p className={base.travelNote}>
                  {flags.outsideResearchWindow &&
                    `You began your research career more than ${ECS_RESEARCH_WINDOW_YEARS} years before 2027. `}
                  {flags.outsideInvestigatorWindow &&
                    `Your first independent appointment was more than ${ECS_INVESTIGATOR_WINDOW_YEARS} years before 2027. `}
                  You can still submit. If you took career breaks, add them
                  above so the review team can take them into account.
                </p>
              )}
            </section>

            <ScientificAbstractSection {...sectionProps} letter="C">
              <fieldset className={base.field}>
                <legend className={base.label}>
                  What are you looking for at TNS2027?
                </legend>
                <p className={base.hint}>
                  Optional. Choose any that apply. This helps us match you with
                  the right people at the pitch session.
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
                  <TextField {...f("lookingForOther")} label="Tell us what else you're looking for" />
                )}
                {errors.lookingFor && (
                  <p className={styles.fieldError}>{errors.lookingFor}</p>
                )}
              </fieldset>
            </ScientificAbstractSection>

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
