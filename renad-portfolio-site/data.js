// Site content (English + Arabic). Edit here.


// Fill these in; empty values show "coming soon" instead of a link.
const contact = { email: '', linkedin: '', x: '' };

const nav = [
  { id: 'about', label: { en: 'About', ar: 'عني' } },
  { id: 'projects', label: { en: 'Projects', ar: 'المشاريع' } },
  { id: 'skills', label: { en: 'Skills', ar: 'المهارات' } },
  { id: 'certificates', label: { en: 'Certificates', ar: 'الشهادات' } },
  { id: 'experience', label: { en: 'Experience', ar: 'الخبرة' } },
  { id: 'contact', label: { en: 'Contact', ar: 'تواصل' } }
];

const projects = [
  { id: 'almam', no: '01', title: 'Almam', cat: { en: 'Mobile Application', ar: 'تطبيق جوال' },
    desc: { en: 'A mobile application concept designed to enhance the coffee shop experience through convenient ordering, branch discovery, and customer loyalty rewards.', ar: 'فكرة تطبيق جوال يحسّن تجربة المقهى عبر الطلب السهل واكتشاف الفروع ومكافآت الولاء.' },
    status: { en: 'In Progress', ar: 'قيد التطوير' }, chips: [{ en: 'Role: Mobile development & UI/UX', ar: 'الدور: تطوير تطبيقات الجوال وتصميم UI/UX' }],
    c1: { h: { en: 'Concept & intended scope', ar: 'الفكرة والنطاق المخطط' }, p: { en: 'Customer accounts · Branch discovery · Menu browsing · Order-related screens · Loyalty points · Six cups, the seventh is free', ar: 'حسابات العملاء · اكتشاف الفروع · تصفّح المنيو · شاشات الطلب · نقاط الولاء · بعد ستة أكواب السابع مجاناً' } },
    c2: { h: { en: 'Verified implementation', ar: 'المنفّذ المؤكد' }, p: { en: 'To be confirmed', ar: 'قيد التأكيد' } },
    media: { kind: 'phones', imgs: ['almam-phone-1.png', 'almam-phone-2.png', 'almam-phone-3.png'] } },
  { id: 'city-pulse', no: '02', title: 'City Pulse', cat: { en: 'Web / Data Visualization', ar: 'ويب / تصوّر البيانات' },
    desc: { en: 'An exploration of how satellite-derived indicators can help people understand urban change in Riyadh over time.', ar: 'استكشاف لكيفية مساعدة مؤشرات الأقمار الصناعية الناس على فهم التغيّر العمراني في الرياض مع الزمن.' },
    status: { en: 'In Progress', ar: 'قيد التطوير' }, chips: [{ en: 'Event: NASA Space Apps Challenge', ar: 'المناسبة: تحدي ناسا سبيس أبس' }, { en: 'My part: Compare & Insights', ar: 'دوري: المقارنة والرؤى' }],
    c1: { h: { en: 'Screens shown', ar: 'الشاشات الظاهرة' }, p: { en: 'Compare screen: 2010 baseline vs 2025 target split map · Layer toggles (True Radiance, Thermal IR, NDVI Anomaly) · Differential readout', ar: 'شاشة المقارنة: خريطة مقسومة بين 2010 و2025 · أزرار الطبقات (True Radiance وThermal IR وNDVI Anomaly) · قراءة الفروقات' } },
    c2: { h: { en: 'My contribution', ar: 'مساهمتي' }, p: { en: 'Compare and Insights features: comparing selected indicators and presenting useful visual insights. A team project for the NASA Space Apps Challenge.', ar: 'ميزتا المقارنة والرؤى: مقارنة مؤشرات مختارة وعرض رؤى بصرية مفيدة. مشروع فريق لتحدي ناسا سبيس أبس.' } },
    media: { kind: 'phones', imgs: ['city-pulse-phone.png'] } },
  { id: 'paic', no: '03', title: 'PAIC', cat: { en: 'UI/UX Design', ar: 'تصميم UI/UX' },
    desc: { en: 'A platform design project focused on organizing information and shaping a clear, intuitive digital experience.', ar: 'مشروع تصميم منصة يركّز على تنظيم المعلومات وتشكيل تجربة رقمية واضحة وسلسة.' },
    status: { en: 'Design Project', ar: 'مشروع تصميم' }, chips: [{ en: 'Role: UI/UX design', ar: 'الدور: تصميم UI/UX' }],
    c1: { h: { en: 'Screens shown', ar: 'الشاشات الظاهرة' }, p: { en: 'Home page hero · Main navigation · Footer with quick links and tech tracks', ar: 'الصفحة الرئيسية · التنقل الرئيسي · التذييل بالروابط السريعة والمسارات التقنية' } },
    c2: { h: { en: 'My contribution', ar: 'مساهمتي' }, p: { en: 'UI/UX design, interface design and visual organization, and leading a session to explain the design.', ar: 'تصميم UI/UX وتصميم الواجهات وتنظيمها بصرياً، وقيادة جلسة لشرح التصميم.' } },
    media: { kind: 'computer', img: 'paic-screen.png' } },
  { id: 'zhi', no: '04', title: 'Zhi Coffee', cat: { en: 'UI/UX Design', ar: 'تصميم UI/UX' },
    desc: { en: 'A coffee application design project focused on a warm visual identity and an intuitive mobile experience.', ar: 'مشروع تصميم تطبيق قهوة يركّز على هوية بصرية دافئة وتجربة جوال سلسة.' },
    status: { en: 'Design Project', ar: 'مشروع تصميم' }, chips: [{ en: 'Role: UI/UX design & interface exploration', ar: 'الدور: تصميم UI/UX واستكشاف الواجهات' }],
    c1: { h: { en: 'Screens shown', ar: 'الشاشات الظاهرة' }, p: { en: 'Splash screen · Home with featured banner · New Arrivals product list', ar: 'شاشة البداية · الرئيسية بلافتة مميزة · قائمة جديد زهي' } },
    c2: { h: { en: 'Project type', ar: 'نوع المشروع' }, p: { en: 'UI/UX interface design — not a coded application', ar: 'تصميم واجهات UI/UX وليس تطبيقاً مبرمجاً' } },
    media: { kind: 'phones', imgs: ['zhi-phone-1.png', 'zhi-phone-2.png', 'zhi-phone-3.png'] } }
];

const skillGroups = [
  { h: { en: 'Programming languages', ar: 'لغات البرمجة' }, cols: 3, items: ['C++', 'C#', 'Python', 'JavaScript', 'Dart', 'PHP'].map(n => ({ n })) },
  { h: { en: 'Frameworks & libraries', ar: 'الأطر والمكتبات' }, cols: 3, items: [{ n: 'Flutter', sub: { en: 'Dart · Mobile', ar: 'Dart · جوال' } }, { n: 'React', sub: { en: 'JavaScript · Frontend', ar: 'JavaScript · واجهات' } }, { n: 'Laravel', sub: { en: 'PHP · Backend', ar: 'PHP · خلفية' } }] },
  { h: { en: 'Markup & styling', ar: 'الترميز والتنسيق' }, cols: 2, items: ['HTML', 'CSS'].map(n => ({ n })) },
  { h: { en: 'Databases', ar: 'قواعد البيانات' }, cols: 2, items: ['SQL', 'MySQL'].map(n => ({ n })) }
];
const softSkills = [
  { n: { en: 'Problem Solving', ar: 'حل المشكلات' }, icon: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>' },
  { n: { en: 'Communication', ar: 'التواصل' }, icon: '<path d="M4 5h16v11H9l-5 4z"/>' },
  { n: { en: 'Teamwork', ar: 'العمل الجماعي' }, icon: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6M14 15c1-.7 2-1 3-1 3 0 5 2 5 6"/>' },
  { n: { en: 'Adaptability', ar: 'المرونة' }, icon: '<path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/>' },
  { n: { en: 'Leadership', ar: 'القيادة' }, icon: '<path d="M6 21V4M6 5h12l-3 4 3 4H6"/>' }
];

const RU = { en: 'Ruwad Institute (TVTC-accredited)', ar: 'معهد رواد (معتمد من المؤسسة العامة للتدريب التقني والمهني)' };
const certs = [
  { img: 'cert-sce.jpg', tag: { en: 'Professional accreditation', ar: 'اعتماد مهني' }, title: { en: 'Professional Accreditation Certificate', ar: 'شهادة اعتماد مهني' }, orig: 'شهادة اعتماد مهني',
    meta: { en: 'Saudi Council of Engineers (SCE) · Engineer · Computer Engineering · Valid until 31 Aug 2027', ar: 'الهيئة السعودية للمهندسين · مهندس · هندسة الحاسب الآلي · صالحة حتى 31 أغسطس 2027' } },
  { img: 'cert-uiux.jpg', tag: { en: 'Training course', ar: 'دورة تدريبية' }, title: { en: 'User Experience and Interface Design Skills (UI/UX)', ar: 'مهارات تصميم تجربة المستخدم وواجهات المستخدم UI/UX' }, orig: 'مهارات تصميم تجربة المستخدم وواجهات المستخدم UI/UX',
    meta: { en: `${RU.en} · Remote · 30 hrs · 1448 AH`, ar: `${RU.ar} · عن بُعد · 30 ساعة · 1448هـ` } },
  { img: 'cert-db.jpg', tag: { en: 'Training course', ar: 'دورة تدريبية' }, title: { en: 'Systems Analysis and Database Design Skills', ar: 'مهارات تحليل الأنظمة وتصميم قواعد البيانات' }, orig: 'مهارات تحليل الأنظمة وتصميم قواعد البيانات',
    meta: { en: `${RU.en} · In person · 60 hrs · 1448 AH`, ar: `${RU.ar} · حضورياً · 60 ساعة · 1448هـ` } },
  { img: 'cert-web.jpg', tag: { en: 'Training course', ar: 'دورة تدريبية' }, title: { en: 'Web Application Programming and Interface Development', ar: 'مهارة برمجة وتطوير واجهات تطبيق الإنترنت' }, orig: 'مهارة برمجة وتطوير واجهات تطبيق الإنترنت',
    meta: { en: `${RU.en} · Remote · 36 hrs · 1448 AH`, ar: `${RU.ar} · عن بُعد · 36 ساعة · 1448هـ` } },
  { img: 'cert-cyber.jpg', tag: { en: 'Training course', ar: 'دورة تدريبية' }, title: { en: 'Integrated Cybersecurity Strategy', ar: 'استراتيجية الأمن السيبراني المتكامل' }, orig: 'استراتيجية الأمن السيبراني المتكامل',
    meta: { en: `${RU.en} · In person · 20 hrs · 1448 AH`, ar: `${RU.ar} · حضورياً · 20 ساعة · 1448هـ` } },
  { img: 'cert-data.jpg', tag: { en: 'Training course', ar: 'دورة تدريبية' }, title: { en: 'Data Preparation & Cleaning Essentials', ar: 'أساسيات إعداد البيانات وتنظيفها' },
    meta: { en: 'Ministry of Communications and IT, Future Skills · Learning Space · 12 hrs · 13–15 Sep 2026', ar: 'وزارة الاتصالات وتقنية المعلومات، مهارات المستقبل · Learning Space · 12 ساعة · 13–15 سبتمبر 2026' } },
  { img: 'cert-afaq.jpg', tag: { en: 'Attendance', ar: 'حضور' }, title: { en: 'Afaq for Artificial Intelligence Initiative', ar: 'مبادرة آفاق للذكاء الاصطناعي' }, orig: 'مبادرة آفاق للذكاء الاصطناعي',
    meta: { en: 'Rowad AI Team · with eYouth and IBM SkillsBuild · 3rd cohort · 17–20 Jan 2026', ar: 'فريق رواد الذكاء الاصطناعي · بالتعاون مع eYouth وIBM SkillsBuild · الدفعة الثالثة · 17–20 يناير 2026' } },
  { img: 'cert-ican.jpg', tag: { en: 'Attendance', ar: 'حضور' }, title: { en: 'International Conference for Capacity Building in Data and AI (ICAN)', ar: 'المؤتمر الدولي لبناء القدرات في البيانات والذكاء الاصطناعي' }, orig: 'المؤتمر الدولي لبناء القدرات في البيانات والذكاء الاصطناعي',
    meta: { en: 'Held at King Saud University · 16 hrs', ar: 'أُقيم في جامعة الملك سعود · 16 ساعة' } }
];

const experience = [
  { dates: { en: 'June 2025 – August 2025', ar: 'يونيو 2025 – أغسطس 2025' }, role: { en: 'IT / Systems Trainee', ar: 'متدربة تقنية معلومات / أنظمة' }, org: { en: 'Prince Mansour Military Hospital, Taif', ar: 'مستشفى الأمير منصور العسكري، الطائف' },
    text: { en: 'Completed practical training in IT and communications systems within a hospital environment.', ar: 'أكملتُ تدريباً عملياً في أنظمة تقنية المعلومات والاتصالات داخل بيئة مستشفى.' },
    points: [{ en: 'First-level IT support', ar: 'الدعم الفني من المستوى الأول' }, { en: 'Monitoring and supporting users and systems', ar: 'مراقبة ودعم المستخدمين والأنظمة' }, { en: 'Exposure to hospital information systems and internal applications', ar: 'الاطلاع على أنظمة المستشفى والتطبيقات الداخلية' }, { en: 'Technical troubleshooting and support workflows', ar: 'استكشاف الأعطال وسير عمل الدعم' }] },
  { dates: { en: 'July 2026 – October 2026', ar: 'يوليو 2026 – أكتوبر 2026' }, role: { en: 'Mobile App Development Trainee', ar: 'متدربة تطوير تطبيقات الجوال' }, org: { en: 'Matrix Group', ar: 'Matrix Group' },
    text: { en: 'Participated in mobile application development training with exposure to Flutter, Dart, UI/UX, and application development workflows.', ar: 'شاركتُ في تدريب على تطوير تطبيقات الجوال مع اطلاع على Flutter وDart وUI/UX وسير عمل تطوير التطبيقات.' },
    points: [], chips: [{ en: 'Flutter', ar: 'Flutter' }, { en: 'Dart', ar: 'Dart' }, { en: 'UI/UX', ar: 'UI/UX' }, { en: 'Application development workflows', ar: 'سير عمل تطوير التطبيقات' }] }
];

window.DATA={contact,nav,projects,skillGroups,softSkills,certs,experience};

const T = (x, y, fs, fill, s = '') => `<text x="${x}" y="${y}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${fill}" font-family="Space Mono,monospace">${s}</text>`;
const HEX = (c) => `<path d="M24 3 42 13.5v21L24 45 6 34.5v-21z" fill="${c}"/>`;
const SH = (a, b) => `<path d="M7 4h34l-3 34-14 6-14-6z" fill="${a}"/><path d="M24 7v34l11-4.5L38 7z" fill="${b}"/>`;
const LOGO = {
  'C++': HEX('#00599C') + T(24, 30, 15, '#fff', 'C++'),
  'C#': HEX('#68217A') + T(24, 31, 18, '#fff', 'C#'),
  Python: '<path d="M23 4c-8 0-8 4-8 4v4h9v1.5H11S5 12 5 22.5 10 33 10 33h4v-5s0-5.5 5.5-5.5H28s5 .1 5-5V9s.5-5-10-5z" fill="#3776AB"/><path d="M25 44c8 0 8-4 8-4v-4h-9v-1.5h13S43 36 43 25.5 38 15 38 15h-4v5s0 5.5-5.5 5.5H20s-5-.1-5 5V39s-.5 5 10 5z" fill="#FFD43B"/><circle cx="19" cy="9" r="1.6" fill="#fff"/><circle cx="29" cy="39" r="1.6" fill="#fff"/>',
  JavaScript: '<rect x="4" y="4" width="40" height="40" fill="#F7DF1E"/>' + T(43, 42, 18, '#111', 'JS').replace('text-anchor="middle"', 'text-anchor="end"'),
  Dart: '<path d="M6 24 24 6h10l8 8-18 18z" fill="#0175C2"/><path d="M12 38 24 26h8l8 8-6 6H18z" fill="#02569B"/>',
  PHP: '<ellipse cx="24" cy="24" rx="21" ry="12" fill="#777BB4"/>' + T(24, 29, 14, '#111', 'php'),
  Flutter: '<path d="M27 4 8 23l6 6L39 4z" fill="#47C5FB"/><path d="M27 24 18 33l9 9h12L30 33l9-9z" fill="#47C5FB"/><path d="M18 33l6-6 6 6-6 6z" fill="#00569E"/>',
  React: '<g fill="none" stroke="#61DAFB" stroke-width="2.4"><ellipse cx="24" cy="24" rx="20" ry="8"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(60 24 24)"/><ellipse cx="24" cy="24" rx="20" ry="8" transform="rotate(120 24 24)"/></g><circle cx="24" cy="24" r="3.6" fill="#61DAFB"/>',
  Laravel: HEX('#FF2D20') + T(24, 31, 19, '#fff', 'L'),
  HTML: SH('#E44D26', '#F16529') + T(24, 31, 16, '#fff', '5'),
  CSS: SH('#1572B6', '#33A9DC') + T(24, 31, 16, '#fff', '3'),
  SQL: '<ellipse cx="24" cy="11" rx="15" ry="6" fill="#111"/><g fill="none" stroke="#111" stroke-width="3"><path d="M9 11v26c0 3.3 6.7 6 15 6s15-2.7 15-6V11"/><path d="M9 20c0 3.3 6.7 6 15 6s15-2.7 15-6M9 29c0 3.3 6.7 6 15 6s15-2.7 15-6"/></g>',
  MySQL: '<rect x="3" y="12" width="42" height="24" rx="5" fill="#00758F"/>' + T(24, 28, 11.5, '#F29111', 'MySQL')
};

window.LOGO=LOGO;
