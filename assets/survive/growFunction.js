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