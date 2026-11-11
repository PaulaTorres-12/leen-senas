const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Datos (edita aquí los textos) ---------- */
const clases = [
  ['saludosbasicos', 'Saludos Básicos', 'Principiante', '#fff1b8'],
  ['numeros',        'Números: 1 - 10', 'Principiante', '#ffd9b3'],
  ['colores',        'Colores',         'Principiante', '#dff5d0'],
  ['familia',        'Familia',         'Intermedio',   '#cdf5e4'],
  ['animales',       'Animales',        'Intermedio',   '#d9d0ff'],
  ['emociones',      'Emociones',       'Intermedio',   '#ecd0ff'],
];
const videos = [
  ['Introducción a la lengua de señas', 'Profe: Ana Torres, 2024',   'video1.jpg'],
  ['El alfabeto en señas',              'Profe: Luis Gómez, 2024',   'video2.jpg'],
  ['Señas para niños',                  'Profe: María López, 2024',  'video3.jpg'],
  ['Conversaciones cotidianas',         'Profe: Ana Torres, 2024',   'video4.jpg'],
  ['Historia de la comunidad sorda',    'Profe: Pedro Ruiz, 2024',   'video5.jpg'],
];
const insignias = [
  ['🌱', 'Primer paso', 'Completaste tu primera clase'],
  ['🔥', 'En racha',    '3 días seguidos'],
  ['🧠', 'Memoriza',    'Completaste flashcards'],
];

$('#lista-clases').innerHTML = clases.map(c => `
  <button class="row" data-go="grabadas">
    <span class="sq" style="background:${c[3]}"><img src="assets/clases/${c[0]}.png" alt=""></span>
    <span><b>${c[1]}</b><span class="pill ${c[2] === 'Principiante' ? 'p' : ''}">${c[2]}</span></span>
  </button>`).join('');

$('#vids').innerHTML = videos.map(v => `
  <div class="vrow">
    <div class="vth ph" style="--img:url(assets/img/${v[2]})"><span class="play"></span></div>
    <div><p>${v[0]}</p><small>${v[1]}</small><span class="pill">Principiante</span></div>
  </div>`).join('');

$('#badges').innerHTML = insignias.map(b => `
  <div class="badge"><em>${b[0]}</em><b>${b[1]}</b>${b[2]}</div>`).join('');

/* ---------- Navegación por hash (#home, #clases, ...) ---------- */
const tabs = { home: 'home', grabadas: 'clases', clases: 'clases', evalua: 'progreso', progreso: 'progreso', detalle: 'progreso', perfil: 'perfil' };
let timers = [];

function show(id) {
  timers.forEach(clearTimeout); timers = [];
  if (!$(`[data-s="${id}"]`)) id = 'inicio1';
  $$('.scr').forEach(s => s.classList.toggle('on', s.dataset.s === id));
  $('#app').classList.toggle('on', id in tabs);
  $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.t === tabs[id]));
  window.scrollTo(0, 0);
  // Secuencia de arranque: Inicio 1 → 2 → 3 → Login
  if (id === 'inicio1') timers.push(setTimeout(() => go('inicio2'), 1200));
  if (id === 'inicio2') timers.push(setTimeout(() => go('inicio3'), 1800));
  if (id === 'inicio3') timers.push(setTimeout(() => go('login'), 2200));
}
const go = id => { location.hash = id; };

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go]');
  if (t) go(t.dataset.go);
});
addEventListener('hashchange', () => show(location.hash.slice(1)));
show(location.hash.slice(1) || 'inicio1');
