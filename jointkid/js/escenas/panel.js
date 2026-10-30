// Central del dueño: pantalla completa, oscuro, el neón solo como acento.
// Todo pasa el viernes del Drop 001. Cifras de meta, coherentes entre escenas:
// 38 piezas vendidas · $39,850 · 23 a subs (61%) · costo $14,440 · envíos y comisiones $5,210 · ganancia $20,200.
import { nodo, tramo, salida, aparecer, cifra, encabezado } from '../comun.js';

const base = (titulo, sub, cuerpo) => nodo(`<div class="panel">${encabezado(titulo, sub)}${cuerpo}</div>`);
const caja = (x, y, w, h, eti, num, extra = '') =>
  `<div class="caja" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${eti ? `<div class="eti">${eti}</div>` : ''}${num ?? ''}${extra}</div>`;
const correr = (el, valor, p, pre = '') => { el.textContent = pre + cifra(valor * salida(p)); };

// ---------- 4a · Hoy ----------
export const hoy = {
  dur: 6,
  montar: () => base('Tu viernes', 'Kick y tu marca, en una pantalla.', `
    ${caja(70, 400, 455, 300, 'KICK', '<div class="num" style="font-size:64px;white-space:nowrap;margin-top:40px"><span class="punto-vivo"></span>EN VIVO</div>')}
    ${caja(555, 400, 455, 300, 'VIEWERS AHORA', '<div class="num v">0</div>')}
    ${caja(70, 730, 455, 300, 'SUBS ACTIVAS', '<div class="num s">0</div>')}
    ${caja(555, 730, 455, 300, 'PIEZAS VENDIDAS', '<div class="num neon p">0</div>')}
    ${caja(70, 1060, 940, 330, 'VENTAS DE HOY', '<div class="num neon d" style="font-size:150px">$0</div>')}
    <div class="meta" style="left:70px;top:1420px">META · EJEMPLO</div>
    <div class="tesis" style="position:absolute;left:70px;right:70px;top:1540px;font:900 76px/1.08 Inter;color:#fff;letter-spacing:-1px">
      Kick no te da tus compradores. <span style="color:var(--neon)">Tu app sí.</span></div>`),
  paso(t, n) {
    const p = tramo(t, 0.3, 2.2);
    correr(n.querySelector('.v'), 150, p); correr(n.querySelector('.s'), 40, p);
    correr(n.querySelector('.p'), 38, p); correr(n.querySelector('.d'), 39850, p, '$');
    aparecer(n.querySelector('.tesis'), tramo(t, 2.8, 3.5));
  },
};

// ---------- 4b · La misma venta, del otro lado ----------
const PEDIDOS = [['023', '@fan', '$849'], ['024', '@lalo.mx', '$1,200'], ['025', '@vale_cdmx', '$999'], ['026', '@kiki.r', '$849']];
const ESTADOS = ['Pagado', 'Empacado', 'Enviado'];
export const pedido = {
  dur: 5,
  montar: () => base('La misma venta', 'Del lado del dueño: pedido, empaque y envío.', `
    ${PEDIDOS.map(([n, q, m], i) => `<div class="fila" style="position:absolute;left:70px;right:70px;top:${430 + i * 190}px;height:160px;border-radius:36px;
      background:${i ? 'var(--panel2)' : '#1b2412'};box-shadow:inset 0 0 0 ${i ? 2 : 4}px ${i ? 'var(--linea)' : 'var(--neon)'};display:flex;align-items:center;padding:0 46px;gap:30px;font:700 44px Inter">
      <span class="pixel" style="font:700 48px Pixel;color:var(--neon)">${n}</span><span style="flex:1">${q}</span><span>${m}</span></div>`).join('')}
    <div style="position:absolute;left:70px;right:70px;top:1230px;display:flex;gap:20px">
      ${ESTADOS.map((e) => `<div class="estado" style="flex:1;height:150px;border-radius:30px;display:grid;place-items:center;font:800 40px Inter">${e}</div>`).join('')}
    </div>
    <div class="guia" style="position:absolute;left:70px;right:70px;top:1420px;font:600 40px/1.4 Inter;color:#cfd6c8">
      Pieza 023 para @fan · guía MX-48213-CDMX · llega el martes</div>`),
  paso(t, n) {
    n.querySelectorAll('.fila').forEach((f, i) => aparecer(f, tramo(t, 0.1 + i * 0.12, 0.6 + i * 0.12)));
    const paso = t < 1.6 ? 0 : t < 2.8 ? 1 : 2;
    n.querySelectorAll('.estado').forEach((e, i) => {
      e.style.background = i <= paso ? 'var(--neon)' : 'var(--panel2)';
      e.style.color = i <= paso ? '#000' : '#fff6';
      e.textContent = (i <= paso ? '✓ ' : '') + ESTADOS[i];
    });
    aparecer(n.querySelector('.guia'), tramo(t, 3, 3.5));
  },
};

// ---------- 4c · Viewers y ventas en la misma gráfica ----------
// Viernes 7:00–10:00 pm, cada 10 min. Los viewers los guarda T.T desde el día que se conecta el canal.
const VIEWERS = [40, 62, 85, 104, 121, 138, 150, 146, 141, 133, 126, 112, 98, 84, 70, 58, 47, 38, 30];
const VENTAS = [0, 0, 0, 0, 0, 0, 9, 8, 6, 4, 3, 2, 2, 1, 1, 1, 1, 0, 0];
export const grafica = {
  dur: 5,
  montar: () => {
    const X = (i) => 110 + i * (860 / 18), Yv = (v) => 1340 - v * 4.4, Yb = (v) => v * 40;
    const linea = VIEWERS.map((v, i) => `${i ? 'L' : 'M'}${X(i)},${Yv(v)}`).join(' ');
    return base('Viewers y ventas', 'Viernes 7 a 10 pm. Viewers guardados por T.T desde que conectamos tu canal.', `
      <svg viewBox="0 0 1080 1920" style="position:absolute;inset:0">
        ${[0, 50, 100, 150].map((v) => `<line x1="110" x2="970" y1="${Yv(v)}" y2="${Yv(v)}" stroke="#ffffff14" stroke-width="2"/>
          <text x="90" y="${Yv(v) + 10}" fill="#8b8f88" font-size="28" font-family="Inter" text-anchor="end">${v}</text>`).join('')}
        ${VENTAS.map((v, i) => `<rect class="barra" data-h="${Yb(v)}" x="${X(i) - 16}" width="32" y="1340" height="0" rx="6" fill="#b6ff00"/>`).join('')}
        <path class="linea" d="${linea}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        <line class="marca" x1="${X(6)}" x2="${X(6)}" y1="560" y2="1340" stroke="#b6ff00" stroke-width="3" stroke-dasharray="10 10"/>
        ${['7 pm', '8 pm', '9 pm', '10 pm'].map((h, k) => `<text x="${X(k * 6)}" y="1400" fill="#8b8f88" font-size="30" font-family="Inter" text-anchor="middle">${h}</text>`).join('')}
      </svg>
      <div class="nota" style="position:absolute;left:${X(6) + 20}px;top:560px;font:700 38px/1.25 Inter;color:var(--neon)">8:00 pm<br><span style="color:#fff">abre el drop</span></div>
      <div style="position:absolute;left:70px;top:1480px;display:flex;gap:40px;font:600 38px Inter;color:#cfd6c8">
        <span><b style="color:#fff">━</b> viewers</span><span><b style="color:var(--neon)">■</b> piezas vendidas</span></div>
      <div class="meta" style="left:70px;top:1580px">META · EJEMPLO</div>`);
  },
  paso(t, n) {
    const l = n.querySelector('.linea'), largo = l.getTotalLength?.() || 2000, p = salida(tramo(t, 0.2, 2.4));
    l.style.strokeDasharray = largo; l.style.strokeDashoffset = largo * (1 - p);
    n.querySelectorAll('.barra').forEach((b, i) => {
      const h = +b.dataset.h * salida(tramo(t, 1 + i * 0.05, 1.8 + i * 0.05));
      b.setAttribute('height', h); b.setAttribute('y', 1340 - h);
    });
    aparecer(n.querySelector('.nota'), tramo(t, 1.6, 2.1));
  },
};

// ---------- 4d · Costo y ganancia del drop ----------
const FILAS = [['Ventas · 38 piezas', 39850, '#fff'], ['Producción', -14440, '#ff8a7a'], ['Envíos y comisiones', -5210, '#ff8a7a']];
export const ganancia = {
  dur: 4,
  montar: () => base('¿Cuánto te dejó?', 'Costo y ganancia del Drop 001, sin Excel.', `
    ${FILAS.map(([e], i) => caja(70, 420 + i * 230, 940, 200, e, `<div class="num f${i}" style="font-size:90px">$0</div>`)).join('')}
    ${caja(70, 1130, 940, 330, 'GANANCIA', '<div class="num neon g" style="font-size:160px">$0</div>', '<div class="eti" style="margin-top:10px">51% de margen</div>')}
    <div class="meta" style="left:70px;top:1500px">META · EJEMPLO</div>`),
  paso(t, n) {
    FILAS.forEach(([, v, c], i) => { const el = n.querySelector('.f' + i); el.style.color = c; el.textContent = (v < 0 ? '−$' : '$') + cifra(Math.abs(v) * salida(tramo(t, 0.2 + i * 0.25, 1 + i * 0.25))); });
    correr(n.querySelector('.g'), 20200, tramo(t, 1.2, 2.4), '$');
  },
};

// ---------- 4e · Pregúntale a la IA ----------
const PREGUNTA = '¿Qué vendí el viernes?';
const RESPUESTA = 'Vendiste 38 hoodies por $39,850. 23 fueron a subs (61%). El pico fue a las 8:04 pm, 4 minutos después de abrir el drop. Te quedan 12 piezas.';
export const ia = {
  dur: 6,
  montar: () => base('Pregúntale a tu IA', 'Contesta con tus números, no con suposiciones.', `
    <div class="burbuja yo" style="position:absolute;right:70px;top:460px;max-width:800px;border-radius:44px 44px 10px 44px;background:var(--neon);color:#000;padding:40px 50px;font:800 54px Inter"></div>
    <div class="burbuja ella" style="position:absolute;left:70px;right:120px;top:700px;border-radius:44px 44px 44px 10px;background:var(--panel2);box-shadow:inset 0 0 0 2px var(--linea);padding:46px 50px;font:600 50px/1.4 Inter;color:#fff">
      <div class="pixel" style="font:700 32px Pixel;color:var(--neon);margin-bottom:16px">IA de tu marca</div><span class="txt"></span></div>
    <div style="position:absolute;left:70px;right:70px;bottom:250px;height:130px;border-radius:40px;background:var(--panel2);box-shadow:inset 0 0 0 2px var(--linea);
      display:flex;align-items:center;padding:0 46px;font:600 42px Inter;color:#8b8f88">Pregunta lo que sea de tu negocio…</div>`),
  paso(t, n) {
    const yo = n.querySelector('.yo'), q = Math.floor(PREGUNTA.length * tramo(t, 0.2, 1.2));
    yo.textContent = PREGUNTA.slice(0, q) || ' '; yo.style.opacity = t > 0.2 ? 1 : 0;
    const ella = n.querySelector('.ella'); ella.style.opacity = t > 1.6 ? 1 : 0;
    n.querySelector('.txt').textContent = RESPUESTA.slice(0, Math.floor(RESPUESTA.length * tramo(t, 1.8, 4.6)));
  },
};
