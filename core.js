// Conexión en vivo: Firebase si hay configuración, si no "modo demo" local.
import { firebaseConfig, QUIZ } from "./config.js";

export { QUIZ };
export const DEMO = !firebaseConfig.apiKey;

// Lista plana de preguntas con su ronda
export const QUESTIONS = [];
QUIZ.rounds.forEach((r, ri) => r.questions.forEach((q, qi) => {
  QUESTIONS.push({ ...q, round: ri, firstOfRound: qi === 0 });
}));
export const TOTAL = QUESTIONS.length;
export const LETTERS = ["A", "B", "C", "D"];

export function levelFor(correct) {
  return QUIZ.levels.find(l => correct >= l.min && correct <= l.max) || QUIZ.levels[QUIZ.levels.length - 1];
}

export function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};

// ---------- Backend ----------
let api;

if (!DEMO) {
  const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
  const fdb = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js");
  const app = initializeApp(firebaseConfig);
  const db = fdb.getDatabase(app);
  const r = p => fdb.ref(db, "quiz" + (p ? "/" + p : ""));
  api = {
    on: (p, cb) => fdb.onValue(r(p), s => cb(s.val())),
    get: async p => (await fdb.get(r(p))).val(),
    set: (p, v) => fdb.set(r(p), v),
    update: (p, v) => fdb.update(r(p), v),
    remove: p => fdb.remove(r(p)),
    now: () => fdb.serverTimestamp()
  };
} else {
  // Modo demo: todo vive en localStorage y se sincroniza entre pestañas.
  const KEY = "quiz-demo-db";
  const subs = [];
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const write = t => { localStorage.setItem(KEY, JSON.stringify(t)); notify(); chan.postMessage(1); };
  const at = (t, p) => (p ? p.split("/") : []).reduce((o, k) => (o == null ? undefined : o[k]), t);
  const put = (t, p, v) => {
    const ks = p.split("/"); let o = t;
    ks.slice(0, -1).forEach(k => { if (typeof o[k] !== "object" || o[k] === null) o[k] = {}; o = o[k]; });
    if (v === null || v === undefined) delete o[ks.at(-1)]; else o[ks.at(-1)] = v;
  };
  const chan = new BroadcastChannel("quiz-demo");
  const notify = () => { const t = read(); subs.forEach(s => s.cb(clone(at(t, s.p)))); };
  const clone = v => (v === undefined ? null : JSON.parse(JSON.stringify(v)));
  chan.onmessage = notify;
  addEventListener("storage", e => { if (e.key === KEY) notify(); });
  let lastRaw = localStorage.getItem(KEY);
  setInterval(() => { const raw = localStorage.getItem(KEY); if (raw !== lastRaw) { lastRaw = raw; notify(); } }, 700);
  api = {
    on: (p, cb) => {
      const sub = { p, cb }; subs.push(sub); cb(clone(at(read(), p)));
      return () => { const i = subs.indexOf(sub); if (i >= 0) subs.splice(i, 1); };
    },
    get: async p => clone(at(read(), p)),
    set: async (p, v) => { const t = read(); if (!p) return write(v || {}); put(t, p, v); write(t); },
    update: async (p, obj) => { const t = read(); Object.entries(obj).forEach(([k, v]) => put(t, (p ? p + "/" : "") + k, v)); write(t); },
    remove: async p => { const t = read(); if (!p) return write({}); put(t, p, null); write(t); },
    now: () => Date.now()
  };
}

export const db = api;

export function demoBanner() {
  if (!DEMO) return;
  const b = document.createElement("div");
  b.className = "demo-banner";
  b.textContent = "Modo demo · funciona solo en esta computadora (abrí el jugador en otra pestaña)";
  document.body.appendChild(b);
}
