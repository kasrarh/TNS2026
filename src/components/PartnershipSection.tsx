'use client';

import React from 'react';

const PARTNERSHIPS = [
  {
    title: 'PANORAMA',
    color: '#8c703a', // Dark Gold
    image: '/sponsors/tiers2/panorama.png',
    tagline: 'The Complete Package',
    description: 'Total visibility for this exclusive event. Present everywhere and in all communications. This is a comprehensive visibility plan that includes everything. This is the event\'s major partner.',
    price: '$20,000',
    included: [
      'Logo on the website',
      'Logo on the program and presentation materials',
      'Maximum visibility during breaks (slide presentations)',
      'Logo and partnership level display at the registration desk',
      'Verbal mention during the opening address (individual mention)',
      '5 items included in each participant\'s bag',
      '3 to 5 minutes introductory video before the conference',
      '5 complimentary tickets',
      'Priority choice of booth and display location',
      '30-minute speaking slot (reserved for partners with a booth)'
    ]
  },
  {
    title: 'SPATIAL',
    color: '#7b0d32', // Silver
    image: '/sponsors/tiers2/spatial.png',
    tagline: 'The Collaborator',
    description: 'Collaborates on the event with high visibility. Present in all opportunities and communications.',
    price: '$15,000',
    included: [
      'Logo on the website',
      'Logo on the program and presentation materials',
      'Significant visibility during breaks (slide presentations)',
      'Verbal mention during presentations (individual mention)',
      'Insertion of 3 items in participants\' bags',
      '1 to 3 minutes introductory video before the conference',
      '3 complimentary tickets',
      'Secondary choice of booth and display location',
      '30-minute speaking slot (reserved for partners with a booth)'
    ]
  },
  {
    title: 'CONNECTOME',
    color: '#f6b300', // Gold
    image: '/sponsors/tiers2/connectome.png',
    tagline: 'The Connector',
    description: 'An essential role and excellent visibility. This is a significant visibility plan that enjoys strong recognition.',
    price: '$10,000',
    included: [
      'Logo on the website',
      'Logo on the program and presentation materials',
      'Average visibility during breaks (slide presentations)',
      'Verbal mention before lunch (individual mention)',
      'Insertion of 2 items in participants\' bags',
      '1-minute introductory video before the conference',
      '2 complimentary tickets',
      'Booth setup',
      '20-minute speaking slot (reserved for partners with a booth)'
    ]
  },
  {
    title: 'CELLULAR',
    color: '#094858', // Blue
    image: '/sponsors/tiers2/cellular.png',
    tagline: 'The Networker',
    description: 'Their participation is important. This visibility plan is most effective when combined with a booth.',
    price: '$5,000',
    included: [
      'Logo on the website',
      'Logo on the program and presentation materials',
      'Standard visibility during breaks (slide presentations)',
      'Verbal mention on the second day during the morning sessions (group mention)',
      'Insertion of one item in each participant\'s bag',
      'Generic introductory video before the conference',
      '0 to 2 free tickets (with booth purchase)',
      '15-minute speaking slot (with booth purchase)'
    ]
  },
  {
    title: 'NUCLEAR',
    color: '#0e6c82', // Teal
    image: '/sponsors/tiers2/nuclear.png',
    tagline: 'The Speaker',
    description: 'While not as highly visible as the previous partners, this visibility plan is particularly effective when combined with a booth at the exhibition.',
    price: '$2,500',
    included: [
      'Logo on the website',
      'Logo on the program and presentation materials',
      'Mention of your name during breaks (slide presentations)',
      'Verbal mention on the second day during the afternoon sessions (group mention)',
      'Generic and group introductory video before the conference',
      '0 to 2 free tickets (with booth purchase)',
      '10-minute speaking slot (with booth purchase)'
    ]
  },
  {
    title: 'ORGANELLE',
    color: '#0f91ae', // Light Green
    image: '/sponsors/tiers2/organelle.png',
    tagline: 'The Participant',
    description: 'Their participation is reflected in the visibility of their image and name within the event. This visibility plan is particularly important when combined with a booth at the exhibition.',
    price: '$1000',
    included: [
      'Logo on the website',
      'Name on the program and presentation materials',
      'Mention of your name during breaks (slide presentations)',
      'Verbal mention during the closing session (group mention)',
      'Generic and group introductory video before the conference',
      '0 to 2 free tickets (with booth purchase)',
      '10-minute speaking slot (with booth purchase)'
    ]
  },
  {
    title: 'BOOTHS',
    color: 'black', // Gray
    image: '/sponsors/tiers2/exhibitor.png',
    tagline: 'Exhibition Space',
    description: '6-foot by 30-inch tables for your booths are also available if you do not purchase a partnership package.',
    price: '$2,750',
    included: [
      'Logo on the website',
      'Name on the program and presentation materials',
      'Mention of your name during breaks (slide presentations)',
      'Verbal mention during the closing session (group mention)',
      'Generic and group introductory video'
    ]
  }
];

export default function PartnershipSection() {
  return (
    <section className="partnership-section">
      <div className="container">
        <header className="section-title" style={{marginTop: '50px'}}>
            {/* <span className="tag">Resources</span> */}
            <h2 className='tx-dark'>Sponsorship Opportunities</h2>
            <p className="muted-dark">
                We offer multi-tier packages (Panorama, Spatial, Connectome, Cellular, Nuclear, Organelle), with customizable options. 
                Explore our prospectus and packages below to find the right fit for your organization.
            </p>
        </header>
        <div style={{ textAlign: 'center', margin: '40px 0', color: 'black' }}>
            <p className='muted-dark'>Please contact <a style={{color: "#8c703a"}} href="mailto:sponsorship@panoramics-a-vision.com" className="text-link">sponsorship@panoramics-a-vision.com</a>.</p>
        </div>        
        <div className="partnership-grid">
          {PARTNERSHIPS.map((offer, index) => (
            <article key={index} className="partnership-card" style={{ borderTop: `4px solid ${offer.color}` }}>
              <div className="card-image-container">
                 <img src={offer.image} alt={offer.title} />
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title" style={{ color: offer.color }}>{offer.title}</h3>
                  <span className="card-tagline">{offer.tagline}</span>
                </div>
                <div className="card-price">{offer.price}</div>
                <p className="card-description">{offer.description}</p>
                
                <h4 className="included-title">What's included:</h4>
                <ul className="included-list">
                  {offer.included.map((item, i) => (
                    <li key={i}>
                      <span style={{ color: offer.color, marginRight: '8px', fontWeight: 'bold' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                {/* <button className="cta-button">Select Package</button> */}
              </div>
            </article>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .partnership-section {
          padding: 60px 0;
          background-color: #f8f9fa;
        }
        
        .partnership-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-top: 40px;
        }
        
        .partnership-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          border: 1px solid #eaeaea;
          display: flex;
          flex-direction: column;
        }
        
        .partnership-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        }

        .card-image-container {
          height: 280px;
          overflow: hidden;
          position: relative;
          background-color: white;
          padding: 20px;
        }

        .card-image-container img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.5s ease;
        }

        .partnership-card:hover .card-image-container img {
          transform: scale(1.05);
        }

        .card-content {
          padding: 32px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-header {
          margin-bottom: 16px;
        }

        .card-title {
          font-size: 1.5rem;
          color: #1a1a1a;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-tagline {
          display: block;
          font-size: 1rem;
          color: #666;
          font-style: italic;
          margin-top: 4px;
        }

        .card-price {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-color, #007bff); /* Fallback color */
          margin-bottom: 16px;
        }

        .card-description {
          color: #555;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .included-title {
          font-size: 1rem;
          margin-bottom: 12px;
          color: #333;
          text-transform: uppercase;
          font-weight: 600;
        }

        .included-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }

        .included-list li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          color: #555;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .cta-button {
          margin-top: 24px;
          padding: 12px 24px;
          background-color: #000;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .cta-button:hover {
          background-color: #333;
        }
      `}</style>
    </section>
  );
}
