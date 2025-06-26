// ComponenteSaludo.js - Moderno y bonito
// Permite personalizar el mensaje y el nombre usando data-mensaje y data-nombre en el div

document.querySelectorAll('.saludo-tarjeta').forEach(function(el) {
  const mensaje = el.getAttribute('data-mensaje');
  const nombre = el.getAttribute('data-nombre');
  if (nombre && el.querySelector('.saludo-nombre')) {
    el.querySelector('.saludo-nombre').textContent = nombre;
  }
  if (mensaje && el.querySelector('.saludo-mensaje')) {
    el.querySelector('.saludo-mensaje').textContent = mensaje;
  }
}); 