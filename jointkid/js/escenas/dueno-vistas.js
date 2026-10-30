// Maquetado de la Central del dueño: una ventana de escritorio de 1500×1000.
// Cifras de meta, coherentes entre vistas: 38 piezas · $39,850 · 23 a subs (61%) · costo $14,440 ·
// envíos y comisiones $5,210 · ganancia $20,200. Lo que se mueve vive en dueno.js.
import { USUARIO } from '../comun.js';

export const MENU = ['Hoy', 'Pedidos', 'Drops', 'Finanzas', 'IA'];
export const yMenu = (k) => 150 + k * 96 + 38; // centro de cada opción del menú

const caja = (x, y, w, h, html, extra = '') =>
  `<div class="dcaja" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;${extra}">${html}</div>`;
const eti = (t) => `<div class="deti">${t}</div>`;

export const PEDIDOS = [['023', '@fan', 'Hoodie · sub', '$849'], ['022', '@tono.gdl', 'Hoodie', '$1,200'], ['021', '@kiki.r', 'Hoodie · sub', '$849'],
  ['020', '@lalo.mx', 'Hoodie', '$1,200'], ['019', '@vale_cdmx', 'Hoodie · sub', '$999'], ['018', '@mau.mtz', 'Hoodie', '$1,200']];
export const EVENTOS = ['Nueva sub · @kiki.r', 'Canje de puntos · @fan', '500 kicks · @tono.gdl', 'Sub regalada · @mau.mtz', 'Nuevo follow · @dany', 'Canje de puntos · @vale_cdmx'];
export const VIEWERS = [40, 62, 85, 104, 121, 138, 150, 146, 141, 133, 126, 112, 98, 84, 70, 58, 47, 38, 30];
export const VENTAS = [0, 0, 0, 0, 0, 0, 9, 8, 6, 4, 3, 2, 2, 1, 1, 1, 1, 0, 0];

const vistaHoy = `
  ${caja(320, 96, 265, 200, `${eti('KICK')}<div class="dnum" style="font-size:44px;margin-top:34px"><span class="punto-vivo"></span>EN VIVO</div>`)}
  ${caja(607, 96, 265, 200, `${eti('VIEWERS')}<div class="dnum d-viewers">0</div>`)}
  ${caja(894, 96, 265, 200, `${eti('SUBS ACTIVAS')}<div class="dnum d-subs">0</div>`)}
  ${caja(1181, 96, 289, 200, `${eti('VENTAS HOY')}<div class="dnum neon d-ventas">$0</div>`)}
  ${caja(320, 320, 560, 640, `
    <div style="position:absolute;left:0;right:0;top:0;height:320px;border-radius:26px 26px 0 0;background:radial-gradient(50% 60% at 30% 60%,#3a2a1a,transparent),radial-gradient(50% 60% at 75% 40%,#16301f,transparent),#0a0a0a"></div>
    <span class="chip" style="position:absolute;top:24px;left:24px;background:#e5262a;color:#fff;font-size:24px;padding:8px 18px">● EN VIVO</span>
    <div style="position:absolute;top:250px;left:26px;font:800 30px Inter;color:#fff">@${USUARIO} · IRL CDMX · Drop 001</div>
    <div style="position:absolute;top:340px;left:26px">${eti('EVENTOS DE KICK, EN VIVO')}</div>
    <div class="d-eventos" style="position:absolute;top:390px;left:26px;right:26px;bottom:20px;overflow:hidden"></div>`)}
  ${caja(904, 320, 566, 640, `${eti('VENTAS EN VIVO · DESDE TU APP')}<div class="d-feed" style="position:absolute;top:80px;left:26px;right:26px;bottom:20px;overflow:hidden"></div>`)}`;

const vistaPedidos = `
  ${caja(320, 96, 1150, 864, `
    <div style="display:grid;grid-template-columns:110px 1fr 1fr 150px 230px;gap:10px;font:700 24px Inter;color:#8b8f88;padding:6px 10px 20px">
      <span>PIEZA</span><span>FAN</span><span>PRODUCTO</span><span>TOTAL</span><span>ESTADO</span></div>
    <div class="d-tabla" style="position:relative">${PEDIDOS.map(([n, q, p, m], i) => `
      <div class="dfila" data-i="${i}" style="display:grid;grid-template-columns:110px 1fr 1fr 150px 230px;gap:10px;align-items:center;height:96px;padding:0 10px;margin-bottom:10px;border-radius:20px;font:700 32px Inter;color:#fff;
        background:${i ? '#151a13' : '#1b2412'};box-shadow:inset 0 0 0 ${i ? 1 : 3}px ${i ? '#ffffff14' : '#b6ff00'}">
        <span style="color:#b6ff00;font-weight:800">${n}</span><span>${q}</span><span style="color:#cfd6c8">${p}</span><span>${m}</span>
        <span class="destado" style="justify-self:start;padding:10px 20px;border-radius:30px;font-size:26px;background:#ffffff14">${i < 3 ? 'Pagado' : 'Enviado'}</span></div>`).join('')}
    </div>
    <div class="d-guia" style="position:absolute;left:30px;right:30px;bottom:30px;font:600 30px Inter;color:#cfd6c8">Pieza 023 para @fan · guía MX-48213-CDMX · llega el martes</div>`)}`;

const X = (i) => 420 + i * (560 / 18) * 1.8, Yv = (v) => 840 - v * 3.6, Yb = (v) => v * 34;
const vistaDrops = `
  ${caja(320, 96, 1150, 864, `${eti('VIERNES 7 A 10 PM · VIEWERS Y PIEZAS VENDIDAS')}
    <svg viewBox="320 96 1150 864" style="position:absolute;inset:0;width:100%;height:100%">
      ${[0, 50, 100, 150].map((v) => `<line x1="400" x2="1430" y1="${Yv(v)}" y2="${Yv(v)}" stroke="#ffffff14" stroke-width="2"/>
        <text x="385" y="${Yv(v) + 9}" fill="#8b8f88" font-size="24" font-family="Inter" text-anchor="end">${v}</text>`).join('')}
      ${VENTAS.map((v, i) => `<rect class="d-barra" data-h="${Yb(v)}" x="${X(i) - 14}" width="28" y="840" height="0" rx="5" fill="#b6ff00"/>`).join('')}
      <path class="d-linea" d="${VIEWERS.map((v, i) => `${i ? 'L' : 'M'}${X(i)},${Yv(v)}`).join(' ')}" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
      <line x1="${X(6)}" x2="${X(6)}" y1="250" y2="840" stroke="#b6ff00" stroke-width="3" stroke-dasharray="10 10"/>
      <text x="${X(6) + 16}" y="270" fill="#b6ff00" font-size="30" font-weight="800" font-family="Inter">8:00 pm · abre el drop</text>
      ${['7 pm', '8 pm', '9 pm', '10 pm'].map((h, k) => `<text x="${X(k * 6)}" y="890" fill="#8b8f88" font-size="26" font-family="Inter" text-anchor="middle">${h}</text>`).join('')}
    </svg>
    <div style="position:absolute;right:40px;top:120px;text-align:right">${eti('DROP 001')}<div class="dnum neon" style="font-size:80px">38/50</div></div>
    <div style="position:absolute;left:40px;bottom:24px;font:600 24px Inter;color:#8b8f88">Kick no guarda historial de viewers: T.T los registra desde el día que se conecta tu canal.</div>`)}`;

export const FINANZAS = [['Ventas · 38 piezas', 39850], ['Producción', -14440], ['Envíos y comisiones', -5210], ['Ganancia', 20200]];
const vistaFinanzas = `
  ${caja(320, 96, 1150, 864, `${eti('DROP 001 · COSTO Y GANANCIA')}
    ${FINANZAS.map(([e], i) => `<div style="position:absolute;left:40px;top:${150 + i * 170}px;width:360px;font:700 32px Inter;color:${i === 3 ? '#b6ff00' : '#cfd6c8'}">${e}</div>
      <div class="d-wf" data-i="${i}" style="position:absolute;top:${140 + i * 170}px;height:70px;border-radius:14px"></div>
      <div class="d-wfn" data-i="${i}" style="position:absolute;top:${222 + i * 170}px;left:40px;font:800 ${i === 3 ? 64 : 44}px Inter;color:${i === 3 ? '#b6ff00' : '#fff'}"></div>`).join('')}
    <div style="position:absolute;right:40px;bottom:40px;font:800 40px Inter;color:#b6ff00">51% de margen</div>`)}`;

const vistaIA = `
  ${caja(320, 96, 1150, 864, `${eti('IA DE TU MARCA · CON TUS DATOS')}
    <div class="d-yo" style="position:absolute;right:40px;top:110px;border-radius:36px 36px 8px 36px;background:#b6ff00;color:#000;padding:30px 40px;font:800 46px Inter"></div>
    <div class="d-ella" style="position:absolute;left:40px;right:160px;top:290px;border-radius:36px 36px 36px 8px;background:#1b2117;box-shadow:inset 0 0 0 2px #ffffff14;padding:36px 40px;font:600 42px/1.45 Inter;color:#fff"><span class="d-txt"></span></div>
    <div style="position:absolute;left:40px;right:40px;bottom:36px;height:100px;border-radius:30px;background:#151a13;box-shadow:inset 0 0 0 2px #ffffff14;display:flex;align-items:center;padding:0 36px;font:600 32px Inter;color:#8b8f88">Pregunta lo que sea de tu negocio…</div>`)}`;

export const VENTANA = `
  <div class="ventana">
    <div style="position:absolute;left:0;right:0;top:0;height:64px;border-bottom:1px solid #ffffff14;display:flex;align-items:center;gap:14px;padding:0 26px">
      <i style="width:18px;height:18px;border-radius:50%;background:#ff5f57"></i><i style="width:18px;height:18px;border-radius:50%;background:#febc2e"></i><i style="width:18px;height:18px;border-radius:50%;background:#28c840"></i>
      <span style="flex:1;text-align:center;font:700 24px Inter;color:#8b8f88;margin-right:80px">Central del dueño · TU MARCA × @${USUARIO}</span></div>
    <div style="position:absolute;left:0;top:64px;bottom:0;width:290px;border-right:1px solid #ffffff14">
      <div style="padding:28px 30px 0;font:900 34px Inter;color:#fff">T.T <span style="color:#b6ff00">·</span> Central</div>
      ${MENU.map((m, k) => `<div class="dmenu" data-k="${k}" style="position:absolute;left:20px;right:20px;top:${150 + k * 96 - 64}px;height:76px;border-radius:20px;display:flex;align-items:center;padding:0 26px;font:800 32px Inter">${m}</div>`).join('')}
    </div>
    <div class="dvista" data-k="0">${vistaHoy}</div><div class="dvista" data-k="1">${vistaPedidos}</div><div class="dvista" data-k="2">${vistaDrops}</div>
    <div class="dvista" data-k="3">${vistaFinanzas}</div><div class="dvista" data-k="4">${vistaIA}</div>
    <svg class="cursor" width="44" height="60" viewBox="0 0 22 30" style="position:absolute;left:0;top:0"><path d="M1 1 L1 25 L7 19 L11 29 L15 27 L11 18 L19 18 Z" fill="#fff" stroke="#000" stroke-width="1.5"/></svg>
    <div class="clic" style="position:absolute;width:80px;height:80px;margin:-40px 0 0 -40px;border-radius:50%;border:5px solid #b6ff00;opacity:0"></div>
  </div>`;
