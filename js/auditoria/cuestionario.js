/* T.T AI Firm · la auditoría como cuestionario: preguntas y pantalla final. */

import { PREGUNTAS } from './datos.js';
import { pantalla, resumen, paraElSistema, extraContacto } from './pantalla.js';

export const AUDITORIA_Q = {
  id: 'auditoria',
  titulo: 'Pide tu auditoría',
  preguntas: PREGUNTAS,
  pide: { titulo: 'Ya casi. ¿A quién le contestamos?', ayuda: 'Te buscamos por teléfono o por correo para acordar la reunión.', boton: 'Enviar mi solicitud', extra: extraContacto() },
  final(respuestas) {
    return { html: pantalla(respuestas), texto: resumen(respuestas), sistema: paraElSistema(respuestas) };
  }
};
