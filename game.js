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
  t_s1:'#FF6B6B', t_s2:'#FF6B6B', t_s3:'#FF6B6B',
  t_s4:'#FF6B6B', t_s5:'#FF6B6B', t_s6:'#FF6B6B'
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
      { id:"t_s1", emoji:"🍎", name:"Manzana", rank:1, emojiSize:"0.9rem" },
      { id:"t_s2", emoji:"🍎", name:"Manzana", rank:2, emojiSize:"1.5rem" },
      { id:"t_s3", emoji:"🍎", name:"Manzana", rank:3, emojiSize:"2.3rem" },
      { id:"t_s4", emoji:"🍎", name:"Manzana", rank:4, emojiSize:"3.3rem" },
      { id:"t_s5", emoji:"🍎", name:"Manzana", rank:5, emojiSize:"4.5rem" },
      { id:"t_s6", emoji:"🍎", name:"Manzana", rank:6, emojiSize:"5.8rem" }
    ]
  },
  {
    id: 4,
    mode: 'count',
    title: "¿Cuántos hay?",
    instr: "Cuenta los productos y responde las preguntas",
    voice: "Nivel cuatro. Cuenta los productos en cada estante y responde las preguntas.",
    shelves: [
      { id:"frutas",   label:"Frutas",   emoji:"🍓", bg:"#FF6B6B", items:["🍎","🍌","🍇","🍊"]   },
      { id:"verduras", label:"Verduras", emoji:"🥬", bg:"#51CF66", items:["🥕","🥦"]             },
      { id:"lacteos",  label:"Lácteos",  emoji:"🐄", bg:"#4DABF7", items:["🥛","🧀","🍶"]        }
    ],
    questions: [
      { text:"¿Cuántas frutas hay?",                   answer:4,         options:[2,3,4,5],                        type:'count', shelf:'frutas'   },
      { text:"¿Cuántas verduras hay?",                 answer:2,         options:[1,2,3,4],                        type:'count', shelf:'verduras' },
      { text:"¿Cuántos lácteos hay?",                  answer:3,         options:[2,3,4,5],                        type:'count', shelf:'lacteos'  },
      { text:"¿En qué estante hay más productos?",     answer:"frutas",  options:["frutas","verduras","lacteos"],   type:'most'                   },
      { text:"¿En qué estante hay menos productos?",   answer:"verduras",options:["frutas","verduras","lacteos"],   type:'least'                  }
    ]
  },
  {
    id: 5,
    mode: 'spatial',
    title: "Relaciones espaciales",
    instr: "Sigue las instrucciones para colocar los alimentos",
    voice: "Nivel cinco. Escucha las instrucciones y coloca cada alimento en el lugar correcto.",
    // Grid 2 rows x 3 cols. row 0 = arriba, row 1 = abajo. col 0=izq, 1=centro, 2=der
    anchors: [
      { emoji:"🥛", name:"Leche", row:0, col:1 }
    ],
    steps: [
      { itemEmoji:"🧀", itemName:"Queso",     text:"Coloca el queso debajo de la leche",           voice:"Coloca el queso debajo de la leche",           row:1, col:1 },
      { itemEmoji:"🍎", itemName:"Manzana",   text:"Coloca la manzana a la izquierda de la leche", voice:"Coloca la manzana a la izquierda de la leche", row:0, col:0 },
      { itemEmoji:"🍌", itemName:"Plátano",   text:"Coloca el plátano a la derecha de la leche",   voice:"Coloca el plátano a la derecha de la leche",   row:0, col:2 },
      { itemEmoji:"🥕", itemName:"Zanahoria", text:"Coloca la zanahoria a la izquierda del queso", voice:"Coloca la zanahoria a la izquierda del queso", row:1, col:0 },
      { itemEmoji:"🥦", itemName:"Brócoli",   text:"Coloca el brócoli a la derecha del queso",     voice:"Coloca el brócoli a la derecha del queso",     row:1, col:2 }
    ]
  }
];

// ============================================================
// STATE
// ============================================================
let G = {
  level:0, score:0, placed:{}, selected:null, audio:null, itemOrder:[],
  currentQuestion:0, currentStep:0, grid:null
};
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

  document.getElementById('level-badge').textContent   = 'Nivel ' + lv.id;
  document.getElementById('score-display').textContent = G.score;
  document.getElementById('level-title').textContent   = lv.title;

  // Progress
  let done, total;
  if      (lv.mode === 'count')   { done = G.currentQuestion; total = lv.questions.length; }
  else if (lv.mode === 'spatial') { done = G.currentStep;     total = lv.steps.length;     }
  else                            { done = Object.keys(G.placed).length; total = lv.items.length; }
  document.getElementById('prog-text').textContent = done + ' / ' + total;
  document.getElementById('prog-fill').style.width = (done / total * 100) + '%';

  const itemsZone = document.getElementById('items-zone');
  const qzone     = document.getElementById('question-zone');
  const grid      = document.getElementById('items-grid');
  const zone      = document.getElementById('shelves-zone');

  // ---- COUNT MODE ----
  if (lv.mode === 'count') {
    document.getElementById('level-instr').textContent = lv.instr;
    itemsZone.style.display = 'none';
    qzone.style.display     = '';

    // Pre-filled shelves
    zone.className = 'count-shelves';
    zone.innerHTML = '';
    lv.shelves.forEach(shelf => {
      const el = document.createElement('div');
      el.className = 'count-shelf';

      const header = document.createElement('div');
      header.className = 'count-shelf-header';
      header.style.background = shelf.bg;
      header.innerHTML =
        '<div style="font-size:1.5rem">' + shelf.emoji + '</div>' +
        '<div class="shelf-name">' + shelf.label + '</div>';

      const body = document.createElement('div');
      body.className = 'count-shelf-items';
      shelf.items.forEach(em => {
        const s = document.createElement('span');
        s.className = 'count-shelf-item';
        s.textContent = em;
        body.appendChild(s);
      });

      el.appendChild(header);
      el.appendChild(body);
      zone.appendChild(el);
    });

    // Question + options
    const q = lv.questions[G.currentQuestion];
    qzone.innerHTML = '';

    const qcard = document.createElement('div');
    qcard.className = 'question-card';
    qcard.innerHTML = '<div class="question-text">' + q.text + '</div>';
    qzone.appendChild(qcard);

    const opts = document.createElement('div');
    opts.className = 'answer-options';
    shuffle([...q.options]).forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      if (q.type === 'count') {
        btn.textContent = opt;
      } else {
        const shelf = lv.shelves.find(s => s.id === opt);
        btn.innerHTML = shelf.emoji + ' ' + shelf.label;
      }
      btn.addEventListener('click', () => answerCount(opt));
      opts.appendChild(btn);
    });
    qzone.appendChild(opts);
    return;
  }

  // ---- SPATIAL MODE ----
  if (lv.mode === 'spatial') {
    qzone.style.display = 'none';

    if (G.currentStep < lv.steps.length) {
      const step = lv.steps[G.currentStep];
      document.getElementById('level-instr').textContent = step.text;
      itemsZone.style.display = '';
      document.querySelector('.zone-title').textContent = 'Coloca este alimento:';
      grid.innerHTML = '';
      const spatialItemDiv = document.createElement('div');
      spatialItemDiv.className = 'spatial-current-item';
      spatialItemDiv.innerHTML =
        '<div class="spatial-current-emoji">' + step.itemEmoji + '</div>' +
        '<div class="card-name" style="font-size:.75rem;margin-top:4px">' + step.itemName + '</div>';
      spatialItemDiv.addEventListener('pointerdown', e => {
        e.preventDefault(); e.stopPropagation();
        drag = { isSpatial: true, emoji: step.itemEmoji, sx: e.clientX, sy: e.clientY };
        dragMoved = false;
        e.currentTarget.setPointerCapture(e.pointerId);
      });
      grid.appendChild(spatialItemDiv);
    } else {
      document.getElementById('level-instr').textContent = lv.instr;
      itemsZone.style.display = 'none';
    }

    // Spatial grid
    zone.className = 'spatial-zone';
    zone.innerHTML = '';

    const shelfWrap = document.createElement('div');
    shelfWrap.className = 'spatial-shelf';

    for (let row = 0; row < 2; row++) {
      const rowLabel = document.createElement('div');
      rowLabel.className = 'spatial-row-label';
      rowLabel.textContent = row === 0 ? '⬆️  Estante de arriba' : '⬇️  Estante de abajo';
      shelfWrap.appendChild(rowLabel);

      const rowEl = document.createElement('div');
      rowEl.className = 'spatial-row';

      for (let col = 0; col < 3; col++) {
        const cell = document.createElement('div');
        cell.className = 'spatial-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;

        const anchor = lv.anchors.find(a => a.row === row && a.col === col);
        const placed = G.grid[row][col];

        if (anchor) {
          cell.classList.add('filled', 'anchor');
          cell.innerHTML =
            '<div class="cell-emoji">' + anchor.emoji + '</div>' +
            '<div class="cell-name">' + anchor.name + '</div>';
        } else if (placed) {
          cell.classList.add('filled');
          cell.innerHTML =
            '<div class="cell-emoji">' + placed.itemEmoji + '</div>' +
            '<div class="cell-name">' + placed.itemName + '</div>';
        } else {
          cell.innerHTML = '<div class="slot-dot">●</div>';
          if (G.currentStep < lv.steps.length) {
            cell.addEventListener('click', () => placeSpatial(row, col));
          }
        }
        rowEl.appendChild(cell);
      }
      shelfWrap.appendChild(rowEl);
    }
    zone.appendChild(shelfWrap);
    return;
  }

  // ---- DEFAULT: CLASSIFY / SORT MODES ----
  document.getElementById('level-instr').textContent = lv.instr;
  itemsZone.style.display = '';
  qzone.style.display     = 'none';
  document.querySelector('.zone-title').textContent = 'Alimentos para clasificar';

  // Items grid
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
        '<div class="card-emoji"' + (item.emojiSize ? ' style="font-size:' + item.emojiSize + '"' : '') + '>' + item.emoji + '</div>' +
        (item.emojiSize ? '' : '<div class="card-name">' + item.name + '</div>') +
      '</div>';
    card.addEventListener('pointerdown', e => onItemDown(e, item.id));
    grid.appendChild(card);
  });

  // Shelves o Sort strip segun modo
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
          '<div class="slot-item-emoji"' + (it.emojiSize ? ' style="font-size:' + it.emojiSize + '"' : '') + '>' + it.emoji + '</div>';
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
    if (drag.isSpatial) {
      ghost.textContent = drag.emoji;
    } else {
      const item = LEVELS[G.level].items.find(x => x.id === drag.id);
      ghost.textContent = item.emoji;
      ghost.style.fontSize = item.emojiSize || '';
      G.selected = drag.id;
      render();
    }
    ghost.style.display = 'block';
  }
  if (dragMoved) {
    ghost.style.left = e.clientX + 'px';
    ghost.style.top  = e.clientY + 'px';
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const target = el?.closest('.shelf, .sort-slot, .spatial-cell');
    document.querySelectorAll('.shelf, .sort-slot, .spatial-cell').forEach(s => s.classList.remove('drag-over'));
    if (target) {
      const isCell = target.classList.contains('spatial-cell');
      if (!isCell || (!target.classList.contains('filled') && !target.classList.contains('anchor'))) {
        target.classList.add('drag-over');
      }
    }
  }
});

document.addEventListener('pointerup', e => {
  if (!drag) return;
  ghost.style.display = 'none';
  document.querySelectorAll('.shelf, .sort-slot, .spatial-cell').forEach(s => s.classList.remove('drag-over'));

  if (dragMoved) {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (drag.isSpatial) {
      const cell = el?.closest('.spatial-cell');
      if (cell && !cell.classList.contains('filled') && !cell.classList.contains('anchor')) {
        placeSpatial(parseInt(cell.dataset.row), parseInt(cell.dataset.col));
      } else {
        render();
      }
    } else {
      const shelf = el?.closest('.shelf, .sort-slot');
      if (shelf) tryPlace(drag.id, shelf.dataset.cat);
      else { G.selected = null; render(); }
    }
  } else {
    if (!drag.isSpatial) selectItem(drag.id);
  }
  drag = null;
});

// ============================================================
// LOGIC — classify / sort (niveles 1-3)
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

// ============================================================
// LOGIC — count (nivel 4)
// ============================================================
function answerCount(answer) {
  const lv = LEVELS[G.level];
  const q  = lv.questions[G.currentQuestion];
  // eslint-disable-next-line eqeqeq
  const correct = answer == q.answer;

  if (correct) {
    G.score++;
    document.getElementById('score-display').textContent = G.score;
    sfx.correct();
    if (q.type === 'count') {
      const shelf = lv.shelves.find(s => s.id === q.shelf);
      fb('¡Correcto! Hay ' + q.answer + ' ' + shelf.label.toLowerCase() + ' ✅', 'correct');
      speak('Correcto! Hay ' + q.answer + ' ' + shelf.label);
    } else if (q.type === 'most') {
      const shelf = lv.shelves.find(s => s.id === q.answer);
      fb('¡Correcto! En ' + shelf.label + ' hay más productos ✅', 'correct');
      speak('Correcto! En ' + shelf.label + ' hay más productos');
    } else {
      const shelf = lv.shelves.find(s => s.id === q.answer);
      fb('¡Correcto! En ' + shelf.label + ' hay menos productos ✅', 'correct');
      speak('Correcto! En ' + shelf.label + ' hay menos productos');
    }
    G.currentQuestion++;
    if (G.currentQuestion >= lv.questions.length) {
      setTimeout(levelDone, 850);
    } else {
      setTimeout(() => {
        render();
        speak(lv.questions[G.currentQuestion].text);
      }, 750);
    }
  } else {
    sfx.wrong();
    if (q.type === 'count') {
      fb('¡Inténtalo de nuevo! Cuenta bien los productos 🤔', 'wrong');
    } else {
      fb('¡Inténtalo de nuevo! Mira bien los estantes 🤔', 'wrong');
    }
    speak('Inténtalo de nuevo');
  }
}

// ============================================================
// LOGIC — spatial (nivel 5)
// ============================================================
function placeSpatial(row, col) {
  const lv = LEVELS[G.level];
  if (G.currentStep >= lv.steps.length) return;

  const step    = lv.steps[G.currentStep];
  const correct = row === step.row && col === step.col;

  if (correct) {
    G.grid[row][col] = step;
    G.score++;
    document.getElementById('score-display').textContent = G.score;
    sfx.correct();
    fb('¡Muy bien! ' + step.itemEmoji + ' ' + step.itemName + ' va ahí ✅', 'correct');
    speak('Muy bien! ' + step.itemName + ' va ahí');

    const cell = document.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
    if (cell) { cell.classList.add('correct-flash'); setTimeout(() => cell.classList.remove('correct-flash'), 550); }

    G.currentStep++;
    if (G.currentStep >= lv.steps.length) {
      setTimeout(levelDone, 850);
    } else {
      setTimeout(() => {
        render();
        speak(lv.steps[G.currentStep].voice);
      }, 750);
    }
  } else {
    sfx.wrong();
    fb('¡Inténtalo de nuevo! ' + step.text + ' 🤔', 'wrong');
    speak('Inténtalo de nuevo. ' + step.text);
    const cell = document.querySelector('[data-row="' + row + '"][data-col="' + col + '"]');
    if (cell) { cell.classList.add('shake'); setTimeout(() => cell.classList.remove('shake'), 450); }
  }
}

// ============================================================
// LEVEL FLOW
// ============================================================
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
  const lv = LEVELS[idx];
  G.level           = idx;
  G.placed          = {};
  G.selected        = null;
  G.currentQuestion = 0;
  G.currentStep     = 0;
  G.grid            = [[null,null,null],[null,null,null]];
  G.itemOrder       = lv.items ? shuffle(lv.items.map(x => x.id)) : [];
  drag              = null;
  dragMoved         = false;

  render();

  if (lv.mode === 'count') {
    fb('Lee cada pregunta y toca la respuesta correcta', '');
  } else if (lv.mode === 'spatial') {
    fb('Escucha la instrucción y toca el lugar correcto en el estante', '');
  } else {
    fb('Toca un alimento y luego toca el estante correcto', '');
  }

  show('game-screen');

  setTimeout(() => {
    speak(lv.voice);
    if (lv.mode === 'count') {
      setTimeout(() => speak(lv.questions[0].text), 2200);
    } else if (lv.mode === 'spatial') {
      setTimeout(() => speak(lv.steps[0].voice), 2200);
    }
  }, 400);
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
  G = { level:0, score:0, placed:{}, selected:null, audio:G.audio, itemOrder:[],
        currentQuestion:0, currentStep:0, grid:null };
  startLevel(0);
});

document.getElementById('speak-btn').addEventListener('click', () => {
  const lv = LEVELS[G.level];
  if      (lv.mode === 'count')   speak(lv.questions[G.currentQuestion]?.text || lv.voice);
  else if (lv.mode === 'spatial') speak(lv.steps[G.currentStep]?.voice || lv.voice);
  else                            speak(lv.voice);
});

document.getElementById('next-btn').addEventListener('click', () => startLevel(G.level + 1));

// Level picker
const overlay = document.getElementById('level-picker-overlay');
const lpButtons = document.getElementById('lp-buttons');
LEVELS.forEach((lv, idx) => {
  const btn = document.createElement('button');
  btn.className = 'lp-level-btn';
  btn.textContent = 'Nivel ' + lv.id;
  btn.addEventListener('click', () => {
    overlay.style.display = 'none';
    startLevel(idx);
    show('game-screen');
  });
  lpButtons.appendChild(btn);
});
document.getElementById('skip-btn').addEventListener('click', () => {
  overlay.style.display = 'flex';
});
document.getElementById('lp-cancel').addEventListener('click', () => {
  overlay.style.display = 'none';
});

document.getElementById('replay-btn').addEventListener('click', () => {
  G = { level:0, score:0, placed:{}, selected:null, audio:G.audio,
        currentQuestion:0, currentStep:0, grid:null };
  show('start-screen');
});

show('start-screen');
