/* Maqueta: fábrica. Es un sistema integral: la producción del turno crece contra el programa,
   entra un paro con su causa, la capacitación avanza y abajo se ven las áreas que van conectadas.
   Ciclo de 16 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, tramo, miles, COLOR } from './comun.js';

const DURACION = 16;
const HORAS = [62, 78, 71, 86, 94, 88, 97, 91];
const META_TURNO = 3200;
const AREAS = ['Producción', 'Laboratorio', 'Almacén', 'Mantenimiento', 'Costos', 'Capacitación'];

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Fábrica · sistema integral');

  // kilos del turno
  svg.appendChild(texto(12, 34, 'KILOS DEL TURNO', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .9 }));
  const kilos = texto(12, 52, '0', { tam: 17, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(kilos);
  const contraMeta = texto(12, 62, 'contra el programa', { tam: 5, color: COLOR.tenue });
  svg.appendChild(contraMeta);

  // barras por hora contra la línea del programa
  const barras = [];
  const base = 132, altoMax = 56, ancho = 12, sep = 17, x0 = 14;
  svg.appendChild(el('path', { d: `M ${x0 - 2} ${base - altoMax * .82} H ${x0 + sep * 8}`, stroke: 'rgba(232,192,106,.55)', 'stroke-width': 1, 'stroke-dasharray': '3 3' }));
  svg.appendChild(texto(x0 + sep * 8 + 3, base - altoMax * .82 + 2, 'meta', { tam: 4.6, color: COLOR.ambar, mono: true }));

  for (let i = 0; i < HORAS.length; i++) {
    const b = el('rect', { x: x0 + i * sep, y: base, width: ancho, height: 0, rx: 2, fill: 'rgba(182,217,252,.55)' });
    svg.appendChild(b);
    barras.push(b);
  }
  svg.appendChild(el('path', { d: `M ${x0 - 4} ${base + 3} H ${x0 + sep * 8}`, stroke: COLOR.filo, 'stroke-width': 1 }));
  svg.appendChild(texto(x0, base + 12, '06:00', { tam: 4.6, color: COLOR.tenue, mono: true }));
  svg.appendChild(texto(x0 + sep * 6.4, base + 12, '14:00', { tam: 4.6, color: COLOR.tenue, mono: true }));

  // aviso de paro
  const avisoFondo = panel(0, 0, 138, 30, { rx: 6, fill: 'rgba(232,192,106,.12)', stroke: 'rgba(232,192,106,.45)' });
  const avisoTitulo = texto(9, 12, 'Paro en Banbury 3', { tam: 6, color: COLOR.ambar, peso: 500 });
  const avisoDetalle = texto(9, 22, 'Cambio de compuesto · 18 min', { tam: 5.2, color: COLOR.tenue });
  const aviso = el('g', { opacity: 0, transform: 'translate(170 34)' }, [avisoFondo, avisoTitulo, avisoDetalle]);
  svg.appendChild(aviso);

  // capacitación: anillo de avance con el personaje
  svg.appendChild(panel(170, 84, 138, 74, { rx: 7, fill: 'rgba(5,6,15,.6)' }));
  svg.appendChild(texto(180, 99, 'CAPACITACIÓN DEL TURNO', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .8 }));
  svg.appendChild(texto(180, 113, 'Uso del equipo de protección', { tam: 6, color: COLOR.titulo, peso: 500 }));
  svg.appendChild(texto(180, 123, 'con personaje y audio', { tam: 5, color: COLOR.tenue }));

  const R = 15, CIRC = 2 * Math.PI * R;
  svg.appendChild(el('circle', { cx: 286, cy: 122, r: R, stroke: 'rgba(186,215,247,.16)', 'stroke-width': 3.5 }));
  const anillo = el('circle', {
    cx: 286, cy: 122, r: R, stroke: COLOR.verde, 'stroke-width': 3.5, 'stroke-linecap': 'round',
    'stroke-dasharray': `${CIRC} ${CIRC}`, 'stroke-dashoffset': CIRC, transform: 'rotate(-90 286 122)'
  });
  svg.appendChild(anillo);
  const porcentaje = texto(286, 124.5, '0%', { tam: 6.5, color: COLOR.titulo, peso: 500, mono: true, anclaje: 'middle' });
  svg.appendChild(porcentaje);

  // barra de avance de operadores evaluados
  svg.appendChild(el('rect', { x: 180, y: 140, width: 96, height: 4, rx: 2, fill: 'rgba(186,215,247,.14)' }));
  const avance = el('rect', { x: 180, y: 140, width: 0, height: 4, rx: 2, fill: COLOR.violeta });
  svg.appendChild(avance);
  const evaluados = texto(180, 154, '0 de 42 operadores', { tam: 5, color: COLOR.tenue, mono: true });
  svg.appendChild(evaluados);

  // las áreas que ya viven dentro del sistema
  svg.appendChild(panel(10, 162, 300, 30, { rx: 6 }));
  const areas = AREAS.map((nombre, i) => {
    const x = 16 + i * 49;
    const caja = el('rect', { x, y: 169, width: 46, height: 16, rx: 4, fill: 'rgba(186,215,247,.06)', stroke: COLOR.filo, 'stroke-width': 1 });
    const letra = texto(x + 23, 179.5, nombre, { tam: 4.6, color: COLOR.tenue, anclaje: 'middle' });
    svg.appendChild(caja); svg.appendChild(letra);
    return { caja, letra };
  });

  return {
    paso(t) {
      const p = ciclo(t, DURACION);

      // una por una se van encendiendo, para que se vea que es un solo sistema
      const encendida = Math.floor(t / 1.7) % AREAS.length;
      areas.forEach((a, i) => {
        const on = i === encendida;
        a.caja.setAttribute('fill', on ? 'rgba(139,107,255,.22)' : 'rgba(186,215,247,.06)');
        a.caja.setAttribute('stroke', on ? 'rgba(139,107,255,.6)' : COLOR.filo);
        a.letra.setAttribute('fill', on ? COLOR.titulo : COLOR.tenue);
      });

      // las barras se llenan una tras otra
      let acumulado = 0;
      for (let i = 0; i < HORAS.length; i++) {
        const avanceBarra = suave(tramo(p, i * .07, i * .07 + .16));
        const alto = altoMax * (HORAS[i] / 100) * avanceBarra;
        barras[i].setAttribute('height', String(alto));
        barras[i].setAttribute('y', String(base - alto));
        barras[i].setAttribute('fill', HORAS[i] >= 82 ? 'rgba(182,217,252,.75)' : 'rgba(232,192,106,.6)');
        acumulado += (META_TURNO / HORAS.length) * (HORAS[i] / 90) * avanceBarra;
      }

      kilos.textContent = miles(acumulado);
      const cumple = acumulado / META_TURNO;
      contraMeta.textContent = `${Math.round(cumple * 100)}% del programa · meta ${miles(META_TURNO)}`;
      contraMeta.setAttribute('fill', cumple > .9 ? COLOR.verde : COLOR.tenue);

      // el paro entra a media jornada y se queda
      const entrada = suave(tramo(p, .34, .44));
      aviso.setAttribute('opacity', String(entrada * .96));
      aviso.setAttribute('transform', `translate(170 ${34 - 8 * (1 - entrada)})`);

      // capacitación
      const cap = suave(tramo(p, .2, .92));
      anillo.setAttribute('stroke-dashoffset', String(CIRC * (1 - cap)));
      porcentaje.textContent = `${Math.round(cap * 100)}%`;
      avance.setAttribute('width', String(96 * cap));
      evaluados.textContent = `${Math.round(42 * cap)} de 42 operadores`;
    }
  };
}
