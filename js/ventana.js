/* T.T AI Firm · la ventana donde se contesta. Sirve para los dos caminos:
   el demo y la auditoría. Las pantallas se arman solas desde las preguntas
   de cada cuestionario; no hay un caso especial por pregunta ni por camino. */

import { DEMO } from './cotizador/cuestionario.js';
import { AUDITORIA_Q } from './auditoria/cuestionario.js';
import { puertasHTML } from './puertas.js';
import { formularioHTML, conectar } from './solicitud.js';

const TIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';
const FLECHA = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CUESTIONARIOS = { demo: DEMO, auditoria: AUDITORIA_Q };

const raiz = document.documentElement;
const vacias = (preguntas) => Object.fromEntries(preguntas.map(p => [p.id, p.tipo === 'varias' ? [] : '']));

let caja, panel, cuerpo, pie, barra, cuenta, titulo;
let cuestionario = null;   // null = la pantalla de las dos puertas
let paso = 0;
let respuestas = {};
let ultimo = null;         // lo que se va a enseñar y a mandar, ya calculado

/* ── cascarón ── */

function armar() {
  caja = document.createElement('div');
  caja.id = 'cotizador';
  caja.setAttribute('aria-hidden', 'true');
  caja.innerHTML = `
    <div class="fondo" data-cerrar></div>
    <div class="panel" role="dialog" aria-modal="true" aria-label="Empezar con T.T AI Firm" tabindex="-1">
      <header>
        <div><b data-titulo>Empezar</b><span class="paso mono"></span></div>
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
  titulo = caja.querySelector('[data-titulo]');

  caja.addEventListener('click', (e) => { if (e.target.closest('[data-cerrar]')) cerrar(); });
  cuerpo.addEventListener('click', alTocarCuerpo);
  cuerpo.addEventListener('change', alCambiarLista);
  pie.addEventListener('click', alTocarPie);
}

/* ── respuestas ── */

const pregunta = () => cuestionario.preguntas[paso];
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
  cuerpo.scrollTop = 0;

  if (!cuestionario) {
    titulo.textContent = 'Empezar';
    cuenta.textContent = 'Dos caminos';
    barra.style.width = '0%';
    cuerpo.innerHTML = puertasHTML();
    pie.innerHTML = '';
    return;
  }

  const preguntas = cuestionario.preguntas.length;
  const total = preguntas + 1;               // las preguntas más la ventana de contacto
  titulo.textContent = cuestionario.titulo;

  if (paso > preguntas) { barra.style.width = '100%'; cuenta.textContent = 'Tu resultado'; return pintarFinal(); }

  barra.style.width = `${((paso + 1) / total) * 100}%`;
  cuenta.textContent = `Paso ${paso + 1} de ${total}`;
  if (paso === preguntas) return pintarPedir();

  const p = pregunta();
  const r = respuestas[p.id];
  const marcada = (id) => Array.isArray(r) ? r.includes(id) : r === id;

  const control = p.tipo === 'lista'
    ? `<select class="lista" aria-label="${p.titulo}">
         <option value="" ${r ? '' : 'selected'} disabled>${p.vacio ?? 'Elige una opción…'}</option>
         ${p.opciones.map(o => `<option value="${o.id}" ${marcada(o.id) ? 'selected' : ''}>${o.nombre}</option>`).join('')}
       </select>`
    : `<div class="opciones ${p.tipo}">${p.opciones.map(o => `
         <button class="opcion${marcada(o.id) ? ' marcada' : ''}" data-opcion="${o.id}" aria-pressed="${marcada(o.id)}">
           <span><b>${o.nombre}</b>${o.nota ? `<small>${o.nota}</small>` : ''}</span><i>${TIC}</i>
         </button>`).join('')}</div>`;

  cuerpo.innerHTML = `<div class="pregunta"><h3>${p.titulo}</h3><p>${p.ayuda}</p>${control}</div>`;

  const ultimo = paso === total - 1;
  pie.innerHTML = `
    <button class="boton linea" data-atras>${paso === 0 ? 'Cambiar' : 'Atrás'}</button>
    <button class="boton accion" data-siguiente ${contestada() ? '' : 'disabled'}>${ultimo ? 'Ver mi resultado' : 'Siguiente'}${FLECHA}</button>`;
}

// La ventana de contacto: es lo último antes de terminar.
function pintarPedir() {
  ultimo = cuestionario.final(respuestas);
  if (!ultimo) { paso = 0; return pintar(); }

  cuerpo.innerHTML = formularioHTML(cuestionario.pide);
  pie.innerHTML = '<button class="boton linea" data-atras>Atrás</button>';
  conectar(cuerpo.querySelector('[data-pedir]'), () => ultimo.sistema, () => { paso += 1; pintar(); });
}

function pintarFinal() {
  const final = ultimo ?? cuestionario.final(respuestas);
  cuerpo.innerHTML = '<div class="llego"><b>Listo, ya llegó.</b><span>Tu solicitud entró a nuestro sistema. Te buscamos por teléfono o por correo.</span></div>' + final.html;
  pie.innerHTML = '<button class="boton linea" data-reiniciar>Empezar de nuevo</button>' +
                  '<button class="boton linea" data-copiar>Copiar mi resumen</button>';
  pie.dataset.texto = final.texto;
}

/* ── manos ── */

function alTocarCuerpo(e) {
  const puerta = e.target.closest('[data-elegir]');
  if (puerta) return elegir(puerta.dataset.elegir);

  const boton = e.target.closest('[data-opcion]');
  if (!boton) return;
  marcar(boton.dataset.opcion);
  const salta = pregunta().tipo === 'una';
  pintar();
  if (salta) setTimeout(avanzar, 240);
}

function alCambiarLista(e) {
  if (!e.target.matches('.lista') || e.target.name) return;   // los campos del formulario no avanzan nada
  marcar(e.target.value);
  pintar();
  setTimeout(avanzar, 240);
}

function alTocarPie(e) {
  if (e.target.closest('[data-atras]')) {
    if (paso === 0) { cuestionario = null; return pintar(); }
    paso -= 1; pintar();
  }
  else if (e.target.closest('[data-siguiente]')) avanzar();
  else if (e.target.closest('[data-reiniciar]')) { respuestas = vacias(cuestionario.preguntas); ultimo = null; paso = 0; pintar(); }
  else if (e.target.closest('[data-copiar]')) copiar(e.target.closest('[data-copiar]'));
}

function elegir(cual) {
  cuestionario = CUESTIONARIOS[cual];
  respuestas = vacias(cuestionario.preguntas);
  ultimo = null;
  paso = 0;
  pintar();
}

function avanzar() {
  if (paso >= cuestionario.preguntas.length) return;   // de la ventana de contacto solo sale enviando
  if (!contestada()) return;
  paso += 1;
  pintar();
}

async function copiar(boton) {
  try { await navigator.clipboard.writeText(pie.dataset.texto); boton.textContent = 'Copiado'; }
  catch { boton.textContent = 'No se pudo copiar'; }
  setTimeout(() => { if (boton.isConnected) boton.textContent = 'Copiar mi resumen'; }, 2400);
}

/* ── abrir y cerrar ── */

export function abrir(cual = 'puertas') {
  if (!caja) armar();
  if (CUESTIONARIOS[cual]) elegir(cual);
  else { cuestionario = null; pintar(); }
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
  document.querySelectorAll('[data-modulo]').forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); abrir(b.dataset.modulo); }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && caja?.classList.contains('abierto')) cerrar(); });
}
