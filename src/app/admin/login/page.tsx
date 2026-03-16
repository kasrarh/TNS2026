'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <img
              src="/TNS2026-logo-new.png"
              alt="TNS 2026 Logo"
              className="mx-auto h-16 w-auto"
            />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text-light)' }}>
            Admin Portal
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-light)' }}>
            True North Summit 2026 - Abstract Management
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-lg shadow-2xl p-8"
          style={{
            background: 'var(--card)',
            boxShadow: 'var(--card-shadow-strong)'
          }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-center" style={{ color: 'var(--text-light)' }}>
              Sign In
            </h2>
            <p className="mt-2 text-center text-sm" style={{ color: 'var(--muted-light)' }}>
              Access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-offset-2 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--text-light)'
                  }}
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-light)' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-4 py-3 rounded-md border focus:ring-2 focus:ring-offset-2 transition-all duration-200 text-gray-900 placeholder-gray-500"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--text-light)'
                  }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md p-3 bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-3 rounded-md text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                background: loading ? 'var(--muted)' : 'var(--brand)',
                boxShadow: loading ? 'none' : '0 4px 14px 0 rgba(65, 147, 166, 0.3)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: 'var(--muted-light)' }}>
              © 2026 True North Summit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}