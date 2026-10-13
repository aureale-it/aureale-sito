/* AUREALE – assistente "Chatta con me" (risponditore automatico a domande e risposte).
   Nessun servizio esterno, nessun cookie, nessun dato inviato: le risposte sono scritte qui sotto.
   Per modificare una risposta basta cambiare il testo nella lista TOPICS. */
(function () {
  "use strict";
  var TEL = "393922504898";
  var AVATAR = "simona3.jpg";

  function wa(msg) { return "https://wa.me/" + TEL + "?text=" + encodeURIComponent(msg); }

  /* id, etichetta del pulsante, parole chiave, risposta, messaggio WhatsApp precompilato, domande collegate */
  var TOPICS = [
    { id: "prezzo", q: "Quanto costa?", k: "costo costa prezzo prezzi quanto preventivo euro tariffa spesa",
      a: "Il prezzo non si calcola sulla singola seduta, ma sul risultato da ottenere: dipende dalla densità dei capelli presenti e dalle zone da trattare. Si stabilisce un unico preventivo personalizzato per l’intero percorso, e un’eventuale seduta in più è già compresa. Per questo non posso darti una cifra online: serve la consulenza gratuita, di persona.",
      w: "Buongiorno, vorrei prenotare una consulenza gratuita per un preventivo.", n: ["consulenza", "foto", "sedute"] },
    { id: "consulenza", q: "La consulenza è gratuita?", k: "consulenza gratuita gratis appuntamento prenotare prenotazione visita valutazione",
      a: "Sì, la consulenza è gratuita e si svolge di persona: osservo la cute, ascolto cosa desideri e ti dico con realismo cosa è possibile ottenere.",
      w: "Buongiorno, vorrei prenotare una consulenza gratuita.", n: ["dove", "foto", "prezzo"] },
    { id: "foto", q: "Posso mandarti delle foto?", k: "foto fotografia immagini inviare mandare hd whatsapp valutazione online",
      a: "Certo. Su WhatsApp puoi inviare foto di fronte, di retro e laterali, in HD, per una prima idea del trattamento. Il preventivo però si definisce solo di persona, perché dalle foto non si vedono le zone più o meno diradate né il tipo di cicatrici.",
      w: "Buongiorno, vorrei una prima valutazione. Invio le foto (fronte, retro e lati, in HD).", n: ["consulenza", "prezzo", "per-chi"] },
    { id: "sedute", q: "Quante sedute servono e quanto dura?", k: "sedute seduta quante quanto tempo durata tempi giorni settimane controllo",
      a: "Di solito tre sedute, anche a sette giorni l’una dall’altra: in circa due settimane il trattamento è completo, con un controllo dopo circa 30-40 giorni. Se serve una seduta in più, è compresa nel preventivo.",
      w: "Buongiorno, vorrei informazioni sul percorso di tricopigmentazione.", n: ["mantenimento", "dopo", "prezzo"] },
    { id: "durata", q: "Quanto dura il risultato?", k: "dura durata anni permanente definitivo tempo risultato tatuaggio sbiadisce",
      a: "La tricopigmentazione non è permanente come un tatuaggio artistico: i pigmenti sono pensati per attenuarsi gradualmente. Di solito si fa una seduta di mantenimento dopo un anno, un anno e mezzo, a volte anche dopo due. Con una cura adeguata il risultato si mantiene nel tempo.",
      w: "Buongiorno, vorrei informazioni sulla durata e sul mantenimento.", n: ["mantenimento", "sedute", "limiti"] },
    { id: "mantenimento", q: "Ogni quanto si ritocca?", k: "ritocco ritoccare ritocchi mantenimento ripassare richiamo",
      a: "Di solito dopo un anno, un anno e mezzo, a volte anche due. Dipende dalla pelle, dall’esposizione al sole e da come viene curata.",
      w: "Buongiorno, vorrei prenotare un ritocco / mantenimento.", n: ["durata", "dopo", "consulenza"] },
    { id: "ricrescita", q: "Fa ricrescere i capelli?", k: "ricrescita ricrescere ricresce crescere stimola capelli farmaco terapia cura",
      a: "No. La tricopigmentazione non stimola la crescita e non sostituisce una terapia medica: è un camouflage estetico che agisce sulla percezione visiva di densità e di rasatura.",
      w: "Buongiorno, vorrei capire se la tricopigmentazione è adatta a me.", n: ["per-chi", "limiti", "consulenza"] },
    { id: "per-chi", q: "Per chi è indicata?", k: "indicata adatta chi alopecia calvizie diradamento donna uomo femminile areata",
      a: "L’indicazione più frequente è l’alopecia androgenetica, maschile e femminile: si può simulare l’effetto rasato oppure aumentare visivamente la densità nelle aree diradate. È indicata anche per integrare un trapianto stabilizzato e per mimetizzare cicatrici mature. Un requisito importante è la stabilità del quadro: lavorare su una perdita ancora in evoluzione dà risultati incoerenti nel tempo.",
      w: "Buongiorno, vorrei una prima valutazione. Invio una foto.", n: ["trapianto", "ricrescita", "limiti"] },
    { id: "trapianto", q: "Dopo un trapianto o con cicatrici?", k: "trapianto fut fue cicatrice cicatrici cicatrizzazione strip",
      a: "Sì, quando la zona è guarita e il trapianto si è stabilizzato: la tricopigmentazione può mimetizzare le cicatrici FUT e FUE e aumentare la densità percepita. Una cicatrice è un tessuto diverso, per questo si procede in modo progressivo, con un test iniziale. Trovi i dettagli nella pagina dedicata.",
      w: "Buongiorno, ho una cicatrice da trapianto e vorrei una valutazione. Invio una foto.", n: ["foto", "consulenza", "per-chi"],
      link: ["Leggi la pagina sulle cicatrici", "tricopigmentazione-cicatrici-trapianto.html"] },
    { id: "limiti", q: "Quali sono i limiti?", k: "svantaggi limiti difetti rischi problemi contro controindicazioni",
      a: "È giusto conoscerli prima: non stimola la ricrescita e non è una terapia; il risultato è semipermanente e richiede mantenimento; non è indicata in presenza di infezioni o infiammazioni del cuoio capelluto; e, se la perdita di capelli continua a evolvere, può servire adattare l’effetto negli anni. Conoscerli permette di scegliere con realismo.",
      w: "Buongiorno, vorrei parlare con te dei limiti e delle controindicazioni.", n: ["controindicazioni", "durata", "consulenza"] },
    { id: "controindicazioni", q: "Quando non si può fare?", k: "controindicazioni gravidanza allattamento chemioterapia minorenne infezione febbre allergia anticoagulanti diabete",
      a: "Non viene eseguito in caso di minore età, gravidanza o allattamento, infezioni o lesioni acute nella zona, febbre, gravi disturbi della coagulazione non controllati, allergia grave documentata ai componenti o chemioterapia senza nulla osta del medico. I farmaci prescritti non vanno mai sospesi autonomamente. Per altre condizioni (ad esempio diabete non controllato) si valuta in consulenza, a volte con il parere del medico.",
      w: "Buongiorno, vorrei sapere se nel mio caso ci sono controindicazioni.", n: ["dopo", "consulenza", "limiti"] },
    { id: "dopo", q: "Come ci si comporta dopo?", k: "dopo post cura curare crosta rossore prurito sole lavare doccia sudore indicazioni",
      a: "Nelle prime 48-72 ore possono comparire lieve rossore, sensibilità o prurito. Si seguono le istruzioni ricevute, si evita la sudorazione intensa e non si staccano le piccole croste. La protezione UV è importante nel tempo. Rossore che peggiora, gonfiore marcato, dolore crescente, pus o febbre richiedono una valutazione medica.",
      w: "Buongiorno, ho una domanda sulle cure dopo il trattamento.", n: ["mantenimento", "controindicazioni", "consulenza"] },
    { id: "dove", q: "Dove ricevi?", k: "dove sede studio indirizzo roma modena flaminio zona città citta orari",
      a: "Ricevo su appuntamento presso studi partner selezionati: sono attualmente presente a Roma (zona Flaminio) e a Modena (centro). Scrivimi su WhatsApp per sapere la sede in cui è possibile raggiungermi.",
      w: "Buongiorno, vorrei sapere dove ricevi e in quali giorni.", n: ["consulenza", "prezzo", "foto"] },
    { id: "pmu", q: "Fai anche dermopigmentazione?", k: "dermopigmentazione sopracciglia labbra occhi eyeliner trucco permanente pmu microblading",
      a: "Sì. Oltre alla tricopigmentazione mi occupo di dermopigmentazione estetica: sopracciglia, labbra e occhi. Trovi tutto nella pagina dedicata, con le indicazioni per la cura dopo il trattamento.",
      w: "Buongiorno, vorrei informazioni sulla dermopigmentazione.", n: ["consulenza", "dopo", "dove"],
      link: ["Vai alla dermopigmentazione", "dermopigmentazione.html"] },
    { id: "corsi", q: "Tieni corsi di formazione?", k: "corso corsi formazione insegni insegnare docente accademia mb abilitante qualifica lezione imparare scuola",
      a: "Sono docente di tricopigmentazione presso MB Accademia. Il corso di Operatore delle attività di tatuaggio, di 800 ore, è autorizzato dalla Regione Lazio e abilita alla professione (con il superamento dell’esame finale). Nella pagina dedicata trovi tutti i dettagli.",
      w: "Buongiorno, vorrei informazioni sui corsi di formazione.", n: ["dove", "consulenza", "prezzo"],
      link: ["Vai ai corsi di formazione", "formazione.html"] }
  ];

  var BY = {}; TOPICS.forEach(function (t) { BY[t.id] = t; });
  var FIRST = ["prezzo", "consulenza", "sedute", "durata", "trapianto", "dove"];
  var MORE = ["foto", "ricrescita", "per-chi", "limiti", "dopo", "pmu", "corsi"];

  /* ---------- stile ---------- */
  var css = "\
#wac-b{position:fixed;right:18px;bottom:18px;z-index:2147483000;font-family:Montserrat,system-ui,sans-serif}\
#wac-fab{display:flex;align-items:center;justify-content:center;width:62px;height:62px;border-radius:50%;border:2px solid #B8924F;background:#25D366;cursor:pointer;box-shadow:0 6px 22px rgba(0,0,0,.45);padding:0;transition:transform .2s}\
#wac-fab:hover{transform:scale(1.07)}\
#wac-fab:focus-visible,.wac-chip:focus-visible,#wac-x:focus-visible,.wac-go:focus-visible,#wac-in input:focus-visible,#wac-in button:focus-visible{outline:3px solid #D4B070;outline-offset:2px}\
#wac-fab svg{width:34px;height:34px;fill:#fff}\
#wac-tip{position:absolute;right:74px;bottom:10px;background:#161617;color:#ECE8E0;border:1px solid #B8924F;border-radius:14px 14px 4px 14px;padding:.55rem .8rem;font-size:.82rem;font-weight:600;white-space:nowrap;box-shadow:0 6px 20px rgba(0,0,0,.4);cursor:pointer;animation:wacin .4s}\
#wac-tip[hidden]{display:none}\
@keyframes wacin{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}\
#wac-p{position:absolute;right:0;bottom:78px;width:min(370px,calc(100vw - 28px));height:min(560px,calc(100vh - 130px));display:flex;flex-direction:column;background:#0F0F10;color:#ECE8E0;border:1px solid #B8924F;border-radius:16px;overflow:hidden;box-shadow:0 14px 44px rgba(0,0,0,.6);animation:wacin .25s}\
#wac-p[hidden]{display:none}\
#wac-h{display:flex;align-items:center;gap:.7rem;padding:.8rem .9rem;background:#161617;border-bottom:1px solid #2A2B2E}\
#wac-h img{width:42px;height:42px;border-radius:50%;object-fit:cover;object-position:50% 20%;border:1.5px solid #B8924F}\
#wac-h b{display:block;font-size:.92rem;letter-spacing:.02em}\
#wac-h small{display:block;color:#A9A59C;font-size:.72rem;margin-top:.1rem}\
#wac-x{margin-left:auto;background:none;border:0;color:#ECE8E0;font-size:1.5rem;line-height:1;cursor:pointer;padding:.2rem .5rem}\
#wac-m{flex:1;overflow-y:auto;padding:.9rem;display:flex;flex-direction:column;gap:.55rem;scroll-behavior:smooth}\
.wac-r,.wac-u{max-width:88%;padding:.6rem .8rem;border-radius:14px;font-size:.86rem;line-height:1.5;word-wrap:break-word}\
.wac-r{align-self:flex-start;background:#1E1F21;border-top-left-radius:4px}\
.wac-u{align-self:flex-end;background:#B8924F;color:#1A1408;font-weight:600;border-top-right-radius:4px}\
.wac-dots{display:inline-flex;gap:4px;padding:.2rem 0}.wac-dots i{width:7px;height:7px;border-radius:50%;background:#A9A59C;animation:wacb 1s infinite}.wac-dots i:nth-child(2){animation-delay:.15s}.wac-dots i:nth-child(3){animation-delay:.3s}\
@keyframes wacb{0%,80%,100%{opacity:.3}40%{opacity:1}}\
.wac-ch{display:flex;flex-wrap:wrap;gap:.4rem;align-self:flex-start;max-width:96%}\
.wac-chip{background:transparent;color:#D4B070;border:1px solid #B8924F;border-radius:20px;padding:.42rem .75rem;font:inherit;font-size:.78rem;font-weight:600;cursor:pointer;text-align:left}\
.wac-chip:hover{background:#B8924F;color:#1A1408}\
.wac-go{display:inline-flex;align-items:center;gap:.45rem;align-self:flex-start;background:#25D366;color:#06260F;text-decoration:none;font-weight:700;font-size:.82rem;padding:.6rem .95rem;border-radius:24px}\
.wac-go svg{width:18px;height:18px;fill:#06260F}\
.wac-lk{align-self:flex-start;color:#D4B070;font-size:.8rem;font-weight:600}\
#wac-in{display:flex;gap:.4rem;padding:.6rem;border-top:1px solid #2A2B2E;background:#161617}\
#wac-in input{flex:1;min-width:0;background:#0F0F10;color:#ECE8E0;border:1px solid #2A2B2E;border-radius:20px;padding:.55rem .85rem;font:inherit;font-size:16px}\
#wac-in button{background:#B8924F;color:#1A1408;border:0;border-radius:20px;padding:0 1rem;font:inherit;font-size:.8rem;font-weight:700;cursor:pointer}\
#wac-f{padding:.35rem .8rem .5rem;font-size:.66rem;color:#7d7a73;text-align:center;background:#161617}\
@media(max-width:860px){#wac-b{bottom:70px;right:12px}#wac-fab{width:56px;height:56px}#wac-p{bottom:68px;height:min(520px,calc(100vh - 170px))}#wac-tip{right:66px}}\
@media(prefers-reduced-motion:reduce){#wac-p,#wac-tip{animation:none}.wac-dots i{animation:none}#wac-m{scroll-behavior:auto}}";

  var ICON = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C9.4 3 4.02 8.38 4.02 15.02c0 2.12.55 4.19 1.6 6.01L4 29l8.14-1.59a12 12 0 0 0 5.9 1.5h.01c6.63 0 12.02-5.39 12.02-12.02A12 12 0 0 0 16.04 3Zm0 21.9h-.01a9.9 9.9 0 0 1-5.05-1.38l-.36-.21-4.83.94.99-4.7-.24-.38a9.9 9.9 0 1 1 9.5 5.73Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07a8.1 8.1 0 0 1-2.4-1.48 9 9 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z"/></svg>';

  /* ---------- costruzione ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  function init() {
    if (document.getElementById("wac-b")) return;
    var st = el("style"); st.textContent = css; document.head.appendChild(st);

    var box = el("div", { id: "wac-b" });
    var tip = el("div", { id: "wac-tip", role: "button", tabindex: "0" }, "Chatta con me");
    var fab = el("button", { id: "wac-fab", type: "button", "aria-label": "Chatta con me: apri le domande frequenti", "aria-expanded": "false", "aria-controls": "wac-p" }, ICON);
    var panel = el("div", { id: "wac-p", role: "dialog", "aria-label": "Chatta con Simona – AUREALE", hidden: "" });
    panel.innerHTML =
      '<div id="wac-h"><img src="' + AVATAR + '" alt="" width="42" height="42"><div><b>Simona · AUREALE</b><small>Risposte rapide alle domande più frequenti</small></div><button id="wac-x" type="button" aria-label="Chiudi">&times;</button></div>' +
      '<div id="wac-m" role="log" aria-live="polite"></div>' +
      '<form id="wac-in" autocomplete="off"><input type="text" name="q" placeholder="Scrivi la tua domanda…" aria-label="Scrivi la tua domanda" maxlength="200"><button type="submit">Invia</button></form>' +
      '<div id="wac-f">Risposte automatiche. Nessun dato viene salvato o inviato.</div>';
    box.appendChild(panel); box.appendChild(tip); box.appendChild(fab);
    document.body.appendChild(box);

    var msgs = panel.querySelector("#wac-m");
    var form = panel.querySelector("#wac-in");
    var input = form.querySelector("input");
    var started = false, busy = false;

    function scroll() { msgs.scrollTop = msgs.scrollHeight; }
    function bubble(cls, text) { var d = el("div", { "class": cls }); d.textContent = text; msgs.appendChild(d); scroll(); return d; }
    function clearChips() { [].slice.call(msgs.querySelectorAll(".wac-ch")).forEach(function (c) { c.remove(); }); }

    function chips(ids, more) {
      var w = el("div", { "class": "wac-ch" });
      ids.forEach(function (id) {
        var t = BY[id]; if (!t) return;
        var b = el("button", { type: "button", "class": "wac-chip" }); b.textContent = t.q;
        b.addEventListener("click", function () { ask(t.id, t.q); });
        w.appendChild(b);
      });
      if (more) {
        var m = el("button", { type: "button", "class": "wac-chip" }); m.textContent = "Altre domande…";
        m.addEventListener("click", function () { clearChips(); chips(MORE, false); });
        w.appendChild(m);
      }
      msgs.appendChild(w); scroll();
    }

    function goBtn(text) {
      var a = el("a", { "class": "wac-go", href: wa(text), target: "_blank", rel: "noopener" }, ICON + "<span>Continua su WhatsApp</span>");
      msgs.appendChild(a); scroll();
    }

    function reply(text, after) {
      busy = true;
      var d = el("div", { "class": "wac-r" }, '<span class="wac-dots" aria-label="Sto scrivendo"><i></i><i></i><i></i></span>');
      msgs.appendChild(d); scroll();
      setTimeout(function () { d.textContent = text; scroll(); busy = false; if (after) after(); }, 650);
    }

    function ask(id, label) {
      if (busy) return;
      clearChips(); bubble("wac-u", label);
      var t = BY[id];
      reply(t.a, function () {
        if (t.link) {
          var l = el("a", { "class": "wac-lk", href: t.link[1] }); l.textContent = t.link[0] + " →"; msgs.appendChild(l);
        }
        goBtn(t.w);
        chips(t.n || [], true);
      });
    }

    function norm(s) {
      return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9 ]/g, " ");
    }
    function match(q) {
      var words = norm(q).split(/\s+/).filter(function (w) { return w.length > 2; });
      var best = null, bs = 0;
      TOPICS.forEach(function (t) {
        var keys = norm(t.k).split(/\s+/), s = 0;
        words.forEach(function (w) {
          keys.forEach(function (k) {
            if (k === w) s += 2; else if (k.length > 4 && w.length > 4 && (k.indexOf(w) === 0 || w.indexOf(k) === 0)) s += 1;
          });
        });
        if (s > bs) { bs = s; best = t; }
      });
      return bs >= 2 ? best : null;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim(); if (!v || busy) return;
      input.value = ""; clearChips(); bubble("wac-u", v);
      var t = match(v);
      if (t) {
        reply(t.a, function () {
          if (t.link) { var l = el("a", { "class": "wac-lk", href: t.link[1] }); l.textContent = t.link[0] + " →"; msgs.appendChild(l); }
          goBtn(t.w); chips(t.n || [], true);
        });
      } else {
        reply("Non ho una risposta pronta a questa domanda, e preferisco non rispondere a caso. Scrivimi direttamente su WhatsApp: ti rispondo personalmente. Oppure scegli un argomento qui sotto.", function () {
          goBtn("Buongiorno, ho una domanda: " + v); chips(FIRST, true);
        });
      }
    });

    function start() {
      if (started) return; started = true;
      reply("Ciao, sono Simona di AUREALE. Scegli una domanda qui sotto oppure scrivimi la tua: ti rispondo subito. Per tutto il resto, ci sentiamo su WhatsApp.", function () { chips(FIRST, true); });
    }

    function open() {
      panel.hidden = false; tip.hidden = true; fab.setAttribute("aria-expanded", "true"); start();
      try { sessionStorage.setItem("wac-tip", "1"); } catch (e) {}
      setTimeout(function () { input.focus({ preventScroll: true }); }, 50);
    }
    function close() { panel.hidden = true; fab.setAttribute("aria-expanded", "false"); fab.focus(); }

    fab.addEventListener("click", function () { panel.hidden ? open() : close(); });
    tip.addEventListener("click", open);
    tip.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    panel.querySelector("#wac-x").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });

    /* il fumetto "Chatta con me" compare dopo qualche secondo, una sola volta per visita */
    tip.hidden = true;
    var seen = false; try { seen = sessionStorage.getItem("wac-tip") === "1"; } catch (e) {}
    if (!seen) setTimeout(function () { if (panel.hidden) tip.hidden = false; }, 3500);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
