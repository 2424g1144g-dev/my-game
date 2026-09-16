window.DIALOGUE_LINES = window.DIALOGUE_LINES || {};

DIALOGUE_LINES.opening = [
  {name: "ナレーション", lines: [{segments: [{text: "オープニングを閲覧しますか？", class: "green"}], event: [{type: "diaToggle"},{type: "choice", choices: [{text: "閲覧する", target: "watchOpening"},{text: "閲覧しない", target: "start"}]}]}]},
];

DIALOGUE_LINES.watchOpening = [
    {name: "ナレーション", lines: [{segments: [{text: "とある県にて...ある一人の化学教師が", class: "green"}]},
                                   {segments: [{text: "長期休みを利用して気ままなクルーズ船旅を楽しんでいました...", class: "green"}], event: [{type: "enterToggle"}]}]},
    {name: "", lines: [{segments: [{text: " "}], event: [{type: "background", id: "shipTsukagoe", fade: 800},{type: "diaToggle"},{type: "enterToggle"}]}]},
    {name: "ナレーション", lines: [{segments: [{text: "名前は", class: "green"},{text: "塚越充浩（ツカゴエ　ミツヒロ）", class: "yellow"}], event: [{type: "diaToggle"}]}]}
]