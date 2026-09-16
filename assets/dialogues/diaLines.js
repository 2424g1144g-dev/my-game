window.DIALOGUE_LINES = window.DIALOGUE_LINES || {};

DIALOGUE_LINES.opening = [
  {name: "ナレーション", lines: [{segments: [{text: "オープニングを閲覧しますか？", class: "green"}], event: [{type: "diaToggle"},{type: "choice", choices: [{text: "閲覧する", target: "watchOpening"},{text: "閲覧しない", target: "start"}]}]}]},
];

DIALOGUE_LINES.watchOpening = [
    {name: "ナレーション", lines: [{segments: [{text: "とある県にて...ある一人の化学教師が", class: "green"}]},
                                   {segments: [{text: "長期休みを利用してクルーズ船旅を楽しんでいました...", class: "green"}], event: [{type: "enterToggle"}]}]},
    {name: "", lines: [{segments: [{text: " "}], event: [{type: "background", id: "shipTsukagoe", fade: 800},{type: "diaToggle"},{type: "enterToggle"}], autoNext: true, dialogueAutoNext: true, wait: 2000}]},
    {name: "ナレーション", lines: [{segments: [{text: "名前は", class: "green"},{text: "塚越充浩（ツカゴエ　ミツヒロ）", class: "yellow"}], event: [{type: "diaToggle"},{type: "enterToggle"}]}]},
    {name: "ナレーション", lines: [{segments: [{text: "サッカー部の顧問で、サッカーのしすぎで", class: "green"}]},
                                   {segments: [{text: "下半身だけ妙に筋肉質である。", class: "green"}]}]},
    {name: "ナレーション", lines: [{segments: [{text: "そんな塚越は潮風に吹かれながら優雅な時間を過ごしていた...", class: "green"}]}]},
    {name: "", lines: [{segments: [{text: " "}], event: [{type: "background", id: "ship", fade: 800},{type: "diaToggle"},{type: "enterToggle"}], autoNext: true, dialogueAutoNext: true, wait: 3000}]},
    {name: "", lines: [{segments: [{text: " "}], event: [{type: "diaChange", id: "dialogueSpeaking"},{type: "spriteChange", id: "mitsuhiro/Mitsuhiro_Normal"}]}]},
    {name: "", lines: [{segments: [{text: " "}], event: [{type: "diaToggle"}], autoNext: true, dialogueAutoNext: true, wait: 800}]},
    {name: "ツカゴエ　ミツヒロ", lines: [{segments: [{text: "いや〜人生で初めて船になんて乗ったが、"}], event: [{type: "enterToggle"},{type: "spriteChange", id: "mitsuhiro/Mitsuhiro_Good"},{type: "whiteFlash"}]},
                                         {segments: [{text: "乗り心地最高やな〜。"}]}]},

]