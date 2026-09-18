/* Maqueta: central de traslados. Una camioneta recorre su ruta, el tiempo de
   llegada baja y la ficha del chofer sigue al vehículo. Ciclo de 14 segundos. */

import { el, lienzo, panel, texto, encabezado, ciclo, suave, COLOR, tramo } from './comun.js';

const RUTA = 'M 34 168 C 64 150, 62 116, 96 104 S 156 96, 178 74 S 226 56, 258 38';
const DURACION = 14;

export function montar(nodo) {
  const svg = lienzo(nodo);
  encabezado(svg, 'Central · flota en vivo');

  // calles de fondo, apenas insinuadas
  const calles = el('g', { stroke: 'rgba(186,215,247,.07)', 'stroke-width': 1 });
  for (let i = 1; i < 6; i++) calles.appendChild(el('path', { d: `M 0 ${i * 34} H 320` }));
  for (let i = 1; i < 8; i++) calles.appendChild(el('path', { d: `M ${i * 40} 0 V 200` }));
  svg.appendChild(calles);

  // ruta: primero el trazo apagado, encima el recorrido ya andado
  svg.appendChild(el('path', { d: RUTA, stroke: 'rgba(182,217,252,.22)', 'stroke-width': 2.4, 'stroke-linecap': 'round' }));
  const andado = el('path', { d: RUTA, stroke: COLOR.azul, 'stroke-width': 2.4, 'stroke-linecap': 'round' });
  svg.appendChild(andado);

  // extremos
  svg.appendChild(el('circle', { cx: 34, cy: 168, r: 3.4, fill: COLOR.fondo, stroke: COLOR.azul, 'stroke-width': 2 }));
  svg.appendChild(el('circle', { cx: 258, cy: 38, r: 4, fill: COLOR.violeta }));
  svg.appendChild(texto(266, 40, 'Hotel', { tam: 5.5, color: COLOR.texto }));
  svg.appendChild(texto(30, 180, 'Aeropuerto', { tam: 5.5, color: COLOR.tenue }));

  // vehículo
  const halo = el('circle', { r: 9, fill: 'rgba(139,107,255,.22)' });
  const auto = el('circle', { r: 4.6, fill: COLOR.violeta, stroke: '#fff', 'stroke-width': 1.2 });
  const vehiculo = el('g', {}, [halo, auto]);
  svg.appendChild(vehiculo);

  // ficha del chofer, pegada al vehículo
  const fichaFondo = panel(0, 0, 74, 22, { rx: 5, fill: 'rgba(5,6,15,.88)' });
  const fichaNombre = texto(7, 9.5, 'Luis Ramírez', { tam: 5.6, color: COLOR.titulo, peso: 500 });
  const fichaDato = texto(7, 17, 'Suburban · BCS-903-C', { tam: 5, color: COLOR.tenue, mono: true });
  const ficha = el('g', {}, [fichaFondo, fichaNombre, fichaDato]);
  svg.appendChild(ficha);

  // panel de estado, abajo a la izquierda
  svg.appendChild(panel(10, 26, 92, 44, { rx: 6, fill: 'rgba(5,6,15,.82)' }));
  svg.appendChild(texto(18, 39, 'LLEGA EN', { tam: 5, color: COLOR.tenue, mono: true, espaciado: 1 }));
  const minutos = texto(18, 56, '12 min', { tam: 13, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(minutos);
  const estado = texto(18, 65, 'En camino por él', { tam: 5.2, color: COLOR.verde });
  svg.appendChild(estado);

  // contador de flota, arriba a la derecha
  svg.appendChild(panel(226, 158, 84, 32, { rx: 6, fill: 'rgba(5,6,15,.82)' }));
  svg.appendChild(texto(234, 170, 'FLOTA ACTIVA', { tam: 4.8, color: COLOR.tenue, mono: true, espaciado: .8 }));
  const flota = texto(234, 183, '9 de 14', { tam: 8, color: COLOR.titulo, peso: 500, mono: true });
  svg.appendChild(flota);

  const largo = andado.getTotalLength();
  andado.setAttribute('stroke-dasharray', `${largo} ${largo}`);

  return {
    paso(t) {
      const p = suave(ciclo(t, DURACION));

      andado.setAttribute('stroke-dashoffset', String(largo * (1 - p)));

      const punto = andado.getPointAtLength(largo * p);
      vehiculo.setAttribute('transform', `translate(${punto.x} ${punto.y})`);
      halo.setAttribute('r', String(8 + Math.sin(t * 3) * 1.6));

      // la ficha se va al otro lado cuando el vehículo se acerca al borde derecho
      const ladoIzquierdo = punto.x > 200;
      const fichaY = Math.max(76, Math.min(150, punto.y - 26));
      ficha.setAttribute('transform', `translate(${ladoIzquierdo ? punto.x - 84 : punto.x + 10} ${fichaY})`);

      const faltan = Math.max(0, Math.round(12 * (1 - p)));
      minutos.textContent = faltan > 0 ? `${faltan} min` : 'Llegó';
      estado.textContent = p < .12 ? 'Asignado' : p < .9 ? 'En camino por él' : 'En el punto de encuentro';
      estado.setAttribute('fill', p < .12 ? COLOR.ambar : COLOR.verde);

      flota.textContent = `${8 + (Math.floor(t / 4) % 3)} de 14`;
    }
  };
}
