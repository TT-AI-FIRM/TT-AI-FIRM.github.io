# T.T AI Firm · sitio

Landing de la firma: quiénes somos, Profit Engineering, la Auditoría de Performance, los sistemas que construimos, las pruebas y cómo empezar.

- `index.html` — la página (se genera desde `plantilla.html` + los textos del pitch; ver abajo).
- `plantilla.html` — fuente editable. El marcador `__DATA__` se sustituye por el JSON de fugas y nodos que se extrae de `Documents/TT AGENCY/pitch-tt-agency.html`.
- `assets/` — ícono, imagen de vista previa (og) y captura del demo del ERP.

Hero: **película generada** (`assets/hero.mp4`, 15 s, versión de celular en `hero-mobile.mp4`) que **se recorre con el scroll**, con el objeto 3D en vivo (three.js) encima, atenuado. La película se trae completa a memoria (blob) porque un servidor sin soporte de rangos no deja saltar dentro del archivo; mientras llega se ve el póster y el 3D a toda luz. Respeta `prefers-reduced-motion` y no se descarga con ahorro de datos o red lenta. `?estatico` apaga el 3D (para capturas) y `?nolenis` el scroll suave.

Contacto: la constante `CONTACTO` (WhatsApp y correo) al inicio del script está vacía a propósito. En cuanto se definan, los botones aparecen solos en la sección de cierre.

Publicado en https://tt-ai-firm.github.io/
