import { useState, useEffect } from 'react';
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
  Send
} from 'lucide-react';
import { sectionsData, type DetailSection } from './data';
import { translations } from './translations';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './App.css';

function App() {
  // Language & Translation State
  const [lang, setLang] = useState<'EN' | 'FR' | 'ES'>('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const t = translations[lang];

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
  const [showCookies, setShowCookies] = useState(false);

  // Landing Page: Contact Us Section
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // States for sending and geo-ip country detection
  const [isSending, setIsSending] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState<any>('ET'); // Default to Ethiopia
  const [prevLang, setPrevLang] = useState<'EN' | 'FR' | 'ES'>('EN');

  // Detect user country
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/country/');
        const country = await res.text();
        if (country && country.trim().length === 2) {
          setDefaultCountry(country.trim().toUpperCase());
        }
      } catch (err) {
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

  // Language Change Listener for Auto Message Translation
  useEffect(() => {
    const translateMessage = async (text: string, fromLang: 'EN' | 'FR' | 'ES', toLang: 'EN' | 'FR' | 'ES') => {
      if (fromLang === toLang) return;
      try {
        const fromCode = fromLang.toLowerCase();
        const toCode = toLang.toLowerCase();
        const response = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromCode}|${toCode}`
        );
        const data = await response.json();
        if (data?.responseData?.translatedText) {
          setContactMessage(data.responseData.translatedText);
        }
      } catch (err) {
        console.error('Auto-translation failed:', err);
      }
    };

    if (contactMessage.trim().length > 0 && lang !== prevLang) {
      translateMessage(contactMessage, prevLang, lang);
    }
    setPrevLang(lang);
  }, [lang, contactMessage, prevLang]);

  // Footer newsletter email input
  const [footerEmail, setFooterEmail] = useState('');

  // Handle scroll to add background glassmorphism & check cookies
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookies(true);
    }

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
  };

  // Submit Newsletter (Footer)
  const handleFooterNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || !footerEmail.includes('@')) {
      triggerToast(lang === 'FR' ? 'Adresse email non valide' : lang === 'ES' ? 'Dirección de correo no válida' : 'Please enter a valid email address.');
      return;
    }
    const msg = t.newsSuccess.replace('{name}', footerEmail.split('@')[0]);
    triggerToast(msg);
    setFooterEmail('');
  };

  // Submit Newsletter (Dedicated Standalone Form Modal)
  const handleNewsletterModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName.trim()) {
      triggerToast(lang === 'FR' ? 'Veuillez saisir votre nom' : lang === 'ES' ? 'Por favor ingrese su nombre' : 'Please enter your name.');
      return;
    }
    if (!newsEmail || !newsEmail.includes('@')) {
      triggerToast(lang === 'FR' ? 'Email non valide' : lang === 'ES' ? 'Correo no válido' : 'Please enter a valid email.');
      return;
    }
    if (!newsConsent) {
      triggerToast(lang === 'FR' ? 'Veuillez accepter les conditions' : lang === 'ES' ? 'Por favor acepte las conditions' : 'Please consent to newsletter terms.');
      return;
    }

    const msg = t.newsSuccess.replace('{name}', newsName);
    triggerToast(msg);
    setShowNewsletterModal(false);
    setNewsName('');
    setNewsEmail('');
    setNewsConsent(false);
  };

  // Submit NGO Advanced Donation Form
  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donateName.trim()) {
      triggerToast(lang === 'FR' ? 'Veuillez saisir votre nom complet' : lang === 'ES' ? 'Por favor ingrese su nombre completo' : 'Please enter your full name.');
      return;
    }
    if (!donateEmail || !donateEmail.includes('@')) {
      triggerToast(lang === 'FR' ? 'Adresse email non valide' : lang === 'ES' ? 'Correo no válido' : 'Please enter a valid email address.');
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

    // 1. Client-side Validation
    if (!contactName.trim() || !contactEmail.includes('@') || !contactMessage.trim()) {
      triggerToast(lang === 'FR' ? 'Veuillez remplir tous les champs requis' : lang === 'ES' ? 'Por favor complete todos los campos requeridos' : 'Please fill in all required fields.');
      return;
    }

    // Optional phone validation if number is provided
    if (contactPhone && !isValidPhoneNumber(contactPhone)) {
      triggerToast(lang === 'FR' ? 'Numéro de téléphone invalide' : lang === 'ES' ? 'Número de teléfono no válido' : 'Please enter a valid international phone number.');
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          phone: contactPhone || '',
          message: contactMessage,
          language: lang,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setContactSubmitted(true);
        triggerToast(t.conSuccess.replace('{name}', contactName));
      } else {
        triggerToast(data.error || (lang === 'FR' ? 'Erreur lors de l\'envoi du message' : lang === 'ES' ? 'Error al enviar el mensaje' : 'Failed to send message. Please try again.'));
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      triggerToast(lang === 'FR' ? 'Erreur de connexion avec le serveur' : lang === 'ES' ? 'Error de conexión con el servidor' : 'Network error. Could not reach server.');
    } finally {
      setIsSending(false);
    }
  };

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
            <button className="modal-close" onClick={() => setShowNewsletterModal(false)} aria-label="Close">
              <X size={20} />
            </button>
            <div className="modal-header-box">
              <Mail className="heart-icon" size={32} />
              <h2>{t.newsTitle}</h2>
              <p>{t.newsSub}</p>
            </div>
            <form onSubmit={handleNewsletterModalSubmit} className="donate-form">
              <div className="form-field-group" style={{ marginBottom: '16px' }}>
                <label className="form-field-label">{t.newsName}</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={newsName}
                  onChange={(e) => setNewsName(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field-group" style={{ marginBottom: '20px' }}>
                <label className="form-field-label">{t.newsEmail}</label>
                <input
                  type="email"
                  placeholder="jane.doe@example.com"
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field-group" style={{ flexDirection: 'row', gap: '10px', alignItems: 'flex-start', marginBottom: '24px' }}>
                <input
                  type="checkbox"
                  id="consent"
                  checked={newsConsent}
                  onChange={(e) => setNewsConsent(e.target.checked)}
                  style={{ marginTop: '4px', cursor: 'pointer' }}
                />
                <label htmlFor="consent" style={{ fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: '1.4' }}>
                  {t.newsConsent}
                </label>
              </div>
              <button type="submit" className="donate-submit-btn">
                {t.newsSubmit} <Mail size={16} />
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
              <div className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Qui est éligible pour s\'inscrire aux programmes de Likro & Lihtov ?' : lang === 'ES' ? '¿Quién es elegible para inscribirse en los programas?' : 'Who is eligible to enroll in Likro & Lihtov programs?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' 
                    ? 'Nos programmes sont spécifiquement conçus pour les femmes adultes (âgées de 18 ans et plus) qui n\'ont pas eu accès à l\'éducation formelle.' 
                    : lang === 'ES' 
                    ? 'Nuestros programas están diseñados para mujeres adultas (mayores de 18 años) con poco o ningún acceso previo a la educación formal.' 
                    : 'Our programs are specifically designed for adult women (aged 18 and older) who have had little to no prior access to formal education and want to learn foundational reading, writing, and arithmetic.'}
                </p>
              </div>
              <div className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Les cours sont-ils vraiment gratuits ?' : lang === 'ES' ? '¿Las clases son realmente gratuitas?' : 'Are the classes really free?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' 
                    ? 'Oui, tous nos cours, le matériel pédagogique, les tablettes, le transport privé et la garderie sont 100 % gratuits, financés par nos partenaires.' 
                    : lang === 'ES' 
                    ? 'Sí, todas nuestras clases, materiales de aprendizaje, tabletas, transporte privado y guardería son 100% gratuitos para nuestras estudiantes.' 
                    : 'Yes, all our classes, learning materials, tablets, private transit, and on-site child-care services are 100% free of charge for our students, funded entirely by our sponsors and donors.'}
                </p>
              </div>
              <div className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Comment fonctionne la navette de transport sécurisée ?' : lang === 'ES' ? '¿Cómo funciona el servicio de transporte seguro?' : 'How does the safe transit shuttle service work?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' 
                    ? 'Nous proposons des navettes privées qui récupèrent les étudiantes dans des points de rendez-vous éclairés et sécurisés.' 
                    : lang === 'ES' 
                    ? 'Ofrecemos vehículos privados que recogen a las alumnas en puntos de encuentro iluminados en sus vecindarios y las traen directamente al campus.' 
                    : 'We provide private, secure shuttles that pick up students from designated, well-lit hubs in their neighborhoods and bring them directly to campus, returning them safely after class.'}
                </p>
              </div>
              <div className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Un service de garde d\'enfants est-il fourni pendant les cours ?' : lang === 'ES' ? '¿Se ofrece cuidado infantil durante las clases?' : 'Is child-care provided during classes?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' 
                    ? 'Oui ! Nous disposons de crèches professionnelles adjacentes à nos salles de classe pour accueillir vos enfants de moins de 5 ans.' 
                    : lang === 'ES' 
                    ? '¡Sí! Contamos con guarderías profesionales adyacentes a las aulas para cuidar de los niños menores de 5 años mientras sus madres estudian.' 
                    : 'Yes! We have secure, professional nurseries adjacent to our classrooms. Students can bring their children (under 5 years) to be cared for by certified caregivers while they study.'}
                </p>
              </div>
              <div className="faq-item" style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Quelle est la durée du programme et les horaires ?' : lang === 'ES' ? '¿Cuánto dura el programa y cuál es el horario?' : 'How long is the program, and what is the schedule?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' 
                    ? 'Le programme dure 9 mois, divisé en trois trimestres, avec des horaires flexibles en matinée, après-midi ou week-end.' 
                    : lang === 'ES' 
                    ? 'El programa dura 9 meses, dividido en tres trimestres. Ofrecemos sesiones flexibles por la mañana, tarde y fines de semana.' 
                    : 'The core program is 9 months long, split into three quarters. To accommodate household and work duties, we offer flexible morning, afternoon, and weekend sessions.'}
                </p>
              </div>
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
              <h2>{lang === 'FR' ? 'Politique relative aux cookies' : lang === 'ES' ? 'Política de cookies' : 'Cookie Policy'}</h2>
              <p style={{ fontSize: '12px' }}><strong>Likro & Lihtov Organization</strong></p>
            </div>
            <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Likro & Lihtov Organization utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation, optimiser les performances du site et comprendre comment les visiteurs utilisent notre site.' 
                    : lang === 'ES' 
                    ? 'Likro & Lihtov Organization utiliza cookies y tecnologías similares para mejorar su experiencia de navegación, optimizar el rendimiento del sitio y entender cómo interactúa con el sitio.' 
                    : 'Likro & Lihtov Organization uses cookies and similar technologies to improve your browsing experience, enhance website performance, remember your preferences, and better understand how visitors use our website.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Qu\'est-ce que les cookies ?' : lang === 'ES' ? '¿Qué son las cookies?' : 'What Are Cookies?'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Les cookies sont de petits fichiers stockés sur votre appareil qui aident le site à fonctionner correctement et à vous offrir une navigation plus fluide.' 
                    : lang === 'ES' 
                    ? 'Las cookies son pequeños archivos almacenados en su dispositivo que facilitan un mejor funcionamiento del sitio y ofrecen una experiencia más fluida.' 
                    : 'Cookies are small files stored on your device when you visit our website. They help our website function properly and provide a smoother user experience.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Les cookies que nous utilisons' : lang === 'ES' ? 'Las cookies que utilizamos' : 'Cookies We Use'}
                </h4>
                <ul style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px', marginBottom: '14px' }}>
                  <li><strong>{lang === 'FR' ? 'Cookies nécessaires' : lang === 'ES' ? 'Cookies necesarias' : 'Necessary Cookies'}</strong> – {lang === 'FR' ? 'Requis pour le fonctionnement du site.' : lang === 'ES' ? 'Requeridas para la funcionalidad.' : 'Required for website functionality and security.'}</li>
                  <li><strong>{lang === 'FR' ? 'Cookies fonctionnels' : lang === 'ES' ? 'Cookies funcionales' : 'Functional Cookies'}</strong> – {lang === 'FR' ? 'Retiennent vos préférences.' : lang === 'ES' ? 'Recuerdan sus preferencias.' : 'Remember your preferences and settings.'}</li>
                  <li><strong>{lang === 'FR' ? 'Cookies d\'analyse' : lang === 'ES' ? 'Cookies analíticas' : 'Analytics Cookies'}</strong> – {lang === 'FR' ? 'Aident à comprendre le trafic du site.' : lang === 'ES' ? 'Ayudan a comprender el tráfico del sitio.' : 'Help us improve our website by understanding visitor interactions.'}</li>
                </ul>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur. Notez que cela peut affecter certaines fonctionnalités.' 
                    : lang === 'ES' 
                    ? 'Puede modificar o deshabilitar las cookies en las opciones de su navegador. Tenga en cuenta que esto podría afectar el funcionamiento de algunas características.' 
                    : 'You can manage or disable cookies through your browser settings. Please note that disabling some cookies may affect certain website features.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Mises à jour de cette politique' : lang === 'ES' ? 'Modificaciones de esta política' : 'Changes to This Policy'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5', marginBottom: '14px' }}>
                  {lang === 'FR' 
                    ? 'Nous pouvons modifier cette politique à tout moment. Les mises à jour seront publiées sur cette page.' 
                    : lang === 'ES' 
                    ? 'Podemos actualizar esta política en cualquier momento. Las actualizaciones se publicarán en esta página.' 
                    : 'We may update this Cookie Policy from time to time. Any updates will be posted on this page.'}
                </p>
                <h4 style={{ color: 'var(--text-dark)', marginBottom: '6px', fontSize: '15px' }}>
                  {lang === 'FR' ? 'Contactez-nous' : lang === 'ES' ? 'Contáctenos' : 'Contact Us'}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.5' }}>
                  {lang === 'FR' ? 'Pour toute question :' : lang === 'ES' ? 'Si tiene preguntas :' : 'If you have questions about this Cookie Policy, contact us:'}<br />
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
          <a href="#" className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Likro <span>&</span> Lihtov
          </a>

          {/* Nav Links */}
          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
              <li className="mobile-menu-header">
                <span className="logo">Likro <span>&</span> Lihtov</span>
                <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
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
                  <span className="dropdown-item" onClick={() => openDrawer('illiteracy-statistics')}>{t.navIlliteracyStats}</span>
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
                <button className="mobile-action-btn lang" onClick={() => setLang(lang === 'EN' ? 'FR' : lang === 'FR' ? 'ES' : 'EN')}>
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
            <div className="lang-selector-wrapper">
              <button className="lang-selector" onClick={() => setShowLangDropdown(!showLangDropdown)}>
                <Globe size={15} />
                <span>{lang}</span>
                <ChevronDown size={12} />
              </button>
              {showLangDropdown && (
                <div className="lang-dropdown">
                  <div className="lang-option" onClick={() => { setLang('EN'); setShowLangDropdown(false); }}>EN (English)</div>
                  <div className="lang-option" onClick={() => { setLang('FR'); setShowLangDropdown(false); }}>FR (Français)</div>
                  <div className="lang-option" onClick={() => { setLang('ES'); setShowLangDropdown(false); }}>ES (Español)</div>
                </div>
              )}
            </div>

            <button className="btn-donate" onClick={() => setShowDonateModal(true)}>
              <span>{t.btnDonate}</span>
              <ChevronRight size={16} />
            </button>

            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

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
                onClick={() => setShowNewsletterModal(true)}
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
            {['NOVALIA', 'SOLARIS', 'OCEANIA', 'VECTORA', 'HORIZON', 'ALTRIUM', 'GREENWAY'].map((name, idx) => (
              <div key={name} className="sponsor-logo" onClick={() => openDrawer('about-sponsors')}>
                <div className="sponsor-icon-wrapper">
                  {idx % 4 === 0 ? <Sparkles /> : idx % 4 === 1 ? <Globe /> : idx % 4 === 2 ? <Compass /> : <Shield />}
                </div>
                <span className="sponsor-name">{name}</span>
                <span className="sponsor-type">{idx === 0 ? 'Foundation' : idx === 5 ? 'Consulting' : idx === 6 ? 'Initiative' : 'Group'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEDICATED CONTACT US SECTION */}
      <section id="contacts-section" className="contacts-section">
        <div className="container">
          <div className="contact-layout">
            {/* Left side info panel */}
            <div className="contact-info-side">
              <span className="section-label">NGO Operations</span>
              <h2 className="section-title" style={{ fontSize: '32px' }}>{t.conTitle}</h2>
              <p className="section-description" style={{ fontSize: '15px', marginTop: '8px' }}>
                {t.conSub}
              </p>

              <div className="contact-card-box">
                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conOurEmail}</h4>
                    <p>contact@likrolihtov.com</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <Phone size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conOurPhone}</h4>
                    <p>+32 497 15 36 36</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="contact-icon-wrapper">
                    <MapPin size={18} />
                  </div>
                  <div className="contact-card-details">
                    <h4>{t.conHeadOffice}</h4>
                    <p>Rue Edouard Dekoster 53<br />1140 Evere, Brussels, Belgium</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side NGO contact form */}
            <div className="contact-form-card">
              {!contactSubmitted ? (
                <form onSubmit={handleContactSubmit} className="contact-form">
                  <div className="form-group-row">
                    <div className="form-field-group">
                      <label className="form-field-label">{t.conName} *</label>
                      <input 
                        type="text" 
                        placeholder="Jane Doe" 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="form-input" 
                        required 
                        disabled={isSending}
                      />
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label">{t.conEmail} *</label>
                      <input 
                        type="email" 
                        placeholder="jane@example.com" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="form-input" 
                        required 
                        disabled={isSending}
                      />
                    </div>
                  </div>

                  <div className="form-group-row">
                    <div className="form-field-group">
                      <label className="form-field-label">{t.conSubject} *</label>
                      <select 
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                        className="form-select"
                        required
                        disabled={isSending}
                      >
                        <option value="">{t.conProgramSelect}</option>
                        <option value="General Information">{t.conSubjGen}</option>
                        <option value="Volunteering">{t.conSubjVol}</option>
                        <option value="Partnership Opportunities">{t.conSubjPartner}</option>
                        <option value="Support Our Mission">{t.conSubjSupport}</option>
                        <option value="Other">{t.conSubjOther}</option>
                      </select>
                    </div>
                    <div className="form-field-group">
                      <label className="form-field-label">
                        {t.conPhone} <span style={{ textTransform: 'none', fontWeight: 'normal', fontSize: '10px', opacity: 0.65 }}>({lang === 'FR' ? 'Optionnel' : lang === 'ES' ? 'Opcional' : 'Optional'})</span>
                      </label>
                      <PhoneInput
                        placeholder="497 15 36 36"
                        value={contactPhone}
                        onChange={(val) => setContactPhone(val || '')}
                        defaultCountry={defaultCountry}
                        className="react-phone-input-field"
                        disabled={isSending}
                      />
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label">{t.conMessageLabel} * ({contactMessage.length}/1200)</label>
                    <textarea 
                      placeholder={t.conMessage}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value.slice(0, 1200))}
                      maxLength={1200}
                      className="form-textarea"
                      required
                      disabled={isSending}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-form-submit" disabled={isSending}>
                    <span>{isSending ? (lang === 'FR' ? 'Envoi...' : lang === 'ES' ? 'Enviando...' : 'Sending...') : t.conSend}</span>
                    <Send size={15} />
                  </button>
                </form>
              ) : (
                <div className="form-success-card animate-fade-in">
                  <div className="success-check-circle">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="success-card-title">Message Transmitted</h3>
                  <p className="success-card-text">
                    Thank you, <strong>{contactName}</strong>. Your query has been logged in our system. A coordinator will reach out to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactName('');
                      setContactEmail('');
                      setContactMessage('');
                      setContactSubject('');
                      setContactPhone('');
                    }}
                    className="btn-donate"
                    style={{ marginTop: '16px' }}
                  >
                    <span>Write another message</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="footer-logo">
                Likro <span>&</span> Lihtov
              </a>
              <p className="footer-desc">{t.footDesc}</p>
              
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
                <li><a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</a></li>
                <li><a onClick={() => openDrawer('about-organization')}>{t.navAboutOrg}</a></li>
                <li><a onClick={() => openDrawer('about-goals')}>{t.navAboutGoals}</a></li>
                <li><a onClick={() => openDrawer('projects-construction')}>{t.navProjectsConst}</a></li>
                <li><a href="#contacts-section">{t.navContacts}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-col-title">{t.footContact}</h3>
              <div className="footer-contact">
                <div className="contact-item">
                  <Mail size={16} />
                  <span>contact@likrolihtov.com</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+32 497 15 36 36</span>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <span>
                    Rue Edouard Dekoster 53,<br />
                    1140 Evere,<br />
                    Brussels, Belgium
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="footer-col-title">{t.footStay}</h3>
              <div className="footer-subscribe">
                <p className="subscribe-text">{t.footSubText}</p>
                <form onSubmit={handleFooterNewsletterSubmit} className="subscribe-form">
                  <input 
                    type="email" 
                    placeholder={t.footSubPlaceholder} 
                    value={footerEmail} 
                    onChange={(e) => setFooterEmail(e.target.value)}
                    className="subscribe-input"
                    required
                  />
                  <button type="submit" className="subscribe-btn">{t.footSubBtn}</button>
                </form>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{t.footCopy}</span>
            <div className="footer-bottom-links">
              <a href="#privacy">{t.footNav === 'Navigation' ? 'Privacy Policy' : t.footNav === 'Navegación' ? 'Política de Privacidad' : 'Politique de Confidentialité'}</a>
              <span>|</span>
              <a href="#terms">{t.footNav === 'Navigation' ? 'Terms of Use' : t.footNav === 'Navegación' ? 'Términos de Uso' : 'Conditions d\'Utilisation'}</a>
              <span>|</span>
              <a href="#faq" onClick={(e) => { e.preventDefault(); setShowFaqModal(true); }}>FAQ</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Multilingual Slide-in Drawer */}
      <div className={`overlay-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="overlay-backdrop" onClick={closeDrawer}></div>
        <div className="overlay-panel">
          <div className="overlay-header">
            <span className="overlay-path">{selectedSection?.path}</span>
            <button className="overlay-close-btn" onClick={closeDrawer}>
              <X size={20} />
            </button>
          </div>

          <div className="overlay-body">
            {selectedSection && (
              <div className="drawer-layout animate-fade-in">
                <aside className="drawer-sidebar">
                  {selectedSection.statNumber && (
                    <div className="sidebar-card">
                      <h4 className="sidebar-card-title">Impact</h4>
                      <p className="sidebar-card-text">{selectedSection.sidebarText}</p>
                      <div className="sidebar-stat">{selectedSection.statNumber}</div>
                      <div className="sidebar-stat-label">{selectedSection.statLabel}</div>
                    </div>
                  )}

                  <div className="sidebar-quickinfo">
                    <h4 className="quickinfo-title">Status</h4>
                    <ul className="quickinfo-list">
                      <li>
                        <CheckCircle size={14} />
                        <span>Empowerment Focus</span>
                      </li>
                      <li>
                        <CheckCircle size={14} />
                        <span>Safety Guaranteed</span>
                      </li>
                      <li>
                        <CheckCircle size={14} />
                        <span>Community Funded</span>
                      </li>
                    </ul>
                  </div>
                </aside>

                <article className="drawer-main">
                  <h2 className="drawer-title">{selectedSection.title}</h2>
                  <h3 className="drawer-subtitle">{selectedSection.subtitle}</h3>
                  
                  {selectedSection.mainParagraphs.map((para, index) => (
                    <p key={index} className="drawer-text">{para}</p>
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
                              <h4>{lang === 'FR' ? 'Bases Phonétiques & Tracé de Sons' : lang === 'ES' ? 'Fundamentos Fonéticos y Trazado de Sonidos' : 'Phonetic Foundations & Sound Tracing'}</h4>
                              <p>{lang === 'FR' ? 'Les étudiantes commencent par tracer les voyelles et les sons de base.' : lang === 'ES' ? 'Las alumnas comienzan trazando las vocales y los sonidos consonánticos básicos.' : 'Students begin by tracing basic vowels and consonant sounds, linking them to simple high-recognition symbols.'}</p>
                            </div>
                          </li>
                          <li className="curriculum-step">
                            <div className="curriculum-num">1B</div>
                            <div className="curriculum-details">
                              <h4>{lang === 'FR' ? 'Maîtrise du Nom & Signature' : lang === 'ES' ? 'Dominio de Nombre y Firma' : 'Name & Signature Mastery'}</h4>
                              <p>{lang === 'FR' ? 'Apprendre à signer son nom pour valider des actes civils.' : lang === 'ES' ? 'Cada mujer aprende a deletrear, trazar y escribir su propio nombre.' : 'Every woman learns to spell, trace, and write her own name. This builds immediate cognitive confidence and legal signature validity.'}</p>
                            </div>
                          </li>
                        </ul>
                      )}

                      {activeCurriculumTab === 2 && (
                        <ul className="curriculum-list animate-fade-in">
                          <li className="curriculum-step">
                            <div className="curriculum-num">2A</div>
                            <div className="curriculum-details">
                              <h4>{lang === 'FR' ? 'Lecture Pratique de Phrases' : lang === 'ES' ? 'Lectura Práctica de Oraciones' : 'Practical Sentence Tracing'}</h4>
                              <p>{lang === 'FR' ? 'Lire des étiquettes de médicaments, des panneaux ou des documents scolaires.' : lang === 'ES' ? 'Formar oraciones simples relacionadas con las compras del mercado y las tareas escolares.' : 'Forming simple sentences geared around groceries, children\'s homework, and daily transit reading (bus signs, medical labels).'}</p>
                            </div>
                          </li>
                        </ul>
                      )}

                      {activeCurriculumTab === 3 && (
                        <ul className="curriculum-list animate-fade-in">
                          <li className="curriculum-step">
                            <div className="curriculum-num">3A</div>
                            <div className="curriculum-details">
                              <h4>{lang === 'FR' ? 'Introduction au Numérique' : lang === 'ES' ? 'Introducción a la Alfabetización Digital' : 'Digital Literacy Introduction'}</h4>
                              <p>{lang === 'FR' ? 'Apprendre à naviguer sur des tablettes tactiles éducatives.' : lang === 'ES' ? 'Aprender a usar tabletas, navegar por interfaces de aprendizaje y enviar mensajes.' : 'Learning how to use tablets, navigate web interfaces for learning materials, and type basic phone messages.'}</p>
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
                </article>
              </div>
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
                {lang === 'FR' ? 'politique relative aux cookies.' : lang === 'ES' ? 'política de cookies.' : 'cookie policy.'}
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
