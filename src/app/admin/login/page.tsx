'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '@/components/admin/admin.css';

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
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-brand">
          <img
            src="/Panoramics-transparent-cropped.png"
            alt="Panoramics - A Vision Logo"
          />
          <h1>Admin Portal</h1>
          <p>True North Summit 2026 - Abstract Management</p>
        </div>

        <div className="admin-login-panel">
          <h2>Sign In</h2>
          <p className="admin-login-copy">Access the admin dashboard</p>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <label className="admin-field" htmlFor="username">
              <span>Username</span>
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label className="admin-field" htmlFor="password">
              <span>Password</span>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <p className="admin-error">{error}</p>}

            <button type="submit" disabled={loading} className="admin-submit">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="admin-login-foot">© 2026 True North Summit. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}