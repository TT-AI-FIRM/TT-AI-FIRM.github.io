/* T.T AI Firm · un solo lugar para los datos de contacto.
   Por decisión de dirección no se atiende por WhatsApp: teléfono y correo. */

export const CONTACTO = { telefono: '', correo: '' };

export function enlaceCorreo(asunto, cuerpo) {
  if (!CONTACTO.correo) return null;
  return `mailto:${CONTACTO.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}

export function enlaceTelefono() {
  if (!CONTACTO.telefono) return null;
  return `tel:${CONTACTO.telefono.replace(/[^\d+]/g, '')}`;
}
