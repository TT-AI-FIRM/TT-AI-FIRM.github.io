/* T.T AI Firm · la auditoría: sus cinco preguntas y lo que es.
   No calcula precio: la auditoría intensiva tiene un piso fijo y el resto sale de ella. */

import { GIROS } from '../giros.js';

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

export const PREGUNTAS = [
  {
    id: 'negocio',
    titulo: '¿Qué tipo de negocio tienes?',
    ayuda: 'Para saber con qué operación nos vamos a encontrar.',
    tipo: 'lista',
    vacio: 'Elige tu giro…',
    opciones: GIROS
  },
  {
    id: 'tamano',
    titulo: '¿De qué tamaño es la empresa?',
    ayuda: 'Cuánta gente trabaja ahí, entre piso y oficina.',
    tipo: 'una',
    opciones: [
      { id: 't10',  nombre: 'Hasta 10 personas' },
      { id: 't50',  nombre: 'De 11 a 50' },
      { id: 't200', nombre: 'De 51 a 200' },
      { id: 't500', nombre: 'De 201 a 500' },
      { id: 'tmas', nombre: 'Más de 500 personas' }
    ]
  },
  {
    id: 'duele',
    titulo: '¿Qué es lo que más te está costando hoy?',
    ayuda: 'Marca todo lo que aplique. Es por donde vamos a entrar.',
    tipo: 'varias',
    opciones: [
      { id: 'vender',     nombre: 'Vender más y traer clientes' },
      { id: 'seguimiento',nombre: 'Dar seguimiento a los clientes', nota: 'Se enfrían o se pierden' },
      { id: 'mano',       nombre: 'Demasiado proceso a mano',       nota: 'Papeles, capturas, dobles cuentas' },
      { id: 'numeros',    nombre: 'No hay números confiables',      nota: 'Cada quien trae su versión' },
      { id: 'operacion',  nombre: 'Paros, mermas o retrabajo' },
      { id: 'inventario', nombre: 'Inventario y almacén' },
      { id: 'cobranza',   nombre: 'Cobranza y facturación' },
      { id: 'gente',      nombre: 'Capacitación del personal' },
      { id: 'nose',       nombre: 'No sé por dónde empezar',        nota: 'Para eso es la auditoría' }
    ]
  },
  {
    id: 'digital',
    titulo: '¿Qué tanto está digitalizado hoy?',
    ayuda: 'Con qué trabajan en este momento.',
    tipo: 'una',
    opciones: [
      { id: 'papel',  nombre: 'Papel y WhatsApp' },
      { id: 'excel',  nombre: 'Excel, sobre todo' },
      { id: 'uno',    nombre: 'Un sistema que ya usamos' },
      { id: 'varios', nombre: 'Varios sistemas que no se hablan entre sí' }
    ]
  },
  {
    id: 'reunion',
    titulo: '¿Cómo quieres la reunión?',
    ayuda: 'La primera es de 45 minutos con dirección.',
    tipo: 'una',
    opciones: [
      { id: 'zoom',      nombre: 'Por Zoom' },
      { id: 'presencial',nombre: 'Presencial, en sus oficinas' },
      { id: 'llamada',   nombre: 'Una llamada primero' }
    ]
  }
];

export const CUANDO = [
  { id: 'semana',   nombre: 'Esta semana' },
  { id: 'proxima',  nombre: 'La próxima semana' },
  { id: 'mes',      nombre: 'Este mes' },
  { id: 'nose',     nombre: 'Aún no sé' }
];
