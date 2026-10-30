// Las 8 pantallas de la app del fan (solo maquetado). Lo que se mueve vive en fan.js.
import { USUARIO } from '../comun.js';

const cabeza = (tit, neg = '', claro = false) =>
  `<div class="cabeza"${claro ? ' style="color:#fff"' : ''}><span>${tit} <b>${neg}</b></span><span class="avatar fan">F</span></div>`;
const fila = (izq, der, estilo = '') => `<div style="display:flex;justify-content:space-between;${estilo}"><span>${izq}</span><b>${der}</b></div>`;
const tarjetaFeed = (y, h, html, fondo = '#fff') =>
  `<div style="position:absolute;left:50px;right:50px;top:${y}px;height:${h}px;border-radius:50px;background:${fondo};box-shadow:0 10px 40px #0001,inset 0 0 0 2px #0000000d;overflow:hidden">${html}</div>`;

export const PANTALLAS = [
  // 0 · login
  `<div class="reticula"></div>
   <div style="position:absolute;top:290px;left:0;right:0;text-align:center">
     <div class="avatar" style="width:250px;height:250px;margin:0 auto;background-image:url(assets/avatar.webp)"></div>
     <div style="font:900 76px Inter;margin-top:44px;letter-spacing:-1px">TU MARCA</div>
     <div style="font:600 38px Inter;color:#777;margin-top:10px">de @${USUARIO}</div>
   </div>
   <div class="boton kick b-kick" style="top:900px">Entrar con Kick</div>
   <div style="position:absolute;top:1075px;left:0;right:0;text-align:center;font:600 30px Inter;color:#999">Sin contraseñas nuevas</div>`,

  // 1 · precio de sub
  `<div class="reticula"></div>${cabeza('Hola,', '@fan')}
   <div class="chip neon chip-sub" style="position:absolute;top:270px;left:60px">✓ Sub de @${USUARIO}</div>
   <div class="tarjeta-iri" style="top:390px;left:50px;right:50px;height:760px"></div>
   <div style="position:absolute;top:1185px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:center">
     <span style="font:800 46px Inter">Hoodie TU MARCA</span>
     <span style="position:relative;font:600 40px Inter;color:#999">$1,200<i class="raya" style="position:absolute;left:0;top:50%;height:5px;background:#e5262a;width:0"></i></span>
   </div>
   <div style="position:absolute;top:1255px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:baseline">
     <span style="font:700 36px Inter;color:#3a8f00">Tu precio de sub</span><span class="precio precio-sub" style="font-size:84px">$1,200</span>
   </div>`,

  // 2 · feed con el drop
  `<div class="reticula"></div>${cabeza('Discover')}
   <div style="position:absolute;top:250px;left:0;right:0;bottom:0;overflow:hidden">
     <div class="feed" style="position:absolute;left:0;right:0;top:0;height:1700px">
       ${tarjetaFeed(10, 840, `
         <div class="chip neon" style="position:absolute;top:40px;left:40px">DROP 001</div>
         <div class="chip" style="position:absolute;top:40px;right:40px;background:#ffffff22;color:#fff">● EN VIVO</div>
         <div style="position:absolute;top:560px;left:44px;right:44px;color:#fff">
           <div class="pixel" style="font:700 38px Pixel;color:#b6ff00">Viernes · 8:00 pm</div>
           <div class="reloj" style="font:800 92px Inter;letter-spacing:2px;margin-top:4px;font-variant-numeric:tabular-nums">02:14:07:33</div>
         </div>
         <div class="boton blanco b-aviso" style="top:710px;left:40px;right:40px;height:100px;font-size:40px">Avísame cuando abra</div>`,
         'radial-gradient(70% 55% at 50% 35%,#1d2a14,#050605)')}
       ${tarjetaFeed(880, 220, `<div style="padding:44px 50px;font:800 46px Inter"><span class="punto-vivo"></span>En vivo ahora</div>
         <div style="padding:0 50px;font:600 36px Inter;color:#777">@${USUARIO} · IRL · CDMX</div>`)}
       ${tarjetaFeed(1130, 220, `<div style="padding:44px 50px;font:800 46px Inter">Vota el próximo diseño</div>
         <div style="padding:0 50px;font:600 36px Inter;color:#777">3 opciones · cierra el domingo</div>`)}
       ${tarjetaFeed(1380, 220, `<div style="padding:44px 50px;font:800 46px Inter">Nuevo en la tienda</div>
         <div style="padding:0 50px;font:600 36px Inter;color:#777">Gorra TU MARCA · $450</div>`)}
     </div>
   </div>
   <div class="toast aviso" style="top:110px">🔔 Te avisamos el viernes a las 7:55 pm</div>`,

  // 3 · ficha 3D y AR
  `<div class="reticula"></div>${cabeza('Hoodie', '023')}
   <div class="tarjeta-iri" style="top:260px;left:40px;right:40px;height:960px"></div>
   <div class="chip blanco chip-pieza" style="position:absolute;top:1130px;left:80px">PIEZA 023 / 50</div>
   <div class="chip negro" style="position:absolute;top:1130px;right:80px">Quedan 27</div>
   <div class="boton negro" style="top:1290px;height:130px">◎ Ver en tu cuarto</div>
   <div class="ar" style="position:absolute;inset:0;background:linear-gradient(#d8d1c5 0 57%,#a8957c 57%)">
     <div style="position:absolute;left:0;right:0;top:57%;bottom:0;background-image:linear-gradient(#0002 2px,transparent 2px),linear-gradient(90deg,#0002 2px,transparent 2px);background-size:110px 70px;transform:perspective(600px) rotateX(55deg);transform-origin:top"></div>
     <div style="position:absolute;top:200px;left:58%;width:280px;height:360px;background:#efe9dd;box-shadow:inset 0 0 0 18px #8a7a63"></div>
     <div class="sombra" style="position:absolute;left:50%;top:1205px;width:520px;height:90px;margin-left:-260px;border-radius:50%;background:radial-gradient(#0008,transparent 70%)"></div>
     <div class="reticulo" style="position:absolute;left:50%;top:1180px;width:460px;height:140px;margin-left:-230px;border:5px solid #fff;border-radius:50%"></div>
     <div class="chip blanco" style="position:absolute;top:250px;left:60px">AR · tu cuarto</div>
     <div class="chip negro" style="position:absolute;top:250px;right:60px">● REC</div>
   </div>`,

  // 4 · cartera: canje en Kick → cupón
  `<div class="reticula"></div>${cabeza('Mi', 'Cartera')}
   <div class="banner aviso" style="top:110px"><div style="font:800 28px Inter;color:#3a8f00;letter-spacing:2px">KICK · PUNTOS DEL CANAL</div>
     Canjeaste <b>“Cupón TU MARCA”</b> por 2,000 puntos</div>
   <div class="cupon" style="position:absolute;top:290px;left:50px;right:50px;height:600px;border-radius:56px;background:#111;color:#fff;padding:60px">
     <div style="font:700 36px Inter;color:#b6ff00;letter-spacing:2px">TU CUPÓN</div>
     <div style="font:900 220px/1 Inter;color:#b6ff00;margin-top:24px;letter-spacing:-6px">-15%</div>
     <div style="font:600 40px Inter;margin-top:36px">TUMARCA-7Q2K · un solo uso</div>
     <div style="font:600 32px Inter;color:#fff8;margin-top:10px">Válido 7 días · lo emitió T.T al recibir tu canje</div>
   </div>
   <div class="flujo" style="position:absolute;top:960px;left:50px;right:50px;height:150px;border-radius:40px;background:#fff;box-shadow:inset 0 0 0 2px #0000000d">
     <div style="position:absolute;left:8%;right:8%;top:73px;height:4px;background:#e4e4e4"></div>
     <div class="pulso" style="position:absolute;top:61px;width:28px;height:28px;margin-left:-14px;border-radius:50%;background:#b6ff00;box-shadow:0 0 20px #b6ff00"></div>
     <div style="position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:0 40px;font:800 38px Inter">
       <span style="background:#fff;padding:0 10px">Kick</span><span style="background:#fff;padding:0 10px">T.T</span><span style="background:#fff;padding:0 10px">Tu app</span></div>
   </div>`,

  // 5 · pago
  `<div class="reticula"></div>${cabeza('Tu', 'pedido')}
   <div style="position:absolute;top:270px;left:60px;right:60px;font:600 42px/1.75 Inter">
     ${fila('Hoodie 023 · precio sub', '$999')}${fila('Cupón -15%', '-$150', 'color:#3a8f00')}
     ${fila('Total', '$849', 'font-size:58px;border-top:3px solid #eee;margin-top:14px;padding-top:14px')}
   </div>
   <div style="position:absolute;top:690px;left:60px;right:60px;display:grid;gap:22px;font:800 46px Inter">
     ${['Apple Pay', 'Tarjeta', 'OXXO Pay'].map((m, i) => `<div class="${i ? '' : 'm-apple'}" style="height:130px;border-radius:34px;display:flex;align-items:center;padding:0 46px;justify-content:space-between;background:#fff;box-shadow:inset 0 0 0 3px ${i ? '#eee' : '#111'}">${m}<span>${i ? '○' : '●'}</span></div>`).join('')}
   </div>
   <div class="boton negro" style="top:1250px;height:140px">Pagar $849</div>
   <div class="hoja" style="position:absolute;left:0;right:0;bottom:0;height:640px;border-radius:70px 70px 0 0;background:#111;color:#fff;text-align:center;padding-top:110px">
     <div class="anillo" style="width:150px;height:150px;margin:0 auto;border-radius:50%;border:12px solid #ffffff22;border-top-color:#b6ff00"></div>
     <div style="font:800 50px Inter;margin-top:50px">Confirmando pago…</div></div>
   <div class="exito" style="position:absolute;inset:0;background:#b6ff00;display:grid;place-items:center;text-align:center">
     <div class="confeti"></div>
     <div><div class="check" style="font:900 260px/1 Inter">✓</div><div style="font:900 100px Inter;letter-spacing:-2px">Es tuya.</div>
       <div style="font:800 52px Inter;margin-top:20px">Pieza 023 / 50</div></div></div>`,

  // 6 · escaneo NFC
  `<div style="position:absolute;inset:0;background:#0b0b0b;color:#fff">
     ${cabeza('Escanear', '', true)}
     <div class="ondas" style="position:absolute;left:50%;top:640px;width:0;height:0"></div>
     <div class="etiqueta" style="position:absolute;left:50%;top:1050px;width:420px;height:300px;margin-left:-210px;border-radius:24px;background:repeating-linear-gradient(90deg,#e8e4da 0 6px,#ddd8cc 6px 12px);color:#111;display:grid;place-items:center;text-align:center;box-shadow:0 20px 60px #000a">
       <div><div style="font:900 52px Inter">TU MARCA</div><div style="font:700 30px Inter;margin-top:10px">◉ NFC · 023/50</div></div></div>
     <div style="position:absolute;top:960px;left:60px;right:60px;text-align:center;font:600 40px Inter;color:#bbb">Acerca tu celular a la etiqueta</div>
     <div class="confeti2" style="position:absolute;left:50%;top:600px"></div>
     <div class="original" style="position:absolute;top:290px;left:50px;right:50px;border-radius:56px;background:#b6ff00;color:#000;padding:60px">
       <div style="font:900 70px Inter">✓ Original</div>
       <div style="font:800 50px/1.4 Inter;margin-top:20px">Hoodie TU MARCA<br>Pieza 023 / 50<br>Dueño: @fan</div>
       <div style="font:600 32px Inter;margin-top:20px;opacity:.7">Chip NFC no clonable, cosido en la etiqueta</div></div>
   </div>`,

  // 7 · clóset digital
  `<div class="reticula"></div>${cabeza('My', 'Collection')}
   ${[5, 4, 3, 2, 1].map((k) => `<div class="tarjeta-iri pila" style="left:${80 + k * 26}px;right:${80 + k * 26}px;top:${560 - k * 50}px;height:140px;filter:hue-rotate(${k * 35}deg)"></div>`).join('')}
   <div class="tarjeta-iri segunda" style="left:60px;right:60px;top:560px;height:800px;filter:hue-rotate(160deg)"></div>
   <div class="tarjeta-iri frente" style="left:60px;right:60px;top:560px;height:800px"></div>
   <div class="chip blanco cuenta-closet" style="position:absolute;top:1270px;left:100px">023 / 50 · Drop 001</div>`,
];
