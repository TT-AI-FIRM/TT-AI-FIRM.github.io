// Capa de campaña: noche, grano y neón. Entrada, ráfaga de lo que sigue y cierre.
import { nodo, tramo, salida, aparecer } from '../comun.js';

// ---------- 1 · Entrada: partículas forman T.T AI FIRM, × y la moneda 3D con el logo del canal ----------
let puntos = null;
function muestrearTexto() {
  const c = document.createElement('canvas'); c.width = 1080; c.height = 300;
  const g = c.getContext('2d'); g.fillStyle = '#fff'; g.font = '900 136px Pixel'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('T.T AI FIRM', 540, 150);
  const d = g.getImageData(0, 0, 1080, 300).data, out = [];
  let semilla = 11; const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;
  for (let y = 0; y < 300; y += 6) for (let x = 0; x < 1080; x += 6)
    if (d[(y * 1080 + x) * 4 + 3] > 128) out.push({ x, y: y + 260, sx: azar() * 1080, sy: azar() * 1920, tam: 3 + azar() * 3 });
  return out;
}

export const entrada = {
  dur: 6,
  montar: () => nodo(`<div class="oscuro">
    <div class="fondo-noche"></div><canvas class="particulas" width="1080" height="1920" style="position:absolute;inset:0"></canvas><div class="grano"></div>
    <div class="por" style="position:absolute;left:0;right:0;top:560px;text-align:center;font:400 110px Inter;color:#fff">×</div>
    <div class="canal" style="position:absolute;left:0;right:0;top:1290px;text-align:center">
      <div style="font:900 84px Inter;color:#fff;letter-spacing:-1px">jointkidkick</div>
      <span class="chip" style="background:#53fc18;color:#000;margin-top:18px">kick.com/jointkidkick</span>
    </div>
    <div class="lema" style="position:absolute;left:70px;right:70px;bottom:150px;text-align:center">
      <div class="pixel" style="font:700 60px/1.15 Pixel;color:#fff">Tu marca.<br>Tu comunidad.</div>
      <div class="pixel" style="font:700 60px/1.15 Pixel;color:var(--neon);margin-top:8px">Un solo lugar.</div>
    </div></div>`),
  paso(t, n) {
    puntos ??= muestrearTexto();
    const g = n.querySelector('.particulas').getContext('2d');
    g.clearRect(0, 0, 1080, 1920);
    const junta = salida(tramo(t, 0, 1.8));
    g.fillStyle = '#ffffff'; g.shadowColor = '#b6ff00'; g.shadowBlur = 10 * (1 - junta) + 4;
    for (const p of puntos) {
      g.globalAlpha = 0.3 + 0.7 * junta;
      g.fillRect(p.sx + (p.x - p.sx) * junta, p.sy + (p.y - p.sy) * junta, p.tam, p.tam);
    }
    g.globalAlpha = 1;
    aparecer(n.querySelector('.por'), tramo(t, 1.8, 2.3));
    aparecer(n.querySelector('.canal'), tramo(t, 3, 3.6));
    aparecer(n.querySelector('.lema'), tramo(t, 4, 4.7));
  },
  hoodie: (t) => t < 2.2 ? null : {
    objeto: 'logo', x: 540, y: 1000, alto: 480 * (0.6 + 0.4 * salida(tramo(t, 2.2, 3.2))),
    giro: (1 - salida(tramo(t, 2.2, 3.6))) * Math.PI * 3 + Math.sin(t * 1.6) * 0.25, inclina: -0.08, opacidad: tramo(t, 2.2, 2.6),
  },
};

// ---------- 5 · Ráfaga: ideas que todavía no desarrollamos ----------
const IDEAS = [
  { tit: 'Pop-up en CDMX', txt: 'Check-in con QR en la puerta. Cada visita suma a tu cuenta de fan.', icono: '⌖' },
  { tit: 'Vota el próximo diseño', txt: 'La comunidad elige. El ganador sale en el siguiente drop.', icono: '✓' },
  { tit: 'Catálogo 3D sin fotógrafo', txt: 'Cada prenda nace en 3D: mismos modelos para la tienda, la app y el AR.', icono: '◆' },
];
const COLORES = [0x1a1a1a, 0xe9e7e1, 0x6b7f3a, 0x8d93a8];

export const rafaga = {
  dur: 6,
  montar: () => nodo(`<div class="oscuro">
    <div class="fondo-noche"></div><div class="grano"></div>
    <div class="cabecera"><div class="titulo">Lo que sigue</div><div class="sub">Ideas que ya sabemos construir.</div></div>
    ${IDEAS.map((i, k) => `<div class="idea" data-k="${k}" style="position:absolute;left:70px;right:70px;top:520px;height:1120px;border-radius:60px;
      background:#11160e;box-shadow:inset 0 0 0 3px #b6ff0033;padding:80px;color:#fff">
      <div style="font:700 150px Pixel;color:var(--neon)">${i.icono}</div>
      <div class="pixel" style="font:700 90px/1.05 Pixel;margin-top:40px">${i.tit}</div>
      <div style="font:600 50px/1.3 Inter;color:#cfd6c8;margin-top:40px;max-width:820px">${i.txt}</div>
      <div class="pixel" style="position:absolute;bottom:70px;left:80px;font:700 40px Pixel;color:#fff6">0${k + 1} / 03</div>
    </div>`).join('')}</div>`),
  paso(t, n) {
    n.querySelectorAll('.idea').forEach((el, k) => {
      const a = tramo(t, k * 2, k * 2 + 0.35), b = k < 2 ? tramo(t, k * 2 + 1.75, k * 2 + 2) : 0;
      el.style.opacity = a * (1 - b);
      el.style.transform = `translateX(${(1 - salida(a)) * 300 - b * 300}px)`;
    });
  },
  hoodie: (t) => t < 4.2 ? null : {
    look: 'noche', color: COLORES[Math.floor((t - 4.2) / 0.45) % 4], x: 820, y: 1480, alto: 300, giro: t * 1.4, opacidad: tramo(t, 4.2, 4.5),
  },
};

// ---------- 5b · Cierre ----------
export const cierre = {
  dur: 6,
  montar: () => nodo(`<div class="oscuro">
    <div class="fondo-noche"></div><div class="grano"></div>
    <div class="frase" style="position:absolute;left:70px;right:70px;top:1150px;text-align:center">
      <div style="font:900 96px/1.05 Inter;color:#fff;letter-spacing:-2px">Esto es el arranque.</div>
      <div style="font:900 96px/1.05 Inter;color:var(--neon);letter-spacing:-2px;margin-top:20px">Lo demás lo construimos juntos.</div>
    </div>
    <div class="marca" style="position:absolute;left:0;right:0;bottom:200px;text-align:center;color:#fff">
      <div style="font:800 64px Inter;letter-spacing:6px">T.T AI FIRM</div>
      <div style="font:600 34px Inter;color:#fff9;margin-top:14px;letter-spacing:2px">ttfirm.ai</div>
      <div style="font:400 22px Inter;color:#fff6;margin-top:40px">Música: “Voltaic”, Kevin MacLeod (incompetech.com) · CC BY 4.0</div>
    </div></div>`),
  paso(t, n) {
    aparecer(n.querySelector('.frase'), tramo(t, 0.3, 1.2));
    aparecer(n.querySelector('.marca'), tramo(t, 1.6, 2.4));
  },
  hoodie: (t) => ({ look: 'noche', x: 540, y: 640, alto: 760, giro: 0.4 + t * 0.35 }),
};
