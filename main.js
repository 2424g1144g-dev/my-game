//最初の画面
firstEnter = true;
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && firstEnter) {
        const el = document.getElementById("first");
        firstEnter = false;
        el.style.opacity = 0;

    }
  });

  //タイトルの選択肢
function start() {
  const flash = document.getElementById("flash");
  const img = document.getElementById("titleTsukagoe");
  flash.classList.add("actionFlash");
  img.src = "assets/BG/titleTsukagoeGood.png";
  setTimeout(() => {
    flash.classList.remove("actionFlash");
  }, 500);
}