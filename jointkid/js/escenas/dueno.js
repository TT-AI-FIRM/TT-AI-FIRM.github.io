// Central del dueño: la cámara recorre una ventana de escritorio mientras el cursor navega el menú.
import { nodo, tramo, salida, suave, aparecer, cifra } from '../comun.js';
import { VENTANA, yMenu, PEDIDOS, EVENTOS, FINANZAS } from './dueno-vistas.js';

const CENTRO = { x: 540, y: 1060 };
// Cámara: punto de la ventana al centro (fx, fy), zoom z e inclinación de entrada.
const TOMAS = [
  { t: 0, fx: 750, fy: 520, z: 0.62, inc: 22 }, { t: 1.3, fx: 750, fy: 520, z: 0.68, inc: 0 },
  { t: 2.1, fx: 1010, fy: 200, z: 1.06 }, { t: 3.9, fx: 1010, fy: 200, z: 1.06 },
  { t: 4.8, fx: 760, fy: 600, z: 0.74 }, { t: 6.2, fx: 760, fy: 560, z: 0.72 },
  { t: 7.6, fx: 880, fy: 440, z: 1.0 }, { t: 10.8, fx: 880, fy: 470, z: 1.0 },
  { t: 11.5, fx: 700, fy: 520, z: 0.72 }, { t: 12.5, fx: 900, fy: 520, z: 0.97 }, { t: 15.8, fx: 900, fy: 520, z: 0.97 },
  { t: 16.4, fx: 700, fy: 520, z: 0.72 }, { t: 17.3, fx: 900, fy: 500, z: 0.98 }, { t: 20.1, fx: 900, fy: 500, z: 0.98 },
  { t: 20.5, fx: 700, fy: 520, z: 0.72 }, { t: 21.3, fx: 920, fy: 470, z: 1.0 }, { t: 26, fx: 920, fy: 490, z: 1.03 },
];
const CLICS = [{ t: 7.0, k: 1 }, { t: 11.9, k: 2 }, { t: 16.8, k: 3 }, { t: 20.8, k: 4 }];
const TEXTOS = [
  [0, 'Tu viernes, en una pantalla', 'Kick y tu marca juntos, en vivo.'],
  [7.0, 'La misma venta, del otro lado', 'Pedido, empaque y envío.'],
  [11.9, 'Viewers y ventas', 'Una sola gráfica, por fin.'],
  [16.8, '¿Cuánto te dejó?', 'Costo y ganancia del drop, sin Excel.'],
  [20.8, 'Pregúntale a tu IA', 'Contesta con tus números.'],
];
const PREGUNTA = '¿Qué vendí el viernes?';
const RESPUESTA = 'Vendiste 38 hoodies por $39,850. 23 fueron a subs (61%). El pico fue a las 8:04 pm, 4 minutos después de abrir el drop. Te quedan 12 piezas.';

function toma(t) {
  let a = TOMAS[0], b = TOMAS[TOMAS.length - 1];
  for (let i = 0; i < TOMAS.length - 1; i++) if (t >= TOMAS[i].t && t <= TOMAS[i + 1].t) { a = TOMAS[i]; b = TOMAS[i + 1]; break; }
  const k = suave(tramo(t, a.t, b.t)), l = (p) => (a[p] ?? 0) + ((b[p] ?? 0) - (a[p] ?? 0)) * k;
  return { fx: l('fx'), fy: l('fy'), z: l('z'), inc: l('inc') };
}
// Cursor: va hacia la siguiente opción del menú y da clic.
function cursor(t) {
  let x = 1100, y = 700;
  for (const c of CLICS) {
    if (t < c.t - 1.2) break;
    const k = suave(tramo(t, c.t - 1.1, c.t - 0.1));
    x = x + (150 - x) * k; y = y + (yMenu(c.k) - y) * k;
    if (t > c.t + 0.3) { const s = suave(tramo(t, c.t + 0.3, c.t + 1.1)); x = 150 + (1000 - 150) * s; y = yMenu(c.k) + (650 - yMenu(c.k)) * s; }
  }
  const clic = CLICS.find((c) => t >= c.t && t < c.t + 0.45);
  return { x, y, onda: clic ? tramo(t, clic.t, clic.t + 0.45) : 0 };
}
const vistaActual = (t) => CLICS.reduce((k, c) => (t >= c.t ? c.k : k), 0);

export const bloque = {
  dur: 26,
  montar: () => nodo(`<div class="panel dueno">
    <div class="marco-ventana">${VENTANA}</div>
    <div style="position:absolute;left:0;right:0;top:0;height:420px;background:linear-gradient(#050605 62%,#05060500)"></div>
    <div class="cabecera"><div class="titulo"></div><div class="sub"></div></div>
    <div class="tesis" style="position:absolute;left:0;right:0;bottom:0;padding:120px 70px 120px;background:linear-gradient(#05060500,#050605 40%);font:900 72px/1.08 Inter;color:#fff;letter-spacing:-1px">
      Kick no te da tus compradores. <span style="color:var(--neon)">Tu app sí.</span></div>
  </div>`),
  paso(t, n) {
    const c = toma(t), v = n.querySelector('.ventana');
    v.style.transform = `translate(${CENTRO.x - c.fx * c.z}px,${CENTRO.y - c.fy * c.z}px) scale(${c.z})`;
    n.querySelector('.marco-ventana').style.transform = `perspective(2200px) rotateX(${c.inc}deg)`;
    const txt = [...TEXTOS].reverse().find((x) => t >= x[0]), cab = n.querySelector('.cabecera');
    if (cab.dataset.t !== txt[1]) { cab.querySelector('.titulo').textContent = txt[1]; cab.querySelector('.sub').textContent = txt[2]; cab.dataset.t = txt[1]; }
    aparecer(cab, txt[0] === 0 ? tramo(t, 0, 0.4) : tramo(t, txt[0], txt[0] + 0.4));
    const tp = Math.min(tramo(t, 4.6, 5.2), 1 - tramo(t, 6.6, 6.9));
    aparecer(n.querySelector('.tesis'), tp); n.querySelector('.tesis').style.opacity = tp;

    const k = vistaActual(t);
    n.querySelectorAll('.dmenu').forEach((m) => { const on = +m.dataset.k === k; m.style.background = on ? 'var(--neon)' : 'transparent'; m.style.color = on ? '#000' : '#cfd6c8'; });
    n.querySelectorAll('.dvista').forEach((d) => {
      const i = +d.dataset.k, ent = CLICS.find((c) => c.k === i)?.t ?? 0;
      const on = i === k; d.style.display = on ? '' : 'none';
      if (on) d.style.opacity = i === 0 ? 1 : salida(tramo(t, ent, ent + 0.35));
    });
    const cu = cursor(t);
    n.querySelector('.cursor').style.transform = `translate(${cu.x}px,${cu.y}px)`;
    n.querySelector('.cursor').style.opacity = tramo(t, 5.6, 6) * (1 - tramo(t, 25.5, 26));
    const cl = n.querySelector('.clic'); cl.style.left = cu.x + 'px'; cl.style.top = cu.y + 'px';
    cl.style.opacity = cu.onda ? 1 - cu.onda : 0; cl.style.transform = `scale(${0.4 + cu.onda})`;

    if (k === 0) animarHoy(t, n);
    if (k === 1) animarPedidos(t - 7, n);
    if (k === 2) animarDrops(t - 11.9, n);
    if (k === 3) animarFinanzas(t - 16.8, n);
    if (k === 4) animarIA(t - 20.8, n);
  },
};

function animarHoy(t, n) {
  const p = salida(tramo(t, 1.4, 3.6));
  n.querySelector('.d-viewers').textContent = cifra(150 * p + (p >= 1 ? Math.round(Math.sin(t * 3) * 3) : 0));
  n.querySelector('.d-subs').textContent = cifra(40 * p);
  n.querySelector('.d-ventas').textContent = '$' + cifra(39850 * p);
  const ev = Math.floor(t / 0.9);
  n.querySelector('.d-eventos').innerHTML = [0, 1, 2, 3, 4].map((j) => {
    const e = EVENTOS[(ev - j + 60) % EVENTOS.length], f = j === 0 ? salida((t % 0.9) / 0.3) : 1;
    return `<div style="font:700 28px Inter;color:${j === 0 ? '#b6ff00' : '#cfd6c8'};padding:12px 0;border-bottom:1px solid #ffffff10;opacity:${f}">${e}</div>`;
  }).join('');
  const nv = Math.min(PEDIDOS.length, Math.floor(t / 0.75));
  n.querySelector('.d-feed').innerHTML = PEDIDOS.slice(0, nv).reverse().slice(0, 6).map(([num, q, , m], j) => {
    const f = j === 0 ? salida(((t / 0.75) % 1) / 0.4) : 1;
    return `<div style="display:flex;justify-content:space-between;align-items:center;height:84px;margin-bottom:10px;padding:0 22px;border-radius:18px;background:#1b2117;font:700 28px Inter;color:#fff;opacity:${f};transform:translateX(${(1 - f) * 60}px)">
      <span><b style="color:#b6ff00">${num}</b> ${q}</span><span>${m}</span></div>`;
  }).join('');
}

function animarPedidos(t, n) {
  n.querySelectorAll('.dfila').forEach((f) => { const i = +f.dataset.i, p = salida(tramo(t, i === 0 ? 0.6 : 0.1 + i * 0.06, (i === 0 ? 1.1 : 0.5 + i * 0.06)));
    f.style.opacity = p; f.style.transform = `translateY(${(1 - p) * (i === 0 ? -60 : 30)}px)`; });
  const e = n.querySelector('.dfila[data-i="0"] .destado'), paso = t < 1.6 ? 0 : t < 2.6 ? 1 : 2;
  e.textContent = ['Pagado', 'Empacado', 'Enviado'][paso];
  e.style.background = paso === 2 ? 'var(--neon)' : paso === 1 ? '#ffd23f' : '#ffffff14'; e.style.color = paso ? '#000' : '#fff';
  aparecer(n.querySelector('.d-guia'), tramo(t, 2.8, 3.3));
}

function animarDrops(t, n) {
  const l = n.querySelector('.d-linea'), largo = l.getTotalLength?.() || 2400;
  l.style.strokeDasharray = largo; l.style.strokeDashoffset = largo * (1 - salida(tramo(t, 0.4, 2.6)));
  n.querySelectorAll('.d-barra').forEach((b, i) => { const h = +b.dataset.h * salida(tramo(t, 1.2 + i * 0.05, 2 + i * 0.05)); b.setAttribute('height', h); b.setAttribute('y', 840 - h); });
}

function animarFinanzas(t, n) {
  const escala = 500 / 39850; let acumulado = 0;
  FINANZAS.forEach(([, v], i) => {
    const p = salida(tramo(t, 0.3 + i * 0.45, 0.9 + i * 0.45)), w = Math.abs(v) * escala * p;
    const bar = n.querySelector(`.d-wf[data-i="${i}"]`), num = n.querySelector(`.d-wfn[data-i="${i}"]`);
    const izq = i === 0 || i === 3 ? 0 : (acumulado + v) * escala;
    bar.style.left = `${420 + izq}px`; bar.style.width = `${w}px`;
    bar.style.background = i === 3 ? 'var(--neon)' : v < 0 ? '#ff8a7a' : '#ffffff';
    num.textContent = (v < 0 ? '−$' : '$') + cifra(Math.abs(v) * p); num.style.left = `${432 + izq + w}px`; num.style.top = `${150 + i * 170}px`;
    if (i < 3) acumulado += v;
  });
}

function animarIA(t, n) {
  const q = Math.floor(PREGUNTA.length * tramo(t, 0.3, 1.3)), yo = n.querySelector('.d-yo');
  yo.textContent = PREGUNTA.slice(0, q) || ' '; yo.style.opacity = t > 0.3 ? 1 : 0;
  n.querySelector('.d-ella').style.opacity = t > 1.6 ? 1 : 0;
  n.querySelector('.d-txt').textContent = RESPUESTA.slice(0, Math.floor(RESPUESTA.length * tramo(t, 1.8, 4.6)));
}
