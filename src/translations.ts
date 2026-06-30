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
    navAboutGoals: 'Goals',
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

    sponTag: 'OUR SPONSORS',
    sponTitle: 'Supporting Education and Development Projects',
    sponSub: 'Supporting our schools and the development projects we carry out for local communities.',

    footDesc: 'Learning to Read and Write is a Human Right',
    footNav: 'Quick Links',
    footContact: 'Contact',
    footStay: 'Stay Updated',
    footSubText: 'Subscribe to our Newsletter',
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

    newsTitle: 'Stay Updated',
    newsSub: 'Stay updated with our news.',
    newsName: 'Full Name',
    newsEmail: 'Email',
    newsConsent: 'I would like to receive the Likro & Lihtov newsletter.',
    newsSubmit: 'Subscribe',
    newsSuccess: 'Subscription confirmed! You will soon receive updates about our news and project progress.',

    cookieText: 'We use cookies, pixels, and similar tracking technologies to optimize website performance, analyze visitor traffic patterns, remember your language preferences, and support our educational advocacy missions. By clicking "Accept", you agree to our',
    cookieAccept: 'Accept',
    cookieDecline: 'Decline',

    faqTitle: 'Frequently Asked Questions (FAQ)'
  },
  FR: {
    navAbout: 'Qui sommes-nous',
    navAboutOrg: 'Organisation',
    navAboutGoals: 'Nos objectifs',
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

    sponTag: 'NOS SPONSORS',
    sponTitle: 'Soutien à l\'éducation et aux projets de développement',
    sponSub: 'Ils soutiennent nos écoles et les projets de développement que nous menons au bénéfice des communautés locales.',

    footDesc: 'Apprendre à lire et à écrire est un droit humain.',
    footNav: 'Liens rapides',
    footContact: 'Contact',
    footStay: 'Restez informé',
    footSubText: 'Abonnez-vous à notre Newsletter',
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

    newsTitle: 'Restez informé',
    newsSub: 'Restez informé de nos actualités.',
    newsName: 'Nom complet',
    newsEmail: 'Email',
    newsConsent: 'Je souhaite recevoir la newsletter de Likro & Lihtov.',
    newsSubmit: 'S\'abonner',
    newsSuccess: 'Inscription confirmée ! Vous recevrez bientôt nos actualités et l\'avancement de nos projets.',

    cookieText: 'Nous utilisons des cookies, des pixels et des technologies de suivi similaires pour optimiser les performances du site, analyser la fréquentation, mémoriser vos préférences linguistiques et soutenir nos missions d\'alphabétisation. En cliquant sur « Accepter », vous consentez à l\'utilisation de ces cookies conformément à notre',
    cookieAccept: 'Accepter',
    cookieDecline: 'Décliner',

    faqTitle: 'Foire Aux Questions (FAQ)'
  },
  NL: {
    navAbout: 'Wie zijn wij',
    navAboutOrg: 'Organisatie',
    navAboutGoals: 'Onze doelen',
    navAboutTeam: 'Team',
    navAboutSponsors: 'Sponsors',
    navIlliteracy: 'Analfabetisme',
    navIlliteracyDef: 'Definitie',
    navIlliteracyProg: 'Schoolprogramma',
    navIlliteracyMedia: 'Foto\'s en Video\'s',
    navIlliteracyStats: 'Statistieken',
    navIlliteracyCons: 'Consequenties',
    navProjects: 'Projecten',
    navProjectsEU: 'EU-samenwerking',
    navProjectsConst: 'Bouw',
    navProjectsSec: 'Beveiliging',
    navProjectsEdu: 'Onderwijs',
    navContacts: 'Contact',
    btnDonate: 'Schenken',
    btnLanguage: 'Taal',

    heroSub: 'Likro & Lihtov',
    heroTitle1: 'Leren lezen en schrijven',
    heroTitleLinker: 'is een ',
    heroTitleItalic: 'mensenrecht',
    heroDesc: 'Onderwijs opent deuren. Door geletterdheid kunnen vrouwen de vaardigheden, het zelfvertrouwen en de kansen krijgen die ze nodig hebben om hun eigen toekomst vorm te geven.',
    heroRegPlaceholder: 'Voer uw e-mailadres in',
    heroRegBtn: 'Inschrijven nieuwsbrief',

    missionTitle: 'Onze Missie',
    missionText: 'Het uitbannen van analfabetisme onder volwassen vrouwen vanaf de basis. Door een aangepast leerplan, privévervoer en kinderopvang te bieden, stimuleren we persoonlijke autonomie.',

    discSub: '',
    discTitle: 'Ontdek onze werkterreinen',
    discDesc: 'Wij bieden een breed scala aan gespecialiseerde programma\'s voor volwassenen en architecturale initiatieven die een blijvende impact hebben. Klik om meer te lezen.',
    discIntl: 'Internationale samenwerking',
    discConst: 'Bouw',
    discSec: 'Beveiliging',
    discEdu: 'Onderwijs',
    discMore: 'Meer',

    sponTag: 'ONZE SPONSORS',
    sponTitle: 'Ondersteuning van onderwijs en ontwikkelingsprojecten',
    sponSub: 'Ondersteuning van onze scholen en de ontwikkelingsprojecten die wij uitvoeren ten voordele van lokale gemeenschappen.',

    footDesc: 'Leren lezen en schrijven is een mensenrecht',
    footNav: 'Snelle links',
    footContact: 'Contact',
    footStay: 'Blijf op de hoogte',
    footSubText: 'Abonneer u op onze Nieuwsbrief',
    footSubPlaceholder: 'Uw e-mailadres',
    footSubBtn: 'Abonneren',
    footCopy: '© 2026 Likro & Lihtov. Alle rechten voorbehouden.',

    donTitle: 'Steun Onze Missie',
    donSub: 'Uw bijdrage financiert rechtstreeks klaslokalen, veilig vervoer, kinderopvang en leertablets.',
    donCause: 'Sponsordoel',
    donCauseGen: 'Algemeen Onderwijs Fonds',
    donCauseTransit: 'Veilig Vervoer & Transitbeveiliging',
    donCauseSchool: 'Bouw van Nieuwe Klaslokalen',
    donCauseTeacher: 'Lerarensalaris & Training',
    donFullName: 'Volledige naam',
    donEmail: 'E-mailadres',
    donAmount: 'Selecteer donatiebedrag',
    donCustom: 'Aangepast bedrag',
    donSubmit: 'Donatie afronden',
    donSuccess: 'Bedankt! Uw donatie van {amount}$ voor {cause} is succesvol ontvangen.',

    conTitle: 'Neem contact op',
    conSub: 'Elk gesprek kan een verschil maken.\nNeem contact met ons op voor meer informatie over onze organisatie, projecten of partnerschappen.',
    conName: 'Volledige naam',
    conEmail: 'E-mail',
    conSubject: 'Reden voor contact',
    conMessage: 'Schrijf hier uw bericht...',
    conMessageLabel: 'Bericht',
    conPhone: 'Telefoonnummer',
    conOurEmail: 'E-mailadres',
    conOurPhone: 'Telefoonnummer',
    conHeadOffice: 'Kantooradres',
    conProgramSelect: '-- Selecteer optie --',
    conSubjGen: 'Algemene vraag',
    conSubjVol: 'Vrijwilligerswerk',
    conSubjPartner: 'Partnerschap',
    conSubjSupport: 'Donaties en sponsoring',
    conSubjOther: 'Andere',
    conRequiredFieldsText: 'Velden met een * zijn verplicht.',
    conSalutationLabel: 'Aanhef',
    conSalutationSelect: '-- Selecteer een optie --',
    conSalutationMr: 'Dhr.',
    conSalutationMs: 'Mevr.',
    conSalutationDr: 'Dr.',
    conSalutationOther: 'Andere',
    conSend: 'Bericht verzenden',
    conSuccess: 'Bedankt, {name}! Uw bericht is verzonden naar ons gemeenschapsteam.',
    conRobotVerification: 'Ik ben geen robot',
    conRobotError: 'Verifieer alstublieft dat u geen robot bent.',

    newsTitle: 'Blijf op de hoogte',
    newsSub: 'Blijf op de hoogte van ons nieuws.',
    newsName: 'Volledige naam',
    newsEmail: 'E-mail',
    newsConsent: 'Ik wil de nieuwsbrief van Likro & Lihtov ontvangen.',
    newsSubmit: 'Abonneren',
    newsSuccess: 'Abonnement bevestigd! U ontvangt binnenkort updates over ons nieuws en de voortgang van onze projecten.',

    cookieText: 'Wij gebruiken cookies, pixels en soortgelijke trackingtechnologieën om de prestaties van de website te optimaliseren, het bezoekersverkeer te analyseren, uw taalvoorkeuren te onthouden en onze educatieve missies te ondersteunen. Door op "Accepteren" te klikken, stemt u in met het gebruik van deze cookies op uw apparaat in overeenstemming met ons',
    cookieAccept: 'Accepteren',
    cookieDecline: 'Weigeren',

    faqTitle: 'Veelgestelde vragen (FAQ)'
  }
};
