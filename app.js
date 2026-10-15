(function () {
  'use strict';
  var BD = window.BOARDS, CV = 'assets/Renad_Aladwani_Resume.pdf';
  var DESK = [['home', 'B-Hero'], ['about', 'B-About'], ['projects', 'B-Content'], ['almam', 'B-Project'], ['city-pulse', 'B-CityPulse'], ['paic', 'B-PAIC'], ['zhi', 'B-Zhi'], ['skills', 'B-Languages'], ['certificates', 'B-Certificates'], ['experience', 'B-Experience'], ['contact', 'B-Contact']];
  var MOB = [['home', 'Mob-Home'], ['about', 'Mob-About'], ['projects', 'Mob-Projects'], ['almam', 'Mob-Project'], ['city-pulse', 'Mob-CityPulse'], ['paic', 'Mob-PAIC'], ['zhi', 'Mob-Zhi'], ['skills', 'Mob-Skills'], ['certificates', 'Mob-Certificates'], ['experience', 'Mob-Experience'], ['contact', 'Mob-Contact']];
  var PROJ = ['almam', 'city-pulse', 'paic', 'zhi'];
  var MAP = { about: 'about', projects: 'projects', work: 'projects', 'explore my work': 'projects', skills: 'skills', certificates: 'certificates', experience: 'experience', contact: 'contact' };
  var app = document.getElementById('app'), menuEl = document.getElementById('menu'), wipe = document.querySelector('.wipe'), toastEl = document.querySelector('.toast');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mode = '', hosts = [], busy = false, io = null, lang = 'en', curId = null;
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  try { lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }

  var BASE = ':host{display:block}' +
    ':host(:not(.go)) *,:host(:not(.go)) *::before,:host(:not(.go)) *::after{animation-play-state:paused!important}' +
    ':host(.dark){filter:invert(.92) hue-rotate(180deg)}:host(.dark) img,:host(.dark) image,:host(.dark) .stg,:host(.dark) .stg3,:host(.dark) .dev{filter:hue-rotate(180deg) invert(1) contrast(1.1905)}:host(.dark) .stg3 .dev,:host(.dark) .stg .dev{filter:none}:host(.dark) .dev,:host(.dark) .stg3:has(.dev){background:#fff;border-radius:14px}:host(.dark) .stg img,:host(.dark) .stg3 img,:host(.dark) .dev img{filter:none}' +
    '.cr{cursor:pointer}a,summary,.pill{-webkit-tap-highlight-color:transparent}' +
    '[dir=rtl]{unicode-bidi:plaintext}.pg{min-height:var(--mh,0)!important;padding-top:30px!important}' +
    '.bgr{min-height:var(--mh,0)!important}' +
    '.bgr>*:not(.bgl){transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}' +
    ':host(:not(.go)) .bgr>*:not(.bgl){opacity:0;transform:translateY(34px)}';

  function vw() { return document.documentElement.clientWidth || window.innerWidth; }
  function isMob() { return vw() < 900; }
  function zoomFor(mob) { return mob ? Math.min(vw() / 390, 1.7) : Math.min(1.5, vw() / 1440); }
  function bump(root) {
    if (!isMob()) return;
    var els = root.querySelectorAll('*'), i, e, f, n;
    for (i = 0; i < els.length; i++) {
      e = els[i]; if (e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e.tagName === 'STYLE') continue;
      n = e.firstChild; var has = false; while (n) { if (n.nodeType === 3 && n.nodeValue.trim()) { has = true; break; } n = n.nextSibling; }
      if (!has || e.closest('.stg3')) continue;
      f = parseFloat(getComputedStyle(e).fontSize);
      if (f < 12) e.style.setProperty('font-size', Math.min(12, Math.max(10.5, f * 1.6)) + 'px', 'important');
    }
    for (i = 0; i < els.length; i++) {
      e = els[i]; if (e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e.tagName === 'STYLE') continue;
      if (e.closest('.stg3,.sc,.dev,.dot,.kb,.cat')) continue;
      var cs = getComputedStyle(e);
      if (cs.position === 'absolute' || cs.position === 'fixed') continue;
      if (e.scrollHeight > e.clientHeight + 3 && (cs.overflowY !== 'visible' || e.style.height)) { e.style.height = 'auto'; e.style.maxHeight = 'none'; e.style.overflow = 'visible'; }
    }
  }
  function fill(host) {
    var b = BD[host.getAttribute('data-board')];
    host.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + b.html;
    hideHdr(host.shadowRoot); bump(host.shadowRoot);
    if (window.__i18n && lang === 'ar') window.__i18n(host.shadowRoot, true);
  }
  function hdrNode(root) {
    var bar = root.querySelector('.bar');
    if (bar && bar.querySelector('.hb')) return bar;
    var ps = root.querySelectorAll('.pill'), i;
    for (i = 0; i < ps.length; i++) { if (ps[i].textContent.trim() === 'RENAD' && ps[i].parentNode.querySelector('a.nl')) return ps[i].parentNode; }
    return null;
  }
  function hideHdr(root) { var n = hdrNode(root); if (n && n.classList.contains('bar')) { n.parentNode.removeChild(n); return; } if (n) { n.style.visibility = 'hidden'; n.style.pointerEvents = 'none'; n.setAttribute('aria-hidden', 'true'); } }
  var hdrEl = null;
  function buildHdr() {
    if (hdrEl && hdrEl.parentNode) hdrEl.parentNode.removeChild(hdrEl);
    var mob = isMob(), b = BD[mob ? 'Mob-Home' : 'B-Hero'];
    var tmp = document.createElement('div'); tmp.innerHTML = b.html; var node = hdrNode(tmp); if (!node) return;
    node.style.visibility = ''; node.style.pointerEvents = '';
    var h = document.createElement('header'); h.id = 'hdr'; h.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:50;margin-inline:auto';
    h.attachShadow({ mode: 'open' });
    var inner;
    if (mob) { node.style.margin = '0'; node.style.position = 'relative'; inner = node.outerHTML; }
    else { inner = '<div class="hdw" style="padding:14px 72px;background:#fff;border-bottom:2px solid #111;box-sizing:border-box;position:relative;z-index:5;font-family:\'Space Mono\',monospace">' + node.outerHTML + '</div>'; }
    h.shadowRoot.innerHTML = '<style>' + BASE + b.css + '.bar{position:relative!important;top:auto!important}</style>' + inner;
    if (window.__i18n && lang === 'ar') window.__i18n(h.shadowRoot, true);
    h.shadowRoot.addEventListener('click', onClick);
    document.body.insertBefore(h, document.body.firstChild); hdrEl = h; bump(h.shadowRoot);
    h.classList.add('go'); if (theme === 'dark') h.classList.add('dark');
    layoutHdr(); markNav();
  }
  function layoutHdr() {
    if (!hdrEl) return; var mob = isMob(), z = zoomFor(mob);
    hdrEl.style.width = mob ? '390px' : '1440px'; hdrEl.style.zoom = z; if (!mob) hdrEl.style.margin = '0 auto';
  }
  var NAVOF = { about: 'About', projects: 'Projects', almam: 'Projects', 'city-pulse': 'Projects', paic: 'Projects', zhi: 'Projects', skills: 'Skills', certificates: 'Certificates', experience: 'Experience', contact: 'Contact' };
  var NAVAR = { About: 'عني', Projects: 'المشاريع', Skills: 'المهارات', Certificates: 'الشهادات', Experience: 'الخبرة', Contact: 'تواصل' };
  function markNav() {
    if (!hdrEl) return; var cur = '', y = 90, i, r;
    for (i = 0; i < hosts.length; i++) { r = hosts[i].getBoundingClientRect(); if (r.top <= y && r.bottom > y) { cur = hosts[i].id; break; } }
    var want = NAVOF[cur] || '';
    hdrEl.shadowRoot.querySelectorAll('a.nl').forEach(function (n) {
      var t = n.textContent.trim(), on = (t === want || NAVAR[want] === t) && !!want; n.classList.toggle('on', on);
    });
  }
  function layout() {
    var mob = isMob(), z = zoomFor(mob);
    layoutHdr();
    var hh = hdrEl ? hdrEl.getBoundingClientRect().height : 0;
    document.body.classList.toggle('paged', mob);
    hosts.forEach(function (h) {
      if (mob) { h.style.width = '390px'; h.style.setProperty('--mh', Math.max(200, (window.innerHeight - hh) / z) + 'px'); if (h.parentNode.classList.contains('pgwrap')) h.parentNode.style.top = hh + 'px'; }
      else { h.style.width = '1440px'; h.style.marginLeft = h.style.marginRight = 'auto'; h.style.setProperty('--mh', (window.innerHeight / z) + 'px'); }
      h.style.zoom = z;
    });
    if (menuEl.firstChild) { menuEl.firstChild.style.zoom = zoomFor(true); }
  }
  function mount() {
    mode = isMob() ? 'm' : 'd';
    var list = mode === 'm' ? MOB : DESK;
    if (io) io.disconnect();
    app.innerHTML = ''; hosts = [];
    list.forEach(function (p) {
      var h = document.createElement('section'); h.className = 'bd'; h.id = p[0]; h.setAttribute('data-board', p[1]);
      h.attachShadow({ mode: 'open' }); hosts.push(h);
      if (mode === 'm') { var wr = document.createElement('div'); wr.className = 'pgwrap'; wr.setAttribute('data-id', p[0]); wr.appendChild(h); app.appendChild(wr); } else { app.appendChild(h); }
      fill(h);
      if (theme === 'dark') h.classList.add('dark');
      h.shadowRoot.addEventListener('click', onClick);
    });
    buildHdr(); layout();
    document.body.style.overflow = mode === 'm' ? 'hidden' : '';
    curId = null;
    if (mode === 'm') { showNow(location.hash.length > 1 && document.getElementById(location.hash.slice(1)) ? location.hash.slice(1) : 'home'); buildMenu(); return; }
    io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('go'); io.unobserve(e.target); } }); }, { threshold: 0.04 }) : null;
    hosts.forEach(function (h) { if (io) io.observe(h); else h.classList.add('go'); });
    buildMenu();
  }
  function buildMenu() {
    menuEl.innerHTML = '';
    var h = document.createElement('div'); h.style.cssText = 'position:fixed;inset:0;z-index:100;display:none;width:390px';
    h.attachShadow({ mode: 'open' }); var b = BD['Mob-Menu'];
    var mh = b.html.replace('width:195px','width:290px').replace('padding:18px 14px;display:flex;flex-direction:column;gap:14px','padding:22px 20px;display:flex;flex-direction:column;gap:22px')
      .replace(/font-size:5\.5px;height:14px/,'font-size:13px;height:34px').replace(/padding:0 6px;border-width:1\.5px;border-radius:4px;box-shadow:1px 1px 0 #111/,'padding:0 14px;border-width:2px;border-radius:8px;box-shadow:2px 2px 0 #111')
      .replace('width:14px;height:14px;border-width:1.5px;border-radius:4px;box-shadow:1px 1px 0 #111','width:38px;height:38px;border-width:2px;border-radius:8px;box-shadow:2px 2px 0 #111')
      .replace('width="6" height="6"','width="18" height="18"')
      .replace(/font-size: 7px/,'font-size:17px').replace(/padding:6px 2px;border-bottom:1\.5px dashed #111;font:700 7px/g,'padding:17px 4px;border-bottom:2px dashed #111;font:700 17px');
    h.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + mh;
    h.style.zoom = zoomFor(true); h.style.width = '';
    h.style.inset = '0'; menuEl.appendChild(h);
    h.shadowRoot.addEventListener('click', function (e) {
      var a = e.target.closest('a'), sc = e.target.closest('.mnu');
      if (a) {
        e.preventDefault();
        if ((a.getAttribute('aria-label') || '') === 'Close') { closeMenu(); return; }
        var k = key(a.textContent); if (k) { closeMenu(); go(k); }
      } else if (e.target === sc.firstElementChild) { closeMenu(); }
    });
  }
  function openMenu() { var h = menuEl.firstChild; if (!h) return; h.style.display = 'block'; menuEl.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; }
  function closeMenu() { var h = menuEl.firstChild; if (!h) return; h.style.display = 'none'; menuEl.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function key(txt) {
    var t = String(txt).replace(/[→↓↗•]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (MAP[t]) return MAP[t];
    for (var k in MAP) { if (t.indexOf(k) === 0) return MAP[k]; }
    return '';
  }
  function toast(m) { toastEl.textContent = m; toastEl.classList.add('show'); setTimeout(function () { toastEl.classList.remove('show'); }, 2400); }

  function setTheme(t) {
    theme = t; document.documentElement.setAttribute('data-theme', t);
    try { sessionStorage.setItem('theme', t); } catch (e) { /* ignore */ }
    hosts.forEach(function (h) { h.classList.toggle('dark', t === 'dark'); }); if (hdrEl) hdrEl.classList.toggle('dark', t === 'dark'); if (hdrEl) hdrEl.classList.toggle('dark', t === 'dark');
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'dark' ? '#141414' : '#ffffff');
  }
  function setLang(l) {
    lang = l; try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
    document.documentElement.lang = l; document.documentElement.dir = 'ltr';
    hosts.forEach(function (h) { fill(h); }); buildHdr();
    if (window.__i18n && menuEl.firstChild) { if (l === 'ar') window.__i18n(menuEl.firstChild.shadowRoot, true); else { var b = BD['Mob-Menu']; menuEl.firstChild.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + b.html; } }
    document.title = l === 'ar' ? 'رناد — مهندسة حاسب · مطورة برمجيات · مصممة واجهات' : 'Renad — Computer Engineer · Software Developer · UI Designer';
  }
  function download() { var a = document.createElement('a'); a.href = CV; a.download = 'Renad_Aladwani_Resume.pdf'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }

  function onClick(e) {
    var t = e.target; if (!t.closest) return;
    var row = t.closest('.cr');
    if (row) { var rows = row.parentNode.querySelectorAll('.cr'), i = Array.prototype.indexOf.call(rows, row); if (PROJ[i]) { e.preventDefault(); go(PROJ[i]); return; } }
    var a = t.closest('a');
    if (!a) { var pl = t.closest('.pill'); if (pl && /^renad$/i.test(pl.textContent.trim())) { go('home'); } return; }
    var href = a.getAttribute('href') || '', lab = (a.getAttribute('aria-label') || '').toLowerCase(), txt = a.textContent.trim();
    if (href.charAt(0) !== '#' && href) return;
    e.preventDefault();
    if (a.hasAttribute('data-lang') || lab.indexOf('arabic') === 0) { setLang(lang === 'ar' ? 'en' : 'ar'); return; }
    if (a.hasAttribute('data-theme') || lab.indexOf('dark') === 0) { setTheme(theme === 'dark' ? 'light' : 'dark'); return; }
    if (a.hasAttribute('data-cv') || /^cv(\s*↓)?$/i.test(txt) || /cv/i.test(lab)) { download(); return; }
    if (a.hasAttribute('data-grp') || lab === 'menu') { openMenu(); return; }
    var k = key(txt); if (k) { go(k); return; }
    if (/^renad$/i.test(txt)) { go('home'); return; }
  }

  function replay(el) {
    el.classList.remove('go'); fill(el); void el.offsetWidth; el.classList.add('go');
  }
  function go(id, instant) {
    var el = document.getElementById(id); if (!el) return;
    if (mode === 'm') { goMobile(id, instant); return; }
    var target = Math.max(0, el.getBoundingClientRect().top + (window.scrollY || 0));
    try { history.replaceState(null, '', '#' + id); } catch (x) { /* ignore */ }
    if (reduce || busy || instant) { window.scrollTo(0, target); return; }
    busy = true;
    var y0 = window.scrollY || 0, dist = target - y0, t0 = null, dur = Math.min(1100, 520 + Math.abs(dist) * 0.12);
    function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function step(ts) {
      if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, y0 + dist * ease(p));
      if (p < 1) requestAnimationFrame(step); else { busy = false; setTimeout(function () { replay(document.getElementById(id)); }, 60); }
    }
    requestAnimationFrame(step);
  }
  function wrapOf(id) { return app.querySelector('.pgwrap[data-id="' + id + '"]'); }
  function order(id) { for (var i = 0; i < MOB.length; i++) { if (MOB[i][0] === id) return i; } return 0; }
  function showNow(id) { var w = wrapOf(id); if (!w) return; Array.prototype.forEach.call(app.querySelectorAll('.pgwrap'), function (x) { x.classList.remove('cur'); }); w.classList.add('cur'); w.scrollTop = 0; curId = id; replay(document.getElementById(id)); try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ } }
  function goMobile(id, instant, slideDir) {
    if (id === curId || busy) return;
    var cur = wrapOf(curId), next = wrapOf(id);
    if (!next) return;
    if (reduce || instant || !cur) { showNow(id); return; }
    busy = true;
    if (slideDir) {
      next.style.transition = 'none'; next.style.transform = 'translateX(' + (slideDir * 100) + '%)'; next.classList.add('cur'); next.scrollTop = 0; curId = id; replay(document.getElementById(id));
      void next.offsetWidth;
      var tr = 'transform .42s cubic-bezier(.16,1,.3,1)'; next.style.transition = tr; cur.style.transition = tr; next.style.transform = 'none'; cur.style.transform = 'translateX(' + (-slideDir * 55) + '%)';
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ }
      setTimeout(function () { if (cur !== next) cur.classList.remove('cur'); cur.style.transform = ''; cur.style.transition = ''; next.style.transition = ''; busy = false; }, 440);
      return;
    }
    var down = order(id) >= order(curId);
    wipe.classList.remove('off', 'fromtop'); wipe.classList.toggle('fromtop', !down); void wipe.offsetWidth; wipe.classList.add('on');
    setTimeout(function () {
      cur.classList.remove('cur'); showNow(id); wipe.classList.remove('on'); wipe.classList.add('off');
      setTimeout(function () { wipe.classList.remove('off', 'fromtop'); busy = false; }, 620);
    }, 500);
  }
  var tx = 0, ty = 0, tt0 = 0;
  app.addEventListener('touchstart', function (e) { var t = e.touches[0]; tx = t.clientX; ty = t.clientY; tt0 = Date.now(); }, { passive: true });
  app.addEventListener('touchend', function (e) {
    if (mode !== 'm' || busy) return; var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6 || Date.now() - tt0 > 700) return;
    var i = order(curId) + (dx < 0 ? 1 : -1); if (i < 0 || i >= MOB.length) return;
    goMobile(MOB[i][0], false, dx < 0 ? 1 : -1);
  }, { passive: true });
  document.querySelector('[data-top]').addEventListener('click', function (e) { e.preventDefault(); go('home'); });
  window.addEventListener('scroll', function () { markNav(); var tt = document.querySelector('.totop'); tt.classList.toggle('show', (window.scrollY || 0) > 700); markNav(); }, { passive: true });
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if ((isMob() ? 'm' : 'd') !== mode) { closeMenu(); mount(); if (lang === 'ar') document.documentElement.lang = 'ar'; } else layout(); }, 120);
  });
  window.__go = go; window.__lang = function () { return lang; };
  function splash(done) {
    var seen = false; try { seen = sessionStorage.getItem('splash') === '1'; } catch (e) { /* ignore */ }
    if (seen || reduce) { done(); return; }
    var ar = lang === 'ar', s = document.createElement('div'); s.className = 'splash';
    var star = '<svg class="sp-st" width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="currentColor"/></svg>';
    s.innerHTML = '<div class="sp-win"><div class="sp-b"><span>– ×</span><span>•••</span></div><div class="sp-in"><span class="sp-pill">' + (ar ? 'أهلاً بك!' : 'Welcome!') + '</span><div class="sp-h">RENAD</div><div class="sp-s">' + (ar ? 'ملف أعمالي · 2026' : 'Portfolio · 2026') + '</div><div class="sp-bar"><i></i></div><div class="sp-hint">' + (ar ? 'مهندسة حاسب · مطورة برمجيات · مصممة واجهات' : 'Computer Engineer · Software Developer · UI Designer') + '</div></div></div>' +
      '<span class="sp-s1">' + star + '</span><span class="sp-s2">' + star + '</span><span class="sp-skip">' + (ar ? 'اضغط للتخطي' : 'tap to skip') + '</span>';
    document.body.appendChild(s); document.documentElement.classList.add('splashing');
    var over = false;
    function end() { if (over) return; over = true; s.classList.add('out'); done(); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); document.documentElement.classList.remove('splashing'); try { sessionStorage.setItem('splash', '1'); } catch (e) { /* ignore */ } }, 760); }
    setTimeout(end, 3000); s.addEventListener('click', end);
  }
  if (lang === 'ar') document.documentElement.lang = 'ar';
  splash(function () { mount(); if (mode === 'd' && location.hash.length > 1) setTimeout(function () { go(location.hash.slice(1), true); }, 60); });
})();
