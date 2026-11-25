"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { ECS_CATEGORIES, ES_CATEGORIES } from "@/lib/abstractForm";
import {
  ABSTRACT_SUBMISSION_STATUSES,
  type AbstractSubmission2027Document,
  type AbstractSubmissionStatus,
} from "@/lib/db/schema";

type Submission = Omit<
  AbstractSubmission2027Document,
  "_id" | "submittedAt" | "updatedAt" | "reviewedAt"
> & {
  _id: string;
  submittedAt: string;
  updatedAt: string;
  reviewedAt: string | null;
  reviewerNotes: string;
};

const PROGRAM_LABELS: Record<Submission["program"], string> = {
  emerging: "Emerging Scientists",
  "early-career": "Early Career",
};

const STATUS_LABELS: Record<AbstractSubmissionStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  waitlisted: "Waitlisted",
  rejected: "Rejected",
};

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  [...ES_CATEGORIES, ...ECS_CATEGORIES].map((c) => [c.value, c.label])
);

type FlagFilter = "" | "needsReview" | "consentOutstanding" | "minor";

function needsEligibilityReview(s: Submission) {
  return Boolean(s.eligibilityFlags?.needsReview);
}

function consentOutstanding(s: Submission) {
  return Boolean(
    s.safeguarding?.isMinor && !s.safeguarding.guardianConsentReceived
  );
}

function fullName(s: Submission) {
  return `${s.applicant.firstName} ${s.applicant.lastName}`.trim();
}

function organization(s: Submission) {
  return (
    s.role?.organizationAndDepartment ||
    s.studies?.universityAndDepartment ||
    s.studies?.schoolAndGrade ||
    ""
  );
}

function scientificArea(s: Submission) {
  return s.abstract.scientificArea === "Other" && s.abstract.scientificAreaOther
    ? `Other: ${s.abstract.scientificAreaOther}`
    : s.abstract.scientificArea;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  return new Date(value).toLocaleString("en-CA", {
    timeZone: "America/Toronto",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatusBadge({ status }: { status: AbstractSubmissionStatus }) {
  return (
    <span className={`admin-badge admin-badge-status-${status}`}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

function Flags({ s }: { s: Submission }) {
  const flags: { label: string; className: string; title: string }[] = [];
  if (s.eligibilityFlags?.outsideResearchWindow) {
    flags.push({
      label: `${s.eligibilityFlags.researchYears} yrs in research`,
      className: "admin-badge-pending",
      title: "Outside the 10-year research window. Check career breaks.",
    });
  }
  if (s.eligibilityFlags?.outsideInvestigatorWindow) {
    flags.push({
      label: `${s.eligibilityFlags.appointmentYears} yrs as PI`,
      className: "admin-badge-pending",
      title: "Outside the 5-year investigator window. Check career breaks.",
    });
  }
  if (s.safeguarding?.isMinor) {
    flags.push(
      s.safeguarding.guardianConsentReceived
        ? { label: "Minor · consent in", className: "admin-badge-approved", title: "Signed consent received" }
        : { label: "Minor · consent due", className: "admin-badge-rejected", title: "Signed parent/guardian consent not yet received" }
    );
  }
  if (flags.length === 0) return <span className="admin-muted">—</span>;
  return (
    <div className="admin-flag-row admin-flag-row-tight">
      {flags.map((f) => (
        <span key={f.label} className={`admin-badge ${f.className}`} title={f.title}>
          {f.label}
        </span>
      ))}
    </div>
  );
}

function toCsv(rows: Submission[]) {
  const header = [
    "Submitted (ET)", "Status", "Program", "Category", "First name", "Last name",
    "Preferred name", "Pronouns", "Email", "Phone", "Location", "LinkedIn",
    "Organization / school", "Program & year / job title", "Sector",
    "Highest degree", "Research start year", "First appointment year",
    "Career breaks", "Supervisor", "Supervisor email", "Date of birth",
    "Age on 25 Apr 2027", "Guardian", "Guardian email", "Guardian phone",
    "Emergency contact", "Emergency relationship", "Emergency phone",
    "Consent received", "Eligibility review", "Title", "Authors",
    "Affiliations", "Scientific area", "Abstract", "Word count", "Keywords",
    "Looking for", "Reviewer notes",
  ];
  const cell = (v: unknown) => {
    const text = v === null || v === undefined ? "" : String(v);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  const lines = rows.map((s) => [
    formatDate(s.submittedAt), STATUS_LABELS[s.status], PROGRAM_LABELS[s.program],
    CATEGORY_LABELS[s.category] ?? s.category, s.applicant.firstName,
    s.applicant.lastName, s.applicant.preferredName, s.applicant.pronouns,
    s.applicant.email, s.applicant.phone, s.applicant.location,
    s.applicant.linkedinUrl, organization(s),
    s.role?.jobTitle ?? s.studies?.programAndYear ?? "",
    s.role ? (s.role.sector === "Other" && s.role.sectorOther ? `Other: ${s.role.sectorOther}` : s.role.sector) : "",
    s.role?.highestDegree, s.role?.researchStartYear, s.role?.firstAppointmentYear,
    s.role?.careerBreaks, s.studies?.supervisorName, s.studies?.supervisorEmail,
    s.safeguarding?.dateOfBirth, s.safeguarding?.ageOnApril25_2027,
    s.safeguarding?.guardian?.name, s.safeguarding?.guardian?.email,
    s.safeguarding?.guardian?.phone, s.safeguarding?.emergencyContact.name,
    s.safeguarding?.emergencyContact.relationship,
    s.safeguarding?.emergencyContact.phone,
    s.safeguarding?.isMinor ? (s.safeguarding.guardianConsentReceived ? "Yes" : "No") : "",
    needsEligibilityReview(s) ? "Yes" : "", s.abstract.title, s.abstract.authors,
    s.abstract.affiliations, scientificArea(s), s.abstract.body,
    s.abstract.wordCount, s.abstract.keywords.join("; "),
    [...(s.role?.lookingFor ?? []), s.role?.lookingForOther].filter(Boolean).join("; "),
    s.reviewerNotes,
  ].map(cell).join(","));
  return [header.map(cell).join(","), ...lines].join("\r\n");
}

function downloadCsv(rows: Submission[]) {
  const blob = new Blob(["﻿" + toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `tns2027-abstracts-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function DetailItem({ label, value }: { label: string; value?: string | number | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="admin-detail-item">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function SubmissionDetail({
  s,
  onPatch,
  saving,
}: {
  s: Submission;
  onPatch: (id: string, patch: Record<string, unknown>) => Promise<boolean>;
  saving: boolean;
}) {
  const [notes, setNotes] = useState(s.reviewerNotes);
  const notesChanged = notes !== s.reviewerNotes;

  return (
    <div className="admin-detail">
      <div className="admin-detail-grid">
        <section>
          <h4>Applicant</h4>
          <dl>
            <DetailItem label="Name" value={fullName(s)} />
            <DetailItem label="Preferred name" value={s.applicant.preferredName} />
            <DetailItem label="Pronouns" value={s.applicant.pronouns} />
            <DetailItem label="Email" value={s.applicant.email} />
            <DetailItem label="Phone" value={s.applicant.phone} />
            <DetailItem label="Location" value={s.applicant.location} />
            {s.applicant.linkedinUrl && (
              <div className="admin-detail-item">
                <dt>LinkedIn</dt>
                <dd>
                  <a href={s.applicant.linkedinUrl} target="_blank" rel="noreferrer">
                    {s.applicant.linkedinUrl}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </section>

        {s.studies && (
          <section>
            <h4>Category and studies</h4>
            <dl>
              <DetailItem label="Category" value={CATEGORY_LABELS[s.category] ?? s.category} />
              <DetailItem label="Program and year" value={s.studies.programAndYear} />
              <DetailItem label="University and department" value={s.studies.universityAndDepartment} />
              <DetailItem label="School and grade" value={s.studies.schoolAndGrade} />
              <DetailItem
                label="Supervisor / teacher / mentor"
                value={`${s.studies.supervisorName} (${s.studies.supervisorEmail})`}
              />
            </dl>
          </section>
        )}

        {s.role && (
          <section>
            <h4>Role and eligibility</h4>
            <dl>
              <DetailItem label="Category" value={CATEGORY_LABELS[s.category] ?? s.category} />
              <DetailItem label="Job title" value={s.role.jobTitle} />
              <DetailItem label="Organization" value={s.role.organizationAndDepartment} />
              <DetailItem
                label="Sector"
                value={s.role.sector === "Other" && s.role.sectorOther ? `Other: ${s.role.sectorOther}` : s.role.sector}
              />
              <DetailItem label="Highest degree" value={s.role.highestDegree} />
              <DetailItem
                label="Research career began"
                value={`${s.role.researchStartYear}${
                  s.eligibilityFlags?.researchYears != null ? ` (${s.eligibilityFlags.researchYears} yrs by 2027)` : ""
                }`}
              />
              {s.role.firstAppointmentYear && (
                <DetailItem
                  label="First independent appointment"
                  value={`${s.role.firstAppointmentYear}${
                    s.eligibilityFlags?.appointmentYears != null ? ` (${s.eligibilityFlags.appointmentYears} yrs by 2027)` : ""
                  }`}
                />
              )}
              <DetailItem label="Career breaks" value={s.role.careerBreaks} />
              <DetailItem
                label="Looking for"
                value={[...s.role.lookingFor, s.role.lookingForOther].filter(Boolean).join(", ")}
              />
            </dl>
          </section>
        )}

        {s.safeguarding && (
          <section>
            <h4>Explorers safeguarding</h4>
            <dl>
              <DetailItem
                label="Date of birth"
                value={`${s.safeguarding.dateOfBirth} (age ${s.safeguarding.ageOnApril25_2027} on 25 Apr 2027)`}
              />
              {s.safeguarding.guardian && (
                <DetailItem
                  label="Parent / guardian"
                  value={`${s.safeguarding.guardian.name} · ${s.safeguarding.guardian.email} · ${s.safeguarding.guardian.phone}`}
                />
              )}
              <DetailItem
                label="Emergency contact"
                value={`${s.safeguarding.emergencyContact.name} (${s.safeguarding.emergencyContact.relationship}) · ${s.safeguarding.emergencyContact.phone}`}
              />
            </dl>
            {s.safeguarding.isMinor && (
              <label className="admin-check">
                <input
                  type="checkbox"
                  checked={s.safeguarding.guardianConsentReceived}
                  disabled={saving}
                  onChange={(e) => onPatch(s._id, { guardianConsentReceived: e.target.checked })}
                />
                Signed parent/guardian consent form received
              </label>
            )}
          </section>
        )}
      </div>

      <section className="admin-detail-abstract">
        <h4>{s.abstract.title}</h4>
        <p className="admin-detail-pre">{s.abstract.authors}</p>
        <p className="admin-detail-pre admin-muted">{s.abstract.affiliations}</p>
        <p className="admin-meta">
          {scientificArea(s)} · {s.abstract.wordCount} words · Keywords:{" "}
          {s.abstract.keywords.join(", ")}
        </p>
        <p className="admin-detail-pre">{s.abstract.body}</p>
      </section>

      <section className="admin-detail-review">
        <label htmlFor={`notes-${s._id}`}>
          <h4>Reviewer notes</h4>
        </label>
        <textarea
          id={`notes-${s._id}`}
          className="admin-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Internal only. Not shown to the applicant."
          maxLength={5000}
          disabled={saving}
        />
        <div className="admin-card-actions">
          <button
            type="button"
            className="admin-action admin-action-save"
            disabled={!notesChanged || saving}
            onClick={() => onPatch(s._id, { reviewerNotes: notes })}
          >
            {saving ? "Saving..." : "Save notes"}
          </button>
          {ABSTRACT_SUBMISSION_STATUSES.map((status) => (
            <button
              key={status}
              type="button"
              className={`admin-action admin-action-status-${status}`}
              disabled={saving || s.status === status}
              onClick={() => onPatch(s._id, { status })}
            >
              {status === "pending" ? "Back to pending" : status === "accepted" ? "Accept" : status === "waitlisted" ? "Waitlist" : "Reject"}
            </button>
          ))}
        </div>
        <p className="admin-meta">
          Submitted {formatDate(s.submittedAt)} ET
          {s.reviewedAt ? ` · Last reviewed ${formatDate(s.reviewedAt)} ET` : ""}
        </p>
      </section>
    </div>
  );
}

function StatusSelect({
  s,
  onPatch,
  saving,
}: {
  s: Submission;
  onPatch: (id: string, patch: Record<string, unknown>) => Promise<boolean>;
  saving: boolean;
}) {
  return (
    <select
      className={`admin-select admin-select-status-${s.status}`}
      value={s.status}
      disabled={saving}
      aria-label={`Status for ${fullName(s)}`}
      onChange={(e) => onPatch(s._id, { status: e.target.value })}
    >
      {ABSTRACT_SUBMISSION_STATUSES.map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}

export default function Abstracts2027Panel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const [program, setProgram] = useState<"" | Submission["program"]>("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"" | AbstractSubmissionStatus>("");
  const [flag, setFlag] = useState<FlagFilter>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/abstract-submissions");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Failed to load submissions.");
        setSubmissions(data.submissions);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Failed to load submissions.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function patch(id: string, body: Record<string, unknown>) {
    setSavingId(id);
    setActionError(null);
    try {
      const res = await fetch(`/api/admin/abstract-submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "Update failed.");
      setSubmissions((prev) => prev.map((s) => (s._id === id ? data.submission : s)));
      return true;
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Update failed.");
      return false;
    } finally {
      setSavingId(null);
    }
  }

  const categoryOptions =
    program === "emerging" ? ES_CATEGORIES : program === "early-career" ? ECS_CATEGORIES : [...ES_CATEGORIES, ...ECS_CATEGORIES];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return submissions.filter((s) => {
      if (program && s.program !== program) return false;
      if (category && s.category !== category) return false;
      if (status && s.status !== status) return false;
      if (flag === "needsReview" && !needsEligibilityReview(s)) return false;
      if (flag === "consentOutstanding" && !consentOutstanding(s)) return false;
      if (flag === "minor" && !s.safeguarding?.isMinor) return false;
      if (q) {
        const haystack = [
          fullName(s), s.applicant.preferredName, s.applicant.email,
          s.abstract.title, organization(s), s.abstract.keywords.join(" "),
        ].join(" ").toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [submissions, program, category, status, flag, search]);

  const counts = useMemo(() => {
    const c = { total: submissions.length, emerging: 0, earlyCareer: 0, pending: 0, accepted: 0, waitlisted: 0, rejected: 0, review: 0, consent: 0 };
    for (const s of submissions) {
      if (s.program === "emerging") c.emerging++;
      else c.earlyCareer++;
      c[s.status]++;
      if (needsEligibilityReview(s)) c.review++;
      if (consentOutstanding(s)) c.consent++;
    }
    return c;
  }, [submissions]);

  const hasFilters = Boolean(program || category || status || flag || search);

  if (loading) {
    return (
      <div className="admin-panel admin-empty">
        <div className="admin-spinner" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="admin-panel admin-empty">
        <h3>Could not load TNS2027 submissions</h3>
        <p>{loadError}</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-stats">
        <div className="admin-stat"><span>Total</span><strong>{counts.total}</strong><small>{counts.emerging} ES · {counts.earlyCareer} ECS</small></div>
        <div className="admin-stat"><span>Pending</span><strong>{counts.pending}</strong></div>
        <div className="admin-stat"><span>Accepted</span><strong>{counts.accepted}</strong><small>Up to 40 ES · 25 ECS</small></div>
        <div className="admin-stat"><span>Waitlisted</span><strong>{counts.waitlisted}</strong></div>
        <div className="admin-stat"><span>Rejected</span><strong>{counts.rejected}</strong></div>
        <div className="admin-stat"><span>Eligibility review</span><strong>{counts.review}</strong></div>
        <div className="admin-stat"><span>Consent due</span><strong>{counts.consent}</strong></div>
      </div>

      <div className="admin-panel">
        <div className="admin-panel-head admin-panel-head-row">
          <h2 className="tx-dark">
            TNS2027 Abstract Submissions ({filtered.length}
            {hasFilters ? ` of ${submissions.length}` : ""})
          </h2>
          <button
            type="button"
            className="admin-btn"
            onClick={() => downloadCsv(filtered)}
            disabled={filtered.length === 0}
          >
            Export CSV
          </button>
        </div>

        <div className="admin-filters">
          <input
            type="search"
            className="admin-input"
            placeholder="Search name, email, title, organization, keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search submissions"
          />
          <select
            className="admin-select"
            value={program}
            aria-label="Program"
            onChange={(e) => {
              setProgram(e.target.value as typeof program);
              setCategory("");
            }}
          >
            <option value="">All programs</option>
            <option value="emerging">Emerging Scientists</option>
            <option value="early-career">Early Career Scientists</option>
          </select>
          <select className="admin-select" value={category} aria-label="Category" onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categoryOptions.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <select className="admin-select" value={status} aria-label="Status" onChange={(e) => setStatus(e.target.value as typeof status)}>
            <option value="">All statuses</option>
            {ABSTRACT_SUBMISSION_STATUSES.map((st) => (
              <option key={st} value={st}>{STATUS_LABELS[st]}</option>
            ))}
          </select>
          <select className="admin-select" value={flag} aria-label="Flags" onChange={(e) => setFlag(e.target.value as FlagFilter)}>
            <option value="">All flags</option>
            <option value="needsReview">Needs eligibility review</option>
            <option value="consentOutstanding">Consent form outstanding</option>
            <option value="minor">Explorers under 18</option>
          </select>
          {hasFilters && (
            <button
              type="button"
              className="admin-btn"
              onClick={() => {
                setProgram(""); setCategory(""); setStatus(""); setFlag(""); setSearch("");
              }}
            >
              Clear
            </button>
          )}
        </div>

        {actionError && <p className="admin-error admin-inline-error" role="alert">{actionError}</p>}

        {filtered.length === 0 ? (
          <div className="admin-empty">
            <h3>{submissions.length === 0 ? "No TNS2027 submissions yet" : "No submissions match these filters"}</h3>
            <p>
              {submissions.length === 0
                ? "Abstracts from the Emerging and Early Career forms will show up here."
                : "Try clearing a filter."}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="admin-cards">
              {filtered.map((s) => (
                <article key={s._id} className="admin-card">
                  <div className="admin-card-top">
                    <h3>{s.abstract.title}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="admin-title">{fullName(s)}</p>
                  <p className="admin-email">{s.applicant.email}</p>
                  <p>{PROGRAM_LABELS[s.program]} · {CATEGORY_LABELS[s.category] ?? s.category}</p>
                  <p className="admin-meta">{formatDate(s.submittedAt)} ET</p>
                  <Flags s={s} />
                  <div className="admin-card-actions">
                    <StatusSelect s={s} onPatch={patch} saving={savingId === s._id} />
                    <button type="button" className="admin-doc" onClick={() => setOpenId(openId === s._id ? null : s._id)}>
                      {openId === s._id ? "Hide" : "View"}
                    </button>
                  </div>
                  {openId === s._id && (
                    <SubmissionDetail s={s} onPatch={patch} saving={savingId === s._id} />
                  )}
                </article>
              ))}
            </div>

            {/* Desktop table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Applicant</th>
                    <th>Program &amp; category</th>
                    <th>Abstract</th>
                    <th>Flags</th>
                    <th>Submitted (ET)</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <Fragment key={s._id}>
                      <tr className={openId === s._id ? "admin-row-open" : undefined}>
                        <td>
                          <div className="admin-title">{fullName(s)}</div>
                          <div className="admin-email">{s.applicant.email}</div>
                          <div className="admin-muted">{organization(s)}</div>
                        </td>
                        <td>
                          <div>{PROGRAM_LABELS[s.program]}</div>
                          <div className="admin-muted">{CATEGORY_LABELS[s.category] ?? s.category}</div>
                        </td>
                        <td className="admin-col-title">
                          <div className="admin-title">{s.abstract.title}</div>
                          <div className="admin-muted">{scientificArea(s)}</div>
                        </td>
                        <td><Flags s={s} /></td>
                        <td className="admin-muted">{formatDate(s.submittedAt)}</td>
                        <td><StatusSelect s={s} onPatch={patch} saving={savingId === s._id} /></td>
                        <td>
                          <button
                            type="button"
                            className="admin-doc"
                            aria-expanded={openId === s._id}
                            onClick={() => setOpenId(openId === s._id ? null : s._id)}
                          >
                            {openId === s._id ? "Hide" : "View"}
                          </button>
                        </td>
                      </tr>
                      {openId === s._id && (
                        <tr className="admin-detail-row">
                          <td colSpan={7}>
                            <SubmissionDetail s={s} onPatch={patch} saving={savingId === s._id} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
