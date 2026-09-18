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
| `assets/` | Película de la portada con sus pósters, ícono e imagen de vista previa |

Ningún archivo pasa de 300 renglones. Cada maqueta es un módulo con la misma forma: `montar(nodo)` devuelve `{ paso(t) }`, y **un solo reloj** en `main.js` las mueve todas, pausando las que no están en pantalla.

## Detalles que conviene no romper

- **La película se recorre con el scroll.** Se trae completa a memoria (`fetch` → blob) porque un servidor sin soporte de rangos no deja saltar dentro del archivo. No se descarga con `prefers-reduced-motion`, ahorro de datos ni red 2G.
- **La palabra de la portada** cambia cada segundo y la lista vive en `PALABRAS`, en `js/main.js`. La caja tiene el ancho de la palabra más larga para que el título no brinque.
- **Contacto:** la constante `CONTACTO` (WhatsApp y correo) está vacía. Al llenarla, los botones aparecen solos en el cierre.
- Parámetros útiles: `?estatico` no se usa aquí (ya no hay 3D); para capturas conviene forzar `.ap{opacity:1}`.

Publicado en https://tt-ai-firm.github.io/
