/* Maqueta: salón. El plano se llena mesa por mesa, en la puerta se valida un
   código y la venta de la noche sube. Ciclo de 15 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, tramo, miles, COLOR } from './comun.js';

const DURACION = 15;
// mesas del plano: x, y, radio, si es VIP y en qué momento del ciclo se ocupan
const MESAS = [
  { x: 36, y: 62, r: 7, vip: false, en: .10 }, { x: 36, y: 92, r: 7, vip: false, en: .22 },
  { x: 36, y: 122, r: 7, vip: false, en: .40 }, { x: 62, y: 148, r: 7, vip: false, en: .52 },
  { x: 96, y: 148, r: 7, vip: false, en: .16 }, { x: 130, y: 148, r: 7, vip: false, en: .64 },
  { x: 164, y: 148, r: 7, vip: false, en: .34 }, { x: 190, y: 122, r: 7, vip: false, en: .76 },
  { x: 190, y: 92, r: 7, vip: false, en: .28 }, { x: 190, y: 62, r: 7, vip: false, en: .46 },
  { x: 84, y: 104, r: 9, vip: true, en: .06 }, { x: 113, y: 104, r: 9, vip: true, en: .58 },
  { x: 142, y: 104, r: 9, vip: true, en: .86 }
];

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Salón · plano en vivo');

  // muros y zonas
  svg.appendChild(el('rect', { x: 20, y: 40, width: 186, height: 130, rx: 8, stroke: COLOR.filo, 'stroke-width': 1, fill: 'rgba(186,214,247,.025)' }));
  svg.appendChild(el('rect', { x: 62, y: 48, width: 122, height: 14, rx: 4, fill: 'rgba(139,107,255,.22)', stroke: 'rgba(139,107,255,.4)' }));
  svg.appendChild(texto(123, 58, 'BARRA Y ESCENARIO', { tam: 4.8, color: COLOR.texto, mono: true, anclaje: 'middle', espaciado: .6 }));
  svg.appendChild(el('rect', { x: 24, y: 44, width: 26, height: 11, rx: 3, fill: 'rgba(186,215,247,.08)' }));
  svg.appendChild(texto(37, 52, 'ENTRADA', { tam: 4, color: COLOR.tenue, mono: true, anclaje: 'middle' }));

  // mesas
  const nodos = MESAS.map(m => {
    const c = el('circle', { cx: m.x, cy: m.y, r: m.r, fill: 'rgba(186,215,247,.06)', stroke: COLOR.filo, 'stroke-width': 1.2 });
    svg.appendChild(c);
    return c;
  });

  // lector de la puerta
  svg.appendChild(panel(216, 40, 92, 62, { rx: 7, fill: 'rgba(5,6,15,.72)' }));
  svg.appendChild(texto(225, 53, 'PUERTA', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const marcoQR = el('rect', { x: 225, y: 58, width: 26, height: 26, rx: 4, fill: 'rgba(186,215,247,.08)', stroke: COLOR.filo });
  svg.appendChild(marcoQR);
  // cuadritos que simulan el código
  const puntos = el('g', { fill: COLOR.texto, opacity: .85 });
  for (let i = 0; i < 16; i++) {
    if ((i * 7) % 5 < 2) continue;
    puntos.appendChild(el('rect', { x: 228 + (i % 4) * 6, y: 61 + Math.floor(i / 4) * 6, width: 4, height: 4, rx: 1 }));
  }
  svg.appendChild(puntos);
  const rayo = el('rect', { x: 225, y: 58, width: 26, height: 1.6, fill: COLOR.verde, opacity: .9 });
  svg.appendChild(rayo);
  const veredicto = texto(257, 68, '', { tam: 5.6, color: COLOR.verde, peso: 500 });
  svg.appendChild(veredicto);
  const tipoAcceso = texto(257, 78, '', { tam: 4.8, color: COLOR.tenue, mono: true });
  svg.appendChild(tipoAcceso);

  // venta de la noche
  svg.appendChild(panel(216, 110, 92, 60, { rx: 7, fill: 'rgba(5,6,15,.72)' }));
  svg.appendChild(texto(225, 123, 'VENTA DE LA NOCHE', { tam: 4.6, color: COLOR.tenue, mono: true, espaciado: .7 }));
  const venta = texto(225, 139, '$0', { tam: 11, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(venta);
  const ocupacion = texto(225, 152, '0 de 13 mesas', { tam: 5, color: COLOR.tenue });
  svg.appendChild(ocupacion);
  const personas = texto(225, 163, '0 personas adentro', { tam: 5, color: COLOR.tenue });
  svg.appendChild(personas);

  return {
    paso(t) {
      const p = ciclo(t, DURACION);

      let ocupadas = 0;
      nodos.forEach((c, i) => {
        const m = MESAS[i];
        const entra = suave(tramo(p, m.en, m.en + .07));
        if (entra > .5) ocupadas++;
        const color = m.vip ? '#e8c06a' : '#b6d9fc';
        c.setAttribute('fill', entra > .02 ? `rgba(${m.vip ? '232,192,106' : '182,217,252'},${.1 + entra * .5})` : 'rgba(186,215,247,.06)');
        c.setAttribute('stroke', entra > .02 ? color : 'rgba(186,215,247,.14)');
        c.setAttribute('r', String(m.r + entra * .8));
      });

      // el lector barre el código cada 2.4 s y da su veredicto
      const barrido = (t % 2.4) / 2.4;
      rayo.setAttribute('y', String(58 + 24 * barrido));
      rayo.setAttribute('opacity', String(barrido < .9 ? .9 : 0));
      const cual = Math.floor(t / 2.4) % 3;
      if (barrido > .85) {
        veredicto.textContent = 'Acceso válido';
        tipoAcceso.textContent = ['Mesa VIP · pagada', 'Cover · pagado', 'Cliente VIP'][cual];
      } else if (barrido < .1) {
        veredicto.textContent = '';
        tipoAcceso.textContent = '';
      }

      const total = 6000 + ocupadas * 9400 + Math.floor(p * 40) * 120;
      venta.textContent = `$${miles(total)}`;
      ocupacion.textContent = `${ocupadas} de ${MESAS.length} mesas`;
      personas.textContent = `${miles(ocupadas * 6 + Math.floor(p * 18))} personas adentro`;
    }
  };
}
