export default function TicketsHero2() {

    return (
        <section className="tickets" id="tickets">
            <div className="ticket-container">
                <div className="ticket-header">
                    <div className="ticket-header-left">
                        <h1>TRUE NORTH SPATIAL 2026 REGISTRATION FEES</h1>
                        <p>Tickets are sold under four categories, A-D. Please review carefully before purchasing.</p>
                        <div className="ticket-info-section">
                            <h3>Each ticket provides single-entry access for all 3 days and includes:</h3>
                            <ul className="ticket-header-list">
                                <li>Breakfast on Day 1, Day 2, and Day 3</li>
                                <li>Lunch on Day 1 and Day 2</li>
                                <li>All day Beverages and Snacks for all three days</li>
                                <li>Guaranteed networking breaks</li>
                            </ul>
                        </div>
                        <p className="ticket-closing-note">We hope to see you there!</p>
                    </div>
                    <div className="ticket-header-right">
                        {/* Note: self-closing tag and using a variable for src */}
                        <img src='fees-logo.png' alt="TNS 2026 Logo" className="ticket-logo-image" />
                    </div>
                </div>

                <div className="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Category (A-D)</th>
                                <th className="ticket-early-reg-header">
                                    Early Registration (CAD)
                                    {/* Note: Using 'div' instead of a separate element for the date text */}
                                    <div>(Until 25/02/2026)</div>
                                </th>
                                <th className="ticket-regular-reg-header">
                                    Regular Registration (CAD)
                                    <div>(26/02/2026 - 27/03/2026)</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th className="ticket-category-details">
                                    <div className="ticket-category-name">CATEGORY A: TRAINEES & CORE FACILITIES</div>
                                    <ul className="ticket-category-list">
                                        <li>Core research facility managers & executives (Academia)</li>
                                        <li>Graduate Students</li>
                                        <li>Undergraduate Students</li>
                                    </ul>
                                </th>
                                <td>
                                    <div className="ticket-price">$350 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                                <td>
                                    <div className="ticket-price">$425 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="ticket-category-details">
                                    <div className="ticket-category-name">CATEGORY B: SCIENTIFIC SPECIALISTS</div>
                                    <ul className="ticket-category-list">
                                        <li>Postdoctoral Fellows (Industry + Academia)</li>
                                        <li>Research / Scientific Associates (Industry + Academia)</li>
                                        <li>Staff Scientists (Industry + Academia)</li>
                                    </ul>
                                </th>
                                <td>
                                    <div className="ticket-price">$495 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                                <td>
                                    <div className="ticket-price">$595 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="ticket-category-details">
                                    <div className="ticket-category-name">CATEGORY C: SCIENTIST/CLINICIAN</div>
                                    <ul className="ticket-category-list">
                                        <li>Principal Investigators (PIs)</li>
                                        <li>Clinician Scientists / Clinicians</li>
                                        <li>Industry Scientists (Academia + Industry)</li>
                                    </ul>
                                </th>
                                <td>
                                    <div className="ticket-price">$575 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                                <td>
                                    <div className="ticket-price">$675 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                            </tr>
                            <tr>
                                <th className="ticket-category-details">
                                    <div className="ticket-category-name">CATEGORY D: CORPORATE</div>
                                    <ul className="ticket-category-list">
                                        <li>Corporate Executives</li>
                                        <li>Investors</li>
                                        <li>Business owners</li>
                                    </ul>
                                </th>
                                <td>
                                    <div className="ticket-price">$675 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                                <td>
                                    <div className="ticket-price">$775 + taxes</div>
                                    <span className="ticket-price-note">(Entry for all 3 days)</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <a href="https://luma.com/tns2026" className="btn btn-primary" style={{width:'100%',marginTop:'10px'}}>Buy Tickets</a>
            </div>
        </section>
    );
}

