/* T.T AI Firm · la matemática del estimado. Sin pantalla: entran respuestas, sale el número.
   Los valores de entrada viven todos en datos.js. */

import { PREGUNTAS, PRECIO } from './datos.js';

const pregunta = (id) => PREGUNTAS.find(p => p.id === id);

/** Opciones elegidas de una pregunta, en el orden en que están definidas. */
export function elegidas(idPregunta, respuesta) {
  const opciones = pregunta(idPregunta)?.opciones ?? [];
  const marcadas = new Set([respuesta].flat().filter(Boolean));
  return opciones.filter(o => marcadas.has(o.id));
}

const sumar = (lista, campo) => lista.reduce((t, o) => t + (o[campo] ?? 0), 0);
const multiplicar = (lista, campo) => lista.reduce((t, o) => t * (o[campo] ?? 1), 1);
const redondear = (n) => Math.round(n / PRECIO.redondeoA) * PRECIO.redondeoA;

/** Semanas de calendario: el módulo más largo manda, los demás corren en paralelo. */
function semanasDe(modulos, ritmo) {
  if (!modulos.length) return 0;
  const largos = modulos.map(m => m.semanas ?? 0).sort((a, b) => b - a);
  const [mayor, ...resto] = largos;
  const crudo = (mayor + sumar(resto.map(s => ({ s })), 's') * PRECIO.trabajoEnParalelo) * ritmo;
  return Math.max(2, Math.round(crudo));
}

/**
 * @param {{negocio:string, modulos:string[], usuarios:string, conexiones:string[], plazo:string}} respuestas
 * @returns estimado con rango, mensualidad y semanas; o null si falta algo.
 */
export function calcular(respuestas) {
  const modulos = elegidas('modulos', respuestas.modulos);
  if (!modulos.length) return null;

  const conexiones = elegidas('conexiones', respuestas.conexiones);
  const negocio = elegidas('negocio', respuestas.negocio);
  const usuarios = elegidas('usuarios', respuestas.usuarios);
  const plazo = elegidas('plazo', respuestas.plazo);

  const paquete = Math.pow(PRECIO.descuentoPorModulo, Math.max(0, modulos.length - 1));
  const construccion = sumar(modulos, 'precio') * paquete;
  const integracion = sumar(conexiones, 'precio');
  const factor = multiplicar([...negocio, ...usuarios, ...plazo], 'factor');

  const centro = (construccion + integracion) * factor;
  const semanas = semanasDe(modulos, multiplicar(usuarios, 'ritmo'));

  return {
    desde: redondear(centro * (1 - PRECIO.anchoRango)),
    hasta: redondear(centro * (1 + PRECIO.anchoRango)),
    mensual: Math.max(PRECIO.mensualMinimo, redondear(centro * PRECIO.porcentajeMensual)),
    semanas,
    semanasHasta: semanas + PRECIO.holguraSemanas,
    modulos,
    conexiones,
    negocio: negocio[0] ?? null,
    usuarios: usuarios[0] ?? null,
    plazo: plazo[0] ?? null
  };
}

export const pesos = (n) => n.toLocaleString('es-MX', { style: 'currency', currency: PRECIO.moneda, maximumFractionDigits: 0 });
