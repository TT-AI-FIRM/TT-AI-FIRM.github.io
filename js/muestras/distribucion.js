/* Maqueta: distribución. Los pedidos del piso se van surtiendo, sube el contador
   del día y las rutas van saliendo una por una. Ciclo de 15 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, tramo, miles, COLOR } from './comun.js';

const DURACION = 15;
const PEDIDOS = [
  { clave: 'PD-2481', destino: 'Centro · 42 cajas', desde: .02, hasta: .46 },
  { clave: 'PD-2482', destino: 'Norte · 18 cajas',  desde: .10, hasta: .58 },
  { clave: 'PD-2483', destino: 'Bajío · 63 cajas',  desde: .22, hasta: .78 },
  { clave: 'PD-2484', destino: 'Sur · 27 cajas',    desde: .34, hasta: .94 }
];

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Distribución · surtido de hoy');

  // pedidos en piso
  svg.appendChild(panel(10, 24, 176, 118, { rx: 6 }));
  svg.appendChild(texto(18, 36, 'PEDIDOS EN PISO', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));

  const filas = PEDIDOS.map((p, i) => {
    const y = 52 + i * 22;
    svg.appendChild(texto(18, y, p.clave, { tam: 5.4, color: COLOR.titulo, peso: 500, mono: true }));
    svg.appendChild(texto(58, y, p.destino, { tam: 5, color: COLOR.tenue }));
    svg.appendChild(el('rect', { x: 18, y: y + 4, width: 132, height: 3.4, rx: 1.7, fill: 'rgba(186,215,247,.12)' }));
    const barra = el('rect', { x: 18, y: y + 4, width: 0, height: 3.4, rx: 1.7, fill: COLOR.azul });
    const dato = texto(178, y + 1, '0%', { tam: 5, color: COLOR.tenue, mono: true, anclaje: 'end' });
    svg.appendChild(barra); svg.appendChild(dato);
    return { ...p, barra, dato };
  });

  // surtidos del día
  svg.appendChild(panel(196, 24, 114, 54, { rx: 6 }));
  svg.appendChild(texto(204, 38, 'SURTIDOS HOY', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const surtidos = texto(204, 60, '0', { tam: 15, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(surtidos);
  svg.appendChild(texto(204, 70, 'de 186 del programa', { tam: 4.6, color: COLOR.tenue }));

  // entregas a tiempo
  svg.appendChild(panel(196, 86, 114, 56, { rx: 6 }));
  svg.appendChild(texto(204, 100, 'ENTREGAS A TIEMPO', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const aTiempo = texto(204, 120, '0%', { tam: 13, color: COLOR.verde, peso: 500, mono: true });
  svg.appendChild(aTiempo);
  svg.appendChild(el('rect', { x: 204, y: 128, width: 98, height: 3.4, rx: 1.7, fill: 'rgba(186,215,247,.12)' }));
  const barraTiempo = el('rect', { x: 204, y: 128, width: 0, height: 3.4, rx: 1.7, fill: COLOR.verde });
  svg.appendChild(barraTiempo);

  // rutas que van saliendo
  svg.appendChild(panel(10, 150, 300, 40, { rx: 6 }));
  svg.appendChild(texto(18, 163, 'RUTAS DE HOY', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const rutas = ['R-01', 'R-02', 'R-03', 'R-04', 'R-05', 'R-06'].map((nombre, i) => {
    const x = 18 + i * 48;
    const caja = el('rect', { x, y: 168, width: 42, height: 15, rx: 4, fill: 'rgba(186,215,247,.07)', stroke: COLOR.filo, 'stroke-width': 1 });
    const letra = texto(x + 21, 178, nombre, { tam: 5.2, color: COLOR.tenue, mono: true, anclaje: 'middle' });
    svg.appendChild(caja); svg.appendChild(letra);
    return { caja, letra };
  });

  return {
    paso(t) {
      const p = ciclo(t, DURACION);

      let listos = 0;
      for (const f of filas) {
        const avance = suave(tramo(p, f.desde, f.hasta));
        f.barra.setAttribute('width', String(132 * avance));
        f.dato.textContent = `${Math.round(avance * 100)}%`;
        f.dato.setAttribute('fill', avance >= 1 ? COLOR.verde : COLOR.tenue);
        if (avance >= 1) listos++;
      }

      surtidos.textContent = miles(128 + listos * 9 + suave(p) * 12);

      const puntual = 93 + Math.sin(t * .6) * 3;
      aTiempo.textContent = `${Math.round(puntual)}%`;
      barraTiempo.setAttribute('width', String(98 * puntual / 100));

      rutas.forEach((r, i) => {
        const salio = p > .1 + i * .13;
        r.caja.setAttribute('fill', salio ? 'rgba(139,107,255,.22)' : 'rgba(186,215,247,.07)');
        r.caja.setAttribute('stroke', salio ? 'rgba(139,107,255,.6)' : COLOR.filo);
        r.letra.setAttribute('fill', salio ? COLOR.titulo : COLOR.tenue);
      });
    }
  };
}
