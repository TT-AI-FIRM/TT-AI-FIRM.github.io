/* T.T AI Firm · cotizador: TODOS los valores viven en este archivo.
   Carlos cambia aquí los números y la página entera se recalcula sola.
   Mientras VALORES_CONFIRMADOS sea false, el resultado se marca como ejemplo. */

export const VALORES_CONFIRMADOS = false;

/* ── las cinco preguntas ──
   tipo 'lista'  = menú desplegable (una sola respuesta)
   tipo 'una'    = una sola respuesta, en fichas
   tipo 'varias' = varias respuestas, en fichas
   precio  = pesos que suma esa opción      factor = multiplica el total
   semanas = semanas de trabajo que agrega  ritmo  = multiplica las semanas        */

export const PREGUNTAS = [
  {
    id: 'negocio',
    titulo: '¿Qué tipo de negocio tienes?',
    ayuda: 'Nos dice con qué operación nos vamos a encontrar.',
    tipo: 'lista',
    vacio: 'Elige tu giro…',
    opciones: [
      { id: 'fabrica',      nombre: 'Fábrica o manufactura',            factor: 1.18 },
      { id: 'distribucion', nombre: 'Distribución y logística',         factor: 1.12 },
      { id: 'tienda',       nombre: 'Tienda o cadena de tiendas',       factor: 1.08 },
      { id: 'transporte',   nombre: 'Transporte y flota',               factor: 1.12 },
      { id: 'restaurante',  nombre: 'Restaurante, bar o entretenimiento', factor: 1.05 },
      { id: 'hotel',        nombre: 'Hotel y hospitalidad',             factor: 1.08 },
      { id: 'salud',        nombre: 'Salud y clínicas',                 factor: 1.15 },
      { id: 'construccion', nombre: 'Construcción e inmobiliaria',      factor: 1.10 },
      { id: 'servicios',    nombre: 'Servicios profesionales',          factor: 1.00 },
      { id: 'linea',        nombre: 'Comercio en línea',                factor: 1.05 },
      { id: 'educacion',    nombre: 'Educación y capacitación',         factor: 1.00 },
      { id: 'agro',         nombre: 'Agroindustria',                    factor: 1.12 },
      { id: 'otro',         nombre: 'Otro giro',                        factor: 1.05 }
    ]
  },
  {
    id: 'modulos',
    titulo: '¿Qué te interesa que construyamos?',
    ayuda: 'Elige todo lo que te haga falta. Puedes marcar varios.',
    tipo: 'varias',
    opciones: [
      { id: 'sistema',       nombre: 'Sistema interno de operación', nota: 'El día a día de la empresa', precio: 320000, semanas: 9 },
      { id: 'app',           nombre: 'App para celular',             nota: 'Para tu gente o tus clientes', precio: 220000, semanas: 7 },
      { id: 'ia',            nombre: 'IA propietaria',               nota: 'Un asistente que conoce tu negocio', precio: 280000, semanas: 7 },
      { id: 'base',          nombre: 'Base de datos central',        nota: 'Todo en un solo lugar', precio: 160000, semanas: 5 },
      { id: 'tablero',       nombre: 'Tablero para dirección',       nota: 'Los números del negocio, al día', precio: 130000, semanas: 4 },
      { id: 'automatizacion',nombre: 'Automatización de procesos',   nota: 'Lo que hoy se hace a mano', precio: 140000, semanas: 4 },
      { id: 'portal',        nombre: 'Portal para clientes',         nota: 'Que ellos vean y pidan solos', precio: 150000, semanas: 5 },
      { id: 'punto',         nombre: 'Punto de venta y cobro',       nota: 'Caja, pedidos e inventario', precio: 180000, semanas: 5 },
      { id: 'web',           nombre: 'Página web high end',          nota: 'La cara pública de la marca', precio: 120000, semanas: 4 },
      { id: 'animacion',     nombre: 'Animaciones 3D y video',       nota: 'Producto y marca en movimiento', precio: 90000,  semanas: 3 },
      { id: 'campana',       nombre: 'Campaña y adquisición',        nota: 'Traer clientes y medirlos', precio: 110000, semanas: 3 },
      { id: 'capacitacion',  nombre: 'Capacitación del personal',    nota: 'Con evaluación y seguimiento', precio: 140000, semanas: 5 }
    ]
  },
  {
    id: 'usuarios',
    titulo: '¿Cuánta gente lo va a usar?',
    ayuda: 'Entre más gente, más permisos, más dispositivos y más soporte.',
    tipo: 'una',
    opciones: [
      { id: 'u10',  nombre: 'Hasta 10 personas',   factor: 0.90, ritmo: 0.90 },
      { id: 'u50',  nombre: 'De 11 a 50',          factor: 1.00, ritmo: 1.00 },
      { id: 'u200', nombre: 'De 51 a 200',         factor: 1.20, ritmo: 1.12 },
      { id: 'u500', nombre: 'De 201 a 500',        factor: 1.40, ritmo: 1.25 },
      { id: 'umas', nombre: 'Más de 500 personas', factor: 1.65, ritmo: 1.40 }
    ]
  },
  {
    id: 'conexiones',
    titulo: '¿Con qué se tiene que conectar?',
    ayuda: 'Lo que ya existe en la empresa y no se va a tirar.',
    tipo: 'varias',
    opciones: [
      { id: 'cero',    nombre: 'Nada, empezamos de cero', precio: 0, exclusiva: true },
      { id: 'excel',   nombre: 'Excel y archivos',        precio: 25000 },
      { id: 'erp',     nombre: 'Un ERP o sistema que ya usan', precio: 90000 },
      { id: 'bi',      nombre: 'Power BI o tableros',     precio: 45000 },
      { id: 'maquina', nombre: 'Máquinas o equipo en piso', precio: 120000 },
      { id: 'api',     nombre: 'Otro sistema por conexión directa', nota: 'Pagos, facturación, mensajería', precio: 60000 }
    ]
  },
  {
    id: 'plazo',
    titulo: '¿Para cuándo lo necesitas?',
    ayuda: 'Correr más rápido cuesta más: es más gente al mismo tiempo.',
    tipo: 'una',
    opciones: [
      { id: 'ya',        nombre: 'Ya, este mes',       factor: 1.25 },
      { id: 'trimestre', nombre: 'En 2 o 3 meses',     factor: 1.10 },
      { id: 'semestre',  nombre: 'En 3 a 6 meses',     factor: 1.00 },
      { id: 'explorando',nombre: 'Estamos explorando', factor: 0.95 }
    ]
  }
];

/* ── la matemática del precio ── */

export const PRECIO = {
  moneda: 'MXN',
  descuentoPorModulo: 0.965,   // cada módulo extra abarata el paquete
  anchoRango: 0.12,            // el estimado se muestra como ±12%
  redondeoA: 10000,            // todo se redondea a decenas de millar
  porcentajeMensual: 0.035,    // mensualidad = 3.5% de la inversión
  mensualMinimo: 18000,
  trabajoEnParalelo: 0.45,     // los módulos que no son el más largo cuentan 45%
  holguraSemanas: 3
};

/* ── la auditoría: el paso real que sigue ──
   Valor confirmado por dirección. La auditoría intensiva es la que define,
   sobre la operación real, qué se construye y cuánto cuesta de verdad. */

export const AUDITORIA = {
  nombre: 'Auditoría de Performance intensiva',
  desde: 3500,
  moneda: 'USD',
  duracion: 'Dos semanas',
  acreditable: true,
  entrega: [
    'Dónde se pierde dinero hoy, en pesos y con su causa',
    'Qué se puede mejorar con sistemas y digitalización, priorizado por retorno',
    'El alcance, el orden y el precio firme de lo que se va a construir'
  ]
};
