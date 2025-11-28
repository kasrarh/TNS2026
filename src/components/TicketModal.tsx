
import React from "react";

export default function TicketModal({
    onClose
}: {
  onClose: () => void;
}) {
  return (
    <div className="person-modal-backdrop" onClick={onClose}>
      <div
        className="person-modal"
        style={{overflowY: 'auto'}}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Ticket Information"
      >
        <button
          type="button"
          className="person-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="person-modal-header" >
          <div>
            <h3 className="person-modal-name">Ticket Information</h3>
            <p className="person-modal-desc">All tickets include single-entry access to all 3 days as well as Breakfast, Lunch, and Snacks/Drinks throughout as well as guaranteed networking breaks.</p>

            {/* <p className="person-modal-desc"> */}
                {/* Each ticket provides single-entry access for all 3 days and includes: (i) Breakfast on Day 1, Day 2, and Day 3. (ii) All day Beverages and Snacks for all three days. (iii) Guaranteed networking breaks. (iv) Lunch on Day 1 and Day 2.</p> */}
            <p className="person-modal-desc"><u>Category A:</u> Tickets start from $675 + Taxes</p>
            <ul className="person-modal-desc">
              <li>Corporate Executives</li>
              <li>Investors</li>
              <li>Business owners</li>
            </ul>
            <hr/>

            <p className="person-modal-desc"><u>Category B:</u> Tickets start from $575 + Taxes</p>
            <ul className="person-modal-desc">
              <li>Principal Investigators (PIs)</li>
              <li>Clinician Scientists / Clinicians</li>
              <li>Industry Scientists</li>
              <li>Academic Administrators / Directors</li>
            </ul>
            <hr/>
            {/* <div style={{padding: '10px', border: '1px solid white', borderRadius: '10px'}}> */}
            <p className="person-modal-desc" ><u>Category C:</u> Tickets start from $495 + Taxes</p>
            <ul className="person-modal-desc">
              <li>Staff Scientists</li>
              <li>Postdoctoral Fellows</li>
              <li>Research Associates / Scientific Associates</li>
              <li>Research Program Managers / Coordinators</li>
            </ul>
            <hr/>
            <p className="person-modal-desc"><u>Category D:</u> Tickets start from $350 + Taxes</p>
            <ul className="person-modal-desc">
              <li>Graduate Students</li>
              <li>Undergraduate Students / Interns</li>
              <li>Core research facilities</li>
            </ul>
            <a href="/tickets">More details</a>
          </div>
        </div>
          <a
            href="https://luma.com/tns2026"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
            style={{width: '100%', textAlign: 'center'}}
          >
            Proceed
          </a>
      </div>
    </div>
  );
}