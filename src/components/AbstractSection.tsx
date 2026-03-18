'use client';

import React, { useEffect, useState } from 'react';

interface AbstractItem {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  institution?: string;
  position?: string;
  location?: string;
  title: string;
  labSupervisor?: string | null;
  authors?: string[];
  affiliations?: string[];
  description?: string;
  abstractBlobUrl: string;
  backgroundBlobUrl?: string | null;
  submittedAt: string;
  status: string;
  presentation?: 'digital' | 'oral';
}

export default function AbstractSection() {
  const [abstracts, setAbstracts] = useState<AbstractItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleDescription = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    async function fetchAbstracts() {
      try {
        const res = await fetch('/api/abstracts');
        if (!res.ok) throw new Error('Failed to fetch abstracts');
        const data = await res.json();
        setAbstracts(data.abstracts || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAbstracts();
  }, []);

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-title">
          <span className="tag muted-dark">Abstracts</span>
          <h2 className="tx-dark">Abstracts & Speakers</h2>
          {/* <p className="muted-dark">Latest articles widely reported about Panoramics and our CEO</p> */}
        </div>
        
        <div className="news-grid">
          {loading && <p>Loading abstracts...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          {/* only show approved abstracts */}
          {abstracts
            .filter((a) => a.status.toLowerCase() === 'approved')
            .map((abstract) => (
              <article className="news-card" key={abstract._id}>
                {abstract.backgroundBlobUrl && (
                  <div className="news-image">
                    <img src={abstract.backgroundBlobUrl} alt="Abstract Background" />
                  </div>
                )}
                <div className="news-content">
                  <span className="news-date">
                    {abstract.firstName} {abstract.lastName} 
                  </span>
                  <h3>{abstract.title}</h3>
                  {abstract.presentation && (
                    <p>
                      <strong>Presentation:</strong> {abstract.presentation}
                    </p>
                  )}
                  {abstract.description && (() => {
                    const maxLen = 200;
                    const isLong = abstract.description.length > maxLen;
                    const isExpanded = expandedIds.has(abstract._id);
                    const visibleText = isLong && !isExpanded
                      ? abstract.description.slice(0, maxLen) + '...'
                      : abstract.description;
                    return (
                      <>
                        <p>{visibleText}</p>
                        {isLong && (
                          <button
                            type="button"
                            className="read-more-btn"
                            onClick={() => toggleDescription(abstract._id)}
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </>
                    );
                  })()}
                  {abstract.authors && (() => {
                    const authorsText = abstract.authors.join(', ');
                    const maxLen = 100;
                    const isLong = authorsText.length > maxLen;
                    const isExpanded = expandedIds.has(`${abstract._id}-authors`);
                    const visibleText = isLong && !isExpanded
                      ? authorsText.slice(0, maxLen) + '...'
                      : authorsText;
                    return (
                      <div>
                        <p>
                          <strong>Authors:</strong> {visibleText}
                        </p>
                        {isLong && (
                          <button
                            type="button"
                            className="read-more-btn"
                            onClick={() => {
                              const newKey = `${abstract._id}-authors`;
                              setExpandedIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(newKey)) next.delete(newKey);
                                else next.add(newKey);
                                return next;
                              });
                            }}
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                  {abstract.affiliations && (() => {
                    const affiliationsText = abstract.affiliations.join(', ');
                    const maxLen = 100;
                    const isLong = affiliationsText.length > maxLen;
                    const isExpanded = expandedIds.has(`${abstract._id}-affiliations`);
                    const visibleText = isLong && !isExpanded
                      ? affiliationsText.slice(0, maxLen) + '...'
                      : affiliationsText;
                    return (
                      <div>
                        <p>
                          <strong>Affiliations:</strong> {visibleText}
                        </p>
                        {isLong && (
                          <button
                            type="button"
                            className="read-more-btn"
                            onClick={() => {
                              const newKey = `${abstract._id}-affiliations`;
                              setExpandedIds((prev) => {
                                const next = new Set(prev);
                                if (next.has(newKey)) next.delete(newKey);
                                else next.add(newKey);
                                return next;
                              });
                            }}
                          >
                            {isExpanded ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    );
                  })()}
                  <a
                    href={abstract.abstractBlobUrl}
                    download
                    className="text-link"
                  >
                    Download Abstract →
                  </a>
                </div>
              </article>
            ))}
        </div>
      </div>
    
    </section>
  );
}
