/* T.T AI Firm · el sitio escribe en el sistema de T.T.
   Toda solicitud (demo o contacto) entra a la tabla «solicitudes» de nuestra base.
   La llave publicable es pública por diseño: solo permite DEJAR una solicitud,
   nunca leerlas. Quien las lee es un socio, ya dentro del sistema. */

const NUBE = {
  url: 'https://qnsdpfiyxnortpivkxtf.supabase.co',
  llave: 'sb_publishable_jv_SGFOl5fDl334tth-O2Q_-IznoGhy'
};

/**
 * @param {object} solicitud  campos de la tabla; `tipo` es 'demo' o 'contacto'
 * @returns {Promise<{ok:boolean, error?:string}>}
 */
export async function enviarSolicitud(solicitud) {
  if (!NUBE.url || !NUBE.llave) return { ok: false, error: 'sin conexión configurada' };

  try {
    const r = await fetch(`${NUBE.url}/rest/v1/solicitudes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: NUBE.llave,
        Authorization: `Bearer ${NUBE.llave}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({ ...solicitud, origen: 'sitio web' })
    });
    if (r.ok) return { ok: true };
    const detalle = await r.text();
    return { ok: false, error: `${r.status} ${detalle.slice(0, 180)}` };
  } catch (e) {
    return { ok: false, error: e.message || 'no hubo conexión' };
  }
}
