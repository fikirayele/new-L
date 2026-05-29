export interface TranslationSet {
  // Navbar
  navAbout: string;
  navAboutOrg: string;
  navAboutGoals: string;
  navAboutTeam: string;
  navAboutSponsors: string;
  navIlliteracy: string;
  navIlliteracyDef: string;
  navIlliteracyProg: string;
  navIlliteracyMedia: string;
  navProjects: string;
  navProjectsEU: string;
  navProjectsConst: string;
  navProjectsSec: string;
  navProjectsEdu: string;
  navContacts: string;
  btnDonate: string;
  btnLanguage: string;

  // Hero
  heroSub: string;
  heroTitle1: string;
  heroTitleItalic: string;
  heroDesc: string;
  heroRegPlaceholder: string;
  heroRegBtn: string;

  // Mission
  missionTitle: string;
  missionText: string;

  // Discover
  discSub: string;
  discTitle: string;
  discDesc: string;
  discIntl: string;
  discConst: string;
  discSec: string;
  discEdu: string;
  discMore: string;

  // Sponsors
  sponTag: string;
  sponTitle: string;
  sponSub: string;

  // Footer
  footDesc: string;
  footNav: string;
  footContact: string;
  footStay: string;
  footSubText: string;
  footSubPlaceholder: string;
  footSubBtn: string;
  footCopy: string;

  // Donation Form
  donTitle: string;
  donSub: string;
  donCause: string;
  donCauseGen: string;
  donCauseTransit: string;
  donCauseSchool: string;
  donCauseTeacher: string;
  donFullName: string;
  donEmail: string;
  donAmount: string;
  donCustom: string;
  donSubmit: string;
  donSuccess: string;

  // Contact Form
  conTitle: string;
  conSub: string;
  conName: string;
  conEmail: string;
  conSubject: string;
  conMessage: string;
  conProgram: string;
  conProgramSelect: string;
  conSend: string;
  conSuccess: string;

  // Dedicated Newsletter Registration Form
  newsTitle: string;
  newsSub: string;
  newsName: string;
  newsEmail: string;
  newsConsent: string;
  newsSubmit: string;
  newsSuccess: string;
}

export const translations: Record<string, TranslationSet> = {
  EN: {
    navAbout: 'About',
    navAboutOrg: 'Organization',
    navAboutGoals: 'Goals',
    navAboutTeam: 'Team',
    navAboutSponsors: 'Sponsors',
    navIlliteracy: 'Illiteracy',
    navIlliteracyDef: 'Definition',
    navIlliteracyProg: 'School Program',
    navIlliteracyMedia: 'Photos & Videos',
    navProjects: 'Projects',
    navProjectsEU: 'EU Collaboration',
    navProjectsConst: 'Construction',
    navProjectsSec: 'Security',
    navProjectsEdu: 'Education',
    navContacts: 'Contacts',
    btnDonate: 'Donate',
    btnLanguage: 'Language',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Learning to Read and Write is a ',
    heroTitleItalic: 'human right',
    heroDesc: 'We are a dedicated school for illiterate women. Our target mission is to help women learn to read, write, calculate, and ultimately empower themselves in daily society.',
    heroRegPlaceholder: 'Enter your email address',
    heroRegBtn: 'Register newsletter',

    missionTitle: 'Our Mission',
    missionText: 'To dismantle adult female illiteracy from its roots. By providing targeted, slow-paced educational curriculum, private transit, childcare services, and digital tablets, we foster true personal autonomy, socio-economic confidence, and secure paths forward for our students.',

    discSub: 'Empowerment Areas',
    discTitle: 'Discover our areas of activity',
    discDesc: 'We offer a wide range of specialized, adult-focused programs and architectural initiatives that create lasting intergenerational impact. Click on any area to read the structural deep dive.',
    discIntl: 'International collaboration',
    discConst: 'Construction',
    discSec: 'Security',
    discEdu: 'Education',
    discMore: 'More',

    sponTag: 'Our sponsors',
    sponTitle: 'Trust & Partnership',
    sponSub: 'They believe in us and sponsor classrooms, security fleets, and materials.',

    footDesc: 'We are a school dedicated completely to illiterate women. Our targeted pedagogical programs teach women to read, write, calculate and empower themselves within the wider community.',
    footNav: 'Navigation',
    footContact: 'Contact',
    footStay: 'Stay updated',
    footSubText: 'Subscribe to our monthly newsletter to receive dynamic news and educational impact updates.',
    footSubPlaceholder: 'Your email address',
    footSubBtn: 'Subscribe',
    footCopy: '© 2026 Likro & Lihtov. All rights reserved.',

    donTitle: 'Support Our Mission',
    donSub: 'Your contribution directly funds classrooms, secure shuttles, child-care, and learning tablets.',
    donCause: 'Sponsorship Cause',
    donCauseGen: 'General Educational Fund',
    donCauseTransit: 'Safe Shuttle & Transit Security',
    donCauseSchool: 'New Classroom Construction',
    donCauseTeacher: 'Teacher Salary & Training',
    donFullName: 'Full Name',
    donEmail: 'Email Address',
    donAmount: 'Select Donation Amount',
    donCustom: 'Custom Amount',
    donSubmit: 'Complete Donation',
    donSuccess: 'Thank you! Your donation of ${amount} for the {cause} was received.',

    conTitle: 'Connect With Us',
    conSub: 'Have questions about classes, volunteering, or partnerships? Write to our team.',
    conName: 'Full Name',
    conEmail: 'Email Address',
    conSubject: 'Subject / Query Type',
    conMessage: 'Write your message here...',
    conProgram: 'Program of Interest',
    conProgramSelect: '-- Select Area --',
    conSend: 'Send Message',
    conSuccess: 'Thank you, {name}! Your message has been sent to our community team.',

    newsTitle: 'Register for Newsletter',
    newsSub: 'Receive inspirational stories, graduation photos, and structural impact updates.',
    newsName: 'Full Name',
    newsEmail: 'Email Address',
    newsConsent: 'I agree to receive monthly progress reports and student success stories.',
    newsSubmit: 'Subscribe Now',
    newsSuccess: 'Congratulations, {name}! You have subscribed to the Likro & Lihtov monthly updates.'
  },
  FR: {
    navAbout: 'À Propos',
    navAboutOrg: 'Organisation',
    navAboutGoals: 'Objectifs',
    navAboutTeam: 'Équipe',
    navAboutSponsors: 'Sponsors',
    navIlliteracy: 'Analphabétisme',
    navIlliteracyDef: 'Définition',
    navIlliteracyProg: 'Programme Scolaire',
    navIlliteracyMedia: 'Photos et Vidéos',
    navProjects: 'Projets',
    navProjectsEU: 'Collaboration UE',
    navProjectsConst: 'Construction',
    navProjectsSec: 'Sécurité',
    navProjectsEdu: 'Éducation',
    navContacts: 'Contacts',
    btnDonate: 'Faire un Don',
    btnLanguage: 'Langue',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Apprendre à lire et à écrire est un ',
    heroTitleItalic: 'droit humain',
    heroDesc: 'Nous sommes une école dédiée aux femmes analphabètes. Notre mission est d’aider les femmes à apprendre à lire, écrire, calculer et s’autonomiser au quotidien.',
    heroRegPlaceholder: 'Entrez votre adresse email',
    heroRegBtn: 'S’inscrire à la newsletter',

    missionTitle: 'Notre Mission',
    missionText: 'Éradiquer l’analphabétisme des femmes adultes à la racine. Grâce à un programme adapté, des transports sécurisés, une crèche et des tablettes numériques, nous favorisons l’autonomie de nos élèves.',

    discSub: 'Domaines d’autonomisation',
    discTitle: 'Découvrez nos domaines d’activité',
    discDesc: 'Nous proposons une large gamme de programmes spécialisés pour adultes et des initiatives architecturales qui créent un impact durable. Cliquez pour en savoir plus.',
    discIntl: 'Collaboration internationale',
    discConst: 'Construction',
    discSec: 'Sécurité',
    discEdu: 'Éducation',
    discMore: 'Plus',

    sponTag: 'Nos sponsors',
    sponTitle: 'Confiance & Partenariat',
    sponSub: 'Ils croient en nous et soutiennent le financement de nos classes et équipements.',

    footDesc: 'Nous sommes une école dédiée aux femmes analphabètes. Nos programmes pédagogiques ciblés permettent aux femmes de s’épanouir au sein de la communauté.',
    footNav: 'Navigation',
    footContact: 'Contact',
    footStay: 'Restez informé',
    footSubText: 'Abonnez-vous à notre newsletter mensuelle pour recevoir des nouvelles et des mises à jour d’impact.',
    footSubPlaceholder: 'Votre adresse email',
    footSubBtn: 'S’abonner',
    footCopy: '© 2026 Likro & Lihtov. Tous droits réservés.',

    donTitle: 'Soutenez Notre Mission',
    donSub: 'Votre contribution finance directement les classes, les navettes sécurisées et les tablettes d’apprentissage.',
    donCause: 'Sujet du Parrainage',
    donCauseGen: 'Fonds Éducatif Général',
    donCauseTransit: 'Navette Sécurisée & Sécurité de Transit',
    donCauseSchool: 'Construction de Nouvelles Salles de Classe',
    donCauseTeacher: 'Salaire & Formation des Enseignants',
    donFullName: 'Nom Complet',
    donEmail: 'Adresse Email',
    donAmount: 'Sélectionnez le montant du don',
    donCustom: 'Montant Personnalisé',
    donSubmit: 'Finaliser le Don',
    donSuccess: 'Merci! Votre don de {amount}$ pour le {cause} a bien été reçu.',

    conTitle: 'Contactez-Nous',
    conSub: 'Des questions sur les cours, le bénévolat ou les partenariats ? Écrivez à notre équipe.',
    conName: 'Nom Complet',
    conEmail: 'Adresse Email',
    conSubject: 'Sujet / Type de demande',
    conMessage: 'Écrivez votre message ici...',
    conProgram: 'Programme d’intérêt',
    conProgramSelect: '-- Sélectionnez un domaine --',
    conSend: 'Envoyer le Message',
    conSuccess: 'Merci, {name}! Votre message a bien été envoyé à notre équipe communautaire.',

    newsTitle: 'Inscription à la Newsletter',
    newsSub: 'Recevez des histoires inspirantes, des photos de diplômées et des rapports d’impact.',
    newsName: 'Nom Complet',
    newsEmail: 'Adresse Email',
    newsConsent: 'J’accepte de recevoir les rapports mensuels et les histoires de réussite des élèves.',
    newsSubmit: 'S’abonner Maintenant',
    newsSuccess: 'Félicitations, {name}! Vous êtes maintenant abonné aux mises à jour de Likro & Lihtov.'
  },
  ES: {
    navAbout: 'Nosotros',
    navAboutOrg: 'Organización',
    navAboutGoals: 'Objetivos',
    navAboutTeam: 'Equipo',
    navAboutSponsors: 'Patrocinadores',
    navIlliteracy: 'Analfabetismo',
    navIlliteracyDef: 'Definición',
    navIlliteracyProg: 'Programa Escolar',
    navIlliteracyMedia: 'Fotos y Videos',
    navProjects: 'Proyectos',
    navProjectsEU: 'Colaboración UE',
    navProjectsConst: 'Construcción',
    navProjectsSec: 'Seguridad',
    navProjectsEdu: 'Educación',
    navContacts: 'Contactos',
    btnDonate: 'Donar',
    btnLanguage: 'Idioma',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Aprender a leer y escribir es un ',
    heroTitleItalic: 'derecho humano',
    heroDesc: 'Somos una escuela dedicada a mujeres analfabetas. Nuestra misión es ayudar a las mujeres a leer, escribir, calcular y empoderarse en la sociedad.',
    heroRegPlaceholder: 'Ingrese su correo electrónico',
    heroRegBtn: 'Registrar boletín',

    missionTitle: 'Nuestra Misión',
    missionText: 'Desmantelar el analfabetismo femenino adulto desde sus raíces. Con un plan de estudios adaptado, transporte privado y cuidado infantil, fomentamos la autonomía personal.',

    discSub: 'Áreas de Empoderamiento',
    discTitle: 'Descubra nuestras áreas de actividad',
    discDesc: 'Ofrecemos una amplia gama de programas especializados para adultos e iniciativas arquitectónicas que generan un impacto duradero. Haga clic para leer más.',
    discIntl: 'Colaboración internacional',
    discConst: 'Construcción',
    discSec: 'Seguridad',
    discEdu: 'Educación',
    discMore: 'Más',

    sponTag: 'Patrocinadores',
    sponTitle: 'Confianza y Alianza',
    sponSub: 'Ellos confían en nosotros y apoyan el equipamiento de nuestras aulas y transporte.',

    footDesc: 'Somos una escuela dedicada completamente a mujeres analfabetas. Nuestros programas pedagógicos permiten a las mujeres empoderarse dentro de la comunidad.',
    footNav: 'Navegación',
    footContact: 'Contacto',
    footStay: 'Manténgase al día',
    footSubText: 'Suscríbase a nuestro boletín mensual para recibir noticias de impacto y actualizaciones.',
    footSubPlaceholder: 'Su correo electrónico',
    footSubBtn: 'Suscribirse',
    footCopy: '© 2026 Likro & Lihtov. Todos los derechos reservados.',

    donTitle: 'Apoye Nuestra Misión',
    donSub: 'Su contribución financia directamente las aulas, transporte seguro, guardería y tabletas de estudio.',
    donCause: 'Causa del Patrocinio',
    donCauseGen: 'Fondo Educativo General',
    donCauseTransit: 'Transporte Seguro y Seguridad en Tránsito',
    donCauseSchool: 'Construcción de Nuevas Aulas',
    donCauseTeacher: 'Salarios y Capacitación Docente',
    donFullName: 'Nombre Completo',
    donEmail: 'Correo Electrónico',
    donAmount: 'Seleccione el monto de la donación',
    donCustom: 'Monto Personalizado',
    donSubmit: 'Completar Donación',
    donSuccess: '¡Gracias! Su donación de {amount}$ para {cause} fue recibida con éxito.',

    conTitle: 'Contáctenos',
    conSub: '¿Tiene preguntas sobre clases, voluntariado o alianzas? Escriba a nuestro equipo.',
    conName: 'Nombre Completo',
    conEmail: 'Correo Electrónico',
    conSubject: 'Asunto / Tipo de consulta',
    conMessage: 'Escriba su mensaje aquí...',
    conProgram: 'Programa de Interés',
    conProgramSelect: '-- Seleccione un área --',
    conSend: 'Enviar Mensaje',
    conSuccess: '¡Gracias, {name}! Su mensaje ha sido enviado a nuestro equipo comunitario.',

    newsTitle: 'Registro al Boletín',
    newsSub: 'Reciba historias inspiradoras, fotos de graduación y actualizaciones de impacto estructural.',
    newsName: 'Nombre Completo',
    newsEmail: 'Correo Electrónico',
    newsConsent: 'Acepto recibir los informes mensuales y las historias de éxito de las alumnas.',
    newsSubmit: 'Suscribirse Ahora',
    newsSuccess: '¡Felicitaciones, {name}! Se ha suscrito exitosamente a las actualizaciones mensuales de Likro & Lihtov.'
  }
};
