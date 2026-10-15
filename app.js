(function () {
  'use strict';
  var BD = window.BOARDS, CV = 'assets/Renad_Aladwani_Resume.pdf';
  var DESK = [['home', 'B-Hero'], ['about', 'B-About'], ['projects', 'B-Content'], ['almam', 'B-Project'], ['city-pulse', 'B-CityPulse'], ['paic', 'B-PAIC'], ['zhi', 'B-Zhi'], ['skills', 'B-Languages'], ['certificates', 'B-Certificates'], ['experience', 'B-Experience'], ['contact', 'B-Contact']];
  var MOB = [['home', 'Mob-Home'], ['about', 'Mob-About'], ['projects', 'Mob-Projects'], ['almam', 'Mob-Project'], ['city-pulse', 'Mob-CityPulse'], ['paic', 'Mob-PAIC'], ['zhi', 'Mob-Zhi'], ['skills', 'Mob-Skills'], ['certificates', 'Mob-Certificates'], ['experience', 'Mob-Experience'], ['contact', 'Mob-Contact']];
  var PROJ = ['almam', 'city-pulse', 'paic', 'zhi'];
  var MAP = { about: 'about', projects: 'almam', work: 'almam', 'explore my work': 'almam', skills: 'skills', certificates: 'certificates', experience: 'experience', contact: 'contact', 'عني': 'about', 'المشاريع': 'almam', 'أعمالي': 'almam', 'استعرض أعمالي': 'almam', 'المهارات': 'skills', 'الشهادات': 'certificates', 'الخبرة': 'experience', 'الخبرات': 'experience', 'تواصل': 'contact' };
  var app = document.getElementById('app'), menuEl = document.getElementById('menu'), wipe = document.querySelector('.wipe'), toastEl = document.querySelector('.toast');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var curKind = '', mode = '', hosts = [], busy = false, navBusy = false, io = null, lang = 'en', curId = null;
  var theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  try { lang = localStorage.getItem('lang') === 'ar' ? 'ar' : 'en'; } catch (e) { /* storage unavailable */ }

  var ioOff = null;
  var BASE = ':host{display:block;-webkit-text-size-adjust:100%;text-size-adjust:100%}*{-webkit-text-size-adjust:100%;text-size-adjust:100%}' +
    ':host(:not(.go)) *,:host(:not(.go)) *::before,:host(:not(.go)) *::after{animation-play-state:paused!important}' +
    ':host(.off) *,:host(.off) *::before,:host(.off) *::after{animation-play-state:paused!important}' +
    ':host(.dark){filter:invert(.92) hue-rotate(180deg)}:host(.dark) img,:host(.dark) image{filter:hue-rotate(180deg) invert(1) contrast(1.1905)}' +
    '.cr{cursor:pointer}a,summary,.pill{-webkit-tap-highlight-color:transparent}' +
    '[dir=rtl]{unicode-bidi:plaintext}.pg{min-height:var(--mh,0)!important;padding-top:30px!important}' +
    '.bgr{min-height:var(--mh,0)!important}.pg{min-height:var(--mh,0)!important;box-sizing:border-box}' +
    '.bgr>*:not(.bgl){transition:opacity .9s ease,transform .9s cubic-bezier(.16,1,.3,1)}' +
    ':host(:not(.go)) .bgr>*:not(.bgl){opacity:0;transform:translateY(34px)}';

  function vw() { return document.documentElement.clientWidth || window.innerWidth; }
  // a phone held in landscape (short, wide viewport) gets the same layout as desktop; portrait phones keep the mobile layout
  function vh() { return document.documentElement.clientHeight || window.innerHeight; }
  function landscapeNow() { var mq = window.matchMedia && window.matchMedia('(orientation: landscape)'); return mq ? mq.matches : vw() > vh(); }
  function wide() { return false; } // landscape phones keep the portrait mobile layout at the same size (no expansion)
  function isMob() { return vw() < 1024 && !wide(); }
  function kind() { return isMob() ? 'm' : 'd'; }
  function zoomFor(mob) {
    if (!mob) return Math.min(1.5, vw() / 1440);
    // in landscape use the phone's short side, so the page keeps exactly the size it has in portrait
    var base = vw();
    if (landscapeNow() && window.screen && screen.width && screen.height) base = Math.min(base, Math.min(screen.width, screen.height));
    return Math.min(base / 390, 1.5);
  }
  function bump(root) {
    if (!isMob()) return;
    var els = root.querySelectorAll('*'), i, e, f, n, has;
    for (i = 0; i < els.length; i++) {
      e = els[i]; if (e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e.tagName === 'STYLE') continue;
      n = e.firstChild; has = false; while (n) { if (n.nodeType === 3 && n.nodeValue.trim()) { has = true; break; } n = n.nextSibling; }
      if (!has || e.closest('.stg3,.cbox,.abl,.gh,.lan,.pcw2') || e.classList.contains('cn') || e.classList.contains('bt') || e.classList.contains('ic') || e.classList.contains('dtp') || e.classList.contains('hbtn') || (e.tagName === 'A' && e.classList.contains('btn') && (e.getAttribute('target') === '_blank' || /^mailto/.test(e.getAttribute('href') || '')))) continue;
      f = parseFloat(getComputedStyle(e).fontSize);
      if (f < 12) e.style.setProperty('font-size', Math.min(12, Math.max(10.5, f * 1.6)) + 'px', 'important');
    }
    // fit pass: a bumped label must never overflow its chip/card (shrink it step by step instead of clipping)
    for (i = 0; i < els.length; i++) {
      e = els[i]; if (e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e.tagName === 'STYLE' || e.closest('.stg3,.cbox,.abl')) continue;
      n = e.firstChild; has = false; while (n) { if (n.nodeType === 3 && n.nodeValue.trim()) { has = true; break; } n = n.nextSibling; }
      if (!has) continue;
      var card = e.closest('.w'); if (!card) continue;
      var tries = 0, fs = parseFloat(getComputedStyle(e).fontSize);
      while (tries++ < 8 && fs > 8) {
        var over = false, a = e, cr = card.getBoundingClientRect(), rg = document.createRange(); rg.selectNodeContents(e); var er = rg.getBoundingClientRect();
        if (er.right > cr.right - 3) over = true;
        while (a && a !== card && !over) { if (a.scrollWidth > a.clientWidth + 1 && getComputedStyle(a).overflowX !== 'visible') over = true; a = a.parentElement; }
        if (!over) break;
        fs -= 0.75; e.style.setProperty('font-size', fs + 'px', 'important');
      }
    }
    for (i = 0; i < els.length; i++) {
      e = els[i]; if (e.namespaceURI !== 'http://www.w3.org/1999/xhtml' || e.tagName === 'STYLE') continue;
      if (e.closest('.stg3,.sc,.dev,.dot,.kb,.cat')) continue;
      var cs = getComputedStyle(e);
      if (cs.position === 'absolute' || cs.position === 'fixed') continue;
      if (e.style.height && /^[\d.]+px$/.test(e.style.height) && parseFloat(e.style.height) > 8 && e.classList.contains('w')) { var mh0 = e.style.height; e.style.height = 'auto'; e.style.minHeight = mh0; continue; }
      if (e.scrollHeight > e.clientHeight + 3 && (cs.overflowY !== 'visible' || e.style.height)) { e.style.height = 'auto'; e.style.maxHeight = 'none'; e.style.overflow = 'visible'; }
    }
  }
  function fill(host) {
    var b = BD[host.getAttribute('data-board')];
    host.shadowRoot.innerHTML = '<style>' + BASE + b.css + '</style>' + b.html;
    hideHdr(host.shadowRoot); bump(host.shadowRoot); fixLinks(host.shadowRoot);
    if (window.__i18n && lang === 'ar') {
      if (/About$/.test(host.getAttribute('data-board'))) { var tw = document.createTreeWalker(host.shadowRoot, NodeFilter.SHOW_TEXT), tn; while ((tn = tw.nextNode())) { var tv = tn.nodeValue.replace(/\u00a0/g, ' ').trim(); if (tv === 'Arabic' || tv === 'English') { var par = tn.parentNode; if (par && par.closest && par.closest('a')) continue; tn.nodeValue = tv === 'Arabic' ? 'العربية ' : 'الإنجليزية '; } } }
      window.__i18n(host.shadowRoot, true);
    }
    if (host.id === 'about') { requestAnimationFrame(function () { try { aboutCat(host); } catch (e) { /* ignore */ } }); }
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
    document.body.insertBefore(h, document.body.firstChild); hdrEl = h; bump(h.shadowRoot); fixLinks(h.shadowRoot);
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
    document.body.classList.remove('paged');
    hosts.forEach(function (h) {
      if (mob) { h.style.width = '390px'; h.style.marginLeft = h.style.marginRight = 'auto'; h.style.setProperty('--mh', Math.max(200, (window.innerHeight - hh) / z) + 'px'); }
      else { h.style.width = '1440px'; h.style.marginLeft = h.style.marginRight = 'auto'; h.style.setProperty('--mh', (window.innerHeight / z) + 'px'); }
      h.style.zoom = z;
    });
    if (menuEl.firstChild) { menuEl.firstChild.style.zoom = zoomFor(true); }
    requestAnimationFrame(aboutAll); setTimeout(aboutAll, 400); if (document.fonts && document.fonts.ready) document.fonts.ready.then(aboutAll);
  }
  /* About: the cat peeks over the window, paints the info card yellow, then hides again.
     Geometry is measured from the live layout so it fits both languages and any width. */
  function aboutCat(host) {
    var root = host.shadowRoot; if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll('svg.abl'), function (n) { n.parentNode.removeChild(n); });
    var st = root.getElementById ? root.getElementById('abcss') : root.querySelector('#abcss'); if (st && st.parentNode) st.parentNode.removeChild(st);
    var win = root.querySelector('.aboutwin'), card = root.querySelector('.info'); if (!win || !card || reduce) return;
    function rel(el, anc) { var x = 0, y = 0; while (el && el !== anc) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent; } return { x: x, y: y }; }
    var W = win.offsetWidth, H = win.offsetHeight; if (!W || !H) return;
    var cp = rel(card, win), cr = { left: cp.x, top: cp.y, width: card.offsetWidth }, wr = { left: 0, top: 0 };
    cr.height = card.offsetHeight;
    var bar = card.querySelector('.wb'), sc = Math.max(0.6, Math.min(2, 2 * W / 980));
    var m = { x: cr.left - wr.left, y: cr.top - wr.top, w: cr.width, h: cr.height };
    function f(x) { return (Math.round(x * 10) / 10).toString(); }
    var cx = m.x + m.w / 2, cy = -3 * sc, shx = cx + 8 * sc, shy = -0.5 * sc, pdx = 4 * sc, pdy = -9 * sc, ins = 4 * sc, sw = 9 * sc;
    var rx0 = m.x + ins, rx1 = m.x + m.w - ins, ry0 = m.y + (bar ? bar.offsetHeight : 13 * sc) + ins, ry1 = m.y + m.h - ins - sw / 2;
    var pad = card.children[1], lab = pad && pad.children[4];
    if (lab) { var lp = rel(lab, win); ry1 = Math.min(ry1, lp.y - 5 * sc - sw / 2); }
    var n = Math.max(2, Math.round((ry1 - ry0) / (sw * 0.85))), rowH = (ry1 - ry0) / n, xa = rx0 + sw / 2, xb = rx1 - sw / 2, pts = [], r, y;
    for (r = 0; r < n; r++) { y = ry0 + rowH * (r + 0.5); if (r % 2 === 0) pts.push([xa, y], [xb, y]); else pts.push([xb, y], [xa, y]); }
    var tHead = 3.6, rest = [cx + 16 * sc, 10 * sc], spd = 95 * sc;
    var tl = [[0, rest[0], rest[1]], [tHead, rest[0], rest[1]]], t = tHead + 0.2, prev = rest, i, k;
    var segs = [], L = 0;
    for (i = 0; i < pts.length - 1; i++) { var d = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); segs.push([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], L, d]); L += d; }
    function at(u) {
      var tt = u * L, s, j;
      for (j = 0; j < segs.length; j++) { s = segs[j]; if (tt <= s[4] + s[5] + 1e-9) { var q = s[5] === 0 ? 0 : (tt - s[4]) / s[5]; return [s[0] + (s[2] - s[0]) * q, s[1] + (s[3] - s[1]) * q]; } }
      return [segs[segs.length - 1][2], segs[segs.length - 1][3]];
    }
    var s0 = pts[0], t0 = t + 0.35 + Math.hypot(s0[0] - prev[0], s0[1] - prev[1]) / (spd * 5);
    tl.push([t0, s0[0], s0[1]]);
    var dur = Math.max(0.5, L / spd), N = Math.max(6, Math.floor(dur * 12));
    for (k = 1; k <= N; k++) { var p = at(k / N); tl.push([t0 + dur * k / N, p[0], p[1]]); }
    var t1 = t0 + dur, tLast = t1 + 0.15, T = tLast + 4.8, tFade = tLast + 3.4;
    tl.push([tLast + 0.3, rest[0], rest[1]]); tl.push([T, rest[0], rest[1]]);
    var ded = [];
    tl.forEach(function (e) { if (ded.length && e[0] <= ded[ded.length - 1][0] + 1e-4) e = [ded[ded.length - 1][0] + 1e-3, e[1], e[2]]; ded.push(e); });
    // densify so the straight arm tracks the paw during long moves
    var dense = [];
    ded.forEach(function (e, j) {
      if (j) { var a = ded[j - 1], steps = Math.ceil((e[0] - a[0]) / 0.08); for (var z = 1; z < steps; z++) { var u = z / steps; dense.push([a[0] + (e[0] - a[0]) * u, a[1] + (e[1] - a[1]) * u, a[2] + (e[2] - a[2]) * u]); } }
      dense.push(e);
    });
    var Lh = 13 * sc, S = [], lastAng = null;
    dense.forEach(function (e) {
      var dx = e[1] - shx, dy = e[2] - shy, len = Math.hypot(dx, dy) || 1, ang = Math.atan2(dy, dx) * 180 / Math.PI;
      if (lastAng !== null) { while (ang - lastAng > 180) ang -= 360; while (ang - lastAng < -180) ang += 360; }
      lastAng = ang; S.push([e[0], e[1], e[2], ang, Math.max(0.5, len - Lh)]);
    });
    var hide = 24 * sc, top = 14 * sc + 6;
    var css = 'svg.abl,svg.abl *{animation:none!important}.abpaint{fill:none;stroke:#FFD21F;stroke-linecap:round;stroke-linejoin:round}.abarm{stroke:currentColor;stroke-width:' + f(4 * sc) + 'px;stroke-linecap:round}';
    var el = document.createElement('style'); el.id = 'abcss'; el.textContent = css; root.appendChild(el);
    var vb = '0 ' + f(-top) + ' ' + f(W) + ' ' + f(H + top);
    function sv(z, extra, inner, cls) { return '<svg aria-hidden="true" class="abl ' + (cls || '') + '" viewBox="' + vb + '" style="position:absolute;left:' + f(win.offsetLeft) + 'px;top:' + f(win.offsetTop - top) + 'px;margin-top:0;width:' + f(W) + 'px;height:' + f(H + top) + 'px;pointer-events:none;z-index:' + z + ';overflow:visible;color:#111;' + (extra || '') + '">' + inner + '</svg>'; }
    var rr = 11 * sc, WH = ' style="fill:#fff"';
    var head = '<defs><clipPath id="abclip"><rect x="-80" y="' + f(-top - 80) + '" width="' + f(W + 160) + '" height="' + f(top + 80) + '"/></clipPath></defs><g clip-path="url(#abclip)"><g class="abhead"><g class="abbob">' +
      '<path d="M' + f(cx - rr * .95) + ' ' + f(cy - rr * .3) + 'L' + f(cx - rr * .9) + ' ' + f(cy - rr * 1.55) + 'L' + f(cx - rr * .25) + ' ' + f(cy - rr * .95) + 'ZM' + f(cx + rr * .95) + ' ' + f(cy - rr * .3) + 'L' + f(cx + rr * .9) + ' ' + f(cy - rr * 1.55) + 'L' + f(cx + rr * .25) + ' ' + f(cy - rr * .95) + 'Z" fill="currentColor"/>' +
      '<circle cx="' + f(cx) + '" cy="' + f(cy) + '" r="' + f(rr) + '" fill="currentColor"/><g class="abeye"><circle cx="' + f(cx - rr * .4) + '" cy="' + f(cy - rr * .15) + '" r="' + f(rr * .26) + '"' + WH + '/><circle cx="' + f(cx + rr * .4) + '" cy="' + f(cy - rr * .15) + '" r="' + f(rr * .26) + '"' + WH + '/>' +
      '<circle cx="' + f(cx - rr * .36) + '" cy="' + f(cy - rr * .08) + '" r="' + f(rr * .13) + '" fill="currentColor"/><circle cx="' + f(cx + rr * .44) + '" cy="' + f(cy - rr * .08) + '" r="' + f(rr * .13) + '" fill="currentColor"/></g>' +
      '<path d="M' + f(cx - rr * .12) + ' ' + f(cy + rr * .22) + 'h' + f(rr * .24) + 'l' + f(-rr * .12) + ' ' + f(rr * .14) + 'z"' + WH + '/>' +
      '<path d="M' + f(cx - rr) + ' ' + f(cy + rr * .1) + 'l' + f(-rr * .45) + ' ' + f(-rr * .08) + 'M' + f(cx - rr) + ' ' + f(cy + rr * .3) + 'l' + f(-rr * .45) + ' ' + f(rr * .06) + 'M' + f(cx + rr) + ' ' + f(cy + rr * .1) + 'l' + f(rr * .45) + ' ' + f(-rr * .08) + 'M' + f(cx + rr) + ' ' + f(cy + rr * .3) + 'l' + f(rr * .45) + ' ' + f(rr * .06) + '" stroke="currentColor" stroke-width="' + f(.8 * sc) + '" stroke-linecap="round" fill="none"/></g></g></g>';
    var pth = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]) + pts.slice(1).map(function (q) { return 'L' + f(q[0]) + ' ' + f(q[1]); }).join('');
    var paint = '<path class="abpaint" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:1;opacity:0;stroke-width:' + f(sw) + 'px" d="' + pth + '"/>';
    var brush = '<g class="abbrush"><path d="M' + f(-5.5 * sc) + ' 0L' + f(-Lh) + ' 0" stroke="currentColor" stroke-width="' + f(2.6 * sc) + '" stroke-linecap="round"/>' +
      '<path d="M' + f(2 * sc) + ' 0Q' + f(0.4 * sc) + ' ' + f(-3.4 * sc) + ' ' + f(-4 * sc) + ' ' + f(-3 * sc) + 'L' + f(-4 * sc) + ' ' + f(3 * sc) + 'Q' + f(0.4 * sc) + ' ' + f(3.4 * sc) + ' ' + f(2 * sc) + ' 0Z" fill="#FFD21F" stroke="currentColor" stroke-width="' + f(.8 * sc) + '" stroke-linejoin="round"/>' +
      '<rect x="' + f(-6.6 * sc) + '" y="' + f(-2.6 * sc) + '" width="' + f(3 * sc) + '" height="' + f(5.2 * sc) + '" rx="' + f(.6 * sc) + '" fill="currentColor"/>' +
      '<circle cx="' + f(-Lh) + '" cy="0" r="' + f(2.9 * sc) + '" fill="currentColor"/></g>';
    var tool = '<g class="abtool"><line class="abarm" x1="0" y1="0" x2="1" y2="0"/>' + brush + '</g>';
    win.insertAdjacentHTML('beforebegin', sv(0, '', head) + sv(5, 'mix-blend-mode:multiply', paint, 'abpt') + sv(6, '', tool));
    // one clock drives arm, brush, paint and head together (plain SVG attributes: same result in Chrome, Firefox and Safari)
    var g = function (c) { return root.querySelector(c); };
    var eHead = g('.abhead'), eBob = g('.abbob'), eEye = g('.abeye'), eTool = g('.abtool'), eArm = g('.abarm'), eBr = g('.abbrush'), ePaint = g('.abpaint');
    var eyeY = cy - rr * 0.15, t00 = null, ptr = 0;
    function ease(u, a) { return a ? u * u * (3 - 2 * u) : 1 - Math.pow(1 - u, 3); }
    function render(t) {
      var hy, op = 0, po = 0, pd = 1;
      if (t < tHead) hy = hide * (1 - ease(Math.max(0, t / tHead), 0)); else if (t <= tLast + 1.0) hy = 0; else if (t <= tLast + 3.2) hy = hide * ease((t - tLast - 1.0) / 2.2, 1); else hy = hide;
      eHead.setAttribute('transform', 'translate(0 ' + hy.toFixed(2) + ')');
      eBob.setAttribute('transform', 'translate(0 ' + (-1.2 * sc * (0.5 - 0.5 * Math.cos(t / 3.2 * 2 * Math.PI))).toFixed(2) + ')');
      var bp = (t % 5) / 5, sy = (bp > 0.92 && bp < 0.98) ? 0.1 : 1;
      eEye.setAttribute('transform', 'translate(' + f(cx) + ' ' + f(eyeY) + ') scale(1 ' + sy + ') translate(' + f(-cx) + ' ' + f(-eyeY) + ')');
      if (t < tHead - 0.5) op = 0; else if (t < tHead - 0.3) op = (t - tHead + 0.5) / 0.2; else if (t <= tLast + 0.35) op = 1; else if (t < tLast + 0.9) op = 1 - (t - tLast - 0.35) / 0.55; else op = 0;
      eTool.style.setProperty('opacity', op.toFixed(3), 'important');
      if (t <= t0) { pd = 1; po = 0; } else if (t < t1) { pd = 1 - (t - t0) / (t1 - t0); po = 1; } else if (t <= tFade) { pd = 0; po = 1; } else if (t < tFade + 1.2) { pd = 0; po = 1 - (t - tFade) / 1.2; } else { pd = 1; po = 0; }
      ePaint.style.setProperty('stroke-dashoffset', pd.toFixed(4), 'important'); ePaint.style.setProperty('opacity', po.toFixed(3), 'important');
      if (op > 0) {
        if (ptr >= S.length - 1 || S[ptr][0] > t) ptr = 0;
        while (ptr < S.length - 2 && S[ptr + 1][0] <= t) ptr++;
        var a = S[ptr], b = S[Math.min(ptr + 1, S.length - 1)], u = b[0] > a[0] ? Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0]))) : 0;
        var x = a[1] + (b[1] - a[1]) * u, y = a[2] + (b[2] - a[2]) * u, an = a[3] + (b[3] - a[3]) * u, al = a[4] + (b[4] - a[4]) * u;
        eBr.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + an.toFixed(2) + ')');
        eArm.setAttribute('transform', 'translate(' + f(shx) + ' ' + f(shy) + ') rotate(' + an.toFixed(2) + ')'); eArm.setAttribute('x2', al.toFixed(2));
      }
    }
    function frame(now) {
      if (!eHead.isConnected) return;
      if (host.classList.contains('off')) { requestAnimationFrame(frame); return; }
      if (!host.classList.contains('go')) { t00 = null; render(0); } else { if (t00 === null) t00 = now; render(((now - t00) / 1000) % T); }
      requestAnimationFrame(frame);
    }
    render(0); requestAnimationFrame(frame);

  }

  function aboutAll() { hosts.forEach(function (h) { try { if (h.id === 'about') aboutCat(h); } catch (e) { /* ignore */ } }); }
  function mount() {
    mode = 'd'; curKind = kind();
    var list = isMob() ? MOB : DESK;
    if (io) io.disconnect();
    app.innerHTML = ''; hosts = [];
    list.forEach(function (p) {
      var h = document.createElement('section'); h.className = 'bd'; h.id = p[0]; h.setAttribute('data-board', p[1]);
      h.attachShadow({ mode: 'open' }); hosts.push(h);
      app.appendChild(h);
      fill(h);
      if (theme === 'dark') h.classList.add('dark');
      h.shadowRoot.addEventListener('click', onClick);
    });
    buildHdr(); layout();
    document.body.style.overflow = mode === 'm' ? 'hidden' : '';
    curId = null;
    if (mode === 'm') { showNow(location.hash.length > 1 && document.getElementById(location.hash.slice(1)) ? location.hash.slice(1) : 'home'); buildMenu(); return; }
    io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var t = e.target, seen = e.isIntersecting && (e.intersectionRatio >= 0.3 || e.intersectionRect.height >= window.innerHeight * 0.35);
        if (!seen || navBusy) return;
        t._done = true; t.classList.add('go'); io.unobserve(t);
      });
    }, { threshold: [0, 0.1, 0.3, 0.6] }) : null;
    hosts.forEach(function (h) { if (io) io.observe(h); else h.classList.add('go'); });
    if (ioOff) { ioOff.disconnect(); ioOff = null; }
    if ('IntersectionObserver' in window) { ioOff = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('off', !e.isIntersecting); }); }, { rootMargin: '150px 0px' }); hosts.forEach(function (h) { ioOff.observe(h); }); }
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
    fixLinks(h.shadowRoot); if (lang === 'ar' && window.__i18n) window.__i18n(h.shadowRoot, true);
    if (theme === 'dark') h.classList.add('dark');
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

  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path>', SUN = '<circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"></path>';
  function themeSync(root) {
    if (!root || !root.querySelectorAll) return;
    var as = root.querySelectorAll('a[data-theme],a[aria-label="Dark mode"],a[aria-label="Light mode"]'), i, sv, d = theme === 'dark';
    for (i = 0; i < as.length; i++) {
      sv = as[i].querySelector('svg');
      if (sv) sv.innerHTML = d ? SUN : MOON;
      as[i].setAttribute('aria-label', d ? 'Light mode' : 'Dark mode'); as[i].setAttribute('title', d ? (lang === 'ar' ? 'الوضع الفاتح' : 'Light mode') : (lang === 'ar' ? 'الوضع الداكن' : 'Dark mode'));
    }
  }
  function setTheme(t) {
    theme = t; document.documentElement.setAttribute('data-theme', t);
    try { sessionStorage.setItem('theme', t); } catch (e) { /* ignore */ }
    hosts.forEach(function (h) { h.classList.toggle('dark', t === 'dark'); }); if (hdrEl) hdrEl.classList.toggle('dark', t === 'dark'); if (hdrEl) hdrEl.classList.toggle('dark', t === 'dark');
    if (menuEl.firstChild) menuEl.firstChild.classList.toggle('dark', t === 'dark');
    themeSync(document); hosts.forEach(function (h) { themeSync(h.shadowRoot); }); if (hdrEl) themeSync(hdrEl.shadowRoot); if (menuEl.firstChild) themeSync(menuEl.firstChild.shadowRoot);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'dark' ? '#141414' : '#ffffff');
  }
  function setLang(l) {
    lang = l; try { localStorage.setItem('lang', l); } catch (e) { /* ignore */ }
    document.documentElement.lang = l; document.documentElement.dir = 'ltr';
    hosts.forEach(function (h) { fill(h); }); buildHdr(); requestAnimationFrame(aboutAll); setTimeout(aboutAll, 400);
    if (isMob()) buildMenu();
    setTitle();
  }
  function setTitle() { document.title = lang === 'ar' ? 'رناد — مهندسة حاسب · مطورة برمجيات · مصممة UI/UX' : 'Renad — Computer Engineer · Software Developer · UI/UX Designer'; }
  function download() { var a = document.createElement('a'); a.href = CV; a.download = 'Renad_Aladwani_Resume.pdf'; document.body.appendChild(a); a.click(); document.body.removeChild(a); }

  function fixLinks(root) {
    var as = root.querySelectorAll('a'), i, a, href, lab, txt, k;
    for (i = 0; i < as.length; i++) {
      a = as[i]; href = a.getAttribute('href') || ''; lab = (a.getAttribute('aria-label') || '').toLowerCase(); txt = a.textContent.trim();
      if (a.getAttribute('target') === '_blank') { a.setAttribute('rel', 'noopener noreferrer'); continue; }
      if (href && href.charAt(0) !== '#') continue;
      if (/\bcv\b/i.test(txt) || /cv/i.test(lab)) { a.setAttribute('href', CV); a.setAttribute('download', 'Renad_Aladwani_Resume.pdf'); continue; }
      if (lab.indexOf('arabic') === 0 || lab.indexOf('dark') === 0 || lab.indexOf('light') === 0 || lab === 'menu' || lab === 'close' || a.hasAttribute('data-grp')) { a.setAttribute('role', 'button'); continue; }
      k = key(txt);
      if (k) a.setAttribute('href', '#' + k);
      else if (/^renad$/i.test(txt)) a.setAttribute('href', '#home');
    }
    var ccs = Array.prototype.filter.call(root.querySelectorAll('.w'), function (w) { return w.querySelectorAll('img[alt^="Certificate"]').length === 1; }); for (i = 0; i < ccs.length; i++) { (function (c) { var im = c.querySelector('img[alt^="Certificate"]'); if (!im) return; c.setAttribute('tabindex', '0'); c.setAttribute('role', 'button'); c.setAttribute('aria-label', (lang === 'ar' ? 'عرض الشهادة: ' : 'View certificate: ') + String(im.alt || '').replace(/^Certificate\s*[—-]\s*/i, '')); c.style.cursor = 'zoom-in'; c.onkeydown = function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); openCert(im.currentSrc || im.src, im.alt); } }; })(ccs[i]); }
    themeSync(root);
  }
  var lbEl = null;
  function certCard(el) { var w = el.closest('.w'); while (w) { var ims = w.querySelectorAll('img[alt^="Certificate"]'); if (ims.length === 1) return w; if (ims.length > 1) return null; w = w.parentNode && w.parentNode.closest ? w.parentNode.closest('.w') : null; } return null; }
  function closeCert() { if (!lbEl) return; var n = lbEl; lbEl = null; n.classList.remove('on'); setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 200); document.body.style.overflow = ''; }
  function openCert(src, alt) {
    if (lbEl) return; var n = document.createElement('div'); n.className = 'lb'; n.setAttribute('role', 'dialog'); n.setAttribute('aria-modal', 'true');
    var cap = String(alt || '').replace(/^Certificate\s*[—-]\s*/i, '');
    var im = document.createElement('img'); im.src = src; im.alt = alt || '';
    var x = document.createElement('button'); x.type = 'button'; x.className = 'lb-x'; x.setAttribute('aria-label', lang === 'ar' ? 'إغلاق' : 'Close'); x.textContent = '×';
    var c = document.createElement('div'); c.className = 'lb-c'; c.textContent = cap;
    n.appendChild(im); n.appendChild(x); if (cap) n.appendChild(c);
    n.addEventListener('click', closeCert); document.body.appendChild(n); lbEl = n; document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { n.classList.add('on'); }); x.focus();
  }
  function onClick(e) {
    var t = e.target; if (!t.closest) return;
    var cc = certCard(t); if (cc) { var ci = cc.querySelector('img[alt^="Certificate"]'); if (ci) { e.preventDefault(); openCert(ci.currentSrc || ci.src, ci.alt); return; } }
    var row = t.closest('.cr');
    if (row) { var rows = row.parentNode.querySelectorAll('.cr'), i = Array.prototype.indexOf.call(rows, row); if (PROJ[i]) { e.preventDefault(); go(PROJ[i]); return; } }
    var a = t.closest('a');
    if (!a) { var pl = t.closest('.pill'); if (pl && /^renad$/i.test(pl.textContent.trim())) { go('home'); } return; }
    var href = a.getAttribute('href') || '', lab = (a.getAttribute('aria-label') || '').toLowerCase(), txt = a.textContent.trim();
    if (href.charAt(0) !== '#' && href) return;
    e.preventDefault();
    if (a.hasAttribute('data-lang') || lab.indexOf('arabic') === 0) { setLang(lang === 'ar' ? 'en' : 'ar'); return; }
    if (a.hasAttribute('data-theme') || lab.indexOf('dark') === 0 || lab.indexOf('light') === 0) { setTheme(theme === 'dark' ? 'light' : 'dark'); return; }
    if (a.hasAttribute('data-cv') || /\bcv\b/i.test(txt) || /cv/i.test(lab)) { download(); return; }
    if (a.hasAttribute('data-grp') || lab === 'menu') { openMenu(); return; }
    var k = key(txt); if (k) { go(k); return; }
    if (/^renad$/i.test(txt)) { go('home'); return; }
  }

  function prep(el) { if (el._done || el.classList.contains('go')) return; el.classList.remove('go'); fill(el); }
  function start(el) { void el.offsetWidth; el._done = true; el.classList.add('go'); }
  function replay(el) {
    if (el._done) return; el.classList.remove('go'); fill(el); void el.offsetWidth; el.classList.add('go');
  }
  function go(id, instant) {
    var el = document.getElementById(id); if (!el) return;
    if (mode === 'm') { goMobile(id, instant); return; }
    var target = Math.max(0, el.getBoundingClientRect().top + (window.scrollY || 0) - (isMob() && hdrEl ? hdrEl.getBoundingClientRect().height : 0));
    try { history.replaceState(null, '', '#' + id); } catch (x) { /* ignore */ }
    if (reduce || busy || instant) { window.scrollTo(0, target); return; }
    busy = true; navBusy = true; el._left = false; prep(el);
    var y0 = window.scrollY || 0, dist = target - y0, t0 = null, dur = Math.min(1100, 520 + Math.abs(dist) * 0.12);
    function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function step(ts) {
      if (t0 === null) t0 = ts; var p = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, y0 + dist * ease(p));
      if (p < 1) requestAnimationFrame(step); else { busy = false; navBusy = false; start(el); }
    }
    requestAnimationFrame(step);
  }
  function wrapOf(id) { return app.querySelector('.pgwrap[data-id="' + id + '"]'); }
  function order(id) { for (var i = 0; i < MOB.length; i++) { if (MOB[i][0] === id) return i; } return 0; }
  function showNow(id, late) { var w = wrapOf(id); if (!w) return; Array.prototype.forEach.call(app.querySelectorAll('.pgwrap'), function (x) { x.classList.remove('cur'); }); w.classList.add('cur'); w.scrollTop = 0; curId = id; if (late) { prep(document.getElementById(id)); } else { replay(document.getElementById(id)); } try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ } }
  function goMobile(id, instant, slideDir, axis) {
    if (id === curId || busy) return;
    var cur = wrapOf(curId), next = wrapOf(id);
    if (!next) return;
    if (reduce || instant || !cur) { showNow(id); return; }
    busy = true;
    var el = document.getElementById(id);
    if (slideDir) {
      var T = axis === 'y' ? 'translateY' : 'translateX';
      next.style.transition = 'none'; next.style.transform = T + '(' + (slideDir * 100) + '%)'; next.classList.add('cur'); next.scrollTop = 0; curId = id;
      prep(el);
      void next.offsetWidth;
      var tr = 'transform .5s cubic-bezier(.16,1,.3,1)'; next.style.transition = tr; cur.style.transition = tr; next.style.transform = 'none'; cur.style.transform = T + '(' + (-slideDir * 40) + '%)';
      try { history.replaceState(null, '', '#' + id); } catch (e) { /* ignore */ }
      setTimeout(function () { start(el); }, 220);
      setTimeout(function () { if (cur !== next) cur.classList.remove('cur'); cur.style.transform = ''; cur.style.transition = ''; next.style.transition = ''; busy = false; }, 520);
      return;
    }
    var down = order(id) >= order(curId);
    wipe.classList.remove('off', 'fromtop'); wipe.classList.toggle('fromtop', !down); void wipe.offsetWidth; wipe.classList.add('on');
    setTimeout(function () {
      cur.classList.remove('cur'); showNow(id, true); wipe.classList.remove('on'); wipe.classList.add('off');
      setTimeout(function () { start(el); }, 260);
      setTimeout(function () { wipe.classList.remove('off', 'fromtop'); busy = false; }, 620);
    }, 500);
  }
  function stepPage(dir, axis) {
    var i = order(curId) + dir; if (i < 0 || i >= MOB.length) return;
    goMobile(MOB[i][0], false, dir, axis);
  }
  function edge() { var w = wrapOf(curId); if (!w) return { t: true, b: true }; return { t: w.scrollTop <= 1, b: w.scrollTop + w.clientHeight >= w.scrollHeight - 2 }; }

  var lastScroll = 0; app.addEventListener('scroll', function () { lastScroll = Date.now(); }, true);
  var tx = 0, ty = 0, tt0 = 0, e0 = null;
  app.addEventListener('touchstart', function (e) { var t = e.touches[0]; tx = t.clientX; ty = t.clientY; tt0 = Date.now(); e0 = edge(); e0.calm = (tt0 - lastScroll) > 450; }, { passive: true });
  app.addEventListener('touchend', function (e) {
    if (mode !== 'm' || busy) return; var t = e.changedTouches[0], dx = t.clientX - tx, dy = t.clientY - ty, e1 = edge();
    if (Date.now() - tt0 > 900) return;
    if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx) * 1.4 && e0 && e0.calm) {
      if (dy < 0 && e0.b && e1.b) stepPage(1, 'y');
      else if (dy > 0 && e0.t && e1.t) stepPage(-1, 'y');
    }
  }, { passive: true });
  var wacc = 0, wlast = 0;
  window.addEventListener('wheel', function (e) {
    if (mode !== 'm' || busy || lbEl) return; var now = Date.now(); if (now - lastScroll < 500) { wacc = 0; wlast = now; return; } if (now - wlast > 250) wacc = 0; wlast = now; wacc += e.deltaY;
    var g = edge();
    if (wacc > 160 && g.b) { wacc = 0; stepPage(1, 'y'); } else if (wacc < -160 && g.t) { wacc = 0; stepPage(-1, 'y'); }
  }, { passive: true });
  window.addEventListener('keydown', function (e) {
    if (lbEl) { if (e.key === 'Escape') closeCert(); return; }
    if (mode !== 'm' || busy || Date.now() - lastScroll < 500) return; var g = edge();
    if ((e.key === 'ArrowDown' || e.key === 'PageDown') && g.b) stepPage(1, 'y'); else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && g.t) stepPage(-1, 'y');
  });
  document.querySelector('[data-top]').addEventListener('click', function (e) { e.preventDefault(); go('home'); });
  window.addEventListener('scroll', function () { markNav(); var tt = document.querySelector('.totop'); tt.classList.toggle('show', (window.scrollY || 0) > 700); markNav(); }, { passive: true });
  // portrait <-> landscape: switch layouts and stay on the same section
  function reflow() {
    if (kind() === curKind) { layout(); return; }
    var keep = '', i, r; for (i = 0; i < hosts.length; i++) { r = hosts[i].getBoundingClientRect(); if (r.top <= 90 && r.bottom > 90) { keep = hosts[i].id; break; } }
    closeMenu(); mount(); if (lang === 'ar') document.documentElement.lang = 'ar';
    if (keep) { var el = document.getElementById(keep); if (el) window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + (window.scrollY || 0) - (isMob() && hdrEl ? hdrEl.getBoundingClientRect().height : 0))); }
  }
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(reflow, 120);
  });
  window.addEventListener('orientationchange', function () { clearTimeout(rt); [60, 250, 600, 1200].forEach(function (d) { setTimeout(reflow, d); }); });
  if (window.visualViewport) window.visualViewport.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(reflow, 150); });
  if (window.matchMedia) { var oq = window.matchMedia('(orientation: landscape)'); var onq = function () { [60, 300, 800].forEach(function (d) { setTimeout(reflow, d); }); }; if (oq.addEventListener) oq.addEventListener('change', onq); else if (oq.addListener) oq.addListener(onq); }
  window.__go = go; window.__lang = function () { return lang; };
  setTitle();
  function splash(done) {
    var seen = false; try { seen = sessionStorage.getItem('splash') === '1'; } catch (e) { /* ignore */ }
    if (seen || reduce) { done(); return; }
    var ar = lang === 'ar', s = document.createElement('div'); s.className = 'splash';
    var star = '<svg class="sp-st" width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C13 8 16 11 24 12 16 13 13 16 12 24 11 16 8 13 0 12 8 11 11 8 12 0Z" fill="currentColor"/></svg>';
    s.innerHTML = '<div class="sp-win"><div class="sp-b"><span>– ×</span><span>•••</span></div><div class="sp-in"><span class="sp-pill">' + (ar ? 'أهلاً بك!' : 'Welcome!') + '</span><div class="sp-h">RENAD</div><div class="sp-s">' + (ar ? 'ملف أعمالي · 2026' : 'Portfolio · 2026') + '</div><div class="sp-bar"><i></i></div><div class="sp-hint">' + (ar ? 'مهندسة حاسب · مطورة برمجيات · مصممة UI/UX' : 'Computer Engineer · Software Developer · UI/UX Designer') + '</div></div></div>' +
      '<span class="sp-s1">' + star + '</span><span class="sp-s2">' + star + '</span><span class="sp-skip">' + (ar ? 'اضغط للتخطي' : 'tap to skip') + '</span>';
    document.body.appendChild(s); document.documentElement.classList.add('splashing');
    var over = false;
    function end() { if (over) return; over = true; s.classList.add('out'); done(); setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); document.documentElement.classList.remove('splashing'); try { sessionStorage.setItem('splash', '1'); } catch (e) { /* ignore */ } }, 760); }
    setTimeout(end, 3000); s.addEventListener('click', end);
  }
  if (lang === 'ar') document.documentElement.lang = 'ar';
  window.addEventListener('hashchange', function () { var id = location.hash.slice(1); if (id && document.getElementById(id) && id !== curId) go(id); });
  splash(function () { mount(); if (mode === 'd' && location.hash.length > 1) setTimeout(function () { go(location.hash.slice(1), true); }, 60); });
})();
