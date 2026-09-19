/* Maqueta: campaña de marketing y leads. El embudo se llena de arriba abajo,
   sube el contador de leads del día y baja el costo por lead. Ciclo de 17 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, tramo, miles, COLOR } from './comun.js';

const DURACION = 17;
const EMBUDO = [
  { nombre: 'Vieron el anuncio', valor: 18420, ancho: 1.00, color: 'rgba(182,217,252,.55)' },
  { nombre: 'Entraron',          valor: 4126,  ancho: .62,  color: 'rgba(139,107,255,.62)' },
  { nombre: 'Dejaron sus datos', valor: 612,   ancho: .34,  color: 'rgba(139,107,255,.85)' },
  { nombre: 'Agendaron cita',    valor: 148,   ancho: .17,  color: COLOR.verde }
];
const CANALES = [['Meta', .46], ['Google', .27], ['TikTok', .18], ['Correo', .09]];

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Campaña · leads de hoy');

  // embudo
  svg.appendChild(panel(10, 24, 182, 118, { rx: 6 }));
  svg.appendChild(texto(18, 36, 'EMBUDO DE LA SEMANA', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));

  const pasos = EMBUDO.map((e, i) => {
    const y = 48 + i * 23;
    svg.appendChild(texto(18, y, e.nombre, { tam: 5.2, color: COLOR.texto }));
    svg.appendChild(el('rect', { x: 18, y: y + 4, width: 130, height: 6, rx: 3, fill: 'rgba(186,215,247,.1)' }));
    const barra = el('rect', { x: 18, y: y + 4, width: 0, height: 6, rx: 3, fill: e.color });
    const dato = texto(184, y + 2, '0', { tam: 5.4, color: COLOR.titulo, mono: true, anclaje: 'end' });
    svg.appendChild(barra); svg.appendChild(dato);
    return { ...e, barra, dato, desde: .04 + i * .12, hasta: .42 + i * .12 };
  });

  // leads del día
  svg.appendChild(panel(202, 24, 108, 54, { rx: 6 }));
  svg.appendChild(texto(210, 38, 'LEADS DE HOY', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const leads = texto(210, 60, '0', { tam: 15, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(leads);
  const contraAyer = texto(210, 70, '', { tam: 4.8, color: COLOR.verde });
  svg.appendChild(contraAyer);

  // costo por lead
  svg.appendChild(panel(202, 86, 108, 56, { rx: 6 }));
  svg.appendChild(texto(210, 100, 'COSTO POR LEAD', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const costo = texto(210, 120, '$0', { tam: 13, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(costo);
  const tendencia = texto(210, 132, '', { tam: 4.8, color: COLOR.verde });
  svg.appendChild(tendencia);

  // de dónde vienen
  svg.appendChild(panel(10, 150, 300, 40, { rx: 6 }));
  svg.appendChild(texto(18, 163, 'DE DÓNDE VIENEN', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const canales = CANALES.map(([nombre, parte], i) => {
    const x = 18 + i * 72;
    svg.appendChild(texto(x, 176, nombre, { tam: 5.2, color: COLOR.texto }));
    svg.appendChild(el('rect', { x, y: 180, width: 58, height: 3.4, rx: 1.7, fill: 'rgba(186,215,247,.1)' }));
    const barra = el('rect', { x, y: 180, width: 0, height: 3.4, rx: 1.7, fill: COLOR.violeta });
    svg.appendChild(barra);
    return { parte, barra };
  });

  return {
    paso(t) {
      const p = ciclo(t, DURACION);

      for (const e of pasos) {
        const avance = suave(tramo(p, e.desde, e.hasta));
        e.barra.setAttribute('width', String(130 * e.ancho * avance));
        e.dato.textContent = miles(e.valor * avance);
      }

      const cerradas = suave(tramo(p, .28, .9));
      leads.textContent = miles(612 * cerradas);
      contraAyer.textContent = cerradas > .3 ? `+${Math.round(18 + cerradas * 14)}% contra ayer` : '';

      const baja = suave(tramo(p, .2, .85));
      costo.textContent = `$${miles(186 - 79 * baja)}`;
      tendencia.textContent = baja > .25 ? `−${Math.round(42 * baja)}% en 7 días` : '';

      canales.forEach((c, i) => c.barra.setAttribute('width', String(58 * c.parte / .46 * suave(tramo(p, .1 + i * .08, .55 + i * .08)))));
    }
  };
}
