/* T.T AI Firm · el formulario con el que alguien nos pide algo.
   Lo usan los dos lugares del sitio: el resultado del módulo de demo y el cierre.
   Todo lo que se envía entra al sistema interno de T.T. */

import { enviarSolicitud } from './sistema.js';

/** @param {{titulo:string, ayuda:string, boton:string, conMensaje?:boolean, extra?:string}} opciones */
export function formularioHTML({ titulo, ayuda, boton, conMensaje = false, extra = '' }) {
  return `
    <form class="pedir" data-pedir novalidate>
      <div class="encabezado"><b>${titulo}</b><span>${ayuda}</span></div>
      <div class="campos">
        <label><span>Tu nombre</span><input name="nombre" maxlength="80" autocomplete="name" required></label>
        <label><span>Empresa</span><input name="empresa" maxlength="120" autocomplete="organization"></label>
        <label class="ancho"><span>WhatsApp o correo</span><input name="contacto" maxlength="140" autocomplete="email" required></label>
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

/**
 * Conecta un formulario ya pintado.
 * @param {HTMLFormElement} form
 * @param {() => object} extras  lo que se manda además de los campos (el estimado, por ejemplo)
 */
export function conectar(form, extras = () => ({})) {
  if (!form) return;
  const aviso = form.querySelector('[data-aviso]');
  const boton = form.querySelector('button[type="submit"]');
  const etiqueta = boton.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (form.apodo.value) return;                       // la trampa para robots

    const datos = Object.fromEntries(new FormData(form));
    delete datos.apodo;
    datos.nombre = datos.nombre.trim();
    datos.contacto = datos.contacto.trim();

    if (datos.nombre.length < 2) return marcar(form, aviso, 'Falta tu nombre.', 'nombre');
    if (datos.contacto.length < 5) return marcar(form, aviso, 'Falta un WhatsApp o un correo para contestarte.', 'contacto');

    boton.disabled = true;
    boton.textContent = 'Enviando…';
    aviso.className = 'aviso';
    aviso.textContent = '';

    const { ok, error } = await enviarSolicitud({ ...datos, ...extras() });

    if (ok) {
      form.innerHTML = `<div class="listo"><b>Listo, ya llegó.</b><span>Tu solicitud entró a nuestro sistema. Te buscamos por donde nos dejaste el contacto.</span></div>`;
      return;
    }

    boton.disabled = false;
    boton.textContent = etiqueta;
    aviso.className = 'aviso malo';
    aviso.textContent = 'No se pudo enviar en este momento. Vuelve a intentarlo o copia tu resumen para no perderlo.';
    console.error('solicitud', error);
  });
}

function marcar(form, aviso, texto, campo) {
  aviso.className = 'aviso malo';
  aviso.textContent = texto;
  form[campo].focus();
}
