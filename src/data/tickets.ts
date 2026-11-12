export interface TicketCategory {
  id: string;
  name: string;
  earlyPrice: string;
  standardPrice: string;
  requiresApproval: boolean;
  eligibility: string;
  extraNote?: string;
}

export const ticketsPageContent = {
  title: "True North Spatial 2027 Registration Fees",
  intro:
    "Tickets are on sale from 18 November 2026 until 26 March 2027. Prices are in CAD and listed as Early Bird and Standard.",
  includesTitle: "Every ticket includes:",
  includes: [
    "The full scientific program (April 27–29)",
    "Breakfast and breaks on all three days",
    "Lunch on Days 1 and 2",
  ],
  excludesTitle: "Not included:",
  excludes: [
    "The Vertex Dinner (by invitation only)",
    "The April 26 pre-summit workshop",
  ],
  closingNote: "We hope to see you there!",
  logo: "/Panoramics-transparent-cropped.png",
  logoAlt: "Panoramics - A Vision Logo",
  buyLabel: "Buy Tickets",
  buyHref: "https://lu.ma/tns2027",
  columns: {
    early: {
      label: "Early Bird (CAD)",
      note: "18 Nov 2026 – 26 Mar 2027",
    },
    standard: {
      label: "Standard (CAD)",
      note: "18 Nov 2026 – 26 Mar 2027",
    },
  },
};

export const ticketCategories: TicketCategory[] = [
  {
    id: "high-school",
    name: "High Schoolers",
    earlyPrice: "$210 + tax",
    standardPrice: "$275 + tax",
    requiresApproval: true,
    eligibility: "High school students aged 16+",
  },
  {
    id: "undergrad",
    name: "Undergrad Students",
    earlyPrice: "$275 + tax",
    standardPrice: "$350 + tax",
    requiresApproval: true,
    eligibility: "Undergraduate students",
  },
  {
    id: "graduate",
    name: "Graduate Students",
    earlyPrice: "$350 + tax",
    standardPrice: "$400 + tax",
    requiresApproval: true,
    eligibility:
      "PhD and master’s students, and clinicians enrolled in MD/PhD or graduate programs",
  },
  {
    id: "core-facility",
    name: "Core Facility",
    earlyPrice: "$350 + tax",
    standardPrice: "$400 + tax",
    requiresApproval: true,
    eligibility: "Core facility staff and managers",
  },
  {
    id: "early-career",
    name: "Early Career",
    earlyPrice: "$475 + tax",
    standardPrice: "$625 + tax",
    requiresApproval: false,
    eligibility:
      "Postdoctoral & clinical fellows, research & technical staff (not in a core), staff & associate scientists, new PIs, startup scientists.",
  },
  {
    id: "scientist-clinician",
    name: "Scientist / Clinician",
    earlyPrice: "$595 + tax",
    standardPrice: "$725 + tax",
    requiresApproval: false,
    eligibility: "Established academic and clinical scientists.",
  },
  {
    id: "industry",
    name: "Industry",
    earlyPrice: "$725 + tax",
    standardPrice: "$850 + tax",
    requiresApproval: false,
    eligibility:
      "For professionals at established life sciences, biotechnology, pharmaceutical, diagnostics and technology companies. This includes R&D and application scientists, field and technical specialists, product, marketing, sales and business development staff, and managers and executives. It also covers staff of contract research organizations (CROs) and service providers, as well as consultants and investors.",
    extraNote:
      "Startup scientists, please register under Early Career Researchers. Staff of TNS2027 sponsors, please use your company’s complimentary passes.",
  },
];
