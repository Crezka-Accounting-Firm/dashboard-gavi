const fechaOpts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const fechaStr  = new Date().toLocaleDateString('es-SV', fechaOpts);

const headerDate  = document.getElementById('fecha-header');
const footerDate  = document.getElementById('fecha-footer');
const yearEl      = document.getElementById('year');

if (headerDate) headerDate.textContent = fechaStr;
if (footerDate) footerDate.textContent = fechaStr;
if (yearEl)     yearEl.textContent     = new Date().getFullYear();
