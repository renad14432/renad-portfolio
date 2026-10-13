(function () {
  'use strict';
  var D = window.DATA, LOGO = window.LOGO, IMG = window.IMG || {};
  var CV = window.CV_URL || 'assets/Renad_Aladwani_Resume.pdf';
  var lang = 'en', theme = 'light', ios = [];
  try { lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }
  theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isAr = function () { return lang === 'ar'; };
  function t(x) { return x[lang]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function T(x) { return esc(t(x)); }
  function src(n) { return IMG[n] || 'assets/' + n; }
  var BAR = '<div class="bar"><span>– ×</span><span>•••</span></div>';
  var DOC = '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11v6M9.5 14.5L12 17l2.5-2.5"/>';
  var GLOBE = '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>';
  var SUN = '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var CODE = '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 5l-4 14"/>';
  function ico(p, s) { return '<svg aria-hidden="true" viewBox="0 0 24 24" width="' + (s || 15) + '" height="' + (s || 15) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }
  function rv(cls, inner, d) { return '<div class="rv ' + cls + '"' + (d ? ' style="transition-delay:' + d + 'ms"' : '') + '>' + inner + '</div>'; }
  function deco(cls, w, vb, st, inner) { return '<svg aria-hidden="true" class="deco ' + cls + '" width="' + w + '" height="' + w + '" viewBox="' + vb + '" style="' + (st || '') + '">' + inner + '</svg>'; }
  function spark(s, st) { return deco('spark', s, '0 0 24 24', st, '<path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="currentColor"/>'); }
  function plane(st) { return deco('plane', 54, '0 0 24 24', st, '<path d="M2 12L22 3 15 21 11 13z" fill="currentColor"/>'); }
  function cursor(st) { return deco('cursor', 36, '0 0 24 24', st, '<path class="fbg" d="M4 2l15 9-6.5 1.5L9 19z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'); }
  function dash(st) { return '<svg aria-hidden="true" class="deco dash" width="400" height="360" viewBox="0 0 400 360" style="' + st + '"><path d="M0 40C150 -20 260 160 180 260C130 320 40 290 60 220" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="7 7"/></svg>'; }
  function title(pill, h, extra) {
    return rv('center', '<span class="pill s">' + pill + '</span>') + rv('titlewrap sm-t', '<div class="win dot titlewin"></div><h2 class="t big">' + h + '</h2>' + (extra || ''));
  }
  function zoomImg(file, alt, extra) { return '<img src="' + src(file) + '" alt="' + esc(alt) + '" loading="lazy" data-zoom ' + (extra || '') + '>'; }

  function header() {
    var ar = isAr();
    var links = D.nav.map(function (n) { return '<a class="nl" data-nav="' + n.id + '" href="#' + n.id + '">' + T(n.label) + '</a>'; }).join('');
    return '<header class="hdr"><a class="pill s" href="#home" aria-label="Renad — home">RENAD</a>' +
      '<nav class="links" aria-label="Primary">' + links + '</nav><div class="tools">' +
      '<button class="nl" data-act="lang" aria-label="' + (ar ? 'Switch to English' : 'التبديل إلى العربية') + '">' + ico(GLOBE, 17) + '<span class="lab">' + (ar ? 'English' : 'Arabic') + '</span></button>' +
      '<a class="nl" href="' + CV + '" download="Renad_Aladwani_Resume.pdf" aria-label="' + (ar ? 'تحميل السيرة الذاتية' : 'Download CV') + '">' + ico(DOC, 17) + '<span class="lab">CV</span></a>' +
      '<button class="nl" data-act="theme" aria-label="' + (theme === 'dark' ? (ar ? 'الوضع الفاتح' : 'Light mode') : (ar ? 'الوضع الداكن' : 'Dark mode')) + '">' + ico(theme === 'dark' ? SUN : MOON, 17) + '</button></div></header>';
  }
  function hero() {
    return '<section id="home" class="hero"><div class="titlewrap"><div class="win dot titlewin"></div>' +
      '<h1 class="t big">' + T({ en: 'Portfolio', ar: 'ملف أعمالي' }) + '</h1>' +
      '<span class="pill namepill">' + T({ en: 'Renad Aladwani', ar: 'رناد العدواني' }) + '</span><span class="t sticker" aria-hidden="true">2026</span>' +
      spark(34, 'inset-inline-start:-34px;top:-8px') + spark(28, 'inset-inline-end:-30px;top:-6px') + cursor('inset-inline-start:64%;bottom:-40px') + '</div>' +
      '<div class="win caption">' + BAR + '<div class="cap-in"><p class="eyebrow">' + T({ en: 'COMPUTER ENGINEER · SOFTWARE DEVELOPER · UI DESIGNER', ar: 'مهندسة حاسب · مطورة برمجيات · مصممة واجهات' }) + '</p>' +
      '<h2 class="t cap-h">' + T({ en: 'Where Engineering Meets Creativity.', ar: 'حيث تلتقي الهندسة بالإبداع.' }) + '</h2>' +
      '<p class="sm">' + T({ en: 'I’m Renad, a Computer Engineering graduate interested in building thoughtful digital experiences through software, design, and technology.', ar: 'أنا رناد، خريجة هندسة الحاسب، مهتمة ببناء تجارب رقمية مدروسة عبر البرمجيات والتصميم والتقنية.' }) + '</p>' +
      '<div class="ctas"><a class="btn" href="#projects">' + T({ en: 'Explore My Work', ar: 'استعرض أعمالي' }) + '</a>' +
      '<a class="btn o cvb" href="' + CV + '" download="Renad_Aladwani_Resume.pdf" aria-label="' + (isAr() ? 'تحميل السيرة الذاتية' : 'Download CV') + '">' + ico(DOC, 16) + 'CV</a></div></div></div>' +
      '<div class="hero-foot"><span>' + T({ en: 'SAUDI ARABIA', ar: 'السعودية' }) + '</span><a href="#about">' + T({ en: 'SCROLL ↓', ar: 'مرّر ↓' }) + '</a></div></section>';
  }
  function about() {
    var info = [[{ en: 'Major', ar: 'التخصص' }, { en: 'Computer Engineering · Taif University', ar: 'هندسة الحاسب · جامعة الطائف' }],
      [{ en: 'Grade', ar: 'التقدير' }, { en: 'Excellent, with Honors', ar: 'امتياز مع مرتبة الشرف' }],
      [{ en: 'Languages', ar: 'اللغات' }, { en: 'Arabic — Native · English — Intermediate', ar: 'العربية — اللغة الأم · الإنجليزية — متوسط' }]]
      .map(function (r) { return '<div><b>' + T(r[0]) + '</b><span>' + T(r[1]) + '</span></div>'; }).join('');
    var p = [{ en: 'I’m Renad, a Computer Engineering graduate from Taif University with an interest in software engineering and digital product development.', ar: 'أنا رناد، خريجة هندسة الحاسب من جامعة الطائف، مهتمة بهندسة البرمجيات وتطوير المنتجات الرقمية.' },
      { en: 'My background combines engineering fundamentals with hands-on learning in application development, interface design, and collaborative projects.', ar: 'تجمع خلفيتي بين أساسيات الهندسة والتعلّم العملي في تطوير التطبيقات وتصميم الواجهات والمشاريع الجماعية.' },
      { en: 'I’m continuously learning, building, and exploring how technology and thoughtful design come together.', ar: 'أتعلّم وأبني باستمرار، وأستكشف كيف تلتقي التقنية بالتصميم المدروس.' }]
      .map(function (x) { return '<p class="sm">' + T(x) + '</p>'; }).join('');
    return '<section id="about" class="sec">' + rv('center', '<span class="pill">' + T({ en: 'Welcome!', ar: 'أهلاً بك!' }) + '</span>') +
      rv('aboutwrap', '<div class="win aboutwin">' + BAR + '<div class="aboutin"><div class="crop"><i></i><i></i><i></i><i></i><h2 class="t hi">' + T({ en: 'Hi!', ar: 'مرحباً!' }) + '</h2>' + p + '</div>' +
        '<div class="win info">' + BAR + '<div class="info-in">' + info + '</div></div></div></div>' +
        '<div class="win me">' + BAR + '<div class="me-in">' + T({ en: 'ME', ar: 'عني' }) + '</div></div>' + spark(34, 'inset-inline-end:20px;top:-30px') + plane('inset-inline-end:-10px;bottom:-50px')) + '</section>';
  }
  function fan(p, i) {
    var m = p.media, cls = ['l', 'c', 'r'];
    var imgs = m.imgs.map(function (f, k) { return zoomImg(f, p.title + ' app screen ' + (k + 1), 'class="ph3 ' + cls[k] + '"'); }).join('');
    var caps = p.caps.map(function (c) { return '<span class="pill s">' + T(c) + '</span>'; }).join('');
    return '<div class="fanw"><div class="stg fan"><div class="win dot dotp"></div><div class="circ"></div>' + imgs + spark(34, 'inset-inline-start:4%;top:4%') + spark(26, 'inset-inline-end:5%;top:12%') + '</div><div class="caps">' + caps + '</div></div>';
  }
  function computer(p) {
    var m = p.media;
    var stand = '<svg aria-hidden="true" class="stand" viewBox="0 0 400 118"><path d="M165 0H235L252 80H148Z" transform="translate(8 8)" fill="currentColor"/><path class="fbg" d="M165 0H235L252 80H148Z" stroke="currentColor" stroke-width="2"/><rect x="100" y="80" width="200" height="22" rx="11" transform="translate(8 8)" fill="currentColor"/><rect class="fbg" x="100" y="80" width="200" height="22" rx="11" stroke="currentColor" stroke-width="2"/></svg>';
    var steam = '<path class="st s1" d="M10 28c-6-8 6-10 0-18"/><path class="st s2" d="M22 28c-6-8 6-10 0-18"/><path class="st s3" d="M34 28c-6-8 6-10 0-18"/>';
    return '<div class="devw"><div class="dev"><div class="dv monw"><div class="mon"><div class="scr">' + zoomImg(m.dark, p.title + ' website design — dark mode') + '</div><div class="chin"><i></i></div></div>' + stand + '</div>' +
      '<div class="dv lap"><div class="lid"><div class="scr2">' + zoomImg(m.light, p.title + ' website design — light mode') + '</div></div><div class="base"><i></i></div></div>' +
      '<div class="desk"><div class="kb"><div class="keys"></div><div class="space"></div></div><div class="mouse"><i></i></div><div class="mug"><i></i><svg aria-hidden="true" viewBox="0 0 40 30" width="40" height="30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">' + steam + '</svg></div></div>' +
      spark(34, 'inset-inline-start:-2%;top:2%') + spark(26, 'inset-inline-end:2%;top:22%') + '</div><div class="caps"><span class="pill s">' + T(p.caps[0]) + '</span><span class="pill s">' + T(p.caps[1]) + '</span></div></div>';
  }
  function github() {
    var steps = [['done', { en: 'Design', ar: 'التصميم' }, { en: 'done', ar: 'مكتمل' }], ['pr', { en: 'Code', ar: 'البرمجة' }, { en: 'in progress', ar: 'قيد العمل' }], ['so', { en: 'GitHub', ar: 'GitHub' }, { en: 'soon', ar: 'قريباً' }]];
    var road = steps.map(function (s, k) { return (k ? '<span class="' + (k === 1 ? 'sl' : 'fl') + '"></span>' : '') + '<div class="rs"><span class="nd ' + s[0] + '">' + (s[0] === 'done' ? '<svg aria-hidden="true" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5 9-10"/></svg>' : '') + '</span><span class="sm"><b>' + T(s[1]) + '</b><br>' + T(s[2]) + '</span></div>'; }).join('');
    var right = D.github ? '<a class="btn" href="' + esc(D.github) + '" target="_blank" rel="noreferrer">GitHub ↗</a>' : '<span class="pill s">' + T({ en: 'Coming soon', ar: 'قريباً' }) + '</span>';
    return rv('win gh', BAR + '<div class="gh-in"><div class="gh-top"><span class="sico">' + ico('<circle cx="6" cy="5" r="2.2"/><circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="8" r="2.2"/><path d="M6 7.2v9.6M18 10.2c0 4.6-6 3.4-12 6.8"/>', 34) + '</span><div class="gh-t"><div class="t gh-h">GitHub</div><p class="sm">' +
      T({ en: 'After finishing the code for these projects, my designs will be uploaded to GitHub and the link will be added to this portfolio.', ar: 'بعد الانتهاء من برمجة هذه المشاريع سأرفع تصاميمي على GitHub وأضيف الرابط إلى هذا الملف.' }) + '</p></div>' + right + '</div><div class="road">' + road + '</div></div>');
  }
  function projects() {
    var t0 = 0.9;
    var tw = D.projects.map(function (p, k) {
      var n = (p.no + '  ' + p.title).length, dur = n * 0.07, d = t0; t0 += dur + 0.18;
      return '<div class="tw' + (k === D.projects.length - 1 ? ' last' : '') + '" style="--n:' + n + ';--d:' + d.toFixed(2) + 's;--e:' + (d + dur).toFixed(2) + 's"><a href="#' + p.id + '">' + p.no + '&nbsp;&nbsp;' + esc(p.title) + '</a></div>';
    }).join('');
    var secs = D.projects.map(function (p, i) {
      var chips = '<span class="pill s">' + T({ en: 'Status: ', ar: 'الحالة: ' }) + T(p.status) + '</span>' + p.chips.map(function (c) { return '<span class="pill s">' + T(c) + '</span>'; }).join('');
      var cards = [p.c1, p.c2].map(function (c, k) { return rv('win card', BAR + '<div class="card-in"><b>' + T(c.h) + '</b><p class="sm">' + T(c.p) + '</p></div>', k * 100); }).join('');
      return '<article id="' + p.id + '" class="proj">' + rv('center', '<span class="pill s">' + p.no + ' / 0' + D.projects.length + ' · ' + T(p.cat) + '</span>') +
        rv('titlewrap sm-t', '<div class="win dot titlewin"></div><h2 class="t big">' + esc(p.title) + '</h2>' + spark(32, 'inset-inline-start:-36px;top:-28px') + spark(26, 'inset-inline-end:-30px;top:-24px')) +
        rv('win caption small', BAR + '<div class="cap-in"><p class="sm center-t">' + T(p.desc) + '</p></div>') + rv('chips', chips) +
        rv('media', p.media.kind === 'phones' ? fan(p, i) : computer(p)) + '<div class="cards2">' + cards + '</div></article>';
    }).join('');
    return '<section id="projects" class="sec">' + rv('center', '<span class="pill">' + T({ en: 'Projects', ar: 'المشاريع' }) + '</span>') +
      rv('win dark idx', BAR + '<div class="crop w"><i></i><i></i><i></i><i></i>' + tw + '</div>' + spark(30, 'inset-inline-end:26px;top:56px;color:#fff')) + github() + secs + '</section>';
  }
  var SI = {
    'Problem Solving': '<path class="ry r1" d="M12 -1V-4"/><path class="ry r2" d="M4.6 2.6 2.6 .6"/><path class="ry r3" d="M19.4 2.6l2-2"/><path class="ry r4" d="M2 9H-1"/><path class="ry r5" d="M22 9h3"/><path class="bulb" d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/><path d="M9 18h6M10 21h4"/>',
    'Communication': '<g class="bub"><path d="M4 5h16v11H9l-5 4z"/></g><circle class="dt d1" cx="8.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle class="dt d2" cx="12" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle class="dt d3" cx="15.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/>',
    'Teamwork': '<g class="pa"><circle cx="8" cy="8" r="3"/><path d="M2 20c0-4 3-6 6-6s6 2 6 6"/></g><g class="pb"><circle cx="17" cy="9" r="2.5"/><path d="M14 15c1-.7 2-1 3-1 3 0 5 2 5 6"/></g>',
    'Adaptability': '<g class="rot"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></g>',
    'Leadership': '<path d="M6 21V4"/><path class="flag" d="M6 5h12l-3 4 3 4H6"/>'
  };
  function skills() {
    var groups = D.skillGroups.map(function (g) {
      var items = g.items.map(function (it) { return '<div class="win lc"><svg aria-hidden="true" viewBox="0 0 48 48" width="52" height="52">' + LOGO[it.n] + '</svg><div><b>' + esc(it.n) + '</b>' + (it.sub ? '<small>' + T(it.sub) + '</small>' : '') + '</div></div>'; }).join('');
      return rv('win lg' + (g.cols === 3 ? ' wide' : ''), BAR + '<div class="lg-h">' + T(g.h) + '</div><div class="lcards">' + items + '</div>');
    }).join('');
    var soft = D.softSkills.map(function (s, i) {
      return '<div class="srow"><span class="sno">0' + (i + 1) + '</span><span class="sico' + (i === 0 ? ' glowbox' : '') + '"><svg aria-hidden="true" class="ai" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + SI[s.n.en] + '</svg></span><span class="t sname">' + T(s.n) + '</span></div>';
    }).join('');
    return '<section id="skills" class="sec">' + title(T({ en: 'Skills · Languages', ar: 'المهارات · اللغات' }), T({ en: 'Skills', ar: 'المهارات' }), spark(30, 'inset-inline-end:-30px;top:-24px')) +
      '<div class="langgrid">' + groups + '</div>' + rv('win soft', BAR + '<div class="lg-h">' + T({ en: 'Soft skills', ar: 'المهارات الشخصية' }) + '</div>' + soft) + '</section>';
  }
  var ORDER = ['cert-sce.jpg', 'cert-tuwaiq.jpg', 'cert-sdaia.jpg', 'cert-uiux.jpg', 'cert-web.jpg', 'cert-db.jpg', 'cert-cyber.jpg', 'cert-data.jpg', 'cert-afaq.jpg', 'cert-ican.jpg'];
  function certs() {
    var list = D.certs.slice().sort(function (a, b) { return ORDER.indexOf(a.img) - ORDER.indexOf(b.img); });
    var cs = list.map(function (c, i) {
      return rv('win cc', BAR + zoomImg(c.img, 'Certificate — ' + c.title.en) + '<div class="cert-in"><span class="pill s">' + T(c.tag) + '</span><b>' + T(c.title) + '</b>' +
        (c.orig && !isAr() ? '<span class="sm orig" dir="rtl">' + esc(c.orig) + '</span>' : '') + '<small class="sm">' + T(c.meta) + '</small></div>', (i % 3) * 110);
    }).join('');
    return '<section id="certificates" class="sec">' + title(T({ en: 'Learning · Certificates', ar: 'التعلّم · الشهادات' }), T({ en: 'Certificates', ar: 'الشهادات' })) + '<div class="certs">' + cs + '</div></section>';
  }
  function lanyard() {
    return '<div class="lanw"><div class="lanc"><div class="lan"><i class="strap"></i><i class="clip"><b></b></i><i class="ring2"></i><div class="idc">' + ico(CODE, 22) + '<div class="idcirc">' + ico(CODE, 28) + '</div><span class="idpill">بطاقة عضو</span><div class="idk">المسار</div><div class="idv">تطوير البرمجيات</div><hr><div class="idn">رناد العدواني</div><div class="idf">TECHNICAL COMMUNITY · 2026</div></div></div></div></div>';
  }
  function experience() {
    var ex = D.experience.map(function (e, i) {
      return rv('win exp' + (i % 2 ? ' r' : ''), BAR + '<div class="exp-in"><span class="pill s">' + T(e.dates) + '</span><h3 class="t">' + T(e.role) + '</h3><b>' + T(e.org) + '</b><p class="sm">' + T(e.text) + '</p>' +
        e.points.map(function (p) { return '<div class="sm">— ' + T(p) + '</div>'; }).join('') +
        (e.chips ? '<div class="tags">' + e.chips.map(function (c) { return '<span class="ic">' + T(c) + '</span>'; }).join('') + '</div>' : '') + '</div>');
    }).join('');
    var act = rv('win act', BAR + '<div class="lg-h">' + T({ en: 'Activities', ar: 'الأنشطة' }) + '</div>' +
      '<div class="ab">' + lanyard() + '<div><b>' + T({ en: 'Member of PAIC, the Programming and Artificial Intelligence Club', ar: 'عضوة في نادي البرمجة والذكاء الاصطناعي (PAIC)' }) + '</b><div class="sm">' + T({ en: 'Software Development track · since 08/2026', ar: 'مسار تطوير البرمجيات · منذ 08/2026' }) + '</div></div></div>' +
      '<div class="ab"><div><b>' + T({ en: 'Member of Tuwaiq Club', ar: 'عضوة في نادي طويق' }) + '</b><div class="sm">' + T({ en: 'Supported by Tuwaiq Academy', ar: 'بدعم من أكاديمية طويق' }) + '</div></div><div class="stp"><span class="ring"></span><img class="stamp" src="' + src('tuwaiq-stamp.png') + '" alt="Tuwaiq Club member badge"></div></div>' +
      '<div class="ab sm">— ' + T({ en: 'Participant in software development training and technical projects', ar: 'مشاركة في تدريب تطوير البرمجيات والمشاريع التقنية' }) + '</div>');
    return '<section id="experience" class="sec">' + title(T({ en: 'Experience · Practice', ar: 'الخبرة · الممارسة' }), T({ en: 'Experience', ar: 'الخبرة' })) + '<div class="exps">' + ex + act + '</div></section>';
  }
  function contact() {
    var c = D.contact;
    var items = [
      { n: 'LinkedIn', h: 'in/renadaladwani', href: c.linkedin, cta: { en: 'Open LinkedIn ↗', ar: 'افتح LinkedIn ↗' }, ic: '<rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><text x="12" y="17" text-anchor="middle" font-size="12" font-weight="700" class="fbg" font-family="Arial,Helvetica,sans-serif">in</text>' },
      { n: 'X', h: '@RuYq___', href: c.x, cta: { en: 'Open X ↗', ar: 'افتح X ↗' }, ic: '<path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' },
      { n: t({ en: 'Email', ar: 'البريد الإلكتروني' }), h: c.email, href: c.email ? 'mailto:' + c.email : '', cta: { en: 'Send an email ↗', ar: 'أرسل بريداً ↗' }, ic: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' }
    ].map(function (it, i) {
      var act = it.href ? '<span class="sm" dir="ltr">' + esc(it.h || '') + '</span><a class="btn" href="' + esc(it.href) + '"' + (it.href.indexOf('http') === 0 ? ' target="_blank" rel="noreferrer"' : '') + '>' + T(it.cta) + '</a>'
        : '<span class="sm">' + T({ en: 'Coming soon', ar: 'قريباً' }) + '</span><button class="btn" data-act="soon">' + T(it.cta) + '</button>';
      return rv('win ccard', BAR + '<div class="card-in"><span class="sico"><svg aria-hidden="true" viewBox="0 0 24 24" width="34" height="34">' + it.ic + '</svg></span><div class="t cname">' + esc(it.n) + '</div>' + act + '</div>', i * 100);
    }).join('');
    return '<section id="contact" class="sec">' + title(T({ en: 'Let’s connect', ar: 'لنتواصل' }), T({ en: 'Contact', ar: 'تواصل' }), plane('inset-inline-end:-20px;bottom:-30px')) +
      rv('win caption small', BAR + '<div class="cap-in"><p class="sm center-t">' + T({ en: 'Have a project or opportunity in mind? I’m always open to connecting with people who value thoughtful design, technology, and continuous learning.', ar: 'هل لديك مشروع أو فرصة في بالك؟ يسعدني التواصل مع من يقدّر التصميم المدروس والتقنية والتعلّم المستمر.' }) + '</p></div>') +
      '<div class="cgrid">' + items + '</div></section>';
  }
  function footer() {
    var c = D.contact;
    return '<footer class="foot"><div><strong class="wm">RENAD</strong><p class="sm">' + T({ en: 'Computer Engineer · Software Developer · UI Designer — Saudi Arabia', ar: 'مهندسة حاسب · مطورة برمجيات · مصممة واجهات — السعودية' }) + '</p></div>' +
      '<nav aria-label="Footer"><a href="#about">' + T({ en: 'About', ar: 'عني' }) + '</a><a href="#projects">' + T({ en: 'Projects', ar: 'المشاريع' }) + '</a><a href="#experience">' + T({ en: 'Experience', ar: 'الخبرة' }) + '</a><a href="#contact">' + T({ en: 'Contact', ar: 'تواصل' }) + '</a>' +
      (c.linkedin ? '<a href="' + esc(c.linkedin) + '" target="_blank" rel="noreferrer">LinkedIn</a>' : '') + (c.x ? '<a href="' + esc(c.x) + '" target="_blank" rel="noreferrer">X</a>' : '') + '</nav>' +
      '<p class="sm"><em>' + T({ en: 'Thoughtfully designed. Continuously evolving.', ar: 'مصمّم بعناية. يتطوّر باستمرار.' }) + '</em></p></footer>';
  }
  function html() { return header() + '<main>' + hero() + about() + projects() + skills() + certs() + experience() + contact() + '</main>' + footer(); }
  window.__html = function (l, th) { lang = l; theme = th || theme; return html(); };

  var splashDone = false;
  function observe(instant) {
    ios.forEach(function (o) { o.disconnect(); }); ios = [];
    var rvs = document.querySelectorAll('.rv'), pages = document.querySelectorAll('.hero,.sec,.proj');
    if (!('IntersectionObserver' in window)) { rvs.forEach(function (e) { e.classList.add('in'); }); pages.forEach(function (e) { e.classList.add('live'); }); return; }
    if (instant || reduce) { rvs.forEach(function (e) { e.classList.add('in'); }); }
    else {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.intersectionRatio >= 0.12) e.target.classList.add('in'); else if (e.intersectionRatio === 0) e.target.classList.remove('in'); }); }, { threshold: [0, 0.12] });
      rvs.forEach(function (e) { io.observe(e); }); ios.push(io);
    }
    var lv = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('live', e.isIntersecting); }); }, { rootMargin: '-25% 0px -25% 0px' });
    pages.forEach(function (e) { lv.observe(e); }); ios.push(lv);
    var links = {}; document.querySelectorAll('[data-nav]').forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); if (k === e.target.id) links[k].setAttribute('aria-current', 'true'); else links[k].removeAttribute('aria-current'); }); } });
    }, { rootMargin: '-40% 0px -55% 0px' });
    ['home'].concat(D.nav.map(function (n) { return n.id; })).forEach(function (id) { var el = document.getElementById(id); if (el) io2.observe(el); });
    ios.push(io2);
  }
  function render(instant) {
    document.documentElement.lang = lang; document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
    document.title = isAr() ? 'رناد — مهندسة حاسب · مطورة برمجيات · مصممة واجهات' : 'Renad — Computer Engineer · Software Developer · UI Designer';
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', theme === 'dark' ? '#0d0d0d' : '#ffffff');
    document.getElementById('app').innerHTML = html();
    if (splashDone) observe(instant);
  }
  function splash(done) {
    var seen = false; try { seen = sessionStorage.getItem('splash') === '1'; } catch (e) { /* ignore */ }
    if (seen || reduce) { done(); return; }
    var s = document.createElement('div'); s.className = 'splash';
    s.innerHTML = '<div class="win sp-win">' + BAR + '<div class="sp-in"><span class="pill s">' + T({ en: 'Welcome!', ar: 'أهلاً بك!' }) + '</span><div class="t sp-h">RENAD</div><div class="sm sp-s">' + T({ en: 'Portfolio · 2026', ar: 'ملف أعمالي · 2026' }) + '</div><div class="sp-bar"><i></i></div><div class="sm sp-hint">' + T({ en: 'Computer Engineer · Software Developer · UI Designer', ar: 'مهندسة حاسب · مطورة برمجيات · مصممة واجهات' }) + '</div></div></div>' + spark(38, 'left:18%;top:22%') + spark(30, 'right:20%;bottom:24%') + '<span class="sm sp-skip">' + T({ en: 'tap to skip', ar: 'اضغط للتخطي' }) + '</span>';
    document.body.appendChild(s); document.documentElement.classList.add('splashing');
    var over = false;
    function end() { if (over) return; over = true; s.classList.add('out'); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); document.documentElement.classList.remove('splashing'); try { sessionStorage.setItem('splash', '1'); } catch (e) { /* ignore */ } done(); }, 720); }
    setTimeout(end, 3000); s.addEventListener('click', end);
  }
  var busy = false;
  function go(hash) {
    var el = document.getElementById(hash.slice(1)); if (!el) return;
    var hh = document.querySelector('.hdr'), pad = (hh ? hh.offsetHeight : 60) + 10;
    function jump() { window.scrollTo(0, el.getBoundingClientRect().top + (window.scrollY || 0) - pad); try { history.replaceState(null, '', hash); } catch (x) { /* ignore */ } }
    if (reduce || busy) { jump(); return; }
    busy = true; var w = document.querySelector('.wipe'); w.classList.remove('off'); w.classList.add('on');
    setTimeout(function () {
      document.documentElement.style.scrollBehavior = 'auto'; jump(); document.documentElement.style.scrollBehavior = '';
      w.classList.remove('on'); w.classList.add('off');
      setTimeout(function () { w.classList.remove('off'); busy = false; }, 580);
    }, 540);
  }
  var toastTimer;
  function toast(msg) { var el = document.querySelector('.toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600); }
  function lb(open, s, a) { var el = document.querySelector('.lb'); if (open) { el.querySelector('img').src = s; el.querySelector('img').alt = a || ''; el.hidden = false; } else { el.hidden = true; } }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act],[data-zoom],a[href^="#"]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    if (act === 'lang') { lang = isAr() ? 'en' : 'ar'; try { localStorage.setItem('lang', lang); } catch (x) { /* ignore */ } render(true); return; }
    if (act === 'theme') { theme = theme === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', theme); try { sessionStorage.setItem('theme', theme); } catch (x) { /* ignore */ } render(true); return; }
    if (act === 'soon') { toast(isAr() ? 'الرابط سيُضاف قريباً' : 'This link will be added soon'); return; }
    if (act === 'closelb') { lb(false); return; }
    if (el.hasAttribute('data-zoom')) { lb(true, el.currentSrc || el.src, el.alt); return; }
    var href = el.getAttribute('href');
    if (href && href.charAt(0) === '#' && href.length > 1) { e.preventDefault(); go(href); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb(false); });
  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0, h = document.querySelector('.hdr'), tt = document.querySelector('.totop');
    if (h) h.classList.toggle('solid', y > 40); if (tt) tt.classList.toggle('show', y > 600);
  }, { passive: true });
  render(false);
  splash(function () { splashDone = true; observe(false); });
})();
