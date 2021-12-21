import Colors from "./CalendarColors";

interface CalendarEventInterface {
  id: string;
  startAt: string;
  endAt: string;
  timezoneStartAt: string;
  summary: string;
  color: Colors;
}

export default CalendarEventInterface;