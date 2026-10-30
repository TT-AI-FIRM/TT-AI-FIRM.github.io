// Central del fan: un solo celular durante todo el bloque. Las pantallas se deslizan como en una app real
// y un dedo toca, arrastra y desliza. Una sola venta, la pieza 023, de principio a fin.
// Coordenadas de pantalla: 904×1664, con origen en (88, 418) del escenario.
import { nodo, tramo, salida, suave, resorte, aparecer, cifra } from '../comun.js';
import { PANTALLAS } from './fan-pantallas.js';

const SX = 88, SY = 418, SW = 904, CX = 540, CY = 1100;
// Cada corte abre la pantalla siguiente (deslizando desde la derecha).
const CORTES = [0, 2.4, 5, 10, 17, 22, 27, 31.3];
const TEXTOS = [
  ['Entra con Kick', 'Con tu cuenta del canal. Sin registrarte.'],
  ['Eres sub: precio de sub', 'La app sabe quién apoya el canal.'],
  ['Drop en vivo', 'Viernes 8 pm. Se anuncia en el stream.'],
  ['Gíralo. Póntelo enfrente.', 'Cada pieza numerada. AR en tu cuarto.'],
  ['Tus puntos valen', 'Canjeas en Kick. El cupón llega solo.'],
  ['Paga como quieras', 'Apple Pay, tarjeta u OXXO.'],
  ['Llega. La escaneas.', 'Original, y a tu nombre.'],
  ['Tu clóset digital', 'Todo lo que compras, en un lugar.'],
];
// Gestos del dedo: de (x0,y0) a (x1,y1) entre a y b; toca en `tap`; `arrastre` lo mueve de lado a lado.
const GESTOS = [
  { a: 0.5, b: 1.9, x0: 720, y0: 1350, x1: 452, y1: 970, tap: 1.6 },
  { a: 7.5, b: 8.7, x0: 760, y0: 1300, x1: 452, y1: 1005, tap: 8.3 },
  { a: 10.8, b: 13.7, x0: 300, y0: 860, arrastre: true },
  { a: 13.8, b: 14.5, x0: 640, y0: 1150, x1: 452, y1: 1355, tap: 14.3 },
  { a: 18.0, b: 18.9, x0: 700, y0: 700, x1: 452, y1: 250, tap: 18.7 },
  { a: 22.8, b: 23.6, x0: 720, y0: 1300, x1: 452, y1: 760, tap: 23.4 },
  { a: 23.6, b: 24.4, x0: 452, y0: 760, x1: 452, y1: 1320, tap: 24.2 },
  { a: 33.4, b: 34.7, x0: 720, y0: 950, x1: 180, y1: 900 },
];

const indice = (t) => { let i = 0; CORTES.forEach((c, k) => { if (t >= c) i = k; }); return i; };
const avance = (t) => { const i = indice(t); return i === 0 ? 1 : salida(tramo(t, CORTES[i], CORTES[i] + 0.55)); };
// Posición horizontal de cada pantalla: la nueva entra desde la derecha, la anterior se corre un poco.
function posVista(v, t) {
  const i = indice(t), p = avance(t);
  if (v === i) return (1 - p) * SW;
  if (v === i - 1 && p < 1) return -p * SW * 0.3;
  return null;
}
const camara = (t) => ({ s: 1 + 0.03 * (0.5 - 0.5 * Math.cos(t * 0.45)), dx: Math.sin(t * 0.7) * 6, dy: Math.sin(t * 1.2) * 8 });

function dedo(t) {
  for (const g of GESTOS) {
    if (t < g.a || t > g.b) continue;
    const vis = Math.min(tramo(t, g.a, g.a + 0.15), 1 - tramo(t, g.b - 0.15, g.b));
    let x, y;
    if (g.arrastre) { const k = tramo(t, g.a + 0.2, g.b - 0.2); x = g.x0 + Math.sin(k * Math.PI * 1.5) * 330; y = g.y0 + Math.sin(k * Math.PI * 3) * 20; }
    else { const k = suave(tramo(t, g.a, g.tap ? g.tap - 0.1 : g.b - 0.1)); x = g.x0 + (g.x1 - g.x0) * k; y = g.y0 + (g.y1 - g.y0) * k; }
    const toque = g.tap ? Math.max(0, 1 - Math.abs(t - g.tap) / 0.12) : g.arrastre ? 0.5 : 0;
    const onda = g.tap && t > g.tap ? tramo(t, g.tap, g.tap + 0.45) : 0;
    return { x, y, vis, toque, onda };
  }
  return null;
}

// Pose del hoodie en coordenadas de la pantalla, según la pantalla i.
function poseCruda(t, i) {
  if (i === 1) return { look: 'app', x: 452, y: 760, alto: 600, giro: 0.3 + t * 0.3, opacidad: tramo(t, 2.8, 3.3) };
  if (i === 2) return { look: 'noche', x: 452, y: 590 + scrollFeed(t), alto: 470, giro: -0.5 + t * 0.4 };
  if (i === 3) return t < 14.4
    ? { look: 'app', x: 452, y: 740, alto: 740, giro: giroArrastre(t) }
    : { look: 'app', x: 452, y: 930 - 420 * (1 - resorte(tramo(t, 14.5, 15.6))), alto: 600, giro: 0.4 + (t - 14.5) * 0.15, opacidad: tramo(t, 14.5, 14.8) };
  if (i === 7) {
    const negro = t > 34.1;
    const x = negro ? 452 + 300 * (1 - salida(tramo(t, 34.1, 34.6))) : 452 - 700 * salida(tramo(t, 33.6, 34.4));
    return { look: 'app', color: negro ? 0x1a1a1a : undefined, x, y: 960, alto: 620, giro: 0.3 + (t - 31) * 0.3, opacidad: tramo(t, 32.2, 32.7) };
  }
  return null;
}

// Rotación del hoodie mientras el dedo lo arrastra en la ficha.
const giroArrastre = (t) => 0.35 + Math.sin(tramo(t, 11, 13.5) * Math.PI * 1.5) * 1.7;

export const bloque = {
  dur: 36,
  montar: () => nodo(`<div class="claro fan">
    <div class="fondo-claro"></div><div class="reticula"></div>
    <div class="cabecera"><div class="titulo"></div><div class="sub"></div></div>
    <div class="tel"><div class="pantalla">
      ${PANTALLAS.map((h, i) => `<div class="vista" data-v="${i}">${h}</div>`).join('')}
      <div class="isla"></div>
      <div class="barra-estado"><span>9:41</span><span>●●● ▮</span></div>
      <div class="nav"><span>▦</span><span class="escaner">⌖</span><span>♨</span></div>
      <div class="dedo"><i></i></div>
    </div></div></div>`),
  paso(t, n) {
    const i = indice(t), c = camara(t);
    n.querySelector('.tel').style.transform = `translate(${c.dx}px,${c.dy}px) scale(${c.s})`;
    const [tit, sub] = TEXTOS[i], cab = n.querySelector('.cabecera');
    if (cab.dataset.i !== String(i)) { cab.querySelector('.titulo').textContent = tit; cab.querySelector('.sub').textContent = sub; cab.dataset.i = i; }
    aparecer(cab, i === 0 ? 1 : tramo(t, CORTES[i] + 0.1, CORTES[i] + 0.5));
    n.querySelectorAll('.vista').forEach((v) => {
      const x = posVista(+v.dataset.v, t);
      v.style.display = x === null ? 'none' : '';
      if (x !== null) { v.style.transform = `translateX(${x}px)`; v.style.filter = x < 0 ? `brightness(${1 + x / SW})` : ''; }
    });
    n.querySelector('.barra-estado').style.color = i === 6 ? '#fff' : '';
    const d = dedo(t), el = n.querySelector('.dedo');
    el.style.opacity = d ? d.vis : 0;
    if (d) {
      el.style.transform = `translate(${d.x - 55}px,${d.y - 55}px) scale(${1 - 0.18 * d.toque})`;
      const o = el.querySelector('i'); o.style.transform = `scale(${1 + d.onda * 1.6})`; o.style.opacity = d.onda ? 1 - d.onda : 0;
    }
    animarPantallas(t, n);
  },
  hoodie(t) {
    const i = indice(t), p = avance(t), c = camara(t);
    let v = i, pose = poseCruda(t, i);
    if (pose && p < 1) pose.opacidad = (pose.opacidad ?? 1) * tramo(p, 0.7, 1);
    if (!pose && p < 1 && i > 0) { // la pantalla anterior se sigue viendo mientras entra la nueva
      v = i - 1; pose = poseCruda(CORTES[i] - 0.001, v);
      if (pose) pose.opacidad = (pose.opacidad ?? 1) * (1 - p);
    }
    if (!pose) return null;
    const vx = posVista(v, t) ?? 0;
    return { ...pose, x: CX + (SX + vx + pose.x - CX) * c.s + c.dx, y: CY + (SY + pose.y - CY) * c.s + c.dy, alto: pose.alto * c.s };
  },
};

// ---------- lo que se mueve dentro de cada pantalla ----------
const scrollFeed = (t) => -760 * (1 - suave(tramo(t, 5.4, 6.9)));

function animarPantallas(t, n) {
  const q = (s) => n.querySelector(s);
  // 0 · login
  const conectando = t > 1.7;
  q('.b-kick').textContent = conectando ? 'Conectando con Kick…' : 'Entrar con Kick';
  // 1 · precio de sub
  aparecer(q('.chip-sub'), resorte(tramo(t, 2.8, 3.4)));
  q('.raya').style.width = `${100 * salida(tramo(t, 3.5, 3.9))}%`;
  q('.precio-sub').textContent = '$' + cifra(1200 - 201 * salida(tramo(t, 3.7, 4.4)));
  // 2 · feed y drop
  q('.feed').style.transform = `translateY(${scrollFeed(t)}px)`;
  const s = 2 * 86400 + 14 * 3600 + 7 * 60 + 33 - Math.floor(t * 3), d2 = (x) => String(x).padStart(2, '0');
  q('.reloj').textContent = `${d2(Math.floor(s / 86400))}:${d2(Math.floor(s / 3600) % 24)}:${d2(Math.floor(s / 60) % 60)}:${d2(s % 60)}`;
  const avisado = t > 8.3, b = q('.b-aviso');
  b.textContent = avisado ? '✓ Te avisamos' : 'Avísame cuando abra'; b.className = 'boton b-aviso ' + (avisado ? 'neon' : 'blanco');
  const toast = q('.toast'); const tp = Math.min(salida(tramo(t, 8.6, 9)), 1 - tramo(t, 9.6, 9.9));
  toast.style.transform = `translateY(${-260 * (1 - tp)}px)`;
  // 3 · ficha y AR
  q('.ar').style.opacity = tramo(t, 14.4, 14.7);
  aparecer(q('.chip-pieza'), resorte(tramo(t, 10.6, 11.2)));
  q('.reticulo').style.opacity = t > 14.5 ? 1 - tramo(t, 15.4, 15.9) : 0;
  q('.sombra').style.opacity = 0.5 * salida(tramo(t, 14.9, 15.6));
  // 4 · cartera
  q('.banner').style.transform = `translateY(${-300 * (1 - salida(tramo(t, 17.6, 18.1))) - (t > 18.8 ? 300 * tramo(t, 18.8, 19.1) : 0)}px)`;
  const giro = 90 * (1 - salida(tramo(t, 19, 19.8)));
  q('.cupon').style.transform = `perspective(1200px) rotateY(${giro}deg)`; q('.cupon').style.opacity = t > 19 ? 1 : 0;
  const pf = tramo(t, 20, 21.6);
  q('.pulso').style.left = `${8 + pf * 84}%`; q('.pulso').style.opacity = pf > 0 && pf < 1 ? 1 : 0;
  aparecer(q('.flujo'), tramo(t, 19.8, 20.2));
  // 5 · pago
  const elegido = t > 23.4;
  q('.m-apple').style.boxShadow = `inset 0 0 0 ${elegido ? 6 : 3}px #111`;
  q('.hoja').style.transform = `translateY(${700 * (1 - salida(tramo(t, 24.3, 24.7)))}px)`;
  q('.anillo').style.transform = `rotate(${t * 400}deg)`;
  const ex = tramo(t, 25.2, 25.5); q('.exito').style.opacity = ex;
  q('.exito .check').style.transform = `scale(${resorte(tramo(t, 25.2, 26))})`;
  rafagaDePuntos(q('.confeti'), tramo(t, 25.25, 26.6));
  // 6 · escaneo NFC
  q('.etiqueta').style.transform = `translateY(${500 * (1 - salida(tramo(t, 27.4, 28.6)))}px)`;
  q('.ondas').innerHTML = [0, 1, 2].map((k) => { const f = (t * 1.1 + k / 3) % 1; const fuerza = tramo(t, 27.8, 28.6) * (1 - tramo(t, 29, 29.3));
    return `<div style="position:absolute;left:${-f * 320}px;top:${-f * 320}px;width:${f * 640}px;height:${f * 640}px;border-radius:50%;border:6px solid #b6ff00;opacity:${(1 - f) * fuerza}"></div>`; }).join('');
  q('.original').style.transform = `scale(${resorte(tramo(t, 29, 29.8))})`; q('.original').style.opacity = t > 29 ? 1 : 0;
  rafagaDePuntos(q('.confeti2'), tramo(t, 29.05, 30.3));
  // 7 · clóset
  n.querySelectorAll('.pila').forEach((el, k) => { const p = salida(tramo(t, 31.6 + k * 0.1, 32.2 + k * 0.1)); el.style.transform = `translateY(${(1 - p) * 500}px)`; el.style.opacity = p; });
  const sw = salida(tramo(t, 33.6, 34.4));
  q('.frente').style.transform = `translateX(${-sw * 900}px) rotate(${-sw * 12}deg)`;
  q('.segunda').style.transform = `scale(${0.92 + 0.08 * salida(tramo(t, 33.8, 34.6))})`;
  aparecer(q('.frente'), salida(tramo(t, 31.9, 32.5)));
  q('.cuenta-closet').textContent = t > 34.1 ? '011 / 50 · Drop 000' : '023 / 50 · Drop 001';
}

// Confeti neón determinista (el mismo t da el mismo cuadro).
function rafagaDePuntos(el, p) {
  if (!el.children.length) el.innerHTML = Array.from({ length: 36 }, () => '<b></b>').join('');
  [...el.children].forEach((b, k) => {
    const a = k * 2.399, v = 280 + (k * 97 % 260), e = salida(p);
    b.style.transform = `translate(${Math.cos(a) * v * e}px,${Math.sin(a) * v * e + 220 * p * p}px) rotate(${k * 40 + p * 300}deg)`;
    b.style.opacity = p > 0 && p < 1 ? 1 - p * p : 0;
  });
}
