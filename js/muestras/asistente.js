/* Maqueta: ERP con asistente. Se escribe una pregunta, el asistente contesta con
   el número, dibuja el desglose y señala lo que no cuadra. Ciclo de 18 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, tramo, COLOR } from './comun.js';

const DURACION = 18;
const PREGUNTA = '¿Cómo cerró agosto?';
const RESPUESTA = [
  'Agosto cerró en $19.3 M, 9.2% arriba',
  'del año pasado. Tres sucursales crecen;',
  'Oriente baja 7.2% y es la única con',
  'precio promedio a la baja.'
];
const SUCURSALES = [
  { n: 'Norte', v: 1, d: '+15.9%', bien: true },
  { n: 'Centro', v: .96, d: '+9.9%', bien: true },
  { n: 'Sur', v: .63, d: '+9.8%', bien: true },
  { n: 'Oriente', v: .38, d: '−7.2%', bien: false }
];

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Asistente conectado al ERP');
  svg.appendChild(texto(12, 25, 'conoce el negocio entero · solo lectura', { tam: 5, color: COLOR.tenue }));

  // pregunta del usuario, alineada a la derecha
  const globoPregunta = panel(150, 34, 158, 20, { rx: 6, fill: 'rgba(139,107,255,.18)', stroke: 'rgba(139,107,255,.4)' });
  const textoPregunta = texto(300, 47, '', { tam: 6.4, color: COLOR.titulo, anclaje: 'end' });
  const pregunta = el('g', { opacity: 0 }, [globoPregunta, textoPregunta]);
  svg.appendChild(pregunta);

  // respuesta
  const globoRespuesta = panel(12, 62, 296, 52, { rx: 6, fill: 'rgba(186,214,247,.05)' });
  const respuesta = el('g', { opacity: 0 }, [globoRespuesta]);
  const lineas = RESPUESTA.map((_, i) => {
    const l = texto(22, 76 + i * 11, '', { tam: 6.2, color: COLOR.texto });
    respuesta.appendChild(l);
    return l;
  });
  svg.appendChild(respuesta);

  // desglose por sucursal
  const desglose = el('g', { opacity: 0 });
  const barras = SUCURSALES.map((s, i) => {
    const y = 128 + i * 15;
    desglose.appendChild(texto(14, y + 5, s.n, { tam: 5.6, color: COLOR.tenue }));
    const fondo = el('rect', { x: 46, y, width: 180, height: 7, rx: 3.5, fill: 'rgba(186,215,247,.1)' });
    const barra = el('rect', { x: 46, y, width: 0, height: 7, rx: 3.5, fill: s.bien ? COLOR.azul : COLOR.ambar });
    const delta = texto(306, y + 5.6, s.d, { tam: 5.4, color: s.bien ? COLOR.verde : COLOR.ambar, mono: true, anclaje: 'end' });
    desglose.appendChild(fondo); desglose.appendChild(barra); desglose.appendChild(delta);
    return barra;
  });
  svg.appendChild(desglose);

  // fuente de la respuesta
  const fuente = texto(14, 192, 'Fuente: ERP · facturas y líneas · 2.7 s', { tam: 4.8, color: COLOR.tenue, mono: true, opacity: 0 });
  fuente.setAttribute('opacity', '0');
  svg.appendChild(fuente);

  // cursor que parpadea mientras escribe
  const cursor = el('rect', { x: 0, y: 40, width: 1.4, height: 8, fill: COLOR.violeta, opacity: 0 });
  svg.appendChild(cursor);

  return {
    paso(t) {
      const p = ciclo(t, DURACION);

      // 1. se escribe la pregunta
      const escribiendo = tramo(p, .04, .2);
      const letras = Math.round(PREGUNTA.length * escribiendo);
      textoPregunta.textContent = PREGUNTA.slice(0, letras);
      pregunta.setAttribute('opacity', String(suave(tramo(p, .02, .07))));
      const escribeAun = escribiendo > 0 && escribiendo < 1;
      cursor.setAttribute('opacity', escribeAun && Math.sin(t * 12) > 0 ? '1' : '0');
      cursor.setAttribute('x', String(302));

      // 2. contesta, línea por línea
      const contestando = tramo(p, .24, .52);
      respuesta.setAttribute('opacity', String(suave(tramo(p, .22, .28))));
      const totalLetras = RESPUESTA.join(' ').length;
      let escritas = Math.round(totalLetras * contestando);
      for (const [i, linea] of lineas.entries()) {
        const largo = RESPUESTA[i].length;
        linea.textContent = RESPUESTA[i].slice(0, Math.max(0, Math.min(largo, escritas)));
        escritas -= largo;
      }

      // 3. dibuja el desglose
      const dibujando = suave(tramo(p, .5, .72));
      desglose.setAttribute('opacity', String(suave(tramo(p, .48, .56))));
      barras.forEach((b, i) => b.setAttribute('width', String(180 * SUCURSALES[i].v * dibujando)));

      // 4. aparece la fuente
      fuente.setAttribute('opacity', String(suave(tramo(p, .7, .78)) * .9));
    }
  };
}
