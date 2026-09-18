/* T.T AI Firm · el módulo interactivo: cinco preguntas y el resultado.
   La pantalla se arma sola desde PREGUNTAS; no hay un caso especial por pregunta. */

import { PREGUNTAS } from './datos.js';
import { calcular } from './precio.js';
import { pantalla, acciones, resumen } from './resultado.js';

const TIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';
const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const raiz = document.documentElement;
const vacias = () => ({ negocio: '', modulos: [], usuarios: '', conexiones: [], plazo: '' });

let caja, panel, cuerpo, pie, barra, cuenta;
let paso = 0;
let respuestas = vacias();

/* ── armado del cascarón ── */

function armar() {
  caja = document.createElement('div');
  caja.id = 'cotizador';
  caja.setAttribute('aria-hidden', 'true');
  caja.innerHTML = `
    <div class="fondo" data-cerrar></div>
    <div class="panel" role="dialog" aria-modal="true" aria-label="Arma tu demo" tabindex="-1">
      <header>
        <div><b>Arma tu demo</b><span class="paso mono"></span></div>
        <button class="cerrar" data-cerrar aria-label="Cerrar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      </header>
      <div class="barra"><i></i></div>
      <div class="cuerpo"></div>
      <footer></footer>
    </div>`;
  document.body.appendChild(caja);

  panel = caja.querySelector('.panel');
  cuerpo = caja.querySelector('.cuerpo');
  pie = caja.querySelector('footer');
  barra = caja.querySelector('.barra i');
  cuenta = caja.querySelector('.paso');

  caja.addEventListener('click', (e) => { if (e.target.closest('[data-cerrar]')) cerrar(); });
  cuerpo.addEventListener('click', alTocarOpcion);
  cuerpo.addEventListener('change', alCambiarLista);
  pie.addEventListener('click', alTocarPie);
}

/* ── respuestas ── */

const pregunta = () => PREGUNTAS[paso];
const contestada = () => { const r = respuestas[pregunta().id]; return Array.isArray(r) ? r.length > 0 : Boolean(r); };

function marcar(id) {
  const p = pregunta();
  if (p.tipo !== 'varias') { respuestas[p.id] = id; return; }

  const elegida = p.opciones.find(o => o.id === id);
  const previas = respuestas[p.id];
  if (elegida?.exclusiva) { respuestas[p.id] = previas.includes(id) ? [] : [id]; return; }

  const sinExclusivas = previas.filter(x => !p.opciones.find(o => o.id === x)?.exclusiva);
  respuestas[p.id] = sinExclusivas.includes(id) ? sinExclusivas.filter(x => x !== id) : [...sinExclusivas, id];
}

/* ── pintado ── */

function pintar() {
  const total = PREGUNTAS.length;
  const enResultado = paso >= total;
  barra.style.width = `${((enResultado ? total : paso + 1) / total) * 100}%`;
  cuenta.textContent = enResultado ? 'Tu resultado' : `Paso ${paso + 1} de ${total}`;
  cuerpo.scrollTop = 0;

  if (enResultado) return pintarResultado();

  const p = pregunta();
  const r = respuestas[p.id];
  const marcada = (id) => Array.isArray(r) ? r.includes(id) : r === id;

  const lista = p.tipo === 'lista'
    ? `<select class="lista" aria-label="${p.titulo}">
         <option value="" ${r ? '' : 'selected'} disabled>${p.vacio ?? 'Elige una opción…'}</option>
         ${p.opciones.map(o => `<option value="${o.id}" ${marcada(o.id) ? 'selected' : ''}>${o.nombre}</option>`).join('')}
       </select>`
    : `<div class="opciones ${p.tipo}">${p.opciones.map(o => `
         <button class="opcion${marcada(o.id) ? ' marcada' : ''}" data-opcion="${o.id}" aria-pressed="${marcada(o.id)}">
           <span><b>${o.nombre}</b>${o.nota ? `<small>${o.nota}</small>` : ''}</span><i>${TIC}</i>
         </button>`).join('')}</div>`;

  cuerpo.innerHTML = `<div class="pregunta"><h3>${p.titulo}</h3><p>${p.ayuda}</p>${lista}</div>`;

  const ultimo = paso === PREGUNTAS.length - 1;
  pie.innerHTML = `
    <button class="boton linea" data-atras ${paso === 0 ? 'disabled' : ''}>Atrás</button>
    <button class="boton accion" data-siguiente ${contestada() ? '' : 'disabled'}>${ultimo ? 'Ver mi resultado' : 'Siguiente'}${FLECHA}</button>`;
}

function pintarResultado() {
  const estimado = calcular(respuestas);
  if (!estimado) { paso = PREGUNTAS.findIndex(p => p.id === 'modulos'); return pintar(); }
  cuerpo.innerHTML = pantalla(estimado);
  pie.innerHTML = acciones(estimado);
  pie.dataset.texto = resumen(estimado);
}

/* ── manos ── */

function alTocarOpcion(e) {
  const boton = e.target.closest('[data-opcion]');
  if (!boton) return;
  marcar(boton.dataset.opcion);
  const salta = pregunta().tipo === 'una';
  pintar();
  if (salta) setTimeout(avanzar, 240);
}

function alCambiarLista(e) {
  if (!e.target.matches('.lista')) return;
  marcar(e.target.value);
  pintar();
  setTimeout(avanzar, 240);
}

function alTocarPie(e) {
  if (e.target.closest('[data-atras]')) { paso = Math.max(0, paso - 1); pintar(); }
  else if (e.target.closest('[data-siguiente]')) avanzar();
  else if (e.target.closest('[data-reiniciar]')) { respuestas = vacias(); paso = 0; pintar(); }
  else if (e.target.closest('[data-copiar]')) copiar(e.target.closest('[data-copiar]'));
}

function avanzar() {
  if (paso < PREGUNTAS.length && !contestada()) return;
  paso = Math.min(PREGUNTAS.length, paso + 1);
  pintar();
}

async function copiar(boton) {
  try { await navigator.clipboard.writeText(pie.dataset.texto); boton.textContent = 'Copiado'; }
  catch { boton.textContent = 'No se pudo copiar'; }
  setTimeout(() => { if (boton.isConnected) boton.textContent = 'Copiar mi resumen'; }, 2400);
}

/* ── abrir y cerrar ── */

export function abrir() {
  if (!caja) armar();
  pintar();
  caja.classList.add('abierto');
  caja.setAttribute('aria-hidden', 'false');
  raiz.classList.add('trabado');
  panel.focus();
}

export function cerrar() {
  if (!caja) return;
  caja.classList.remove('abierto');
  caja.setAttribute('aria-hidden', 'true');
  raiz.classList.remove('trabado');
}

export function montar() {
  document.querySelectorAll('[data-cotizador]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); abrir(); }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && caja?.classList.contains('abierto')) cerrar(); });
}
