# T.T AI Firm · sitio web (landing) · brief de trabajo
Fecha: 18-sep-2026. Pedido de Carlos: «landing page para T.T AI Firm, para que conozcan quiénes somos; diseñarla con Higgsfield; con el theme de la empresa; con la info de contexto; animado con Higgsfield, futurístico, 3D animation».

## Identidad (tomada de los materiales existentes de T.T)
- Nombre exacto: **T.T AI Firm** (con punto). Firma consultora de **Profit Engineering**.
- Frase madre (pitch): «La utilidad de tu empresa, tratada como un sistema.»
- Sub: «Auditamos dónde se pierde el dinero, construimos los sistemas y programas que lo recuperan y los conectamos en una sola plataforma. Con seguimiento mensual y con pruebas.»
- Paleta del pitch/acta: tinta #0F1620 · tinta2 #1B2532 · papel #F5F5F0 · gris #5D6672 · acento teal #0E7C86 (fondo #DDEEEF) · a1 rosa #C2417A · a2 azul #2A5FA8 · a3 verde #167F6E · sobre tinta #EDF0F2 / #9AA5B1.
- Tipografía del pitch: Bricolage Grotesque (títulos) + IBM Plex Sans (texto) + IBM Plex Mono (datos).
- Alternativa (sistema interno): tablero oscuro, acento morado, tipografía Outfit.
- Sin logo gráfico: hoy la marca es tipográfica («T.T AI Firm»). Falta decidir un monograma.

## Reglas de contenido (memoria: tt-agency-pitch-materiales)
- Profit Engineering al centro; «auditamos porque resolvemos»; sin datos de mercado ni cifras de terceros.
- Carlos Martínez: arquitecto de un sistema integral que conecta una fábrica de hule con +500 usuarios, +25 programas internos y +30 áreas y procesos, automatizado y con IA, capacitación a la medida, valuado en 7 M MXN. **Sin el nombre de la fábrica.**
- Alberto Navarro: «más de USD 28 millones en ventas generadas en lanzamientos digitales» (cifra declarada por él). **Jamás Ancla.**
- Franco Sánchez: dirección comercial y salud privada. El cierre menciona a los tres.
- Método: conversación con dirección → muestra con información pública → auditoría real a la medida.
- Con quiénes hemos trabajado (auditoría comercial): Allu · Kiwify · Hotmart · 30X · Universidad Online (mismo texto del PDF de All Cabo).
- El motor de generación (Higgsfield) es secreto comercial: la página dice «producimos con inteligencia artificial y dirección humana», nunca «tecnología propia» ni el nombre del motor.
- Datos de contacto y precios: **no definidos** → preguntar a Carlos.

## Estructura propuesta (capítulos sobre la película que se recorre con el scroll)
0. Cortina + hero: «T.T AI FIRM» · «La utilidad de tu empresa, tratada como un sistema.» · CTA «Empezar con una conversación» · CTA secundaria «Ver lo que ya funciona».
1. Qué hacemos · Encontrar (Auditoría de Performance) · Construir (Sistemas y programas a la medida) · Sostener (Conexión y seguimiento).
2. La Auditoría de Performance · dos mitades (comercial / operativa) y el espejo (benchmark) · «Programada a la medida sobre los datos reales de la empresa».
3. Sistemas que construimos · Marketing y adquisición · Flujo económico · Sistema interno · «Todo se conecta: un solo dato recorre la empresa».
4. Con pruebas · sistema integral en manufactura (+500 / +25 / +30 / 7 M MXN) · lanzamientos digitales (USD 28 M+, 10,000+ leads) · demos vivos (plataforma de traslados, sistema para un antro, ERP con asistente de IA) → decidir si van con nombre de cliente o genéricos.
5. Cómo trabajamos · 6 pasos (Conversación 45 min → Muestra sin costo → Auditoría 2 semanas → Plan con precio cerrado → Construcción por módulos → Profit Engineering mensual).
6. Quiénes somos · Alberto · Carlos · Franco (textos aprobados del pitch).
7. Para quién · Manufactura y planta · Salud privada · Marcas y negocios digitales · Servicios con equipo comercial. «Lo que no hacemos».
8. Cierre · «Tres pasos. Los dos primeros no cuestan nada.» · Contacto (WhatsApp con nombre y cara, no formulario · pendiente de Carlos).

## Película del hero (storyboard → video, un solo plano continuo, sin cortes, sin texto)
Mundo: estudio negro-azulado (#0F1620) con niebla suave; un objeto héroe de vidrio y metal oscuro (una máquina-instrumento: un engrane de cristal con anillos concéntricos que se ensamblan) girando lento; haces de luz teal (#0E7C86) y azul (#2A5FA8) recorren sus aristas; al final los anillos quedan alineados y encendidos. Cámara: órbita lenta con push-in, exposición fija, sin flicker, sin texto ni logos. 16:9, ~15 s, sin audio.
Espacio negativo: el objeto ocupa el centro-derecha; lado izquierdo limpio para los títulos.

## Costos medidos con get_cost (no gastan)
- Storyboard 16:9 (gpt_image_2_5): 1 cr.
- Película 15 s 16:9 sin audio: Kling 3.0 pro = 26.25 cr · Cinema Studio 3.0 1080p = 150 cr · Seedance 2.5 1080p = 180 cr.
- Portada/OG 3:2 2k, 2 candidatas (gpt_image_2): 6.5 cr (solo hace falta si se publica dentro de Higgsfield).
- Objeto 3D (image_to_3d): se cotiza con la imagen generada.
Saldo al 18-sep: 2,978.5 cr (plan Ultra).

---

## HECHO Y PUBLICADO (18-sep-2026) · https://tt-ai-firm.github.io/
Carlos eligió la **opción A** (sitio propio, visuales de Higgsfield cuando haga falta). Repo `TT-AI-FIRM/TT-AI-FIRM.github.io` (sitio de la cuenta, por eso queda en la raíz; los demos siguen en sus subcarpetas: `/all-cabo-demo/`, `/canta-corazon-demo/`, `/erp-ia-demo/`, `/tt-sistema/`).

**Lo animado, sin gastar créditos todavía.** El hero es un objeto 3D **en vivo** hecho con three.js (no un video): seis anillos de metal oscuro con emisión teal→azul alrededor de un núcleo de icosaedro con malla; los anillos están inclinados y **se alinean conforme bajas** (el scroll es el control), la cámara se acerca, el campo de partículas se desplaza y el conjunto sigue al puntero. Respeta `prefers-reduced-motion` (pinta un cuadro fijo) y se apaga cuando el hero sale de pantalla.

**Resto de la página:** cortina de carga con la marca, títulos que suben línea por línea, tarjetas con tilt 3D al pasar el mouse, contadores que suben (7 M · +500 · +25 · +30 · USD 28 M+ · 10,000+), la **Auditoría interactiva** (tres pestañas y 17 fugas; cada una abre su «cómo la medimos» y «con qué datos», textos exactos del pitch), la cadena «todo se conecta» con pulso recorriendo los 7 nodos, el riel de los 6 pasos que avanza con el scroll, equipo, para quién, por qué nosotros, «con quiénes hemos trabajado» y el cierre.

**Reglas respetadas:** sin nombre de la fábrica, sin Ancla, sin nombrar el motor de generación («producimos con inteligencia artificial y dirección humana»), cifras declaradas marcadas como tales, los tres socios en el cierre.

**Pendientes para Carlos**
1. **Contacto**: la constante `CONTACTO` (WhatsApp y correo) está vacía en el script; en cuanto la dé, los botones aparecen solos en el cierre.
2. **Demos**: el del ERP va con captura real; los de traslados y antro están como tarjetas «se muestra en la conversación» porque son de clientes. Si autoriza enlazarlos, se cambian por capturas y enlaces reales.
3. **Película del hero** (lote de Higgsfield, ~27 créditos: storyboard 1 + Kling 3.0 pro 15 s 26.25): queda como capa opcional detrás del 3D; se coloca en `assets/hero.mp4` y se apunta con `data-src` en `<video id="film">`.
4. **Dominio**: hoy `tt-ai-firm.github.io`. Cuando compre `ttaifirm.com`, se apunta con CNAME (ojo con [[hb-domain-cname-order]]: primero que resuelva el DNS).
5. Precios: no van en la página (decisión del pitch: «precio fijo acreditable al proyecto»).

## Película generada y landing apretada (18-sep-2026, noche)
- Carlos autorizó el lote. **Gasto real: 27.25 créditos** (2,978.5 → 2,951.25): cuadro de apertura con `gpt_image_2_5` 16:9 = 1 cr, y la película con **Kling 3.0 pro, 15 s, 16:9, sin audio, `start_image` = ese cuadro** = 26.25 cr. Se rechazó el preset «IN THE DARK» que sugirió el servidor para conservar la dirección propia.
- **Qué muestra:** una red de filamentos de luz teal y cobalto, enredada, que la cámara recorre de frente mientras **se ordena hasta volverse una retícula limpia**. Caos que se vuelve sistema; el tercio izquierdo queda oscuro para los títulos. Sin texto, sin objetos, exposición fija, un solo plano.
- **Cómo vive en la página:** `assets/hero.mp4` (1924×1076, 12.3 MB, CRF 22, GOP 8, sin audio, faststart) y `assets/hero-mobile.mp4` (720 px de alto, 5.8 MB), con sus pósters. Se **recorre con el scroll** (el scroll es el control, no un video en bucle) y el objeto 3D queda encima atenuado al 42 %.
- **Detalle técnico que costó encontrarlo:** con el servidor local (python http.server) `video.seekable.end(0)` era 0 y el video no avanzaba, porque ese servidor no atiende peticiones por rango. Solución: se descarga el archivo completo a memoria (`fetch` → `blob` → `createObjectURL`) y de ahí sí se puede saltar cuadro por cuadro en cualquier servidor. Se difiere a `requestIdleCallback`, y no se descarga con `prefers-reduced-motion`, ahorro de datos o red 2G: en esos casos queda solo el 3D.
- **Más tipo landing** (segundo pedido de Carlos): banda de prueba social bajo el hero (Allu · Kiwify · Hotmart · 30X · Universidad Online + «un sistema integral de más de 500 usuarios»), dos llamados intermedios («Empezar con una conversación» y «Quiero mi muestra»), **barra fija de acción en el celular** que aparece al pasar el hero y desaparece en el cierre, «Para quién» y «Por qué nosotros» fundidas en una sola sección con chips y cuatro razones, textos de entrada más cortos y ritmo vertical más apretado (de 7 rem a 5.2 rem). La página bajó de 9,199 a 8,793 px de alto en escritorio.
- Parámetros útiles: `?estatico` apaga el 3D (para capturas headless, que se cuelgan con WebGL), `?nolenis` apaga el scroll suave.
