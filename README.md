# T.T AI Firm · sitio

Landing de la firma: quiénes somos, qué ofrecemos y los sistemas que ya corren.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | El contenido y el orden de la página |
| `css/base.css` | Tokens de color y tipografía, atmósfera (cuadrícula y foco), apariciones |
| `css/componentes.css` | Cabecera, botones, tarjetas de vidrio, etiquetas, menú, barra del teléfono |
| `css/secciones.css` | Portada, capacidades, oferta, muestras, pruebas, equipo, cierre, pie |
| `js/main.js` | Palabra que rota, apariciones, navegación, película de la portada y el reloj de las maquetas |
| `js/muestras/*.js` | Una maqueta animada por sistema, más `comun.js` con las piezas compartidas |
| `js/ventana.js` | La ventana interactiva. Sirve para los dos caminos: arma las pantallas desde las preguntas |
| `js/puertas.js` | La primera pantalla: auditoría o demo |
| `js/giros.js` | La lista de giros, compartida por los dos cuestionarios |
| `js/cotizador/datos.js` | **Todos los valores del demo**: las 5 preguntas, sus opciones y sus precios |
| `js/cotizador/precio.js` | La matemática del estimado. Sin pantalla: entran respuestas, sale el número |
| `js/cotizador/resultado.js` | La pantalla final del demo y el resumen que se copia o se envía |
| `js/auditoria/datos.js` | Las 5 preguntas de la auditoría y lo que la auditoría es (USD 3,500) |
| `js/auditoria/pantalla.js` | La pantalla final de la auditoría |
| `js/solicitud.js` | El formulario con el que alguien nos pide algo |
| `js/sistema.js` | La escritura al sistema interno de T.T |
| `js/contacto.js` | WhatsApp y correo, en un solo lugar |
| `css/cotizador.css` | La invitación, la ventana, las puertas y el formulario |
| `assets/` | Película de la portada con sus pósters, ícono e imagen de vista previa |

Ningún archivo pasa de 300 renglones. Cada maqueta es un módulo con la misma forma: `montar(nodo)` devuelve `{ paso(t) }`, y **un solo reloj** en `main.js` las mueve todas, pausando las que no están en pantalla.

## Detalles que conviene no romper

- **La película se recorre con el scroll.** Se trae completa a memoria (`fetch` → blob) porque un servidor sin soporte de rangos no deja saltar dentro del archivo. No se descarga con `prefers-reduced-motion`, ahorro de datos ni red 2G.
- **La palabra de la portada** cambia cada segundo y la lista vive en `PALABRAS`, en `js/main.js`. La caja tiene el ancho de la palabra más larga para que el título no brinque.
- **Contacto:** la constante `CONTACTO` (WhatsApp y correo) vive en `js/contacto.js` y está vacía. Al llenarla, los botones aparecen solos en el cierre **y en el resultado del cotizador** (mientras esté vacía, el resultado ofrece copiar el resumen).
- **FALTA UN PASO PARA QUE LAS SOLICITUDES LLEGUEN.** El sitio escribe en la tabla `solicitudes` de la base de T.T. Esa tabla se crea corriendo una sola vez `supabase/solicitudes.sql` (carpeta del sistema interno) en el editor SQL de Supabase. Mientras no exista, el formulario avisa con honestidad que no se pudo enviar y ofrece copiar el resumen.
- **Dos caminos, una sola ventana.** `ventana.js` no sabe de precios ni de auditorías: pinta lo que le da un cuestionario (`cotizador/cuestionario.js` o `auditoria/cuestionario.js`). Para agregar un tercer camino basta otro cuestionario con `preguntas` y `final(respuestas)`.
- **El cotizador no inventa números.** Todo valor está en `js/cotizador/datos.js`, en un solo bloque. Mientras `VALORES_CONFIRMADOS` sea `false`, el resultado muestra la marca ámbar «valores de ejemplo · pendientes de confirmar» y el resumen lo dice por escrito. El valor de la auditoría (USD 3,500) sí está confirmado por dirección.
- **La auditoría manda.** El resultado pone primero la Auditoría de Performance intensiva y presenta el estimado como orden de magnitud: el alcance firme sale de la auditoría, porque se define sobre la operación de la empresa.
- **Preguntas:** para agregar, quitar o reordenar, se edita `PREGUNTAS`. La pantalla se arma sola; no hay un caso especial por pregunta. Una opción con `exclusiva: true` (como «Nada, empezamos de cero») desmarca a las demás.
- **Para tomar fotos de una sección:** Chrome sin ventana no dibuja nada después de un scroll (sale negro). Lo que sí funciona es copiar el sitio aparte, esconder las demás secciones y forzar `.ap.dentro`, para que la sección quede hasta arriba.

Publicado en https://tt-ai-firm.github.io/
