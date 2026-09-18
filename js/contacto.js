/* T.T AI Firm · un solo lugar para los datos de contacto.
   Al llenarlos, los botones aparecen solos en el cierre y en el cotizador. */

export const CONTACTO = { whatsapp: '', correo: '' };

export function enlaceWhatsApp(texto) {
  if (!CONTACTO.whatsapp) return null;
  return `https://wa.me/${CONTACTO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(texto)}`;
}

export function enlaceCorreo(asunto, cuerpo) {
  if (!CONTACTO.correo) return null;
  return `mailto:${CONTACTO.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
}
