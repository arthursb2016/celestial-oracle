export const typewriter = (elem: HTMLElement, text: string, speed: number, onDone: Function): void => {
  let array = text.split('');
  let timer: number;

  const frameLooper = () => {
    if (array.length > 0) {
      const isLastChar = array.length === 1;
      const char = array.shift();
      let pauseTime = 0;
      if (char && ['!', '?', '.', ':'].includes(char) && !isLastChar) {
        pauseTime = 600;
      } else if (char === ',') {
        pauseTime = 250;
      }
      elem.innerHTML += char;
      timer = window.setTimeout(frameLooper, speed + pauseTime);
    } else {
      window.clearTimeout(timer);
      onDone();
    }
  }

  frameLooper();
};
