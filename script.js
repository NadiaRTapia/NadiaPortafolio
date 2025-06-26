// Animación de entrada para la sección hero
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = 'scale(0.97) translateY(-40px)';
    setTimeout(() => {
      hero.style.transition = 'all 1.2s cubic-bezier(.68,-0.55,.27,1.55)';
      hero.style.opacity = 1;
      hero.style.transform = 'scale(1) translateY(0)';
    }, 200);
  }
});

// Animación de entrada para secciones al hacer scroll
function animarSecciones() {
  const secciones = document.querySelectorAll('.animar-entrada');
  const trigger = window.innerHeight * 0.85;
  secciones.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) {
      sec.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', animarSecciones);
window.addEventListener('DOMContentLoaded', animarSecciones);

// Modo oscuro/claro con almacenamiento en localStorage
const btnModo = document.getElementById('modo-toggle');
const icono = btnModo.querySelector('i');
function setModoOscuro(oscuro) {
  if (oscuro) {
    document.body.classList.add('modo-oscuro');
    icono.classList.remove('fa-moon');
    icono.classList.add('fa-sun');
    localStorage.setItem('modo', 'oscuro');
  } else {
    document.body.classList.remove('modo-oscuro');
    icono.classList.remove('fa-sun');
    icono.classList.add('fa-moon');
    localStorage.setItem('modo', 'claro');
  }
}
btnModo.addEventListener('click', () => {
  setModoOscuro(!document.body.classList.contains('modo-oscuro'));
});
// Inicializar modo según preferencia previa
window.addEventListener('DOMContentLoaded', () => {
  const modo = localStorage.getItem('modo');
  if (modo === 'oscuro') setModoOscuro(true);
});

// Contadores animados en el hero
function animarContadores() {
  document.querySelectorAll('.contador').forEach(contador => {
    const valorFinal = parseInt(contador.getAttribute('data-contar'));
    let valor = 0;
    const duracion = 1200;
    const paso = Math.max(1, Math.floor(valorFinal / (duracion / 20)));
    function actualizar() {
      valor += paso;
      if (valor >= valorFinal) {
        contador.textContent = valorFinal;
      } else {
        contador.textContent = valor;
        setTimeout(actualizar, 20);
      }
    }
    actualizar();
  });
}
window.addEventListener('DOMContentLoaded', animarContadores);

// Fondo de partículas en el hero (CSS/JS puro, ligero)
function iniciarParticulas() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = canvas.offsetWidth;
  let h = canvas.height = canvas.offsetHeight;
  let particulas = [];
  const cantidad = 32;
  function crearParticula() {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: 2 + Math.random() * 3,
      dx: -0.5 + Math.random(),
      dy: -0.5 + Math.random(),
      color: [
        '#ff8ac7', '#b5eaff', '#e3d1ff', '#ffe4f7', '#ffb6d5'
      ][Math.floor(Math.random() * 5)]
    };
  }
  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    particulas = Array.from({length: cantidad}, crearParticula);
  }
  window.addEventListener('resize', resize);
  resize();
  function animar() {
    ctx.clearRect(0, 0, w, h);
    for (let p of particulas) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.7;
      ctx.fill();
      ctx.globalAlpha = 1;
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    }
    requestAnimationFrame(animar);
  }
  animar();
}
window.addEventListener('DOMContentLoaded', iniciarParticulas);

// Validación divertida y confetti cute al enviar el formulario de contacto
const form = document.querySelector('.contacto-form');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = form.querySelector('input[type="text"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const mensaje = form.querySelector('textarea').value.trim();
    if (!nombre || !email || !mensaje) {
      alert('¡Por favor, completa todos los campos para que pueda conocerte mejor! 😊✨');
      return;
    }
    // Efecto visual al enviar: confetti cute
    lanzarConfettiCute();
    form.reset();
    const btn = form.querySelector('button');
    btn.innerText = '¡Enviado! 💖';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerText = 'Enviar Mensaje';
      btn.disabled = false;
    }, 2000);
  });
}

// Función para lanzar confetti cute (emojis)
function lanzarConfettiCute() {
  const emojis = ['🌸','✨','💖','🦄','🌷','🎀','🌈'];
  for (let i = 0; i < 18; i++) {
    const confetti = document.createElement('span');
    confetti.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    confetti.className = 'confetti-cute';
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-2rem';
    confetti.style.fontSize = (1.2 + Math.random() * 1.2) + 'rem';
    confetti.style.zIndex = 9999;
    confetti.style.transition = 'top 1.6s cubic-bezier(.68,-0.55,.27,1.55), opacity 0.5s';
    document.body.appendChild(confetti);
    setTimeout(() => {
      confetti.style.top = (60 + Math.random() * 30) + 'vh';
      confetti.style.opacity = 0;
    }, 50);
    setTimeout(() => {
      confetti.remove();
    }, 1800);
  }
}

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
