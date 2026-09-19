/* T.T AI Firm · la pantalla final de la auditoría y lo que se manda al sistema. */

import { AUDITORIA, PREGUNTAS, CUANDO } from './datos.js';
import { formularioHTML } from '../solicitud.js';

const dolares = (n) => `${AUDITORIA.moneda} ${n.toLocaleString('en-US')}`;

/** Opciones elegidas de una pregunta, con su nombre. */
function elegidas(id, respuesta) {
  const opciones = PREGUNTAS.find(p => p.id === id)?.opciones ?? [];
  const marcadas = new Set([respuesta].flat().filter(Boolean));
  return opciones.filter(o => marcadas.has(o.id));
}

function lectura(r) {
  return {
    negocio: elegidas('negocio', r.negocio)[0] ?? null,
    tamano: elegidas('tamano', r.tamano)[0] ?? null,
    duele: elegidas('duele', r.duele),
    digital: elegidas('digital', r.digital)[0] ?? null,
    reunion: elegidas('reunion', r.reunion)[0] ?? null
  };
}

export function resumen(r) {
  const l = lectura(r);
  return [
    'Solicitud de auditoría · T.T AI Firm',
    `Giro: ${l.negocio?.nombre ?? '—'}`,
    `Tamaño: ${l.tamano?.nombre ?? '—'}`,
    `Lo que más le cuesta: ${l.duele.map(o => o.nombre).join(', ') || '—'}`,
    `Hoy trabajan con: ${l.digital?.nombre ?? '—'}`,
    `Reunión: ${l.reunion?.nombre ?? '—'}`,
    '',
    `Auditoría de Performance intensiva, desde ${dolares(AUDITORIA.desde)}, ${AUDITORIA.duracion.toLowerCase()}.`
  ].join('\n');
}

export function paraElSistema(r) {
  const l = lectura(r);
  return {
    tipo: 'auditoria',
    giro: l.negocio?.nombre ?? '',
    quiere: l.duele.map(o => o.nombre),
    usuarios: l.tamano?.nombre ?? '',
    conexiones: l.digital ? [l.digital.nombre] : [],
    resumen: resumen(r)
  };
}

export function pantalla(r) {
  const l = lectura(r);
  const marcas = [l.negocio, l.tamano, l.digital, l.reunion, ...l.duele]
    .filter(Boolean).map(o => `<span class="insignia">${o.nombre}</span>`).join('');

  const cuando = `<label><span>¿Cuándo te acomoda?</span><select class="lista chica" name="plazo">${
    CUANDO.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('')}</select></label>`;
  const modo = `<input type="hidden" name="mensaje" value="Reunión: ${l.reunion?.nombre ?? 'sin preferencia'}">`;

  return `
    <div class="resultado">
      <p class="etiqueta izquierda">Lo que sigue</p>
      <h3 class="titulo">Vamos a tu operación y la medimos.</h3>

      <div class="auditoria">
        <div class="cabeza">
          <div><span class="k">El primer paso</span><b>${AUDITORIA.nombre}</b></div>
          <div class="precio"><b>desde ${dolares(AUDITORIA.desde)}</b><span>${AUDITORIA.duracion}${AUDITORIA.acreditable ? ' · acreditable al proyecto' : ''}</span></div>
        </div>
        <p>Entramos a tu empresa con tus datos reales. Salimos con los números de dónde se está yendo el dinero y con todo lo que se puede aprovechar mejor usando sistemas y digitalización. Eso define, sin adivinar, qué se construye y en qué orden.</p>
        <ul>${AUDITORIA.entrega.map(t => `<li>${t}</li>`).join('')}</ul>
      </div>

      <div class="medida">
        <b>Todo se construye 1:1 sobre tu empresa.</b>
        <span>No vendemos licencias ni plantillas. Cada pantalla, cada regla y cada número se diseñan sobre tu forma de operar, hasta el último detalle. No existe una copia de tu sistema en ningún otro lado.</span>
      </div>

      ${formularioHTML({
        titulo: 'Pide tu auditoría',
        ayuda: 'Tu solicitud entra directo a nuestro sistema, con todo lo que acabas de contestar.',
        boton: 'Enviar mi solicitud',
        extra: cuando + modo
      })}

      <div class="marcas">${marcas}</div>
    </div>`;
}
