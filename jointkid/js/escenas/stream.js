// El stream conectado: overlay propio de T.T en OBS. No depende de la API de Kick:
// la compra la registra nuestra tienda y el overlay la pinta en el stream.
import { nodo, tramo, salida, USUARIO } from '../comun.js';

const COMPRAS = [
  { t: 0.6, quien: '@fan', pieza: '023' },
  { t: 3.6, quien: '@lalo.mx', pieza: '024' },
  { t: 6.4, quien: '@vale_cdmx', pieza: '025' },
];
const DESDE = 22, HASTA = 38, TOTAL = 50;

export const envivo = {
  dur: 10,
  montar: () => nodo(`<div class="oscuro">
    <div style="position:absolute;inset:0;background:
      radial-gradient(40% 30% at 30% 60%,#3a2a1a 0%,transparent 70%),radial-gradient(50% 35% at 75% 45%,#16301f 0%,transparent 70%),
      radial-gradient(60% 40% at 50% 85%,#202020 0%,transparent 70%),#0a0a0a;filter:blur(6px)"></div>
    <div class="grano" style="opacity:.3"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(#000d 0,#0000 26%,#0000 70%,#000c 100%)"></div>
    <div class="cabecera"><div class="titulo">Tu stream vende solo</div><div class="sub">Cada compra sale en pantalla, en vivo.</div></div>
    <div style="position:absolute;top:400px;left:70px;display:flex;gap:16px;align-items:center">
      <span class="chip" style="background:#e5262a;color:#fff">● EN VIVO</span>
      <span class="chip negro" style="background:#000a">@${USUARIO} · IRL · CDMX</span>
    </div>
    <div class="alerta" style="position:absolute;top:620px;left:90px;right:90px;border-radius:50px;background:#0c0f0a;box-shadow:0 0 0 4px #b6ff00,0 0 80px #b6ff0066;padding:50px 56px;color:#fff">
      <div class="pixel" style="font:700 40px Pixel;color:#b6ff00">Nueva compra</div>
      <div class="texto" style="font:900 78px/1.1 Inter;margin-top:14px"></div>
    </div>
    <div style="position:absolute;left:70px;right:70px;bottom:250px;color:#fff">
      <div style="display:flex;justify-content:space-between;align-items:baseline">
        <span class="pixel" style="font:700 48px Pixel;color:#b6ff00">Drop 001</span>
        <span class="cuenta pixel" style="font:700 64px Pixel"></span>
      </div>
      <div style="height:44px;border-radius:30px;background:#ffffff22;margin-top:20px;overflow:hidden">
        <div class="barra" style="height:100%;background:#b6ff00;box-shadow:0 0 30px #b6ff00"></div>
      </div>
      <div class="quedan" style="font:700 46px Inter;margin-top:24px"></div>
    </div>
    <div class="chip blanco" style="position:absolute;left:70px;bottom:120px;font-size:28px">Overlay de T.T en OBS</div>
  </div>`),
  paso(t, n) {
    let actual = COMPRAS[0];
    for (const c of COMPRAS) if (t >= c.t) actual = c;
    const local = t - actual.t, a = n.querySelector('.alerta');
    const entra = salida(tramo(local, 0, 0.35)), sale = tramo(local, 2.4, 2.8);
    a.style.opacity = t < COMPRAS[0].t ? 0 : entra * (1 - sale);
    a.style.transform = `translateY(${(1 - entra) * -60}px) scale(${0.94 + 0.06 * entra})`;
    a.querySelector('.texto').innerHTML = `${actual.quien} compró el hoodie <span style="color:#b6ff00">${actual.pieza}</span>`;
    const vendidas = Math.round(DESDE + (HASTA - DESDE) * salida(tramo(t, 0.6, 9)));
    n.querySelector('.cuenta').textContent = `${vendidas}/${TOTAL}`;
    n.querySelector('.barra').style.width = `${vendidas / TOTAL * 100}%`;
    n.querySelector('.quedan').textContent = `Quedan ${TOTAL - vendidas}`;
  },
};
