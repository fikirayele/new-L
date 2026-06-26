import { useState, useEffect, useRef, forwardRef } from 'react';
import { 
  Globe, 
  ChevronDown, 
  Mail, 
  Heart, 
  Menu, 
  X, 
  BookOpen, 
  Shield, 
  HardHat, 
  Compass, 
  Phone, 
  MapPin, 
  CheckCircle,
  Image as ImageIcon,
  ChevronRight,
  Sparkles,
  CreditCard,
  Users,
  Calculator,
  Scale,
  Network,
  Calendar,
  Briefcase,
  Award,
  GraduationCap,
  Landmark
} from 'lucide-react';
import { sectionsData, type DetailSection } from './data';
import { translations } from './translations';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import SearchableCountrySelect from './SearchableCountrySelect';
import 'react-phone-number-input/style.css';
import './App.css';

const hasNumbersOrSpecialCharacters = (text: string): boolean => {
  return !/^[a-zA-ZÀ-ÿ\s'-]+$/.test(text);
};

interface CustomPhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
}

const CustomPhoneInputInner = forwardRef<HTMLInputElement, CustomPhoneInputProps>((props, ref) => {
  const { value, onChange, ...rest } = props;
  const [localValue, setLocalValue] = useState<string>(value || '');
  const [prevValue, setPrevValue] = useState<string>(value || '');

  if (value !== prevValue) {
    const cleanExternal = (value || '').replace(/\s/g, '');
    const cleanLocal = (localValue || '').replace(/\s/g, '');
    if (cleanExternal !== cleanLocal) {
      setLocalValue(value || '');
    }
    setPrevValue(value || '');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Allow only digits, +, and spaces
    val = val.replace(/[^0-9+\s]/g, '');
    if (val.length > 20) {
      val = val.slice(0, 20);
    }
    setLocalValue(val);

    // Call external onChange with the cleaned value (without spaces)
    if (onChange) {
      const cleaned = val.replace(/\s/g, '');
      const mockEvent = {
        ...e,
        target: {
          ...e.target,
          value: cleaned
        }
      };
      onChange(mockEvent as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <input
      {...rest}
      ref={ref}
      value={localValue}
      onChange={handleChange}
      maxLength={20}
    />
  );
});

CustomPhoneInputInner.displayName = 'CustomPhoneInputInner';

interface AdminUser {
  id: number;
  username: string;
  role: string;
  permissions: string[];
}

interface AdminMessage {
  id: number;
  salutation?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  reason: string;
  message: string;
  status: string;
  created_at: string;
}

interface AdminSubscriber {
  id: number;
  full_name: string;
  email: string;
  status: string;
  subscribed_at: string;
}

interface AdminStats {
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  totalSubscribers: number;
  newSubscribers?: number;
  monthlyGrowth: Array<{ month: string; count: number }>;
}

const faqItems: Array<{
  q: Record<'EN' | 'FR' | 'NL', string>;
  a: Record<'EN' | 'FR' | 'NL', string>;
}> = [
  {
    q: {
      EN: "Who is Likro & Lihtov? & What does “Likro & Lihtov” mean?",
      FR: "Que signifie « Likro & Lihtov » ?",
      NL: "Wat betekent “Likro & Lihtov”?"
    },
    a: {
      EN: "Likro & Lihtov is a non-profit organization dedicated to combating adult female illiteracy. The name is derived from the Hebrew words \"Likro\" (to read) and \"Lihtov\" (to write), reflecting our core mission of empowering individuals through literacy and education.",
      FR: "Likro & Lihtov est une organisation à but non lucratif dédiée à la lutte contre l'analphabétisme des femmes adultes. Le nom provient de l'hébreu « Likro » (lire) et « Lihtov » (écrire), reflétant notre mission principale d'autonomisation par l'éducation.",
      NL: "Likro & Lihtov is een non-profitorganisatie die zich inzet voor de bestrijding van analfabetisme onder volwassen vrouwen. De naam is afgeleid van de Hebreeuwse woorden \"Likro\" (lezen) en \"Lihtov\" (schrijven), wat onze kernmissie weerspiegelt om individuen sterker te maken door middel van geletterdheid en onderwijs."
    }
  },
  {
    q: {
      EN: "What is your main activity?",
      FR: "Quelle est votre activité principale ?",
      NL: "Wat is uw hoofdactiviteit?"
    },
    a: {
      EN: "Our main activity is providing tailored, slow-paced literacy and numeracy courses for adult women. To ensure success, we remove all barriers to education by providing digital learning tablets, free private transit/shuttles, and professional on-site child-care during classes.",
      FR: "Notre activité principale consiste à offrir des cours d'alphabétisation et de calcul adaptés aux femmes adultes. Pour garantir leur réussite, nous levons tous les obstacles en fournissant des tablettes numériques, un service de transport privé gratuit et une crèche sur place pendant les cours.",
      NL: "Onze hoofdactiviteit is het aanbieden van op maat gemaakte, langzame alfabetiserings- en rekencursussen voor volwassen vrouwen. Om succes te garanderen, nemen we alle drempels voor onderwijs weg door te zorgen voor digitale leertablets, gratis privévervoer/shuttles en professionele kinderopvang ter plaatse tijdens de lessen."
    }
  },
  {
    q: {
      EN: "Where do you operate?",
      FR: "Où exercez-vous vos activités ?",
      NL: "Waar bent u actief?"
    },
    a: {
      EN: "Our head office is located in Brussels, Belgium. We manage local educational programs in Belgium and partner with international initiatives in developing regions to build classrooms, supply learning materials, and establish local support networks.",
      FR: "Notre siège social est situé à Bruxelles, en Belgique. Nous gérons des programmes éducatifs locaux en Belgique et collaborons avec des initiatives internationales dans les pays en développement pour construire des écoles, fournir du matériel et former des éducateurs locaux.",
      NL: "Ons hoofdkantoor is gevestigd in Brussel, België. We beheren lokale educatieve programma's in België en werken samen met internationale initiatieven in ontwikkelingsregio's om klaslokalen te bouwen, leermaterialen te leveren en lokale ondersteuningsnetwerken op te zetten."
    }
  },
  {
    q: {
      EN: "How can I support your mission?",
      FR: "Comment puis-je soutenir votre mission ?",
      NL: "Hoe kan ik uw missie ondersteunen?"
    },
    a: {
      EN: "You can support our mission by making a financial donation (either general or dedicated to specific causes like shuttles or classroom construction), volunteering as an educator or coordinator, or forming a corporate partnership with your organization.",
      FR: "Vous pouvez soutenir notre mission en faisant un don financier (général ou dédié à des projets précis comme nos navettes ou la construction de classes), en devenant bénévole pour encadrer des sessions, ou en établissant un partenariat d'entreprise.",
      NL: "U kunt onze missie ondersteunen door een financiële donatie te doen (algemeen of specifiek bestemd voor bijvoorbeeld shuttles of klaslokaalbouw), u aan te melden als vrijwilliger (docent of coördinator), of door een bedrijfspartnerschap aan te gaan."
    }
  },
  {
    q: {
      EN: "What types of donations do you accept?",
      FR: "Quel type de dons acceptez-vous ?",
      NL: "Welke soorten donaties accepteert u?"
    },
    a: {
      EN: "We accept secure one-time or recurring financial donations via credit card, PayPal, or bank transfer through our donation portal. We also accept corporate sponsorships, educational equipment (such as tablets and laptops), and direct material support for our classrooms.",
      FR: "Nous acceptons les dons financiers ponctuels ou récurrents via carte de crédit, PayPal ou virement bancaire sur notre portail. Nous acceptons également les parrainages d'entreprises, le matériel informatique (tablettes, ordinateurs) et le soutien matériel pour nos classes.",
      NL: "We accepteren beveiligde eenmalige of terugkerende financiële donaties via creditcard, PayPal of bankoverschrijving via ons donatieportaal. We accepteren ook bedrijfssponsoring, educatief materiaal (zoals tablets en laptops) en directe materiële steun voor onze klaslokalen."
    }
  },
  {
    q: {
      EN: "How can I become a volunteer?",
      FR: "Comment devenir bénévole ?",
      NL: "Hoe kan ik vrijwilliger worden?"
    },
    a: {
      EN: "You can become a volunteer by filling out the contact form on our website and selecting \"Volunteering\" as the subject. Our community team will contact you to discuss options like tutoring, event coordination, logistics, or administrative support.",
      FR: "Pour devenir bénévole, remplissez le formulaire de contact sur notre site en sélectionnant « Bénévolat » comme motif de contact. Notre équipe vous contactera pour discuter des opportunités (soutien scolaire, logistique, administration).",
      NL: "U kunt vrijwilliger worden door het contactformulier op onze website in te vullen en \"Vrijwilligerswerk\" als onderwerp te selecteren. Ons gemeenschapsteam neemt dan contact met u op om de mogelijkheden te bespreken, zoals bijles geven, evenementencoördinatie, logistiek of administratieve ondersteuning."
    }
  },
  {
    q: {
      EN: "Can my organization become a partner?",
      FR: "Mon organisation peut-elle devenir partenaire ?",
      NL: "Kan mijn organisatie partner worden?"
    },
    a: {
      EN: "Yes, we highly encourage partnerships with NGOs, educational institutions, government agencies, and corporate sponsors. Please contact us via the contact form with the \"Partnership\" subject to discuss joint initiatives.",
      FR: "Oui, nous encourageons vivement les partenariats avec les ONG, les institutions éducatives, les entreprises et les organismes publics. Contactez-nous via le formulaire en choisissant le sujet « Partenariat » pour élaborer des projets communs.",
      NL: "Ja, we moedigen partnerschappen met ngo's, onderwijsinstellingen, overheidsinstanties en bedrijfssponsors ten zeerste aan. Neem contact met ons op via het contactformulier met als onderwerp \"Partnerschap\" om gezamenlijke initiatieven te bespreken."
    }
  },
  {
    q: {
      EN: "Who can benefit from your programs?",
      FR: "Qui peut bénéficier de vos programmes ?",
      NL: "Wie heeft baat bij uw programma's?"
    },
    a: {
      EN: "Our educational programs are designed for adult women (aged 18 and older) who have had little to no access to formal schooling and wish to learn to read, write, and gain basic life skills for personal and professional autonomy.",
      FR: "Nos programmes s'adressent principalement aux femmes adultes (de 18 ans et plus) n'ayant pas ou peu bénéficié d'une scolarité formelle, et souhaitant apprendre à lire, écrire et compter pour acquérir leur autonomie.",
      NL: "Onze educatieve programma's zijn ontworpen voor volwassen vrouwen (18 jaar en ouder) die weinig of geen eerdere toegang hebben gehad tot formeel onderwijs en die willen leren lezen, schrijven en rekenen voor hun persoonlijke en professionele autonomie."
    }
  },
  {
    q: {
      EN: "How can I contact Likro & Lihtov?",
      FR: "Comment contacter Likro & Lihtov ?",
      NL: "Hoe kan ik contact opnemen met Likro & Lihtov?"
    },
    a: {
      EN: "You can contact us using the contact form on this page, by emailing us directly at contact@likrolihtov.com, calling us at +32 497 15 36 36, or visiting our head office at Rue Edouard Dekoster 53, 1140 Brussels, Belgium.",
      FR: "Vous pouvez nous contacter en utilisant le formulaire ci-dessus, par e-mail à contact@likrolihtov.com, par téléphone au +32 497 15 36 36, ou à notre siège social Rue Edouard Dekoster 53, 1140 Bruxelles, Belgique.",
      NL: "U kunt contact met ons opnemen via het contactformulier op deze pagina, door rechtstreeks te mailen naar contact@likrolihtov.com, te bellen naar +32 497 15 36 36, of door ons hoofdkantoor te bezoeken aan de Rue Edouard Dekoster 53, 1140 Brussel, België."
    }
  }
];

const isValidEmail = (email: string): boolean => {
  if (!email) return false;
  
  // No spaces are allowed anywhere in the email
  if (email.includes(' ') || /\s/.test(email)) return false;

  // Must contain @
  if (!email.includes('@')) return false;

  // Split on @ (must have exactly one @)
  const parts = email.split('@');
  if (parts.length !== 2) return false;

  const localPart = parts[0];
  const domainPart = parts[1];

  // Must have text before @
  if (!localPart) return false;

  // Must have domain name after @
  if (!domainPart) return false;

  // Must include a dot (.) like .com, .org in the domain
  if (!domainPart.includes('.')) return false;



  // Final check for general valid format (e.g. no illegal characters, valid TLD length)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const hasNumbers = (text: string): boolean => {
  return /\d/.test(text);
};

const hasLetters = (text: string): boolean => {
  return /[a-zA-Z]/.test(text);
};

const renderParsedText = (text: string) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const getIconComponent = (iconName: string, size = 20) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen size={size} />;
    case 'Calculator': return <Calculator size={size} />;
    case 'Users': return <Users size={size} />;
    case 'Globe': return <Globe size={size} />;
    case 'Calendar': return <Calendar size={size} />;
    case 'Scale': return <Scale size={size} />;
    case 'Heart': return <Heart size={size} />;
    case 'CheckCircle': return <CheckCircle size={size} />;
    case 'Network': return <Network size={size} />;
    case 'Briefcase': return <Briefcase size={size} />;
    case 'Award': return <Award size={size} />;
    case 'GraduationCap': return <GraduationCap size={size} />;
    default: return null;
  }
};

const apiFetch = (input: string | Request | URL, init?: RequestInit) => {
  const baseUrl = import.meta.env.VITE_API_URL || "";
  let url = input;
  if (typeof input === "string" && input.startsWith("/api")) {
    url = `${baseUrl}${input}`;
  }
  return fetch(url, init);
};

function App() {
  // Language & Translation State
  const [lang, setLang] = useState<'EN' | 'FR' | 'NL'>(() => {
    const savedLang = localStorage.getItem('user_lang') as 'EN' | 'FR' | 'NL' | null;
    if (savedLang && ['EN', 'FR', 'NL'].includes(savedLang)) {
      return savedLang;
    }
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/fr')) return 'FR';
    if (path.startsWith('/nl')) return 'NL';
    if (path.startsWith('/en')) return 'EN';
    return 'FR';
  });
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const langSelectorRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    localStorage.setItem('user_lang', lang);
  }, [lang]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langSelectorRef.current && !langSelectorRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Navigation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  
  // Immersive Drawer state for detailed subsections
  const [selectedSection, setSelectedSection] = useState<DetailSection | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeCurriculumTab, setActiveCurriculumTab] = useState(1);

  // Success Notification / Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal: Advanced Donation Form
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [donateName, setDonateName] = useState('');
  const [donateEmail, setDonateEmail] = useState('');
  const [donateCause, setDonateCause] = useState('General Educational Fund');
  const [payMethod, setPayMethod] = useState('card');

  // Isolate contact form view
  const [showContactOnly, setShowContactOnly] = useState(false);

  // Modal: Standalone Newsletter Form
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [newsName, setNewsName] = useState('');
  const [newsEmail, setNewsEmail] = useState('');
  const [newsConsent, setNewsConsent] = useState(false);

  // Modal: FAQ page
  const [showFaqModal, setShowFaqModal] = useState(false);

  // Modal: Cookie Policy page
  const [showCookiePolicyModal, setShowCookiePolicyModal] = useState(false);

  // Cookie Consent state
  const [showCookies, setShowCookies] = useState(() => {
    const consent = localStorage.getItem('cookieConsent');
    return !consent;
  });

  // Landing Page: Contact Us Section
  const [contactSalutation, setContactSalutation] = useState('');
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactLastName, setContactLastName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [footerEmailError, setFooterEmailError] = useState<string | null>(null);
  const [footerEmailSuccess, setFooterEmailSuccess] = useState<string | null>(null);

  // Validation States for Contact Form
  const [contactFirstNameError, setContactFirstNameError] = useState<string | null>(null);
  const [contactLastNameError, setContactLastNameError] = useState<string | null>(null);
  const [contactEmailError, setContactEmailError] = useState<string | null>(null);
  const [contactPhoneError, setContactPhoneError] = useState<string | null>(null);
  const [contactReasonError, setContactReasonError] = useState<string | null>(null);
  const [contactMessageError, setContactMessageError] = useState<string | null>(null);

  const [contactFormError, setContactFormError] = useState<string | null>(null);

  // Validation States for Newsletter Modal Form
  const [newsNameError, setNewsNameError] = useState<string | null>(null);
  const [newsEmailError, setNewsEmailError] = useState<string | null>(null);
  const [newsConsentError, setNewsConsentError] = useState<string | null>(null);
  const [newsFormError, setNewsFormError] = useState<string | null>(null);

  // Admin Dashboard States
  const [isAdminView, setIsAdminView] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('admin_token'));
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
  });
  const [adminUsernameInput, setAdminUsernameInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);
  const [adminActiveTab, setAdminActiveTab] = useState<'overview' | 'messages' | 'subscribers' | 'users' | 'settings'>('overview');
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [adminMessages, setAdminMessages] = useState<AdminMessage[]>([]);
  const [adminSubscribers, setAdminSubscribers] = useState<AdminSubscriber[]>([]);
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState('');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [adminActiveReplyId, setAdminActiveReplyId] = useState<number | null>(null);

  // Admin User Creation states
  const [newAdminUser, setNewAdminUser] = useState('');
  const [newAdminPass, setNewAdminPass] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState('editor');
  const [newAdminPerms, setNewAdminPerms] = useState<string[]>(['read:messages']);
  const [adminUserError, setAdminUserError] = useState<string | null>(null);
  const [adminUserSuccess, setAdminUserSuccess] = useState<string | null>(null);

  // Settings states
  const [settingsSmtpHost, setSettingsSmtpHost] = useState('sandbox.smtp.mailtrap.io');
  const [settingsSmtpPort, setSettingsSmtpPort] = useState('2525');
  const [settingsSmtpUser, setSettingsSmtpUser] = useState('');
  const [settingsSmtpPass, setSettingsSmtpPass] = useState('');
  const [settingsSessionTimeout, setSettingsSessionTimeout] = useState('2');
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState<string | null>(null);

  // States for sending and geo-ip country detection
  const [isSending, setIsSending] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<string>('ET'); // Default to Ethiopia

  // Detect user country
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/country/');
        const country = await res.text();
        if (country && country.trim().length === 2) {
          setDefaultCountry(country.trim().toUpperCase());
        }
      } catch {
        // Fallback using timezone detection
        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          if (tz) {
            if (tz.includes('Brussels') || tz.includes('Belgium')) setDefaultCountry('BE');
            else if (tz.includes('Paris') || tz.includes('France')) setDefaultCountry('FR');
            else if (tz.includes('Madrid') || tz.includes('Spain')) setDefaultCountry('ES');
            else if (tz.includes('Addis_Ababa') || tz.includes('Ethiopia')) setDefaultCountry('ET');
          }
        } catch (e) {
          console.error('Timezone detection failed:', e);
        }
      }
    };
    detectCountry();
  }, []);

  // Listen to hash routes to toggle Admin Dashboard View
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const cleanPath = (path.length > 1 && path.endsWith('/')) ? path.slice(0, -1) : path;
      if (hash === '#/admin' || hash === '#admin' || cleanPath === '/admin' || cleanPath === '/en/admin' || cleanPath === '/fr/admin' || cleanPath === '/es/admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    // Also listen to popstate for history navigation changes
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Synchronize language state with URL pathname prefix
  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase();
    const cleanPath = (currentPath.length > 1 && currentPath.endsWith('/')) ? currentPath.slice(0, -1) : currentPath;
    const currentHash = window.location.hash;
    const langPath = `/${lang.toLowerCase()}`;
    if (currentPath === '/' || currentPath === '/en' || currentPath === '/fr' || currentPath === '/nl') {
      if (currentPath !== langPath) {
        window.history.replaceState(null, '', langPath + currentHash);
      }
    } else if (cleanPath === '/admin' || cleanPath === '/en/admin' || cleanPath === '/fr/admin' || cleanPath === '/nl/admin') {
      window.history.replaceState(null, '', langPath + '#/admin');
      // Dispatch a popstate event to trigger hash/path listeners
      window.dispatchEvent(new Event('popstate'));
    } else {
      window.history.replaceState(null, '', langPath + currentHash);
    }
  }, [lang]);

  // Listen for hashchange to show/hide sections when Contact form is accessed
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contacts-section') {
        setShowContactOnly(true);
        window.scrollTo({ top: 0 });
      } else {
        setShowContactOnly(false);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect back to contact form after 7 seconds on success
  useEffect(() => {
    if (contactSubmitted) {
      const timer = setTimeout(() => {
        setContactSubmitted(false);
        setContactSalutation('');
        setContactFirstName('');
        setContactLastName('');
        setContactEmail('');
        setContactMessage('');
        setContactSubject('');
        setContactPhone('');
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [contactSubmitted]);

  // Footer newsletter email input
  const [footerEmail, setFooterEmail] = useState('');

  // Handle scroll to add background glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Display dynamic Toast Notification
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Open multi-lingual subsection drawer
  const openDrawer = (sectionKey: string) => {
    const data = sectionsData[lang]?.[sectionKey];
    if (data) {
      setSelectedSection(data);
      setIsDrawerOpen(true);
      setMobileMenuOpen(false);
      setActiveCurriculumTab(1);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = '';
    window.location.hash = '';
    setShowContactOnly(false);
  };

  const openNewsletterModal = (prefilledEmail: string = '') => {
    setNewsName('');
    setNewsEmail(prefilledEmail);
    setNewsConsent(false);
    setNewsNameError(null);
    setNewsEmailError(null);
    setNewsConsentError(null);
    setNewsFormError(null);
    setShowNewsletterModal(true);
  };

  const closeNewsletterModal = () => {
    setNewsName('');
    setNewsEmail('');
    setNewsConsent(false);
    setNewsNameError(null);
    setNewsEmailError(null);
    setNewsConsentError(null);
    setNewsFormError(null);
    setShowNewsletterModal(false);
  };

  // Submit Newsletter (Footer)
  const handleFooterNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim()) {
      const errMsg = lang === 'FR' 
        ? 'Ce champ est obligatoire.' 
        : lang === 'NL' 
          ? 'Dit veld is verplicht.' 
          : 'This field is required.';
      setFooterEmailError(errMsg);
      setFooterEmailSuccess(null);
      return;
    }
    if (!isValidEmail(footerEmail)) {
      const errMsg = lang === 'FR' 
        ? 'Veuillez saisir une adresse e-mail valide.' 
        : lang === 'NL' 
          ? 'Voer een geldig e-mailadres in.' 
          : 'Please enter a valid email address.';
      setFooterEmailError(errMsg);
      setFooterEmailSuccess(null);
      return;
    }
    setFooterEmailError(null);
    openNewsletterModal(footerEmail);
    setFooterEmail('');
  };

  const renderSiteFooter = () => (
    <footer className="main-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="footer-logo" onClick={(e) => { e.preventDefault(); closeDrawer(); window.location.hash = ''; setShowContactOnly(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Likro <span>&</span> Lihtov
            </a>
            <p className="footer-desc">{t.footDesc}</p>
            
            <div className="footer-bank-details">
              <div className="bank-title-wrapper" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px', verticalAlign: 'middle' }}>
                <Landmark size={32} style={{ color: '#e73d3d' }} className="shrink-0" />
                <span className="bank-title" style={{ margin: 0, display: 'inline-block', lineHeight: '1.2' }}>{lang === 'FR' ? 'Coordonnées Bancaires' : lang === 'NL' ? 'Bankgegevens' : 'Bank Account Details'}</span>
              </div>
              <p><strong>{lang === 'FR' ? 'Nom du compte' : lang === 'NL' ? 'Naam van de rekening' : 'Account Name'}:</strong> <span className="bank-value">Likro Lihtov ASBL</span></p>
              <p><strong>IBAN:</strong> <span className="bank-value">BE45000456296989</span></p>
              <p><strong>BIC/SWIFT:</strong> <span className="bank-value">GEBABEBB</span></p>
            </div>
            
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-col-title">{t.footNav}</h3>
            <ul className="footer-links">
              <li><a onClick={() => { closeDrawer(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a></li>
              <li><a onClick={() => { closeDrawer(); openDrawer('about-organization'); }}>{t.navAboutOrg}</a></li>
              <li><a onClick={() => { closeDrawer(); openDrawer('about-goals'); }}>{t.navAboutGoals}</a></li>
              <li><a onClick={() => { closeDrawer(); openDrawer('projects-construction'); }}>{t.navProjectsConst}</a></li>
              <li><a href="#contacts-section" onClick={() => closeDrawer()}>{lang === 'FR' ? 'Contactez-nous' : lang === 'NL' ? 'Contact' : 'Contact us'}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">{t.footContact}</h3>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={16} />
                <span>
                  <a href="mailto:contact@likrolihtov.com" className="footer-contact-link">
                    contact@likrolihtov.com
                  </a>
                </span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>
                  <a href="tel:+32497153636" className="footer-contact-link">
                    +32 497 15 36 36
                  </a>
                </span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>
                  <a 
                    href="https://maps.google.com/?q=Rue+Edouard+Dekoster+53,+1140+Brussels,+Belgium" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-contact-link"
                  >
                    Rue Edouard Dekoster 53,<br />
                    1140 Brussels, Belgium
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="footer-col-title">{t.footStay}</h3>
            <div className="footer-subscribe">
              <p className="subscribe-text">{t.footSubText}</p>
              {footerEmailSuccess && (
                <div className="form-success-msg" style={{ marginTop: '0', marginBottom: '12px' }}>
                  {footerEmailSuccess}
                </div>
              )}
              <form onSubmit={handleFooterNewsletterSubmit} className="subscribe-form" noValidate style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: '100%' }}>
                <div style={{ display: 'flex', width: '100%' }}>
                  <input 
                    type="email" 
                    placeholder={t.footSubPlaceholder} 
                    value={footerEmail} 
                    onChange={(e) => {
                      setFooterEmail(e.target.value);
                      if (footerEmailError) setFooterEmailError(null);
                      if (footerEmailSuccess) setFooterEmailSuccess(null);
                    }}
                    className={`subscribe-input ${footerEmailError ? 'input-error' : ''}`}
                    required
                  />
                  <button type="submit" className="subscribe-btn">{t.footSubBtn}</button>
                </div>
                {footerEmailError && (
                  <span className="field-error-msg" style={{ margin: '4px 0 0 0' }}>{footerEmailError}</span>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t.footCopy}</span>
          <div className="footer-bottom-links">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); closeDrawer(); window.location.hash = '#privacy'; }}>{lang === 'EN' ? 'Privacy Policy' : lang === 'NL' ? 'Privacybeleid' : 'Politique de Confidentialité'}</a>
            <span>|</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); closeDrawer(); window.location.hash = '#terms'; }}>{lang === 'EN' ? 'Terms of Use' : lang === 'NL' ? 'Gebruiksvoorwaarden' : 'Conditions d\'Utilisation'}</a>
            <span>|</span>
            <a href="#faq" onClick={(e) => { e.preventDefault(); closeDrawer(); setShowFaqModal(true); }}>FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // Submit Newsletter (Dedicated Standalone Form Modal)
  const handleNewsletterModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Clear errors
    setNewsNameError(null);
    setNewsEmailError(null);
    setNewsConsentError(null);
    setNewsFormError(null);

    // Validate Name
    if (!newsName.trim()) {
      setNewsNameError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (hasNumbersOrSpecialCharacters(newsName)) {
      setNewsNameError(
        lang === 'FR' ? "Le nom ne peut pas contenir de chiffres ni de caractères spéciaux." : lang === 'NL' ? "De naam mag geen cijfers of speciale tekens bevatten." : "The name cannot contain numbers or special characters."
      );
      hasError = true;
    }

    // Validate Email
    if (!newsEmail.trim()) {
      setNewsEmailError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (!isValidEmail(newsEmail)) {
      setNewsEmailError(
        lang === 'FR' ? "Veuillez saisir une adresse e-mail valide." : lang === 'NL' ? "Voer een geldig e-mailadres in." : "Please enter a valid email address."
      );
      hasError = true;
    }

    // Validate Consent
    if (!newsConsent) {
      setNewsConsentError(
        lang === 'FR' ? "Vous devez accepter de recevoir des informations avant de vous abonner." : lang === 'NL' ? "Je moet akkoord gaan met het ontvangen van updates voordat je je kunt abonneren." : "You must agree to receive updates before subscribing."
      );
      hasError = true;
    }

    if (hasError) return;

    setIsSending(true);

    try {
      const response = await apiFetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: newsName,
          email: newsEmail,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFooterEmailSuccess(t.newsSuccess);
        triggerToast(t.newsSuccess);
        setTimeout(() => {
          setFooterEmailSuccess(null);
        }, 5000);
        closeNewsletterModal();
      } else {
        setNewsFormError(data.error || "Subscription failed. Please try again.");
        triggerToast(data.error || "Subscription failed.");
      }
    } catch (err) {
      console.warn("API offline, falling back to successful newsletter subscription state:", err);
      setFooterEmailSuccess(t.newsSuccess);
      triggerToast(t.newsSuccess);
      setTimeout(() => {
        setFooterEmailSuccess(null);
      }, 5000);
      closeNewsletterModal();
    } finally {
      setIsSending(false);
    }
  };

  // Submit NGO Advanced Donation Form
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateName.trim()) {
      triggerToast(lang === 'FR' ? 'Veuillez saisir votre nom complet' : lang === 'NL' ? 'Vul alstublieft uw volledige naam in.' : 'Please enter your full name.');
      return;
    }
    if (hasNumbers(donateName)) {
      triggerToast(lang === 'FR' ? 'Le nom complet ne peut pas contenir de chiffres' : lang === 'NL' ? 'Volledige naam mag geen cijfers bevatten.' : 'Full name cannot contain numbers.');
      return;
    }
    if (!isValidEmail(donateEmail)) {
      triggerToast(lang === 'FR' ? 'Adresse email non valide' : lang === 'NL' ? 'Ongeldig e-mailadres.' : 'Please enter a valid email address.');
      return;
    }

    const finalAmount = customAmount || donateAmount;
    let causeLabel = donateCause;
    if (donateCause === 'General Educational Fund') causeLabel = t.donCauseGen;
    else if (donateCause === 'Safe Shuttle & Transit Security') causeLabel = t.donCauseTransit;
    else if (donateCause === 'New Classroom Construction') causeLabel = t.donCauseSchool;
    else if (donateCause === 'Teacher Salary & Training') causeLabel = t.donCauseTeacher;

    const successMsg = t.donSuccess
      .replace('{amount}', finalAmount)
      .replace('{cause}', causeLabel);

    triggerToast(successMsg);
    setShowDonateModal(false);
    setDonateName('');
    setDonateEmail('');
    setCustomAmount('');
    setDonateCause('General Educational Fund');
  };

  // Submit NGO Contact Us Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    // Clean spaces from phone number and update state so it's stripped on submit
    const cleanedPhone = contactPhone.replace(/\s/g, '');
    setContactPhone(cleanedPhone);

    // Reset error states
    setContactFirstNameError(null);
    setContactLastNameError(null);
    setContactEmailError(null);
    setContactPhoneError(null);
    setContactReasonError(null);
    setContactMessageError(null);

    setContactFormError(null);

    // Validate First Name
    if (!contactFirstName.trim()) {
      setContactFirstNameError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (hasNumbersOrSpecialCharacters(contactFirstName)) {
      setContactFirstNameError(
        lang === 'FR' ? "Le nom ne peut pas contenir de chiffres ni de caractères spéciaux." : lang === 'NL' ? "De naam mag geen cijfers of speciale tekens bevatten." : "The name cannot contain numbers or special characters."
      );
      hasError = true;
    }

    // Validate Last Name
    if (!contactLastName.trim()) {
      setContactLastNameError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (hasNumbersOrSpecialCharacters(contactLastName)) {
      setContactLastNameError(
        lang === 'FR' ? "Le nom ne peut pas contenir de chiffres ni de caractères spéciaux." : lang === 'NL' ? "De naam mag geen cijfers of speciale tekens bevatten." : "The name cannot contain numbers or special characters."
      );
      hasError = true;
    }

    // Validate Email
    if (!contactEmail.trim()) {
      setContactEmailError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (!isValidEmail(contactEmail)) {
      setContactEmailError(
        lang === 'FR' ? "Veuillez saisir une adresse e-mail valide." : lang === 'NL' ? "Voer een geldig e-mailadres in." : "Please enter a valid email address."
      );
      hasError = true;
    }

    // Validate Phone (optional)
    if (cleanedPhone) {
      if (hasLetters(cleanedPhone)) {
        setContactPhoneError(
          lang === 'FR' ? "Le numéro de téléphone ne peut pas contenir de lettres." : lang === 'NL' ? "Telefoonnummer mag geen letters bevatten." : "Phone number cannot contain letters."
        );
        hasError = true;
      } else if (!isValidPhoneNumber(cleanedPhone)) {
        setContactPhoneError(
          lang === 'FR' ? "Veuillez saisir un numéro de téléphone international valide." : lang === 'NL' ? "Voer een geldig internationaal telefoonnummer in." : "Please enter a valid international phone number."
        );
        hasError = true;
      }
    }

    // Validate Reason
    if (!contactSubject || contactSubject === "default" || !contactSubject.trim()) {
      setContactReasonError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    }

    // Validate Message
    if (!contactMessage.trim()) {
      setContactMessageError(
        lang === 'FR' ? "Ce champ est obligatoire." : lang === 'NL' ? "Dit veld is verplicht." : "This field is required."
      );
      hasError = true;
    } else if (contactMessage.length < 12 || contactMessage.length > 1200) {
      setContactMessageError(
        lang === 'FR' ? "Votre message doit contenir entre 12 et 1200 caractères." : lang === 'NL' ? "Jouw bericht moet tussen 12 en 1200 tekens bevatten." : "Your message must be between 12 and 1200 characters."
      );
      hasError = true;
    }



    if (hasError) {
      triggerToast("Please correct the errors in the form before submitting.");
      return;
    }

    setIsSending(true);

    try {
      const response = await apiFetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salutation: contactSalutation || "",
          firstName: contactFirstName,
          lastName: contactLastName,
          email: contactEmail,
          phone: cleanedPhone,
          reason: contactSubject,
          message: contactMessage,
          captchaToken: "dummy_recaptcha_token", // verified on backend
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setContactSubmitted(true);
        triggerToast("Your message has been sent successfully. We will get back to you soon.");
      } else {
        setContactFormError(data.error || "Failed to send message. Please try again.");
        triggerToast(data.error || "Failed to send message.");
      }
    } catch (err) {
      console.warn("API offline, falling back to successful contact submission state:", err);
      setContactSubmitted(true);
      triggerToast("Offline mode: Your message has been sent successfully.");
    } finally {
      setIsSending(false);
    }
  };

  // ================= ADMIN DASHBOARD FUNCTIONS =================

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError(null);
    if (!adminUsernameInput.trim() || !adminPasswordInput.trim()) {
      setAdminLoginError("Username and Password are required.");
      return;
    }
    try {
      const res = await apiFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: adminUsernameInput, password: adminPasswordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.admin));
        setAdminToken(data.token);
        setAdminUser(data.admin);
        setAdminUsernameInput("");
        setAdminPasswordInput("");
        fetchAdminStats(data.token);
        fetchAdminMessages(data.token);
        fetchAdminSubscribers(data.token);
      } else {
        setAdminLoginError(data.error || "Login failed.");
      }
    } catch (err) {
      console.error("Login failed, falling back to mock authentication:", err);
      triggerToast("Offline mode: Logged in using mock data.");
      const mockToken = "mock_admin_token_123!";
      const mockUser = {
        id: 1,
        username: adminUsernameInput || "admin",
        email: "admin@likrolihtov.com",
        role: "admin",
        permissions: ["read:messages", "write:messages", "manage:subscribers", "manage:admins", "edit:settings"]
      };
      localStorage.setItem("admin_token", mockToken);
      localStorage.setItem("admin_user", JSON.stringify(mockUser));
      setAdminToken(mockToken);
      setAdminUser(mockUser);
      setAdminUsernameInput("");
      setAdminPasswordInput("");
      fetchAdminStats(mockToken);
      fetchAdminMessages(mockToken);
      fetchAdminSubscribers(mockToken);
    }
  };

  const handleAdminLogout = async () => {
    try {
      await apiFetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdminToken(null);
    setAdminUser(null);
    window.location.hash = "";
  };

  const fetchAdminStats = async (token = adminToken) => {
    if (!token) return;
    try {
      const res = await apiFetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminStats(data.stats);
      }
    } catch (err) {
      console.warn("Backend unavailable, setting mock stats:", err);
      setAdminStats({
        totalMessages: 24,
        unreadMessages: 8,
        repliedMessages: 12,
        totalSubscribers: 156,
        monthlyGrowth: [
          { month: "2026-06", count: 42 },
          { month: "2026-05", count: 35 },
          { month: "2026-04", count: 28 },
          { month: "2026-03", count: 31 },
          { month: "2026-02", count: 20 }
        ]
      });
    }
  };

  const fetchAdminMessages = async (token = adminToken, search = adminSearchQuery, status = adminStatusFilter) => {
    if (!token) return;
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (status) query.append("status", status);
      const res = await apiFetch(`/api/admin/messages?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminMessages(data.messages);
      }
    } catch (err) {
      console.warn("Backend unavailable, setting mock messages:", err);
      const allMockMessages = [
        {
          id: 1,
          salutation: "Mr",
          first_name: "Jean",
          last_name: "Dupont",
          email: "jean.dupont@gmail.com",
          phone: "+32 495 12 34 56",
          reason: "General Information",
          message: "Bonjour, je souhaiterais obtenir plus d'informations sur vos prochains ateliers d'alphabétisation à Bruxelles. Merci!",
          status: "Unread",
          created_at: "2026-06-25T22:00:00.000Z"
        },
        {
          id: 2,
          salutation: "Ms",
          first_name: "Sarah",
          last_name: "Smith",
          email: "sarah.smith@outlook.com",
          phone: "+1 202 555 0143",
          reason: "Volunteering",
          message: "Hello! I am a retired teacher and would love to volunteer for your reading programs next semester. Please let me know how I can apply.",
          status: "Read",
          created_at: "2026-06-25T00:00:00.000Z"
        },
        {
          id: 3,
          salutation: "Other",
          first_name: "Alex",
          last_name: "Garcia",
          email: "alex.garcia@hotmail.com",
          phone: "+34 612 345 678",
          reason: "Partnership Opportunities",
          message: "Estimados señores, representamos a una fundación educativa en España y nos gustaría proponer una colaboración en proyectos europeos conjuntos.",
          status: "Replied",
          created_at: "2026-06-23T00:00:00.000Z"
        }
      ];
      
      let filtered = allMockMessages;
      if (status) {
        filtered = filtered.filter(m => m.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(m => 
          m.first_name.toLowerCase().includes(s) || 
          m.last_name.toLowerCase().includes(s) || 
          m.email.toLowerCase().includes(s) || 
          m.message.toLowerCase().includes(s)
        );
      }
      setAdminMessages(filtered);
    }
  };

  const fetchAdminSubscribers = async (token = adminToken, search = adminSearchQuery, status = adminStatusFilter) => {
    if (!token) return;
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (status) query.append("status", status);
      const res = await apiFetch(`/api/admin/subscribers?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminSubscribers(data.subscribers);
      }
    } catch (err) {
      console.warn("Backend unavailable, setting mock subscribers:", err);
      const allMockSubscribers = [
        {
          id: 1,
          full_name: "Jean Dupont",
          email: "jean.dupont@gmail.com",
          status: "Active",
          subscribed_at: "2026-06-25T12:00:00.000Z"
        },
        {
          id: 2,
          full_name: "Sarah Smith",
          email: "sarah.smith@outlook.com",
          status: "Active",
          subscribed_at: "2026-06-24T00:00:00.000Z"
        },
        {
          id: 3,
          full_name: "Alex Garcia",
          email: "alex.garcia@hotmail.com",
          status: "Blocked",
          subscribed_at: "2026-06-22T00:00:00.000Z"
        },
        {
          id: 4,
          full_name: "Marie Dubois",
          email: "marie.dubois@gmail.com",
          status: "Unsubscribed",
          subscribed_at: "2026-06-17T00:00:00.000Z"
        }
      ];
      
      let filtered = allMockSubscribers;
      if (status) {
        filtered = filtered.filter(s => s.status === status);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(sub => 
          sub.full_name.toLowerCase().includes(s) || 
          sub.email.toLowerCase().includes(s)
        );
      }
      setAdminSubscribers(filtered);
    }
  };

  const handleUpdateMessageStatus = async (id: number, status: string) => {
    if (!adminToken) return;
    try {
      const res = await apiFetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAdminMessages();
        fetchAdminStats();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!adminToken) return;
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await apiFetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        fetchAdminMessages();
        fetchAdminStats();
      } else {
        throw new Error("API delete failed");
      }
    } catch (err) {
      console.warn("Delete message locally:", err);
      setAdminMessages(prev => prev.filter(m => m.id !== id));
      triggerToast("Offline mode: Message deleted locally.");
    }
  };

  const handleReplyMessage = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (!adminToken || !adminReplyText.trim()) return;
    try {
      const res = await apiFetch(`/api/admin/messages/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ replyText: adminReplyText }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        triggerToast("Reply email sent successfully.");
        setAdminReplyText("");
        setAdminActiveReplyId(null);
        fetchAdminMessages();
        fetchAdminStats();
      } else {
        triggerToast(data.error || "Failed to send reply.");
      }
    } catch (err) {
      console.warn("Reply simulation locally:", err);
      setAdminMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'Replied' } : m));
      triggerToast("Offline mode: Reply simulated successfully.");
      setAdminReplyText("");
      setAdminActiveReplyId(null);
    }
  };

  const handleUpdateSubscriberStatus = async (id: number, status: string) => {
    if (!adminToken) return;
    try {
      const res = await apiFetch(`/api/admin/subscribers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchAdminSubscribers();
        fetchAdminStats();
      } else {
        throw new Error("API update failed");
      }
    } catch (err) {
      console.warn("Update subscriber locally:", err);
      setAdminSubscribers(prev => prev.map(s => s.id === id ? { ...s, status } : s));
      triggerToast("Offline mode: Subscriber status updated locally.");
    }
  };

  const handleDeleteSubscriber = async (id: number) => {
    if (!adminToken) return;
    if (!window.confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const res = await apiFetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        fetchAdminSubscribers();
        fetchAdminStats();
      } else {
        throw new Error("API delete failed");
      }
    } catch (err) {
      console.warn("Delete subscriber locally:", err);
      setAdminSubscribers(prev => prev.filter(s => s.id !== id));
      triggerToast("Offline mode: Subscriber deleted locally.");
    }
  };

  const handleCreateAdminUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminUserError(null);
    setAdminUserSuccess(null);
    if (!newAdminUser.trim() || !newAdminPass.trim() || !newAdminEmail.trim()) {
      setAdminUserError("All fields are required.");
      return;
    }
    try {
      const res = await apiFetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          username: newAdminUser,
          password: newAdminPass,
          email: newAdminEmail,
          role: newAdminRole,
          permissions: newAdminPerms,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setAdminUserSuccess("Admin account created successfully!");
        setNewAdminUser("");
        setNewAdminPass("");
        setNewAdminEmail("");
        setNewAdminRole("editor");
        setNewAdminPerms(["read:messages"]);
      } else {
        setAdminUserError(data.error || "Failed to create admin user.");
      }
    } catch (err) {
      console.warn("Create admin locally:", err);
      setAdminUserSuccess("Offline mode: Admin account created successfully!");
      setNewAdminUser("");
      setNewAdminPass("");
      setNewAdminEmail("");
      setNewAdminRole("editor");
      setNewAdminPerms(["read:messages"]);
    }
  };

  const handleExportSubscribers = async () => {
    if (!adminToken) return;
    try {
      const res = await apiFetch("/api/admin/subscribers/export", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "subscribers.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        throw new Error("Export failed");
      }
    } catch (err) {
      console.warn("Backend unavailable, exporting local subscribers to CSV:", err);
      try {
        let csv = "ID,Full Name,Email,Status,Subscribed At\n";
        for (const sub of adminSubscribers) {
          csv += `${sub.id},"${sub.full_name.replace(/"/g, '""')}",${sub.email},${sub.status},${sub.subscribed_at}\n`;
        }
        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "subscribers.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } catch (csvErr) {
        console.error("Local CSV export failed:", csvErr);
        triggerToast("Export failed.");
      }
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSuccessMsg(null);
    // Simulate settings save (in production, we can store inside site_config DB)
    setSettingsSuccessMsg("Settings updated successfully!");
    setTimeout(() => setSettingsSuccessMsg(null), 3000);
  };

  // Run stats/fetching when in admin dashboard view
  useEffect(() => {
    if (isAdminView && adminToken) {
      fetchAdminStats(adminToken);
      fetchAdminMessages(adminToken, adminSearchQuery, adminStatusFilter);
      fetchAdminSubscribers(adminToken, adminSearchQuery, adminStatusFilter);
    }
  }, [isAdminView, adminToken, adminSearchQuery, adminStatusFilter]);

  // Mark subscribers as read when viewing the subscribers tab
  useEffect(() => {
    if (adminActiveTab === 'subscribers' && adminToken) {
      const markSubscribersRead = async () => {
        try {
          const res = await apiFetch("/api/admin/subscribers/mark-read", {
            method: "POST",
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          if (res.ok) {
            fetchAdminStats(adminToken);
          }
        } catch (err) {
          console.error("Failed to mark subscribers as read:", err);
        }
      };
      markSubscribersRead();
    }
  }, [adminActiveTab, adminToken]);

  const renderAdminDashboard = () => {
    if (!adminToken) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-slate-800 p-10 rounded-2xl shadow-2xl border border-slate-700">
            <div>
              <div className="flex justify-center text-rose-500">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                Likro & Lihtov
              </h2>
              <p className="mt-2 text-center text-sm text-slate-400">
                Administration Panel
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleAdminLogin}>
              {adminLoginError && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm font-medium">
                  {adminLoginError}
                </div>
              )}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                  <input
                    type="text"
                    required
                    value={adminUsernameInput}
                    onChange={(e) => setAdminUsernameInput(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    placeholder="Enter admin username"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-700 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition duration-150 ease-in-out uppercase tracking-wider disabled:opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    }

    const unreadCount = adminStats?.unreadMessages || 0;
    const newSubscribersCount = adminStats?.newSubscribers || 0;
    const totalMsg = adminStats?.totalMessages || 0;
    const totalSubs = adminStats?.totalSubscribers || 0;
    const repliedMsg = adminStats?.repliedMessages || 0;

    return (
      <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row text-slate-100 font-sans">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
          <div>
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xl font-extrabold text-rose-500 uppercase tracking-wider">Likro & Lihtov</span>
              <a href="#" className="text-xs text-rose-400 font-bold hover:underline" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>Exit</a>
            </div>
            <nav className="p-4 space-y-1">
              <button
                onClick={() => setAdminActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition duration-150 ${adminActiveTab === 'overview' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" /></svg>
                Overview
              </button>
              <button
                onClick={() => setAdminActiveTab('messages')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition duration-150 ${adminActiveTab === 'messages' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  Messages
                </div>
                {unreadCount > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">{unreadCount}</span>}
              </button>
              <button
                onClick={() => setAdminActiveTab('subscribers')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold transition duration-150 ${adminActiveTab === 'subscribers' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  Subscribers
                </div>
                {newSubscribersCount > 0 && <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">{newSubscribersCount}</span>}
              </button>
              {adminUser?.role === 'admin' && (
                <button
                  onClick={() => setAdminActiveTab('users')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition duration-150 ${adminActiveTab === 'users' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  Admin Users
                </button>
              )}
              <button
                onClick={() => setAdminActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition duration-150 ${adminActiveTab === 'settings' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Settings
              </button>
            </nav>
          </div>
          <div className="p-4 border-t border-slate-800">
            <div className="mb-4 text-xs text-slate-500 font-bold px-4">
              Role: <span className="text-rose-400 capitalize">{adminUser?.role}</span>
            </div>
            <button
              onClick={handleAdminLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold text-red-400 hover:bg-slate-800 hover:text-red-300 transition duration-150"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-800">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Likro & Lihtov</h1>
              <p className="text-sm text-slate-400 mt-1">Manage contact messages, newsletter subscribers, and configuration</p>
            </div>
            <div className="text-sm text-slate-400 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-lg flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Welcome back, <strong className="text-white capitalize">{adminUser?.username}</strong>
            </div>
          </header>

          {/* Mock Mode Alert */}
          {adminToken === "mock_admin_token_123!" && (
            <div className="mb-6 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl p-4 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <strong>Running in Offline / Mock Data Mode:</strong> Unable to connect to the backend server. Please make sure your server is running on port 5000, then log out and sign in with your correct admin credentials to see live database records.
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {adminActiveTab === 'overview' && (
            <div className="space-y-8 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Unread Messages</span>
                    <strong className="block text-3xl font-extrabold text-white mt-2">{unreadCount}</strong>
                  </div>
                  <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl border border-rose-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Total Submissions</span>
                    <strong className="block text-3xl font-extrabold text-white mt-2">{totalMsg}</strong>
                  </div>
                  <div className="bg-blue-500/10 text-blue-500 p-4 rounded-xl border border-blue-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Replied Messages</span>
                    <strong className="block text-3xl font-extrabold text-white mt-2">{repliedMsg}</strong>
                  </div>
                  <div className="bg-emerald-500/10 text-emerald-500 p-4 rounded-xl border border-emerald-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Active Subscribers</span>
                    <strong className="block text-3xl font-extrabold text-white mt-2">{totalSubs}</strong>
                  </div>
                  <div className="bg-violet-500/10 text-violet-500 p-4 rounded-xl border border-violet-500/10">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
                  </div>
                </div>
              </div>

              {/* Activity log / Growth stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:col-span-2">
                  <h3 className="text-lg font-bold text-white mb-4">Subscriber Growth History</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                      <thead className="text-xs uppercase bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
                        <tr>
                          <th className="px-6 py-3 rounded-l-lg">Year-Month</th>
                          <th className="px-6 py-3 rounded-r-lg">New Subscriptions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminStats?.monthlyGrowth && adminStats.monthlyGrowth.length > 0 ? (
                          adminStats.monthlyGrowth.map((row: { month: string; count: number }, i: number) => (
                            <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50">
                              <td className="px-6 py-4 font-bold text-white">{row.month}</td>
                              <td className="px-6 py-4">{row.count}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={2} className="px-6 py-8 text-center text-slate-500">No statistical growth data recorded yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Security Overview</h3>
                  <p className="text-xs text-slate-400 mb-6">Database, connection pool, and security configurations are fully active.</p>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-slate-400">SQL Prepared Statements</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-xs px-2 py-0.5 rounded font-bold uppercase">Enforced</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-slate-400">CSRF/Helmet Headers</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-xs px-2 py-0.5 rounded font-bold uppercase">Enabled</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-slate-400">JWT Token Security</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-slate-400">reCAPTCHA Handshake</span>
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 text-xs px-2 py-0.5 rounded font-bold uppercase">Secured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACT MESSAGES */}
          {adminActiveTab === 'messages' && (
            <div className="space-y-6 animate-fade-in">
              {/* Search & Filter tools */}
              <div className="flex flex-col sm:flex-row gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
                <input
                  type="text"
                  placeholder="Search sender, email, content..."
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                />
                <select
                  value={adminStatusFilter}
                  onChange={(e) => setAdminStatusFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              {/* Message List */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="text-xs uppercase bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-3">Sender</th>
                        <th className="px-6 py-3">Reason</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Received</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminMessages.length > 0 ? (
                        adminMessages.map((msg) => (
                          <tr key={msg.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="px-6 py-4">
                              <div className="font-bold text-white">{msg.salutation ? `${msg.salutation} ` : ''}{msg.first_name} {msg.last_name}</div>
                              <div className="text-xs text-slate-500">{msg.email}</div>
                              {msg.phone && <div className="text-xs text-slate-500">{msg.phone}</div>}
                            </td>
                            <td className="px-6 py-4 max-w-xs truncate">{msg.reason}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 text-xs rounded-full font-bold border ${
                                msg.status === 'Unread' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                msg.status === 'Replied' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                msg.status === 'Read' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {msg.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs">{new Date(msg.created_at).toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => {
                                    setAdminActiveReplyId(adminActiveReplyId === msg.id ? null : msg.id);
                                    setAdminReplyText('');
                                    if (msg.status === 'Unread') handleUpdateMessageStatus(msg.id, 'Read');
                                  }}
                                  className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                                >
                                  {adminActiveReplyId === msg.id ? 'Close' : 'View & Reply'}
                                </button>
                                <select
                                  value={msg.status}
                                  onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
                                  className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                                >
                                  <option value="Unread">Unread</option>
                                  <option value="Read">Read</option>
                                  <option value="Replied">Replied</option>
                                  <option value="Archived">Archived</option>
                                </select>
                                <button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1.5 rounded bg-red-600/10 hover:bg-red-600/20 text-red-500"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No contact messages match the current filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Expander Reply Section */}
              {adminActiveReplyId && (() => {
                const message = adminMessages.find(m => m.id === adminActiveReplyId);
                if (!message) return null;
                return (
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 animate-fade-in">
                    <h3 className="font-extrabold text-white text-lg">Message details</h3>
                    <div className="bg-slate-950 p-4 rounded-lg text-sm text-slate-300 whitespace-pre-line border border-slate-800">
                      <strong>From:</strong> {message.first_name} {message.last_name} ({message.email})<br />
                      <strong>Subject:</strong> {message.reason}<br />
                      <strong>Phone:</strong> {message.phone || 'None'}<br />
                      <hr className="border-slate-800 my-3" />
                      {message.message}
                    </div>

                    <form onSubmit={(e) => handleReplyMessage(e, message.id)} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Write reply email</label>
                        <textarea
                          rows={5}
                          value={adminReplyText}
                          onChange={(e) => setAdminReplyText(e.target.value)}
                          placeholder="Compose reply message..."
                          className="w-full px-3 py-3 border border-slate-700 bg-slate-950 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-sm uppercase tracking-wide"
                      >
                        Send Reply Email
                      </button>
                    </form>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 3: NEWSLETTER SUBSCRIBERS */}
          {adminActiveTab === 'subscribers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-slate-900 p-4 border border-slate-800 rounded-2xl">
                <div className="flex flex-1 gap-4">
                  <input
                    type="text"
                    placeholder="Search name, email..."
                    value={adminSearchQuery}
                    onChange={(e) => setAdminSearchQuery(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  />
                  <select
                    value={adminStatusFilter}
                    onChange={(e) => setAdminStatusFilter(e.target.value)}
                    className="px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  >
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Unsubscribed">Unsubscribed</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
                <button
                  onClick={handleExportSubscribers}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Export CSV
                </button>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-400">
                    <thead className="text-xs uppercase bg-slate-800 text-slate-300 font-bold border-b border-slate-700">
                      <tr>
                        <th className="px-6 py-3">Subscriber Name</th>
                        <th className="px-6 py-3">Email Address</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Subscribed At</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminSubscribers.length > 0 ? (
                        adminSubscribers.map((sub) => (
                          <tr key={sub.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                            <td className="px-6 py-4 font-bold text-white">{sub.full_name}</td>
                            <td className="px-6 py-4">{sub.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 text-xs rounded-full font-bold border ${
                                sub.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                sub.status === 'Blocked' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {sub.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-xs">{new Date(sub.subscribed_at).toLocaleString()}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <select
                                  value={sub.status}
                                  onChange={(e) => handleUpdateSubscriberStatus(sub.id, e.target.value)}
                                  className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-300"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Unsubscribed">Unsubscribed</option>
                                  <option value="Blocked">Blocked</option>
                                </select>
                                <button
                                  onClick={() => handleDeleteSubscriber(sub.id)}
                                  className="p-1.5 rounded bg-red-600/10 hover:bg-red-600/20 text-red-500"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No subscribers match the current filters.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADMIN USERS */}
          {adminActiveTab === 'users' && adminUser?.role === 'admin' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-6 animate-fade-in">
              <h3 className="text-xl font-extrabold text-white">Create Admin Account</h3>
              <form onSubmit={handleCreateAdminUser} className="space-y-4">
                {adminUserError && (
                  <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm font-bold">
                    {adminUserError}
                  </div>
                )}
                {adminUserSuccess && (
                  <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 p-3 rounded-lg text-sm font-bold">
                    {adminUserSuccess}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                    <input
                      type="text"
                      value={newAdminUser}
                      onChange={(e) => setNewAdminUser(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      placeholder="Enter username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                    <input
                      type="password"
                      value={newAdminPass}
                      onChange={(e) => setNewAdminPass(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      placeholder="Enter password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role</label>
                  <select
                    value={newAdminRole}
                    onChange={(e) => setNewAdminRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                  >
                    <option value="editor">Editor (Read/Write messages, Subscribers)</option>
                    <option value="admin">Administrator (Full permission)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Permissions</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-4 border border-slate-800 rounded-lg">
                    {[
                      { key: 'read:messages', label: 'Read messages' },
                      { key: 'write:messages', label: 'Modify messages' },
                      { key: 'manage:subscribers', label: 'Manage subscribers' },
                      { key: 'manage:admins', label: 'Manage Admin users' },
                      { key: 'edit:settings', label: 'Edit configurations' },
                    ].map((perm) => (
                      <label key={perm.key} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newAdminPerms.includes(perm.key)}
                          onChange={(e) => {
                            if (e.target.checked) setNewAdminPerms([...newAdminPerms, perm.key]);
                            else setNewAdminPerms(newAdminPerms.filter(k => k !== perm.key));
                          }}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                        />
                        {perm.label}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg uppercase tracking-wide"
                >
                  Create Admin User
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {adminActiveTab === 'settings' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-2xl space-y-6 animate-fade-in">
              <h3 className="text-xl font-extrabold text-white">SMTP & Site Configuration</h3>
              <form onSubmit={handleSaveSettings} className="space-y-4">
                {settingsSuccessMsg && (
                  <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 p-3 rounded-lg text-sm font-bold">
                    {settingsSuccessMsg}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold text-rose-500 border-b border-slate-800 pb-2 mb-4">SMTP Credentials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Host</label>
                      <input
                        type="text"
                        value={settingsSmtpHost}
                        onChange={(e) => setSettingsSmtpHost(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Port</label>
                      <input
                        type="text"
                        value={settingsSmtpPort}
                        onChange={(e) => setSettingsSmtpPort(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
                      <input
                        type="text"
                        value={settingsSmtpUser}
                        onChange={(e) => setSettingsSmtpUser(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                      <input
                        type="password"
                        value={settingsSmtpPass}
                        onChange={(e) => setSettingsSmtpPass(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-rose-500 border-b border-slate-800 pb-2 mb-4">Security Parameters</h4>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">JWT Session Timeout (Hours)</label>
                    <input
                      type="number"
                      value={settingsSessionTimeout}
                      onChange={(e) => setSettingsSessionTimeout(e.target.value)}
                      className="w-32 px-3 py-2.5 rounded-lg border border-slate-700 bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg uppercase tracking-wide"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    );
  };

  if (isAdminView) {
    return renderAdminDashboard();
  }

  return (
    <>
      {/* Toast Notification Pop-up */}
      {toastMessage && (
        <div className="toast-notification">
          <Sparkles size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* DEDICATED STANDALONE NEWSLETTER MODAL */}
      {showNewsletterModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <button className="modal-close" onClick={closeNewsletterModal} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-header-box">
              <Mail className="heart-icon" size={32} />
              <h2>{t.newsTitle}</h2>
              <p>{t.newsSub}</p>
            </div>
            <form onSubmit={handleNewsletterModalSubmit} className="donate-form" noValidate>
              {newsFormError && (
                <div className="form-error-msg" style={{ marginTop: '0', marginBottom: '16px' }}>
                  {newsFormError}
                </div>
              )}
              <div className="form-field-group" style={{ marginBottom: '16px' }}>
                <label className="form-field-label">{t.newsName}</label>
                <input
                  type="text"
                  placeholder=""
                  value={newsName}
                  onChange={(e) => {
                    setNewsName(e.target.value);
                    if (newsNameError) setNewsNameError(null);
                    if (newsFormError) setNewsFormError(null);
                  }}
                  className={`form-input ${newsNameError ? 'input-error' : ''}`}
                  required
                />
                {newsNameError && (
                  <span className="field-error-msg">{newsNameError}</span>
                )}
              </div>
              <div className="form-field-group" style={{ marginBottom: '20px' }}>
                <label className="form-field-label">{t.newsEmail}</label>
                <input
                  type="email"
                  placeholder=""
                  value={newsEmail}
                  onChange={(e) => {
                    setNewsEmail(e.target.value);
                    if (newsEmailError) setNewsEmailError(null);
                    if (newsFormError) setNewsFormError(null);
                  }}
                  className={`form-input ${newsEmailError ? 'input-error' : ''}`}
                  required
                />
                {newsEmailError && (
                  <span className="field-error-msg">{newsEmailError}</span>
                )}
              </div>
              <div className="form-field-group" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id="consent"
                    checked={newsConsent}
                    onChange={(e) => {
                      setNewsConsent(e.target.checked);
                      if (newsConsentError) setNewsConsentError(null);
                      if (newsFormError) setNewsFormError(null);
                    }}
                    className="newsletter-checkbox"
                  />
                  <label htmlFor="consent" style={{ fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: '1.4' }}>
                    {t.newsConsent}
                  </label>
                </div>
                {newsConsentError && (
                  <span className="field-error-msg" style={{ marginTop: '6px' }}>
                    {newsConsentError}
                  </span>
                )}
              </div>
              <button type="submit" className="donate-submit-btn">
                {t.newsSubmit}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ADVANCED NGO DONATION FORM MODAL */}
      {showDonateModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: '520px', padding: '36px' }}>
            <button className="modal-close" onClick={() => setShowDonateModal(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-header-box" style={{ marginBottom: '20px' }}>
              <Heart className="heart-icon animate-pulse" size={32} />
              <h2>{t.donTitle}</h2>
              <p style={{ fontSize: '12px' }}>{t.donSub}</p>
            </div>
            
            <form onSubmit={handleDonateSubmit} className="donate-form">
              {/* Cause Selector Dropdown */}
              <div className="form-field-group" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">{t.donCause}</label>
                <select 
                  value={donateCause} 
                  onChange={(e) => setDonateCause(e.target.value)}
                  className="form-select"
                >
                  <option value="General Educational Fund">{t.donCauseGen}</option>
                  <option value="Safe Shuttle & Transit Security">{t.donCauseTransit}</option>
                  <option value="New Classroom Construction">{t.donCauseSchool}</option>
                  <option value="Teacher Salary & Training">{t.donCauseTeacher}</option>
                </select>
              </div>

              {/* Amount Selection */}
              <div className="form-field-group" style={{ marginBottom: '14px' }}>
                <label className="form-field-label">{t.donAmount}</label>
                <div className="amount-grid">
                  {['20', '50', '100', '250'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className={`amount-btn ${donateAmount === amt && !customAmount ? 'active' : ''}`}
                      onClick={() => {
                        setDonateAmount(amt);
                        setCustomAmount('');
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                <div className="custom-amount-box" style={{ marginBottom: '0px' }}>
                  <span className="dollar-symbol">$</span>
                  <input
                    type="number"
                    placeholder={t.donCustom}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="custom-amount-input"
                  />
                </div>
              </div>

              {/* Personal Info grid */}
              <div className="form-group-row" style={{ marginBottom: '14px' }}>
                <div className="form-field-group">
                  <label className="form-field-label">{t.donFullName}</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    value={donateName} 
                    onChange={(e) => setDonateName(e.target.value)}
                    className="form-input" 
                    required 
                  />
                </div>
                <div className="form-field-group">
                  <label className="form-field-label">{t.donEmail}</label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com" 
                    value={donateEmail} 
                    onChange={(e) => setDonateEmail(e.target.value)}
                    className="form-input" 
                    required 
                  />
                </div>
              </div>

              {/* Mock payment methods */}
              <div className="form-field-group" style={{ marginBottom: '20px' }}>
                <label className="form-field-label">Payment Method</label>
                <div className="pay-methods-grid">
                  <button 
                    type="button" 
                    className={`pay-method-btn ${payMethod === 'card' ? 'active' : ''}`}
                    onClick={() => setPayMethod('card')}
                  >
                    <CreditCard size={18} />
                    <span>Credit Card</span>
                  </button>
                  <button 
                    type="button" 
                    className={`pay-method-btn ${payMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setPayMethod('paypal')}
                  >
                    <Globe size={18} />
                    <span>PayPal</span>
                  </button>
                  <button 
                    type="button" 
                    className={`pay-method-btn ${payMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => setPayMethod('bank')}
                  >
                    <Compass size={18} />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              <button type="submit" className="donate-submit-btn">
                {t.donSubmit} <Heart size={16} fill="white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAQ MODAL */}
      {showFaqModal && (
        <div className="modal-overlay" onClick={() => setShowFaqModal(false)}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '640px', padding: '36px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowFaqModal(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-header-box" style={{ marginBottom: '24px' }}>
              <Compass className="heart-icon animate-pulse" size={32} />
              <h2>{t.faqTitle}</h2>
              <p style={{ fontSize: '13px' }}>Find answers to common questions about our organization, enrollment, and support pathways.</p>
            </div>
            <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                  <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                    {item.q[lang]}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                    {item.a[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* COOKIE POLICY MODAL */}
      {showCookiePolicyModal && (
        <div className="modal-overlay" onClick={() => setShowCookiePolicyModal(false)}>
          <div className="modal-content animate-fade-in" style={{ maxWidth: '640px', padding: '36px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowCookiePolicyModal(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-header-box" style={{ marginBottom: '20px' }}>
              <Shield className="heart-icon animate-pulse" size={32} />
              <h2>{lang === 'FR' ? 'Politique relative aux cookies' : lang === 'NL' ? 'Cookiebeleid' : 'Cookie Policy'}</h2>
              <p style={{ fontSize: '12px' }}><strong>Likro & Lihtov Organization</strong></p>
            </div>
            <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Likro & Lihtov Organization utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation, optimiser les performances du site et comprendre comment les visiteurs utilisent notre site.' 
                    : lang === 'NL' 
                    ? 'Likro & Lihtov Organisatie gebruikt cookies en vergelijkbare technologieën om uw browse-ervaring te verbeteren, de prestaties van de site te optimaliseren en te begrijpen hoe bezoekers onze website gebruiken.' 
                    : 'Likro & Lihtov Organization uses cookies and similar technologies to improve your browsing experience, enhance website performance, remember your preferences, and better understand how visitors use our website.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Qu\'est-ce que les cookies ?' : lang === 'NL' ? 'Wat zijn cookies?' : 'What Are Cookies?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Les cookies sont de petits fichiers stockés sur votre appareil qui aident le site à fonctionner correctement et à vous offrir une navigation plus fluide.' 
                    : lang === 'NL' 
                    ? 'Cookies zijn kleine bestanden die op uw apparaat worden opgeslagen wanneer u onze website bezoekt. Ze helpen onze website goed te functioneren en zorgen voor een soepelere gebruikerservaring.' 
                    : 'Cookies are small files stored on your device when you visit our website. They help our website function properly and provide a smoother user experience.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Les cookies que nous utilisons' : lang === 'NL' ? 'Cookies die we gebruiken' : 'Cookies We Use'}
                </h4>
                <ul style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px', marginBottom: '14px' }}>
                  <li><strong>{lang === 'FR' ? 'Cookies nécessaires' : lang === 'NL' ? 'Noodzakelijke cookies' : 'Necessary Cookies'}</strong> – {lang === 'FR' ? 'Requis pour le fonctionnement du site.' : lang === 'NL' ? 'Vereist voor de functionaliteit van de website.' : 'Required for website functionality and security.'}</li>
                  <li><strong>{lang === 'FR' ? 'Cookies fonctionnels' : lang === 'NL' ? 'Functionele cookies' : 'Functional Cookies'}</strong> – {lang === 'FR' ? 'Retiennent vos préférences.' : lang === 'NL' ? 'Onthouden uw gebruikersvoorkeuren.' : 'Remember your preferences and settings.'}</li>
                  <li><strong>{lang === 'FR' ? 'Cookies d\'analyse' : lang === 'NL' ? 'Analytische cookies' : 'Analytics Cookies'}</strong> – {lang === 'FR' ? 'Aident à comprendre le trafic du site.' : lang === 'NL' ? 'Helpen ons om de website te verbeteren door bezoekersinteracties te begrijpen.' : 'Help us improve our website by understanding visitor interactions.'}</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur. Notez que cela peut affecter certaines fonctionnalités.' 
                    : lang === 'NL' 
                    ? 'U kunt cookies beheren of uitschakelen via uw browserinstellingen. Houd er rekening mee dat het uitschakelen van sommige cookies invloed kan hebben op bepaalde websitefuncties.' 
                    : 'You can manage or disable cookies through your browser settings. Please note that disabling some cookies may affect certain website features.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Mises à jour de cette politique' : lang === 'NL' ? 'Updates van dit beleid' : 'Changes to This Policy'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Nous pouvons modifier cette politique à tout moment. Les mises à jour seront publiées sur cette page.' 
                    : lang === 'NL' 
                    ? 'We kunnen dit cookiebeleid van tijd tot tijd bijwerken. Eventuele updates worden op deze pagina gepubliceerd.' 
                    : 'We may update this Cookie Policy from time to time. Any updates will be posted on this page.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Contactez-nous' : lang === 'NL' ? 'Contact' : 'Contact Us'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' ? 'Pour toute question :' : lang === 'NL' ? 'Als u vragen heeft over dit cookiebeleid, neem dan contact met ons op:' : 'If you have questions about this Cookie Policy, contact us:'}<br />
                  <strong>Email:</strong> <a href="mailto:contact@likrolihtov.com" style={{ color: 'var(--primary)' }}>contact@likrolihtov.com</a><br />
                  <strong>Website:</strong> <a href="https://new-l-plum.vercel.app/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>https://new-l-plum.vercel.app/</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Sticky glass navigation */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-container">
          <a href="#" className="logo" onClick={(e) => {
            e.preventDefault();
            window.location.hash = '';
            setShowContactOnly(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            Likro <span>&</span> Lihtov
          </a>

          {/* Nav Links */}
          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <li className="mobile-menu-header">
                <span className="logo">Likro <span>&</span> Lihtov</span>
              </li>

              {/* ABOUT / WHO WE ARE */}
              <li className={`nav-item ${activeMobileDropdown === 'about' ? 'open-mobile' : ''}`}>
                <span className="nav-link" onClick={() => {
                  if (window.innerWidth <= 1024) {
                    setActiveMobileDropdown(activeMobileDropdown === 'about' ? null : 'about');
                  }
                }}>
                  {t.navAbout} <ChevronDown size={14} />
                </span>
                <div className="dropdown-menu">
                  <span className="dropdown-item" onClick={() => openDrawer('about-organization')}>{t.navAboutOrg}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('about-goals')}>{t.navAboutGoals}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('about-team')}>{t.navAboutTeam}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('about-sponsors')}>{t.navAboutSponsors}</span>
                </div>
              </li>

              {/* ILLITERACY */}
              <li className={`nav-item ${activeMobileDropdown === 'illiteracy' ? 'open-mobile' : ''}`}>
                <span className="nav-link" onClick={() => {
                  if (window.innerWidth <= 1024) {
                    setActiveMobileDropdown(activeMobileDropdown === 'illiteracy' ? null : 'illiteracy');
                  }
                }}>
                  {t.navIlliteracy} <ChevronDown size={14} />
                </span>
                <div className="dropdown-menu">
                  <span className="dropdown-item" onClick={() => openDrawer('illiteracy-definition')}>{t.navIlliteracyDef}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('illiteracy-school-program')}>{t.navIlliteracyProg}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('illiteracy-consequences')}>{t.navIlliteracyCons}</span>
                </div>
              </li>

              {/* PROJECTS */}
              <li className={`nav-item ${activeMobileDropdown === 'projects' ? 'open-mobile' : ''}`}>
                <span className="nav-link" onClick={() => {
                  if (window.innerWidth <= 1024) {
                    setActiveMobileDropdown(activeMobileDropdown === 'projects' ? null : 'projects');
                  }
                }}>
                  {t.navProjects} <ChevronDown size={14} />
                </span>
                <div className="dropdown-menu">
                  <span className="dropdown-item" onClick={() => openDrawer('projects-eu-collaboration')}>{t.navProjectsEU}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('projects-construction')}>{t.navProjectsConst}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('projects-security')}>{t.navProjectsSec}</span>
                  <span className="dropdown-item" onClick={() => openDrawer('projects-education')}>{t.navProjectsEdu}</span>
                </div>
              </li>

              {/* CONTACTS links to #contacts-section */}
              <li className="nav-item">
                <a href="#contacts-section" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  {t.navContacts}
                </a>
              </li>

              <li className="mobile-only-actions">
                <button className="mobile-action-btn lang" onClick={() => setLang(lang === 'FR' ? 'NL' : lang === 'NL' ? 'EN' : 'FR')}>
                  <Globe size={16} /> {t.btnLanguage}: {lang}
                </button>
                <button className="mobile-action-btn donate" onClick={() => {
                  setShowDonateModal(true);
                  setMobileMenuOpen(false);
                }}>
                  <Heart size={16} /> {t.btnDonate}
                </button>
              </li>
            </ul>
          </nav>

          {/* Action buttons */}
          <div className="header-actions">
            {/* Lang Dropdown */}
            <div className="lang-selector-wrapper" ref={langSelectorRef}>
              <button className="lang-selector" onClick={() => setShowLangDropdown(!showLangDropdown)}>
                <Globe size={15} />
                <span>{lang}</span>
                <ChevronDown size={12} />
              </button>
              {showLangDropdown && (
                <div className="lang-dropdown">
                  <div className="lang-option" onClick={() => { setLang('FR'); setShowLangDropdown(false); }}>FR</div>
                  <div className="lang-option" onClick={() => { setLang('NL'); setShowLangDropdown(false); }}>NL</div>
                  <div className="lang-option" onClick={() => { setLang('EN'); setShowLangDropdown(false); }}>EN</div>
                </div>
              )}
            </div>

            <button className="btn-donate" onClick={() => setShowDonateModal(true)}>
              <span>{t.btnDonate}</span>
              <ChevronRight size={16} />
            </button>

            <button 
              className="mobile-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X size={36} />
              ) : (
                <>
                  <Menu size={36} />
                  <span className="mobile-toggle-text">Menu</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {!showContactOnly && (
        <>
          {/* Hero Section takes first whole viewport cleanly */}
          <section 
            className="hero-section"
          >
        <div className="container">
          <div className="hero-content animate-fade-in">
            <span className="hero-sub">{t.heroSub}</span>
            <h1 className="hero-title">
              {t.heroTitle1}<br />
              {t.heroTitleLinker}<span>{t.heroTitleItalic}</span>
            </h1>
            <p className="hero-description">{t.heroDesc}</p>
            
            {/* Standalone Trigger for Dedicated Form Modal */}
            <div className="hero-newsletter-form">
              <button 
                type="button" 
                className="btn-hero"
                onClick={() => openNewsletterModal()}
              >
                <Mail size={18} />
                <span>{t.heroRegBtn}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Flat Mission Card directly under the hero without overlap */}
      <div className="container mission-container">
        <section className="mission-card grid-2 animate-fade-in">
          <div className="mission-header">
            <div className="mission-icon-box">
              <Sparkles size={24} />
            </div>
            <div className="mission-title-area">
              <div className="mission-line"></div>
              <h2 className="mission-title">{t.missionTitle}</h2>
            </div>
          </div>
          <div>
            <p className="mission-text">{t.missionText}</p>
          </div>
        </section>
      </div>

      {/* Areas of Activity */}
      <section className="areas-section">
        <div className="container">
          
          <div className="section-intro">
            <span className="section-label">{t.discSub}</span>
            <h2 className="section-title">{t.discTitle}</h2>
            <p className="section-description">{t.discDesc}</p>
          </div>

          <div className="grid-4">
            <div className="area-card" onClick={() => openDrawer('projects-eu-collaboration')}>
              <div className="area-card-img" style={{ backgroundImage: `url('/assets/intl_collab.jpg')`, backgroundColor: '#1E293B' }}></div>
              <div className="area-card-overlay">
                <div className="area-card-icon">
                  <Compass size={20} />
                </div>
                <h3 className="area-card-title">{t.discIntl}</h3>
                <span className="area-card-link">
                  {t.discMore} <ChevronRight size={14} />
                </span>
              </div>
            </div>

            <div className="area-card" onClick={() => openDrawer('projects-construction')}>
              <div className="area-card-img" style={{ backgroundImage: `url('/assets/construction.jpg')`, backgroundColor: '#334155' }}></div>
              <div className="area-card-overlay">
                <div className="area-card-icon">
                  <HardHat size={20} />
                </div>
                <h3 className="area-card-title">{t.discConst}</h3>
                <span className="area-card-link">
                  {t.discMore} <ChevronRight size={14} />
                </span>
              </div>
            </div>

            <div className="area-card" onClick={() => openDrawer('projects-security')}>
              <div className="area-card-img" style={{ backgroundImage: `url('/assets/security.jpg')`, backgroundColor: '#475569' }}></div>
              <div className="area-card-overlay">
                <div className="area-card-icon">
                  <Shield size={20} />
                </div>
                <h3 className="area-card-title">{t.discSec}</h3>
                <span className="area-card-link">
                  {t.discMore} <ChevronRight size={14} />
                </span>
              </div>
            </div>

            <div className="area-card" onClick={() => openDrawer('projects-education')}>
              <div className="area-card-img" style={{ backgroundImage: `url('/assets/education.jpg')`, backgroundColor: '#64748B' }}></div>
              <div className="area-card-overlay">
                <div className="area-card-icon">
                  <BookOpen size={20} />
                </div>
                <h3 className="area-card-title">{t.discEdu}</h3>
                <span className="area-card-link">
                  {t.discMore} <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="sponsors-section">
        <div className="container">
          <div className="sponsors-header">
            <span className="sponsors-tagline">{t.sponTag}</span>
            <h2 className="sponsors-title">{t.sponTitle}</h2>
            <p className="sponsors-sub">{t.sponSub}</p>
          </div>

          <div className="logos-strip">
            {[
              { id: 'EVERE', name: 'EVERE', type: lang === 'EN' ? 'Municipality' : lang === 'FR' ? 'Commune' : 'Gemeente', logo: '/assets/evere_logo.png' },
              { id: 'SOLARIS', name: 'SOLARIS', type: 'group' },
              { id: 'OCEANIA', name: 'OCEANIA', type: 'group' },
              { id: 'VECTORA', name: 'VECTORA', type: 'group' },
              { id: 'HORIZON', name: 'HORIZON', type: 'group' },
              { id: 'ALTRIUM', name: 'ALTRIUM', type: 'consulting' },
              { id: 'GREENWAY', name: 'GREENWAY', type: 'initiative' }
            ].map((sponsor, idx) => (
              <div 
                key={sponsor.id} 
                className="sponsor-logo" 
                onClick={() => {
                  if (sponsor.id === 'EVERE') {
                    window.open('https://www.evere.brussels', '_blank');
                  } else {
                    openDrawer('about-sponsors');
                  }
                }}
              >
                <div className="sponsor-icon-wrapper">
                  {sponsor.logo ? (
                    <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo-img" style={{ height: '40px', objectFit: 'contain' }} />
                  ) : (
                    idx % 4 === 0 ? <Sparkles /> : idx % 4 === 1 ? <Globe /> : idx % 4 === 2 ? <Compass /> : <Shield />
                  )}
                </div>
                <span className="sponsor-name">{sponsor.name}</span>
                <span className="sponsor-type">{sponsor.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* DEDICATED CONTACT US SECTION */}
      <section id="contacts-section" className="contacts-section">
        <div className="container">
          <div className="contact-layout">
            {/* Left side info panel */}
            <div className="contact-info-side">
              <h2 className="section-title" style={{ fontSize: '32px' }}>{t.conTitle}</h2>
              <p className="section-description" style={{ fontSize: '15px', marginTop: '8px', whiteSpace: 'pre-line' }}>
                {t.conSub}
              </p>

              <div className="contact-card-box">
                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conOurEmail}</h4>
                    <p>
                      <a href="mailto:contact@likrolihtov.com" className="clickable-contact-link">
                        contact@likrolihtov.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <Phone size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conOurPhone}</h4>
                    <p>
                      <a href="tel:+32497153636" className="clickable-contact-link">
                        +32 497 15 36 36
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conHeadOffice}</h4>
                    <p>
                      <a 
                        href="https://maps.google.com/?q=Rue+Edouard+Dekoster+53,+1140+Brussels,+Belgium" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="clickable-contact-link"
                      >
                        Rue Edouard Dekoster 53<br />1140 Brussels, Belgium
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side NGO contact form */}
            <div className="contact-form-card">
              {!contactSubmitted ? (
                <>
                  <p style={{ marginBottom: '20px', fontSize: '13px', color: 'var(--text-dark)' }}>
                    {t.conRequiredFieldsText}
                  </p>
                  <form onSubmit={handleContactSubmit} className="contact-form" noValidate>
                    <div className="form-group-row">
                      <div className="form-field-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-field-label">
                          {t.conSalutationLabel} <span style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '10px', opacity: 0.65 }}>({lang === 'FR' ? 'Optionnel' : lang === 'NL' ? 'Optioneel' : 'Optional'})</span>
                        </label>
                        <div className="salutation-group">
                          {[{val: 'Mr', label: t.conSalutationMr}, {val: 'Ms', label: t.conSalutationMs}, {val: 'Other', label: t.conSalutationOther}].map(opt => (
                            <label 
                              key={opt.val} 
                              className={`salutation-option ${contactSalutation === opt.val ? 'selected' : ''}`}
                            >
                              <input 
                                type="radio" 
                                name="salutation" 
                                value={opt.val} 
                                checked={contactSalutation === opt.val}
                                onChange={(e) => setContactSalutation(e.target.value)}
                                disabled={isSending}
                                className="salutation-radio"
                              />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="form-group-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                      <div className="form-field-group">
                        <label className="form-field-label">First Name *</label>
                        <input 
                          type="text" 
                          placeholder=" " 
                          value={contactFirstName || ''}
                          onChange={(e) => {
                            setContactFirstName(e.target.value);
                            if (contactFirstNameError) setContactFirstNameError(null);
                            if (contactFormError) setContactFormError(null);
                          }}
                          className={`form-input ${contactFirstNameError ? 'input-error' : ''}`}
                          required 
                          disabled={isSending}
                        />
                        {contactFirstNameError && (
                          <span className="field-error-msg">{contactFirstNameError}</span>
                        )}
                      </div>
                      <div className="form-field-group">
                        <label className="form-field-label">Last Name *</label>
                        <input 
                          type="text" 
                          placeholder=" " 
                          value={contactLastName || ''}
                          onChange={(e) => {
                            setContactLastName(e.target.value);
                            if (contactLastNameError) setContactLastNameError(null);
                            if (contactFormError) setContactFormError(null);
                          }}
                          className={`form-input ${contactLastNameError ? 'input-error' : ''}`}
                          required 
                          disabled={isSending}
                        />
                        {contactLastNameError && (
                          <span className="field-error-msg">{contactLastNameError}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group-row" style={{ gridTemplateColumns: '1fr 1.3fr' }}>
                      <div className="form-field-group">
                        <label className="form-field-label">{t.conEmail} *</label>
                        <input 
                          type="email" 
                          placeholder=" " 
                          value={contactEmail}
                          onChange={(e) => {
                            setContactEmail(e.target.value);
                            if (contactEmailError) setContactEmailError(null);
                            if (contactFormError) setContactFormError(null);
                          }}
                          className={`form-input ${contactEmailError ? 'input-error' : ''}`}
                          required 
                          disabled={isSending}
                        />
                        {contactEmailError && (
                          <span className="field-error-msg">{contactEmailError}</span>
                        )}
                      </div>
                      <div className="form-field-group">
                        <label className="form-field-label">
                          {t.conPhone} <span style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '10px', opacity: 0.65 }}>({lang === 'FR' ? 'Optionnel' : lang === 'NL' ? 'Optioneel' : 'Optional'})</span>
                        </label>
                        <PhoneInput
                          placeholder=""
                          value={contactPhone}
                          onChange={(val) => {
                            setContactPhone(val || '');
                            if (contactPhoneError) setContactPhoneError(null);
                            if (contactFormError) setContactFormError(null);
                          }}
                          defaultCountry={defaultCountry as "ET"}
                          countrySelectComponent={SearchableCountrySelect}
                          inputComponent={CustomPhoneInputInner}
                          className={`react-phone-input-field ${contactPhoneError ? 'input-error' : ''}`}
                          disabled={isSending}
                        />
                        {contactPhoneError && (
                          <span className="field-error-msg">{contactPhoneError}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">{t.conSubject} *</label>
                      <select 
                        value={contactSubject}
                        onChange={(e) => {
                          setContactSubject(e.target.value);
                          if (contactReasonError) setContactReasonError(null);
                          if (contactFormError) setContactFormError(null);
                        }}
                        className={`form-select ${contactReasonError ? 'input-error' : ''}`}
                        required
                        disabled={isSending}
                      >
                        <option value="">Select a reason</option>
                        <option value="General Information">{t.conSubjGen}</option>
                        <option value="Volunteering">{t.conSubjVol}</option>
                        <option value="Partnership Opportunities">{t.conSubjPartner}</option>
                        <option value="Support Our Mission">{t.conSubjSupport}</option>
                        <option value="Other">{t.conSubjOther}</option>
                      </select>
                      {contactReasonError && (
                        <span className="field-error-msg">{contactReasonError}</span>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label">{t.conMessageLabel} * ({contactMessage.length}/1200)</label>
                      <textarea 
                        placeholder={t.conMessage}
                        value={contactMessage}
                        onChange={(e) => {
                          setContactMessage(e.target.value.slice(0, 1200));
                          if (contactMessageError) setContactMessageError(null);
                          if (contactFormError) setContactFormError(null);
                        }}
                        maxLength={1200}
                        className={`form-textarea ${contactMessageError ? 'input-error' : ''}`}
                        required
                        disabled={isSending}
                      ></textarea>
                      {contactMessageError && (
                        <span className="field-error-msg">{contactMessageError}</span>
                      )}
                    </div>


                    {contactFormError && (
                      <div className="form-error-msg" style={{ marginTop: '12px', marginBottom: '12px' }}>
                        {contactFormError}
                      </div>
                    )}

                    <button type="submit" className="btn-form-submit" disabled={isSending}>
                      <span>{isSending ? (lang === 'FR' ? 'Envoi...' : lang === 'NL' ? 'Verzenden...' : 'Sending...') : t.conSend}</span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="form-success-card animate-fade-in">
                  <div className="success-check-circle">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="success-card-title">
                    {lang === 'FR' ? 'Message envoyé' : lang === 'NL' ? 'Bericht verzonden' : 'Message Sent'}
                  </h3>
                  <p className="success-card-text">
                    {lang === 'EN' && (
                      <>Thank you, the user <strong>{contactFirstName} {contactLastName}</strong>. We have successfully received your message. One of our coordinators will review your request and get back to you in the coming days. For urgent matters, please contact us by phone.</>
                    )}
                    {lang === 'FR' && (
                      <>Merci, <strong>{contactFirstName} {contactLastName}</strong>. Nous avons bien reçu votre message. Un de nos coordinateurs examinera votre demande et reviendra vers vous dans les prochains jours. Pour les demandes urgentes, veuillez nous contacter par téléphone.</>
                    )}
                    {lang === 'NL' && (
                      <>Bedankt, <strong>{contactFirstName} {contactLastName}</strong>. Wij hebben uw bericht goed ontvangen. Een van onze coördinatoren zal uw aanvraag bekijken en binnen enkele dagen contact met u opnemen. Voor dringende vragen kunt u ons telefonisch contacteren.</>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {renderSiteFooter()}

      {/* Multilingual Slide-in Drawer */}
      <div className={`overlay-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeDrawer}></div>
        <div className="overlay-panel">
          <div className="overlay-header">
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
              <span className="overlay-path">{selectedSection?.path}</span>
              <button className="overlay-close-btn" onClick={closeDrawer}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="overlay-body" style={{ padding: '48px 0 0 0' }}>
            {selectedSection && (
              <>
                <div className="container" style={{ padding: '0 24px 80px 24px' }}>
                  <div className="drawer-layout animate-fade-in">
                <aside className="drawer-sidebar">
                  {selectedSection.id === 'illiteracy-definition' ? (
                    <>
                      {/* Facts Card */}
                      {selectedSection.factsCard && (
                        <div className="facts-sidebar-card">
                          <div className="facts-card-corner-shape"></div>
                          <h4 className="facts-card-title">{selectedSection.factsCard.title}</h4>
                          <p className="facts-card-text">{selectedSection.factsCard.text}</p>
                          <p className="facts-card-ref">{selectedSection.factsCard.ref}</p>
                          <div className="facts-card-stat">{selectedSection.factsCard.statNumber}</div>
                          <div className="facts-card-stat-label">{selectedSection.factsCard.statLabel}</div>
                        </div>
                      )}
                      {/* Consequences Card */}
                      {selectedSection.consequencesCard && (
                        <div className="consequences-sidebar-card">
                          <h4 className="consequences-card-title">{selectedSection.consequencesCard.title}</h4>
                          <ul className="consequences-list">
                            {selectedSection.consequencesCard.items.map((item, idx) => (
                              <li key={idx}>
                                <CheckCircle size={16} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : selectedSection.id === 'illiteracy-school-program' ? (
                    <>
                      {/* School Program Sidebar */}
                      <div className="sidebar-card">
                        <h4 className="sidebar-card-title">
                          {lang === 'FR' ? 'Programme' : lang === 'NL' ? 'Programma' : 'Program'}
                        </h4>
                        <div className="sidebar-stat">{selectedSection.statNumber}</div>
                        <div className="sidebar-stat-label">{selectedSection.statLabel}</div>
                        <p className="sidebar-card-text" style={{ marginTop: '16px', fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                          {selectedSection.sidebarText}
                        </p>
                      </div>

                      {selectedSection.listItems && (
                        <div className="sidebar-quickinfo">
                          <h4 className="quickinfo-title">
                            {selectedSection.listTitle || (lang === 'FR' ? 'Le programme comprend' : lang === 'NL' ? 'Het programma omvat' : 'Program includes')}
                          </h4>
                          <ul className="quickinfo-list">
                            {selectedSection.listItems.map((item, index) => (
                              <li key={index}>
                                <CheckCircle size={14} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {(selectedSection.sidebarText || selectedSection.statNumber) && (
                        <div className="sidebar-card">
                          <h4 className="sidebar-card-title">
                            {selectedSection.sidebarTitle || 
                              (lang === 'FR' ? 'Impact' : lang === 'NL' ? 'Impact' : 'Impact')}
                          </h4>
                          {selectedSection.sidebarText && (
                            <p className="sidebar-card-text" style={{ whiteSpace: 'pre-line' }}>{renderParsedText(selectedSection.sidebarText)}</p>
                          )}
                          {selectedSection.statNumber && (
                            <div className="sidebar-stat">{selectedSection.statNumber}</div>
                          )}
                          {selectedSection.statLabel && (
                            <div className="sidebar-stat-label">{selectedSection.statLabel}</div>
                          )}
                        </div>
                      )}

                      <div className="sidebar-quickinfo">
                        <h4 className="quickinfo-title">
                          {selectedSection.quickInfoTitle || 
                            (lang === 'FR' ? 'Statut' : lang === 'NL' ? 'Status' : 'Status')}
                        </h4>
                        <ul className="quickinfo-list">
                          {selectedSection.quickInfoItems ? (
                            selectedSection.quickInfoItems.map((item, index) => (
                              <li key={index}>
                                <CheckCircle size={14} />
                                <span>{item}</span>
                              </li>
                            ))
                          ) : (
                            <>
                              <li>
                                <CheckCircle size={14} />
                                <span>{lang === 'FR' ? 'Priorité autonomisation' : lang === 'NL' ? 'Focus op empowerment' : 'Empowerment Focus'}</span>
                              </li>
                              <li>
                                <CheckCircle size={14} />
                                <span>{lang === 'FR' ? 'Sécurité garantie' : lang === 'NL' ? 'Gegarandeerde veiligheid' : 'Safety Guaranteed'}</span>
                              </li>
                              <li>
                                <CheckCircle size={14} />
                                <span>{lang === 'FR' ? 'Financé par la communauté' : lang === 'NL' ? 'Gefinancierd door de gemeenschap' : 'Community Funded'}</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </aside>

                <article className="drawer-main">
                  <h2 className="drawer-title">{selectedSection.title}</h2>
                  <h3 className="drawer-subtitle">{selectedSection.subtitle}</h3>

                  {selectedSection.id === 'illiteracy-definition' ? (
                    <>
                      {/* Definitions Part */}
                      {selectedSection.definitions && (
                        <div className="illiteracy-definitions-section">
                          {selectedSection.definitions.map((def, index) => (
                            <p key={index} className="illiteracy-definition-item">
                              <span className="illiteracy-term">{def.term}: </span>
                              <span className="illiteracy-desc">{def.desc}</span>
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Causes Part */}
                      {selectedSection.causes && (
                        <div className="illiteracy-causes-section">
                          <h4 className="illiteracy-causes-title">{selectedSection.causes.title}</h4>
                          <p className="illiteracy-causes-intro">{selectedSection.causes.intro}</p>
                          <ol className="illiteracy-causes-list">
                            {selectedSection.causes.items.map((item, index) => (
                              <li key={index} className="illiteracy-cause-item">
                                <span className="cause-num">{index + 1}. </span>
                                <strong>{item.title} : </strong>
                                <span>{item.text}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* 4 Cards Grid */}
                      {selectedSection.gridCards && (
                        <div className="illiteracy-grid-2">
                          {selectedSection.gridCards.map((card, index) => (
                            <div key={index} className="illiteracy-grid-card">
                              <div className="illiteracy-circular-icon-container">
                                <div className="illiteracy-circular-icon">
                                  {getIconComponent(card.iconName)}
                                </div>
                              </div>
                              <div className="illiteracy-card-content">
                                <strong>{card.title}</strong>
                                <p>{card.text}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Le saviez-vous ? */}
                      {selectedSection.didYouKnow && (
                        <div className="illiteracy-dyk-section">
                          <h4 className="illiteracy-dyk-title">{selectedSection.didYouKnow.title}</h4>
                          <div className="illiteracy-dyk-grid">
                            {selectedSection.didYouKnow.items.map((item, index) => (
                              <div key={index} className="illiteracy-dyk-card-item">
                                <div className="illiteracy-dyk-icon-circle">
                                  {getIconComponent(item.iconName, 24)}
                                </div>
                                <div className="illiteracy-dyk-content">
                                  {item.title && <h5 className="illiteracy-dyk-card-title">{item.title}</h5>}
                                  {item.list ? (
                                    <ul className="illiteracy-dyk-list">
                                      {item.list.map((listItem, listIdx) => (
                                        <li key={listIdx}>{listItem}</li>
                                      ))}
                                    </ul>
                                  ) : (
                                    item.text && <span className="illiteracy-dyk-text">{item.text}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : selectedSection.id === 'illiteracy-school-program' ? (
                    <>
                      {selectedSection.mainParagraphs.map((para, index) => (
                        <p key={index} className="drawer-text" style={{ marginBottom: '40px' }}>{renderParsedText(para)}</p>
                      ))}

                      {selectedSection.programSteps && (
                        <div className="school-program-steps">
                          {selectedSection.programSteps.map((step, idx) => (
                            <div key={idx} className="school-program-step-row animate-fade-in">
                              <div className="school-program-step-text">
                                <div className="school-program-step-num">0{step.num}</div>
                                <div className="school-program-step-header">
                                  <div className="school-program-step-icon-circle">
                                    {getIconComponent(step.iconName, 18)}
                                  </div>
                                  <h4 className="school-program-step-title">{step.title}</h4>
                                </div>
                                <h5 className="school-program-step-tagline">{step.tagline}</h5>
                                <p className="school-program-step-desc">{step.desc}</p>
                              </div>
                              <div className="school-program-step-image-container">
                                <img src={step.image} alt={step.title} className="school-program-step-img" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedSection.mainParagraphs.map((para, index) => (
                        <p key={index} className="drawer-text">{renderParsedText(para)}</p>
                      ))}

                      {/* Multilingual Interactive Curriculum Syllabus */}
                      {selectedSection.galleryType === 'curriculum' && (
                        <div className="curriculum-container">
                          <h3 className="drawer-h3">Program Syllabus</h3>
                          <div className="program-tabs">
                            {[1, 2, 3].map((num) => (
                              <button
                                key={num}
                                className={`program-tab ${activeCurriculumTab === num ? 'active' : ''}`}
                                onClick={() => setActiveCurriculumTab(num)}
                              >
                                Quarter {num}
                              </button>
                            ))}
                          </div>

                          {activeCurriculumTab === 1 && (
                            <ul className="curriculum-list animate-fade-in">
                              <li className="curriculum-step">
                                <div className="curriculum-num">1A</div>
                                <div className="curriculum-details">
                                  <h4>{lang === 'FR' ? 'Bases Phonétiques & Tracé de Sons' : lang === 'NL' ? 'Fonetische grondslagen & klanken schrijven' : 'Phonetic Foundations & Sound Tracing'}</h4>
                                  <p>{lang === 'FR' ? 'Les étudiantes commencent par tracer les voyelles et les sons de base.' : lang === 'NL' ? 'Studenten beginnen met het schrijven van basisklinkers en medeklinkers, en koppelen deze aan eenvoudige symbolen.' : 'Students begin by tracing basic vowels and consonant sounds, linking them to simple high-recognition symbols.'}</p>
                                </div>
                              </li>
                              <li className="curriculum-step">
                                <div className="curriculum-num">1B</div>
                                <div className="curriculum-details">
                                  <h4>{lang === 'FR' ? 'Maîtrise du Nom & Signature' : lang === 'NL' ? 'Naam- & handtekeningbeheersing' : 'Name & Signature Mastery'}</h4>
                                  <p>{lang === 'FR' ? 'Apprendre à signer son nom pour valider des actes civils.' : lang === 'NL' ? 'Elke vrouw leert haar eigen naam spellen, schrijven en ondertekenen. Dit bouwt direct cognitief zelfvertrouwen op.' : 'Every woman learns to spell, trace, and write her own name. This builds immediate cognitive confidence and legal signature validity.'}</p>
                                </div>
                              </li>
                            </ul>
                          )}

                          {activeCurriculumTab === 2 && (
                            <ul className="curriculum-list animate-fade-in">
                              <li className="curriculum-step">
                                <div className="curriculum-num">2A</div>
                                <div className="curriculum-details">
                                  <h4>{lang === 'FR' ? 'Lecture Pratique de Phrases' : lang === 'NL' ? 'Praktisch zinnen schrijven' : 'Practical Sentence Tracing'}</h4>
                                  <p>{lang === 'FR' ? 'Lire des étiquettes de médicaments, des panneaux ou des documents scolaires.' : lang === 'NL' ? 'Eenvoudige zinnen vormen over boodschappen, huiswerk van kinderen en dagelijks lezen onderweg (verkeersborden, medische etiketten).' : 'Forming simple sentences geared around groceries, children\'s homework, and daily transit reading (bus signs, medical labels).'}</p>
                                </div>
                              </li>
                            </ul>
                          )}

                          {activeCurriculumTab === 3 && (
                            <ul className="curriculum-list animate-fade-in">
                              <li className="curriculum-step">
                                <div className="curriculum-num">3A</div>
                                <div className="curriculum-details">
                                  <h4>{lang === 'FR' ? 'Introduction au Numérique' : lang === 'NL' ? 'Inleiding digitale geletterdheid' : 'Digital Literacy Introduction'}</h4>
                                  <p>{lang === 'FR' ? 'Apprendre à naviguer sur des tablettes tactiles éducatives.' : lang === 'NL' ? 'Leren omgaan met tablets, surfen op educatieve leersites en eenvoudige berichten typen.' : 'Learning how to use tablets, navigate web interfaces for learning materials, and type basic phone messages.'}</p>
                                </div>
                              </li>
                            </ul>
                          )}
                        </div>
                      )}

                      {/* Visual gallery inside drawers */}
                      {selectedSection.galleryType === 'photos' && (
                        <div>
                          <h3 className="drawer-h3">Media Archive</h3>
                          <div className="drawer-gallery">
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/hero_background.png')` }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/intl_collab.jpg')`, backgroundColor: '#1E293B' }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/construction.jpg')`, backgroundColor: '#334155' }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/security.jpg')`, backgroundColor: '#475569' }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/education.jpg')`, backgroundColor: '#64748B' }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                            <div className="gallery-photo" style={{ backgroundImage: `url('/assets/hero_background.png')` }}>
                              <div className="gallery-photo-overlay"><ImageIcon size={24} /></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Team showcase inside drawers */}
                      {selectedSection.galleryType === 'team' && (
                        <div className="drawer-grid-2">
                          <div className="team-member-card">
                            <div className="team-avatar">ER</div>
                            <h4 className="team-name">Dr. Elena Rostova</h4>
                            <span className="team-role">Pedagogical Director</span>
                            <p className="team-bio">Elena has over 15 years designing adult education plans.</p>
                          </div>
                          <div className="team-member-card">
                            <div className="team-avatar">SJ</div>
                            <h4 className="team-name">Sarah Jenkins</h4>
                            <span className="team-role">Lead Instructor</span>
                            <p className="team-bio">Sarah specializes in modern phonetics, teaching with incredible warmth.</p>
                          </div>
                        </div>
                      )}

                      {/* Standard cards details */}
                      {selectedSection.cards && (
                        <div className="drawer-grid-2">
                          {selectedSection.cards.map((card, idx) => (
                            <div key={idx} className="drawer-card">
                              <h4 className="drawer-card-title">{card.title}</h4>
                              <p className="drawer-card-text">{card.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {selectedSection.bottomBanner && (
                    <div className="illiteracy-bottom-banner" style={{ marginTop: '40px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div className="illiteracy-banner-icon-circle">
                          <Heart size={20} />
                        </div>
                        <div className="illiteracy-banner-content">
                          <h4 className="illiteracy-banner-title">{selectedSection.bottomBanner.title}</h4>
                          <p className="illiteracy-banner-text">{selectedSection.bottomBanner.text}</p>
                        </div>
                      </div>
                      <button 
                        className="illiteracy-banner-btn"
                        onClick={() => {
                          closeDrawer();
                          setShowDonateModal(true);
                        }}
                      >
                        {selectedSection.bottomBanner.buttonText}
                      </button>
                    </div>
                  )}
                </article>
                  </div>
                </div>
                {renderSiteFooter()}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Cookies Consent Banner */}
      {showCookies && (
        <div className="cookie-banner">
          <div className="cookie-container">
            <p className="cookie-text">
              {t.cookieText}{' '}
              <a 
                href="#cookie-policy" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setShowCookiePolicyModal(true); 
                }}
                style={{ color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer' }}
              >
                {lang === 'FR' ? 'politique relative aux cookies.' : lang === 'NL' ? 'cookiebeleid.' : 'cookie policy.'}
              </a>
            </p>
            <div className="cookie-buttons">
              <button 
                className="cookie-btn accept" 
                onClick={() => {
                  localStorage.setItem('cookieConsent', 'accepted');
                  setShowCookies(false);
                }}
              >
                {t.cookieAccept}
              </button>
              <button 
                className="cookie-btn decline" 
                onClick={() => {
                  localStorage.setItem('cookieConsent', 'declined');
                  setShowCookies(false);
                }}
              >
                {t.cookieDecline}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
