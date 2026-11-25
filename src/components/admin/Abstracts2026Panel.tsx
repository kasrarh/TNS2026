'use client';

import { useEffect, useState } from 'react';

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

/** TNS2026 abstracts (legacy "abstracts" collection). Moved unchanged from the dashboard page. */
export default function Abstracts2026Panel() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbstracts();
  }, []);

  const fetchAbstracts = async () => {
    const res = await fetch('/api/abstracts');
    if (res.ok) {
      const data = await res.json();
      setAbstracts(data.abstracts);
    }
    setLoading(false);
  };

  const filteredAbstracts = abstracts;
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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { className: 'admin-badge admin-badge-pending', label: 'Pending Review' },
      approved: { className: 'admin-badge admin-badge-approved', label: 'Approved' },
      rejected: { className: 'admin-badge admin-badge-rejected', label: 'Rejected' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <span className={config.className}>{config.label}</span>;
  };

  if (loading) {
    return (
      <div className="admin-panel admin-empty">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2 className="tx-dark">
          TNS2026 Abstract Submissions ({filteredAbstracts.length})
        </h2>
      </div>

      {filteredAbstracts.length === 0 ? (
        <div className="admin-empty">
          <h3>No abstracts found</h3>
        </div>
      ) : (
        <>
          <div className="admin-cards">
            {filteredAbstracts.map((abstract) => (
              <article key={abstract._id} className="admin-card">
                <div className="admin-card-top">
                  <h3>{abstract.title}</h3>
                  {getStatusBadge(abstract.status)}
                </div>
                <p>{abstract.firstName} {abstract.lastName}</p>
                <p className="admin-email">{abstract.email}</p>
                <p>{abstract.institution || 'Not specified'}</p>
                <p className="admin-meta">
                  {new Date(abstract.submittedAt).toLocaleDateString()}
                </p>
                <div className="admin-card-actions">
                  <a
                    href={abstract.abstractBlobUrl}
                    download={`abstract-${abstract._id}.pdf`}
                    className="admin-doc"
                    target="_blank"
                  >
                    Show
                  </a>
                  <button
                    type="button"
                    onClick={() => updateStatus(abstract._id, 'approved')}
                    className="admin-action admin-action-approve"
                    disabled={abstract.status === 'approved'}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => updateStatus(abstract._id, 'pending')}
                    className="admin-action admin-action-pending"
                    disabled={abstract.status === 'pending'}
                  >
                    Pending
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title & Author</th>
                <th>Institution</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Document</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAbstracts.map((abstract) => (
                <tr key={abstract._id}>
                  <td>
                    <div className="admin-title">{abstract.title}</div>
                    <div className="admin-muted">
                      {abstract.firstName} {abstract.lastName}
                    </div>
                    <div className="admin-email">{abstract.email}</div>
                  </td>
                  <td>{abstract.institution || 'Not specified'}</td>
                  <td>{getStatusBadge(abstract.status)}</td>
                  <td className="admin-muted">
                    {new Date(abstract.submittedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <a
                      href={abstract.abstractBlobUrl}
                      download={`abstract-${abstract._id}.pdf`}
                      className="admin-doc"
                      target="_blank"
                    >
                      Show
                    </a>
                  </td>
                  <td>
                    <div className="admin-card-actions">
                      <button
                        type="button"
                        onClick={() => updateStatus(abstract._id, 'approved')}
                        className="admin-action admin-action-approve"
                        disabled={abstract.status === 'approved'}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => updateStatus(abstract._id, 'pending')}
                        className="admin-action admin-action-pending"
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
        </>
      )}
    </div>
  );
}
