export const typewriter = (elem, text, speed, onDone) => {
  let array = text.split('');
  let timer;

  const frameLooper = () => {
    if (array.length > 0) {
      const char = array.shift();
      let pauseTime = 0;
      if (['!', '.', ':'].includes(char)) {
        pauseTime = 500;
      } else if (char === ',') {
        pauseTime = 200;
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
