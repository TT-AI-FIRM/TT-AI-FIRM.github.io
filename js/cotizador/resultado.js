/* T.T AI Firm · la pantalla final del cotizador y el resumen que se envía.
   El protagonista es la auditoría: el estimado es apenas el orden de magnitud. */

import { AUDITORIA, VALORES_CONFIRMADOS } from './datos.js';
import { pesos } from './precio.js';
import { enlaceWhatsApp, enlaceCorreo } from '../contacto.js';

const nombres = (lista) => lista.map(o => o.nombre).join(', ');
const dolares = (n) => `${AUDITORIA.moneda} ${n.toLocaleString('en-US')}`;

/** Texto plano del resumen: es lo que se copia y lo que viaja por WhatsApp o correo. */
export function resumen(e) {
  return [
    'Solicitud de demo · T.T AI Firm',
    `Giro: ${e.negocio?.nombre ?? '—'}`,
    `Quiere construir: ${nombres(e.modulos)}`,
    `Lo va a usar: ${e.usuarios?.nombre ?? '—'}`,
    `Se conecta con: ${e.conexiones.length ? nombres(e.conexiones) : '—'}`,
    `Para cuándo: ${e.plazo?.nombre ?? '—'}`,
    '',
    `Orden de inversión estimado: ${pesos(e.desde)} a ${pesos(e.hasta)}`,
    `Tiempo estimado: ${e.semanas} a ${e.semanasHasta} semanas`,
    `Acompañamiento mensual estimado: ${pesos(e.mensual)}`,
    VALORES_CONFIRMADOS ? '' : '(estimado con valores de ejemplo, pendientes de confirmar)',
    '',
    `Primer paso: ${AUDITORIA.nombre}, desde ${dolares(AUDITORIA.desde)}.`
  ].filter(Boolean).join('\n');
}

const fila = (titulo, valor, nota) =>
  `<div class="dato"><span class="k">${titulo}</span><b>${valor}</b>${nota ? `<span class="n">${nota}</span>` : ''}</div>`;

export function pantalla(e) {
  const aviso = VALORES_CONFIRMADOS ? '' :
    '<span class="insignia ejemplo"><i></i>Valores de ejemplo · pendientes de confirmar</span>';

  const marcas = [e.negocio, e.usuarios, e.plazo, ...e.modulos, ...e.conexiones]
    .filter(Boolean).map(o => `<span class="insignia">${o.nombre}</span>`).join('');

  return `
    <div class="resultado">
      <p class="etiqueta izquierda">Lo que sigue</p>
      <h3 class="titulo">Esto es lo que construiríamos para ti.</h3>

      <div class="auditoria">
        <div class="cabeza">
          <div>
            <span class="k">El primer paso</span>
            <b>${AUDITORIA.nombre}</b>
          </div>
          <div class="precio"><b>desde ${dolares(AUDITORIA.desde)}</b><span>${AUDITORIA.duracion}${AUDITORIA.acreditable ? ' · acreditable al proyecto' : ''}</span></div>
        </div>
        <p>Entramos a tu operación para encontrar, con números, no solo dónde se pierde el dinero sino todo lo que puede mejorar con sistemas y digitalización. De ahí sale el alcance firme y el precio real de lo que se construye.</p>
        <ul>${AUDITORIA.entrega.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>

      <div class="cifras">
        ${fila('Orden de inversión del sistema', `${pesos(e.desde)} a ${pesos(e.hasta)}`, 'Construcción completa, en pesos')}
        ${fila('Tiempo estimado', `${e.semanas} a ${e.semanasHasta} semanas`, 'Corriendo en producción desde las primeras')}
        ${fila('Acompañamiento mensual', pesos(e.mensual), 'Tablero vivo y revisión con dirección')}
      </div>

      <p class="nota">Estimado preliminar a partir de tus respuestas. El número firme sale de la auditoría, porque el alcance se define sobre tu operación real. ${aviso}</p>

      <div class="medida">
        <b>Todo se construye 1:1 sobre tu empresa.</b>
        <span>No vendemos licencias ni plantillas. Cada pantalla, cada regla y cada número se diseñan sobre tu forma de operar, hasta el último detalle. No existe una copia de tu sistema en ningún otro lado.</span>
      </div>

      <div class="marcas">${marcas}</div>
    </div>`;
}

/** Botones del pie en la pantalla final. Los de contacto aparecen solos al llenar contacto.js */
export function acciones(e) {
  const texto = resumen(e);
  const wa = enlaceWhatsApp(texto);
  const correo = enlaceCorreo('Solicitud de demo · T.T AI Firm', texto);
  const partes = ['<button class="boton linea" data-reiniciar>Empezar de nuevo</button>'];

  if (wa) partes.push(`<a class="boton accion" href="${wa}" target="_blank" rel="noopener">Enviar por WhatsApp</a>`);
  else if (correo) partes.push(`<a class="boton accion" href="${correo}">Enviar por correo</a>`);
  else partes.push('<button class="boton accion" data-copiar>Copiar mi resumen</button>');

  return partes.join('');
}
