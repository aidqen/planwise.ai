import { formatInTimeZone } from 'date-fns-tz';

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
    // Extract the date part (YYYY-MM-DD) from the ISO date string
    const isoDate = date.split('T')[0];

    // Combine date and time into ISO-like format
    const dateTimeString = `${isoDate}T${time}:00`;

    // Create a Date object from the combined string
    const utcDate = new Date(`${dateTimeString}Z`); // Add 'Z' for UTC parsing

    // Format the date in the specific time zone
    const formattedDate = formatInTimeZone(utcDate, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX");

    return formattedDate;
  } catch (error) {
    console.error('Error converting timestamp:', error);
    return null;
  }
}


export function getMinutesFromMidnight(time) {
  const [hours, minutes] = time?.split(':').map(Number)
  return hours * 60 + minutes
}
