import OBR from "https://esm.sh/@owlbear-rodeo/sdk@2";
import {
  CRIT_TABLE,
  SEVERITY_LABELS,
  severityFromRoll,
  localizeText,
  glossaryFor,
} from "./data/critTable.js";

const CHANNEL = "com.saul.pf-crit/result";
const LANG_KEY = "pf-crit-lang";

const severityColor = {
  Leve: "#4a5568",
  Grave: "#5a4b8b",
  Brutal: "#b3701f",
  Mortal: "#8b1e1e",
};

const UI = {
  es: {
    draw: "Sacar carta",
    share: "Compartir con la mesa",
    history: "Historial",
    backLabel: "Carta boca abajo",
    placeholder: "Saca una carta para revelar el efecto.",
  },
  en: {
    draw: "Draw card",
    share: "Share with the table",
    history: "History",
    backLabel: "Face-down card",
    placeholder: "Draw a card to reveal the effect.",
  },
  // El Spanglish usa la interfaz en español; solo las condiciones de
  // juego dentro del texto del efecto cambian a inglés.
  spanglish: {
    draw: "Sacar carta",
    share: "Compartir con la mesa",
    history: "Historial",
    backLabel: "Carta boca abajo",
    placeholder: "Saca una carta para revelar el efecto.",
  },
};

const tabsEl = document.getElementById("tabs");
const cardEl = document.getElementById("card");
const ribbonEl = document.getElementById("ribbon");
const rollValueEl = document.getElementById("rollValue");
const cardTypeEl = document.getElementById("cardType");
const cardTextEl = document.getElementById("cardText");
const cardGlossaryEl = document.getElementById("cardGlossary");
const drawBtn = document.getElementById("drawBtn");
const drawBtnLabel = document.getElementById("drawBtnLabel");
const shareRow = document.getElementById("shareRow");
const shareLabel = document.getElementById("shareLabel");
const shareCheck = document.getElementById("shareCheck");
const logList = document.getElementById("logList");
const logTitle = document.getElementById("logTitle");
const playerTag = document.getElementById("playerTag");
const backLabelEl = document.getElementById("backLabel");
const langButtons = document.querySelectorAll(".lang-btn");

let currentType = "cortante";
let currentLang = localStorage.getItem(LANG_KEY) || "es";
let playerName = "";

function typeLabel(type) {
  const table = CRIT_TABLE[type];
  return currentLang === "en" ? table.labelEn : table.labelEs;
}

function severityLabel(severity) {
  const dict = currentLang === "en" ? SEVERITY_LABELS.en : SEVERITY_LABELS.es;
  return dict[severity];
}

function applyLanguage() {
  const strings = UI[currentLang];
  drawBtnLabel.textContent = strings.draw;
  shareLabel.textContent = strings.share;
  logTitle.textContent = strings.history;
  backLabelEl.textContent = strings.backLabel;
  cardTextEl.textContent = strings.placeholder;

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });

  [...tabsEl.children].forEach((btn) => {
    btn.textContent = typeLabel(btn.dataset.type);
  });

  // Si ya hay una carta revelada, vuelve a pintarla en el nuevo idioma
  if (cardEl.classList.contains("flipped") && cardEl.dataset.lastEntry) {
    const payload = JSON.parse(cardEl.dataset.lastEntry);
    paintCard(payload);
  }
}

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  applyLanguage();
}

function setActiveTab(type) {
  currentType = type;
  [...tabsEl.children].forEach((btn) => {
    const active = btn.dataset.type === type;
    btn.classList.toggle("active", active);
    btn.style.setProperty(
      "--tab-accent",
      active ? CRIT_TABLE[btn.dataset.type].accent : "transparent"
    );
  });
}

tabsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  setActiveTab(btn.dataset.type);
});

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
});

function rollD20() {
  return 1 + Math.floor(Math.random() * 20);
}

function pickEntryIndex(type, severity) {
  const pool = CRIT_TABLE[type].entries
    .map((e, i) => ({ e, i }))
    .filter(({ e }) => e.severity === severity);
  return pool[Math.floor(Math.random() * pool.length)].i;
}

function paintCard({ type, roll, severity, entryIndex, author, lang }) {
  const table = CRIT_TABLE[type];
  const entry = table.entries[entryIndex];
  const useLang = lang || currentLang;
  const text = localizeText(entry, useLang);
  const glossary = glossaryFor(entry, useLang);

  cardEl.style.setProperty("--severity-color", severityColor[severity]);
  ribbonEl.textContent = severityLabel(severity);
  ribbonEl.style.background = severityColor[severity];
  rollValueEl.textContent = roll;
  cardTypeEl.textContent = typeLabel(type);
  cardTypeEl.style.color = severityColor[severity];
  cardTextEl.textContent = text;

  cardGlossaryEl.innerHTML = "";
  glossary.forEach(({ name, desc }) => {
    const line = document.createElement("p");
    line.className = "card__glossary-line";
    line.innerHTML = `<b>${name}</b> — ${desc}`;
    cardGlossaryEl.appendChild(line);
  });

  cardEl.dataset.lastEntry = JSON.stringify({ type, roll, severity, entryIndex, author });
}

function renderResult(payload) {
  paintCard(payload);

  cardEl.classList.remove("flipped");
  void cardEl.offsetWidth;
  requestAnimationFrame(() => cardEl.classList.add("flipped"));

  addLogEntry(payload);
}

function addLogEntry({ type, roll, severity, author }) {
  const li = document.createElement("li");
  li.style.setProperty("--entry-color", severityColor[severity]);
  const who = author ? `${author} — ` : "";
  li.innerHTML = `${who}<b>${typeLabel(type)}</b> · ${severityLabel(severity)} (${roll})`;
  logList.prepend(li);
  while (logList.children.length > 8) {
    logList.removeChild(logList.lastChild);
  }
}

async function draw() {
  drawBtn.disabled = true;
  const roll = rollD20();
  const severity = severityFromRoll(roll);
  const entryIndex = pickEntryIndex(currentType, severity);
  const payload = {
    type: currentType,
    roll,
    severity,
    entryIndex,
    author: playerName,
  };

  renderResult(payload);

  if (OBR.isAvailable && shareCheck.checked) {
    try {
      await OBR.broadcast.sendMessage(CHANNEL, payload, { destination: "REMOTE" });
    } catch (err) {
      console.error("No se pudo compartir el resultado:", err);
    }
  }

  setTimeout(() => (drawBtn.disabled = false), 500);
}

drawBtn.addEventListener("click", draw);
setActiveTab(currentType);
applyLanguage();

if (OBR.isAvailable) {
  OBR.onReady(async () => {
    shareRow.hidden = false;
    try {
      playerName = (await OBR.player.getName()) || "";
      playerTag.textContent = playerName;
    } catch (err) {
      // Sin nombre disponible, seguimos sin etiqueta
    }

    OBR.broadcast.onMessage(CHANNEL, (event) => {
      addLogEntry(event.data);
    });
  });
}
