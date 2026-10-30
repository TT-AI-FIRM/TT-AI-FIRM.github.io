# Demo conceptual · marca de ropa de @jointkidkick

Video vertical de 90 s (1080×1920) hecho en código: HTML + three.js.

- `index.html` es la página que se comparte: el MP4 (`assets/jointkid-demo-720.mp4`), un botón para verlo con sonido y el enlace a la versión en vivo.
- `vivo.html` corre el video en el navegador, en tiempo real. De ahí se exporta el MP4 cuadro por cuadro.
- Música: “Voltaic”, Kevin MacLeod (incompetech.com), CC BY 4.0, recortada a 90 s en `assets/audio/`. El crédito va en el cierre y en la página. El hoodie 3D no viene de un modelo externo: se arma en `js/hoodie.js`.

| Archivo | Qué contiene |
|---|---|
| `js/main.js` | El reloj y el orden de las 15 escenas. El mismo segundo siempre da el mismo cuadro |
| `js/hoodie.js` | El hoodie 3D y sus dos looks: `app` (blanco) y `noche` (negro con neón) |
| `js/escenas/campana.js` | Entrada (T.T AI FIRM × moneda 3D con el logo del canal), ráfaga de lo que sigue y cierre |
| `js/escenas/fan.js` | Central del fan: un solo celular, pantallas que se deslizan y un dedo que toca. `fan-pantallas.js` tiene el maquetado |
| `js/escenas/stream.js` | Overlay de T.T en el stream y el chat corriendo |
| `js/escenas/dueno.js` | Central del dueño: la cámara recorre una ventana de escritorio y el cursor navega Hoy, Pedidos, Drops, Finanzas e IA. `dueno-vistas.js` tiene el maquetado |

- En `vivo.html`: `?t=12.5` congela el video en ese segundo. `?exportar` no arranca solo: el exportador llama `window.irA(t)` cuadro por cuadro.
- Las cifras son de meta y coherentes entre escenas (38 piezas, $39,850, ganancia $20,200). Viven al inicio de `dueno-vistas.js`.
- Kick: solo lo que da su API pública. Seguidores, historial de viewers e ingresos no salen de Kick; la gráfica dice que los viewers los guarda T.T.
