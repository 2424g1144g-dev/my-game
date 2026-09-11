//最初の画面
firstEnter = true;
window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && firstEnter) {
        const el = document.getElementById("first");
        firstEnter = false;
        el.style.opacity = 0;

    }
  });