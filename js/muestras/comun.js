/* Piezas compartidas por las maquetas animadas.
   Cada maqueta exporta montar(nodo) y devuelve { paso(t) }, donde t son segundos.
   Un solo reloj en main.js mueve todas: ninguna maqueta abre su propio bucle. */

const NS = 'http://www.w3.org/2000/svg';

export const COLOR = {
  fondo: '#070813',
  panel: 'rgba(186,214,247,.045)',
  filo: 'rgba(186,215,247,.14)',
  texto: '#d1e4fa',
  titulo: '#d8ecf8',
  tenue: '#9da7ba',
  violeta: '#8b6bff',
  azul: '#b6d9fc',
  verde: '#6ee7a8',
  ambar: '#e8c06a'
};

/** Crea un nodo SVG con sus atributos ya puestos. */
export function el(nombre, atributos = {}, hijos = []) {
  const n = document.createElementNS(NS, nombre);
  for (const [k, v] of Object.entries(atributos)) n.setAttribute(k, String(v));
  for (const h of hijos) n.appendChild(h);
  return n;
}

/** Lienzo base de una maqueta: viewBox fijo de 320x200 para que todo escale solo. */
export function lienzo(nodo) {
  const svg = el('svg', { viewBox: '0 0 320 200', preserveAspectRatio: 'xMidYMid slice', fill: 'none' });
  nodo.appendChild(svg);
  return svg;
}

/** Rectángulo con esquinas redondeadas al estilo de las tarjetas de vidrio. */
export function panel(x, y, w, h, extra = {}) {
  return el('rect', { x, y, width: w, height: h, rx: extra.rx ?? 7, fill: extra.fill ?? COLOR.panel, stroke: extra.stroke ?? COLOR.filo, 'stroke-width': extra.grosor ?? 1 });
}

/** Texto de interfaz. Tamaños chicos porque el viewBox es de 320 de ancho. */
export function texto(x, y, contenido, extra = {}) {
  const t = el('text', {
    x, y,
    fill: extra.color ?? COLOR.tenue,
    'font-size': extra.tam ?? 6,
    'font-family': extra.mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
    'font-weight': extra.peso ?? 400,
    'letter-spacing': extra.espaciado ?? 0,
    'text-anchor': extra.anclaje ?? 'start'
  });
  t.textContent = contenido;
  return t;
}

/** Avance de 0 a 1 que se repite cada `duracion` segundos. */
export const ciclo = (t, duracion) => (t % duracion) / duracion;

/** Suavizado de entrada y salida, para que nada arranque ni frene de golpe. */
export const suave = (p) => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

/** Mantiene un valor dentro de un rango. */
export const limitar = (v, min, max) => Math.min(max, Math.max(min, v));

/** Recorre un tramo de 0 a 1 dentro del ciclo: de `desde` a `hasta`. */
export function tramo(p, desde, hasta) {
  return limitar((p - desde) / (hasta - desde), 0, 1);
}

/** Dibuja la barra superior de una ventana falsa dentro del lienzo. */
export function encabezado(svg, titulo) {
  svg.appendChild(el('rect', { x: 0, y: 0, width: 320, height: 200, fill: COLOR.fondo }));
  svg.appendChild(texto(12, 15, titulo, { tam: 6.5, color: COLOR.titulo, peso: 500 }));
}

/** Número con separador de miles, en español. */
export const miles = (n) => Math.round(n).toLocaleString('es-MX');
