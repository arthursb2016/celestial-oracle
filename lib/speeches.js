import { DateTime } from 'luxon';

export const greetings = [
  () => {
    let dynamicText;
    const { hour } = DateTime.now().c;
    const isAfterMidday = hour > 13;
    if (isAfterMidday) {
      dynamicText = 'I hope you are having an awesome day'
    } else {
      dynamicText = 'I have a feeling that today is going to be a great day';
    }
    return `Welcome to the House of Angels. ${dynamicText}! Now, let me ask you something: have you ever met an Angel before?`;
  },
];
