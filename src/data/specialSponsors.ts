export type SponsorTierId =
  | "vertex"
  | "panorama"
  | "spatial"
  | "connectome"
  | "cellular"
  | "organelle";

export interface SponsorTier {
  label: string;
  /** Logo size relative to the top tier (1 = 100%). `null` means name only, no logo. */
  logoScale: number | null;
}

/** Ordered from highest to lowest tier; this order drives how sponsors are listed. */
export const sponsorTiers: Record<SponsorTierId, SponsorTier> = {
  vertex: { label: "The Vertex", logoScale: 1 },
  panorama: { label: "Panorama", logoScale: 1 },
  spatial: { label: "Spatial", logoScale: 0.85 },
  connectome: { label: "Connectome", logoScale: 0.5 },
  cellular: { label: "Cellular", logoScale: 0.25 },
  organelle: { label: "Organelle", logoScale: null },
};

export const sponsorTierOrder = Object.keys(sponsorTiers) as SponsorTierId[];

export interface SpecialSponsor {
  id: string;
  name: string;
  /** Optional logo path under /public. Leave empty to show initials placeholder. */
  logo?: string | null;
  tier: SponsorTierId;
  tagline: string;
  description: string;
  /** Optional attribution shown under the description, e.g. who wrote it. */
  descriptionAuthor?: {
    name: string;
    title?: string;
  } | null;
  website?: string | null;
}

export const specialSponsorsSectionContent = {
  title: "Thank You To Our 2027 Sponsors",
};

export const specialSponsors: SpecialSponsor[] = [
  {
    id: "miltenyi-biotec",
    name: "Miltenyi Biotec",
    logo: "/sponsors2027/Logo_MiltenyiBiotec.jpg",
    tier: "connectome",
    tagline:
      "The bridger, who enables flow and discovery, allowing science to extend beyond its known boundaries.",
    description:
      "Working with spatial biology researchers across Canada has shown me that the biggest breakthroughs rarely happen in isolation. Technologies like MACSima can help unlock new insights, but the real momentum comes from a collaborative community of scientists, institutions, and partners working together to advance our understanding of biology.",
    descriptionAuthor: {
      name: "Zachary Jilesen, MSc",
      title: "Field Application Scientist",
    },
    website: "https://www.miltenyibiotec.com",
  },
  {
    id: "mantalys",
    name: "Mantalys",
    logo: "/sponsors2027/Logo_Mantalys.png",
    tier: "cellular",
    tagline: "The reliable, self-sufficient partner who provides trust and stability.",
    description:
      "With co-founders hailing from both Toulouse, France and Toronto, Canada, Mantalys represents a union of Canadian and European scientific values, with a commitment to scientific collaboration, innovation, and accessibility that aligns closely with the mission of Panoramics – A Vision and True North Spatial. As a deeptech start-up focused on AI-powered image analysis, we distinguish ourselves by being rooted in community values and combining innovative AI approaches with pragmatic dedication to solving real scientific problems in human health and disease.",
    descriptionAuthor: {
      name: "Brienne McKenzie, PhD",
      title: "Co-Founder | Chief Product Officer",
    },
    website: "https://mantalys.fr/",
  },
];

