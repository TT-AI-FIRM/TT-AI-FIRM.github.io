/* T.T AI Firm · la auditoría como cuestionario: preguntas y pantalla final. */

import { PREGUNTAS } from './datos.js';
import { pantalla, resumen, paraElSistema } from './pantalla.js';

export const AUDITORIA_Q = {
  id: 'auditoria',
  titulo: 'Pide tu auditoría',
  preguntas: PREGUNTAS,
  final(respuestas) {
    return { html: pantalla(respuestas), texto: resumen(respuestas), sistema: paraElSistema(respuestas) };
  }
};
