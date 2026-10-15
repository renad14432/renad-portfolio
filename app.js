(function () {
  'use strict';
  var BD = window.BOARDS, CV = 'assets/Renad_Aladwani_Resume.pdf';
  var DESK = [['home', 'B-Hero'], ['about', 'B-About'], ['projects', 'B-Content'], ['almam', 'B-Project'], ['city-pulse', 'B-CityPulse'], ['paic', 'B-PAIC'], ['zhi', 'B-Zhi'], ['skills', 'B-Languages'], ['certificates', 'B-Certificates'], ['experience', 'B-Experience'], ['contact', 'B-Contact']];
  var MOB = [['home', 'Mob-Home'], ['about', 'Mob-About'], ['projects', 'Mob-Projects'], ['almam', 'Mob-Project'], ['city-pulse', 'Mob-CityPulse'], ['paic', 'Mob-PAIC'], ['zhi', 'Mob-Zhi'], ['skills', 'Mob-Skills'], ['certificates', 'Mob-Certificates'], ['experience', 'Mob-Experience'], ['contact', 'Mob-Contact']];
  var PROJ = ['almam', 'city-pulse', 'paic', 'zhi'];
  var MAP = { about: 'about', projects: 'projects', work: 'projects', 'explore my work': 'projects', skills: 'skills', certificates: 'certificates', experience: 'experience', contact: 'contact' };
  var app = document.getElementById('app'), menuEl = document.getElementById('menu'), wipe = document.querySelector('.wipe'), toastEl = document.querySelector('.toast');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mode = '', hosts = [], busy = false, io = null, lang = 'en';
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  try { lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }

  var BASE = ':host{display:block}' +
    ':host(:not(.go)) *,:host(:not(.go)) *::before,:host(:not(.go)) *::after{animation-play-state:paused!important}' +
    ':host(.dark){filter:invert(.92) hue-rotate(180deg)}:host(.dark) img{filter:invert(1) hue-rotate(180deg)}' +
    '.cr{cursor:pointer}a,summary,.pill{-webkit-tap-highlight-color:transparent}' +
    '[dir=rtl]{unicode-bidi:plaintext}';

  function vw() { return document.documentElement.clientWidth || window.innerWidth; }
  function isMob() { return vw() < 900; }
  function zoomFor(mob) { return mob ? Math.min(vw() / 390, 1.7) : Math.min(1, vw() / 1440); }
  function fill(host) {
    var b = BD[host.getAttribute('data-board')];
    host.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + b.html;
    if (window.__i18n && lang === 'ar') window.__i18n(host.shadowRoot, true);
  }
  function layout() {
    var mob = isMob(), z = zoomFor(mob);
    hosts.forEach(function (h) {
      if (mob) { h.style.width = '390px'; } else { h.style.width = vw() > 1440 ? '100%' : '1440px'; }
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
      h.attachShadow({ mode: 'open' }); app.appendChild(h); hosts.push(h);
      fill(h);
      if (theme === 'dark') h.classList.add('dark');
      h.shadowRoot.addEventListener('click', onClick);
    });
    layout();
    io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('go'); io.unobserve(e.target); } }); }, { threshold: 0.04 }) : null;
    hosts.forEach(function (h) { if (io) io.observe(h); else h.classList.add('go'); });
    buildMenu();
  }
  function buildMenu() {
    menuEl.innerHTML = '';
    var h = document.createElement('div'); h.style.cssText = 'position:fixed;inset:0;z-index:100;display:none;width:390px';
    h.attachShadow({ mode: 'open' }); var b = BD['Mob-Menu'];
    h.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + b.html;
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
    hosts.forEach(function (h) { h.classList.toggle('dark', t === 'dark'); });
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'dark' ? '#141414' : '#ffffff');
  }
  function setLang(l) {
    lang = l; try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
    document.documentElement.lang = l; document.documentElement.dir = 'ltr';
    hosts.forEach(function (h) { fill(h); });
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
    var target = Math.max(0, el.getBoundingClientRect().top + (window.scrollY || 0));
    try { history.replaceState(null, '', '#' + id); } catch (x) { /* ignore */ }
    if (reduce || busy || instant) { window.scrollTo(0, target); return; }
    busy = true;
    var down = target >= (window.scrollY || 0);
    wipe.classList.remove('off', 'fromtop'); wipe.classList.toggle('fromtop', !down); void wipe.offsetWidth; wipe.classList.add('on');
    setTimeout(function () {
      window.scrollTo(0, target); wipe.classList.remove('on'); wipe.classList.add('off');
      setTimeout(function () { replay(document.getElementById(id)); }, 120);
      setTimeout(function () { wipe.classList.remove('off', 'fromtop'); busy = false; }, 620);
    }, 500);
  }
  document.querySelector('[data-top]').addEventListener('click', function (e) { e.preventDefault(); go('home'); });
  window.addEventListener('scroll', function () { var tt = document.querySelector('.totop'); tt.classList.toggle('show', (window.scrollY || 0) > 700); }, { passive: true });
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if ((isMob() ? 'm' : 'd') !== mode) { closeMenu(); mount(); if (lang === 'ar') document.documentElement.lang = 'ar'; } else layout(); }, 120);
  });
  window.__go = go; window.__lang = function () { return lang; };
  mount();
  if (lang === 'ar') document.documentElement.lang = 'ar';
  if (location.hash.length > 1) setTimeout(function () { go(location.hash.slice(1), true); }, 60);
})();
