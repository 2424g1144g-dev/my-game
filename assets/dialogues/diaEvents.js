window.DIALOGUE_EVENTS = {
  enterToggle: () => {
    textEnter != textEnter;
  },
  
  diaToggle: () => {
    const log = activeDialog;
    log.classList.toggle("show");
  },

  choice: () => {
    showChoice(event.id);
  }
}