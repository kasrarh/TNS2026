
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

        <div className="person-modal-header">
          <div>
            <h3 className="person-modal-name">Ticket Information</h3>

            <p className="person-modal-desc">TNS2026 tickets falls under 4 categories. Please select the category that best describes you.
                Each ticket provides single-entry access for all 3 days and includes:
            </p>
            <ul>
                <li>Breakfast on Day 1, Day 2, and Day 3</li>
                <li>All day Beverages and Snacks for all three days</li>
                <li>Guaranteed networking breaks</li>
                <li>Lunch on Day 1 and Day 2</li>
            </ul>
            <p className="person-modal-desc">Category A: Tickets start from $675 + Taxes</p>
            <ul>
              <li>Corporate Executives</li>
              <li>Investors</li>
              <li>Business owners</li>
            </ul>
            <p className="person-modal-desc">Category B: Tickets start from $575 + Taxes</p>
            <ul>
              <li>Principal Investigators (PIs)</li>
              <li>Clinician Scientists / Clinicians</li>
              <li>Industry Scientists</li>
              <li>Academic Administrators / Directors</li>
            </ul>
            <p className="person-modal-desc">Category C: Tickets start from $495 + Taxes</p>
            <ul>
              <li>Staff Scientists</li>
              <li>Postdoctoral Fellows</li>
              <li>Research Associates / Scientific Associates</li>
              <li>Research Program Managers / Coordinators</li>
            </ul>
            <p className="person-modal-desc">Category D: Tickets start from $350 + Taxes</p>
            <ul>
              <li>Graduate Students</li>
              <li>Undergraduate Students / Interns</li>
              <li>*** Core research facilities</li>
            </ul>
          </div>
        </div>
          <a
            href="https://luma.com/tns2026"
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Proceed
          </a>
      </div>
    </div>
  );
}