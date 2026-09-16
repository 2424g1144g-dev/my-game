window.DIALOGUE_EVENTS = {
  enterToggle: () => {
    textEnter = !textEnter;
  },
  
  diaChange: (event) => {
    useDialog(event.id);
    const el = document.getElementById(event.id);
    DIALOGUE.init(el, DIALOGUE.data);
  },

  diaToggle: () => {
    const log = activeDialog;
    log.classList.toggle("show");
  },

  background: (event) => {
    changeBackground(event.id, event.fade);
  },

  choice: (event) => {
    if (!event.choices || !Array.isArray(event.choices)) return;
    // showChoice に渡す引数用の配列を作成 [テキスト1, target1, テキスト2, target2, ...]
    const choiceArgs = [];
    event.choices.forEach(c => {
      choiceArgs.push(c.text);
      choiceArgs.push(c.target); // ダイアログのキー文字列、または関数
    });
    // スプレッド構文 (...) で配列を展開して showChoice を実行
    showChoice(...choiceArgs);
  },

  whiteFlash: () => {
    document.getElementById("flash").classList.add("actionFlash");
    addEventListener("animationend", () => {
      document.getElementById("flash").classList.remove("actionFlash");
    })
  },

  spriteChange: (event) => {
    spriteChange(event.id);
  }
}