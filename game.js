// ============================================================
// DATA
// ============================================================
const COLORS = {
  // nivel 1
  apple:'#FF6B6B', banana:'#FFD43B', grape:'#845EF7',
  carrot:'#FF922B', broc:'#51CF66', corn:'#FFD43B',
  milk:'#4DABF7', cheese:'#FFE066', yogurt:'#CC5DE8',
  // nivel 2
  s_apple:'#FF6B6B', s_straw:'#E03131', s_tom:'#E03131',
  s_ban:'#FFD43B', s_lemon:'#F0B429', s_corn:'#FFD43B',
  s_broc:'#51CF66', s_avoc:'#37B24D', s_cuc:'#51CF66',
  // nivel 3
  t_water:'#FF6B6B', t_pine:'#FFA94D', t_pump:'#FF922B',
  t_apple:'#FF6B6B', t_ora:'#FF922B', t_pear:'#A9E34B',
  t_cher:'#C92A2A', t_grape:'#845EF7', t_blue:'#4DABF7'
};

const LEVELS = [
  {
    id: 1,
    title: "Que tipo de alimento es?",
    instr: "Clasifica cada alimento en su estante correcto",
    voice: "Nivel uno. Que tipo de alimento es? Arrastra o toca cada alimento y colócalo en su estante.",
    categories: [
      { id:"frutas",   label:"Frutas",   emoji:"🍓", bg:"#FF6B6B" },
      { id:"verduras", label:"Verduras", emoji:"🥬", bg:"#51CF66" },
      { id:"lacteos",  label:"Lacteos",  emoji:"🐄", bg:"#4DABF7" }
    ],
    items: [
      { id:"apple",  emoji:"🍎", name:"Manzana",   cat:"frutas"   },
      { id:"banana", emoji:"🍌", name:"Platano",   cat:"frutas"   },
      { id:"grape",  emoji:"🍇", name:"Uvas",      cat:"frutas"   },
      { id:"carrot", emoji:"🥕", name:"Zanahoria", cat:"verduras" },
      { id:"broc",   emoji:"🥦", name:"Brocoli",   cat:"verduras" },
      { id:"corn",   emoji:"🌽", name:"Choclo",    cat:"verduras" },
      { id:"milk",   emoji:"🥛", name:"Leche",     cat:"lacteos"  },
      { id:"cheese", emoji:"🧀", name:"Queso",     cat:"lacteos"  },
      { id:"yogurt", emoji:"🍶", name:"Yogur",     cat:"lacteos"  }
    ]
  },
  {
    id: 2,
    title: "De que color es?",
    instr: "Clasifica los alimentos por su color",
    voice: "Nivel dos. De qué color es? Agrupa cada alimento según su color.",
    categories: [
      { id:"rojo",     label:"Rojos",     emoji:"❤️", bg:"#FF6B6B" },
      { id:"amarillo", label:"Amarillos", emoji:"💛", bg:"#F0B429" },
      { id:"verde",    label:"Verdes",    emoji:"💚", bg:"#51CF66" }
    ],
    items: [
      { id:"s_apple", emoji:"🍎", name:"Manzana",  cat:"rojo"     },
      { id:"s_straw", emoji:"🍓", name:"Frutilla", cat:"rojo"     },
      { id:"s_tom",   emoji:"🍅", name:"Tomate",   cat:"rojo"     },
      { id:"s_ban",   emoji:"🍌", name:"Platano",  cat:"amarillo" },
      { id:"s_lemon", emoji:"🍋", name:"Limon",    cat:"amarillo" },
      { id:"s_corn",  emoji:"🌽", name:"Choclo",   cat:"amarillo" },
      { id:"s_broc",  emoji:"🥦", name:"Brocoli",  cat:"verde"    },
      { id:"s_avoc",  emoji:"🥑", name:"Palta",    cat:"verde"    },
      { id:"s_cuc",   emoji:"🥒", name:"Pepino",   cat:"verde"    }
    ]
  },
  {
    id: 3,
    mode: 'sort',
    title: "Ordena por tamaño",
    instr: "Del más pequeño al más grande — posición 1 es la más pequeña",
    voice: "Nivel tres. Ordena los alimentos de menor a mayor tamaño. El número uno es para el más pequeño.",
    items: [
      { id:"t_blue",  emoji:"🫐", name:"Arándanos", rank:1 },
      { id:"t_cher",  emoji:"🍒", name:"Cerezas",   rank:2 },
      { id:"t_ora",   emoji:"🍊", name:"Naranja",   rank:3 },
      { id:"t_pine",  emoji:"🍍", name:"Piña",      rank:4 },
      { id:"t_water", emoji:"🍉", name:"Sandía",    rank:5 },
      { id:"t_pump",  emoji:"🎃", name:"Calabaza",  rank:6 }
    ]
  }
];

// ============================================================
// STATE
// ============================================================
let G = { level:0, score:0, placed:{}, selected:null, audio:null, itemOrder:[] };
let drag = null;
let dragMoved = false;

// ============================================================
// UTILS
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES';
  u.rate = 0.88;
  u.pitch = 1.1;
  window.speechSynthesis.speak(u);
}

// ============================================================
// AUDIO
// ============================================================
function initAudio() {
  if (!G.audio) G.audio = new (window.AudioContext || window.webkitAudioContext)();
}

function tone(f, type, dur, d) {
  if (!G.audio) return;
  const o = G.audio.createOscillator(), g = G.audio.createGain();
  o.connect(g); g.connect(G.audio.destination);
  o.type = type; o.frequency.value = f;
  const t = G.audio.currentTime + (d||0);
  g.gain.setValueAtTime(.22,t);
  g.gain.exponentialRampToValueAtTime(.001, t+dur);
  o.start(t); o.stop(t+dur);
}

const sfx = {
  correct:  () => { tone(523,'sine',.12,0); tone(659,'sine',.12,.1); tone(784,'sine',.2,.2); },
  wrong:    () => { tone(220,'sawtooth',.14,0); tone(175,'sawtooth',.18,.14); },
  level:    () => [523,587,659,698,784,880].forEach((f,i) => tone(f,'sine',.2,i*.1)),
  win:      () => [784,880,988,1047,880,784,659,784].forEach((f,i) => tone(f,'sine',.2,i*.13))
};

// ============================================================
// SCREENS
// ============================================================
function show(id) {
  ['start-screen','game-screen','level-complete','game-over']
    .forEach(s => document.getElementById(s).style.display = 'none');
  document.getElementById(id).style.display = 'flex';
}

// ============================================================
// RENDER
// ============================================================
function render() {
  const lv = LEVELS[G.level];

  document.getElementById('level-badge').textContent  = 'Nivel ' + lv.id;
  document.getElementById('score-display').textContent = G.score;
  document.getElementById('level-title').textContent   = lv.title;
  document.getElementById('level-instr').textContent   = lv.instr;

  const done = Object.keys(G.placed).length;
  document.getElementById('prog-text').textContent = done + ' / ' + lv.items.length;
  document.getElementById('prog-fill').style.width = (done / lv.items.length * 100) + '%';

  // Items (en orden aleatorio fijado al inicio del nivel)
  const grid = document.getElementById('items-grid');
  grid.innerHTML = '';
  const orderedItems = G.itemOrder.map(id => lv.items.find(x => x.id === id));
  orderedItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card' +
      (G.placed[item.id] ? ' placed' : '') +
      (G.selected === item.id ? ' selected' : '');
    card.dataset.id = item.id;
    const color = COLORS[item.id] || '#aaa';
    card.innerHTML =
      '<div class="card-stripe" style="background:' + color + '"></div>' +
      '<div class="card-body">' +
        '<div class="card-emoji">' + item.emoji + '</div>' +
        '<div class="card-name">' + item.name + '</div>' +
      '</div>';
    card.addEventListener('pointerdown', e => onItemDown(e, item.id));
    grid.appendChild(card);
  });

  // Shelves o Sort strip segun modo
  const zone = document.getElementById('shelves-zone');
  zone.innerHTML = '';

  if (lv.mode === 'sort') {
    zone.className = 'sort-zone';

    const strip = document.createElement('div');
    strip.className = 'sort-strip';
    strip.innerHTML =
      '<div class="sort-header">' +
        '<span class="small-end">🐭&nbsp;Más pequeño</span>' +
        '<span class="sort-arrow">→&nbsp;→&nbsp;→&nbsp;→&nbsp;→</span>' +
        '<span class="big-end">Más grande&nbsp;🐘</span>' +
      '</div>';

    const slots = document.createElement('div');
    slots.className = 'sort-slots';

    for (let r = 1; r <= lv.items.length; r++) {
      const slot = document.createElement('div');
      slot.className = 'sort-slot';
      slot.dataset.cat = String(r);
      slot.dataset.rank = String(r);

      const placed = Object.entries(G.placed).find(([, rank]) => parseInt(rank) === r);
      if (placed) {
        const it = lv.items.find(x => x.id === placed[0]);
        slot.classList.add('filled');
        slot.innerHTML =
          '<div class="slot-num">' + r + '</div>' +
          '<div class="slot-item-emoji">' + it.emoji + '</div>' +
          '<div class="slot-item-name">' + it.name + '</div>';
      } else {
        slot.innerHTML = '<div class="slot-num">' + r + '</div><div class="slot-dot">●</div>';
      }

      slot.addEventListener('click', () => { if (!dragMoved) onShelfClick(String(r)); });
      slots.appendChild(slot);
    }

    strip.appendChild(slots);
    zone.appendChild(strip);

  } else {
    zone.className = 'shelves-zone';
    lv.categories.forEach(cat => {
      const shelf = document.createElement('div');
      shelf.className = 'shelf';
      shelf.dataset.cat = cat.id;

      const header = document.createElement('div');
      header.className = 'shelf-header';
      header.style.background = cat.bg;
      header.innerHTML =
        '<div class="shelf-emoji">' + cat.emoji + '</div>' +
        '<div class="shelf-name">' + cat.label + '</div>';

      const body = document.createElement('div');
      body.className = 'shelf-body';

      Object.entries(G.placed).forEach(([iid, cid]) => {
        if (cid === cat.id) {
          const it = lv.items.find(x => x.id === iid);
          if (it) {
            const el = document.createElement('div');
            el.className = 'placed-item';
            el.textContent = it.emoji;
            body.appendChild(el);
          }
        }
      });

      shelf.appendChild(header);
      shelf.appendChild(body);
      shelf.addEventListener('click', () => { if (!dragMoved) onShelfClick(cat.id); });
      zone.appendChild(shelf);
    });
  }
}

function fb(msg, type) {
  const el = document.getElementById('feedback');
  el.className = 'feedback' + (type ? ' ' + type : '');
  el.textContent = msg;
}

// ============================================================
// DRAG
// ============================================================
const ghost = document.getElementById('drag-ghost');

function onItemDown(e, itemId) {
  if (G.placed[itemId]) return;
  e.preventDefault(); e.stopPropagation();
  drag = { id: itemId, sx: e.clientX, sy: e.clientY };
  dragMoved = false;
  e.currentTarget.setPointerCapture(e.pointerId);
}

document.addEventListener('pointermove', e => {
  if (!drag) return;
  if (!dragMoved && (Math.abs(e.clientX - drag.sx) > 6 || Math.abs(e.clientY - drag.sy) > 6)) {
    dragMoved = true;
    const item = LEVELS[G.level].items.find(x => x.id === drag.id);
    ghost.textContent = item.emoji;
    ghost.style.display = 'block';
    G.selected = drag.id;
    render();
  }
  if (dragMoved) {
    ghost.style.left = e.clientX + 'px';
    ghost.style.top  = e.clientY + 'px';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const shelf = el?.closest('.shelf, .sort-slot');
    document.querySelectorAll('.shelf, .sort-slot').forEach(s => s.classList.remove('drag-over'));
    if (shelf) shelf.classList.add('drag-over');
  }
});

document.addEventListener('pointerup', e => {
  if (!drag) return;
  ghost.style.display = 'none';
  document.querySelectorAll('.shelf').forEach(s => s.classList.remove('drag-over'));

  if (dragMoved) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const shelf = el?.closest('.shelf, .sort-slot');
    if (shelf) tryPlace(drag.id, shelf.dataset.cat);
    else { G.selected = null; render(); }
  } else {
    selectItem(drag.id);
  }
  drag = null;
});

// ============================================================
// LOGIC
// ============================================================
function selectItem(id) {
  if (G.placed[id]) return;
  if (G.selected === id) {
    G.selected = null;
    fb('Toca un alimento y luego toca el estante correcto', '');
  } else {
    G.selected = id;
    const item = LEVELS[G.level].items.find(x => x.id === id);
    fb('Seleccionaste ' + item.emoji + ' ' + item.name + '. Ahora toca el estante!', 'hint');
  }
  render();
}

function onShelfClick(catId) {
  if (!G.selected) { fb('Primero selecciona un alimento!', ''); return; }
  tryPlace(G.selected, catId);
}

function tryPlace(itemId, catId) {
  if (!itemId || G.placed[itemId]) return;
  const lv = LEVELS[G.level];
  const item = lv.items.find(x => x.id === itemId);
  if (!item) return;

  const isSort = lv.mode === 'sort';
  const correct = isSort ? item.rank === parseInt(catId) : item.cat === catId;

  if (correct) {
    G.placed[itemId] = catId;
    G.score++;
    G.selected = null;
    document.getElementById('score-display').textContent = G.score;
    sfx.correct();
    if (isSort) {
      fb('¡Correcto! ' + item.emoji + ' ' + item.name + ' va en la posición ' + item.rank + ' ✅', 'correct');
      speak('Correcto! ' + item.name + ' va en la posición ' + item.rank);
    } else {
      const cat = lv.categories.find(c => c.id === catId);
      fb('Muy bien! ' + item.emoji + ' ' + item.name + ' va en ' + cat.label + '! ✅', 'correct');
      speak('Muy bien! ' + item.name + ' va en ' + cat.label);
    }
    render();
    const target = document.querySelector('[data-cat="' + catId + '"]');
    if (target) { target.classList.add('correct-flash'); setTimeout(() => target.classList.remove('correct-flash'), 550); }
    if (Object.keys(G.placed).length === lv.items.length) setTimeout(levelDone, 850);
  } else {
    sfx.wrong();
    if (isSort) {
      const slotRank = parseInt(catId);
      const hint = item.rank > slotRank ? 'es más grande, ponlo más a la derecha' : 'es más pequeño, ponlo más a la izquierda';
      fb('¡Inténtalo de nuevo! ' + item.emoji + ' ' + item.name + ' ' + hint + ' 🤔', 'wrong');
      speak('Inténtalo de nuevo. ' + item.name + ' ' + hint);
    } else {
      const correctCat = lv.categories.find(c => c.id === item.cat);
      fb('Intentalo de nuevo! ' + item.emoji + ' ' + item.name + ' va en ' + correctCat.emoji + ' ' + correctCat.label + ' 🤔', 'wrong');
      speak('Intentalo de nuevo. ' + item.name + ' va en ' + correctCat.label);
    }
    const card = document.querySelector('[data-id="' + itemId + '"]');
    if (card) { card.classList.add('shake'); setTimeout(() => card.classList.remove('shake'), 450); }
    G.selected = null;
    render();
  }
}

function levelDone() {
  const lv = LEVELS[G.level];
  confetti();
  if (G.level < LEVELS.length - 1) {
    sfx.level();
    document.getElementById('lc-stars').textContent = '⭐⭐⭐';
    document.getElementById('lc-title').textContent  = 'Nivel ' + lv.id + ' completado!';
    document.getElementById('lc-msg').textContent    = 'Excelente! Tienes ' + G.score + ' puntos. Sigue adelante!';
    document.getElementById('next-btn').textContent  = 'Nivel ' + (lv.id + 1) + ' !';
    show('level-complete');
  } else {
    sfx.win(); confetti(); confetti();
    document.getElementById('final-score').textContent = G.score + ' pts';
    show('game-over');
  }
}

function startLevel(idx) {
  G.level = idx; G.placed = {}; G.selected = null;
  G.itemOrder = shuffle(LEVELS[idx].items.map(x => x.id));
  render();
  fb('Toca un alimento y luego toca el estante correcto', '');
  show('game-screen');
  setTimeout(() => speak(LEVELS[idx].voice), 400);
}

// ============================================================
// CONFETTI
// ============================================================
function confetti() {
  const colors = ['#FF6B6B','#FFD43B','#51CF66','#4DABF7','#CC5DE8','#FF922B'];
  const emos   = ['🎉','⭐','🌟','✨','🎊'];
  const wrap = document.createElement('div');
  wrap.className = 'cf-wrap';
  document.body.appendChild(wrap);
  for (let i = 0; i < 48; i++) {
    const p = document.createElement('div');
    p.className = 'cp';
    if (Math.random() > .4) {
      p.textContent = emos[Math.floor(Math.random() * emos.length)];
      p.style.fontSize = (Math.random() * 12 + 14) + 'px';
    } else {
      p.style.width  = (Math.random() * 10 + 6) + 'px';
      p.style.height = p.style.width;
      p.style.borderRadius = Math.random() > .5 ? '50%' : '3px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    p.style.left = Math.random() * 100 + '%';
    p.style.animation = 'cfFall ' + (Math.random()*2+2).toFixed(1) + 's ' + (Math.random()*.8).toFixed(2) + 's linear forwards';
    wrap.appendChild(p);
  }
  setTimeout(() => wrap.remove(), 4200);
}

// ============================================================
// INIT
// ============================================================
document.getElementById('start-btn').addEventListener('click', () => {
  initAudio();
  G = { level:0, score:0, placed:{}, selected:null, audio:G.audio, itemOrder:[] };
  startLevel(0);
});

document.getElementById('speak-btn').addEventListener('click', () => {
  speak(LEVELS[G.level].voice);
});

document.getElementById('next-btn').addEventListener('click', () => startLevel(G.level + 1));

document.getElementById('replay-btn').addEventListener('click', () => {
  G = { level:0, score:0, placed:{}, selected:null, audio:G.audio };
  show('start-screen');
});

show('start-screen');
