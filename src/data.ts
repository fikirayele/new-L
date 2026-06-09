export interface DetailSection {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  statNumber?: string;
  statLabel?: string;
  sidebarText?: string;
  sidebarTitle?: string;
  mainParagraphs: string[];
  cards?: { title: string; text: string }[];
  listTitle?: string;
  listItems?: string[];
  galleryType?: 'photos' | 'curriculum' | 'team' | 'none';
}

export interface CountryData {
  code: string;
  name: string;
  flag: string;
  iso: string;
}

export const countryPrefixes: CountryData[] = [
  { flag: '🇦🇫', code: '+93', name: 'Afghanistan', iso: 'AF' },
  { flag: '🇦🇱', code: '+355', name: 'Albania', iso: 'AL' },
  { flag: '🇩🇿', code: '+213', name: 'Algeria', iso: 'DZ' },
  { flag: '🇦🇩', code: '+376', name: 'Andorra', iso: 'AD' },
  { flag: '🇦🇴', code: '+244', name: 'Angola', iso: 'AO' },
  { flag: '🇦🇬', code: '+1-268', name: 'Antigua and Barbuda', iso: 'AG' },
  { flag: '🇦🇷', code: '+54', name: 'Argentina', iso: 'AR' },
  { flag: '🇦🇲', code: '+374', name: 'Armenia', iso: 'AM' },
  { flag: '🇦🇺', code: '+61', name: 'Australia', iso: 'AU' },
  { flag: '🇦🇹', code: '+43', name: 'Austria', iso: 'AT' },
  { flag: '🇦🇿', code: '+994', name: 'Azerbaijan', iso: 'AZ' },
  { flag: '🇧🇸', code: '+1-242', name: 'Bahamas', iso: 'BS' },
  { flag: '🇧🇭', code: '+973', name: 'Bahrain', iso: 'BH' },
  { flag: '🇧🇩', code: '+880', name: 'Bangladesh', iso: 'BD' },
  { flag: '🇧🇧', code: '+1-246', name: 'Barbados', iso: 'BB' },
  { flag: '🇧🇾', code: '+375', name: 'Belarus', iso: 'BY' },
  { flag: '🇧🇪', code: '+32', name: 'Belgium', iso: 'BE' },
  { flag: '🇧🇿', code: '+501', name: 'Belize', iso: 'BZ' },
  { flag: '🇧🇯', code: '+229', name: 'Benin', iso: 'BJ' },
  { flag: '🇧🇹', code: '+975', name: 'Bhutan', iso: 'BT' },
  { flag: '🇧🇴', code: '+591', name: 'Bolivia', iso: 'BO' },
  { flag: '🇧🇦', code: '+387', name: 'Bosnia and Herzegovina', iso: 'BA' },
  { flag: '🇧🇼', code: '+267', name: 'Botswana', iso: 'BW' },
  { flag: '🇧🇷', code: '+55', name: 'Brazil', iso: 'BR' },
  { flag: '🇧🇳', code: '+673', name: 'Brunei', iso: 'BN' },
  { flag: '🇧🇬', code: '+359', name: 'Bulgaria', iso: 'BG' },
  { flag: '🇧🇫', code: '+226', name: 'Burkina Faso', iso: 'BF' },
  { flag: '🇧🇮', code: '+257', name: 'Burundi', iso: 'BI' },
  { flag: '🇰🇭', code: '+855', name: 'Cambodia', iso: 'KH' },
  { flag: '🇨🇲', code: '+237', name: 'Cameroon', iso: 'CM' },
  { flag: '🇨🇦', code: '+1', name: 'Canada', iso: 'CA' },
  { flag: '🇨🇻', code: '+238', name: 'Cape Verde', iso: 'CV' },
  { flag: '🇨🇫', code: '+236', name: 'Central African Republic', iso: 'CF' },
  { flag: '🇹🇩', code: '+235', name: 'Chad', iso: 'TD' },
  { flag: '🇨🇱', code: '+56', name: 'Chile', iso: 'CL' },
  { flag: '🇨🇳', code: '+86', name: 'China', iso: 'CN' },
  { flag: '🇨🇴', code: '+57', name: 'Colombia', iso: 'CO' },
  { flag: '🇰🇲', code: '+269', name: 'Comoros', iso: 'KM' },
  { flag: '🇨🇬', code: '+242', name: 'Congo (Brazzaville)', iso: 'CG' },
  { flag: '🇨🇩', code: '+243', name: 'Congo (Kinshasa)', iso: 'CD' },
  { flag: '🇨🇷', code: '+506', name: 'Costa Rica', iso: 'CR' },
  { flag: '🇭🇷', code: '+385', name: 'Croatia', iso: 'HR' },
  { flag: '🇨🇺', code: '+53', name: 'Cuba', iso: 'CU' },
  { flag: '🇨🇾', code: '+357', name: 'Cyprus', iso: 'CY' },
  { flag: '🇨🇿', code: '+420', name: 'Czechia', iso: 'CZ' },
  { flag: '🇩🇰', code: '+45', name: 'Denmark', iso: 'DK' },
  { flag: '🇩🇯', code: '+253', name: 'Djibouti', iso: 'DJ' },
  { flag: '🇩🇲', code: '+1-767', name: 'Dominica', iso: 'DM' },
  { flag: '🇩🇴', code: '+1-809', name: 'Dominican Republic', iso: 'DO' },
  { flag: '🇪🇨', code: '+593', name: 'Ecuador', iso: 'EC' },
  { flag: '🇪🇬', code: '+20', name: 'Egypt', iso: 'EG' },
  { flag: '🇸🇻', code: '+503', name: 'El Salvador', iso: 'SV' },
  { flag: '🇬🇶', code: '+240', name: 'Equatorial Guinea', iso: 'GQ' },
  { flag: '🇪🇷', code: '+291', name: 'Eritrea', iso: 'ER' },
  { flag: '🇪🇪', code: '+372', name: 'Estonia', iso: 'EE' },
  { flag: '🇸🇿', code: '+268', name: 'Eswatini', iso: 'SZ' },
  { flag: '🇪🇹', code: '+251', name: 'Ethiopia', iso: 'ET' },
  { flag: '🇫🇯', code: '+679', name: 'Fiji', iso: 'FJ' },
  { flag: '🇫🇮', code: '+358', name: 'Finland', iso: 'FI' },
  { flag: '🇫🇷', code: '+33', name: 'France', iso: 'FR' },
  { flag: '🇬🇦', code: '+241', name: 'Gabon', iso: 'GA' },
  { flag: '🇬🇲', code: '+220', name: 'Gambia', iso: 'GM' },
  { flag: '🇬🇪', code: '+995', name: 'Georgia', iso: 'GE' },
  { flag: '🇩🇪', code: '+49', name: 'Germany', iso: 'DE' },
  { flag: '🇬🇭', code: '+233', name: 'Ghana', iso: 'GH' },
  { flag: '🇬🇷', code: '+30', name: 'Greece', iso: 'GR' },
  { flag: '🇬🇩', code: '+1-473', name: 'Grenada', iso: 'GD' },
  { flag: '🇬🇹', code: '+502', name: 'Guatemala', iso: 'GT' },
  { flag: '🇬🇳', code: '+224', name: 'Guinea', iso: 'GN' },
  { flag: '🇬🇼', code: '+245', name: 'Guinea-Bissau', iso: 'GW' },
  { flag: '🇬🇾', code: '+592', name: 'Guyana', iso: 'GY' },
  { flag: '🇭🇹', code: '+509', name: 'Haiti', iso: 'HT' },
  { flag: '🇭🇳', code: '+504', name: 'Honduras', iso: 'HN' },
  { flag: '🇭🇺', code: '+36', name: 'Hungary', iso: 'HU' },
  { flag: '🇮🇸', code: '+354', name: 'Iceland', iso: 'IS' },
  { flag: '🇮🇳', code: '+91', name: 'India', iso: 'IN' },
  { flag: '🇮🇩', code: '+62', name: 'Indonesia', iso: 'ID' },
  { flag: '🇮🇷', code: '+98', name: 'Iran', iso: 'IR' },
  { flag: '🇮🇶', code: '+964', name: 'Iraq', iso: 'IQ' },
  { flag: '🇮🇪', code: '+353', name: 'Ireland', iso: 'IE' },
  { flag: '🇮🇱', code: '+972', name: 'Israel', iso: 'IL' },
  { flag: '🇮🇹', code: '+39', name: 'Italy', iso: 'IT' },
  { flag: '🇯🇲', code: '+1-876', name: 'Jamaica', iso: 'JM' },
  { flag: '🇯🇵', code: '+81', name: 'Japan', iso: 'JP' },
  { flag: '🇯🇴', code: '+962', name: 'Jordan', iso: 'JO' },
  { flag: '🇰🇿', code: '+7', name: 'Kazakhstan', iso: 'KZ' },
  { flag: '🇰🇪', code: '+254', name: 'Kenya', iso: 'KE' },
  { flag: '🇰🇮', code: '+686', name: 'Kiribati', iso: 'KI' },
  { flag: '🇽🇰', code: '+383', name: 'Kosovo', iso: 'XK' },
  { flag: '🇰🇼', code: '+965', name: 'Kuwait', iso: 'KW' },
  { flag: '🇰🇬', code: '+996', name: 'Kyrgyzstan', iso: 'KG' },
  { flag: '🇱🇦', code: '+856', name: 'Laos', iso: 'LA' },
  { flag: '🇱🇻', code: '+371', name: 'Latvia', iso: 'LV' },
  { flag: '🇱🇧', code: '+961', name: 'Lebanon', iso: 'LB' },
  { flag: '🇱🇸', code: '+266', name: 'Lesotho', iso: 'LS' },
  { flag: '🇱🇷', code: '+231', name: 'Liberia', iso: 'LR' },
  { flag: '🇱🇾', code: '+218', name: 'Libya', iso: 'LY' },
  { flag: '🇱🇮', code: '+423', name: 'Liechtenstein', iso: 'LI' },
  { flag: '🇱🇹', code: '+370', name: 'Lithuania', iso: 'LT' },
  { flag: '🇱🇺', code: '+352', name: 'Luxembourg', iso: 'LU' },
  { flag: '🇲🇬', code: '+261', name: 'Madagascar', iso: 'MG' },
  { flag: '🇲🇼', code: '+265', name: 'Malawi', iso: 'MW' },
  { flag: '🇲🇾', code: '+60', name: 'Malaysia', iso: 'MY' },
  { flag: '🇲🇻', code: '+960', name: 'Maldives', iso: 'MV' },
  { flag: '🇲🇱', code: '+223', name: 'Mali', iso: 'ML' },
  { flag: '🇲🇹', code: '+356', name: 'Malta', iso: 'MT' },
  { flag: '🇲🇭', code: '+692', name: 'Marshall Islands', iso: 'MH' },
  { flag: '🇲🇷', code: '+222', name: 'Mauritania', iso: 'MR' },
  { flag: '🇲🇺', code: '+230', name: 'Mauritius', iso: 'MU' },
  { flag: '🇲🇽', code: '+52', name: 'Mexico', iso: 'MX' },
  { flag: '🇫🇲', code: '+691', name: 'Micronesia', iso: 'FM' },
  { flag: '🇲🇩', code: '+373', name: 'Moldova', iso: 'MD' },
  { flag: '🇲🇨', code: '+377', name: 'Monaco', iso: 'MC' },
  { flag: '🇲🇳', code: '+976', name: 'Mongolia', iso: 'MN' },
  { flag: '🇲🇪', code: '+382', name: 'Montenegro', iso: 'ME' },
  { flag: '🇲🇦', code: '+212', name: 'Morocco', iso: 'MA' },
  { flag: '🇲🇿', code: '+258', name: 'Mozambique', iso: 'MZ' },
  { flag: '🇲🇲', code: '+95', name: 'Myanmar', iso: 'MM' },
  { flag: '🇳🇦', code: '+264', name: 'Namibia', iso: 'NA' },
  { flag: '🇳🇷', code: '+674', name: 'Nauru', iso: 'NR' },
  { flag: '🇳🇵', code: '+977', name: 'Nepal', iso: 'NP' },
  { flag: '🇳🇱', code: '+31', name: 'Netherlands', iso: 'NL' },
  { flag: '🇳🇿', code: '+64', name: 'New Zealand', iso: 'NZ' },
  { flag: '🇳🇮', code: '+505', name: 'Nicaragua', iso: 'NI' },
  { flag: '🇳🇪', code: '+227', name: 'Niger', iso: 'NE' },
  { flag: '🇳🇬', code: '+234', name: 'Nigeria', iso: 'NG' },
  { flag: '🇰🇵', code: '+850', name: 'North Korea', iso: 'KP' },
  { flag: '🇲🇰', code: '+389', name: 'North Macedonia', iso: 'MK' },
  { flag: '🇳🇴', code: '+47', name: 'Norway', iso: 'NO' },
  { flag: '🇴🇲', code: '+968', name: 'Oman', iso: 'OM' },
  { flag: '🇵🇰', code: '+92', name: 'Pakistan', iso: 'PK' },
  { flag: '🇵🇼', code: '+680', name: 'Palau', iso: 'PW' },
  { flag: '🇵🇸', code: '+970', name: 'Palestine', iso: 'PS' },
  { flag: '🇵🇦', code: '+507', name: 'Panama', iso: 'PA' },
  { flag: '🇵🇬', code: '+675', name: 'Papua New Guinea', iso: 'PG' },
  { flag: '🇵🇾', code: '+595', name: 'Paraguay', iso: 'PY' },
  { flag: '🇵🇪', code: '+51', name: 'Peru', iso: 'PE' },
  { flag: '🇵🇭', code: '+63', name: 'Philippines', iso: 'PH' },
  { flag: '🇵🇱', code: '+48', name: 'Poland', iso: 'PL' },
  { flag: '🇵🇹', code: '+351', name: 'Portugal', iso: 'PT' },
  { flag: '🇶🇦', code: '+974', name: 'Qatar', iso: 'QA' },
  { flag: '🇷🇴', code: '+40', name: 'Romania', iso: 'RO' },
  { flag: '🇷🇺', code: '+7', name: 'Russia', iso: 'RU' },
  { flag: '🇷🇼', code: '+250', name: 'Rwanda', iso: 'RW' },
  { flag: '🇰🇳', code: '+1-869', name: 'Saint Kitts and Nevis', iso: 'KN' },
  { flag: '🇱🇨', code: '+1-758', name: 'Saint Lucia', iso: 'LC' },
  { flag: '🇻🇨', code: '+1-784', name: 'Saint Vincent and the Grenadines', iso: 'VC' },
  { flag: '🇼🇸', code: '+685', name: 'Samoa', iso: 'WS' },
  { flag: '🇸🇲', code: '+378', name: 'San Marino', iso: 'SM' },
  { flag: '🇸🇹', code: '+239', name: 'Sao Tome and Principe', iso: 'ST' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi Arabia', iso: 'SA' },
  { flag: '🇸🇳', code: '+221', name: 'Senegal', iso: 'SN' },
  { flag: '🇷🇸', code: '+381', name: 'Serbia', iso: 'RS' },
  { flag: '🇸🇨', code: '+248', name: 'Seychelles', iso: 'SC' },
  { flag: '🇸🇱', code: '+232', name: 'Sierra Leone', iso: 'SL' },
  { flag: '🇸🇬', code: '+65', name: 'Singapore', iso: 'SG' },
  { flag: '🇸🇰', code: '+421', name: 'Slovakia', iso: 'SK' },
  { flag: '🇸🇮', code: '+386', name: 'Slovenia', iso: 'SI' },
  { flag: '🇸🇧', code: '+677', name: 'Solomon Islands', iso: 'SB' },
  { flag: '🇸🇴', code: '+252', name: 'Somalia', iso: 'SO' },
  { flag: '🇿🇦', code: '+27', name: 'South Africa', iso: 'ZA' },
  { flag: '🇰🇷', code: '+82', name: 'South Korea', iso: 'KR' },
  { flag: '🇸🇸', code: '+211', name: 'South Sudan', iso: 'SS' },
  { flag: '🇱🇰', code: '+94', name: 'Sri Lanka', iso: 'LK' },
  { flag: '🇸🇩', code: '+249', name: 'Sudan', iso: 'SD' },
  { flag: '🇸🇷', code: '+597', name: 'Suriname', iso: 'SR' },
  { flag: '🇸🇪', code: '+46', name: 'Sweden', iso: 'SE' },
  { flag: '🇨🇭', code: '+41', name: 'Switzerland', iso: 'CH' },
  { flag: '🇸🇾', code: '+963', name: 'Syria', iso: 'SY' },
  { flag: '🇹🇼', code: '+886', name: 'Taiwan', iso: 'TW' },
  { flag: '🇹🇯', code: '+992', name: 'Tajikistan', iso: 'TJ' },
  { flag: '🇹🇿', code: '+255', name: 'Tanzania', iso: 'TZ' },
  { flag: '🇹🇭', code: '+66', name: 'Thailand', iso: 'TH' },
  { flag: '🇹🇱', code: '+670', name: 'Timor-Leste', iso: 'TL' },
  { flag: '🇹🇬', code: '+228', name: 'Togo', iso: 'TG' },
  { flag: '🇹🇴', code: '+676', name: 'Tonga', iso: 'TO' },
  { flag: '🇹🇹', code: '+1-868', name: 'Trinidad and Tobago', iso: 'TT' },
  { flag: '🇹🇳', code: '+216', name: 'Tunisia', iso: 'TN' },
  { flag: '🇹🇷', code: '+90', name: 'Turkey', iso: 'TR' },
  { flag: '🇹🇲', code: '+993', name: 'Turkmenistan', iso: 'TM' },
  { flag: '🇹🇻', code: '+688', name: 'Tuvalu', iso: 'TV' },
  { flag: '🇺🇬', code: '+256', name: 'Uganda', iso: 'UG' },
  { flag: '🇺🇦', code: '+380', name: 'Ukraine', iso: 'UA' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates', iso: 'AE' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom', iso: 'GB' },
  { flag: '🇺🇸', code: '+1', name: 'United States', iso: 'US' },
  { flag: '🇺🇾', code: '+598', name: 'Uruguay', iso: 'UY' },
  { flag: '🇺🇿', code: '+998', name: 'Uzbekistan', iso: 'UZ' },
  { flag: '🇻🇺', code: '+678', name: 'Vanuatu', iso: 'VU' },
  { flag: '🇻🇦', code: '+39', name: 'Vatican City', iso: 'VA' },
  { flag: '🇻🇪', code: '+58', name: 'Venezuela', iso: 'VE' },
  { flag: '🇻🇳', code: '+84', name: 'Vietnam', iso: 'VN' },
  { flag: '🇾🇪', code: '+967', name: 'Yemen', iso: 'YE' },
  { flag: '🇿🇲', code: '+260', name: 'Zambia', iso: 'ZM' },
  { flag: '🇿🇼', code: '+263', name: 'Zimbabwe', iso: 'ZW' }
];

export const sectionsData: Record<string, Record<string, DetailSection>> = {
  EN: {
    'about-organization': {
      id: 'about-organization',
      path: 'Who we are / Organization',
      title: 'Our Organization',
      subtitle: 'Likro & Lihtov means "Read and Write" in Hebrew.',
      sidebarTitle: 'Our Story',
      sidebarText: 'Likro & Lihtov (לקרוא ולכתוב), which means "Read and Write" in Hebrew, was inspired by a life-changing moment in 2016 in Kinshasa, Democratic Republic of the Congo. While stuck in traffic, I witnessed two young girls selling oil in the street. The taxi driver explained that many children like them do not attend school because they need to help support their families financially. I could hardly believe it. This was the beginning of my discovery of a difficult reality faced by many women and children who lack access to education and opportunities. Two years later, what started as a simple idea gradually evolved into a project dedicated to literacy, empowerment and community development. Today, we work to help illiterate women gain the knowledge, confidence and skills needed to build a better future for themselves, their families and their communities.',
      mainParagraphs: [
        'Founded in Congo DR in 2018, our organization believes that education is one of the most powerful tools for transforming lives and communities.',
        'We work to promote literacy, support women’s empowerment and contribute to sustainable development projects.',
        'Our mission is to give people the knowledge, skills and opportunities they need to build a better future for themselves, their families and their communities.',
        'Every project we undertake is guided by a simple idea: when people gain access to education, they gain the power to create change.'
      ],
      cards: [
        { title: 'Our Vision', text: 'Whoever you are, wherever you come from, and whatever path you choose, strive to make our world a better place.' },
        { title: 'Our Values', text: 'Treat others with the same respect, dignity and kindness that you expect for yourself.' }
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'Who we are / School program',
      title: 'School Program & Impact Metrics',
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
      path: 'Who we are / Team',
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
      path: 'Who we are / Sponsors',
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
    'illiteracy-statistics': {
      id: 'illiteracy-statistics',
      path: 'Illiteracy / Statistics',
      title: 'Global & Regional Illiteracy Statistics',
      subtitle: 'Understanding the numbers behind the global educational divide.',
      statNumber: '773 Million',
      statLabel: 'Illiterate Adults',
      sidebarText: 'Illiteracy is not distributed evenly. Women represent over 60% of the world\'s illiterate population.',
      mainParagraphs: [
        'Globally, hundreds of millions of adults lack basic literacy skills. Two-thirds of these are women, a proportion that has remained virtually unchanged for decades. This gap highlights a systemic gender disparity in access to early education and lifelong learning opportunities.',
        'In regions of high poverty, female illiteracy rates can exceed 50%. The economic impact of this is severe: families with illiterate mothers are far more likely to experience chronic poverty, poor health outcomes, and limited structural opportunities for children.',
        'Studies show that when a woman learns to read and write, it has a direct positive impact on her family\'s health, nutrition, and income, breaking the intergenerational cycle of educational disadvantage.'
      ],
      cards: [
        { title: 'Gender Disparity', text: '63% of the world\'s illiterate population are women, reflecting long-standing social barriers and restricted access to school.' },
        { title: 'Economic Impact', text: 'Countries with higher literacy rates enjoy greater economic productivity and lower rates of extreme poverty.' },
        { title: 'Intergenerational Success', text: 'Children of literate mothers are 50% more likely to stay in school past the age of 12 and perform better academically.' }
      ]
    },
    'illiteracy-consequences': {
      id: 'illiteracy-consequences',
      path: 'Illiteracy / Consequences',
      title: 'The Consequences of Illiteracy',
      subtitle: 'How the lack of reading and writing skills impacts lives and communities.',
      statNumber: '2.5x',
      statLabel: 'Income Difference',
      sidebarText: 'Without literacy, individuals face legal vulnerability, financial exploitation, and reduced health literacy.',
      mainParagraphs: [
        'The consequences of adult illiteracy are far-reaching, affecting personal safety, legal rights, and economic security. An illiterate individual cannot verify the contents of a legal contract, read employment agreements, or follow medical prescriptions, leaving them highly vulnerable to exploitation.',
        'In daily life, simple tasks like navigating public transit, reading street signs, or using digital technologies become massive obstacles. This leads to social isolation, low self-esteem, and dependence on others for basic daily activities.',
        'By tackling illiteracy, we restore personal autonomy, enable civic participation, and empower women to take control of their health, finances, and legal decisions.'
      ],
      cards: [
        { title: 'Legal Vulnerability', text: 'Inability to read contracts makes illiterate adults easy targets for predatory lending and unfair labor practices.' },
        { title: 'Health Risks', text: 'Difficulty reading warning labels, medical dosages, and health instructions leads to higher rates of preventable illness.' },
        { title: 'Digital Exclusion', text: 'In an increasingly digital world, lacking reading and writing skills completely locks individuals out of modern communication and banking tools.' }
      ]
    },
    'cookie-policy': {
      id: 'cookie-policy',
      path: 'Who we are / Cookie policy',
      title: 'Cookie Policy',
      subtitle: 'Likro & Lihtov Organization',
      statNumber: '100%',
      statLabel: 'Compliant',
      sidebarText: 'We value your privacy. Read our policy to understand what data we collect and how it helps our mission.',
      mainParagraphs: [
        'Likro & Lihtov Organization uses cookies and similar technologies to improve your browsing experience, enhance website performance, remember your preferences, and better understand how visitors use our website.',
        'What Are Cookies? Cookies are small files stored on your device when you visit our website. They help our website function properly and provide a smoother user experience.',
        'Managing Cookies: You can manage or disable cookies through your browser settings. Please note that disabling some cookies may affect certain website features.',
        'Changes to This Policy: We may update this Cookie Policy from time to time. Any updates will be posted on this page.',
        'Contact Us: If you have questions about this Cookie Policy, contact us: Email: contact@likrolihtov.com | Website: https://new-l-plum.vercel.app/'
      ],
      cards: [
        { title: 'Necessary Cookies', text: 'Required for website functionality and security.' },
        { title: 'Functional Cookies', text: 'Remember your preferences and settings.' },
        { title: 'Analytics Cookies', text: 'Help us improve our website by understanding visitor interactions.' }
      ]
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
        'In many vulnerable communities, walking alone to an evening or afternoon class carries security risks. Fear of transit harassment or theft is one of the highest reasons women drop out of adult programs. At Likro & Lihtov, we treat student safety as an absolute priority.',
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
      path: 'Qui sommes-nous / Organisation',
      title: 'Notre Organisation',
      subtitle: 'Likro & Lihtov signifie « Lire et Écrire » en hébreu.',
      sidebarTitle: 'Notre histoire',
      sidebarText: 'Likro & Lihtov (לקרוא ולכתוב), qui signifie « Lire et Écrire » en hébreu, est né d’un événement marquant vécu en 2016 à Kinshasa, en République Démocratique du Congo. Alors que j’étais bloqué dans les embouteillages, j’ai aperçu deux jeunes filles vendant de l’huile dans la rue. Le chauffeur de taxi m’a expliqué que de nombreux enfants comme elles ne fréquentent pas l’école parce qu’ils doivent contribuer financièrement aux revenus de leur famille. J’avais du mal à le croire. Ce fut le début de ma découverte d’une réalité difficile vécue par de nombreuses femmes et de nombreux enfants privés d’accès à l’éducation et aux opportunités. Deux ans plus tard, ce qui n’était au départ qu’une simple idée s’est progressivement transformé en un projet dédié à l’alphabétisation, à l’autonomisation et au développement des communautés. Aujourd’hui, nous travaillons pour aider les femmes analphabètes à acquérir les connaissances, la confiance et les compétences nécessaires pour construire un avenir meilleur pour elles-mêmes, leurs familles et leurs communautés.',
      mainParagraphs: [
        'Fondée en RD Congo en 2018, notre organisation estime que l\'éducation est l\'un des outils les plus puissants pour transformer les vies et les communautés.',
        'Nous travaillons à promouvoir l\'alphabétisation, à soutenir l\'autonomisation des femmes et à contribuer à des projets de développement durable.',
        'Notre mission est de donner aux gens les connaissances, les compétences et les opportunités dont ils ont besoin pour construire un avenir meilleur pour eux-mêmes, leurs familles et leurs communautés.',
        'Chaque projet que nous entreprenons est guidé par une idée simple : lorsque les gens ont accès à l\'éducation, ils acquièrent le pouvoir de créer le changement.'
      ],
      cards: [
        { title: 'Notre vision', text: 'Qui que vous soyez, d’où que vous veniez et quel que soit le chemin que vous choisissez, travaillez à rendre notre monde meilleur.' },
        { title: 'Nos valeurs', text: 'Traitez les autres comme vous aimeriez être traité: avec le même respect, dignité et bienveillance.' }
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'Qui sommes-nous / Programme scolaire',
      title: 'Objectifs Stratégiques & Programme Scolaire',
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
      path: 'Qui sommes-nous / Équipe',
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
      path: 'Qui sommes-nous / Sponsors',
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
    'illiteracy-statistics': {
      id: 'illiteracy-statistics',
      path: 'Analphabétisme / Statistiques',
      title: 'Statistiques sur l\'analphabétisme',
      subtitle: 'Comprendre les chiffres de la fracture éducative mondiale.',
      statNumber: '773M',
      statLabel: 'Adultes Analphabètes',
      sidebarText: 'L\'analphabétisme n\'est pas réparti uniformément. Les femmes représentent plus de 60 % de la population analphabète mondiale.',
      mainParagraphs: [
        'À l\'échelle mondiale, des centaines de millions d\'adultes ne possèdent pas les compétences de base en lecture et en écriture. Les deux tiers d\'entre eux sont des femmes, une proportion restée pratiquement inchangée depuis des décennies.',
        'Dans les régions de grande pauvreté, les taux d\'analphabétisme des femmes peuvent dépasser 50 %. L\'impact économique est sévère : les familles dont la mère est analphabète sont beaucoup plus exposées à la pauvreté chronique.',
        'Des études montrent que lorsqu\'une femme apprend à lire et à écrire, cela a un impact positif direct sur la santé, la nutrition et le revenu de sa famille, brisant ainsi le cycle intergénérationnel de l\'analphabétisme.'
      ],
      cards: [
        { title: 'Inégalité de genre', text: '63 % de la population analphabète mondiale est composée de femmes, reflétant des barrières sociales de longue date.' },
        { title: 'Impact économique', text: 'Les pays ayant des taux d\'alphabétisation plus élevés bénéficient d\'une productivité économique accrue.' }
      ]
    },
    'illiteracy-consequences': {
      id: 'illiteracy-consequences',
      path: 'Analphabétisme / Conséquences',
      title: 'Les conséquences de l\'analphabétisme',
      subtitle: 'Comment le manque d\'écriture et de lecture affecte les vies.',
      statNumber: '2.5x',
      statLabel: 'Écart de revenu',
      sidebarText: 'Sans alphabétisation, les individus font face à une vulnérabilité juridique et à une exploitation financière.',
      mainParagraphs: [
        'Les conséquences de l\'analphabétisme des adultes sont vastes et touchent à la sécurité personnelle, aux droits légaux et à l\'autonomie financière. Une personne analhabète ne peut pas vérifier le contenu d\'un contrat juridique, réduisant ses capacités de défense.',
        'Dans la vie quotidienne, les tâches simples comme utiliser les transports publics ou lire les panneaux de signalisation deviennent des obstacles majeurs.',
        'En luttant contre l\'analphabétisme, nous restaurons l\'autonomie personnelle, favorisons la participation citoyenne et donnons aux femmes le pouvoir de gérer leurs décisions en matière de santé, de finances et de droit.'
      ],
      cards: [
        { title: 'Vulnérabilité juridique', text: 'L\'incapacité de lire les contrats rend les adultes analphabètes vulnérables aux fraudes.' },
        { title: 'Risques sanitaires', text: 'La difficulté à lire les notices médicales entraîne des taux plus élevés de maladies évitables.' }
      ]
    },
    'cookie-policy': {
      id: 'cookie-policy',
      path: 'Qui sommes-nous / Politique relative aux cookies',
      title: 'Politique relative aux cookies',
      subtitle: 'Organisation Likro & Lihtov',
      statNumber: '100%',
      statLabel: 'Conforme',
      sidebarText: 'Nous apprécions votre vie privée. Lisez notre politique pour comprendre quelles données nous collectons.',
      mainParagraphs: [
        'L\'organisation Likro & Lihtov utilise des cookies et des technologies similaires pour améliorer votre expérience de navigation, améliorer les performances du site et comprendre comment les visiteurs utilisent notre site.',
        'Qu\'est-ce que les cookies ? Les cookies sont de petits fichiers stockés sur votre appareil qui aident le site à fonctionner correctement.',
        'Gérer les cookies : Vous pouvez configurer ou désactiver les cookies dans les paramètres de votre navigateur.',
        'Mises à jour : Nous pouvons modifier cette politique à tout moment. Les mises à jour seront publiées sur cette page.',
        'Contact : Pour toute question, contactez-nous par e-mail: contact@likrolihtov.com ou sur notre site web : https://new-l-plum.vercel.app/'
      ],
      cards: [
        { title: 'Cookies nécessaires', text: 'Requis pour le fonctionnement du site.' },
        { title: 'Cookies de fonctionnalité', text: 'Retiennent vos préférences.' },
        { title: 'Cookies d\'analyse', text: 'Aident à comprendre le trafic du site.' }
      ]
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
      path: 'Quiénes somos / Organización',
      title: 'Nuestra Organización',
      subtitle: 'Likro & Lihtov significa "Leer y Escribir" en hebreo.',
      sidebarTitle: 'Nuestra historia',
      sidebarText: 'Likro & Lihtov (לקרוא ולכתוב), que significa "Leer y Escribir" en hebreo, se inspiró en un momento trascendental en 2016 en Kinshasa, República Democrática del Congo. Mientras estaba atrapado en el tráfico, vi a dos niñas vendiendo aceite en la calle. El taxista me explicó que muchos niños como ellos no asisten a la escuela porque necesitan ayudar económicamente a sus familias. Apenas podía creerlo. Este fue el comienzo de mi descubrimiento de una difícil realidad que enfrentan muchas mujeres y niños que carecen de acceso a la educación y a las oportunidades. Dos años más tarde, lo que comenzó como una simple idea evolucionó gradualmente hacia un proyecto dedicado a la alfabetización, el empoderamiento y el desarrollo comunitario. Hoy trabajamos para ayudar a las mujeres analfabetas a adquirir el conocimiento, la confianza y las habilidades necesarias para construir un futuro mejor para ellas, sus familias y sus comunidades.',
      mainParagraphs: [
        'Fundada en RD Congo en 2018, nuestra organización cree que la educación es una de las herramientas más poderosas para transformar vidas y comunidades.',
        'Trabajamos para promover la alfabetización, apoyar el empoderamiento de las mujeres y contribuir a proyectos de desarrollo sostenible.',
        'Nuestra misión es brindar a las personas el conocimiento, las habilidades y las oportunidades que necesitan para construir un futuro mejor para ellas, sus familias y sus comunidades.',
        'Cada proyecto que emprendemos está guiado por una idea simple: cuando las personas tienen acceso a la educación, obtienen el poder de generar cambios.'
      ],
      cards: [
        { title: 'Nuestra visión', text: 'Quienquiera que seas, de dondequiera que vengas y cualquiera que sea el camino que elijas, esfuérzate por hacer de nuestro mundo un lugar mejor.' },
        { title: 'Nuestros valores', text: 'Trata a los demás con el mismo respeto, dignidad y amabilidad que esperas para ti mismo.' }
      ]
    },
    'about-goals': {
      id: 'about-goals',
      path: 'Quiénes somos / Programa escolar',
      title: 'Métricas de Impacto & Programa Escolar',
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
      path: 'Quiénes somos / Equipo',
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
      path: 'Quiénes somos / Patrocinadores',
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
      sidebarText: 'Imágenes testimoniales de suparación personal.',
      mainParagraphs: [
        'Explore las aulas, actividades al aire libre y las graduaciones de nuestras valientes estudiantes.'
      ],
      galleryType: 'photos'
    },
    'illiteracy-statistics': {
      id: 'illiteracy-statistics',
      path: 'Analfabetismo / Estadísticas',
      title: 'Estadísticas sobre el analfabetismo',
      subtitle: 'Comprender los números detrás de la brecha educativa global.',
      statNumber: '773M',
      statLabel: 'Adultos Analfabetos',
      sidebarText: 'El analfabetismo no se distribuye de manera uniforme. Las mujeres representan más del 60% de la población analfabeta mundial.',
      mainParagraphs: [
        'A nivel mundial, cientos de millones de adultos carecen de habilidades básicas de lectura y escritura. Dos tercios de ellos son mujeres, una proporción que ha permanecido prácticamente sin cambios durante décadas.',
        'En regiones de extrema pobreza, las tasas de analfabetismo femenino pueden superar el 50%. El impacto económico es grave: las familias con madres analfabetas tienen muchas más probabilidades de experimentar pobreza crónica.',
        'Los estudios demuestran que cuando una mujer aprende a leer y escribir, esto tiene un impacto positivo directo en la salud, la nutrición y los ingresos de su familia, rompiendo el ciclo intergeneracional de desventaja educativa.'
      ],
      cards: [
        { title: 'Disparidad de género', text: 'El 63% de la población analfabeta mundial son mujeres, lo que refleja barreras sociales históricas.' },
        { title: 'Impacto económico', text: 'Los países con tasas de alfabetización más altas disfrutan de una mayor productividad económica.' }
      ]
    },
    'illiteracy-consequences': {
      id: 'illiteracy-consequences',
      path: 'Analfabetismo / Consecuencias',
      title: 'Consecuencias del analfabetismo',
      subtitle: 'Cómo afecta la falta de lectura y escritura a las vidas y comunidades.',
      statNumber: '2.5x',
      statLabel: 'Brecha de Ingresos',
      sidebarText: 'Sin alfabetización, las personas enfrentan vulnerabilidad legal, explotación financiera y menor acceso a la salud.',
      mainParagraphs: [
        'Las consecuencias del analfabetismo en adultos son de gran alcance y afectan la seguridad personal, los derechos legales y la estabilidad financiera. Una persona analfabeta no puede verificar el contenido de un contrato legal, lo que la deja vulnerable a la explotación.',
        'En la vida cotidiana, tareas sencillas como usar el transporte público o leer las señales de tránsito se convierten en grandes obstáculos.',
        'Al abordar el analfabetismo, restauramos la autonomía personal, permitimos la participación cívica y empoderamos a las mujeres para tomar el control de sus decisiones en salud, finanzas y derechos.'
      ],
      cards: [
        { title: 'Vulnerabilidad legal', text: 'La incapacidad de leer contratos convierte a los adultos analfabetos en blancos fáciles de fraudes.' },
        { title: 'Riesgos para la salud', text: 'La dificultad para leer las etiquetas médicas provoca mayores tasas de enfermedades prevenibles.' }
      ]
    },
    'cookie-policy': {
      id: 'cookie-policy',
      path: 'Quiénes somos / Política de cookies',
      title: 'Política de cookies',
      subtitle: 'Organización Likro & Lihtov',
      statNumber: '100%',
      statLabel: 'Conforme',
      sidebarText: 'Valoramos su privacidad. Lea nuestra política para comprender qué datos recopilamos.',
      mainParagraphs: [
        'Likro & Lihtov Organization utiliza cookies y tecnologías similares para mejorar su experiencia de navegación, optimizar el rendimiento del sitio y entender cómo interactúa con el sitio.',
        '¿Qué son las cookies? Las cookies son pequeños archivos almacenados en su dispositivo que facilitan un mejor funcionamiento del sitio.',
        'Administrar cookies: Puede modificar o deshabilitar las cookies en las opciones de su navegador.',
        'Modificaciones: Podemos actualizar esta política en cualquier momento. Las actualizaciones se publicarán en esta página.',
        'Contacto: Si tiene preguntas, contáctenos por correo: contact@likrolihtov.com o en la web: https://new-l-plum.vercel.app/'
      ],
      cards: [
        { title: 'Cookies necesarias', text: 'Requeridas para la funcionalidad del sitio web.' },
        { title: 'Cookies funcionales', text: 'Recuerdan sus preferencias de usuario.' },
        { title: 'Cookies analíticas', text: 'Ayudan a comprender el tráfico del sitio.' }
      ]
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
      subtitle: 'Metodologías de andragogía específicas para la superación personal.',
      statNumber: '92%',
      statLabel: 'Tasa de Graduación',
      sidebarText: 'Uso de tecnologías interactivas para fomentar la autonomía.',
      mainParagraphs: [
        'Diseñamos metodologías participativas y emocionales, libres de la presión de los exámenes tradicionales.'
      ]
    }
  }
};
