const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//ステータス
let hp = 34; const hpEl = document.getElementById("HP"); hpEl.textContent = hp;
let maxHp = 34; const mhpEl = document.getElementById("maxHP"); mhpEl.textContent = maxHp;
let sp = 13; const spEl = document.getElementById("SP"); spEl.textContent = sp;
let maxSp = 13; const mSpEl = document.getElementById("maxSP"); mSpEl.textContent = maxSp;
let XP = 0;
let atk = 7; const atkEl = document.getElementById("ATK"); atkEl.textContent = atk;
let def = 10; const defEl = document.getElementById("DEF"); defEl.textContent = def;
let agi = 6; const agiEl = document.getElementById("AGI"); agiEl.textContent = agi;
let int = 12; const intEl = document.getElementById("INT"); intEl.textContent = int;
let dex = 7; const dexEl = document.getElementById("DEX"); dexEl.textContent = dex;
let spi = 5; const spiEl = document.getElementById("SPI"); spiEl.textContent = spi;

const topUI = document.getElementById("trainingTopCon");
const bottomUI = document.getElementById("trainingBottomCon");
const btn = document.querySelectorAll(".diamond-btn-container");
const pbtn = document.querySelectorAll(".practice-btn-container");




window.surviveStart = async function () {
  console.log("スタート");
  const log = document.getElementById("dialogue");
  log.classList.remove("show");
  changeBackground("landscapeHouse", 300);
  await sleep(1000);
  const debate = document.getElementById("debate");
  const spans = Array.from(debate.children);
  const circle = document.getElementById("circleDebate");

  // 配列を逆順（論、議、プ、ッ...）にする
  const reverseSpans = spans.reverse();

  window.nonstopDebateStart = function() {
    //playSE("nonstopDebateStart");
    setTimeout (() => {
      debate.classList.add("runAway");
      circle.classList.add("zoomDisappear");
      document.getElementById("startDebate").classList.add("startAnim");
    }, 1500)
    reverseSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add("appear");
      }, i * 100); 
      // 最後の文字「ノ」が出るのが 7文字×150ms = 1050ms（約1秒後）
    });
  }
  window.nonstopDebateStart();
  await sleep(4000);
  mainLoop();
}


mainLoop = async function() {
  topUI.classList.add("show");
  bottomUI.classList.add("show");
  btn.forEach(element => {
    element.classList.add("show");
    element.style.pointerEvents = "auto"; // クリック可能にする
  });
  // pbtn (NodeList) の各要素に対して処理
  pbtn.forEach(element => {
    element.style.pointerEvents = "none"; // クリック不可にする
  });
}

practice = async function() {
  btn.forEach(element => {
    element.classList.remove("show");
    element.style.pointerEvents = "none";
  });
  await sleep(300);
  pbtn.forEach(element => {
    element.classList.add("show");
    element.style.pointerEvents = "auto";
  });
}

let hpValue, mpvalue, xpValue, atkValue, defValue, agiValue, intValue, dexValue, spiValue;
const estHp = document.getElementById("estimateHP");
const estSp = document.getElementById("estimateSP");
const estXp = document.getElementById("estimateXp");
const estAtk = document.getElementById("estimateATK");
const estDef = document.getElementById("estimateDEF");
const estAgi = document.getElementById("estimateAGI");
const estInt = document.getElementById("estimateINT");
const estDex = document.getElementById("estimateDEX");
const estSpi = document.getElementById("estimateSPI");


const practiceAction = {
  // --- 1つ目の訓練（例：HP系の訓練） ---
  btnHP: {
    isValued: false, // このボタン専用の決定フラグ
    values: {},      // このボタン専用の計算値の保存場所
    action: function(frame) {
      if (!this.isValued) {
        this.values = {
          hp: Math.floor(Math.random() * (15 - 10 + 1)) + 10,
          sp: Math.floor(Math.random() * (7 - 3 + 1)) + 3,
          spi: Math.floor(Math.random() * (4 - 2 + 1)) + 2,
          xp: Math.floor(Math.random() * (500 - 300 + 1)) + 300
        };
        this.isValued = true; // 自分の計算完了フラグを立てる
      }
      estHp.textContent = this.values.hp;
      estSp.textContent = this.values.sp;
      estSpi.textContent = this.values.spi;
      estXp.textContent = this.values.xp;
    }
  },

  // --- 2つ目の訓練（例：筋力系の訓練） ---
  btnATK: {
    isValued: false,
    values: {},
    action: function(frame) {
      if (!this.isValued) {
        this.values = {
          atk: Math.floor(Math.random() * (7 - 5 + 1)) + 5,
          dex: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
          spi: Math.floor(Math.random() * (2 - 1 + 1)) + 1,
          xp: Math.floor(Math.random() * (200 - 100 + 1)) + 100
        };
        this.isValued = true;
      }
      estAtk.textContent = this.values.atk;
      estDex.textContent = this.values.dex;
      estSpi.textContent = this.values.spi;
      estXp.textContent = this.values.xp;
    }
  },

  btnDEF: {
    isValued: false,
    values: {},
    action : function(frame) {
      if (!this.isValued) {
        this.values = {
          def: Math.floor(Math.random() * (7 - 5 + 1)) + 5,
          agi: Math.floor(Math.random() * (2 - 1 + 1)) + 1,
          int: Math.floor(Math.random() * (5 - 3 + 1)) + 3,
          xp: Math.floor(Math.random() * (200 - 100 + 1)) + 100
        };
        this.isValued = true;
      }
    estDef.textContent = this.values.def;
    estAgi.textContent = this.values.agi;
    estInt.textContent = this.values.int;
    estXp.textContent = this.values.xp;
    }
  }
};

let rafId = null;
let currentAction = null;
let frameCount = 0;

function updateLoop() {
  frameCount++;
  if (currentAction) currentAction(frameCount);
  rafId = requestAnimationFrame(updateLoop);
}

document.querySelectorAll(".practice-btn-container").forEach(btn => {
  btn.addEventListener("mouseenter", (e) => {
    const btnId = e.currentTarget.id;
    const targetObj = practiceAction[btnId];
    if (targetObj) {
      // 各ボタンオブジェクト内の action 関数に context (this) をバインドしてセット
      currentAction = targetObj.action.bind(targetObj);
      frameCount = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateLoop);
    }
  });

  btn.addEventListener("mouseleave", () => {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    document.querySelectorAll(".est").forEach(est => {
      est.textContent = "";
    })
    currentAction = null;
  });
});