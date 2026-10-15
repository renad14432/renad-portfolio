(function () {
  'use strict';
  var D = window.DATA, LOGO = window.LOGO, IMG = window.IMG || {};
  var lang = 'en', ios = [];
  try { lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function t(x) { return x[lang]; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function T(x) { return esc(t(x)); }
  function src(n) { return IMG[n] || 'assets/' + n; }
  var BAR = '<div class="bar"><span>– ×</span><span>•••</span></div>';
  function rv(cls, inner, d) { return '<div class="rv ' + cls + '"' + (d ? ' style="transition-delay:' + d + 'ms"' : '') + '>' + inner + '</div>'; }
  function svg(cls, w, vb, st, inner) { return '<svg aria-hidden="true" class="deco ' + cls + '" width="' + w + '" height="' + w + '" viewBox="' + vb + '" style="' + (st || '') + '">' + inner + '</svg>'; }
  function spark(s, st) { return svg('spark', s, '0 0 24 24', st, '<path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="currentColor"/>'); }
  function plane(st) { return svg('plane', 54, '0 0 24 24', st, '<path d="M2 12L22 3 15 21 11 13z" fill="currentColor"/>'); }
  function cursor(st) { return svg('cursor', 36, '0 0 24 24', st, '<path d="M4 2l15 9-6.5 1.5L9 19z" fill="#fff" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>'); }
  function dash(st) { return '<svg aria-hidden="true" class="deco dash" width="400" height="360" viewBox="0 0 400 360" style="' + st + '"><path d="M0 40C150 -20 260 160 180 260C130 320 40 290 60 220" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="7 7"/></svg>'; }
  function title(pill, h, extra) {
    return rv('center', '<span class="pill s">' + pill + '</span>') +
      rv('titlewrap sm-t', '<div class="win dot titlewin">' + BAR + '</div><h2 class="t big">' + h + '</h2>' + (extra || ''));
  }
  function zoomImg(file, alt, extra) { return '<img src="' + src(file) + '" alt="' + esc(alt) + '" loading="lazy" data-zoom ' + (extra || '') + '>'; }
  var isAr = function () { return lang === 'ar'; };

  function header() {
    var links = D.nav.map(function (n) { return '<a class="pill s" data-nav="' + n.id + '" href="#' + n.id + '">' + T(n.label) + '</a>'; }).join('');
    var globe = '<svg aria-hidden="true" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>';
    return '<header class="hdr"><a class="pill s" href="#home" aria-label="Renad — home">RENAD</a>' +
      '<button class="pill s burger" aria-expanded="false" aria-controls="menu" data-act="menu">' + (isAr() ? 'القائمة' : 'Menu') + '</button>' +
      '<nav id="menu" aria-label="Primary">' + links +
      '<button class="pill s lang" data-act="lang" aria-label="' + (isAr() ? 'Switch to English' : 'التبديل إلى العربية') + '">' + globe + (isAr() ? 'English' : 'العربية') + '</button></nav></header>';
  }
  function hero() {
    return '<section id="home" class="hero"><div class="titlewrap"><div class="win dot titlewin">' + BAR + '</div>' +
      '<h1 class="t big">' + T({ en: 'Portfolio', ar: 'ملف أعمالي' }) + '</h1>' +
      '<span class="pill namepill">' + T({ en: 'Renad | Computer Engineer', ar: 'رناد | هندسة الحاسب' }) + '</span><span class="t sticker" aria-hidden="true">2026</span>' +
      spark(38, 'inset-inline-start:-16px;top:20px') + spark(30, 'inset-inline-end:0;top:0') + cursor('inset-inline-start:58%;bottom:4px') + '</div>' +
      '<div class="win caption">' + BAR + '<div class="cap-in"><p class="eyebrow">' + T({ en: 'COMPUTER ENGINEERING · SOFTWARE DEVELOPMENT · CREATIVE THINKING', ar: 'هندسة الحاسب · تطوير البرمجيات · التفكير الإبداعي' }) + '</p>' +
      '<h2 class="t cap-h">' + T({ en: 'Where Engineering Meets Creativity.', ar: 'حيث تلتقي الهندسة بالإبداع.' }) + '</h2>' +
      '<p class="sm">' + T({ en: 'I’m Renad, a Computer Engineering graduate interested in building thoughtful digital experiences through software, design, and technology.', ar: 'أنا رناد، خريجة هندسة الحاسب، مهتمة ببناء تجارب رقمية مدروسة عبر البرمجيات والتصميم والتقنية.' }) + '</p>' +
      '<div class="ctas"><a class="btn" href="#projects">' + T({ en: 'Explore My Work', ar: 'استعرض أعمالي' }) + '</a><a class="btn o" href="#about">' + T({ en: 'More About Me', ar: 'المزيد عني' }) + '</a></div></div></div>' +
      '<div class="hero-foot"><span>' + T({ en: 'SAUDI ARABIA', ar: 'السعودية' }) + '</span><a href="#about">' + T({ en: 'SCROLL ↓', ar: 'مرّر ↓' }) + '</a></div></section>';
  }
  function about() {
    var info = [[{ en: 'Major', ar: 'التخصص' }, { en: 'Computer Engineering · Taif University', ar: 'هندسة الحاسب · جامعة الطائف' }],
      [{ en: 'GPA', ar: 'المعدل' }, { en: '3.62 / 4.00 · Excellent, with Honors', ar: '3.62 / 4.00 · امتياز، مع مرتبة الشرف' }],
      [{ en: 'Languages', ar: 'اللغات' }, { en: 'Arabic — Native · English — Intermediate', ar: 'العربية — اللغة الأم · الإنجليزية — متوسط' }]]
      .map(function (r) { return '<div><b>' + T(r[0]) + '</b><span>' + T(r[1]) + '</span></div>'; }).join('');
    var p = [{ en: 'I’m Renad, a Computer Engineering graduate from Taif University with an interest in software engineering and digital product development.', ar: 'أنا رناد، خريجة هندسة الحاسب من جامعة الطائف، مهتمة بهندسة البرمجيات وتطوير المنتجات الرقمية.' },
      { en: 'My background combines engineering fundamentals with hands-on learning in application development, interface design, and collaborative projects.', ar: 'تجمع خلفيتي بين أساسيات الهندسة والتعلّم العملي في تطوير التطبيقات وتصميم الواجهات والمشاريع الجماعية.' },
      { en: 'I’m continuously learning, building, and exploring how technology and thoughtful design come together.', ar: 'أتعلّم وأبني باستمرار، وأستكشف كيف تلتقي التقنية بالتصميم المدروس.' }]
      .map(function (x) { return '<p class="sm">' + T(x) + '</p>'; }).join('');
    return '<section id="about" class="sec">' + rv('center', '<span class="pill">' + T({ en: 'Welcome!', ar: 'أهلاً بك!' }) + '</span>') +
      rv('aboutwrap', '<div class="win aboutwin">' + BAR + '<div class="aboutin"><div class="crop"><i></i><i></i><i></i><i></i><h2 class="t hi">' + T({ en: 'Hi!', ar: 'مرحباً!' }) + '</h2>' + p + '</div>' +
        '<div class="win info">' + BAR + '<div class="info-in">' + info + '</div></div></div></div>' +
        '<div class="win me">' + BAR + '<div class="me-in">' + T({ en: 'ME', ar: 'أنا' }) + '</div></div>' + spark(34, 'inset-inline-end:20px;top:-30px') + plane('inset-inline-end:-10px;bottom:-50px')) + '</section>';
  }
  function media(p, i) {
    var m = p.media, h;
    if (m.kind === 'phones') {
      h = '<div class="win stage">' + BAR + '<div class="phones n' + m.imgs.length + '">' + m.imgs.map(function (f, k) { return zoomImg(f, p.title + ' app screen ' + (k + 1), 'style="animation-delay:' + (k * 0.9) + 's"'); }).join('') + '</div></div>';
    } else {
      h = '<div class="comp"><div class="mon"><div class="scr">' + zoomImg(m.img, p.title + ' website design') + '</div><div class="chin"><i></i></div></div>' +
        '<svg aria-hidden="true" class="stand" viewBox="0 0 400 118"><path d="M165 0H235L252 80H148Z" transform="translate(8 8)" fill="currentColor"/><path d="M165 0H235L252 80H148Z" fill="#fff" stroke="currentColor" stroke-width="2"/><rect x="100" y="80" width="200" height="22" rx="11" transform="translate(8 8)" fill="currentColor"/><rect x="100" y="80" width="200" height="22" rx="11" fill="#fff" stroke="currentColor" stroke-width="2"/></svg>' +
        '<div class="desk"><div class="kb"><div class="keys"></div><div class="space"></div></div><div class="mouse"><i></i></div><div class="mug"><i></i><svg aria-hidden="true" viewBox="0 0 40 30" width="40" height="30"><path d="M10 28c-6-8 6-10 0-18M22 28c-6-8 6-10 0-18M34 28c-6-8 6-10 0-18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div></div></div>';
    }
    return h + (i % 2 === 0 ? cursor('inset-inline-end:8%;top:40%') : plane('inset-inline-start:4%;bottom:-30px')) + dash('inset-inline-start:-130px;top:120px');
  }
  function projects() {
    var idx = D.projects.map(function (p) { return '<li><a href="#' + p.id + '"><b>' + p.no + '</b> ' + esc(p.title) + '</a></li>'; }).join('');
    var secs = D.projects.map(function (p, i) {
      var chips = '<span class="pill s">' + T({ en: 'Status: ', ar: 'الحالة: ' }) + T(p.status) + '</span>' + p.chips.map(function (c) { return '<span class="pill s">' + T(c) + '</span>'; }).join('');
      var cards = [p.c1, p.c2].map(function (c, k) { return rv('win card', BAR + '<div class="card-in"><b>' + T(c.h) + '</b><p class="sm">' + T(c.p) + '</p></div>', k * 100); }).join('');
      return '<article id="' + p.id + '" class="proj">' + rv('center', '<span class="pill s">' + p.no + ' / 0' + D.projects.length + ' · ' + T(p.cat) + '</span>') +
        rv('titlewrap sm-t', '<div class="win dot titlewin">' + BAR + '</div><h2 class="t big">' + esc(p.title) + '</h2>' + spark(38, 'inset-inline-start:-10px;top:30px') + spark(28, 'inset-inline-end:0;top:0')) +
        rv('win caption small', BAR + '<div class="cap-in"><p class="sm center-t">' + T(p.desc) + '</p></div>') + rv('chips', chips) + rv('media', media(p, i)) + '<div class="cards2">' + cards + '</div></article>';
    }).join('');
    return '<section id="projects" class="sec">' + rv('center', '<span class="pill">' + T({ en: 'Content', ar: 'الفهرس' }) + '</span>') +
      rv('win dark idx', BAR + '<div class="crop w"><i></i><i></i><i></i><i></i><ol>' + idx + '</ol></div>' + spark(34, 'inset-inline-start:24px;top:60px;color:#fff')) + secs + '</section>';
  }
  function skills() {
    var groups = D.skillGroups.map(function (g) {
      var items = g.items.map(function (it) { return '<div class="win lc"><svg aria-hidden="true" viewBox="0 0 48 48" width="52" height="52">' + LOGO[it.n] + '</svg><div><b>' + esc(it.n) + '</b>' + (it.sub ? '<small>' + T(it.sub) + '</small>' : '') + '</div></div>'; }).join('');
      return rv('win lg' + (g.cols === 3 ? ' wide' : ''), BAR + '<div class="lg-h">' + T(g.h) + '</div><div class="lcards">' + items + '</div>');
    }).join('');
    var soft = D.softSkills.map(function (s, i) {
      return '<div class="srow"><span class="sno">0' + (i + 1) + '</span><span class="sico"><svg aria-hidden="true" viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + s.icon + '</svg></span><span class="t sname">' + T(s.n) + '</span></div>';
    }).join('');
    return '<section id="skills" class="sec">' + title(T({ en: 'Skills · Languages', ar: 'المهارات · اللغات' }), T({ en: 'Skills', ar: 'المهارات' }), spark(34, 'inset-inline-end:0;top:0')) +
      '<div class="langgrid">' + groups + '</div>' + rv('win soft', BAR + '<div class="lg-h">' + T({ en: 'Soft skills', ar: 'المهارات الشخصية' }) + '</div>' + soft) + '</section>';
  }
  function certs() {
    var cs = D.certs.map(function (c, i) {
      return rv('win cert', BAR + zoomImg(c.img, 'Certificate — ' + c.title.en) + '<div class="cert-in"><span class="pill s">' + T(c.tag) + '</span><b>' + T(c.title) + '</b>' +
        (c.orig && !isAr() ? '<span class="sm orig" dir="rtl">' + esc(c.orig) + '</span>' : '') + '<small class="sm">' + T(c.meta) + '</small></div>', (i % 2) * 120);
    }).join('');
    return '<section id="certificates" class="sec">' + title(T({ en: 'Learning · Certificates', ar: 'التعلّم · الشهادات' }), T({ en: 'Certificates', ar: 'الشهادات' })) + '<div class="certs">' + cs + '</div></section>';
  }
  function experience() {
    var ex = D.experience.map(function (e, i) {
      return rv('win exp' + (i % 2 ? ' r' : ''), BAR + '<div class="exp-in"><span class="pill s">' + T(e.dates) + '</span><h3 class="t">' + T(e.role) + '</h3><b>' + T(e.org) + '</b><p class="sm">' + T(e.text) + '</p>' +
        e.points.map(function (p) { return '<div class="sm">— ' + T(p) + '</div>'; }).join('') +
        (e.chips ? '<div class="tags">' + e.chips.map(function (c) { return '<span class="ic">' + T(c) + '</span>'; }).join('') + '</div>' : '') + '</div>');
    }).join('');
    var act = rv('win act', BAR + '<div class="exp-in"><b>' + T({ en: 'Activities', ar: 'الأنشطة' }) + '</b><div class="sm">— ' + T({ en: 'Member of PAIC, the Programming and Artificial Intelligence Club', ar: 'عضوة في نادي البرمجة والذكاء الاصطناعي (PAIC)' }) + '</div><div class="sm">— ' + T({ en: 'Participant in software development training and technical projects', ar: 'مشاركة في تدريب تطوير البرمجيات والمشاريع التقنية' }) + '</div></div>');
    return '<section id="experience" class="sec">' + title(T({ en: 'Experience · Practice', ar: 'الخبرة · الممارسة' }), T({ en: 'Experience', ar: 'الخبرة' })) + '<div class="exps">' + ex + act + '</div></section>';
  }
  function contact() {
    var c = D.contact;
    var items = [
      { n: 'LinkedIn', href: c.linkedin, cta: { en: 'Open LinkedIn ↗', ar: 'افتح LinkedIn ↗' }, ic: '<rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor"/><text x="12" y="17" text-anchor="middle" font-size="12" font-weight="700" fill="#fff" font-family="Space Mono,monospace">in</text>' },
      { n: 'X', href: c.x, cta: { en: 'Open X ↗', ar: 'افتح X ↗' }, ic: '<path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' },
      { n: t({ en: 'Email', ar: 'البريد الإلكتروني' }), href: c.email ? 'mailto:' + c.email : '', cta: { en: 'Send an email ↗', ar: 'أرسل بريداً ↗' }, ic: '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' }
    ].map(function (it, i) {
      var act = it.href ? '<a class="btn" href="' + esc(it.href) + '"' + (it.href.indexOf('http') === 0 ? ' target="_blank" rel="noreferrer"' : '') + '>' + T(it.cta) + '</a>'
        : '<span class="sm">' + T({ en: 'Coming soon', ar: 'قريباً' }) + '</span><button class="btn" data-act="soon">' + T(it.cta) + '</button>';
      return rv('win ccard', BAR + '<div class="card-in"><span class="sico"><svg aria-hidden="true" viewBox="0 0 24 24" width="34" height="34">' + it.ic + '</svg></span><div class="t cname">' + esc(it.n) + '</div>' + act + '</div>', i * 100);
    }).join('');
    return '<section id="contact" class="sec">' + title(T({ en: 'Let’s connect', ar: 'لنتواصل' }), T({ en: 'Contact', ar: 'تواصل' }), plane('inset-inline-end:-20px;bottom:-30px')) +
      rv('win caption small', BAR + '<div class="cap-in"><p class="sm center-t">' + T({ en: 'Have a project or opportunity in mind? I’m always open to connecting with people who value thoughtful design, technology, and continuous learning.', ar: 'هل لديك مشروع أو فرصة في بالك؟ يسعدني التواصل مع من يقدّر التصميم المدروس والتقنية والتعلّم المستمر.' }) + '</p></div>') +
      '<div class="cgrid">' + items + '</div></section>';
  }
  function footer() {
    return '<footer class="foot"><div><strong class="wm">RENAD</strong><p class="sm">' + T({ en: 'Computer Engineer | Software Engineering · Saudi Arabia', ar: 'هندسة الحاسب | هندسة البرمجيات · السعودية' }) + '</p></div>' +
      '<nav aria-label="Footer"><a href="#about">' + T({ en: 'About', ar: 'عني' }) + '</a><a href="#projects">' + T({ en: 'Projects', ar: 'المشاريع' }) + '</a><a href="#experience">' + T({ en: 'Experience', ar: 'الخبرة' }) + '</a><a href="#contact">' + T({ en: 'Contact', ar: 'تواصل' }) + '</a></nav>' +
      '<p class="sm"><em>' + T({ en: 'Thoughtfully designed. Continuously evolving.', ar: 'مصمّم بعناية. يتطوّر باستمرار.' }) + '</em></p></footer>';
  }
  function html() { return header() + '<main>' + hero() + about() + projects() + skills() + certs() + experience() + contact() + '</main>' + footer(); }
  window.__html = function (l) { lang = l; return html(); };

  function observe(instant) {
    ios.forEach(function (o) { o.disconnect(); }); ios = [];
    var rvs = document.querySelectorAll('.rv');
    if (instant || reduce || !('IntersectionObserver' in window)) { rvs.forEach(function (e) { e.classList.add('in'); }); }
    else {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
      rvs.forEach(function (e) { io.observe(e); }); ios.push(io);
    }
    if ('IntersectionObserver' in window) {
      var links = {}; document.querySelectorAll('[data-nav]').forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
      var io2 = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { Object.keys(links).forEach(function (k) { links[k].classList.toggle('on', k === e.target.id); links[k][k === e.target.id ? 'setAttribute' : 'removeAttribute']('aria-current', 'true'); }); } });
      }, { rootMargin: '-40% 0px -55% 0px' });
      ['home'].concat(D.nav.map(function (n) { return n.id; })).forEach(function (id) { var el = document.getElementById(id); if (el) io2.observe(el); });
      ios.push(io2);
    }
  }
  function render(instant) {
    document.documentElement.lang = lang; document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
    document.title = isAr() ? 'رناد — هندسة الحاسب | هندسة البرمجيات' : 'Renad — Computer Engineer | Software Engineering';
    document.getElementById('app').innerHTML = html();
    observe(instant);
  }
  var toastTimer;
  function toast(msg) { var el = document.querySelector('.toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600); }
  function lb(open, s, a) { var el = document.querySelector('.lb'); if (open) { el.querySelector('img').src = s; el.querySelector('img').alt = a || ''; el.hidden = false; } else { el.hidden = true; } }
  function closeMenu() { var n = document.getElementById('menu'), b = document.querySelector('.burger'); if (n) n.classList.remove('open'); if (b) { b.setAttribute('aria-expanded', 'false'); b.textContent = isAr() ? 'القائمة' : 'Menu'; } }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act],[data-zoom],a[href^="#"]');
    if (!el) return;
    var act = el.getAttribute('data-act');
    if (act === 'lang') { lang = isAr() ? 'en' : 'ar'; try { localStorage.setItem('lang', lang); } catch (x) { /* ignore */ } render(true); return; }
    if (act === 'menu') { var n = document.getElementById('menu'), o = n.classList.toggle('open'); el.setAttribute('aria-expanded', String(o)); el.textContent = o ? (isAr() ? 'إغلاق' : 'Close') : (isAr() ? 'القائمة' : 'Menu'); return; }
    if (act === 'soon') { toast(isAr() ? 'الرابط سيُضاف قريباً' : 'This link will be added soon'); return; }
    if (act === 'closelb') { lb(false); return; }
    if (el.hasAttribute('data-zoom')) { lb(true, el.currentSrc || el.src, el.alt); return; }
    closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { lb(false); closeMenu(); } });
  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0, h = document.querySelector('.hdr'), tt = document.querySelector('.totop');
    if (h) h.classList.toggle('solid', y > 40); if (tt) tt.classList.toggle('show', y > 600);
  }, { passive: true });
  render(false);
})();
