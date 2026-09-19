/* T.T AI Firm · las dos maneras de empezar. Es la primera pantalla de la ventana. */

import { AUDITORIA } from './auditoria/datos.js';

const dolares = (n) => `${AUDITORIA.moneda} ${n.toLocaleString('en-US')}`;

export function puertasHTML() {
  return `
    <div class="puertas">
      <p class="etiqueta izquierda">Cómo empezar</p>
      <h3 class="titulo">¿Por dónde quieres empezar?</h3>
      <p class="ayuda" style="margin-top:8px">Las dos empiezan con tu operación, no con un catálogo. Contestas unas preguntas y nos llega todo junto.</p>

      <button class="puerta" data-elegir="auditoria">
        <span class="k">Desde ${dolares(AUDITORIA.desde)} · ${AUDITORIA.duracion.toLowerCase()}</span>
        <b>Pedir una auditoría para mi empresa</b>
        <span class="d">Entramos a tu operación y salimos con los números: dónde se pierde dinero y todo lo que puede mejorar con sistemas. De ahí sale el alcance firme. El monto se acredita al proyecto.</span>
        <span class="ir">Son 5 preguntas<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </button>

      <button class="puerta" data-elegir="demo">
        <span class="k">Con precio según el alcance</span>
        <b>Armar un demo de mi sistema</b>
        <span class="d">Una muestra real de tu sistema, hecha sobre tu negocio, antes de comprometer el proyecto completo. Te decimos qué lleva, cuánto tarda y qué cuesta.</span>
        <span class="ir">Son 5 preguntas<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </button>
    </div>`;
}
