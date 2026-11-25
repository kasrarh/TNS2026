'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminShell, { adminLogoutClass, adminNavLinkClass } from '@/components/admin/AdminShell';
import Abstracts2026Panel from '@/components/admin/Abstracts2026Panel';
import Abstracts2027Panel from '@/components/admin/Abstracts2027Panel';

const YEARS = ['2026', '2027'] as const;
type Year = (typeof YEARS)[number];

export default function AdminDashboard() {
  const router = useRouter();
  const [year, setYear] = useState<Year>('2026');

  // Remember the chosen year in the URL (?year=2027) so refresh and links keep it.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('year');
    if (fromUrl === '2026' || fromUrl === '2027') setYear(fromUrl);
  }, []);

  const chooseYear = (next: Year) => {
    setYear(next);
    const url = new URL(window.location.href);
    url.searchParams.set('year', next);
    window.history.replaceState(null, '', url);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <AdminShell
      subtitle="Abstract Submissions Management"
      actions={
        <>
          <Link href="/admin/speakers" className={adminNavLinkClass()}>
            Speakers
          </Link>
          <Link href="/admin/tns2027-signups" className={adminNavLinkClass()}>
            TNS2027 Emails
          </Link>
          <button type="button" onClick={handleLogout} className={adminLogoutClass()}>
            Logout
          </button>
        </>
      }
    >
      <div className="admin-tabs" role="tablist" aria-label="Summit year">
        {YEARS.map((y) => (
          <button
            key={y}
            type="button"
            role="tab"
            aria-selected={year === y}
            className={`admin-tab ${year === y ? 'admin-tab-active' : ''}`}
            onClick={() => chooseYear(y)}
          >
            TNS{y}
          </button>
        ))}
      </div>

      {year === '2026' ? <Abstracts2026Panel /> : <Abstracts2027Panel />}
    </AdminShell>
  );
}
