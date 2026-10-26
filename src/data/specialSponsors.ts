export interface SpecialSponsor {
  id: string;
  name: string;
  /** Optional logo path under /public. Leave empty to show initials placeholder. */
  logo?: string | null;
  tier: string;
  tagline: string;
  description: string;
  website?: string | null;
}

export const specialSponsorsSectionContent = {
  title: "Our Special Sponsors",
  subtitle:
    "Partners who elevate the True North Spatial experience. Replace these placeholders with confirmed sponsors.",
};

export const specialSponsors: SpecialSponsor[] = [
  {
    id: "sponsor-vertex",
    name: "Aurora Biosystems",
    logo: null,
    tier: "The Vertex",
    tagline: "Uniting science, academia, and industry at one table.",
    description:
      "Placeholder copy: Aurora Biosystems is a special partner of True North Spatial, supporting cross-disciplinary dialogue and the Corporate Dinner experience. Replace this blurb with the confirmed sponsor story and partnership highlights.",
    website: "https://example.com",
  },
  {
    id: "sponsor-panorama",
    name: "Northlight Spatial",
    logo: null,
    tier: "Panorama Sponsor",
    tagline: "A broad view across past, present, and future discovery.",
    description:
      "Placeholder copy: Northlight Spatial represents visionary partners who help shape the scientific program and community reach of TNS. Update this text with the real company overview and how they contribute to the summit.",
    website: "https://example.com",
  },
  {
    id: "sponsor-gambit",
    name: "Helix Frontier Labs",
    logo: null,
    tier: "The Gambit",
    tagline: "Bold partners powering innovation across talent and industry.",
    description:
      "Placeholder copy: Helix Frontier Labs stands in for a Blue Chip special sponsor. Swap in the official logo, name, and a short narrative about their role at TNS2026 / TNS2027.",
    website: "https://example.com",
  },
];
