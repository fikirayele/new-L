export interface DetailSection {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  statNumber?: string;
  statLabel?: string;
  sidebarText?: string;
  mainParagraphs: string[];
  cards?: { title: string; text: string }[];
  listTitle?: string;
  listItems?: string[];
  galleryType?: 'photos' | 'curriculum' | 'team' | 'none';
}

export const sectionsData: Record<string, Record<string, DetailSection>> = {
  EN: {
    'about-organization': {
      id: 'about-organization',
      path: 'About / Organization',
      title: 'Our Organization & Founding',
      subtitle: 'Building a foundation where every woman has the tools to write her own future.',
      statNumber: '10 Yrs+',
      statLabel: 'Community Presence',
      sidebarText: 'Likro & Lihtov was established to remove gender barriers in adult education. We operate in urban neighborhoods and rural communities.',
      mainParagraphs: [
        'Likro & Lihtov began as a grass-roots initiative in response to a glaring societal challenge: the systemic neglect of adult female education in underserved communities. Founded by a coalition of educators, social advocates, and local volunteers, our organization has grown into a structured, certified school that focuses on intensive, high-impact literacy programs.',
        'Our primary operational framework is designed around adult learning science. Traditional schools fail adult illiterates because the curriculum is designed for children. At Likro & Lihtov, we address adult-specific psychological needs—such as confidence building, practical financial integration, and flexible scheduling—ensuring high retention rates.',
        'We run on a transparent governance model. Over 85% of all donations and grants go directly to classroom resources, teacher training, and transit systems that ensure women can safely reach our learning spaces.'
      ],
      cards: [
        { title: 'Our Core Mission', text: 'To eradicate adult female illiteracy and provide the foundational cognitive skills needed for personal autonomy.' },
        { title: 'Our Vision', text: 'A world where no woman is left vulnerable or dependent due to an inability to read, write, or calculate.' },
        { title: 'Our Governance', text: 'Operated by a board of seasoned educators and social workers with full annual audit disclosures.' }
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'About / Goals',
      title: 'Strategic Goals & Impact Metrics',
      subtitle: 'Measuring success through the independence, safety, and empowerment of our students.',
      statNumber: '5,000+',
      statLabel: 'Graduates Targeted',
      sidebarText: 'We do not just track attendance; we measure full cognitive autonomy, post-literacy vocational placements, and local community impact.',
      mainParagraphs: [
        'Our goals are concrete, measurable, and highly aligned with the UN Sustainable Development Goals (SDG 4: Quality Education & SDG 5: Gender Equality). We believe that teaching a mother to read has a direct, compounding multiplier effect on the health, hygiene, and academic success of her children.',
        'Over the next three years, our strategic plan is centered on scaling our physical and digital learning infrastructure. By expanding our classrooms and integrating basic digital tablets, we aim to deliver literacy even to remote communities with limited transport options.',
        'We work in three phases: Phase 1 (Foundational Literacy), Phase 2 (Applied Mathematical Literacy), and Phase 3 (Empowerment, Vocational, and Financial Basics).'
      ],
      cards: [
        { title: 'Short-term Goal (2026)', text: 'Establish 4 new safe-learning campuses and enroll 500 new students in our intensive school programs.' },
        { title: 'Mid-term Goal (2028)', text: 'Incorporate basic smartphone/tablet literacy training into our second-tier curriculum to bridge the digital divide.' },
        { title: 'Long-term Goal (2030)', text: 'Achieve zero-illiteracy status across our primary partner regions, turning graduates into community teachers.' }
      ]
    },
    'about-team': {
      id: 'about-team',
      path: 'About / Team',
      title: 'Meet Our Dedicated Team',
      subtitle: 'A collective of passionate educators, child-care providers, and security experts.',
      statNumber: '48',
      statLabel: 'Full-Time Staff',
      sidebarText: 'Our teachers undergo quarterly training in modern adult learning theories, trauma-informed education, and interactive teaching.',
      mainParagraphs: [
        'The heart of Likro & Lihtov lies in our diverse team. We understand that teaching adult students requires a high degree of empathy, patience, and specialized pedagogy. That is why our classroom instructors are certified adult educators who specialize in slow-paced, low-pressure cognitive training.',
        'In addition to our teaching staff, our operation includes crucial support roles: security drivers who ensure safe travel, child-care coordinators who watch toddlers while mothers learn, and administrative coordinators who manage corporate partnerships and resources.',
        'Every member of our team is dedicated to fostering a warm, non-judgmental environment. Many of our assistant instructors are former graduates of Likro & Lihtov, bringing invaluable empathy and peer support to our classrooms.'
      ],
      galleryType: 'team',
      cards: [
        { title: 'Dr. Elena Rostova', text: 'Co-Founder & Pedagogical Director. 15 years in adult literacy research.' },
        { title: 'Sarah Jenkins', text: 'Lead Classroom Instructor. Specialist in phonetic literacy and slow-paced curriculum design.' },
        { title: 'Marcus Vance', text: 'Director of Security & Operations. Oversees student transit and campus safety protocols.' }
      ]
    },
    'about-sponsors': {
      id: 'about-sponsors',
      path: 'About / Sponsors',
      title: 'Our Partners & Corporate Sponsors',
      subtitle: 'Enabling sustainable change through structural funding and philanthropic partnerships.',
      statNumber: '100%',
      statLabel: 'Transparent Audits',
      sidebarText: 'We partner with leading foundations who share our vision of global human rights, community elevation, and gender equity.',
      mainParagraphs: [
        'Our programs are completely tuition-free for all students. This is made possible through the generous backing of international foundations, philanthropic organizations, and corporate socially responsible (CSR) partners.',
        'Sponsor contributions directly fund student transport, classroom materials, security systems, healthy meals, and pedagogical development. We maintain rigorous financial controls and publish annual impact statements showing exactly how resources are deployed.',
        'We offer tailored partnership models: from sponsoring a specific classroom to funding new school building constructions or collaborating on EU-level educational programs.'
      ],
      listTitle: 'Sponsor Benefits & Commitments:',
      listItems: [
        'Comprehensive bi-annual financial disclosures and impact assessments.',
        'On-site collaboration and visibility in constructed school units.',
        'Direct structural alignment with ESG and United Nations SDG criteria.',
        'Inspirational updates, letters, and graduation videos from the classroom cohorts.'
      ]
    },
    'illiteracy-definition': {
      id: 'illiteracy-definition',
      path: 'Illiteracy / Definition',
      title: 'Understanding Adult Illiteracy',
      subtitle: 'Why learning to read and write is not just a skill, but a fundamental human right.',
      statNumber: '773M',
      statLabel: 'Illiterate Worldwide',
      sidebarText: 'Nearly two-thirds of the world\'s illiterate adults are women. This structural inequality traps entire families in cycles of poverty.',
      mainParagraphs: [
        'Illiteracy is more than the inability to decipher letters on a page; it is a profound barrier to social, legal, and economic agency. A woman who cannot read cannot review an employment contract, verify medication dosages for her children, vote with confidence, or protect herself from financial exploitation.',
        'Scientific research consistently shows that illiteracy is closely tied to domestic vulnerability. When women gain literacy, they experience a dramatic increase in self-worth, community decision-making, and financial independence.',
        'Likro & Lihtov defines literacy as "applied capability"—meaning reading, basic math, and critical comprehension that can be instantly utilized in daily life to improve health, safety, and income.'
      ],
      cards: [
        { title: 'The Cycle of Poverty', text: 'Without reading skills, women are confined to low-income labor, making child education and upward mobility extremely difficult.' },
        { title: 'Health & Nutrition', text: 'Literate mothers are significantly more likely to follow proper medical prescriptions, lowering infant mortality and disease rates.' },
        { title: 'Cognitive Autonomy', text: 'Literacy physically rewires brain networks, improving executive function, analytical logic, and long-term planning.' }
      ]
    },
    'illiteracy-school-program': {
      id: 'illiteracy-school-program',
      path: 'Illiteracy / School Program',
      title: 'Our School Curriculum & Structure',
      subtitle: 'A custom, slow-paced educational model designed specifically for adult female learners.',
      statNumber: '9 Months',
      statLabel: 'Core Program Length',
      sidebarText: 'Classes are held in small, highly encouraging cohorts. We offer flexible schedules to accommodate household duties.',
      mainParagraphs: [
        'Our signature educational program is divided into three consecutive quarters, taking a student from complete letter non-recognition to functional reading, writing, and simple accounting. The pace is carefully monitored to ensure no student feels overwhelmed.',
        'We combine classical phonetic teaching with modern, everyday practical scenarios. For instance, writing lessons involve filling out real application forms, reading simple local news, and understanding basic legal tenant rights.',
        'A key component of our program is peer-based learning. Students learn in close circles of 8-12, creating deep bonds of community support, reducing anxiety, and establishing mutual accountability.'
      ],
      galleryType: 'curriculum',
      listTitle: 'Program Highlights:',
      listItems: [
        'Free safe shuttle transport from remote areas directly to campuses.',
        'Integrated on-site nursery and child-care for children under 5 years.',
        'Healthy hot meals and nutritional tracking provided daily.',
        'Graduation certificate and post-school vocational guidance.'
      ]
    },
    'illiteracy-photos-videos': {
      id: 'illiteracy-photos-videos',
      path: 'Illiteracy / Photos & Videos',
      title: 'Media Gallery & Testimonials',
      subtitle: 'Visual highlights of our student graduations, classrooms, and daily campus activities.',
      statNumber: '150+',
      statLabel: 'Graduation Videos',
      sidebarText: 'Photos tell the story of triumph—from the nervous first days of tracing vowels to the proud smiles at graduation.',
      mainParagraphs: [
        'Welcome to our digital archive. Here, you can witness the daily transformation occurring in our school buildings. We believe in capturing the real, unscripted moments of educational breakthrough: a grandmother successfully writing her name for the first time, or a young mother reading a story to her toddler.',
        'All photographs and videos are taken with the full, proud consent of our students. We use these visual assets to showcase the tangible progress of our school programs to our global donors and sponsors.',
        'Browse through the categories below to view classrooms, construction sites, educational material, and video interviews.'
      ],
      galleryType: 'photos'
    },
    'projects-eu-collaboration': {
      id: 'projects-eu-collaboration',
      path: 'Projects / EU Collaboration',
      title: 'European Union Collaboration & Funding',
      subtitle: 'Partnering with European social funds to scale gender equity and literacy.',
      statNumber: '€450K',
      statLabel: 'Active Grants',
      sidebarText: 'Our curriculum aligns with the European Framework for Adult Learning and Gender Equality guidelines.',
      mainParagraphs: [
        'Likro & Lihtov proudly collaborates with European educational associations and gender equality networks. These cross-border partnerships enable us to exchange pedagogical research, import modern teaching methods, and secure structural matching grants.',
        'Through co-funded European social initiatives, we have optimized our teacher training programs. This ensures our teaching staff is equipped with state-of-the-art adult educational psychology and trauma-informed care methods.',
        'Our project reporting standards comply fully with EU transparency requirements, assuring all stakeholders of complete fiscal responsibility.'
      ],
      cards: [
        { title: 'Curriculum Exchange', text: 'We regularly host and participate in joint research workshops with European adult-learning networks.' },
        { title: 'Quality Frameworks', text: 'Adhering to high EU benchmarks for educational evaluation, student welfare, and structural accountability.' },
        { title: 'Matching Funding', text: 'Every dollar donated by individual sponsors is matched by active community grants, doubling the impact.' }
      ]
    },
    'projects-construction': {
      id: 'projects-construction',
      path: 'Projects / Construction',
      title: 'School Construction & Campus Development',
      subtitle: 'Building modern, safe, solar-powered learning environments for our students.',
      statNumber: '6 Units',
      statLabel: 'Built/Upgraded',
      sidebarText: 'Our schools are architectural spaces designed to feel open, welcoming, well-lit, and thoroughly secure.',
      mainParagraphs: [
        'A massive obstacle to adult education in poor areas is the lack of physical infrastructure. Learning in cramped, poorly lit, or unsafe spaces leads to high drop-out rates. Likro & Lihtov addresses this by constructing custom-designed school units.',
        'Each school building features spacious classrooms, dynamic floor plans with ample natural light, a fully equipped child-care play area, secure clean washrooms, and solar panel arrays to guarantee continuous electrical power.',
        'We hire local builders, craftspeople, and technicians for all construction projects, pumping vital resources directly back into the local community economy.'
      ],
      cards: [
        { title: 'Solar Powered', text: 'Independent green energy grids protect our classrooms from rolling blackouts, keeping air conditioning and lighting running.' },
        { title: 'Safe Child-Care Area', text: 'Soundproofed, secure nurseries adjacent to the classrooms let mothers study with peace of mind.' },
        { title: 'Community Built', text: 'All raw materials are locally sourced and constructed by local labor, creating local jobs.' }
      ]
    },
    'projects-security': {
      id: 'projects-security',
      path: 'Projects / Security',
      title: 'Safety, Transit & Security Protocols',
      subtitle: 'Eliminating the physical risks that prevent women from attending classes.',
      statNumber: '100%',
      statLabel: 'Safe Transits',
      sidebarText: 'Our zero-incident record is maintained through specialized transport routes, secure campuses, and professional security staff.',
      mainParagraphs: [
        'In many vulnerable communities, walking alone to an evening or afternoon class carries serious security risks. Fear of transit harassment or theft is one of the highest reasons women drop out of adult programs. At Likro & Lihtov, we treat student safety as an absolute priority.',
        'We run a dedicated, private shuttle service. Our drivers pick up students from designated local transit points and drop them directly at our secure school gates, reversing the route when classes conclude.',
        'Our school campuses are fenced, equipped with secure entry locks, well-lit parking lots, and CCTV surveillance, staffed by professional, empathetic security monitors.'
      ],
      cards: [
        { title: 'Private Shuttles', text: 'Reliable, well-maintained school vans driven by vetted, professional staff cover extensive community routes.' },
        { title: 'Secure Campuses', text: 'Strict visitor logs, boundary fencing, and entry control systems maintain absolute sanctuary.' },
        { title: 'Well-Lit Paths', text: 'Full exterior motion-detecting lighting systems cover all parking and drop-off zones.' }
      ]
    },
    'projects-education': {
      id: 'projects-education',
      path: 'Projects / Education',
      title: 'Educational Methodologies & Innovation',
      subtitle: 'Employing highly customized adult-learning cognitive approaches.',
      statNumber: '92%',
      statLabel: 'Graduation Rate',
      sidebarText: 'We constantly refine our methods through peer-reviewed adult literacy studies and practical student feedback loops.',
      mainParagraphs: [
        'Teaching an adult to read requires a complete departure from child-based school models. Adults possess complex vocabularies, high logic capacities, and specific psychological vulnerabilities, such as fear of failure or embarrassment.',
        'We utilize the "Mother-Tongue First" phonetic approach, linking reading directly to terms and challenges the students deal with in their daily occupations—such as market trades, banking, farming, or childcare.',
        'Our innovative digital tools (like basic tablets loaded with custom literacy games) reinforce physical learning and make independent study fun, interactive, and highly accessible.'
      ],
      cards: [
        { title: 'Phonetic Tracing', text: 'Learning vowel sounds and structures in visual clusters, allowing rapid cognitive reading skills.' },
        { title: 'Applied Arithmetic', text: 'Math lessons taught using mock cash registers, ledger sheets, and banking calculators for immediate utility.' },
        { title: 'Emotional Safety', text: 'Low-pressure, non-graded structures where progress is celebrated, removing the fear of testing.' }
      ]
    }
  },
  FR: {
    'about-organization': {
      id: 'about-organization',
      path: 'À Propos / Organisation',
      title: 'Notre Organisation & Fondation',
      subtitle: 'Créer une base solide pour que chaque femme dispose des outils nécessaires pour écrire son propre avenir.',
      statNumber: '10 ans+',
      statLabel: 'Présence Communautaire',
      sidebarText: 'Likro & Lihtov a été créé pour éliminer les obstacles de genre dans l’éducation des adultes. Nous opérons dans les zones urbaines et rurales.',
      mainParagraphs: [
        'Likro & Lihtov a commencé comme une initiative citoyenne en réponse à un défi sociétal majeur: l’analphabétisme des femmes adultes dans les communautés défavorisées. Notre organisation est devenue une école structurée et certifiée.',
        'Notre programme pédagogique est basé sur les sciences de l’apprentissage des adultes. Nous répondons aux besoins de confiance en soi, de flexibilité et d’autonomie.'
      ],
      cards: [
        { title: 'Notre Mission', text: 'Éradiquer l’analphabétisme et fournir les outils pour l’autonomie personnelle.' }
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'À Propos / Objectifs',
      title: 'Objectifs Stratégiques',
      subtitle: 'Mesurer la réussite à travers l’indépendance de nos étudiantes.',
      statNumber: '5 000+',
      statLabel: 'Objectif de Diplômées',
      sidebarText: 'Nous suivons le développement cognitif et l’intégration professionnelle post-alphabétisation.',
      mainParagraphs: [
        'Nos objectifs s’alignent sur le développement durable de l’ONU. L’éducation des mères a un impact direct sur la scolarisation et la santé des enfants.'
      ]
    },
    'about-team': {
      id: 'about-team',
      path: 'À Propos / Équipe',
      title: 'Notre Équipe Dédiée',
      subtitle: 'Un collectif passionné d’enseignants, d’éducateurs et d’experts en logistique.',
      statNumber: '48',
      statLabel: 'Membres du Personnel',
      sidebarText: 'Nos enseignants sont formés aux pédagogies actives pour adultes.',
      mainParagraphs: [
        'Le cœur de Likro & Lihtov repose sur l’empathie et la patience. Nous créons un cadre rassurant pour lever les blocages psychologiques.'
      ],
      galleryType: 'team'
    },
    'about-sponsors': {
      id: 'about-sponsors',
      path: 'À Propos / Sponsors',
      title: 'Partenaires & Sponsors',
      subtitle: 'Financer le changement structurel grâce aux dons et subventions.',
      statNumber: '100%',
      statLabel: 'Transparence Financière',
      sidebarText: 'Nos partenaires partagent nos valeurs de droits humains et d’égalité des genres.',
      mainParagraphs: [
        'Grâce au soutien financier de fondations internationales, nos cours sont totalement gratuits pour toutes les participantes.'
      ]
    },
    'illiteracy-definition': {
      id: 'illiteracy-definition',
      path: 'Analphabétisme / Définition',
      title: 'Comprendre l’Analphabétisme des Adultes',
      subtitle: 'Pourquoi l’alphabétisation est un droit humain fondamental.',
      statNumber: '773M',
      statLabel: 'Analphabètes dans le Monde',
      sidebarText: 'Près des deux tiers des adultes analphabètes sont des femmes.',
      mainParagraphs: [
        'L’analphabétisme empêche d’avoir pleinement accès à l’indépendance économique et juridique. Savoir lire est un facteur essentiel d’émancipation.'
      ]
    },
    'illiteracy-school-program': {
      id: 'illiteracy-school-program',
      path: 'Analphabétisme / Programme',
      title: 'Structure de Notre Programme Éducatif',
      subtitle: 'Un parcours d’apprentissage adapté, bienveillant et progressif.',
      statNumber: '9 Mois',
      statLabel: 'Durée du Programme',
      sidebarText: 'Les cours ont lieu en petits groupes de 8 à 12 étudiantes pour favoriser l’entraide.',
      mainParagraphs: [
        'Notre programme phare s’organise sur trois trimestres successifs pour maîtriser la lecture, l’écriture et le calcul usuel.'
      ],
      galleryType: 'curriculum'
    },
    'illiteracy-photos-videos': {
      id: 'illiteracy-photos-videos',
      path: 'Analphabétisme / Photos & Vidéos',
      title: 'Galerie Média & Témoignages',
      subtitle: 'Revivez en images les moments forts de notre communauté éducative.',
      statNumber: '150+',
      statLabel: 'Vidéos de Graduations',
      sidebarText: 'Les photographies illustrent la fierté de la réussite éducative.',
      mainParagraphs: [
        'Découvrez le quotidien de nos classes, nos cérémonies de remise de diplômes et la joie partagée par nos étudiantes.'
      ],
      galleryType: 'photos'
    },
    'projects-eu-collaboration': {
      id: 'projects-eu-collaboration',
      path: 'Projets / Collaboration UE',
      title: 'Partenariats avec l’Union Européenne',
      subtitle: 'Collaborer avec les fonds sociaux européens pour étendre notre impact.',
      statNumber: '450K€',
      statLabel: 'Subventions actives',
      sidebarText: 'Nos programmes pédagogiques intègrent les meilleures pratiques européennes.',
      mainParagraphs: [
        'Cette collaboration nous permet de financer nos infrastructures et d’offrir une formation pédagogique de pointe.'
      ]
    },
    'projects-construction': {
      id: 'projects-construction',
      path: 'Projets / Construction',
      title: 'Construction d’Écoles & d’Infrastructures',
      subtitle: 'Bâtir des espaces d’apprentissage modernes et écologiques.',
      statNumber: '6 Unités',
      statLabel: 'Classes Construites',
      sidebarText: 'Des espaces ouverts, lumineux, équipés de crèches et alimentés par énergie solaire.',
      mainParagraphs: [
        'La construction de structures adaptées et sûres supprime les obstacles d’accès aux cours et favorise la réussite des femmes.'
      ]
    },
    'projects-security': {
      id: 'projects-security',
      path: 'Projets / Sécurité',
      title: 'Protocoles de Sécurité & Transports',
      subtitle: 'Éliminer les risques physiques pour garantir l’accès aux cours.',
      statNumber: '100%',
      statLabel: 'Sécurité de Transit',
      sidebarText: 'Nous assurons des trajets sûrs grâce à nos navettes privées.',
      mainParagraphs: [
        'Notre système de navette gratuite raccompagne les étudiantes directement aux portes de l’école pour éviter les agressions de transport.'
      ]
    },
    'projects-education': {
      id: 'projects-education',
      path: 'Projets / Éducation',
      title: 'Innovations et Méthodologies Pédagogiques',
      subtitle: 'Des techniques cognitives centrées sur la psychologie de l’adulte.',
      statNumber: '92%',
      statLabel: 'Taux de Réussite',
      sidebarText: 'Notre apprentissage ludique utilise aussi des tablettes numériques interactives.',
      mainParagraphs: [
        'Le programme associe phonétique, mise en situation pratique, et confiance émotionnelle en supprimant l’anxiété des évaluations.'
      ]
    }
  },
  ES: {
    'about-organization': {
      id: 'about-organization',
      path: 'Nosotros / Organización',
      title: 'Nuestra Organización',
      subtitle: 'Construyendo bases sólidas para que cada mujer escriba su propio futuro.',
      statNumber: '10 Años+',
      statLabel: 'Presencia Comunitaria',
      sidebarText: 'Likro & Lihtov se estableció para eliminar las barreras de género en la educación de adultos.',
      mainParagraphs: [
        'Likro & Lihtov comenzó como una iniciativa comunitaria para responder al analfabetismo femenino en zonas vulnerables.'
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'Nosotros / Objetivos',
      title: 'Objetivos y Métricas de Impacto',
      subtitle: 'Medir el éxito en función de la autonomía de nuestras alumnas.',
      statNumber: '5,000+',
      statLabel: 'Graduadas Planificadas',
      sidebarText: 'Buscamos un desarrollo cognitivo integral y la inserción laboral.',
      mainParagraphs: [
        'La educación de las madres genera un efecto multiplicador positivo en la escolarización y salud de sus hijos.'
      ]
    },
    'about-team': {
      id: 'about-team',
      path: 'Nosotros / Equipo',
      title: 'Nuestro Equipo Comprometido',
      subtitle: 'Docentes, coordinadores y expertos dedicados al aprendizaje seguro.',
      statNumber: '48',
      statLabel: 'Equipo Profesional',
      sidebarText: 'Capacitamos trimestralmente a nuestros docentes en andragogía.',
      mainParagraphs: [
        'Ofrecemos un entorno seguro y libre de juicios para eliminar la ansiedad ante el aprendizaje.'
      ],
      galleryType: 'team'
    },
    'about-sponsors': {
      id: 'about-sponsors',
      path: 'Nosotros / Patrocinadores',
      title: 'Socios & Patrocinadores Corporativos',
      subtitle: 'Financiar aulas mediante alianzas corporativas transparentes.',
      statNumber: '100%',
      statLabel: 'Transparencia de Auditoría',
      sidebarText: 'Nuestros patrocinadores hacen posible que la enseñanza sea 100% gratuita.',
      mainParagraphs: [
        'Las donaciones financian el transporte, los almuerzos diarios y los materiales didácticos de las alumnas.'
      ]
    },
    'illiteracy-definition': {
      id: 'illiteracy-definition',
      path: 'Analfabetismo / Definición',
      title: 'Comprendiendo el Analfabetismo Adulto',
      subtitle: 'La alfabetización es un derecho humano y un camino al empoderamiento.',
      statNumber: '773M',
      statLabel: 'Adultos Analfabetos',
      sidebarText: 'Dos tercios de las personas analfabetas adultas son mujeres.',
      mainParagraphs: [
        'No saber leer aísla legal y financieramente a las mujeres. La lectura abre caminos hacia la autosuficiencia.'
      ]
    },
    'illiteracy-school-program': {
      id: 'illiteracy-school-program',
      path: 'Analfabetismo / Programa',
      title: 'Diseño de Nuestro Plan de Estudios',
      subtitle: 'Un método adaptado, respetuoso y centrado en la alumna.',
      statNumber: '9 Meses',
      statLabel: 'Duración del Programa',
      sidebarText: 'Clases dinámicas en grupos pequeños de 8 a 12 participantes.',
      mainParagraphs: [
        'El plan consta de tres trimestres: fonética básica, escritura y matemáticas comerciales útiles.'
      ],
      galleryType: 'curriculum'
    },
    'illiteracy-photos-videos': {
      id: 'illiteracy-photos-videos',
      path: 'Analfabetismo / Fotos & Videos',
      title: 'Galería Digital de Logros',
      subtitle: 'Reviva el orgullo de las graduaciones y el día a día en el aula.',
      statNumber: '150+',
      statLabel: 'Videos de Graduadas',
      sidebarText: 'Imágenes testimoniales de superación personal.',
      mainParagraphs: [
        'Explore las aulas, actividades al aire libre y las graduaciones de nuestras valientes estudiantes.'
      ],
      galleryType: 'photos'
    },
    'projects-eu-collaboration': {
      id: 'projects-eu-collaboration',
      path: 'Proyectos / Colaboración UE',
      title: 'Colaboraciones con la Unión Europea',
      subtitle: 'Fondos de desarrollo social europeo para expandir las oportunidades.',
      statNumber: '€450K',
      statLabel: 'Fondos Activos',
      sidebarText: 'Alineamos nuestra pedagogía con los marcos de igualdad de la UE.',
      mainParagraphs: [
        'La alianza con agencias europeas nos permite dotar a los centros de tabletas y materiales actualizados.'
      ]
    },
    'projects-construction': {
      id: 'projects-construction',
      path: 'Proyectos / Construcción',
      title: 'Construcción y Desarrollo de Aulas',
      subtitle: 'Aulas modernas, ecológicas y diseñadas para el estudio.',
      statNumber: '6 Unidades',
      statLabel: 'Aulas Equipadas',
      sidebarText: 'Aulas solares, climatizadas y con guarderías integradas.',
      mainParagraphs: [
        'Dotar a las comunidades de centros propios y seguros es vital para motivar la asistencia constante.'
      ]
    },
    'projects-security': {
      id: 'projects-security',
      path: 'Projets / Seguridad',
      title: 'Seguridad en el Campus y en Tránsito',
      subtitle: 'Garantizar que ninguna alumna falte a clases por temores de seguridad.',
      statNumber: '100%',
      statLabel: 'Seguridad Garantizada',
      sidebarText: 'Ofrecemos rutas de transporte privado gratuito.',
      mainParagraphs: [
        'Vallas perimetrales, iluminación LED en accesos y choferes dedicados resguardan la seguridad de cada alumna.'
      ]
    },
    'projects-education': {
      id: 'projects-education',
      path: 'Proyectos / Educación',
      title: 'Metodologías Educativas Innovadoras',
      subtitle: 'Enfoques andragógicos específicos para la superación personal.',
      statNumber: '92%',
      statLabel: 'Tasa de Graduación',
      sidebarText: 'Uso de tecnologías interactivas para fomentar la autonomía.',
      mainParagraphs: [
        'Diseñamos metodologías participativas y emocionales, libres de la presión de los exámenes tradicionales.'
      ]
    }
  }
};
