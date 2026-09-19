/* T.T AI Firm · el demo como cuestionario: preguntas y pantalla final. */

import { PREGUNTAS } from './datos.js';
import { calcular } from './precio.js';
import { pantalla, resumen, paraElSistema } from './resultado.js';

export const DEMO = {
  id: 'demo',
  titulo: 'Arma tu demo',
  preguntas: PREGUNTAS,
  pide: { titulo: 'Ya casi. ¿A quién le contestamos?', ayuda: 'Te buscamos por teléfono o por correo con tu demo y su precio.', boton: 'Enviar mi solicitud', extra: '' },
  final(respuestas) {
    const estimado = calcular(respuestas);
    if (!estimado) return null;                 // sin módulos no hay nada que estimar
    return { html: pantalla(estimado), texto: resumen(estimado), sistema: paraElSistema(estimado) };
  }
};
