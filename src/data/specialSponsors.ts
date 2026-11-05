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
      "Miltenyi Biotec is a global biomedical company whose technologies span cell separation, cell analysis, cell and gene therapy, and spatial biology. Add a few lines here about their partnership with True North Spatial 2027.",
    website: "https://www.miltenyibiotec.com",
  },
  {
    id: "mantalys",
    name: "Mantalys",
    logo: "/sponsors2027/Logo_Mantalys.png",
    tier: "cellular",
    tagline: "The reliable, self-sufficient partner who provides trust and stability.",
    description:
      "Mantalys turns complex biomedical imaging data into clear, actionable insights using lightweight, sustainable AI. Its hybrid AI, at the intersection of evolutionary computing and deep learning, powers MantaPlex™, whole-slide-image-compatible software for spatial analysis of multiplex tissue images, alongside custom image-analysis algorithms for academic labs and biotech research teams.",
    website: "https://mantalys.fr/",
  },
];

