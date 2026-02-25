'use client';

import React from 'react';

export default function NewsSection() {
  return (
    <section className="news-section">
      <div className="container">
        <div className="section-title">
          <span className="tag muted-dark">Updates</span>
          <h2 className="tx-dark">News & Highlights</h2>
          {/* <p className="muted-dark">Latest articles widely reported about Panoramics and our CEO</p> */}
        </div>
        
        <div className="news-grid">

           {/* Article 1 */}
          <article className="news-card">
             {/* <div className="news-image">
              <img src="/Inspire-me-banner.png" alt="Innovation Award" />
            </div> */}
            <div className="news-content">
              <span className="news-date">February 25 2026</span>
              <h3>Call For Abstract Closed</h3>
              <p>The call for abstracts submission for the 2026 True North Spatial conference has now been closed.</p>
            </div>
          </article>
          {/* Article 2 */}
          <article className="news-card">
            {/* <div className="news-image">
              <img src="/trbot-pano-logo.png" alt="TRBOT" />
            </div> */}
            <div className="news-content">
              <span className="news-date">January 29 2026</span>
              <h3>Panoramics on TNS2026 - Toronto Board of Trade interview with Shamini Ayyadhury, CEO</h3>
              <p>CEO Shamini Ayyadhury on why shared language and ecosystem thinking drive scientific and economic progress.</p>
              <a target='_blank' href="https://bot.com/News/Building-Canada-s-Life-Sciences-Nexus-Panoramics-A-Vision-Inc" className="text-link">Read Article &rarr;</a>
            </div>
          </article>

         

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
      `}</style>
    </section>
  );
}
