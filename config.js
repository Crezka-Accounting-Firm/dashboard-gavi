/**
 * CONFIGURACIÓN — GAVI Derma
 * ────────────────────────────────────────────────────────────────
 * Cuando tengas logo y colores reales, edita:
 *   logoUrl          → ruta del archivo logo (ej. "logo.png")
 *   colores.primario → color principal en hex
 *   colores.acento   → color de acento en hex
 *   nombreCliente    → nombre real de la clínica
 * ────────────────────────────────────────────────────────────────
 */
window.DASHBOARD_CONFIG = {

  // ── Identidad ─────────────────────────────────────────────────
  nombreCliente: 'GAVI Derma',
  logoUrl: 'Logo-Gavi.png',

  // ── Colores (provisionales) ───────────────────────────────────
  colores: {
    primario: '#7C3D8F',
    acento:   '#F4A7C3'
  },

  // ── Endpoint único de Google Apps Script ──────────────────────
  sheetsEndpointBase: 'https://script.google.com/macros/s/AKfycbxa-Udr5z8FR5rFlUz5LCx6LppbTGnngAlSJ-8QVkzcufL-DlxWCzm7V0nUhmY_MJbj1A/exec',

  // ── Configuración regional ────────────────────────────────────
  moneda: 'USD',
  localeNumeros: 'es-SV',

  // ── Columnas reales de Google Sheets ─────────────────────────
  columnasVentas: {
    fecha:         'FECHA',
    cliente:       'NOMBRE',
    servicio:      'PROCEDIMIENTO',
    monto:         'MONTO',
    posDad:        'POS (DAD)',
    efectivo:      'EFECTIVO',
    cash:          'CASH',
    transferencia: 'TRANF',
    factura:       'FACTURA',
    hora:          'HORA'
  },
  columnasCompras: {
    fecha:       'FECHA',
    proveedor:   'PROVEEDOR',
    descripcion: 'DOC',
    monto:       'MONTO',
    estado:      'ESTATUS',
    contacto:    'CONTACTO'
  },
  columnasCitas: {
    fecha:    'FECHA',
    paciente: 'CLIENTE',
    contacto: 'CONTACTO',
    servicio: 'Cita de control',
    tiempo:   'TIEMPO',
    hora:     'HORA'
  },

  // ── Categorías de servicios (gráfica de dona) ─────────────────
  categoriasServicios: {
    'Consulta':            /consulta|control|seguimiento/i,
    'Peeling / Facial':    /peeling|facial|limpieza|hydra|oxigeneo|hydrafacial/i,
    'Laser':               /laser|láser|ipl|fotoage|fotorejuvenecimiento|tixel/i,
    'Botox / Rellenos':    /botox|relleno|filler/i,
    'Depilación':          /depilaci/i,
    'Cuerpo':              /exilis|endymed|presoterapia|minishapier/i
  }
};
