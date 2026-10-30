// El hoodie 3D: hecho en código, sin modelo externo.
// La cámara está calibrada para que 1 unidad = 1 px del escenario de 1080×1920,
// así cada escena lo coloca con coordenadas de pantalla: ponerHoodie({ x, y, alto, giro, look }).
import * as THREE from '../lib/three.module.min.js';
import { RoomEnvironment } from '../lib/RoomEnvironment.js';

const W = 1080, H = 1920, FOV = 16;
const D = H / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));

let renderer, scene, camera, grupo, tela, resorte, cordon, luces, visible = false;

// ---------- ruido ----------
function hash(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function ruido(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const l = (a, b, t) => a + (b - a) * t, c = (i, j, k) => hash(xi + i, yi + j, zi + k);
  return l(l(l(c(0,0,0), c(1,0,0), u), l(c(0,1,0), c(1,1,0), u), v),
           l(l(c(0,0,1), c(1,0,1), u), l(c(0,1,1), c(1,1,1), u), v), w) * 2 - 1;
}
const fbm = (x, y, z) => ruido(x, y, z) * 0.6 + ruido(x * 2.1, y * 2.1, z * 2.1) * 0.28 + ruido(x * 4.3, y * 4.3, z * 4.3) * 0.12;

// ---------- texturas ----------
function normalFelpa() {
  const s = 512, c = document.createElement('canvas'); c.width = c.height = s;
  const g = c.getContext('2d'), img = g.createImageData(s, s), alto = new Float32Array(s * s);
  let semilla = 7; const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < s * s; i++) alto[i] = azar() * 0.6 + 0.2 * Math.sin((i % s) * 0.9);
  for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) {
    const i = y * s + x, dx = alto[y * s + (x + 1) % s] - alto[i], dy = alto[((y + 1) % s) * s + x] - alto[i];
    const n = new THREE.Vector3(-dx, -dy, 1).normalize();
    img.data.set([(n.x * .5 + .5) * 255, (n.y * .5 + .5) * 255, (n.z * .5 + .5) * 255, 255], i * 4);
  }
  g.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); return t;
}
function normalResorte() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 8; const g = c.getContext('2d');
  for (let x = 0; x < 256; x++) { g.fillStyle = `rgb(${128 + Math.sin(x / 256 * Math.PI * 32) * 110},128,255)`; g.fillRect(x, 0, 1, 8); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(6, 1); return t;
}
function texturaEstampado(color) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 256; const g = c.getContext('2d');
  g.fillStyle = color; g.font = '900 150px Inter, Helvetica, Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('TU MARCA', 512, 128);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

function desplazar(geo, fn) {
  geo.computeVertexNormals();
  const p = geo.attributes.position, n = geo.attributes.normal, v = new THREE.Vector3(), nn = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) { v.fromBufferAttribute(p, i); nn.fromBufferAttribute(n, i); v.addScaledVector(nn, fn(v)); p.setXYZ(i, v.x, v.y, v.z); }
  geo.computeVertexNormals();
}

// ---------- la prenda (alto ≈ 1.45 unidades, centrada) ----------
function armarPrenda() {
  const g = new THREE.Group(), ZS = 0.58;
  const frenteZ = (x, r = 0.44) => Math.sqrt(Math.max(0, r * r - x * x)) * ZS;

  const perfil = [[0.395,-0.50],[0.415,-0.44],[0.43,-0.30],[0.44,-0.05],[0.445,0.15],[0.44,0.28],[0.40,0.36],[0.31,0.42],[0.21,0.455],[0.14,0.47]]
    .map(([r, y]) => new THREE.Vector2(r, y));
  const torso = new THREE.LatheGeometry(new THREE.SplineCurve(perfil).getPoints(80), 160);
  torso.scale(1, 1, ZS);
  desplazar(torso, (v) => {
    const k = THREE.MathUtils.smoothstep(-v.y, 0.2, 0.46);
    return fbm(v.x * 3, v.y * 3, v.z * 3) * 0.012 + Math.sin(v.y * 70 + fbm(v.x * 4, 0, v.z * 4) * 4) * 0.006 * k
      + Math.sin(v.x * 22 + fbm(v.x, v.y * 2, 1) * 3) * 0.004 * (1 - k);
  });
  g.add(new THREE.Mesh(torso, tela));

  const cintura = new THREE.Mesh(new THREE.CylinderGeometry(0.385, 0.39, 0.10, 160, 1, true), resorte);
  cintura.scale.z = ZS; cintura.position.y = -0.545; g.add(cintura);
  const borde = new THREE.Mesh(new THREE.TorusGeometry(0.385, 0.012, 12, 160), resorte);
  borde.rotation.x = Math.PI / 2; borde.scale.y = ZS; borde.position.y = -0.595; g.add(borde);

  for (const sx of [1, -1]) {
    const curva = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.22 * sx, 0.36, 0), new THREE.Vector3(0.40 * sx, 0.29, 0), new THREE.Vector3(0.53 * sx, 0.10, 0.02),
      new THREE.Vector3(0.60 * sx, -0.12, 0.05), new THREE.Vector3(0.62 * sx, -0.36, 0.08), new THREE.Vector3(0.61 * sx, -0.48, 0.09)]);
    const seg = 120, rad = 64, geo = new THREE.TubeGeometry(curva, seg, 1, rad, false);
    const p = geo.attributes.position, c = new THREE.Vector3(), v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      const s = Math.floor(i / (rad + 1)) / seg, a = (i % (rad + 1)) / rad * Math.PI * 2;
      curva.getPointAt(s, c); v.fromBufferAttribute(p, i).sub(c);
      let r = THREE.MathUtils.lerp(0.165, 0.118, s) * (s < 0.12 ? THREE.MathUtils.lerp(0.75, 1, s / 0.12) : 1);
      r += Math.sin(s * 95 + Math.sin(a * 3) * 1.5) * 0.009 * THREE.MathUtils.smoothstep(s, 0.7, 0.95);
      r += Math.sin(a * 2 + s * 30) * 0.006 * Math.exp(-((s - 0.45) ** 2) / 0.01);
      r += fbm(c.x * 4 + Math.cos(a), c.y * 4, Math.sin(a)) * 0.01;
      v.normalize().multiplyScalar(r); v.z *= 0.85; v.add(c); p.setXYZ(i, v.x, v.y, v.z);
    }
    geo.computeVertexNormals(); g.add(new THREE.Mesh(geo, tela));
    const fin = curva.getPointAt(1), tan = curva.getTangentAt(1);
    const puno = new THREE.Mesh(new THREE.CylinderGeometry(0.112, 0.105, 0.11, 64, 1, true), resorte);
    puno.position.copy(fin).addScaledVector(tan, 0.045);
    puno.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tan); puno.scale.z = 0.85; g.add(puno);
  }

  const gorro = new THREE.SphereGeometry(0.26, 96, 64, 0, Math.PI * 2, 0, Math.PI * 0.62);
  gorro.rotateX(-Math.PI * 0.5 - 0.45); gorro.scale(1, 1.05, 0.95);
  desplazar(gorro, (v) => fbm(v.x * 6, v.y * 6, v.z * 6) * 0.01 + Math.sin(v.x * 30) * 0.004);
  const capucha = new THREE.Mesh(gorro, tela); capucha.position.set(0, 0.58, -0.07); g.add(capucha);
  const orilla = new THREE.Mesh(new THREE.TorusGeometry(0.205, 0.03, 20, 120), tela);
  orilla.position.set(0, 0.6, 0.085); orilla.rotation.x = -0.45; orilla.scale.set(1, 1.18, 1); g.add(orilla);
  const cuello = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.16, 0.12, 64, 1, true), tela);
  cuello.scale.z = ZS * 1.1; cuello.position.y = 0.5; g.add(cuello);

  const metal = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 1, roughness: 0.3 });
  for (const sx of [-1, 1]) {
    const c = new THREE.CatmullRomCurve3([new THREE.Vector3(0.07 * sx, 0.47, 0.2), new THREE.Vector3(0.085 * sx, 0.35, 0.255),
      new THREE.Vector3(0.075 * sx, 0.18, 0.265), new THREE.Vector3(0.09 * sx, 0.06, 0.262)]);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(c, 40, 0.008, 10), cordon));
    const punta = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.045, 12), metal);
    punta.position.set(0.09 * sx, 0.035, 0.262); g.add(punta);
  }

  const bolsa = new THREE.PlaneGeometry(0.56, 0.24, 80, 30), bp = bolsa.attributes.position;
  for (let i = 0; i < bp.count; i++) {
    const y = bp.getY(i), x = bp.getX(i) * THREE.MathUtils.lerp(1, 0.78, (y + 0.12) / 0.24);
    bp.setXYZ(i, x, y - 0.25, frenteZ(x) + 0.014 + fbm(x * 8, y * 8, 2) * 0.004);
  }
  bolsa.computeVertexNormals(); g.add(new THREE.Mesh(bolsa, tela));
  for (const sx of [-1, 1]) {
    const a = new THREE.Vector3(0.28 * sx, -0.37, frenteZ(0.28) + 0.016), b = new THREE.Vector3(0.218 * sx, -0.13, frenteZ(0.218) + 0.016);
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.LineCurve3(a, b), 10, 0.006, 8), tela));
  }

  const est = new THREE.PlaneGeometry(0.42, 0.105, 60, 4), ep = est.attributes.position;
  for (let i = 0; i < ep.count; i++) { ep.setZ(i, frenteZ(ep.getX(i), 0.445) + 0.022); ep.setY(i, ep.getY(i) + 0.15); }
  est.computeVertexNormals();
  const estampado = new THREE.Mesh(est, new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.8 }));
  estampado.name = 'estampado'; g.add(estampado);
  return g;
}

// Los looks: "app" (blanco de catálogo) y "noche" (negro con contraluz neón).
const LOOKS = {
  app:   { tela: 0xe9e7e1, brillo: 0xffffff, cordon: 0xdedbd2, tinta: '#1b1b1b', key: 2.2, neon: 0.8, exp: 1.05 },
  noche: { tela: 0x1a1a1a, brillo: 0x8a8f86, cordon: 0xb6ff00, tinta: '#b6ff00', key: 1.4, neon: 4.5, exp: 0.9 },
};
const texturas = {};

export function montarHoodie(lienzo) {
  renderer = new THREE.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(renderer), 0.04).texture;
  camera = new THREE.PerspectiveCamera(FOV, W / H, 10, D * 3);
  camera.position.set(W / 2, -H / 2, D); camera.lookAt(W / 2, -H / 2, 0);

  tela = new THREE.MeshPhysicalMaterial({ roughness: 0.92, sheen: 1, sheenRoughness: 0.55, normalMap: normalFelpa(),
    normalScale: new THREE.Vector2(0.35, 0.35), side: THREE.DoubleSide });
  resorte = tela.clone(); resorte.normalMap = normalResorte(); resorte.normalScale = new THREE.Vector2(1.2, 1.2);
  cordon = new THREE.MeshStandardMaterial({ roughness: 0.7 });
  grupo = armarPrenda(); scene.add(grupo);

  const key = new THREE.DirectionalLight(0xffffff, 2); key.position.set(2, 3, 4);
  const fill = new THREE.DirectionalLight(0xdfe8ff, 0.6); fill.position.set(-3, 1, 2);
  const neonA = new THREE.DirectionalLight(0xb6ff00, 1); neonA.position.set(-2.5, 2, -3);
  const neonB = new THREE.DirectionalLight(0xb6ff00, 1); neonB.position.set(2.5, 0.5, -3);
  luces = { key, neonA, neonB }; scene.add(key, fill, neonA, neonB);
}

// Pone el hoodie en el escenario. Sin argumento (o null) lo esconde.
export function ponerHoodie(o) {
  if (!o) { if (visible) { renderer.clear(); visible = false; } return; }
  const L = LOOKS[o.look || 'app'];
  tela.color.setHex(o.color ?? L.tela); tela.sheenColor.setHex(L.brillo);
  resorte.color.copy(tela.color); resorte.sheenColor.copy(tela.sheenColor);
  cordon.color.setHex(L.cordon);
  const est = grupo.getObjectByName('estampado');
  texturas[L.tinta] ??= texturaEstampado(L.tinta);
  est.material.map = texturas[L.tinta]; est.material.needsUpdate = true;
  luces.key.intensity = L.key; luces.neonA.intensity = L.neon; luces.neonB.intensity = L.neon * 0.66;
  renderer.toneMappingExposure = L.exp;
  const s = o.alto / 1.45;
  grupo.scale.setScalar(s); grupo.position.set(o.x, -o.y, 0);
  grupo.rotation.set(o.inclina || 0, o.giro || 0, 0);
  renderer.domElement.style.opacity = o.opacidad ?? 1;
  renderer.render(scene, camera); visible = true;
}
