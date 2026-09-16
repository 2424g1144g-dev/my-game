let textEnter = false;

const VOICE = {
  audio: new Audio(),
  play(src) {
    if (!src) return;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.src = src;
    this.audio.play().catch(() => {});
  },
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
};

window.DIALOGUE = {
  root: null,
  data: [],
  dialogueIndex: 0,
  lineIndex: 0,
  segmentIndex: 0,
  charIndex: 0,
  isTyping: false,
  timer: null,
  activeLog: null,
  els: null,
  init(root, data) {
    this.root = root;
    this.data = data;

    this.els = {
      name: root.querySelector(".name"),
      text: root.querySelector(".text"),
      enter: root.querySelector("#enterKey")
    };
  },

  start(dialogues) {
    this.dialogueIndex = 0;
    this.data = dialogues;
    this.play();
  },

  play() {
    console.log("PLAY",
      "dialogueIndex:", this.dialogueIndex,
      "data.length:", this.data.length
    );
    const d = this.data[this.dialogueIndex];
    if (!d) {
      console.error("dialogue not found", this.dialogueIndex);
      return;
    };
    if (!d) return;
    const previous = this.dialogueIndex > 0 ? this.data[this.dialogueIndex - 1] : null;
    const previousName = previous ? previous.name : "";
    this.els.name.innerText = d.name;
    this.els.text.innerHTML = "";
    this.lineIndex = 0;
    this.typeLine();
  },

  next() {
    if (this.isTyping) {
      this.showAll();
      return;
    }
    VOICE.stop();
    this.dialogueIndex++;
    if (this.data[this.dialogueIndex]) {
      this.play();
    }
  },

  typeLine() {
    this.els.enter.style.opacity = 0;
    const d = this.data[this.dialogueIndex];
    
    if (!d) return;
    const line = d.lines[this.lineIndex];
    if (!line) {
      this.isTyping = false;
      this.els.enter.style.opacity = 0.5;
      return;
    }

    VOICE.stop();
    if (line.voice) {
      VOICE.play(line.voice);
    }

    if (line.event) {
      line.event.forEach(ev => runEvent(ev));
    }

    if (line.autoNext) {
      setTimeout(() => {
        if (line.dialogueAutoNext) {
          this.dialogueIndex++;
          this.play();
        } else {
          this.lineIndex++;
          this.typeLine();
        }
      }, line.wait ?? 0);
  return;
}
    const div = document.createElement("div");
    this.els.text.appendChild(div);
    this.segmentIndex = 0;
    this.charIndex = 0;
    this.isTyping = true;
    this.typeSegment(line, div);
  },

  typeSegment(line, div) {
    const seg = line.segments[this.segmentIndex];
    if (!seg) {
      this.lineIndex++;
      this.typeLine();
      return;
    }
    const span = document.createElement("span");
    span.className = seg.class || "white";
    div.appendChild(span);

    this.charIndex = 0;
    this.timer = setInterval(() => {
      span.textContent += seg.text[this.charIndex++];
      if (this.charIndex >= seg.text.length) {
        clearInterval(this.timer);
        this.segmentIndex++;
        this.typeSegment(line, div);
      }
    }, 40);
  },

  showAll() {
    clearInterval(this.timer);
    const d = this.data[this.dialogueIndex];
    this.els.text.innerHTML = "";
    d.lines.forEach(line => {
      const div = document.createElement("div");
      line.segments.forEach(seg => {
        const span = document.createElement("span");
        span.className = seg.class || "white";
        span.textContent = seg.text;
        div.appendChild(span);
      });
      this.els.text.appendChild(div);
    });
    this.isTyping = false;
    this.els.enter.style.opacity = 0.5;
  }
};

document.addEventListener("keydown", e => {
    if (!textEnter) return;
    if (e.key !== "Enter" || e.repeat) return;
    if (!textEnter) return;
  
    //playSE("dialoguePass");
    DIALOGUE.next();
  });

function search(dialogueType, camOptions = {}) {
  setTimeout(() => {
    // 演出処理
    fadeCharacters(1, 0, 700);
    DIALOGUE_EVENTS.dialogue2Appear();
    DIALOGUE.dialogueIndex = 0;
    DIALOGUE.start(DIALOGUE_LINES[dialogueType]);

    // cameraCutに全てを任せる（"c" を活用）
    cameraCut({
      fromPos:  camOptions.fromPos  || "c",
      toPos:    camOptions.toPos    || "c",
      fromLook: camOptions.fromLook || "c",
      toLook:   camOptions.toLook   || "c",
      duration: camOptions.duration || 700,
      ...camOptions 
    });
  }, 500);
}

function cameraCut({

  fromPos, toPos,

  fromLook, toLook,

  fromZoom, toZoom,

  duration = 800

}) {

  let start = null;

  const cam = THREECORE.camera;

  // --- "c" を現在の値に置き換えるロジックを追加 ---

  const currentPos = [cam.position.x, cam.position.y, cam.position.z];

  // 現在の注視点（lookAt）を特定する

  const currentLookVec = new THREE.Vector3();

  cam.getWorldDirection(currentLookVec).add(cam.position);

  const currentLook = [currentLookVec.x, currentLookVec.y, currentLookVec.z];

  // 引数が "c" だったら現在の値を代入、そうでなければ渡された配列を使う

  const fP = fromPos === "c" ? currentPos : fromPos;

  const tP = toPos   === "c" ? currentPos : toPos;

  const fL = fromLook === "c" ? currentLook : fromLook;

  const tL = toLook   === "c" ? currentLook : toLook;

  // ----------------------------------------------

  const vFromPos  = new THREE.Vector3(...fP);

  const vToPos    = new THREE.Vector3(...tP);

  const vFromLook = new THREE.Vector3(...fL);

  const vToLook   = new THREE.Vector3(...tL);

  const look      = new THREE.Vector3();

  const z0 = fromZoom === "c" ? cam.fov : (fromZoom ?? cam.fov);

  const z1 = toZoom   === "c" ? cam.fov : (toZoom   ?? cam.fov);

  function ease(t) {

    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  }

  function animate(now) {

    if (!start) start = now;

    const raw = Math.min((now - start) / duration, 1);

    const t = ease(raw);

    cam.position.lerpVectors(vFromPos, vToPos, t);

    look.lerpVectors(vFromLook, vToLook, t);

    cam.lookAt(look);

    cam.fov = z0 + (z1 - z0) * t;

    cam.updateProjectionMatrix();

    if (raw < 1) requestAnimationFrame(animate);

  }

  requestAnimationFrame(animate);

}

function runEvent(event) {
  const handler = DIALOGUE_EVENTS[event.type];
  if (!handler) {
    console.warn("未定義イベント:", event.type);
    return;
  }
  console.log("event: ", event);
  handler(event);
}


function useDialog(id) {
  activeDialog = document.getElementById(id);

}

function setName(name) {
  const el = activeDialog.querySelector(".name");
  if (el) el.textContent = name;
}


function spriteChange(src, d=100) {
  const el = document.getElementById("spriteContain");
  el.style.transition = `opacity ${d}ms linear`;
  el.style.opacity = 0;
  if (src === "none") return;
  setTimeout(() => {
    console.log("スプライトを変更", src);
    el.src = `assets/characters/${src}.png`;
    el.style.opacity = 1;
  },d);
}

//背景
const backgrounds = {
  none: "none",
  shipTsukagoe: "assets/BG/shipTsukagoe.jpeg",
  ship: "assets/BG/ship.jpeg"
};

const bgEl = document.getElementById("background_layer");
function changeBackground(id, fade = 800) {
  const src = backgrounds[id];
  if (!src) {
    console.warn("背景が未定義:", id);
    return;
  }
  if (src === "none") {
    bgEl.style.transition = `opacity ${fade}ms ease`;
    bgEl.style.opacity = 0;
    return
  }
  // 即時切り替え
  if (fade === 0) {
    bgEl.style.transition = "none";
    bgEl.style.opacity = 1;
    bgEl.style.backgroundImage = `url(${src})`;
    return;
  }
  //フェード切り替え
  bgEl.style.transition = `opacity ${fade}ms ease`;
  bgEl.style.opacity = 0;
  setTimeout(() => {
    bgEl.style.backgroundImage = `url(${src})`;
    bgEl.style.opacity = 1;
  }, fade);
}

function spriteChange(src, d=100) {
    const el = document.getElementById("spriteContain");
    el.style.transition = `opacity ${d}ms linear`;
    el.style.opacity = 0;
    if (src === "none") return;
    setTimeout(() => {
      console.log("スプライトを変更", src);
      el.src = `assets/characters/${src}.png`;
      el.style.opacity = 1;
    },d);
  }

function showChoice(...args) {
    const menu = document.getElementById('selectMenu');
    menu.innerHTML = '';
    // 引数を2つずつ（テキスト, ダイアログキーまたは関数）セットで処理
    for (let i = 0; i < args.length; i += 2) {
      const text = args[i];
      const target = args[i + 1]; // 文字列(ダイアログのキー) または 関数
      if (!text) continue;
      const option = document.createElement('span');
      option.className = 'select-option';
      option.textContent = `▶ ${text}`;
      option.onclick = function() {
        menu.innerHTML = ''; // 選択肢を消す
        if (typeof target === 'function') {
          // 関数が渡された場合はそのまま実行
          target();
        } else if (typeof target === 'string') {
          // 文字列（ダイアログのキー）が渡された場合はダイアログを開始
          playDialogue(target);
        }
      };
      menu.appendChild(option);
    }
    menu.style.display = 'flex';
  }
  function playDialogue(dialogueKey) {
    if (typeof DIALOGUE_LINES !== 'undefined' && DIALOGUE_LINES[dialogueKey]) {
      DIALOGUE.start(DIALOGUE_LINES[dialogueKey]);
    } else {
      console.warn("指定されたダイアログが見つかりません:", dialogueKey);
    }
  }