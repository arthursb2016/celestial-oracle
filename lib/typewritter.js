export const typewriter = (elem, text, speed, onDone) => {
  let array = text.split('');
  let timer;

  const frameLooper = () => {
    if (array.length > 0) {
      const isLastChar = array.length === 1;
      const char = array.shift();
      let pauseTime = 0;
      if (['!', '?', '.', ':'].includes(char) && !isLastChar) {
        pauseTime = 600;
      } else if (char === ',') {
        pauseTime = 250;
      }
      elem.innerHTML += char;
      timer = setTimeout(frameLooper, speed + pauseTime);
    } else {
      clearTimeout(timer);
      onDone();
    }
  }

  frameLooper();
};
