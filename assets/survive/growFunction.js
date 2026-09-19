const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
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
}

window.surviveStarts = async function () {
  console.log("スタート");
  const log = document.getElementById("dialogue");
  if (log) log.classList.remove("show");
  
  changeBackground("landscapeHouse", 300);
  await sleep(1000);

  const debate = document.getElementById("debate");
  const spans = Array.from(debate.children);
  const circle = document.getElementById("circleDebate");

  // 原本を壊さないように浅いコピーをしてから反転（[...spans]）
  const reverseSpans = [...spans].reverse();

  // 演出を実行する関数
  window.nonstopDebateStart = function() {
    // 1文字ずつ「appear」クラスを付与して出現させる
    reverseSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add("appear");
      }, i * 100); 
    });

    // アニメーション完了後に右へ走り去り、中央の演出を起こす
    setTimeout(() => {
      debate.classList.add("runAway");
      if (circle) circle.classList.add("zoomDisappear");
      const startDebate = document.getElementById("startDebate");
      if (startDebate) startDebate.classList.add("startAnim");
    }, 1500);
  };

  // ★ ここでしっかり関数を実行呼び出しする！
  window.nonstopDebateStart();
};