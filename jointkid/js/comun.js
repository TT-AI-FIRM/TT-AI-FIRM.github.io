// Piezas compartidas por las escenas: curvas de tiempo, nodos y el teléfono del fan.

export const limitar = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
// Progreso de 0 a 1 entre los segundos a y b de la escena.
export const tramo = (t, a, b) => limitar((t - a) / (b - a));
export const suave = (x) => x * x * (3 - 2 * x);
export const salida = (x) => 1 - Math.pow(1 - x, 3);
export const resorte = (x) => x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * (2 * Math.PI) / 3) + 1;

export function nodo(html) {
  const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild;
}

// Entrada estándar de un elemento: sube 40 px y aparece.
export function aparecer(el, p) {
  if (!el) return;
  const e = salida(limitar(p));
  el.style.opacity = e; el.style.transform = `translateY(${(1 - e) * 40}px)`;
}

// Número que corre de 0 a su valor, con separador de miles.
export const cifra = (n) => Math.round(n).toLocaleString('es-MX');

export const USUARIO = 'jointkidkick';

// Teléfono del fan. `contenido` va dentro de la pantalla, sobre la retícula.
export function telefono(contenido, { titulo = 'Inicio', negrita = '', oscuro = false } = {}) {
  return `
  <div class="tel"><div class="pantalla${oscuro ? ' negra' : ''}">
    <div class="reticula"></div>
    <div class="isla"></div>
    <div class="barra-estado"><span>9:41</span><span>●●● ▮</span></div>
    <div class="cabeza"><span>${titulo} <b>${negrita}</b></span><span class="avatar fan">F</span></div>
    ${contenido}
    <div class="nav"><span>▦</span><span class="escaner">⌖</span><span>♨</span></div>
  </div></div>`;
}

// Encabezado de cada escena: lo que se tiene que leer.
export const encabezado = (titulo, sub) => `<div class="cabecera"><div class="titulo">${titulo}</div><div class="sub">${sub}</div></div>`;
