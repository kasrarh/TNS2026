"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell, {
  AdminLoading,
  adminLogoutClass,
  adminNavLinkClass,
} from "@/components/admin/AdminShell";

interface SpeakerSubmission {
  _id: string;
  fullName: string;
  mobile: string;
  pronunciation: string;
  bio: string;
  bioWordCount: number;
  photoUrl: string;
  accessibilityNeeds: string;
  otherNotes: string;
  attendVertexDinner: boolean;
  needsHotelRoom: boolean;
  guestSharingRoom: boolean;
  additionalNightApril29: boolean;
  submittedAt: string;
  status: string;
}

function yesNo(value: boolean) {
  return (
    <span
      className={
        value
          ? "admin-badge admin-badge-approved"
          : "admin-badge admin-badge-pending"
      }
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function hotelDetail(speaker: SpeakerSubmission) {
  if (!speaker.needsHotelRoom) return null;
  const notes = [
    speaker.guestSharingRoom ? "Guest sharing room" : null,
    speaker.additionalNightApril29 ? "Extra night Apr 29" : null,
  ].filter(Boolean);
  if (notes.length === 0) return null;
  return <p className="admin-meta">{notes.join(" · ")}</p>;
}

function SpeakerPhoto({ speaker }: { speaker: SpeakerSubmission }) {
  if (!speaker.photoUrl) {
    return <span className="admin-muted">No photo</span>;
  }
  return (
    <a href={speaker.photoUrl} target="_blank" rel="noreferrer">
      <img
        src={speaker.photoUrl}
        alt={`${speaker.fullName} headshot`}
        className="admin-photo"
      />
    </a>
  );
}

function SpeakerNotes({ speaker }: { speaker: SpeakerSubmission }) {
  return (
    <div className="admin-speaker-notes">
      <details className="admin-details">
        <summary>Bio ({speaker.bioWordCount || 0} words)</summary>
        <p>{speaker.bio}</p>
      </details>
      {speaker.accessibilityNeeds ? (
        <p>
          <span className="admin-title">Accessibility: </span>
          {speaker.accessibilityNeeds}
        </p>
      ) : null}
      {speaker.otherNotes ? (
        <p>
          <span className="admin-title">Notes: </span>
          {speaker.otherNotes}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminSpeakersPage() {
  const [speakers, setSpeakers] = useState<SpeakerSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    const res = await fetch("/api/admin/speakers");
    if (res.ok) {
      const data = await res.json();
      setSpeakers(data.speakers);
    } else {
      router.push("/admin/login");
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  if (loading) {
    return <AdminLoading label="Loading speakers..." />;
  }

  return (
    <AdminShell
      subtitle="Speaker Form Submissions"
      actions={
        <>
          <Link href="/admin/dashboard" className={adminNavLinkClass()}>
            Abstracts
          </Link>
          <Link href="/admin/tns2027-signups" className={adminNavLinkClass()}>
            TNS2027 Emails
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className={adminLogoutClass()}
          >
            Logout
          </button>
        </>
      }
    >
      <div className="admin-panel">
        <div className="admin-panel-head">
          <h2 className="tx-dark">Speaker Submissions ({speakers.length})</h2>
        </div>

        {speakers.length === 0 ? (
          <div className="admin-empty">
            <h3>No speaker submissions yet</h3>
            <p>Completed speaker forms will show up here.</p>
          </div>
        ) : (
          <>
            <div className="admin-cards">
              {speakers.map((speaker) => (
                <article key={speaker._id} className="admin-card">
                  <div className="admin-card-top">
                    <div>
                      <h3>{speaker.fullName}</h3>
                      <p className="admin-meta">{speaker.pronunciation}</p>
                    </div>
                    <SpeakerPhoto speaker={speaker} />
                  </div>
                  <p>{speaker.mobile}</p>
                  <p className="admin-meta">
                    {new Date(speaker.submittedAt).toLocaleString()}
                  </p>
                  <div className="admin-flag-row">
                    <span>Dinner {yesNo(speaker.attendVertexDinner)}</span>
                    <span>Hotel {yesNo(speaker.needsHotelRoom)}</span>
                  </div>
                  {hotelDetail(speaker)}
                  <SpeakerNotes speaker={speaker} />
                </article>
              ))}
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Speaker</th>
                    <th>Mobile</th>
                    <th>Dinner</th>
                    <th>Hotel</th>
                    <th>Photo</th>
                    <th>Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {speakers.map((speaker) => (
                    <tr key={speaker._id}>
                      <td>
                        <div className="admin-title">{speaker.fullName}</div>
                        <div className="admin-muted">{speaker.pronunciation}</div>
                        <SpeakerNotes speaker={speaker} />
                      </td>
                      <td>{speaker.mobile}</td>
                      <td>{yesNo(speaker.attendVertexDinner)}</td>
                      <td>
                        {yesNo(speaker.needsHotelRoom)}
                        {hotelDetail(speaker)}
                      </td>
                      <td>
                        <SpeakerPhoto speaker={speaker} />
                      </td>
                      <td className="admin-muted">
                        {new Date(speaker.submittedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
