"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell, {
  AdminLoading,
  adminLogoutClass,
  adminNavLinkClass,
} from "@/components/admin/AdminShell";

interface Tns2027Signup {
  _id: string;
  email: string;
  createdAt: string;
  source: string;
}

export default function Tns2027SignupsPage() {
  const [signups, setSignups] = useState<Tns2027Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    const res = await fetch("/api/admin/tns2027-signups");
    if (res.ok) {
      const data = await res.json();
      setSignups(data.signups);
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
    return <AdminLoading label="Loading signups..." />;
  }

  return (
    <AdminShell
      subtitle="TNS2027 Email List Signups"
      actions={
        <>
          <Link href="/admin/dashboard" className={adminNavLinkClass()}>
            Abstracts
          </Link>
          <Link href="/admin/speakers" className={adminNavLinkClass()}>
            Speakers
          </Link>
          <button type="button" onClick={handleLogout} className={adminLogoutClass()}>
            Logout
          </button>
        </>
      }
    >
        <div className="admin-panel">
          <div className="admin-panel-head">
            <h2 className="tx-dark">
              TNS2027 Email Signups ({signups.length})
            </h2>
          </div>

          {signups.length === 0 ? (
            <div className="admin-empty">
              <h3>No signups yet</h3>
              <p>Emails will appear here when users join the TNS2027 list.</p>
            </div>
          ) : (
            <>
              <div className="admin-cards">
                {signups.map((signup, index) => (
                  <article key={signup._id} className="admin-card">
                    <p className="admin-meta">#{index + 1}</p>
                    <p className="admin-title">{signup.email}</p>
                    <p>{new Date(signup.createdAt).toLocaleString()}</p>
                    <p className="admin-muted">{signup.source}</p>
                  </article>
                ))}
              </div>

              <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Signed Up</th>
                    <th>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {signups.map((signup, index) => (
                    <tr key={signup._id}>
                      <td className="admin-muted">{index + 1}</td>
                      <td className="admin-title">{signup.email}</td>
                      <td className="admin-muted">
                        {new Date(signup.createdAt).toLocaleString()}
                      </td>
                      <td className="admin-muted">{signup.source}</td>
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
