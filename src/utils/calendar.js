import { EVENT_NAME, EVENT_STARTS_AT, EVENT_VENUE } from "../data/sessions";

const MONTHS = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

const SESSION_DURATION_MINUTES = 45;
const EVENT_YEAR = new Date(EVENT_STARTS_AT).getFullYear();

// Sessions only carry a display date like "Oct 14" and a time like "09:30" —
// combine those with the event's year to get a real Date. Note: this treats
// the time as whatever the browser's local timezone is, since the event data
// doesn't model a venue timezone — close enough for a portfolio project, but
// worth knowing if this were ever a real multi-timezone event.
function getSessionDateRange(session) {
  const [monthStr, dayStr] = session.date.split(" ");
  const [hours, minutes] = session.time.split(":").map(Number);
  const start = new Date(EVENT_YEAR, MONTHS[monthStr], Number(dayStr), hours, minutes);
  const end = new Date(start.getTime() + SESSION_DURATION_MINUTES * 60000);
  return { start, end };
}

function toGoogleDateFormat(date) {
  return date.toISOString().replace(/[-:]|\.\d{3}/g, "");
}

export function getGoogleCalendarUrl(session) {
  const { start, end } = getSessionDateRange(session);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${session.title} — ${EVENT_NAME}`,
    dates: `${toGoogleDateFormat(start)}/${toGoogleDateFormat(end)}`,
    details: `${session.speaker}, ${session.role}\n\n${EVENT_NAME}`,
    location: `${session.room}, ${EVENT_VENUE}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
