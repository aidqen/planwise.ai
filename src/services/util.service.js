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

export const getIntensityColor = (intensity) => {
  switch (intensity) {
    case "relaxed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/70 dark:text-blue-100";
    case "moderate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-100";
    case "intense":
      return "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/70 dark:text-gray-100";
  }
};

export const getImportanceColor = (importance) => {
  switch (importance) {
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900/70 dark:text-green-100";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/70 dark:text-yellow-100";
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900/70 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/70 dark:text-gray-100";
  }
};

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
