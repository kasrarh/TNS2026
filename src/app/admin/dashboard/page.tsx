'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Abstract {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  status: string;
  submittedAt: string;
  institution?: string;
  presentation?: string;
  abstractBlobUrl: string;
}

export default function AdminDashboard() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [filteredAbstracts, setFilteredAbstracts] = useState<Abstract[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchAbstracts();
  }, []);

  useEffect(() => {
    filterAbstracts();
  }, [abstracts]);

  const fetchAbstracts = async () => {
    const res = await fetch('/api/abstracts');
    if (res.ok) {
      const data = await res.json();
      setAbstracts(data.abstracts);
    } else {
      router.push('/admin/login');
    }
    setLoading(false);
  };

  const filterAbstracts = () => {
    let filtered = abstracts;

    // Filter by status

    setFilteredAbstracts(filtered);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/abstracts/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      fetchAbstracts();
    } else {
      alert('Failed to update status');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const stats = {
    total: abstracts.length,
    approved: abstracts.filter(a => a.status === 'approved').length,
    pending: abstracts.filter(a => a.status === 'pending').length,
    rejected: abstracts.filter(a => a.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--brand)' }}></div>
          <p style={{ color: 'var(--text-light)' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/TNS2026-logo-new.png"
                alt="TNS 2026 Logo"
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Abstract Submissions Management</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:shadow-lg transition-all duration-200"
              style={{ background: 'var(--brand-2)' }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Abstracts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium tx-dark">
              Abstract Submissions ({filteredAbstracts.length})
            </h3>
          </div>

          {filteredAbstracts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="mt-2 text-sm font-medium text-gray-900">No abstracts found</h3>
              <p className="mt-1 text-sm text-gray-500">
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title & Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Institution
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAbstracts.map((abstract) => (
                    <tr key={abstract._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {abstract.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {abstract.firstName} {abstract.lastName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {abstract.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{abstract.institution || 'Not specified'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(abstract.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(abstract.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a
                            href={abstract.abstractBlobUrl}
                            download={`abstract-${abstract._id}.pdf`}
                            className="btn btn-primary"
                            target="_blank"
                          >
                            Show
                          </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          
                          <button
                            onClick={() => updateStatus(abstract._id, 'approved')}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200"
                            disabled={abstract.status === 'approved'}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(abstract._id, 'pending')}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors duration-200"
                            disabled={abstract.status === 'pending'}
                          >
                            Pending
                          </button>
                        </div>
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