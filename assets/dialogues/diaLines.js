window.DIALOGUE_LINES = window.DIALOGUE_LINES || {};

DIALOGUE_LINES.opening = [
    {name: "ナレーション", lines: [{segments: [{text: "オープニングを閲覧しますか？", class: "green"}], event: [{type: "diaToggle"},{type: "choice", choices: [{text: "閲覧する", target: "openingStart"},{text: "閲覧しない", target: "start"}]}]}]},
]