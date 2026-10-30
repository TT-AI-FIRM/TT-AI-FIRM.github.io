// Central del fan: todo pasa dentro del celular. Una sola venta, la pieza 023, de principio a fin.
// Coordenadas dentro de la pantalla: la pantalla empieza en (88, 418) del escenario.
import { nodo, tramo, salida, aparecer, telefono, encabezado, USUARIO } from '../comun.js';

const PY = 418; // y del escenario donde empieza la pantalla
const escena = (titulo, sub, tel, extra = '') =>
  nodo(`<div class="claro"><div class="fondo-claro"></div><div class="reticula"></div>${encabezado(titulo, sub)}${tel}${extra}</div>`);
const ver = (n, sel, p) => aparecer(n.querySelector(sel), p);
const mostrar = (n, sel, si) => { const e = n.querySelector(sel); if (e) e.style.display = si ? '' : 'none'; };

// ---------- 2a · Login con Kick ----------
export const login = {
  dur: 5,
  montar: () => escena('Entra con Kick', 'Si eres sub, ves tu precio de sub.', telefono(`
    <div class="paso1">
      <div style="position:absolute;top:330px;left:60px;right:60px;text-align:center">
        <div class="avatar" style="width:220px;height:220px;margin:0 auto;background-image:url(assets/avatar.webp)"></div>
        <div style="font:800 60px Inter;margin-top:40px">TU MARCA</div>
        <div style="font:600 38px Inter;color:#777;margin-top:12px">de @${USUARIO}</div>
      </div>
      <div class="boton kick" style="top:900px">Entrar con Kick</div>
    </div>
    <div class="paso2">
      <div class="chip neon" style="position:absolute;top:290px;left:60px">✓ Sub de @${USUARIO}</div>
      <div class="tarjeta-iri" style="top:410px;left:60px;right:60px;height:760px"></div>
      <div style="position:absolute;top:1200px;left:60px;right:60px;display:flex;justify-content:space-between;align-items:baseline">
        <span style="font:700 46px Inter">Hoodie TU MARCA</span>
        <span><span class="tachado" style="font-size:40px">$1,200</span> <span class="precio">$999</span></span>
      </div>
      <div style="position:absolute;top:1290px;right:60px;font:700 34px Inter;color:#3a8f00">Precio de sub</div>
    </div>`, { titulo: 'Hola,', negrita: '@fan' })),
  paso(t, n) {
    const cambio = t > 2;
    mostrar(n, '.paso1', !cambio); mostrar(n, '.paso2', cambio);
    const b = n.querySelector('.boton.kick'); b.style.transform = `scale(${1 - 0.05 * tramo(t, 1.5, 1.7) + 0.05 * tramo(t, 1.7, 1.9)})`;
    ver(n, '.chip', tramo(t, 2, 2.4)); ver(n, '.tarjeta-iri', tramo(t, 2.1, 2.6));
  },
  hoodie: (t) => t < 2.2 ? null : { look: 'app', x: 540, y: PY + 790, alto: 620, giro: 0.3 + t * 0.25, opacidad: tramo(t, 2.2, 2.6) },
};

// ---------- 2b · Drop con contador ----------
export const drop = {
  dur: 5,
  montar: () => escena('Drop en vivo', 'Viernes 8 pm. Se anuncia en el stream.', telefono(`
    <div style="position:absolute;top:290px;left:60px;right:60px;height:820px;border-radius:56px;background:radial-gradient(70% 60% at 50% 40%,#1d2a14,#050605)"></div>
    <div class="chip neon" style="position:absolute;top:330px;left:100px">DROP 001</div>
    <div class="chip negro" style="position:absolute;top:330px;right:100px;background:#ffffff22">● EN VIVO</div>
    <div style="position:absolute;top:930px;left:100px;right:100px;color:#fff">
      <div class="pixel" style="font:700 40px Pixel;color:#b6ff00">Viernes · 8:00 pm</div>
      <div class="reloj pixel" style="font:700 84px Pixel;margin-top:6px">02:14:07:33</div>
    </div>
    <div style="position:absolute;top:1135px;left:60px;font:700 44px Inter">50 piezas numeradas</div>
    <div class="boton negro aviso-btn" style="top:1210px;height:120px">Avísame cuando abra</div>`, { titulo: 'Discover' })),
  paso(t, n) {
    const s = 2 * 86400 + 14 * 3600 + 7 * 60 + 33 - Math.floor(t * 7), p = (x) => String(x).padStart(2, '0');
    n.querySelector('.reloj').textContent = `${p(Math.floor(s / 86400))}:${p(Math.floor(s / 3600) % 24)}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}`;
    const b = n.querySelector('.aviso-btn'), listo = t > 3;
    b.textContent = listo ? '✓ Te avisamos en tu celular' : 'Avísame cuando abra';
    b.className = 'boton aviso-btn ' + (listo ? 'neon' : 'negro');
  },
  hoodie: (t) => ({ look: 'noche', x: 540, y: PY + 600, alto: 520, giro: -0.5 + t * 0.4 }),
};

// ---------- 2c · Ficha 3D + AR ----------
export const ficha = {
  dur: 7,
  montar: () => escena('Gíralo. Póntelo enfrente.', 'Cada pieza numerada. AR en tu cuarto.', telefono(`
    <div class="vista3d">
      <div class="tarjeta-iri" style="top:270px;left:40px;right:40px;height:980px"></div>
      <div class="chip blanco" style="position:absolute;top:1130px;left:80px;z-index:6">PIEZA 023 / 50</div>
      <div class="dedo" style="position:absolute;top:900px;left:300px;width:110px;height:110px;border-radius:50%;background:#0003;box-shadow:0 0 0 14px #0001"></div>
      <div class="boton negro" style="top:1290px;height:130px">◎ Ver en tu cuarto</div>
    </div>
    <div class="vistaar" style="position:absolute;inset:0;background:linear-gradient(#cfc8bd 0 58%,#a8957c 58%)">
      <div style="position:absolute;left:0;right:0;top:58%;bottom:0;background-image:linear-gradient(#0001 2px,transparent 2px),linear-gradient(90deg,#0001 2px,transparent 2px);background-size:90px 60px;transform:perspective(600px) rotateX(55deg);transform-origin:top"></div>
      <div style="position:absolute;top:180px;left:60%;width:260px;height:340px;background:#e8e2d6;box-shadow:inset 0 0 0 16px #8a7a63"></div>
      <div class="reticulo" style="position:absolute;left:50%;top:1200px;width:420px;height:140px;margin-left:-210px;border:5px solid #fff;border-radius:50%"></div>
      <div class="chip blanco" style="position:absolute;top:270px;left:60px">AR · tu cuarto</div>
    </div>`, { titulo: 'Hoodie', negrita: '023' })),
  paso(t, n) {
    const ar = t > 4.2;
    n.querySelector('.vistaar').style.opacity = tramo(t, 4.2, 4.6);
    n.querySelector('.vista3d').style.opacity = 1 - tramo(t, 4.2, 4.6);
    const d = n.querySelector('.dedo'), arr = tramo(t, 0.8, 3.2);
    d.style.transform = `translateX(${Math.sin(arr * Math.PI) * 340}px)`; d.style.opacity = arr > 0 && arr < 1 ? 1 : 0;
    n.querySelector('.reticulo').style.opacity = ar ? 1 - tramo(t, 5.2, 5.8) : 0;
  },
  hoodie: (t) => t < 4.2
    ? { look: 'app', x: 540, y: PY + 760, alto: 760, giro: 0.35 + Math.sin(tramo(t, 0.8, 3.2) * Math.PI) * 1.6 }
    : { look: 'app', x: 540, y: PY + 1000 - 60 * salida(tramo(t, 4.4, 5.4)), alto: 600, giro: 0.4, opacidad: tramo(t, 4.4, 5) },
};

// ---------- 2d · Puntos del canal → cupón ----------
export const puntos = {
  dur: 5,
  montar: () => escena('Tus puntos valen', 'Canjeas en Kick. El cupón llega solo.', telefono(`
    <div class="aviso" style="top:280px">
      <div style="font:700 30px Inter;color:#3a8f00">KICK · PUNTOS DEL CANAL</div>
      Canjeaste <b>“Cupón TU MARCA”</b> en el chat de @${USUARIO}
    </div>
    <div class="flujo pixel" style="position:absolute;top:560px;left:60px;right:60px;display:flex;justify-content:space-between;font:700 34px Pixel;color:#999">
      <span>Kick</span><span>→</span><span>T.T</span><span>→</span><span style="color:#111">Tu app</span>
    </div>
    <div class="cupon" style="position:absolute;top:700px;left:60px;right:60px;height:520px;border-radius:56px;background:#111;color:#fff;padding:60px">
      <div style="font:600 36px Inter;color:#b6ff00">TU CUPÓN</div>
      <div style="font:700 200px/1 Pixel;color:#b6ff00;margin-top:20px">-15%</div>
      <div style="font:600 40px Inter;margin-top:30px">Código TUMARCA-7Q2K · un solo uso</div>
    </div>`, { titulo: 'Mi', negrita: 'Cartera' })),
  paso(t, n) {
    ver(n, '.aviso', tramo(t, 0.2, 0.7)); ver(n, '.flujo', tramo(t, 1, 1.5)); ver(n, '.cupon', tramo(t, 1.8, 2.4));
    n.querySelector('.cupon').style.transform += ` scale(${0.9 + 0.1 * salida(tramo(t, 1.8, 2.4))})`;
  },
};

// ---------- 2e · Pago ----------
export const pago = {
  dur: 5,
  montar: () => escena('Paga como quieras', 'Apple Pay, tarjeta u OXXO.', telefono(`
    <div style="position:absolute;top:280px;left:60px;right:60px;font:600 42px/1.7 Inter">
      <div style="display:flex;justify-content:space-between"><span>Hoodie 023 · precio sub</span><b>$999</b></div>
      <div style="display:flex;justify-content:space-between;color:#3a8f00"><span>Cupón -15%</span><b>-$150</b></div>
      <div style="display:flex;justify-content:space-between;font-size:56px;border-top:3px solid #eee;margin-top:14px;padding-top:14px"><span>Total</span><b>$849</b></div>
    </div>
    <div class="metodos" style="position:absolute;top:690px;left:60px;right:60px;display:grid;gap:22px;font:700 46px Inter">
      ${['Apple Pay', 'Tarjeta', 'OXXO Pay'].map((m, i) => `<div class="m" style="height:130px;border-radius:34px;display:flex;align-items:center;padding:0 46px;justify-content:space-between;background:#fff;box-shadow:inset 0 0 0 3px ${i ? '#eee' : '#111'}">${m}<span>${i ? '○' : '●'}</span></div>`).join('')}
    </div>
    <div class="boton negro pagar" style="top:1250px;height:140px">Pagar $849</div>
    <div class="exito" style="position:absolute;inset:0;background:#b6ff00;display:grid;place-items:center;text-align:center">
      <div><div style="font:700 220px Pixel">✓</div><div style="font:900 90px Inter">Es tuya.</div><div class="pixel" style="font:700 52px Pixel;margin-top:20px">Pieza 023 / 50</div></div>
    </div>`, { titulo: 'Tu', negrita: 'pedido' })),
  paso(t, n) {
    n.querySelector('.exito').style.opacity = tramo(t, 2.6, 2.9);
    n.querySelector('.pagar').style.transform = `scale(${1 - 0.05 * tramo(t, 2.2, 2.4)})`;
  },
};

// ---------- 2f · NFC + Mi colección ----------
export const coleccion = {
  dur: 9,
  montar: () => escena('Llega. La escaneas.', 'Original, y a tu nombre.', telefono(`
    <div class="escaneo" style="position:absolute;inset:0;background:#0b0b0b;color:#fff">
      <div class="ondas" style="position:absolute;left:50%;top:620px;width:0;height:0"></div>
      <div style="position:absolute;top:1000px;left:60px;right:60px;text-align:center;font:600 42px Inter;color:#ccc">Acerca tu celular a la etiqueta</div>
      <div class="original" style="position:absolute;top:300px;left:60px;right:60px;border-radius:56px;background:#b6ff00;color:#000;padding:60px">
        <div class="pixel" style="font:700 64px Pixel">✓ Original</div>
        <div style="font:700 50px/1.4 Inter;margin-top:20px">Hoodie TU MARCA<br>Pieza 023 / 50<br>Dueño: @fan</div>
        <div style="font:600 32px Inter;margin-top:20px;opacity:.7">Chip NFC no clonable · cosido en la etiqueta</div>
      </div>
    </div>
    <div class="closet">
      ${[0, 1, 2, 3, 4, 5].map((k) => `<div class="tarjeta-iri pila" style="left:${120 + k * 30}px;right:${120 + k * 30}px;top:${520 - k * 46}px;height:120px;filter:hue-rotate(${k * 30}deg);opacity:${1 - k * 0.1}"></div>`).reverse().join('')}
      <div class="tarjeta-iri frente" style="left:70px;right:70px;top:560px;height:820px"></div>
      <div class="chip blanco" style="position:absolute;top:1260px;left:110px">023 / 50 · @fan</div>
    </div>`, { titulo: 'My', negrita: 'Collection' })),
  paso(t, n) {
    const fase2 = tramo(t, 4.3, 4.8);
    n.querySelector('.escaneo').style.opacity = 1 - fase2;
    n.querySelector('.closet').style.opacity = fase2;
    const o = n.querySelector('.ondas');
    o.innerHTML = [0, 1, 2].map((k) => { const f = ((t * 0.9 + k / 3) % 1); return `<div style="position:absolute;left:${-f * 300}px;top:${-f * 300}px;width:${f * 600}px;height:${f * 600}px;border-radius:50%;border:6px solid #b6ff00;opacity:${(1 - f) * (1 - tramo(t, 1.6, 2))}"></div>`; }).join('');
    ver(n, '.original', tramo(t, 1.8, 2.3));
    n.querySelectorAll('.pila').forEach((el, k) => aparecer(el, tramo(t, 4.6 + k * 0.08, 5.1 + k * 0.08)));
    ver(n, '.frente', tramo(t, 5, 5.6));
    const c = n.querySelector('.titulo'), s = n.querySelector('.sub');
    if (t > 4.3) { c.textContent = 'Tu clóset digital'; s.textContent = 'Todo lo que compras, en un lugar.'; }
    else { c.textContent = 'Llega. La escaneas.'; s.textContent = 'Original, y a tu nombre.'; }
  },
  hoodie: (t) => t < 5.1 ? null : { look: 'app', x: 540, y: PY + 990, alto: 640, giro: 0.3 + (t - 5) * 0.3, opacidad: tramo(t, 5.1, 5.6) },
};
