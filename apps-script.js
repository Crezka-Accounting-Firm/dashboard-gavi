/**
 * APPS SCRIPT PROXY MULTI-HOJA — Clínica Dermatológica
 * ═══════════════════════════════════════════════════════
 *
 * Este script expone las 3 pestañas (Ventas, Compras, Citas) desde
 * UN SOLO despliegue de Apps Script usando el parámetro ?hoja=
 *
 * ── INSTRUCCIONES ───────────────────────────────────────────────
 *
 * PASO 1 — Abrir Apps Script
 *   - En tu Google Sheet ve a: Extensiones → Apps Script
 *
 * PASO 2 — Limpiar el editor
 *   ⚠️ MUY IMPORTANTE: presiona Ctrl+A para SELECCIONAR TODO
 *      y luego DELETE para borrar todo el contenido.
 *      Si no lo haces, el código de plantilla de Google
 *      ("function myFunction() {}") envolverá tu código
 *      y doGet no funcionará.
 *
 * PASO 3 — Pegar este archivo completo
 *   - Pega TODO el contenido de este archivo en el editor.
 *   - Verifica que la primera línea sea el comentario /** (esta línea).
 *
 * PASO 4 — Ajustar los nombres de tus pestañas
 *   - En la sección HOJAS_PERMITIDAS abajo, reemplaza los valores
 *     con los nombres EXACTOS de tus pestañas en Google Sheets
 *     (respetando mayúsculas, tildes y espacios).
 *
 * PASO 5 — Implementar
 *   - Menú: Implementar → Nueva implementación
 *   - Tipo:               Aplicación web
 *   - Ejecutar como:      Yo
 *   - Quién tiene acceso: Cualquier usuario  ← OBLIGATORIO
 *   - Clic en "Implementar" → Autoriza si te lo pide → Copiar la URL /exec
 *
 * PASO 6 — Pegar la URL en config.js
 *   - Abre config.js de tu dashboard
 *   - Reemplaza el valor de sheetsEndpointBase con esa URL
 *   - La URL luce así: https://script.google.com/macros/s/XXXXXXXXX/exec
 *
 * PASO 7 — Probar antes de publicar
 *   - Abre en el navegador: TU_URL/exec?hoja=ventas
 *   - Deberías ver un JSON con las filas de la pestaña Ventas
 *   - Prueba también: ?hoja=compras  y  ?hoja=citas
 *
 * ⚠️ IMPORTANTE: cada vez que edites este código, debes ir a
 *    Implementar → Gestionar implementaciones → ícono de lápiz (editar)
 *    → "Nueva versión" → Guardar.
 *    Solamente guardar el código NO actualiza el endpoint /exec.
 *
 * ─────────────────────────────────────────────────────────────────
 *
 *  CLAVE INTERNA (la usa el dashboard)  →  Nombre EXACTO de la pestaña
 *  ─────────────────────────────────────────────────────────────────
 *  Ajusta los valores de la derecha si tus pestañas tienen otro nombre.
 */

const HOJAS_PERMITIDAS = {
  ventas:   'VENTAS',    // ← nombre exacto de tu pestaña de ventas
  compras:  'COMPRAS',   // ← nombre exacto de tu pestaña de compras
  citas:    'CITAS'      // ← nombre exacto de tu pestaña de citas
};

// ─────────────────────────────────────────────────────────────────
// NO modificar nada debajo de esta línea
// ─────────────────────────────────────────────────────────────────

function doGet(e) {
  try {
    const claveHoja = e && e.parameter ? e.parameter.hoja : null;

    // Sin parámetro: devuelve TODAS las hojas en un solo objeto (útil para pruebas)
    if (!claveHoja) {
      const resultado = {};
      Object.keys(HOJAS_PERMITIDAS).forEach(clave => {
        resultado[clave] = leerHoja(HOJAS_PERMITIDAS[clave]);
      });
      return respuestaJSON(resultado);
    }

    // Validar que la clave sea conocida
    if (!HOJAS_PERMITIDAS[claveHoja]) {
      return respuestaJSON({
        error: 'Clave de hoja no reconocida: "' + claveHoja + '"',
        hojasDisponibles: Object.keys(HOJAS_PERMITIDAS)
      });
    }

    const datos = leerHoja(HOJAS_PERMITIDAS[claveHoja]);

    if (datos === null) {
      return respuestaJSON({
        error: 'No se encontró la pestaña "' + HOJAS_PERMITIDAS[claveHoja] + '" en el libro'
      });
    }

    return respuestaJSON(datos);

  } catch (err) {
    return respuestaJSON({ error: 'Error interno: ' + err.message });
  }
}

function leerHoja(nombrePestana) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombrePestana);
  if (!hoja) return null;

  const filas = hoja.getDataRange().getValues();
  if (filas.length < 2) return []; // hoja sin datos (solo encabezados o vacía)

  const encabezados = filas[0];
  const datos = [];

  for (let i = 1; i < filas.length; i++) {
    const fila = filas[i];

    // Saltar filas completamente vacías
    if (fila.every(c => c === '' || c === null || c === undefined)) continue;

    const registro = {};
    encabezados.forEach((col, idx) => {
      let val = fila[idx];

      // Normalizar fechas → string ISO (para que JS las parsee fácilmente)
      if (val instanceof Date) {
        val = val.toISOString();
      }

      // Trim en strings
      if (typeof val === 'string') {
        val = val.trim();
      }

      registro[String(col).trim()] = (val !== undefined && val !== null) ? val : '';
    });

    datos.push(registro);
  }

  return datos;
}

function respuestaJSON(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
