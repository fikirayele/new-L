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
  navIlliteracyStats: string;
  navIlliteracyCons: string;
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
  heroTitleLinker: string;
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
  conMessageLabel: string;
  conPhone: string;
  conOurEmail: string;
  conOurPhone: string;
  conHeadOffice: string;
  conProgramSelect: string;
  conSubjGen: string;
  conSubjVol: string;
  conSubjPartner: string;
  conSubjSupport: string;
  conSubjOther: string;
  conRequiredFieldsText: string;
  conSalutationLabel: string;
  conSalutationSelect: string;
  conSalutationMr: string;
  conSalutationMs: string;
  conSalutationDr: string;
  conSalutationOther: string;
  conSend: string;
  conSuccess: string;
  conRobotVerification: string;
  conRobotError: string;

  // Dedicated Newsletter Registration Form
  newsTitle: string;
  newsSub: string;
  newsName: string;
  newsEmail: string;
  newsConsent: string;
  newsSubmit: string;
  newsSuccess: string;

  // Cookies
  cookieText: string;
  cookieAccept: string;
  cookieDecline: string;

  // FAQ
  faqTitle: string;
}

export const translations: Record<string, TranslationSet> = {
  EN: {
    navAbout: 'Who we are',
    navAboutOrg: 'Organization',
    navAboutGoals: 'School program',
    navAboutTeam: 'Team',
    navAboutSponsors: 'Sponsors',
    navIlliteracy: 'Illiteracy',
    navIlliteracyDef: 'Definition',
    navIlliteracyProg: 'School Program',
    navIlliteracyMedia: 'Photos & Videos',
    navIlliteracyStats: 'Statistics',
    navIlliteracyCons: 'Consequences',
    navProjects: 'Projects',
    navProjectsEU: 'EU Collaboration',
    navProjectsConst: 'Construction',
    navProjectsSec: 'Security',
    navProjectsEdu: 'Education',
    navContacts: 'Contact',
    btnDonate: 'Donate',
    btnLanguage: 'Language',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Learning to Read and Write',
    heroTitleLinker: 'is a ',
    heroTitleItalic: 'Human Right',
    heroDesc: 'Education opens doors. Through literacy, women can gain the skills, confidence and opportunities they need to shape their own future',
    heroRegPlaceholder: 'Enter your email address',
    heroRegBtn: 'Register newsletter',

    missionTitle: 'Our Mission',
    missionText: 'To dismantle adult female illiteracy from its roots. By providing targeted, slow-paced educational curriculum, private transit, childcare services, and digital tablets, we foster true personal autonomy, socio-economic confidence, and secure paths forward for our students.',

    discSub: '',
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

    footDesc: 'Learning to Read and Write is a Human Right',
    footNav: 'Quick Links',
    footContact: 'Contact',
    footStay: 'Join Our Community',
    footSubText: 'Subscribe to our newsletter to stay updated on our projects and achievements.',
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

    conTitle: 'Get in Touch',
    conSub: 'Every conversation can make a difference.\nContact us to learn more about our organization, projects or partnerships.',
    conName: 'Full name',
    conEmail: 'Email',
    conSubject: 'Reason for contact',
    conMessage: 'Write your message here...',
    conMessageLabel: 'Message',
    conPhone: 'Phone number',
    conOurEmail: 'Email Address',
    conOurPhone: 'Phone Number',
    conHeadOffice: 'Office Address',
    conProgramSelect: '-- Select option --',
    conSubjGen: 'General Inquiry',
    conSubjVol: 'Volunteering',
    conSubjPartner: 'Partnership',
    conSubjSupport: 'Donations & Sponsoring',
    conSubjOther: 'Other',
    conRequiredFieldsText: 'Fields marked with * are required.',
    conSalutationLabel: 'Salutation',
    conSalutationSelect: '-- Select an option --',
    conSalutationMr: 'Mr.',
    conSalutationMs: 'Ms.',
    conSalutationDr: 'Dr.',
    conSalutationOther: 'Other',
    conSend: 'Send Message',
    conSuccess: 'Thank you, {name}! Your message has been sent to our community team.',
    conRobotVerification: "I'm not a robot",
    conRobotError: 'Please verify that you are not a robot.',

    newsTitle: 'Join Our Community',
    newsSub: 'Stay informed about our projects, achievements and impact.',
    newsName: 'Full Name',
    newsEmail: 'Email',
    newsConsent: 'I agree to receive updates about Likro & Lihtov\'s projects and activities.',
    newsSubmit: 'Subscribe',
    newsSuccess: 'Congratulations, {name}! You have subscribed to the Likro & Lihtov monthly updates.',

    cookieText: 'We use cookies, pixels, and similar tracking technologies to optimize website performance, analyze visitor traffic patterns, remember your language preferences, and support our educational advocacy missions. By clicking "Accept", you agree to our',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',

    faqTitle: 'Frequently Asked Questions (FAQ)'
  },
  FR: {
    navAbout: 'Qui sommes-nous',
    navAboutOrg: 'Organisation',
    navAboutGoals: 'Programme scolaire',
    navAboutTeam: 'Équipe',
    navAboutSponsors: 'Sponsors',
    navIlliteracy: 'Analphabétisme',
    navIlliteracyDef: 'Définition',
    navIlliteracyProg: 'Programme Scolaire',
    navIlliteracyMedia: 'Photos et Vidéos',
    navIlliteracyStats: 'Statistiques',
    navIlliteracyCons: 'Conséquences',
    navProjects: 'Projets',
    navProjectsEU: 'Collaboration UE',
    navProjectsConst: 'Construction',
    navProjectsSec: 'Sécurité',
    navProjectsEdu: 'Éducation',
    navContacts: 'Contact',
    btnDonate: 'Faire un Don',
    btnLanguage: 'Langue',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Apprendre à lire et à écrire',
    heroTitleLinker: 'est un ',
    heroTitleItalic: 'droit humain',
    heroDesc: 'L\'éducation ouvre des portes. Grâce à l\'alphabétisation, les femmes peuvent acquérir les compétences, la confiance et les opportunités nécessaires pour façonner leur propre avenir.',
    heroRegPlaceholder: 'Entrez votre adresse email',
    heroRegBtn: 'S’inscrire à la newsletter',

    missionTitle: 'Notre Mission',
    missionText: 'Éradiquer l’analphabétisme des femmes adultes à la racine. Grâce à un programme adapté, des transports sécurisés, une crèche et des tablettes numériques, nous favorisons l’autonomie de nos élèves.',

    discSub: '',
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

    footDesc: 'Apprendre à lire et à écrire est un droit humain.',
    footNav: 'Liens rapides',
    footContact: 'Contact',
    footStay: 'Rejoignez notre communauté',
    footSubText: 'Inscrivez-vous à notre newsletter pour suivre nos projets et nos résultats.',
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

    conTitle: 'Contactez-nous',
    conSub: 'Chaque conversation peut faire la différence.\nContactez-nous pour en savoir plus sur notre organisation, nos projets ou partenariats.',
    conName: 'Nom complet',
    conEmail: 'Email',
    conSubject: 'Motif du contact',
    conMessage: 'Écrivez votre message ici...',
    conMessageLabel: 'Message',
    conPhone: 'Numéro de téléphone',
    conOurEmail: 'Adresse e-mail',
    conOurPhone: 'Numéro de téléphone',
    conHeadOffice: 'Adresse du siège',
    conProgramSelect: '-- Sélectionner une option --',
    conSubjGen: "Demande d'information générale",
    conSubjVol: 'Bénévolat',
    conSubjPartner: 'Partenariat',
    conSubjSupport: 'Dons et sponsoring',
    conSubjOther: 'Autre',
    conRequiredFieldsText: "Les champs marqués d'un * sont obligatoires.",
    conSalutationLabel: 'Salutation',
    conSalutationSelect: '-- Sélectionnez une option --',
    conSalutationMr: 'M.',
    conSalutationMs: 'Mme',
    conSalutationDr: 'Dr.',
    conSalutationOther: 'Autre',
    conSend: 'Envoyer le message',
    conSuccess: 'Merci, {name}! Votre message a bien été envoyé à notre équipe communautaire.',
    conRobotVerification: "Je ne suis pas un robot",
    conRobotError: "Veuillez vérifier que vous n'êtes pas un robot.",

    newsTitle: 'Rejoignez nous',
    newsSub: 'Restez informé de nos projets, réalisations et impact.',
    newsName: 'Nom complet',
    newsEmail: 'Email',
    newsConsent: 'J\'accepte de recevoir des informations sur les projets et les activités de Likro & Lihtov.',
    newsSubmit: 'S\'abonner',
    newsSuccess: 'Félicitations, {name}! Vous êtes maintenant abonné aux mises à jour de Likro & Lihtov.',

    cookieText: 'Nous utilisons des cookies, des pixels et des technologies de suivi similaires pour optimiser les performances du site, analyser la fréquentation, mémoriser vos préférences linguistiques et soutenir nos missions d\'alphabétisation. En cliquant sur « Accepter », vous consentez à l\'utilisation de ces cookies conformément à notre',
    cookieAccept: 'Accepter',
    cookieDecline: 'Décliner',

    faqTitle: 'Foire Aux Questions (FAQ)'
  },
  ES: {
    navAbout: 'Quiénes somos',
    navAboutOrg: 'Organización',
    navAboutGoals: 'Programa escolar',
    navAboutTeam: 'Equipo',
    navAboutSponsors: 'Patrocinadores',
    navIlliteracy: 'Analfabetismo',
    navIlliteracyDef: 'Definición',
    navIlliteracyProg: 'Programa Escolar',
    navIlliteracyMedia: 'Fotos y Videos',
    navIlliteracyStats: 'Estadísticas',
    navIlliteracyCons: 'Consecuencias',
    navProjects: 'Proyectos',
    navProjectsEU: 'Colaboración UE',
    navProjectsConst: 'Construcción',
    navProjectsSec: 'Securidad',
    navProjectsEdu: 'Educación',
    navContacts: 'Contacto',
    btnDonate: 'Donar',
    btnLanguage: 'Idioma',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Aprender a leer y escribir',
    heroTitleLinker: 'es un ',
    heroTitleItalic: 'derecho humano',
    heroDesc: 'La educación abre puertas. A través de la alfabetización, las mujeres pueden adquirir las habilidades, la confianza y las oportunidades necesarias para forjar su propio futuro.',
    heroRegPlaceholder: 'Ingrese su correo electrónico',
    heroRegBtn: 'Registrar boletín',

    missionTitle: 'Nuestra Misión',
    missionText: 'Desmantelar el analfabetismo femenino adulto desde sus raíces. Con un plan de estudios adaptado, transporte privado y cuidado infantil, fomentamos la autonomía personal.',

    discSub: '',
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

    footDesc: 'Aprender a leer y escribir es un derecho humano',
    footNav: 'Enlaces rápidos',
    footContact: 'Contacto',
    footStay: 'Únase a nuestra comunidad',
    footSubText: 'Suscríbase a nuestro boletín para mantenerse actualizado sobre nuestros proyectos y logros.',
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

    conTitle: 'Póngase en contacto',
    conSub: 'Cada conversación puede marcar la diferencia.\nContáctenos para saber más sobre nuestra organización, proyectos o alianzas.',
    conName: 'Nombre completo',
    conEmail: 'Email',
    conSubject: 'Motivo de contacto',
    conMessage: 'Escriba su mensaje aquí...',
    conMessageLabel: 'Mensaje',
    conPhone: 'Número de teléfono',
    conOurEmail: 'Dirección de correo',
    conOurPhone: 'Número de teléfono',
    conHeadOffice: 'Dirección de la oficina',
    conProgramSelect: '-- Seleccionar opción --',
    conSubjGen: 'Consulta general',
    conSubjVol: 'Voluntariado',
    conSubjPartner: 'Alianza',
    conSubjSupport: 'Donaciones y patrocinio',
    conSubjOther: 'Otro',
    conRequiredFieldsText: 'Los campos marcados con * son obligatorios.',
    conSalutationLabel: 'Saludo',
    conSalutationSelect: '-- Seleccionar una opción --',
    conSalutationMr: 'Sr.',
    conSalutationMs: 'Sra.',
    conSalutationDr: 'Dr.',
    conSalutationOther: 'Otro',
    conSend: 'Enviar mensaje',
    conSuccess: '¡Gracias, {name}! Su mensaje ha sido enviado a nuestro equipo comunitario.',
    conRobotVerification: 'No soy un robot',
    conRobotError: 'Por favor, verifique que no es un robot.',

    newsTitle: 'Únete a nuestra comunidad',
    newsSub: 'Manténgase informado sobre nuestros proyectos, logros e impacto.',
    newsName: 'Nombre completo',
    newsEmail: 'Email',
    newsConsent: 'Acepto recibir actualizaciones sobre los proyectos y actividades de Likro & Lihtov.',
    newsSubmit: 'Suscribirse',
    newsSuccess: '¡Felicitaciones, {name}! Se ha suscrito exitosamente a las actualizaciones mensuales de Likro & Lihtov.',

    cookieText: 'Utilizamos cookies, píxeles y tecnologías de seguimiento similares para optimizar el rendimiento del sitio web, analizar el tráfico de visitantes, recordar sus preferencias de idioma y apoyar nuestras misiones educativas. Al hacer clic en "Aceptar", acepta el uso de estas cookies en su dispositivo de conformidad con nuestra',
    cookieAccept: 'Aceptar',
    cookieDecline: 'Declinar',

    faqTitle: 'Preguntas Frecuentes (FAQ)'
  }
};
