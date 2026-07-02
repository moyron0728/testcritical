// Tabla original de efectos de golpe crítico para Pathfinder.
// No reproduce el mazo oficial de Paizo: es contenido propio, pensado
// como aderezo narrativo opcional para tu mesa.
//
// Cada texto usa marcadores [[clave]] donde se menciona una condición de
// juego formal (ver STATUS_EFFECTS). El motor de idioma sustituye esos
// marcadores según el modo elegido:
//   - "es"        -> todo en español (nombre de condición incluido)
//   - "en"         -> todo en inglés
//   - "spanglish" -> descripción en español, condiciones en inglés

export const STATUS_EFFECTS = {
  bleeding: {
    es: "Sangrado",
    en: "Bleeding",
    descEs: "Pierde puntos de golpe adicionales al inicio de cada turno hasta recibir curación.",
    descEn: "Loses additional hit points at the start of each turn until it receives healing.",
  },
  slowed: {
    es: "Ralentizado",
    en: "Slowed",
    descEs: "Su velocidad de movimiento se reduce a la mitad.",
    descEn: "Its movement speed is halved.",
  },
  disarmed: {
    es: "Desarmado",
    en: "Disarmed",
    descEs: "Ya no sostiene su arma; debe recuperarla o desenvainar otra.",
    descEn: "No longer holding its weapon; must retrieve it or draw another.",
  },
  stunned: {
    es: "Aturdido",
    en: "Stunned",
    descEs: "No puede actuar, pierde el bono de Destreza a la CA y sufre -2 a la CA.",
    descEn: "Can't act, loses its Dexterity bonus to AC, and takes a -2 penalty to AC.",
  },
  staggered: {
    es: "Trastabillando",
    en: "Staggered",
    descEs: "Solo puede realizar una acción de movimiento o una estándar en su turno, no ambas.",
    descEn: "Can take only a single move action or standard action each turn, not both.",
  },
  dazed: {
    es: "Atontado",
    en: "Dazed",
    descEs: "No puede realizar ninguna acción, pero no sufre otras penalizaciones.",
    descEn: "Can take no actions, but suffers no other penalty.",
  },
  prone: {
    es: "Derribado",
    en: "Prone",
    descEs: "Sufre -4 a los ataques cuerpo a cuerpo, con modificadores opuestos a la CA según el tipo de ataque.",
    descEn: "Takes a -4 penalty on melee attacks, with opposite AC modifiers depending on attack type.",
  },
  fatigued: {
    es: "Fatigado",
    en: "Fatigued",
    descEs: "No puede correr ni cargar, y sufre -2 a Fuerza y Destreza.",
    descEn: "Can't run or charge, and takes a -2 penalty to Strength and Dexterity.",
  },
  charged: {
    es: "Cargado",
    en: "Charged",
    descEs: "Conserva energía residual que le inflige daño elemental adicional al inicio de su turno.",
    descEn: "Carries residual energy that deals extra elemental damage at the start of its turn.",
  },
};

export const CRIT_TABLE = {
  cortante: {
    labelEs: "Cortante",
    labelEn: "Slashing",
    accent: "#8b1e1e",
    entries: [
      { severity: "Leve", effects: [], es: "El filo abre un tajo superficial; un hilo de sangre le corre por la piel y distrae al objetivo (-2 a la siguiente tirada de Percepción).", en: "The blade opens a shallow gash; a trickle of blood distracts the target (-2 on its next Perception check)." },
      { severity: "Leve", effects: [], es: "La tela o el cuero de la armadura queda rasgado a la vista; el objetivo se siente expuesto.", en: "The armor's cloth or leather is visibly torn; the target feels exposed." },
      { severity: "Leve", effects: [], es: "Un corte limpio en el antebrazo hace que el objetivo dude un instante antes de su próxima acción.", en: "A clean cut across the forearm makes the target hesitate before its next action." },
      { severity: "Grave", effects: [], es: "El tajo alcanza el músculo. El objetivo sufre -2 a las tiradas de ataque cuerpo a cuerpo durante 1 minuto.", en: "The gash reaches the muscle. The target takes a -2 penalty on melee attack rolls for 1 minute." },
      { severity: "Grave", effects: ["slowed"], es: "Un corte profundo en la pierna deja al objetivo [[slowed]] hasta que reciba curación.", en: "A deep cut to the leg leaves the target [[slowed]] until it receives healing." },
      { severity: "Grave", effects: ["disarmed"], es: "El arma casi le arranca el arma de la mano al objetivo: debe superar Fortaleza (CD 15) o quedar [[disarmed]].", en: "The blow nearly tears the weapon from the target's grip: it must succeed on a Fortitude check (DC 15) or become [[disarmed]]." },
      { severity: "Brutal", effects: ["disarmed"], es: "El filo secciona tendones de la mano. El objetivo queda [[disarmed]] y no puede volver a empuñar esa arma sin una acción completa.", en: "The blade severs tendons in the hand. The target is [[disarmed]] and can't wield that weapon again without a full-round action." },
      { severity: "Brutal", effects: ["bleeding"], es: "Un corte amplio deja una herida abierta: el objetivo queda [[bleeding]] y pierde 1d4 PG adicionales al inicio de cada uno de sus turnos hasta ser curado.", en: "A wide cut leaves an open wound: the target is [[bleeding]] and loses 1d4 additional HP at the start of each of its turns until healed." },
      { severity: "Brutal", effects: [], es: "El golpe corta la correa del escudo o del cinturón; una pieza de equipo suelta cae al suelo.", en: "The blow cuts through a shield strap or belt; a loose piece of equipment falls to the ground." },
      { severity: "Mortal", effects: ["stunned", "bleeding"], es: "El filo pasa cerca de una arteria. El objetivo queda [[stunned]] 1 ronda por el shock del dolor y [[bleeding]] (1d6 PG por turno) hasta recibir curación.", en: "The blade passes near an artery. The target is [[stunned]] for 1 round from the shock of pain and [[bleeding]] (1d6 HP per turn) until it receives healing." },
      { severity: "Mortal", effects: ["staggered"], es: "Un corte devastador amenaza con la decapitación: el objetivo queda [[staggered]] hasta el final del combate.", en: "A devastating cut threatens decapitation: the target is [[staggered]] for the rest of the combat." },
      { severity: "Mortal", effects: ["dazed"], es: "El tajo es tan profundo que dejará una cicatriz permanente; el objetivo queda [[dazed]] 1 ronda.", en: "The gash is so deep it will leave a permanent scar; the target is [[dazed]] for 1 round." },
    ],
  },
  perforante: {
    labelEs: "Perforante",
    labelEn: "Piercing",
    accent: "#5a4b8b",
    entries: [
      { severity: "Leve", effects: [], es: "La punta se clava entre las placas de la armadura; el dolor agudo obliga al objetivo a un chequeo de Concentración si estaba lanzando un conjuro.", en: "The point wedges between the armor plates; the sharp pain forces the target to make a Concentration check if it was casting a spell." },
      { severity: "Leve", effects: [], es: "Un pinchazo certero roza el ojo del objetivo: sufre -2 a la Percepción visual durante 1 ronda.", en: "A precise stab grazes the target's eye: it takes a -2 penalty on visual Perception checks for 1 round." },
      { severity: "Leve", effects: [], es: "El arma queda momentáneamente atrapada en la carne; el atacante debe tirar para liberarla en su siguiente turno.", en: "The weapon is briefly lodged in the flesh; the attacker must roll to free it on its next turn." },
      { severity: "Grave", effects: [], es: "La perforación alcanza el hombro del brazo de escudo: el objetivo pierde el bono de escudo a la CA durante 1 minuto.", en: "The puncture reaches the shoulder of the shield arm: the target loses its shield bonus to AC for 1 minute." },
      { severity: "Grave", effects: ["prone"], es: "El golpe atraviesa el muslo. El objetivo debe superar Fortaleza (CD 15) o quedar [[prone]].", en: "The blow pierces the thigh. The target must succeed on a Fortitude save (DC 15) or fall [[prone]]." },
      { severity: "Grave", effects: [], es: "La punta roza un pulmón: el objetivo tiene desventaja para lanzar conjuros con componente verbal durante 1 minuto.", en: "The point grazes a lung: the target has disadvantage on spells with a verbal component for 1 minute." },
      { severity: "Brutal", effects: ["disarmed"], es: "El arma perfora limpiamente la mano de escudo o de conjuro: el objetivo queda [[disarmed]] o no puede lanzar conjuros somáticos durante 1 minuto.", en: "The weapon punches cleanly through the shield or spell hand: the target is [[disarmed]] or can't cast somatic spells for 1 minute." },
      { severity: "Brutal", effects: ["fatigued"], es: "Una perforación profunda en el costado deja al objetivo [[fatigued]] por la pérdida de aire y sangre.", en: "A deep puncture to the side leaves the target [[fatigued]] from the loss of breath and blood." },
      { severity: "Brutal", effects: [], es: "El golpe atraviesa una articulación de la armadura: la CA del objetivo se reduce en 2 durante el resto del combate.", en: "The blow punches through a joint in the armor: the target's AC is reduced by 2 for the rest of the combat." },
      { severity: "Mortal", effects: ["staggered"], es: "La punta pasa peligrosamente cerca del corazón. El objetivo queda [[staggered]] y debe superar Fortaleza (CD 18) cada ronda o caer inconsciente.", en: "The point passes dangerously close to the heart. The target is [[staggered]] and must succeed on a Fortitude save (DC 18) each round or fall unconscious." },
      { severity: "Mortal", effects: [], es: "Un pulmón queda perforado: el objetivo no puede hablar ni lanzar conjuros verbales hasta recibir curación mágica.", en: "A lung is punctured: the target can't speak or cast verbal spells until it receives magical healing." },
      { severity: "Mortal", effects: ["bleeding"], es: "El arma queda alojada en el cuerpo del objetivo, que queda [[bleeding]]; retirarla provoca 1d6 de daño adicional inmediato.", en: "The weapon lodges in the target's body, leaving it [[bleeding]]; removing it deals 1d6 additional damage immediately." },
    ],
  },
  contundente: {
    labelEs: "Contundente",
    labelEn: "Bludgeoning",
    accent: "#4a5568",
    entries: [
      { severity: "Leve", effects: [], es: "El golpe deja los oídos zumbando: el objetivo sufre -2 a las tiradas de Percepción auditiva durante 1 ronda.", en: "The blow leaves the target's ears ringing: it takes a -2 penalty on auditory Perception checks for 1 round." },
      { severity: "Leve", effects: [], es: "Un impacto directo hace tambalear al objetivo, que pierde su acción de movimiento este turno.", en: "A direct hit staggers the target, which loses its move action this turn." },
      { severity: "Leve", effects: [], es: "El golpe deja un moretón visible y una punzada de dolor que resta -1 a la siguiente tirada de ataque del objetivo.", en: "The blow leaves a visible bruise and a stab of pain that gives a -1 penalty on the target's next attack roll." },
      { severity: "Grave", effects: ["prone"], es: "El impacto sacude el equilibrio del objetivo: debe superar Reflejos (CD 15) o quedar [[prone]].", en: "The impact rattles the target's balance: it must succeed on a Reflex save (DC 15) or fall [[prone]]." },
      { severity: "Grave", effects: [], es: "Un golpe al brazo del arma reduce el daño de las siguientes tiradas de ataque del objetivo en 1d4 durante 1 minuto.", en: "A blow to the weapon arm reduces the damage of the target's next attack rolls by 1d4 for 1 minute." },
      { severity: "Grave", effects: [], es: "El golpe deja al objetivo sin aire: no puede realizar acciones de movimiento adicionales este turno.", en: "The blow leaves the target winded: it can't take additional move actions this turn." },
      { severity: "Brutal", effects: ["stunned"], es: "Un mazazo directo a la cabeza deja al objetivo [[stunned]] durante 1 ronda.", en: "A direct blow to the head leaves the target [[stunned]] for 1 round." },
      { severity: "Brutal", effects: [], es: "El impacto fractura una costilla: el objetivo sufre -4 a las pruebas de Fortaleza hasta que reciba curación.", en: "The impact fractures a rib: the target takes a -4 penalty on Fortitude checks until it receives healing." },
      { severity: "Brutal", effects: ["disarmed"], es: "El golpe revienta el agarre del objetivo sobre cualquier objeto sostenido con una mano, dejándolo [[disarmed]].", en: "The blow breaks the target's grip on anything held in one hand, leaving it [[disarmed]]." },
      { severity: "Mortal", effects: ["staggered", "dazed"], es: "Un golpe brutal a la sien deja al objetivo [[staggered]] y [[dazed]] durante 1 ronda.", en: "A brutal blow to the temple leaves the target [[staggered]] and [[dazed]] for 1 round." },
      { severity: "Mortal", effects: ["prone", "stunned"], es: "El impacto colapsa el equilibrio del objetivo por completo: cae [[prone]] y queda [[stunned]] 1 ronda.", en: "The impact completely collapses the target's balance: it falls [[prone]] and is [[stunned]] for 1 round." },
      { severity: "Mortal", effects: ["fatigued"], es: "El golpe es tan fuerte que resuena en los huesos: el objetivo queda [[fatigued]] por el resto del combate.", en: "The blow is so fierce it resonates in the bones: the target is [[fatigued]] for the rest of the combat." },
    ],
  },
  energia: {
    labelEs: "Energía",
    labelEn: "Energy",
    accent: "#b3701f",
    entries: [
      { severity: "Leve", effects: [], es: "Una descarga residual chisporrotea sobre el objetivo, iluminándolo brevemente (pierde cualquier ocultación por 1 ronda).", en: "A residual discharge crackles over the target, briefly illuminating it (it loses any concealment for 1 round)." },
      { severity: "Leve", effects: [], es: "El calor o frío del golpe distrae al objetivo lo suficiente como para imponerle -2 en su siguiente tirada de salvación.", en: "The heat or cold of the blow distracts the target enough to impose a -2 penalty on its next saving throw." },
      { severity: "Leve", effects: [], es: "Un chispazo de energía chamusca o congela una prenda visible del objetivo.", en: "A spark of energy scorches or freezes a visible piece of the target's gear." },
      { severity: "Grave", effects: ["charged"], es: "La energía se propaga por el metal que el objetivo lleva encima: queda [[charged]] y sufre 1d4 de daño adicional del mismo tipo al inicio de su turno.", en: "The energy spreads through the metal the target carries: it becomes [[charged]] and takes 1d4 additional damage of the same type at the start of its turn." },
      { severity: "Grave", effects: [], es: "El objetivo queda momentáneamente cegado por el resplandor o el vapor: -4 a la Percepción visual durante 1 ronda.", en: "The target is momentarily blinded by the flash or steam: -4 on visual Perception checks for 1 round." },
      { severity: "Grave", effects: [], es: "Una descarga recorre al objetivo y le impone desventaja en su próxima tirada de Reflejos.", en: "A discharge runs through the target and imposes disadvantage on its next Reflex save." },
      { severity: "Brutal", effects: [], es: "La energía daña un objeto no mágico que el objetivo porta (arma, escudo o accesorio), reduciendo su efectividad hasta ser reparado.", en: "The energy damages a non-magical item the target carries (weapon, shield, or accessory), reducing its effectiveness until repaired." },
      { severity: "Brutal", effects: [], es: "El objetivo queda marcado por la energía: el siguiente ataque del mismo tipo elemental contra él tiene ventaja.", en: "The target is marked by the energy: the next attack of the same elemental type against it has advantage." },
      { severity: "Brutal", effects: ["fatigued"], es: "Una oleada de energía deja al objetivo [[fatigued]] por el trauma físico y sensorial.", en: "A wave of energy leaves the target [[fatigued]] from the physical and sensory trauma." },
      { severity: "Mortal", effects: ["stunned", "charged"], es: "La energía se concentra en un punto vital: el objetivo queda [[stunned]] 1 ronda y [[charged]], sufriendo 1d6 de daño adicional del mismo tipo.", en: "The energy concentrates on a vital point: the target is [[stunned]] for 1 round and [[charged]], taking 1d6 additional damage of the same type." },
      { severity: "Mortal", effects: ["staggered", "dazed"], es: "El objetivo queda envuelto en el elemento por un instante devastador: [[staggered]] y [[dazed]] 1 ronda.", en: "The target is engulfed in the element for a devastating instant: [[staggered]] and [[dazed]] for 1 round." },
      { severity: "Mortal", effects: [], es: "La descarga es tan violenta que dispersa cualquier efecto de invisibilidad, camuflaje o ilusión que proteja al objetivo.", en: "The discharge is so violent it disperses any invisibility, camouflage, or illusion effect protecting the target." },
    ],
  },
};

export const SEVERITY_ORDER = ["Leve", "Grave", "Brutal", "Mortal"];

export const SEVERITY_LABELS = {
  es: { Leve: "Leve", Grave: "Grave", Brutal: "Brutal", Mortal: "Mortal" },
  en: { Leve: "Minor", Grave: "Severe", Brutal: "Brutal", Mortal: "Lethal" },
};

// Determina la severidad según una tirada de d20 (o el valor pasado)
export function severityFromRoll(roll) {
  if (roll >= 19) return "Mortal";
  if (roll >= 15) return "Brutal";
  if (roll >= 9) return "Grave";
  return "Leve";
}

// Sustituye los marcadores [[clave]] por el nombre de la condición según
// el modo de idioma. "spanglish" toma el texto en español pero usa el
// nombre de la condición en inglés.
export function localizeText(entry, mode) {
  const base = mode === "en" ? entry.en : entry.es;
  return base.replace(/\[\[(\w+)\]\]/g, (_, key) => {
    const eff = STATUS_EFFECTS[key];
    if (!eff) return key;
    return mode === "en" || mode === "spanglish" ? eff.en : eff.es;
  });
}

// Construye las líneas de glosario para las condiciones presentes en una
// entrada, respetando la misma regla de idioma que localizeText.
export function glossaryFor(entry, mode) {
  return entry.effects.map((key) => {
    const eff = STATUS_EFFECTS[key];
    const name = mode === "en" || mode === "spanglish" ? eff.en : eff.es;
    const desc = mode === "en" ? eff.descEn : eff.descEs;
    return { key, name, desc };
  });
}
