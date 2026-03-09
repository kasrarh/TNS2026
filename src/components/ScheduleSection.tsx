'use client';
import { useState } from 'react';

type ScheduleSession = {
	time: string;
	title: string | null;
	description?: string | null;
	speaker?: string | null;
	venue?: string | null;
	chapter?: string | null;
	sponsor?: string | null;
	subtitle?: string | null;
	abstract?: string | null;
};


export default function ScheduleSection({ fullPage = false }: { fullPage?: boolean }) {
	const [active, setActive] = useState(0);
	const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSession | null>(null);

	// Schedule data with time, description, speaker, and venue
	const scheduleData: Record<string, ScheduleSession[]> = {
		day1: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "A Panoramic Perspective, A Vision in Time & Space",
				chapter:'"Inspire-me" Talk',
				description: "A warm welcome from the CEO and founder of Panoramics - A Vision Inc. Hear about Dr. Ayyadhury’s vision for the Canadian single cell and spatial biology landscape, and how she intends to help shape it.",
				speaker: "Shamini Ayyadhury (CEO, Founder of Panoramics - A Vision, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "From Visible Embryos to Spatial Omics",
				subtitle: "From Visible Embryos to Spatial Omics",
				chapter:'"Inspire-me" Keynote Talk',
				abstract: "Spatial biology did not begin as a platform. It began as a goal that was simply “too early.” In the early 1990s, the Visible Embryo Project (VEP) set out to digitize and reconstruct human embryonic development into a navigable, distributed 3D atlas built on the high‑performance computing and communications concepts of its era. In 1993, VEP collaborators articulated an even more ambitious extension: “Spatial Genomics,” a framework to correlate emerging Human Genome Project discoveries with precise location in tissue, turning gene activity into a quantitative layer inside a shared anatomical coordinate space. This keynote traces how those original VEP goals were impossible with the technologies available at the time, and how that gap between vision and capability forced a full-stack invention across imaging, computation, data models, and molecular measurement. At the center is the SAGA system (Spatial Analysis of Genomic Activity), designed in the late 1990s (patent applied for in 2000), which introduced the architectural pattern that defines modern spatial omics: build a 3D morphology, rasterize tissue, preserve coordinate identity via barcoding, perform broad-spectrum assays, then computationally remap signals back into anatomy for visualization and spatial analysis. The talk then explains why spatial omics took years to become dominant: early workflows were technically feasible but too costly and difficult to scale, and broad adoption required enabling innovations (including in situ and array-based approaches) before commercialization and standardization accelerated the field. The talk concludes with the state of the art and the most exciting near-future advances, 3D/4D biology, spatial multiomics, and AI-driven spatial models, followed by Dr. Doyle’s plan to establish a National Center for Spatial Science within the newly formed Institute for Medical Innovation at the University of Dubuque.",
				description: "Hear about the evolution of the field from its very beginnings to its current state from Dr. Michael Doyle, the father of spatial biology.",
				speaker: " Dr. Michael Doyle (Professor, New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 11:00",
				title: "Understanding endogenous mammalian stem cells using spatial transcriptomics",
				subtitle: "Understanding endogenous mammalian stem cells using spatial transcriptomics",
				chapter: '“Inspire-me”  Scientific Talk',
				abstract: "This talk will focus on work using single cell spatial transcriptomics to understand how endogenous stem cell populations contribute to the repair and regeneration of complex adult mammalian tissues. ",
				description: "This talk will focus on work using single cell spatial transcriptomics to understand how endogenous stem cell populations contribute to the repair and regeneration of complex adult mammalian tissues. ",
				speaker: "Dr. Freda Miller (Professor, University of British Columbia, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:00 — 11:15",
				title: "Break",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "11:15 — 11:45",
				title: "Unconventional species to understand regenerative healing",
				subtitle: "Unconventional species to understand regenerative healing",
				chapter: '“Inspire-me”  Scientific Talk',
				abstract: "Adult mammals typically heal deep skin wounds heal by forming fibrotic scar in order to most efficiently close the wound and ultimately prevent infection. But it is unclear as to the mechanisms that drive this propensity and whether there are ways to re-awaken a pro-regenerative process in order to better restore normal function to the skin. Here, I will describe our unconventional approach using captive adult reindeer that provides a powerful comparative model of scarless versus fibrotic skin wound healing. Full-thickness injuries in reindeer antler skin (velvet) exhibit near-complete regeneration, whereas back skin forms fibrotic scar. By employing  single-cell multi-omics we describe site-specific fibroblast transcriptional ground states that orchestrate distinct immune responses to injury, ultimately leading to regenerative or scar-forming healing outcomes. ",
				description: null,
				speaker: "Dr. Jeff Biernaskie (Professor, University of Calgary, Canada) ",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:45 — 12:05",
				title: "Hepatocellular Carcinoma: Elucidating its Complexity through Deep Spatial Biology",
				subtitle: "Hepatocellular Carcinoma: Elucidating its Complexity through Deep Spatial Biology - Supported talk by Miltenyi Biotec (Connectome Sponsor)",
				abstract: "Hepatocellular Carcinoma (HCC) remains a premier challenge in precision oncology, standing as a leading cause of global cancer mortality. Its complexity is rooted in a diverse etiology, ranging from viral infections to alcoholic and metabolic disorders, which typically unfolds within the architecturally distorted landscape of a chronically inflamed liver. In these inflammatory backgrounds, the tumor microenvironment (TME) creates 'immune-excluded' or 'immune-cold' niches that not only resist treatment but can paradoxically exacerbate tumorigenesis, highlighting the peculiar nature of HCC.\n The fundamental limitation in overcoming this resistance lies in a 'space-blind' understanding of the tumor. Traditional bulk and single-cell sequencing fail to capture the critical spatial relationships among tumor and TME cells and the metabolic niches within the tumor that regulate such relationships. Despite the recognition of clear histological subtypes of HCC, we lack the resolution to understand how the TME instructs cancer progression. Without this spatial context, the drivers of cancer stem cell selection and therapeutic resistance remain impossible to pinpoint.\n To bridge this gap, we apply spatial proteogenomics to map the complex landscapes of HCC subtypes at an unprecedented depth. Utilizing Xenium® spatial transcriptomics and MACSima™ Imaging and Cyclic Staining (MICS), we integrate gene regulatory networks with ultra-high-plex spatial proteomics insights on a single tissue section. This allows us to characterize cellular subset activation states according to their cellular neighborhoods in distinct geographical niches of the tumor. By shifting to a high-resolution topographical understanding of the tumor-immune-stromal axes, we aim to uncover biomarkers necessary for patient stratification and therapeutic targets for next generation immunotherapies for HCC.",
				description: null,
				chapter:'"Challenge-me" Talk',
				sponsor: "Supported talk by Miltenyi Biotec (Connectome Sponsor)",
				speaker: "Dr. Victor Mullins-Dansereau (Institut national de la recherche scientifique (INRS) Laval, Quebec, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:05 — 12:15",
				title: "Organelle Sponsored Talk (PMGC)",
				sponsor: "Supported talk by PMGC (Organelle Sponsored)",
				subtitle: null,
				abstract: null,
				description: null,
				speaker: "TBC",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 12:25",
				title: "Empowering Genomic Discovery: Navigating the Technical Landscape of Single-Cell and Spatial Solutions",
				subtitle: "Empowering Genomic Discovery: Navigating the Technical Landscape of Single-Cell and Spatial Solutions - Supported talk by Novogene",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Novogene",
				abstract: "The rapid evolution of spatial transcriptomics requires more than just access to technology; it requires the 'cognitive weaponry' to select the right methodology for complex biological questions. In an era where data resolution can define the success of a project, the ability to navigate various platforms is a vital skill for the modern scientist. This 'Enlighten-me' session is designed to share the technical instincts and foundational knowledge necessary to architect high-resolution experiments across the ever-expanding single-cell and spatial ecosystem.\n We will provide a pedagogical overview of Novogene’s workflow expertise, beginning with a comparison of single-cell profiling via 10x Genomics Chromium and the streamlined Illumina Single Cell 3’ RNA Prep (Fluent PIPseq). Moving into the spatial domain, we will break down the strategic decision-making process between 10x Visium workflows—differentiating between probe-based methods for FFPE samples and 3’ Gene Expression for fresh frozen tissues—and the high-definition capabilities of Stereo-seq.\n By sharing these technical guiding principles and end-to-end service insights, Novogene aims to empower the community with the skills to transform complex genomic theory into executable research strategies. Our goal is to provide the community with the knowledge to choose the right tool for the right sample, ensuring that every scientist is equipped to push the boundaries of biological discovery and reimagine what is possible in genomic research.",
				description: null,
				speaker: "Sarah Goodwin (Senior Account Manager, Novogene, USA)",
				venue: "MaRS Auditorium"
			},

			{
				time: "12:25 — 13:25",
				title: "Lunch & Networking",
				description: "Enjoy a catered lunch.",
				speaker: null,
				venue: "MaRS Auditorium / MaRS Concourse"
			},
			{
				time: "13:25 — 13:55",
				title: "Parsing human pancreatic cancer genotype to phenotype using spatial proteomics",
				subtitle: "Parsing human pancreatic cancer genotype to phenotype using spatial proteomics",
				chapter: '“Inspire-me”  Scientific Talk',
				abstract: "Distinctively, pancreatic ductal adenocarcinoma (PDAC) consists of sparse tumour lesions intertwined with extensive desmoplastic stroma which poses a challenge for accurate tumour profiling and patient stratification, and contributes to all tumours becoming profoundly resistant to therapy. Here we mapped the spatial relationships between tumour, stroma, and immune cell compartments delineating tumour and microenvironment types that expand the classical to basal spectrum of human PDAC. Combining multiplexed imaging with deep spatial proteomics and genomics, We show that the connections between tumour phenotype, vascularization, immune response, and stromal biophysical state are reinforced by genomic aberrations, altered by treatment, and associated with patient outcome. Machine-learning models using spatial single cell data outperformed genomic or clinical features but integrated multi-omics models provide the best prediction of patient survival. Together, these findings define a phenotypic and molecular framework of PDAC that captures tumour–microenvironment co-dependencies and offers a refined basis for patient stratification and therapeutic targeting.",
				description: null,
				speaker: "Dr. Hartland Jackson (Assistant Professor, Lunenfeld-Tanenbaum Research Institute, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "13:55 — 14:25",
				title: "“Inspire-me” Scientific Talk",
				chapter: '“Inspire-me”  Scientific Talk',
				description: "Dr. Robert Beattie is a developmental neurobiologist specializing in single-cell genetic lineage tracing using Mosaic Analysis with Double Markers (MADM). His work dissects how individual neural stem cells generate diversity in the developing brain. By resolving clonal relationships in vivo, his research provides insight into neurodevelopmental and neuropsychiatric disorders.",
				speaker: "Dr. Robert Beattie (University of Manitoba, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "14:25 — 14:35",
				title: "Exploring the Intersection of Immuno-Oncology and Neuroscience with Spatial Multiomics Insights",
				subtitle: "Exploring the Intersection of Immuno-Oncology and Neuroscience with Spatial Multiomics Insights - Supported talk by Bio-techne",
				chapter:'"Challenge-me" Talk',
				sponsor: "Supported talk by Bio-techne",
				abstract: "Advances in spatial biology have enabled unprecedented insights into cellular architecture, signaling networks, and microenvironmental interactions at the single-cell level in healthy and disease tissues. As the field moves toward increasingly complex biological questions, scalable and high-performance technologies are essential for resolving molecular heterogeneity at single-cell and subcellular resolution. Bio-Techne’s leading spatial biology brands, Advanced Cell Diagnostics and Lunaphore, are transforming the future of research and precision medicine. Here, we present an integrated, same-section spatial multiomics workflow that combines the RNAscope™ HiPlexPro RNA in situ hybridization assay with Lunaphore’s sequential immunofluorescence (seqIF™) technology on the COMET™ platform. This fully automated approach enables the codetection of up to 12plex RNA and 24plex protein targets, allowing for highly multiplexed, quantitative exploration of cellular states and interactions. Applied across formalin-fixed paraffin-embedded human solid tumors and frozen mouse brain tissues, the workflow demonstrates robustness, sensitivity, and versatility in both immuno-oncology and neuroscience contexts.\n In immuno-oncology samples, RNAscope™ probes for cytokines and immune-relevant transcripts were paired with high-plex protein markers to map the spatial distribution of T-cell and macrophage populations within tumor microenvironments. This integrated analysis revealed patterns of immune activation, infiltration, and cellular crosstalk critical for understanding tumor progression and therapeutic response. In neuroscience applications, RNA probes targeting neurotransmitters, receptors, and glial markers were combined with protein signatures to characterize the molecular organization of neuronal and non-neuronal cell populations in the mouse brain. The same section multiomic readout provided a deeper understanding of neuronal signaling, glial neuronal interactions, and region specific cellular heterogeneity. Overall, this automated spatial multiomics platform—uniting BioTechne’s gold standard RNAscope™ technology with Lunaphore’s highplex COMET™ system—delivers a powerful, scalable solution for decoding complex tissues. By enabling integrated RNA protein profiling with high sensitivity and spatial precision, it opens new avenues for biomarker discovery, mechanistic studies, and translational research in both immuno-oncology and neuroscience. ",
				description: null,
				speaker: "Dr. Connor West, Ph.D. Field Application Specialist, Lunaphore, a Bio-techne brand",
				venue: "MaRS Auditoriumx"
			},
			{
				time: "14:35 — 14:45",
				title: "Beyond Proteins and Transcripts: Drug-Inclusive Hyper-Multiomics in Spatial Biology",
				subtitle: "Beyond Proteins and Transcripts: Drug-Inclusive Hyper-Multiomics in Spatial Biology - Supported talk by AmberGen",
				chapter:'"Challenge-me" Talk',
				sponsor: "Supported talk by AmberGen",
				abstract: "Spatial biology technologies have rapidly expanded the ability to measure molecular states within intact tissue, enabling new insight into cellular organization and tissue microenvironments. Recent advances in spatial multiomics—particularly the integration of spatial proteomics with spatial transcriptomics—represent an important milestone in the field, allowing researchers to interrogate multiple molecular layers simultaneously within intact tissue context. These advances demonstrate the power of interrogating multiple molecular layers within intact tissue and highlight the opportunity to expand spatial analysis well beyond proteins and transcripts to capture a substantially broader biochemical view of tissue biology. We describe a now-established drug-inclusive hyper-multiomic spatial analysis framework that our lab routinely applies to spatial analysis workflows. This approach extends spatial multiomics beyond proteins and transcripts by enabling measurement of the tissue distribution of multiple therapeutic modalities, including small molecule drugs, antibody-based therapeutics, and oligonucleotide drugs. In parallel, the same tissue section can be interrogated for five complementary molecular layers: proteins, RNA, lipids, metabolites, and glycans. Acquiring these measurements sequentially from a single tissue section and instrument preserves spatial fidelity across data laters and avoids the alignment challenges that arise when measurements are collected from adjacent sections using different analytical platforms.\n Integrating therapeutic localization with these diverse molecular measurements expands spatial biology beyond conventional transcriptomic and proteomic readouts to capture a broader biochemical view of tissue biology. To interpret these high-dimensional datasets, we employ an AI-powered correlative multiomic analysis pipeline that integrates spatial measurements across drug distribution and multiple molecular layers, enabling identification of spatial relationships between drug exposure and disease-associated biological processes such as inflammation, metabolic remodeling, and cellular stress responses.\nIn this presentation we introduce this hyper-multiomic spatial analysis approach and illustrate its capabilities using an example, a spatial study of an Alzheimer’s disease mouse brain model, integrating therapeutic distribution with molecular signatures of pathology and neuroinflammation.",
				description: null,
				speaker: "John Gillespie, CEO, AmberGen",
				venue: "MaRS Auditoriumx"
			},
			{
				time: "14:45 — 15:00",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "15:00 — 15:10",
				title: "The Next Dimension of Discovery: Advancing Spatial Biology in 3D",
				subtitle: "The Next Dimension of Discovery: Advancing Spatial Biology in 3D - Supported talk by Stellaromics",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Stellaromics",
				abstract: "Spatial transcriptomics has emerged as a powerful approach for understanding the organization of complex tissues, providing critical insights into tissue microenvironments, cellular heterogeneity, and cell–cell interactions. However, existing commercial platforms are largely limited to two-dimensional data acquired from thin tissue sections (5–20 µm), often fragmenting cells across planes and providing an inherently incomplete picture of the complex tissue microenvironment.\n Stellaromics’ Pyxa is the world’s first thick tissue high-plex 3D spatial multi-omics platform and allows scientists to investigate biology in its native, three-dimensional context. Pyxa integrates sample preparation, sequencing, data analysis, and visualization into a unified, highly automated workflow. Pyxa overcomes the constraints of traditional 2D spatial biology platforms by enabling high-resolution, subcellular spatial transcriptomics in thick tissue samples up to 100 µm.\n The Pyxa workflow begins with an optimized sample preparation protocol conducted in a well-plate format, followed by 3D sequencing with error-reduction by dynamic annealing and ligation (SEDAL) on a custom-designed volumetric confocal imaging and fluidics system. To support data analysis at scale, a robust computational pipeline converts terabytes of raw image data into standard cell-by-gene matrices, also containing 3D cell metadata to enable biological interpretation through custom 3D visualization software and open-source analysis tools.\n Pyxa represents a major step forward in the evolution of spatial omics tools, particularly for applications in neuroscience, oncology, and drug discovery, where three-dimensional cellular context is critical to biological function. Here, we showcase the development and performance of Pyxa for spatial transcriptomic profiling in 100 µm fresh-frozen mouse brain, as well as the methodology to adapt this system to new species and tissue types.",
				description: null,
				speaker: null,
				venue: "MaRS Auditoriumx"
			},
			{
				time: "15:10 — 15:20",
				title: "Groundbreaking insights with high-plex, high-resolution spatial biology",
				subtitle: "Groundbreaking insights with high-plex, high-resolution spatial biology",
				chapter:'"Inspire-me" Talk',
				sponsor: "Supported talk by 10x Genomics",
				abstract: "Spatially resolved gene expression, or spatial transcriptomics, is a quantitative readout of either whole transcriptome or targeted gene expression mapped to specific locations in a tissue section, and a proven powerful method to understand cellular composition and activity in the native tissue context.  Spatial transcriptomics can also be achieved through imaging-based approaches—often referred to as microscopy-based spatial methods—where hundreds to thousands of mRNAs are imaged in situ. Our Xenium In Situ platform leverages this approach. A spatial gene expression readout can be combined with a histological stain or immunofluorescence protein detection in the same tissue section to elevate insights into tissue complexity.  Spatial transcriptomics can also be achieved through next-generation sequencing-based approaches, where mRNA is mapped in tissues at the whole transcriptome level and then sequenced ex vivo. Our Visium Spatial platform leverages this approach. ",
				description: null,
				speaker: "Rami Mechael, Sr. Account Executive - Central Canada, 10x Genomics",
				venue: "MaRS Auditoriumx"
			},
			{
				time: "15:20 — 15:50",
				title: "“Inspire-me” Scientific Talk",
				description: null,
				speaker: "Dr. Paul Robson (Professor at the Jackson Laboratory for Genomic Medicine Connecticut, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "15:50 — 17:15",
				title: "“Inspire-me” Scientific Talk + scientific debate co-moderator",
				chapter:'"Inspire-me" Scientific Talk',
				description: "Dr. Jasmine Plummer directs the Center for Spatial OMICs at St. Jude and is an Associate Member of the St. Jude Faculty. Her research applies genomic and spatial technologies to understand disease mechanisms, with an emphasis on diverse populations. She is also a co-founder of GESTALT, the Global Alliance for Spatial Technologies.",
				speaker: "Dr. Jasmine Plummer (Director, Center for Spatial OMICs, St. Jude Children’s Research Hospital Tennessee, United States)",
				venue: "MaRS Auditorium"
			},
		],
		day2: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "Panoramic Insight",
				chapter:'"Enlighten-me" Scientific Talk',
				description: "Join the Creative Director at Panoramics - A Vision Inc., Dr. Ashleigh Willis, as she walks through the importance of trainees and emerging leaders in the Canadian spatial biology space and highlights how Panoramics - A Vision Inc. is trying to support them.",
				speaker: "Dr. Ashleigh Willis (	Creative Director, Panoramics - A Vision Inc., Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:00",
				title: "Enlighten-me Scientific Talk ",
				description: null,
				speaker: " Dr. Sabrina Leslie (British Columbia, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:00 — 10:50",
				title: "From Instrument to Insight: DISCO as the Foundation of CellOut Technologies and Translational Stroke Discovery",
				subtitle: "From Instrument to Insight: DISCO as the Foundation of CellOut Technologies and Translational Stroke Discovery",
				abstract: "CellOut Technologies was born from a fundamental question: how can we make single-cell biology more precise, more insightful, and more accessible? In this talk, I will share the journey behind the development of the DISCO system (Digital Microfluidic Isolation of Single Cells for –Omics) and how it evolved from an academic concept into a commercial platform. DISCO is a single-cell isolation microscope integrated with digital microfluidic capabilities, designed to enable precise cell capture while preserving downstream molecular integrity. The platform has already demonstrated impactful applications, including work in the cortical stroke space in collaboration with Dr. Faiz. In this study, spatial transcriptomics in combination with DISCO-based isolation was used to examine the astrocyte response to stroke. This application led to the identification of spatially and temporally restricted subpopulation of FABP5⁺ astrocytes, which are important for stroke recovery. ",
				description: null,
				chapter:'"Enlighten-me" SPOTLIGHT 1',
				speaker: "Dr. Erica Scott (British Columbia, Canada) \n Dr. Maryam Faiz (Alberta, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:50 — 11:00",
				title: "Stereo-seq–enabled Spatial Transcriptomic Mapping of the Human Basal Ganglia",
				subtitle: "Stereo-seq–enabled Spatial Transcriptomic Mapping of the Human Basal Ganglia - Supported talk by Complete Genomics & DMark Biocsiences",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Complete Genomics & DMark Biocsiences",
				abstract: "Basal ganglia, a critical brain structure involved in motor control, learning, and emotion, is much less understood in humans. Comprehensive molecular mapping of the human basal ganglia requires spatial transcriptomic technologies that combine high spatial resolution with large tissue coverage while preserving whole transcriptomic diversity. In this study, Stereo-seq generated dense, spatially indexed whole-transcriptome profiles across the caudate nucleus, putamen, nucleus accumbens, and globus pallidus, encompassing millions of capture cells within intact tissue sections. Neuronal and non-neuronal cell classes, including transcriptionally distinct medium spiny neuron subtypes, interneurons, astrocytes, oligodendrocytes, and vascular-associated populations are identified and spatially resolved. Spatial clustering and gene expression mapping revealed region-specific and domain-specific cellular organization that closely aligns with known anatomical subdivisions of the basal ganglia. Beyond discrete cell-type mapping, Stereo-seq resolved continuous spatial gene expression gradients and localized cellular neighborhoods, highlighting structured molecular heterogeneity within and across nuclei that is not accessible through dissociated single-cell approaches. These data demonstrate the ability of Stereo-seq to support multiscale analysis of complex tissue, from cellular resolution to atlas-level organization, and establish a spatial reference framework for future studies of basal ganglia circuitry and disease-associated spatial dysregulation.",
				description: null,
				speaker: "Dr. Yongfu Wang (Senior manager of field and sales support at Complete Genomics)",
				venue: "MaRS Auditorium"
			},
			{
				time: "11:00 — 11:15",
				title: "Break + Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "11:15 — 12:15",
				title: "Innovation in Spatial and Single Cell Biology",
				description: "This session will feature speakers who are driving innovation and pushing the boundaries of what’s possible in single cell and spatial biology. Stay tuned for the announcement of these exciting scientists.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 12:35",
				title: "Postdoctoral Fellow and Early Career Scientist selected talks",
				description: "Speakers for this session will be chosen from the top abstracts submitted and represent some of the most innovative and impactful work coming from our early career scientist community. These researchers are driving the future of science and discovery. Watch this space for the announcement of these outstanding speakers.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "12:35 — 12:45",
				title: "Analyzing large scale clinical Imaging Mass Cytometry (IMC) cohorts with Rakaia",
				subtitle: "Analyzing large scale clinical Imaging Mass Cytometry (IMC) cohorts with Rakaia - Supported talk by Standard Biotools (Organelle Sponsored)",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Standard Biotools (Organelle Sponsored)",
				abstract: "Spatial biology data throughput currently outpaces interpretable analysis, limiting large-scale discovery and translation. Here I will present Rakaia, a browser-based platform that scales interactive spatial biology querying, annotation, visualization, and analysis to thousands of images. I show how Rakaia can be used to map cellular predictions from pathologist annotations across > 200 human breast samples profiled using Imaging Mass Cytometry (IMC), demonstrating efficient stratification of a multi-patient cohort based on a hyperplastic-like phenotype.",
				description: null,
				speaker: "Dr. Kieran Campbell, Lunenfeld-Tanenbaum Research Institute",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:45 — 12:55",
				title: "Sponsored Talk (Bruker Spatial Biology)",
				subtitle: null,
				abstract: null,
				sponsor: "Sponsored Talk by Bruker Spatial Biology",
				description: null,
				speaker: "TBC",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:55 — 13:45",
				title: "Lunch + Networking",
				description: "We invite students to join us at our roundtable networking. Pick the brains of leaders from academia and industry while enjoying lunch.",
				speaker: null,
				venue: "TBD"
			},
			{
				time: "13:45 — 14:45",
				title: "Innovation Spotlight 2",
				description: "This session will feature speakers who are driving innovation and pushing the boundaries of what’s possible in single cell and spatial biology. Stay tuned for the announcement of these exciting scientists.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "14:45 — 15:15",
				title: "Innovation Spotlight 3",
				description: "Celebrate the work of our incredible students as they present their single cell and spatial research.",
				speaker: null,
				venue: "MaRS Auditorium"
			},
			{
				time: "15:15 — 15:45",
				title: "Break + Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "15:45 — 17:00",
				title: "Professional skills development:  TBC",
				description: null,
				speaker: null,
				venue: null
			},
		],
		day3: [
			{
				time: "08:00 — 09:00",
				title: "Breakfast & Registration",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium concourse"
			},
			{
				time: "09:00 — 09:30",
				title: "Challenge Me - Opinion",
				description: "We invite you to hear Dr. Morag Park as she delivers an important introductory speech as we brace to step into the future. Dr. Morag is a well respected scientist, who has truly shown us what it means to think above and beyond and sets the stage for our day 3 agenda.",
				speaker: "Dr. Morag Park (McGill University, Canada)",
				venue: "MaRS Auditorium"
			},
			{
				time: "09:30 — 10:30",
				title: "Crossing Boundaries",
				description: "TBD",
				speaker: "TBD",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:30 — 10:50",
				title: "Connectome Sponsored Talk (Illumina)",
				description: null,
				sponsor: "Supported talk by Illumina (Connectome Sponsored)",
				speaker: "TBC",
				venue: "MaRS Auditorium"
			},
			{
				time: "10:50 — 11:15",
				title: "Break & Networking",
				description: "Connect and interact with fellow attendees.",
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "11:15 — 12:15",
				title: "Spatial Frontiers: The road ahead for spatial biology",
				description: "Engage in a moderated panel discussion which will focus on the future of single cell and spatial biology. ",
				speaker: "Dr. Shamini Ayyadhury (CEO, Panoramics - A Vision Inc.), Dr. Gary Bader (University of Toronto, Canada), Dr. Michael Doyle (New Mexico Tech, USA)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:15 — 12:25",
				title: "AVITI24 and Teton chemistry, a transformative approach for simultaneously analyzing RNA, protein, and morphology at single-cell resolution",
				subtitle: "AVITI24 and Teton chemistry, a transformative approach for simultaneously analyzing RNA, protein, and morphology at single-cell resolution - Supported talk by Element Biosciences",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Element Biosciences",
				abstract: "Discover 5D multiomics enabled by AVITI24 and Teton chemistry—a transformative approach for simultaneously analyzing RNA, protein, and morphology at single-cell resolution. With minimal hands-on time and streamlined workflows, AVITI24 delivers rich, multidimensional data from millions of cells in a single run. Through Direct In Sample Sequencing (DISS), RNA can be sequenced directly from within cells, enabling powerful applications such as CRISPR guide RNA detection and paving the way for future capabilities like whole transcriptome analysis and tissue compatability",
				description: null,
				speaker: "Spence Fast (Senior Technical Applications Specialist, Element Biosciences)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:25 — 12:35",
				title: "Single-cell identity and heterogeneity in its environment: Where innovations push the understanding of Spatial Biology",
				subtitle: "Single-cell identity and heterogeneity in its environment: Where innovations push the understanding of Spatial Biology - Supported talk by Leica Microsystems",
				chapter:'"Enlighten-me" Talk',
				sponsor: "Supported talk by Leica Microsystems",
				abstract: "At Leica Microsystem, teams are passionate about driving innovation in visualization and analysis. We partner with our customers, enabling them to make informed decisions and optimize their workflows.\n In the specific contexts of cancer biology, immunology and neurology, changes to parameters of interest between different samples — for example, healthy vs. diseased, treated vs. untreated – are often complex. Mapping multiple biomarkers at the single cell level in the same tissue section or organoid provides critical insights into the sample microenvironment. We offer an easy and open tissue multiplexing platform with Cell DIVE. With the ability to label up to 60 biomarkers using validated commercial antibodies and a streamlined protocol, this approach enables processing of multiple samples and offers potential for automation. Leveraging Cell DIVE’s capability to scan large tissue regions is especially valuable for understanding tissue heterogeneity. However, biology happens also in a three-dimensional context. Therefore, 3D high-plex imaging has the potential to add the discovery of new cell types, the identification of cell states and the mapping of functional relationships in a 3D spatial context. SpectraPlex for STELLARIS provides an integrated and streamlined workflow that simplifies panel creation and uses advanced, on-the-fly unmixing algorithms to capture high quality 3D data with 15+ markers in one go.\n With both platforms, researchers can then benefit from tailored segmentation and downstream analysis for accurate interpretation of high-resolution, high-plex data, using Aivia, Leica Microsystem’s cutting-edge AI image analysis software.",
				description: null,
				speaker: "Dr. Rick Heil-Chapdelaine (Spatial Biology Specialist, Leica Microsystems)",
				venue: "MaRS Auditorium"
			},
			{
				time: "12:35 — 13:00",
				title: "Break & Networking",
				description: null,
				speaker: null,
				venue: "MaRS Atrium / MaRS Concourse"
			},
			{
				time: "13:00 — 14:15",
				title: "AI for Single-cell Biology",
				subtitle: "AI for Single-cell Biology",
				abstract: "Current biotechnologies can simultaneously measure multiple modalities (e.g., gene expression and electrophysiology) from the same cells. AI holds great promise for fully understanding such data, inferring how genes regulate cellular diversity, function, and disorder. This talk will cover my work and vision of how predictive, explainable, and autonomous AI models can enable data-driven single-cell biological insights, including navigating hypotheses for gene-to-function mapping and in silico perturbations of cell behavior that closely mirror the wet lab experiment. Finally, I will expand the definition of multi-modality and present a roadmap for building cellular digital twins.",
				description: "Hear from the pioneering scientists working at the frontier of artificial intelligence and its uses in the single cell and its spatial field.",
				speaker: "Dr. Xin Tang (Assistant Professor, University of British Columbia)",
				venue: "MaRS Auditorium"
			},
			{
				time: "14:15 — 15:15",
				title: "The Economics of Single Cell and Spatial Biology",
				description: "In this fireside discussion, a diverse range of stakeholders will discuss the current economic state of single cell and spatial biology research in Canada. This discussion will search for ideas on how we might improve feasibility and access for more researchers across the country.",
				speaker: null,
				venue: "MaRS Atrium"
			},
			{
				time: "15:15 — 15:30",
				title: "Closing speech",
				description: null,
				speaker: null,
				venue: "MaRS Auditorium"
			},
		]
	};

	const dayImages = {
		0: '/Inspire-me-banner.png', // Day 1 image
		1: '/Enlighten-me-banner.png', // Day 2 image
		2: '/Challenge-me-banner.png', // Day 3 image
	};


	return (
		<section className="schedule" id="schedule" style={fullPage ? { borderTop: 'none' } : {}}>
			<div className="schedule-bg" aria-hidden="true"></div>
			<div className="container">
				<div className="schedule-grid">
					<div className="row">
						<div className={`col-xs-12 ${fullPage ? '' : 'col-md-6'}`} style={fullPage ? { textAlign: 'center', marginBottom: '40px' } : {}}>

							<div className="schedule-header" style={fullPage ? { position: 'static' } : {}}>
								<div className="section-title">
									<span className="tag">Agenda Highlights</span>
									<h2>Three days of dynamic sessions across our three chapters.</h2>
									<p>What to expect at True North Spatial</p>
								</div>
								<div className="tab-list" role="tablist" style={fullPage ? { justifyContent: 'center' } : {}}>
									<button
										role="tab"
										aria-selected={active === 0}
										className="tab"
										onClick={() => setActive(0)}
									>
										25th March
									</button>
									<button
										role="tab"
										aria-selected={active === 1}
										className="tab"
										onClick={() => setActive(1)}
									>
										26th March
									</button>
									<button
										role="tab"
										aria-selected={active === 2}
										className="tab"
										onClick={() => setActive(2)}
									>
										27th March
									</button>
								</div>
								{fullPage && (
									<div className="schedule-banner" aria-hidden="true" style={{ marginTop: '24px', maxWidth: '500px', height: '250px', marginLeft: 'auto', marginRight: 'auto' }}>
										<img src={dayImages[active as keyof typeof dayImages]} alt={`Schedule for day ${active + 1}`} />
									</div>
								)}
								{!fullPage && (
									<div className="schedule-banner" aria-hidden="true">
										<img src={dayImages[active as keyof typeof dayImages]} alt={`Schedule for day ${active + 1}`} />
									</div>
								)}
							</div>
						</div>
						<div className={`col-xs-12 ${fullPage ? '' : 'col-md-6'}`} style={fullPage ? { marginTop: '32px' } : {}}>
							<div className="tab-panels">
								<div className={`tab-panel ${active === 0 ? 'is-active' : ''}`}>
									<h1 className='section-title'>Day 1 - March 25th - Inspire Me: A bold introduction</h1>
									{scheduleData.day1.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												{session.title && (
													<strong className='tx-light'>{session.chapter}</strong>
												)}
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.sponsor && (
			
													<h6 className='tx-gold'>{session.sponsor}</h6>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button
														className="btn btn-secondary"
														onClick={() => setSelectedSchedule(session)}
													>
														Abstract
													</button>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 1 ? 'is-active' : ''}`}>
									<h1 className='section-title'>Day 2 - March 26th  - Enlighten Me: Innovation and leadership in single cell and spatial biology</h1>
									{scheduleData.day2.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												{session.title && (
													<strong className='tx-light'>{session.chapter}</strong>
												)}
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.sponsor && (
			
													<h6 className='tx-gold'>{session.sponsor}</h6>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button
														className="btn btn-secondary"
														onClick={() => setSelectedSchedule(session)}
													>
														Abstract
													</button>
												)}
											</div>
										</div>
									))}
								</div>

								<div className={`tab-panel ${active === 2 ? 'is-active' : ''}`}>
									<h1 className='section-title'>Day 3 - March 27th - Challenge Me: A Panorama of the future</h1>

									{scheduleData.day3.map((session, index) => (
										<div key={index} className="session-card row">
											<div className="session-aside col-xs-4 col-md-3">
												<div className="session-time">{session.time}</div>
												{session.venue && (
													<div className="session-venue">{session.venue}</div>
												)}
											</div>
											<div className="session-content col-xs-8 col-md-9">
												{session.title && (
													<strong className='tx-light'>{session.chapter}</strong>
												)}
												{session.title && (
													<h3>{session.title}</h3>
												)}
												{session.sponsor && (
			
													<h6 className='tx-gold'>{session.sponsor}</h6>
												)}
												{session.speaker && (
													<div className="session-speaker">
														<strong>Speaker:</strong> {session.speaker}
													</div>
												)}
												{session.description && (
													<p className="session-description">{session.description}</p>
												)}
												{(session.subtitle || session.abstract) && (
													<button
														className="btn btn-secondary"
														onClick={() => setSelectedSchedule(session)}
													>
														Abstract
													</button>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			{selectedSchedule && (
				<ScheduleModal
					session={selectedSchedule}
					onClose={() => setSelectedSchedule(null)}
				/>
			)}
		</section>
	);

	function ScheduleModal({
		session,
		onClose,
	}: {
		session: ScheduleSession;
		onClose: () => void;
	}) {
		return (
			<div className="person-modal-backdrop" onClick={onClose}>
				<div
					className="person-modal"
					onClick={(e) => e.stopPropagation()}
					role="dialog"
					aria-modal="true"
					aria-label={session.title || 'Session Details'}
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
							{session.time && (
								<p className="person-modal-time" style={{ marginBottom: '8px', fontWeight: 'bold' }}>{session.time}</p>
							)}

							{session.subtitle && (
								<h3 className="person-modal-subtitle">{session.subtitle}</h3>
							)}
							{session.speaker && (
								<p className="person-modal-speaker"><strong>Speaker:</strong> {session.speaker}</p>
							)}
						</div>
					</div>

					{session.abstract && (
						<div style={{ marginTop: '16px' }}>
							<h4 style={{ marginBottom: '8px' }}>Abstract</h4>
							<p className="person-modal-desc">
								{session.abstract}
							</p>
						</div>
					)}

					{session.description && !session.abstract && (
						<p className="person-modal-desc">
							{session.description}
						</p>
					)}

				</div>
			</div>
		);
	}
}


