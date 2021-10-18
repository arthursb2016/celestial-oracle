import { DateTime } from 'luxon';

const getCurrentHour = () => DateTime.now().c.hour;

export const greetings = [
  () => {
    let dynamicText;
    const isAfterMidday = getCurrentHour() > 13;
    if (isAfterMidday) {
      dynamicText = 'I hope you are having an awesome day'
    } else {
      dynamicText = 'I have a feeling that today is going to be a great day';
    }
    return `Welcome to the House of Angels. ${dynamicText}! Now, let me ask you something: have you ever met an Angel before?`;
  },

  () => {
    const currHour = getCurrentHour();
    const isMorning = currHour > 6 && currHour < 12;
    const isAfternoon = currHour >= 13 && currHour < 18;
    const dynamicText = `Good ${isMorning ? 'morning' : isAfternoon ? 'afternoon' : 'night'}`;
    return `${dynamicText} my friend! This is the House of Angels, a place full of peace and love. Would you like to meet an actual Angel today?`;
  },
];
