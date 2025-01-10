import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz';
import { parse } from 'date-fns';

export function hexToRgba(hex, opacity) {

  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


export function convertToGoogleTimestamp(date, time, timeZone) {
  try {
    // Parse the time string
    const [hours, minutes] = time.split(':').map(Number);
    
    // Create a new date object with the correct date
    const baseDate = new Date(date);
    baseDate.setHours(hours);
    baseDate.setMinutes(minutes);
    baseDate.setSeconds(0);
    baseDate.setMilliseconds(0);

    // Format for Google Calendar in the target timezone
    return formatInTimeZone(
      baseDate,
      timeZone,
      "yyyy-MM-dd'T'HH:mm:ssXXX"
    );
  } catch (error) {
    console.error('Error converting timestamp:', error);
    console.error('Input values:', { date, time, timeZone });
    return null;
  }
}


export function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
