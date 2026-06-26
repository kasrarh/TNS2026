"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "var(--brand)" }}
          />
          <p style={{ color: "var(--text-light)" }}>Loading signups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <header
        className="bg-white shadow-sm border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/TNS2026-logo-new.png"
                alt="TNS 2026 Logo"
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  TNS2027 Email List Signups
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                Abstracts
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:shadow-lg transition-all duration-200"
                style={{ background: "var(--brand-2)" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className="bg-white rounded-lg shadow-sm overflow-hidden border"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium tx-dark">
              TNS2027 Email Signups ({signups.length})
            </h3>
          </div>

          {signups.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No signups yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Emails will appear here when users join the TNS2027 list.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Signed Up
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {signups.map((signup, index) => (
                    <tr key={signup._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {signup.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(signup.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {signup.source}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
