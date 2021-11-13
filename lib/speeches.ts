import { getCurrentHour, getCurrentWeekday } from './functions/datetime';

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
    const isMorning = currHour >= 5 && currHour < 12;
    const isAfternoon = currHour >= 12 && currHour < 18;
    const dynamicText = `Good ${isMorning ? 'morning' : isAfternoon ? 'afternoon' : 'night'}`;
    return `${dynamicText} my friend! Welcome to the House of Angels, a place full of peace and love. Would you like to meet an actual Angel today?`;
  },

  () => {
    const weekday = getCurrentWeekday();
    return `Hello my dear, I am so happy you are here! Please take a moment of reflection to meet a celestial Angel: It will make your ${weekday} much better.`
  },
];

export const speeches = [
  () => {
    return 'Have you enjoyed your meeting? We Angels are always watching over you humans. Please feel free to come back whenever you want!';
  },

  () => {
    return 'Every Angel has a special message! We will always be available to see you, I hope you always keep your heart open for us.';
  },

  () => {
    return 'Let me tell you this: All the Angels are really glad to share their knowledge with you. How do you feel about coming back here tomorrow?';
  },

  () => {
    return 'How about the Angel you met today? I know for sure he loved meeting you too. Feel free to tell about us to your friends and family, we will love meeting them as well.'
  },
];
