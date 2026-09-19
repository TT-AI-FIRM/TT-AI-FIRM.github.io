/* T.T AI Firm · guion de la página: palabra que rota, apariciones, menú,
   película de la portada y un solo reloj para todas las maquetas. */

import * as traslados from './muestras/traslados.js';
import * as planta from './muestras/planta.js';
import * as asistente from './muestras/asistente.js';
import * as salon from './muestras/salon.js';
import * as distribucion from './muestras/distribucion.js';
import * as campana from './muestras/campana.js';
import { montar as montarVentana } from './ventana.js';
import { CONTACTO, enlaceCorreo, enlaceTelefono } from './contacto.js';
import { formularioHTML, conectar } from './solicitud.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const html = document.documentElement;
const menosMovimiento = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── datos de la página ── */

const PASO_PALABRA = 1700;   // lo que dura cada palabra de la portada, y el paso de las fichas
const PALABRAS = ['Sistema', 'Campaña de marketing', 'App', 'IA propietaria', 'Página web high end',
  'Animaciones 3D', 'Base de datos', 'Automatización', 'Leads', 'CRM', 'Todo 1 de 1'];
const DURACION_PALABRA = { 'Todo 1 de 1': 2500 };   // la que cierra el ciclo se queda más tiempo

const CAPACIDADES = [
  ['Sistema integral', 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'],
  ['Producción', 'M3 21V11l5 3.2V11l5 3.2V7.5l5 3.2V21M2 21h20M7 17.5h.01M12 17.5h.01M17 17.5h.01'],
  ['Calidad', 'M12 3l7 3v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6zM9 12l2 2 4-4'],
  ['Laboratorio', 'M9 3h6M10 3v6.2L5.4 18.6A2 2 0 0 0 7.2 21.5h9.6a2 2 0 0 0 1.8-2.9L14 9.2V3M7.6 15h8.8'],
  ['Almacén', 'M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10'],
  ['Mantenimiento', 'M21 4l-4 4-3-3 4-4a6 6 0 0 0-7.7 7.7L3 16.3V21h4.7l8.6-8.6A6 6 0 0 0 21 4z'],
  ['Costos y finanzas', 'M12 2v20M17 6.6c0-2-2.2-3.1-5-3.1s-5 1.1-5 3.3S9.2 10 12 10.5s5 1.5 5 3.7-2.2 3.3-5 3.3-5-1.2-5-3.1'],
  ['Recibos de nómina', 'M6 2h12v20l-2-1.5L14 22l-2-1.5L10 22l-2-1.5L6 22zM9.5 7.5h5M9.5 11.5h5M9.5 15.5h3'],
  ['Capacitación', 'M12 3L2 8l10 5 10-5zM6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5'],
  ['Documentos', 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4'],
  ['Tablero de dirección', 'M21 13a9 9 0 1 0-18 0M12 13l4.6-3.4M12 13h.01'],
  ['CRM', 'M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-6A3.5 3.5 0 0 0 3 17.5V19M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM21 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.5 3.7a3.5 3.5 0 0 1 0 6.8'],
  ['Leads', 'M3 5h18l-7 8.2V21l-4-2.4v-5.4z'],
  ['Campaña de marketing', 'M4 19V9m6 10V5m6 14v-7'],
  ['App', 'M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM11 18h2'],
  ['Portal para clientes', 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 9h18M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8.5 18.5a3.5 3.5 0 0 1 7 0'],
  ['Punto de venta', 'M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20M6 15h4'],
  ['IA propietaria', 'M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6zM18.5 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z'],
  ['Base de datos', 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
  ['Automatización', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.7l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 14h-.1a2 2 0 1 1 0-4H3a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 21 10h.1a2 2 0 1 1 0 4H21a1.7 1.7 0 0 0-1.6 1z'],
  ['Página web high end', 'M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 9h18M7 6.5h.01'],
  ['Animaciones 3D', 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9']
];

const MAQUETAS = { traslados, planta, asistente, salon, distribucion, campana };

// cada maqueta arranca a media historia para que nunca se vea vacía al cargar
const DESFASE = { traslados: 6, planta: 9.5, asistente: 9, salon: 9, distribucion: 7.5, campana: 8.5 };
const DESFASE_MINI = { traslados: 10.5, planta: 5, asistente: 12.5, salon: 4 };

/* ── palabra que cambia cada segundo ── */

function rotador() {
  const caja = $('#rotador');
  if (!caja) return;

  const nodos = PALABRAS.map((palabra, i) => {
    const span = document.createElement('span');
    span.textContent = palabra;
    if (i === 0) span.classList.add('activa');
    caja.appendChild(span);
    return span;
  });

  if (menosMovimiento) return;

  let actual = 0;
  const dura = (i) => DURACION_PALABRA[PALABRAS[i]] ?? PASO_PALABRA;

  const siguiente = () => {
    const saliendo = nodos[actual];
    actual = (actual + 1) % nodos.length;
    saliendo.classList.replace('activa', 'saliendo');
    nodos[actual].classList.add('activa');
    setTimeout(() => saliendo.classList.remove('saliendo'), 600);
    setTimeout(siguiente, dura(actual));
  };
  setTimeout(siguiente, dura(0));
}

/* ── fila de capacidades ── */

function capacidades() {
  const fila = $('#capacidades-fila');
  if (!fila) return;

  const ficha = ([nombre, trazo], i) => `
    <div class="ficha" data-ficha="${i}">
      <div class="tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="${trazo}"/></svg></div>
      <span>${nombre}</span>
    </div>`;

  // la lista va dos veces: al terminar la primera, la segunda ya está en su lugar y no se ve el corte
  const una = CAPACIDADES.map(ficha).join('');
  fila.innerHTML = `<div class="cinta">${una}${una}</div>`;
  fila.style.setProperty('--vuelta', `${CAPACIDADES.length * 5.2}s`);

  if (menosMovimiento) return;

  // se enciende una a la vez, las dos copias de la misma, al paso de la palabra de la portada
  const fichas = $$('[data-ficha]', fila);
  let i = 0;
  setInterval(() => {
    fichas.forEach(f => f.classList.toggle('encendida', Number(f.dataset.ficha) === i));
    i = (i + 1) % CAPACIDADES.length;
  }, PASO_PALABRA);
}

/* ── apariciones al entrar en pantalla ── */

function apariciones() {
  const vigia = new IntersectionObserver((entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('dentro');
      vigia.unobserve(e.target);
      contar(e.target);
    }
  }, { threshold: .15 });

  $$('.ap').forEach(n => vigia.observe(n));

  // respaldo: si algo quedó visible sin que el vigía alcanzara, se revela al hacer scroll
  addEventListener('scroll', () => {
    $$('.ap:not(.dentro)').forEach(n => {
      const r = n.getBoundingClientRect();
      if (r.top < innerHeight * .9 && r.bottom > 0) { n.classList.add('dentro'); contar(n); }
    });
  }, { passive: true });
}

function contar(raiz) {
  for (const nodo of $$('[data-contar]', raiz)) {
    const fin = Number(nodo.dataset.contar);
    const prefijo = nodo.dataset.prefijo ?? '';
    const sufijo = nodo.dataset.sufijo ?? '';
    const inicio = performance.now();
    const duracion = menosMovimiento ? 1 : 1400;

    const marco = (ahora) => {
      const p = Math.min(1, (ahora - inicio) / duracion);
      const valor = Math.round(fin * (1 - Math.pow(1 - p, 3)));
      nodo.textContent = prefijo + valor.toLocaleString('es-MX') + sufijo;
      if (p < 1) requestAnimationFrame(marco);
    };
    requestAnimationFrame(marco);
  }
}

/* ── navegación ── */

function navegacion() {
  const cabecera = $('#cabecera');
  const zocalo = $('#zocalo');
  const contacto = $('#contacto');
  const menu = $('#menu');

  const cerrarMenu = () => {
    if (!menu.classList.contains('abierto')) return;
    menu.classList.remove('abierto');
    menu.setAttribute('aria-hidden', 'true');
    html.classList.remove('trabado');
  };

  $('#btnMenu').onclick = () => {
    menu.classList.add('abierto');
    menu.setAttribute('aria-hidden', 'false');
    html.classList.add('trabado');
  };
  $$('[data-cerrar-menu]').forEach(b => b.onclick = cerrarMenu);
  addEventListener('keydown', e => { if (e.key === 'Escape') cerrarMenu(); });

  $$('[data-ir]').forEach(a => a.addEventListener('click', (e) => {
    const destino = a.getAttribute('href');
    if (!destino?.startsWith('#')) return;
    e.preventDefault();
    cerrarMenu();
    const nodo = $(destino);
    if (nodo) setTimeout(() => nodo.scrollIntoView({ behavior: menosMovimiento ? 'auto' : 'smooth', block: 'start' }), 60);
  }));

  const alDesplazar = () => {
    cabecera.classList.toggle('fija', scrollY > 40);
    const cerca = contacto.getBoundingClientRect().top < innerHeight;
    zocalo.classList.toggle('dentro', scrollY > innerHeight * .75 && !cerca);
  };
  addEventListener('scroll', alDesplazar, { passive: true });
  alDesplazar();
}

/* ── contacto ── */

// El formulario del cierre: lo que se escriba aquí entra al sistema de T.T.
function contactoForma() {
  const caja = $('#cierreForma');
  if (!caja) return;
  caja.innerHTML = formularioHTML({
    titulo: '¿Solo quieres información?',
    ayuda: 'Déjanos tus datos y qué necesitas. Entra directo a nuestro sistema y te buscamos por teléfono o por correo.',
    boton: 'Quiero que me contacten',
    conMensaje: true
  });
  conectar($('[data-pedir]', caja), () => ({ tipo: 'contacto' }));
}

function contactoBotones() {
  const caja = $('#contactoBotones');
  if (!caja) return;
  const correo = enlaceCorreo('Conversación con T.T AI Firm', 'Hola, quiero empezar una conversación con T.T AI Firm.');
  const telefono = enlaceTelefono();
  const partes = [];
  if (telefono) partes.push(`<a class="boton linea grande" href="${telefono}">${CONTACTO.telefono}</a>`);
  if (correo) partes.push(`<a class="boton linea grande" href="${correo}">${CONTACTO.correo}</a>`);
  if (partes.length) caja.insertAdjacentHTML('afterbegin', partes.join(''));
}

/* ── un solo reloj para todas las maquetas ── */

function maquetas() {
  const vivas = [];

  const montarEn = (nodo, nombre, desfase) => {
    const modulo = MAQUETAS[nombre];
    if (!modulo) return;
    const pieza = modulo.montar(nodo);
    const registro = { pieza, nodo, desfase, visible: false };
    vivas.push(registro);
    new IntersectionObserver(([e]) => { registro.visible = e.isIntersecting; }, { threshold: .05 }).observe(nodo);
    pieza.paso(desfase);
  };

  $$('[data-maqueta]').forEach(n => montarEn(n, n.dataset.maqueta, DESFASE[n.dataset.maqueta] ?? 0));
  $$('[data-mini]').forEach(n => montarEn(n, n.dataset.mini, DESFASE_MINI[n.dataset.mini] ?? 0));

  if (menosMovimiento || !vivas.length) return;

  const inicio = performance.now();
  const marco = (ahora) => {
    const t = (ahora - inicio) / 1000;
    for (const v of vivas) if (v.visible) v.pieza.paso(t + v.desfase);
    requestAnimationFrame(marco);
  };
  requestAnimationFrame(marco);
}

/* ── película de la portada, recorrida con el scroll ── */

function pelicula() {
  const video = $('#pelicula');
  if (!video?.dataset.fuente) return;

  const conexion = navigator.connection ?? {};
  if (menosMovimiento || conexion.saveData || /2g/.test(conexion.effectiveType ?? '')) return;

  const enTelefono = innerWidth <= 720;
  const fuente = enTelefono && video.dataset.fuenteMovil ? video.dataset.fuenteMovil : video.dataset.fuente;
  if (enTelefono && video.dataset.posterMovil) video.poster = video.dataset.posterMovil;

  const portada = $('#portada');
  let duracion = 0, pedido = -1, buscando = false;

  const avance = () => {
    const caja = portada.getBoundingClientRect();
    return Math.min(1, Math.max(0, -caja.top / Math.max(1, caja.height - innerHeight * .3)));
  };

  const buscar = () => {
    if (buscando || !duracion || pedido < 0) return;
    const destino = pedido;
    pedido = -1;
    buscando = true;
    try { video.currentTime = destino; } catch { buscando = false; }
  };

  video.addEventListener('seeked', () => { buscando = false; buscar(); });

  const alDesplazar = () => {
    if (!duracion) return;
    const destino = avance() * (duracion - .06);
    if (Math.abs(destino - video.currentTime) < .02) return;
    pedido = destino;
    buscar();
  };
  addEventListener('scroll', alDesplazar, { passive: true });

  // se trae completa a memoria: un servidor sin soporte de rangos no deja saltar dentro del archivo
  const traer = () => fetch(fuente)
    .then(r => r.ok ? r.blob() : Promise.reject(r.status))
    .then(bloque => {
      video.src = URL.createObjectURL(bloque);
      video.addEventListener('loadedmetadata', () => {
        duracion = Number.isFinite(video.duration) ? video.duration : 0;
        video.classList.add('dentro');
        alDesplazar();
      }, { once: true });
      video.load();
    })
    .catch(() => { /* sin película, la portada se queda con su atmósfera */ });

  if ('requestIdleCallback' in window) requestIdleCallback(traer, { timeout: 2500 });
  else setTimeout(traer, 1200);
}

/* ── arranque ── */

rotador();
capacidades();
apariciones();
navegacion();
contactoForma();
contactoBotones();
montarVentana();
maquetas();
pelicula();
