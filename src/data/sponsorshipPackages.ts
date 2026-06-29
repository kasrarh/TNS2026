export interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  subtitle?: string | null;
  description: string;
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  tiers: SponsorshipTier[];
}

/** A inline text segment; set `bold: true` to emphasize part of a paragraph. */
export interface SponsorshipTextSegment {
  text: string;
  bold?: boolean;
}

export type SponsorshipMessageParagraph = SponsorshipTextSegment[];

export interface SponsorshipSectionMessage {
  subtitle: string;
  paragraphs: SponsorshipMessageParagraph[];
}

export interface SponsorshipDownload {
  label: string;
  href: string;
  fileName: string;
}

export const sponsorshipDownloads: SponsorshipDownload[] = [
  {
    label: "Spatial Technology Sponsorship",
    href: "https://kasra-demo-s3-v1.s3.us-east-1.amazonaws.com/sponsorship/True+North+Spatial+2027+TechProspectus.pdf",
    fileName: "Spatial Technology Sponsorship.pdf",
  },
  {
    label: "Blue Chip Sponsorship",
    href: "https://kasra-demo-s3-v1.s3.us-east-1.amazonaws.com/sponsorship/True+North+Spatial+2027+BlueChipProspectus.pdf",
    fileName: "Blue Chip Sponsorship.pdf",
  },
];

export const sponsorshipSectionContent = {
  title: "Partner with Panoramics - A Vision for True North Spatial 2027",
  subtitle: "Sponsorship opportunities are now open. Limited tiers available.",
  message: {
    subtitle: "It's not the package. It's the identity - the choice that defines your experience.",
    paragraphs: [
      [
        { text: "Dear Partner," },
      ],
      [
        { text: "For Panoramics - A Vision, the sponsor experience begins before the summit itself." },
      ],
      [
        { text: "The sponsor experience is a " },
        { text: "reflection of your identity - of who you are. ", bold: true },
        { text: "It is a representation of the gaps you seek to close." },
      ],
      [
        { text: "As Canada elevates its life sciences ecosystem, Panoramics - A Vision is proud and humbled to contribute to this broader national endeavour, through" },
        { text: " True North Spatial.", bold: true },
      ],
      [
        { text: "Our vision is rooted in the conviction that Canada is well positioned to be the " },
        { text: "spatial nexus for global scientific engagement ", bold: true },
        { text: "- a safe, reliable, and forward-looking destination where leaders such as yourself do not simply attend, but take their place in the discourse with other global leaders and the scientific community." },
      ],
      [
        { text: "We are proud to invite you to join us in turning " },
        { text: "bold ambition and vision " , bold: true },
        { text: "into a " },
        { text: "visible architecture.", bold: true },
      ],
      [
        { text: "At Panoramics - A Vision, we are committed to honouring the sponsor experience, as well as ours, and the community’s." },
      ],
      [
        { text: "We look forward to welcoming you to " },
        { text: "True North Spatial 2027 ", bold: true },
        { text: "and to invest in a bold future." },
      ],
      [
        { text: "With warm regards," },
      ],
      [
        { text: "Shamini Ayyadhury, PhD" },
      ],
      [
        { text: "Founder & CEO | Panoramics - A Vision INC" },
      ],
    ],
  } satisfies SponsorshipSectionMessage,
};

export const sponsorshipPackages: SponsorshipPackage[] = [
  {
    id: "corporate-dinner",
    name: "Corporate Dinner Sponsorship",
    tiers: [
      {
        id: "the-vertex",
        name: "The Vertex",
        price: "$25,000 CAD",
        subtitle: "The partner who unites the disciplines, allowing connections between science, academia and business.",
        description: "Taking our inspiration from spatial computing, the vertex is the 3D point where multiple lines, planes or dimensions meet, essential in the formation of complex 3D architecture in space. The Vertex Sponsor therefore personifies that distinctive feature, bolstering the formation of multiple such geometric points, allowing the formation of connections between science, academia and business.",
      },
    ],
  },
  {
    id: "spatial-technology",
    name: "Spatial Technology Sponsorship",
    tiers: [
      {
        id: "spatial-tier-1",
        name: "Panorama",
        price: "$25,000 CAD",
        subtitle: "The Visionary, who integrates the past, present and future, with wisdom.",
        description: "The word Panorama means representing a broad view, from an elevated ground, and also used to describe knowledge and research that is all inclusive and covers a wide spectrum. The Panorama sponsor is therefore 'The Visionary', with a vista built from the wisdom of the past, knowledge of the present and imagination of the future, the game-changer who understands how, from the smallest organelle to the cell, the individual fits in with the collective.",
      },
      {
        id: "spatial-tier-2",
        name: "Spatial",
        price: "$15,000 CAD",
        subtitle: "The Cartographer, the one who captures the biological blueprint, reflecting the patterns across space and time.",
        description: "Here, we simply take the literal meaning of the latin word 'spatium', from which the word Spatial originates from, which simply means space. For all life as we know it is a result of how every element is organized in space. Therefore, the Spatial Sponsor is the molecular cartographer, the one who recognizes that the organizational patterns that emerge across space and time is ultimately the blue-print that drives living ecosystems.",
      },
      {
        id: "spatial-tier-3",
        name: "Connectome",
        price: "$10,000 CAD",
        subtitle: "The bridger, who enables flow and discovery, allowing science to extend beyond its known boundaries.",
        description: "The inspiration for Connectome comes from how collections of neurons form networks of connection - the “wiring diagram” of life. We thus, draw from the connectome in its abstract form, how from these connections, direction, communication, and motion emerge. The Connectome Sponsor is the partner who identifies the anchors and builds the optimal bridges for communication, information flow, and engagement, allowing science to extend beyond its known boundaries, and into the possible.",
      },
      {
        id: "spatial-tier-4",
        name: "Cellular",
        price: "$4,000 CAD",
        subtitle: "The reliable, self-sufficient partner who provides trust and stability.",
        description: "The Cell, the fundamental individual living unit, vital in forming the collective, encompassing all necessary informational content for more elaborate systems to form. Therefore, our Cellular Sponsor is the partner who provides trust, reliability and stability from which networks and connections across time and space can now materialize.",
      },
      {
        id: "spatial-tier-5",
        name: "Organelle",
        price: "$2,000 CAD",
        subtitle: "The expert partner, whose esoteric knowledge contributes to the greatness of the whole.",
        description: "Organelles are the parts that make up all cells, the busy engines and factories that ensure that all biomolecules are protected, engineered and transported for maximal efficiency. One can say here, that the parts are definitely greater than the whole. Here we acknowledge and honor our Organelle Sponsor, for sometimes, the greatest impact is truly made possible by the smallest of actions.",
      },
    ],
  },
  {
    id: "blue-chip",
    name: "Blue Chip Sponsorship",
    tiers: [
      {
        id: "blue-chip-tier-1",
        name: "The Gambit",
        price: "$15,000 CAD",
        description: "The strategist, who takes the bold move, the step into the unknown, to power innovation across industry, talent, and the globe.",
      },
      {
        id: "blue-chip-tier-2",
        name: "The Converger",
        price: "$10,000 CAD",
        description: "The partner who convenes people and ideas together, turning a meeting into global engagement.",
      },
      {
        id: "blue-chip-tier-3",
        name: "The Pillar",
        price: "$5,000 CAD",
        description: "The Pillar, the partner who stands with the community. Every structure begins here.",
      },
    ],
  },
];
