/* T.T AI Firm · la ventana de contacto: con quién hablamos y por dónde.
   La usan el paso final de los dos cuestionarios y el cierre de la página.
   Todo lo que se envía entra al sistema interno de T.T. */

import { enviarSolicitud } from './sistema.js';

/** @param {{titulo:string, ayuda:string, boton:string, conMensaje?:boolean, extra?:string}} opciones */
export function formularioHTML({ titulo, ayuda, boton, conMensaje = false, extra = '' }) {
  return `
    <form class="pedir" data-pedir novalidate>
      <div class="encabezado"><b>${titulo}</b><span>${ayuda}</span></div>
      <div class="campos">
        <label><span>Tu nombre</span><input name="nombre" maxlength="80" autocomplete="name" required></label>
        <label><span>Nombre de la empresa</span><input name="empresa" maxlength="120" autocomplete="organization"></label>
        <label><span>Teléfono</span><input name="telefono" type="tel" inputmode="tel" maxlength="40" autocomplete="tel" required></label>
        <label><span>Correo electrónico</span><input name="correo" type="email" inputmode="email" maxlength="120" autocomplete="email" required></label>
        ${extra}
        ${conMensaje ? '<label class="ancho"><span>Qué necesitas</span><textarea name="mensaje" maxlength="1200" rows="3"></textarea></label>' : ''}
      </div>
      <input class="trampa" name="apodo" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="abajo">
        <button class="boton accion" type="submit">${boton}</button>
        <p class="aviso" data-aviso role="status"></p>
      </div>
    </form>`;
}

const telefonoValido = (v) => (v.match(/\d/g) || []).length >= 8;
const correoValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/**
 * Conecta un formulario ya pintado.
 * @param {HTMLFormElement} form
 * @param {() => object} extras   lo que se manda además de los campos
 * @param {() => void} [alLograr] si se pasa, se llama en vez de mostrar el mensaje de «ya llegó»
 */
export function conectar(form, extras = () => ({}), alLograr = null) {
  if (!form) return;
  const aviso = form.querySelector('[data-aviso]');
  const boton = form.querySelector('button[type="submit"]');
  const etiqueta = boton.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.apodo.value) return;                       // la trampa para robots

    const campos = Object.fromEntries(new FormData(form));
    const nombre = campos.nombre.trim();
    const telefono = campos.telefono.trim();
    const correo = campos.correo.trim();

    if (nombre.length < 2) return marcar(form, aviso, 'Falta tu nombre.', 'nombre');
    if (!telefonoValido(telefono)) return marcar(form, aviso, 'El teléfono no está completo.', 'telefono');
    if (!correoValido(correo)) return marcar(form, aviso, 'Revisa el correo electrónico.', 'correo');

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    aviso.className = 'aviso';
    aviso.textContent = '';

    const { ok, error } = await enviarSolicitud({
      nombre,
      empresa: campos.empresa.trim(),
      contacto: `${correo} · ${telefono}`,
      mensaje: (campos.mensaje || '').trim(),
      plazo: campos.plazo || '',
      ...extras()
    });

    if (ok) {
      if (alLograr) return alLograr();
      form.innerHTML = '<div class="listo"><b>Listo, ya llegó.</b><span>Tu solicitud entró a nuestro sistema. Te buscamos por teléfono o por correo.</span></div>';
      return;
    }

    boton.disabled = false;
    boton.textContent = etiqueta;
    aviso.className = 'aviso malo';
    aviso.textContent = 'No se pudo enviar en este momento. Vuelve a intentarlo en un minuto.';
    console.error('solicitud', error);
  });
}

function marcar(form, aviso, texto, campo) {
  aviso.className = 'aviso malo';
  aviso.textContent = texto;
  form[campo].focus();
}
