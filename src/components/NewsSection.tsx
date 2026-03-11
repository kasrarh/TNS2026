'use client';

import React, { useState } from 'react';

const MAX_PREVIEW_LENGTH = 200;

const newsItems = [
  {
    date: 'March 11 2026',
    title: 'LATE-BREAKING ABSTRACT SUBMISSIONS : Trainees',
    description:
      'Late-breaking abstract submissions are still open for attendees who wish to showcase their work at the True North Spatial Summit 2026. Accepted abstracts will be presented digitally as slide decks or posters, giving presenters the opportunity to share and discuss their research with participants throughout the summit. Our intention with this format is to create a presentation experience that is more accessible, environmentally conscious, and not limited by space or time. All presenter information, abstracts, and digital slide decks/posters will be hosted on the summit platform for attendees to access throughout the meeting. Throughout the three days of the summit, there will be multiple opportunities to discuss your research directly with attendees, including during networking sessions. Your customized name badge will also include a QR code linking directly to your digital presentation, allowing attendees to access your work easily and engage with you in real time. We are intentionally emphasizing digital pitch decks to support high-impact networking among early-career scientists, academic researchers, and industry professionals. This format allows your work to remain visible beyond a single scheduled session and encourages broader, more sustained scientific exchange.',
    link: 'https://forms.gle/CpUYBXVPLA7vWpaK9',
    linkText: 'Submit Abstract →',
  },
  {
    date: 'March 11 2026',
    title: 'LATE-BREAKING ABSTRACT SUBMISSIONS :  Postdoc/Early Career Scientists ',
    description:
      'Late-breaking abstract submissions are still open for attendees who wish to showcase their work at the True North Spatial Summit 2026. Accepted abstracts will be presented digitally as slide decks or posters, giving presenters the opportunity to share and discuss their research with participants throughout the summit. Our intention with this format is to create a presentation experience that is more accessible, environmentally conscious, and not limited by space or time. All presenter information, abstracts, and digital slide decks/posters will be hosted on the summit platform for attendees to access throughout the meeting. Throughout the three days of the summit, there will be multiple opportunities to discuss your research directly with attendees, including during networking sessions. Your customized name badge will also include a QR code linking directly to your digital presentation, allowing attendees to access your work easily and engage with you in real time. We are intentionally emphasizing digital pitch decks to support high-impact networking among early-career scientists, academic researchers, and industry professionals. This format allows your work to remain visible beyond a single scheduled session and encourages broader, more sustained scientific exchange.',
    link: 'https://forms.gle/uQuDyEVtDo5KfHaD9',
    linkText: 'Submit Abstract →',
  },
  {
    date: 'February 28 2026',
    title: 'TNS 2026 Featured In: Mapping Life — The Spatial Biology Revolution',
    description:
      'In Episode 2 of the podcast hosted by our Day 1 keynote speaker, Dr. Mike Doyle, True North Spatial 2026 was used as a lens to explore the shift from the "gadget phase" to the era of spatial science as infrastructure.',
    link: 'https://open.spotify.com/episode/58gczdonyjY9ZCqDMYoyKs?si=oQMxz37kTB-NuzDlxVBSwQ',
    linkText: 'Listen to Podcast →',
  },
  {
    date: 'January 29 2026',
    title: 'Panoramics on TNS2026 - Toronto Board of Trade interview with Shamini Ayyadhury, CEO',
    description:
      'CEO Shamini Ayyadhury on why shared language and ecosystem thinking drive scientific and economic progress.',
    link: 'https://bot.com/News/Building-Canada-s-Life-Sciences-Nexus-Panoramics-A-Vision-Inc',
    linkText: 'Read Article →',
  },
];

export default function NewsSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 3;
  const pageCount = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const currentItems = newsItems.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  return (
    <section className="news-section">
      <div className="container">
        <div className="section-title">
          <span className="tag muted-dark">Updates</span>
          <h2 className="tx-dark">News & Highlights</h2>
          {/* <p className="muted-dark">Latest articles widely reported about Panoramics and our CEO</p> */}
        </div>
        
        <div className="news-grid">
          {currentItems.map((item, index) => {
            const absoluteIndex = page * ITEMS_PER_PAGE + index;
            const isExpanded = !!expanded[absoluteIndex];
            const needsCollapse = item.description.length > MAX_PREVIEW_LENGTH;
            const displayedDescription =
              needsCollapse && !isExpanded
                ? item.description.slice(0, MAX_PREVIEW_LENGTH) + '...'
                : item.description;

            return (
              <article key={item.title + index} className="news-card">
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p>{displayedDescription}</p>

                  {needsCollapse && (
                    <button
                      type="button"
                      className="read-more-btn"
                      onClick={() => toggleExpand(absoluteIndex)}
                    >
                      {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                  )}

                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.link}
                    className="text-link"
                  >
                    {item.linkText}
                  </a>
                </div>
              </article>
            );
          })}

           {/* Article 1 */}
          {/* <article className="news-card"> */}
             {/* <div className="news-image">
              <img src="/Inspire-me-banner.png" alt="Innovation Award" />
            </div> */}
            {/* <div className="news-content">
              <span className="news-date">February 25 2026</span>
              <h3>Call For Abstracts Closed</h3>
              <p>The call for abstracts submission for the 2026 True North Spatial conference has now been closed.</p>
            </div>
          </article> */}
          {/* Article 2 */}
          {/* <article className="news-card"> */}
            {/* <div className="news-image">
              <img src="/trbot-pano-logo.png" alt="TRBOT" />
            </div> */}
            {/* <div className="news-content">
              <span className="news-date">January 29 2026</span>
              <h3>Panoramics on TNS2026 - Toronto Board of Trade interview with Shamini Ayyadhury, CEO</h3>
              <p>CEO Shamini Ayyadhury on why shared language and ecosystem thinking drive scientific and economic progress.</p>
              <a target='_blank' href="https://bot.com/News/Building-Canada-s-Life-Sciences-Nexus-Panoramics-A-Vision-Inc" className="text-link">Read Article &rarr;</a>
            </div>
          </article> */}

         

          {/* Article 3 */}
          {/* <article className="news-card">
             <div className="news-image">
              <img src="/Enlighten-me-banner.png" alt="Partnership" />
            </div>
            <div className="news-content">
              <span className="news-date">December 2025</span>
              <h3>New Partnership Announcement</h3>
              <p>We are excited to announce a new strategic partnership to accelerate research capabilities.</p>
              <a href="#" className="text-link">Read Article &rarr;</a>
            </div>
          </article> */}
        </div>

        <div className="news-pagination">
          <button
            type="button"
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="pagination-btn"
          >
            ◀
          </button>
          <span className="pagination-info">
            Page {page + 1} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
            disabled={page >= pageCount - 1}
            className="pagination-btn"
          >
            ▶
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .news-section {
          padding: 60px 0;
          background-color: #f8f9fa; /* Light background to distinguish from hero */
        }
        
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          margin-top: 40px;
        }
        
        .news-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
        }

        .news-image {
          height: 200px;
          width: 100%;
          background-color: #f0f0f0;
          overflow: hidden;
        }

        .news-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .news-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        
        .news-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        }
        
        .news-date {
          display: block;
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .news-content h3 {
          margin: 0 0 12px;
          font-size: 1.25rem;
          color: #1a1a1a;
          line-height: 1.4;
        }
        
        .news-content p {
          color: #555;
          margin-bottom: 20px;
          line-height: 1.6;
          font-size: 1rem;
        }

        .read-more-btn {
          background: none;
          border: none;
          color: #5757e0;
          cursor: pointer;
          padding: 0;
          font-weight: 700;
          margin-bottom: 16px;
          align-self: flex-start;
        }

        .read-more-btn:hover {
          text-decoration: underline;
        }

        .news-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 28px;
        }

        .pagination-btn {
          border: 1px solid #ccc;
          background: #fff;
          color: #333;
          border-radius: 8px;
          padding: 10px 16px;
          cursor: pointer;
          font-weight: 600;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          font-weight: 600;
          color: #333;
        }
      `}</style>
    </section>
  );
}
