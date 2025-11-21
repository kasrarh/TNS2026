'use client';

import { useState } from 'react';

type Person = {
  name: string;
  city?: string;
  role?: string;
  desc?: string;
  image?: string;
  linkedin?: string;
  shortRole?: string;
};

const speakers: Person[] = [
	{ name: 'Dr. Morag Park', city: 'Quebec, Canada', image: "/team-members/morag-park.jpg", role: 'Professor, Department of Biochemistry, Medicine and Oncology, McGill University | Director, Rosalind and Morris Goodman Cancer Centre ', desc: "Dr. Morag Park is a leading cancer biologist whose work has fundamentally advanced our understanding of tumour biology, heterogeneity and the microenvironmental cues that drive breast cancer progression. Her lab combines single-cell and spatial transcriptomic methods, and advanced multiplexed spatial imaging to map the architecture of human tumours, uncovering how stromal, immune and malignant compartments interact to drive disease trajectory. Dr. Park’s application of single cell and spatial approaches has revealed clinically important tumour subtypes and microenvironmental cues that impact prognosis and opened potential novel avenues for therapeutics.", linkedin: 'https://www.linkedin.com/in/morag-park-169084136/' },
	{ name: 'Dr. Michael Doyle', city: 'New Mexico, USA', image: "/team-members/michael-doyle.jpeg", role: 'Professor, Chair of Biology, Provost Fellow, New Mexico Tech', desc: 'Dr. Michael Doyle, often referred to as the “father of spatial biology”, pioneered early work in spatial biology, including the revolutionary Visible Embryo Project through which he invented the first system for spatial transcriptomics. As a scientist, educator, inventor and entrepreneur, Dr. Doyle’s work spans fields that include next generation AI for spatial biology, advanced imaging, cloud computing and data security. In his keynote address, Dr. Doyle will map the evolution of the spatial biology field from its origins to the present day, and share his vision for the innovations that will shape the future.', linkedin: 'https://www.linkedin.com/in/mikefios/' },
	{ name: 'Dr. Garry Nolan', city: 'California, USA', image: "/team-members/garry-nolan.jpg", role: 'Professor, Pathology, Stanford | Member, Bio-X, Stanford Cancer Institute, Maternal & Child Health Research Institute, Wu Tsai Human Performance Alliance', desc: "Dr. Garry Nolan is a pioneering scientist, inventor and entrepreneur whose groundbreaking technological innovations have reshaped the single cell and systems biology landscape. Together with Canadian scientist, Dr. Scott Taner, Dr. Nolan developed CyTOF: an invention which has been transformative for the field's ability to map cellular diversity at the single cell proteomic level with unmatched depth. Dr Nolan and his lab continue to drive innovation in spatial biology, network analysis, immune system engineering, and AI, making him an incredibly influential figure in advancing the future of biomedical research and discovery.", linkedin: 'https://www.linkedin.com/in/garry-nolan-0b4315/' },
	{ name: 'Dr. Freda Miller', city: 'British Columbia, Canada', image: "/team-members/freda-miller.png", role: 'Professor, Michael Smith Laboratories (Deputy Director), Department of Medical Genetics, School of Biomedical Engineering, ICORD, University of British Columbia', desc: "Dr. Freda Miller is a world leading stem cell biologist and neuroscientist who has transformed our understanding of neural stem cells, brain development, brain repair and the regeneration and healing of other peripheral tissues, including the murine digit tip and nerve. Her lab combines cutting-edge single cell sequencing, spatial transcriptomic and multiomic approaches with in vivo murine models, to understand how stem cells respond to their environment during development and following injury. Through her innovative use of these approaches, Dr. Miller continues to reveal fundamental mechanisms in development and regeneration.", linkedin: 'https://www.msl.ubc.ca/people/dr-freda-miller/' },
	{ name: 'Dr. Jeffrey Biernaskie', city: 'Alberta, Canada', image: "/team-members/jeff-biernaskie.jpg", role: 'Professor in Regenerative Medicine at Veterinary Medicine, Alberta Children’s Hospital and Hotchkiss Brain Institute, University of Calgary | Calgary Firefighters Burn Treatment Chair in Skin Regeneration and Healing ', desc: "Dr. Jeff Biernaskie is an internationally recognized stem cell and regenerative medicine biologist whose research focuses on the mechanisms that govern tissue repair. His lab uses single cell and spatial transcriptomic approaches to understand the cellular and molecular mechanisms that promote fibrotic vs. regenerative healing with the goal of identifying therapies which limit scar and restore organ function following injury or disease. Working across a remarkable range of mammalian systems, including mouse skin, nerve and brain, along with the reindeer antler, Dr Biernaskie’s work uncovers fundamental mechanisms in tissue repair and regeneration.", linkedin: 'https://www.linkedin.com/in/jeff-biernaskie-29b04940/' },
	{ name: 'Dr. Hartland Jackson', city: 'Ontario, Canada', image: "/team-members/Hartland.png", role: 'Assistant Professor Lunenfeld-Tanenbaum Research Institute, Toronto | Canada Research Chair (Tier II) in Systems Pathology ', desc: "Dr Hartland Jackson is a cancer biologist whose research pioneers the use of highly multiplexed mass spectrometry imaging, integrated with advanced computational methods, to analyze spatially resolved single cell data within the complex tumour environment. His approach enables the screening of distinct cellular clones in murine disease models and has contributed to the identification of biomarkers associated with clinical outcome in human tissues. Dr. Jackson’s group is transforming our understanding of the tumour microenvironment, revealing single-cell defined patient subgroups with distinct prognoses and uncovering the multicellular interactions that drive disease progression.", linkedin: 'https://www.linkedin.com/in/hartlandjackson/' },
	{ name: 'Dr. Maryam Faiz', city: 'Alberta, Canada', image: null, role: 'Associate Professor, Cumming School of Medicine, University of Calgary | Member, Hotchkiss Brain Institute | Child Health & Wellness Researcher, Alberta Children’s Hospital Research Institute', desc: "Dr. Maryam Faiz is a neuroscientist whose research aims to identify new treatments for brain injury and disease by uncovering the diverse roles of astrocytes. Her work integrates single cell and spatial biology approaches to define astrocyte heterogeneity, astrocyte reprogramming into other brain cell types, and reveal how peripheral signals shape astrocyte responses in the injured brain. Together with her collaborators, Dr. Faiz developed the tDISCO platform which enables spatially resolved single cell transcriptomics and proteomics; her group have applied this technology to dissect astrocyte dynamics following cortical ischemic stroke.", linkedin: '#' },
	{ name: 'Dr. Shamini Ayyadhury', city: 'Ontario, Canada', image: "/team-members/shamini.JPEG", role: 'Founder, CEO of Panoramics - A Vision Inc | Scientific Associate, UHN', desc: 'Dr. Shamini Ayyadhury is a computational biologist who works at the cutting edge of single cell and spatial biology, her work encompasses a deep understanding of analysis methods, machine learning and deep biological insight. As founder and CEO of Panoramics - A Vision Inc, she leads a pan-Canadian effort that unites computational, experimental and clinical expertise in the single cell and spatial biology community. As summit chair, her leadership and vision are at the heart of True North Spatial 2026, where she initiated the idea and has shaped a program that brings innovators together to push the boundaries of the field.', linkedin: 'https://www.linkedin.com/in/sayyadhury/' },
	{ name: 'Dr. Robert Beattie', city: 'Manitoba, Canada', image: "/team-members/robert-beattie.jpeg", role: 'Assistant Professor, Max Rady College of Medicine, University of Manitoba | Research Scientist, Children’s Hospital of Manitoba', desc: 'Dr. Robert Beattie is a developmental neurobiologist who applies Mosaic Analysis with Double Markers (MADM), a powerful single-cell genetic lineage tracing technology, to dissect how individual neural stem cells generate diversity in the developing brain. His lab resolves clonal relationships and cellular behaviors with true single-cell precision in vivo, and his work has revealed mechanisms of lineage progression that are inaccessible to traditional single-cell sequencing or imaging approaches. By applying MADM, Dr. Beattie investigates developmental disruptions that contribute to neurodevelopmental and neuropsychiatric disorders, offering new insight into conditions such as autism, schizophrenia, and Rett syndrome.', linkedin: 'https://www.linkedin.com/in/beattie/' },
	{ name: 'Dr. Xin Tang', city: 'British Columbia, Canada', image: "/team-members/Xin_Tang.png", role: 'Assistant Professor, Michael Smith Laboratories, University of British Columbia', desc: "Dr. Xin Tang leads a research programme at the intersection of AI, single cell and spatial biology. Dr. Tang and his group develop biologically informed, explainable AI models that predict cellular behaviour across time from multiomic data, ultimately enabling in silico experimentation. Dr. Tang's work is guiding us toward a better understanding of aging, cancer and neurodegeneration, and his novel approaches are moving us closer to meaningful predictive, model-based biology.", linkedin: 'https://www.linkedin.com/in/beattie/' },
	{ name: 'Dr. Gary Bader', city: 'Ontario, Canada', image: "/team-members/gary-bader.webp", role: 'Professor, Terrance Donnelly Centre for Cellular & Biomolecular Research, Lunenfeld-Tanenbaum Research Institute, UHN, Department of Computer Science University of Toronto', desc: 'Dr. Gary Bader is a leading computational biologist whose lab develops advanced models which aim to understand how cells function and how disease arises from dysregulated molecular networks. His team integrates single cell, genomic, transcriptomic, and multiomic data using novel computational frameworks to enable discoveries with real-world impact. Dr. Bader’s approach has driven major advances in therapeutics, including the identification of the first potential targeted therapy for childhood brain cancer.', linkedin: 'https://www.linkedin.com/in/gary-bader-a08673/' },
	{ name: 'Dr. Ashleigh Willis', city: 'British Columbia, Canada', image: "/team-members/ashleigh.png", role: "Postdoctoral fellow and PANORAMICS - A vision's executive team member", desc: 'Dr. Ashleigh Willis investigates forebrain neural stem cells respond to injury and how their microenvironment guides their activation, fate and regenerative potential. She combines single cell sequencing and spatial transcriptomics with murine in vivo models of injury and disease to uncover how endogenous neural stem cells might be harnessed to repair the brain. As Program Director of True North Spatial 2026, Dr. Willis is curating a contemporary, unconventional program which unites innovators in single cell and spatial biology while creating meaningful training opportunities for early career scientists. During the summit, Dr. Willis will spotlight the goals of Panoramic - A Vision’s “Enlighten Me” chapter.', linkedin: 'https://www.linkedin.com/in/ashleigh-willis-06a724142/' },
];

const organizers: Person[] = [
	{ name: 'Dr. Shamini Ayyadhury', image: "/team-members/shamini.JPEG", shortRole: 'Founder & CEO', role: 'Founder, CEO of Panoramics - A Vision Inc | Scientific Associate, UHN', desc: 'Dr. Shamini Ayyadhury is a computational biologist who works at the cutting edge of single cell and spatial biology, her work encompasses a deep understanding of analysis methods, machine learning and deep biological insight. As founder and CEO of Panoramics - A Vision Inc, she leads a pan-Canadian effort that unites computational, experimental and clinical expertise in the single cell and spatial biology community. As summit chair, her leadership and vision are at the heart of True North Spatial 2026, where she initiated the idea and has shaped a program that brings innovators together to push the boundaries of the field. ', linkedin: 'https://www.linkedin.com/in/sayyadhury/' },
	{ name: 'Alyona Ivanova', image: "/team-members/alyona.jpg", shortRole: 'Creative Content Maestro', role: 'PANORAMICS Executive team member and Creative Content Maestro', desc: 'instrumental in organizing impactful and engaging events and orchestrating content creation.', linkedin: 'https://www.linkedin.com/in/alyona-ivanova-skate22/' },
	{ name: 'Dr. Ashleigh Willis', image: "/team-members/ashleigh.png", shortRole: 'Creative Content Maestro', role: "Postdoctoral fellow and PANORAMICS - A vision's executive team member", desc: 'Dr. Ashleigh Willis investigates forebrain neural stem cells respond to injury and how their microenvironment guides their activation, fate and regenerative potential. She combines single cell sequencing and spatial transcriptomics with murine in vivo models of injury and disease to uncover how endogenous neural stem cells might be harnessed to repair the brain. As Creative Director at Panoramics – A Vision, Dr. Willis works to curate meaningful educational and professional development opportunities to early career scientists.', linkedin: 'https://www.linkedin.com/in/ashleigh-willis-06a724142/' },
	{ name: 'Suluxan Mohanraj', image: "/team-members/suluxan.jpg", shortRole: 'Innovation Architect', role: 'Innovation Architect', desc: 'Involved in identifying emerging technologies, streamlining data accessibility, and building platforms that empower researchers to unlock new insights in bioinformatics.', linkedin: 'https://www.linkedin.com/in/suluxan/' },
	{ name: 'Arzu Kirici', image: "/team-members/arzu-kirici.jpg", shortRole: 'Computational Creative', role: ' Computational Biologist', desc: 'Computational Biologist with a molecular biology background, focusing on spatial analysis and developing software. ', linkedin: 'https://www.linkedin.com/in/arzu-kirici/' },
	{ name: 'Kasra Rahimian', image: "/team-members/kasra-rahimian.jpg", shortRole: 'Software Developer', role: 'Software Developer', desc: "Software developer and designer with a multidisciplinary background in digital solutions, research support, and engineering. Currently focused on bringing Panoramics' web app to life while exploring creative side projects.", linkedin: 'https://www.linkedin.com/in/kasrarahimian/' },
	{ name: 'Smrithi Dhanasekar', image: "/team-members/Smrithi.jpeg", shortRole: 'Content Creator',role: ' Specializing in creating impactful content', desc: 'Focus on 3D perception and simulation for robotics.', linkedin: 'https://www.linkedin.com/in/smrithi-dhanasekar/' },
	{ name: 'Nikol Leshchyshyn', image: "/team-members/Nikol.jpeg", shortRole: 'Communications Specialist', role: ' Communications specialist', desc: "Involved in crafting clear, engaging narratives that communicate PANORAMICS' mission, foster scientific dialogue , and amplify the impact of spatial and singe-cell multi-omics research.", linkedin: 'https://www.linkedin.com/in/nikolleshchyshyn/' },
];

const TABS = ['speakers', 'organizers'] as const;
type Tab = (typeof TABS)[number];

export default function TeamSection() {
  const [activeTab, setActiveTab] = useState<Tab>('speakers');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const currentList = activeTab === 'speakers' ? speakers : organizers;

  return (
    <section className="team" id="team">
      <div className="container">
        <header className="section-title">
          <span className="tag muted-dark">Meet Our People</span>
          <h2 className="tx-dark">Speakers &amp; Organizers</h2>
          <p className="muted-dark">
            Leaders across academia, industry, and the spatial community.
          </p>

          <div className="people-tabs">
            {TABS.map((tab) => {
              const isActive = tab === activeTab;
              const label =
                tab === 'speakers'
                  ? `Speakers (${speakers.length})`
                  : `Organizers (${organizers.length})`;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`people-tab ${isActive ? 'is-active' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </header>

        <div className="people-grid">
          {currentList.map((person) => (
            <button
              key={person.name}
              type="button"
              className="person-tile"
              onClick={() => setSelectedPerson(person)}
            >
              {person.image && (
                <img
                  src={person.image}
                  alt={person.name}
                  className="person-tile-image"
                />
              )}

              <div className="person-tile-overlay-base" />

              <div className="person-tile-content">
                <span className="person-tile-name">{person.name}</span>
                {person.city ? 
                  <span className="person-tile-city">{person.city}</span>
                  : person.shortRole ?
				  <span className="person-tile-city">{person.shortRole}</span>
				  : null
				}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPerson && (
        <PersonModal
          person={selectedPerson}
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </section>
  );
}

function PersonModal({
  person,
  onClose,
}: {
  person: Person;
  onClose: () => void;
}) {
  return (
    <div className="person-modal-backdrop" onClick={onClose}>
      <div
        className="person-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={person.name}
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
          {person.image && (
            <img
              src={person.image}
              alt={person.name}
              className="person-modal-image"
            />
          )}
          <div>
            <h3 className="person-modal-name">{person.name}</h3>
            {person.city && (
              <p className="person-modal-city">[{person.city}]</p>
            )}
            {person.role && (
              <p className="person-modal-role">{person.role}</p>
            )}
          </div>
        </div>

        {person.desc && (
          <p className="person-modal-desc">
            {person.desc}
          </p>
        )}

        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="person-modal-link"
          >
            View on LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}