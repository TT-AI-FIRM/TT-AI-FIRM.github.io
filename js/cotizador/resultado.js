/* T.T AI Firm · la pantalla final del demo y el resumen que se copia.
   Mientras los valores no estén confirmados no se enseña ni se manda un solo
   número: el cliente contesta, manda su solicitud y la propuesta se la
   devolvemos nosotros por correo. Al poner VALORES_CONFIRMADOS en true
   vuelven a aparecer el orden de inversión, el tiempo y la mensualidad. */

import { VALORES_CONFIRMADOS } from './datos.js';
import { pesos } from './precio.js';

const nombres = (lista) => lista.map(o => o.nombre).join(', ');

/** Texto plano del resumen: es lo que se copia y lo que viaja al sistema. */
export function resumen(e) {
  const lineas = [
    'Solicitud de demo · T.T AI Firm',
    `Giro: ${e.negocio?.nombre ?? '—'}`,
    `Quiere construir: ${nombres(e.modulos)}`,
    `Lo va a usar: ${e.usuarios?.nombre ?? '—'}`,
    `Se conecta con: ${e.conexiones.length ? nombres(e.conexiones) : '—'}`,
    `Para cuándo: ${e.plazo?.nombre ?? '—'}`
  ];
  if (VALORES_CONFIRMADOS) lineas.push(
    '',
    `Orden de inversión estimado: ${pesos(e.desde)} a ${pesos(e.hasta)}`,
    `Tiempo estimado: ${e.semanas} a ${e.semanasHasta} semanas`,
    `Acompañamiento mensual estimado: ${pesos(e.mensual)}`
  );
  return lineas.join('\n');
}

const fila = (titulo, valor, nota) =>
  `<div class="dato"><span class="k">${titulo}</span><b>${valor}</b>${nota ? `<span class="n">${nota}</span>` : ''}</div>`;

const cifras = (e) => !VALORES_CONFIRMADOS ? '' : `
      <div class="cifras">
        ${fila('Orden de inversión del sistema', `${pesos(e.desde)} a ${pesos(e.hasta)}`, 'Construcción completa, en pesos')}
        ${fila('Tiempo estimado', `${e.semanas} a ${e.semanasHasta} semanas`, 'Corriendo en producción desde las primeras')}
        ${fila('Acompañamiento mensual', pesos(e.mensual), 'Tablero vivo y revisión con dirección')}
      </div>
      <p class="nota">Estimado preliminar a partir de tus respuestas. El número firme se define sobre tu operación real.</p>`;

export function pantalla(e) {
  const marcas = [e.negocio, e.usuarios, e.plazo, ...e.modulos, ...e.conexiones]
    .filter(Boolean).map(o => `<span class="insignia">${o.nombre}</span>`).join('');

  return `
    <div class="resultado">
      <p class="etiqueta izquierda">Lo que sigue</p>
      <h3 class="titulo">Ya tenemos lo que necesitábamos.</h3>
      <p class="nota grande">Con lo que acabas de contestar armamos tu propuesta: qué te construiríamos, en qué orden y en cuánto tiempo. Te la mandamos por correo, hecha por nosotros y sobre tu operación, no por una calculadora.</p>

      ${cifras(e)}

      <div class="medida">
        <b>Todo se construye 1:1 sobre tu empresa.</b>
        <span>No vendemos licencias ni plantillas. Cada pantalla, cada regla y cada número se diseñan sobre tu forma de operar, hasta el último detalle. No existe una copia de tu sistema en ningún otro lado.</span>
      </div>

      <p class="etiqueta izquierda" style="margin:22px 0 10px">Lo que nos dijiste</p>
      <div class="marcas">${marcas}</div>
    </div>`;
}

/** Lo que se manda al sistema junto con los campos del formulario. */
export function paraElSistema(e) {
  const solicitud = {
    tipo: 'demo',
    giro: e.negocio?.nombre ?? '',
    quiere: e.modulos.map(m => m.nombre),
    usuarios: e.usuarios?.nombre ?? '',
    conexiones: e.conexiones.map(c => c.nombre),
    plazo: e.plazo?.nombre ?? '',
    resumen: resumen(e)
  };
  // los números solo viajan cuando ya son los de verdad
  if (VALORES_CONFIRMADOS) Object.assign(solicitud, {
    estimado_desde: e.desde, estimado_hasta: e.hasta, estimado_mensual: e.mensual, semanas: e.semanas
  });
  return solicitud;
}

/** Botones del pie en la pantalla final. Enviar se hace en el formulario, arriba. */
export function acciones() {
  return '<button class="boton linea" data-reiniciar>Empezar de nuevo</button>' +
         '<button class="boton linea" data-copiar>Copiar mi resumen</button>';
}
