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

  diaStart: (event) => {
    DIALOGUE.start(DIALOGUE_LINES[event.id]);
  },

  diaStarts: (event) => {
    // 1. 動いているタイマーを強制停止
    DIALOGUE.isTyping = false;
  
    // 2. setTimeout で現在の処理ループが終わってから次のダイアログを開始する
    setTimeout(() => {
      if (DIALOGUE_LINES[event.id]) {
        DIALOGUE.start(DIALOGUE_LINES[event.id]);
      } else {
        console.warn("ダイアログが見つかりません:", event.id);
      }
    }, 0);
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
  },

  spriteFlash: () => {
    setTimeout (() => {
      document.getElementById("spriteContain").classList.add("whiteFlash");
      addEventListener("animationend", () => {
        document.getElementById("spriteContain").classList.remove("whiteFlash");
      })
    }, 200);
  },

  BGRumble: () => {
    const bg = document.getElementById("background_layer");
    bg.classList.toggle("rumble");
  }
}