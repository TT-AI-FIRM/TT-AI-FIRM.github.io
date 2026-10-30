// Reloj del video. Cada escena es un módulo con { dur, montar(), paso(t, nodo), hoodie(t) }.
// El tiempo manda: el mismo t siempre da el mismo cuadro, así el video se exporta cuadro por cuadro.
//   ?t=12.5   congela el video en ese segundo (para fotos y storyboard)
//   ?exportar  no arranca solo; el exportador llama window.irA(t)
import { montarHoodie, ponerHoodie } from './hoodie.js';
import { limitar } from './comun.js';
import * as campana from './escenas/campana.js';
import * as fan from './escenas/fan.js';
import * as stream from './escenas/stream.js';
import * as panel from './escenas/panel.js';

const ORDEN = [
  campana.entrada,
  fan.login, fan.drop, fan.ficha, fan.puntos, fan.pago, fan.coleccion,
  stream.envivo,
  panel.hoy, panel.pedido, panel.grafica, panel.ganancia, panel.ia,
  campana.rafaga, campana.cierre,
];
const CRUCE = 0.4; // segundos de fundido entre escenas

const escenario = document.getElementById('escenario');
const capa = document.getElementById('escenas');
let inicio = 0;
const escenas = ORDEN.map((e) => {
  const n = e.montar(); n.classList.add('escena'); capa.appendChild(n);
  const s = { ...e, nodo: n, ini: inicio, fin: inicio + e.dur }; inicio += e.dur; return s;
});
export const DURACION = inicio;

montarHoodie(document.getElementById('hoodie'));

function ajustar() {
  const k = Math.min(innerWidth / 1080, innerHeight / 1920);
  escenario.style.transform = `scale(${k}) translate(-50%, -50%)`;
}
addEventListener('resize', ajustar); ajustar();

function irA(t) {
  let pose = null;
  for (const s of escenas) {
    const local = t - s.ini;
    const dentro = local > -CRUCE && local < s.dur + CRUCE;
    if (!dentro) { s.nodo.style.opacity = 0; s.nodo.style.visibility = 'hidden'; continue; }
    const a = limitar(Math.min((local + CRUCE) / CRUCE, (s.dur + CRUCE - local) / CRUCE));
    const alfa = s.ini === 0 ? (local < s.dur ? 1 : a) : s.fin >= DURACION ? (local > 0 ? 1 : a) : a;
    s.nodo.style.visibility = 'visible'; s.nodo.style.opacity = alfa;
    s.paso(limitar(local, 0, s.dur), s.nodo);
    if (s.hoodie && local >= 0 && local < s.dur) pose = s.hoodie(local, s.nodo);
  }
  ponerHoodie(pose);
}
window.irA = irA;
window.DURACION = DURACION;

const q = new URLSearchParams(location.search);
document.fonts.ready.then(() => {
  if (q.has('t')) { irA(parseFloat(q.get('t'))); window.listo = true; return; }
  if (q.has('exportar')) { window.listo = true; return; }
  const t0 = performance.now();
  const cuadro = () => { irA(((performance.now() - t0) / 1000) % DURACION); requestAnimationFrame(cuadro); };
  cuadro(); window.listo = true;
});
