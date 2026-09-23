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
let hit = 100;
let dod = 7;



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
  while (hp > 0) {
    top = document.getElementById("trainingTopContainer");
    bottom = document.getElementById("trainingBottomContainer");
    top.classList.add("show");
    await sleep(30000);
  }
}