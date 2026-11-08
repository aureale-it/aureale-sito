/* AUREALE – icone di contatto (Chiamami / Scrivimi) e chat automatica con poche risposte.
   Nessun servizio esterno, nessun cookie, nessun dato inviato: le risposte sono scritte qui sotto.
   Per modificare una risposta basta cambiare il testo nella lista BRANCH. */
(function () {
  "use strict";
  var TEL = "393922504898";
  function wa(msg) { return "https://wa.me/" + TEL + "?text=" + encodeURIComponent(msg); }

  var CONS = "La consulenza è gratuita e si svolge di persona a Roma, zona Flaminio, su appuntamento: osservo la cute, ascolto cosa desideri e ti dico con realismo cosa è possibile ottenere. Per una prima idea puoi anche inviarmi delle foto su WhatsApp (di fronte, di retro e laterali, in HD): ti rispondo personalmente.";
  var BRANCH = {
    trico: {
      label: "Tricopigmentazione",
      intro: "Perfetto. Scegli la tua domanda sulla tricopigmentazione:",
      items: [
        { q: "Quanto durano le sedute?", a: "Dipende dall'area da trattare: da circa un'ora fino a 3-4 ore se si tratta tutto il cuoio capelluto. Nel mio protocollo di solito servono 3-4 sedute (una in più, se serve, è compresa), a distanza di almeno 7 giorni l'una dall'altra: il resto si stabilisce in base alle tue esigenze e ai tuoi impegni, ma non prima dei 7 giorni. Nel mio protocollo, dopo circa 30-40 giorni c'è un controllo; poi un ritocco ogni anno, un anno e mezzo (dipende dalla pelle) mantiene il risultato nel tempo.", w: "Buongiorno, vorrei informazioni sul percorso di tricopigmentazione." },
        { q: "Ho cicatrici da trapianto: cosa posso fare?", a: "Le cicatrici FUT e FUE si possono mimetizzare con microdepositi di pigmento, quando la zona è guarita e il trapianto si è stabilizzato. Non si cancella la cicatrice: se ne riduce la visibilità, e il risultato dipende dal tipo e dall'età della cicatrice. Il lavoro è progressivo, preceduto da una valutazione e da un test.", w: "Buongiorno, ho una cicatrice da trapianto e vorrei una valutazione. Invio una foto.", link: ["Leggi la pagina sulle cicatrici", "tricopigmentazione-cicatrici-trapianto.html"] },
        { q: "Posso prenotare una consulenza o inviare foto?", a: CONS, w: "Buongiorno, vorrei prenotare una consulenza gratuita. Invio alcune foto." },
        { q: "Quanto costa?", a: "Il costo dipende dalla densità dei capelli presenti e dalle zone da trattare, quindi si definisce dopo la consulenza, gratuita e di persona. Se mi scrivi su WhatsApp con qualche foto, ti rispondo personalmente e ti dico se è fattibile e come procedere.", w: "Buongiorno, vorrei un'indicazione sul costo. Invio alcune foto." }
      ]
    },
    dermo: {
      label: "Dermopigmentazione",
      intro: "Perfetto. Scegli la tua domanda sulla dermopigmentazione:",
      items: [
        { q: "Che trattamenti ci sono per le sopracciglia?", a: "Fusion Brows: tratti a effetto pelo uniti a una sfumatura, indicato per forme irregolari o con pochi peli. Line Brows: effetto pelo, con tratti sottili che seguono la crescita naturale. Dust Brows: effetto sfumato, simile a un ombretto, con intensità modulabile. Il disegno si pensa sui lineamenti del viso.", w: "Buongiorno, vorrei informazioni sul trattamento sopracciglia." },
        { q: "E per labbra e occhi?", a: "Labbra: Velvet Lips (colore omogeneo su tutto il labbro), Bloom Lips (contorno definito e colore che sfuma verso l'interno), Soft Lips (colore delicato, simile a un burrocacao). Occhi: Soft Liner (tratto infracigliare con una piccola sfumatura) e Lash Frame (tratto molto sottile alla base delle ciglia, discreto).", w: "Buongiorno, vorrei informazioni sul trattamento labbra / occhi." },
        { q: "Quante sedute servono?", a: "Di solito due: la prima seduta e, dopo circa 40 giorni, la seconda per rifinire e completare il risultato. Poi un ritocco una volta all'anno, un anno e mezzo (dipende dalla pelle) mantiene il risultato nel tempo.", w: "Buongiorno, vorrei informazioni sul percorso di dermopigmentazione." },
        { q: "Posso prenotare una consulenza gratuita?", a: CONS, w: "Buongiorno, vorrei prenotare una consulenza gratuita per la dermopigmentazione." }
      ]
    }
  };
  var GENERIC = "Buongiorno, ho letto il sito e vorrei parlare direttamente con te.";
  var DIRECT = "Per qualsiasi altra domanda scrivimi su WhatsApp: ti rispondo personalmente appena sono libera.";
  var WELCOME = "Benvenuto! Scrivimi pure tutto quello di cui hai bisogno: ti rispondo appena possibile. Se non rispondo subito è perché sto effettuando un trattamento.";

  var css = "\
#wac-b{position:fixed;right:calc(max(14px,env(safe-area-inset-right)) + 80px);bottom:max(14px,env(safe-area-inset-bottom));z-index:2147483000;font-family:Montserrat,system-ui,sans-serif}\
#wac-fab{display:flex;flex-direction:column;align-items:center;gap:5px;width:68px;background:none;border:0;padding:0;cursor:pointer;color:inherit}\
#wac-fab.dkb{position:static;right:auto;bottom:auto;z-index:auto}\
@media(min-width:861px){#wac-b{right:calc(max(20px,env(safe-area-inset-right)) + 88px)}#wac-fab{width:76px}#wac-p{right:-88px}}\
#wac-fab:focus-visible,.wac-chip:focus-visible,#wac-x:focus-visible,.wac-cta:focus-visible{outline:3px solid #D4B070;outline-offset:3px;border-radius:12px}\
#wac-tip{position:absolute;right:-8px;bottom:calc(100% + 10px);background:#161617;color:#ECE8E0;border:1px solid #B8924F;border-radius:14px 14px 4px 14px;padding:.5rem .8rem;font-size:.8rem;font-weight:600;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.4);cursor:pointer;transition:opacity .5s;animation:wacin .4s}\
#wac-tip[hidden]{display:none}\
@keyframes wacin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\
#wac-p{position:absolute;right:-80px;bottom:calc(100% + 10px);width:min(370px,calc(100vw - 28px));height:min(540px,calc(100vh - 150px));display:flex;flex-direction:column;background:#0F0F10;color:#ECE8E0;border:1px solid #B8924F;border-radius:16px;overflow:hidden;box-shadow:0 14px 44px rgba(0,0,0,.6);animation:wacin .25s}\
#wac-p[hidden]{display:none}\
#wac-h{display:flex;align-items:center;gap:.7rem;padding:.7rem .85rem;background:#161617;border-bottom:1px solid #2A2B2E}\
#wac-h img{width:34px;height:auto;flex:none}\
#wac-h b{display:block;font-size:.95rem;letter-spacing:.04em}\
#wac-h small{display:block;color:#A9A59C;font-size:.68rem;margin-top:.1rem}\
#wac-x{margin-left:auto;background:none;border:0;color:#ECE8E0;font-size:1.6rem;line-height:1;cursor:pointer;padding:.2rem .5rem}\
#wac-m{flex:1;overflow-y:auto;padding:.9rem;display:flex;flex-direction:column;gap:.55rem;scroll-behavior:smooth}\
.wac-r,.wac-u{max-width:90%;padding:.6rem .8rem;border-radius:14px;font-size:.86rem;line-height:1.5;word-wrap:break-word}\
.wac-r{align-self:flex-start;background:#1E1F21;border-top-left-radius:4px}\
.wac-u{align-self:flex-end;background:#B8924F;color:#1A1408;font-weight:600;border-top-right-radius:4px}\
.wac-dots{display:inline-flex;gap:4px;padding:.2rem 0}.wac-dots i{width:7px;height:7px;border-radius:50%;background:#A9A59C;animation:wacb 1s infinite}.wac-dots i:nth-child(2){animation-delay:.15s}.wac-dots i:nth-child(3){animation-delay:.3s}\
@keyframes wacb{0%,80%,100%{opacity:.3}40%{opacity:1}}\
.wac-ch{display:flex;flex-wrap:wrap;gap:.4rem;align-self:flex-start;max-width:96%}\
.wac-chip{background:transparent;color:#D4B070;border:1px solid #B8924F;border-radius:20px;padding:.45rem .8rem;font:inherit;font-size:.78rem;font-weight:600;cursor:pointer;text-align:left}\
.wac-chip:hover{background:#B8924F;color:#1A1408}\
.wac-lk{align-self:flex-start;color:#D4B070;font-size:.8rem;font-weight:600}\
.wac-chip-s{border-color:#4a4b4f;color:#A9A59C}\
.wac-chip-d{background:rgba(52,227,125,.14);border:1.5px solid #2fbf6a;color:#8CF5B4;font-size:.9rem;padding:.7rem 1.1rem;border-radius:24px;font-weight:700}\
.wac-chip-d:hover{background:#2fbf6a;color:#04210F}\
.wac-cta-i{align-self:stretch;width:auto}\
#wac-f{padding:.55rem .85rem;border-top:1px solid #2A2B2E;background:#161617}\
.wac-cta{display:flex;align-items:center;justify-content:center;gap:.55rem;width:100%;min-height:48px;background:linear-gradient(180deg,#34E37D,#1FB655);color:#04210F;text-decoration:none;font-weight:700;font-size:.9rem;border-radius:26px;box-shadow:0 6px 16px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.5)}\
.wac-cta svg{width:22px;height:22px;fill:#04210F}\
#wac-f small{display:block;text-align:center;color:#8d8a83;font-size:.66rem;line-height:1.4}\
@media(prefers-reduced-motion:reduce){#wac-p,#wac-tip{animation:none}.wac-dots i{animation:none}#wac-m{scroll-behavior:auto}}";

  var WAIC = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4.02 8.38 4.02 15.02c0 2.12.55 4.19 1.6 6.01L4 29l8.14-1.59a12 12 0 0 0 5.9 1.5h.01c6.63 0 12.02-5.39 12.02-12.02A12 12 0 0 0 16.04 3Zm0 21.9h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.83.94.99-4.7-.24-.38a9.9 9.9 0 1 1 9.5 5.73Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.1 8.1 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/></svg>';

  function el(tag, attrs, html) { var e = document.createElement(tag); if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]); if (html != null) e.innerHTML = html; return e; }

  function init() {
    if (document.getElementById("wac-b")) return;
    var st = el("style"); st.textContent = css; document.head.appendChild(st);
    var fbk = document.getElementById("wac-fb"); if (fbk && fbk.parentNode) fbk.parentNode.removeChild(fbk);

    var box = el("div", { id: "wac-b" });
    var tip = el("div", { id: "wac-tip", role: "button", tabindex: "0" }, "Hai una domanda? Scrivimi");
    var fab = el("button", { id: "wac-fab", type: "button", "class": "dkb wa", "aria-label": "Scrivimi su WhatsApp: risposte rapide e contatto diretto", "aria-expanded": "false", "aria-controls": "wac-p" }, '<span class="wic">' + WAIC + '</span><span class="cap">Scrivimi</span>');
    var panel = el("div", { id: "wac-p", role: "dialog", "aria-label": "Simona, tricopigmentazione a Roma: risposte rapide e WhatsApp", hidden: "" });
    panel.innerHTML =
      '<div id="wac-h"><img src="logo-v.png" alt="" width="34" height="43"><div><b>Simona</b><small>Tricopigmentazione a Roma</small></div><button id="wac-x" type="button" aria-label="Chiudi">&times;</button></div>' +
      '<div id="wac-m" role="log" aria-live="polite"></div>' +
      '<div id="wac-f"><small>Chat automatica con le risposte più comuni. Su WhatsApp ti rispondo io, personalmente.</small></div>';
    box.appendChild(panel); box.appendChild(tip); box.appendChild(fab);
    document.body.appendChild(box);

    var msgs = panel.querySelector("#wac-m"), cta = { href: "" };
    var started = false, busy = false;
    function scroll() { msgs.scrollTop = msgs.scrollHeight; }
    function bubble(cls, text) { var d = el("div", { "class": cls }); d.textContent = text; msgs.appendChild(d); scroll(); return d; }
    function chipRow(items) {
      var w = el("div", { "class": "wac-ch" });
      items.forEach(function (it) { var b = el("button", { type: "button", "class": "wac-chip" + (it.cls ? " " + it.cls : "") }); b.textContent = it.q; b.addEventListener("click", it.fn); w.appendChild(b); });
      msgs.appendChild(w); scroll();
    }
    function reply(text, after) {
      busy = true;
      var d = el("div", { "class": "wac-r" }, '<span class="wac-dots" aria-label="Sto scrivendo"><i></i><i></i><i></i></span>');
      msgs.appendChild(d); scroll();
      setTimeout(function () { d.textContent = text; scroll(); busy = false; if (after) after(); }, 550);
    }
    function mainMenu() {
      chipRow([
        { q: "Ho una domanda sulla tricopigmentazione", fn: function () { pick("trico"); } },
        { q: "Ho una domanda sulla dermopigmentazione", fn: function () { pick("dermo"); } },
        { q: "Voglio parlare direttamente con te", cls: "wac-chip-d", fn: direct }
      ]);
    }
    function branchMenu(key, skip) {
      var br = BRANCH[key], rows = [];
      br.items.forEach(function (it, i) { if (i === skip) return; rows.push({ q: it.q, fn: function () { answer(key, i); } }); });
      rows.push({ q: "Cambia argomento", cls: "wac-chip-s", fn: function () { if (busy) return; clearChips(); bubble("wac-u", "Cambia argomento"); reply("Certo. Di cosa vuoi parlare?", mainMenu); } });
      rows.push({ q: "Voglio parlare direttamente con te", cls: "wac-chip-d", fn: direct });
      chipRow(rows);
    }
    function pick(key) {
      if (busy) return; clearChips(); bubble("wac-u", "Ho una domanda sulla " + BRANCH[key].label.toLowerCase());
      reply(BRANCH[key].intro, function () { branchMenu(key, -1); });
    }
    function answer(key, i) {
      if (busy) return; var t = BRANCH[key].items[i];
      clearChips(); bubble("wac-u", t.q); cta.href = wa(t.w);
      reply(t.a, function () {
        if (t.link) { var l = el("a", { "class": "wac-lk", href: t.link[1] }); l.textContent = t.link[0] + " →"; msgs.appendChild(l); }
        reply(DIRECT, function () { branchMenu(key, i); });
      });
    }
    function direct() {
      if (busy) return; clearChips(); bubble("wac-u", "Voglio parlare direttamente con te"); cta.href = wa(GENERIC);
      reply(WELCOME, function () {
        var a = el("a", { "class": "wac-cta wac-cta-i", href: wa(GENERIC), target: "_blank", rel: "noopener" }, WAIC + "<span>Apri WhatsApp</span>");
        msgs.appendChild(a); scroll();
      });
    }
    function clearChips() { [].slice.call(msgs.querySelectorAll(".wac-ch")).forEach(function (c) { c.remove(); }); }
    function start() {
      if (started) return; started = true;
      reply("Questa è una chat automatica con le risposte alle domande più comuni. Per parlare direttamente con me puoi sempre scegliere WhatsApp: ti rispondo personalmente. Di cosa vuoi parlare?", mainMenu);
    }
    function open() { panel.hidden = false; tip.hidden = true; fab.setAttribute("aria-expanded", "true"); start(); try { sessionStorage.setItem("wac-tip", "1"); } catch (e) {} }
    function close() { panel.hidden = true; fab.setAttribute("aria-expanded", "false"); fab.focus(); }
    fab.addEventListener("click", function () { panel.hidden ? open() : close(); });
    tip.addEventListener("click", open);
    tip.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    panel.querySelector("#wac-x").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });

    tip.hidden = true;
    var seen = false; try { seen = sessionStorage.getItem("wac-tip") === "1"; } catch (e) {}
    function showTip(delay) { if (seen) return; setTimeout(function () { if (panel.hidden) { tip.hidden = false; setTimeout(function () { tip.style.opacity = "0"; setTimeout(function () { tip.hidden = true; }, 550); }, 7000); } }, delay); }
    var intro = false;
    try { intro = document.body.classList.contains("home") && sessionStorage.getItem("wac-fly") !== "1" && !matchMedia("(prefers-reduced-motion:reduce)").matches && !!box.animate; } catch (e) {}
    if (intro) {
      try { sessionStorage.setItem("wac-fly", "1"); } catch (e) {}
      box.style.opacity = "0";
      setTimeout(function () {
        var r = fab.getBoundingClientRect(), vw = window.innerWidth, vh = window.innerHeight;
        var cx = vw / 2 - (r.left + r.width / 2), cy = vh * 0.42 - (r.top + r.height / 2), sx = -(r.left + r.width / 2) - 90;
        var T = function (x, y, s, rot) { return "translate(" + x + "px," + y + "px) scale(" + s + ") rotate(" + (rot || 0) + "deg)"; };
        box.style.opacity = "";
        var a = box.animate([
          { transform: T(sx, cy, 1, -200), opacity: 1, offset: 0, easing: "cubic-bezier(.25,.8,.35,1)" },
          { transform: T(cx, cy, 1, 0), offset: .22, easing: "cubic-bezier(.2,1.5,.4,1)" },
          { transform: T(cx, cy, 2.4, 0), offset: .38, easing: "cubic-bezier(.4,0,.6,1)" },
          { transform: T(cx, cy, 2.1, 5), offset: .46 },
          { transform: T(cx, cy, 2.35, -4), offset: .54, easing: "cubic-bezier(.5,0,.3,1)" },
          { transform: T(cx, cy, 1, 0), offset: .66, easing: "cubic-bezier(.45,0,.2,1)" },
          { transform: T(cx * .35, cy * .35 - 60, 1, -4), offset: .84 },
          { transform: T(0, 0, 1, 0), offset: 1 }
        ], { duration: 3400, fill: "backwards" });
        a.onfinish = function () { showTip(250); };
      }, 2100);
    } else { showTip(3000); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();

/* Suggerimento sul menu (solo telefono, una volta per visita) */
(function () {
  "use strict";
  function run() {
    var b = document.querySelector(".bg"), m = window.matchMedia("(max-width:860px)");
    if (!b || !m.matches) return;
    try { if (sessionStorage.getItem("wac-menu") === "1") return; sessionStorage.setItem("wac-menu", "1"); } catch (e) {}
    var h = document.createElement("div"); h.id = "mh"; h.setAttribute("role", "status"); h.textContent = "Tutte le informazioni nel menu";
    var r = b.getBoundingClientRect(); h.style.top = (r.bottom + 10) + "px";
    setTimeout(function () {
      document.body.appendChild(h);
      var off = function () { h.style.opacity = "0"; setTimeout(function () { if (h.parentNode) h.parentNode.removeChild(h); }, 520); window.removeEventListener("scroll", off); };
      setTimeout(off, 6500); window.addEventListener("scroll", off, { passive: true }); b.addEventListener("click", off);
    }, 1200);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
