import { ticketCategories, ticketsPageContent } from "@/data/tickets";

export default function TicketsHero2() {
  const { columns } = ticketsPageContent;

  return (
    <section className="tickets" id="tickets">
      <div className="ticket-container">
        <div className="ticket-header">
          <div className="ticket-header-left">
            <p className="ticket-kicker">TNS2027 Registration</p>
            <h1>{ticketsPageContent.title}</h1>
            <p>{ticketsPageContent.intro}</p>
            <div className="ticket-info-grid">
              <div className="ticket-info-section">
                <h3>{ticketsPageContent.includesTitle}</h3>
                <ul className="ticket-header-list">
                  {ticketsPageContent.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ticket-info-section">
                <h3>{ticketsPageContent.excludesTitle}</h3>
                <ul className="ticket-header-list ticket-exclude-list">
                  {ticketsPageContent.excludes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="ticket-closing-note">{ticketsPageContent.closingNote}</p>
          </div>
          <div className="ticket-header-right">
            <img
              src={ticketsPageContent.logo}
              alt={ticketsPageContent.logoAlt}
              className="ticket-logo-image"
            />
          </div>
        </div>

        <div className="table-responsive ticket-table-responsive">
          <table className="ticket-table">
            <thead>
              <tr>
                <th>Ticket</th>
                <th className="ticket-early-reg-header">{columns.early.label}</th>
                <th className="ticket-regular-reg-header">{columns.standard.label}</th>
              </tr>
            </thead>
            <tbody>
              {ticketCategories.map((category) => (
                <tr key={category.id}>
                  <th className="ticket-category-details">
                    <div className="ticket-category-heading">
                      <div className="ticket-category-name">{category.name}</div>
                      {category.requiresApproval && (
                        <span className="ticket-approval">Requires approval</span>
                      )}
                    </div>
                    <p className="ticket-eligibility">{category.eligibility}</p>
                    {category.extraNote && (
                      <p className="ticket-extra-note">{category.extraNote}</p>
                    )}
                  </th>
                  <td className="ticket-price-cell ticket-price-cell-early">
                    <div className="ticket-price">{category.earlyPrice}</div>
                  </td>
                  <td className="ticket-price-cell">
                    <div className="ticket-price">{category.standardPrice}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ticket-cards">
          {ticketCategories.map((category) => (
            <article className="ticket-card" key={category.id}>
              <div className="ticket-category-heading">
                <div className="ticket-category-name">{category.name}</div>
                {category.requiresApproval && (
                  <span className="ticket-approval">Requires approval</span>
                )}
              </div>
              <p className="ticket-eligibility">{category.eligibility}</p>
              {category.extraNote && (
                <p className="ticket-extra-note">{category.extraNote}</p>
              )}
              <div className="ticket-card-prices">
                <div className="ticket-card-price ticket-card-price-early">
                  <span className="ticket-card-price-label">{columns.early.label}</span>
                  <div className="ticket-price">{category.earlyPrice}</div>
                </div>
                <div className="ticket-card-price">
                  <span className="ticket-card-price-label">{columns.standard.label}</span>
                  <div className="ticket-price">{category.standardPrice}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a href={ticketsPageContent.buyHref} className="btn btn-primary ticket-buy-button">
          {ticketsPageContent.buyLabel}
        </a>
      </div>
    </section>
  );
}
