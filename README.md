# T.T AI Firm · sitio

Landing de la firma: quiénes somos, Profit Engineering, la Auditoría de Performance, los sistemas que construimos, las pruebas y cómo empezar.

- `index.html` — la página (se genera desde `plantilla.html` + los textos del pitch; ver abajo).
- `plantilla.html` — fuente editable. El marcador `__DATA__` se sustituye por el JSON de fugas y nodos que se extrae de `Documents/TT AGENCY/pitch-tt-agency.html`.
- `assets/` — ícono, imagen de vista previa (og) y captura del demo del ERP.

Hero: objeto 3D en vivo (three.js) con anillos que se alinean conforme baja el scroll, partículas y paralaje del puntero; respeta `prefers-reduced-motion`. Si más adelante se genera la película del hero, se coloca en `assets/hero.mp4` y se apunta con `data-src` en `<video id="film">`: el video se recorre con el scroll y el 3D queda detrás.

Contacto: la constante `CONTACTO` (WhatsApp y correo) al inicio del script está vacía a propósito. En cuanto se definan, los botones aparecen solos en la sección de cierre.

Publicado en https://tt-ai-firm.github.io/
