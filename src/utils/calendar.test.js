import { describe, test, expect } from "vitest";
import { getGoogleCalendarUrl } from "./calendar";

const session = {
  title: "Test Session",
  speaker: "Ada Lovelace",
  role: "Engineer, Test Co",
  date: "Oct 14",
  time: "09:30",
  room: "Hall A",
};

describe("getGoogleCalendarUrl", () => {
  test("builds a Google Calendar TEMPLATE render URL", () => {
    const url = new URL(getGoogleCalendarUrl(session));
    expect(url.origin + url.pathname).toBe("https://calendar.google.com/calendar/render");
    expect(url.searchParams.get("action")).toBe("TEMPLATE");
  });

  test("includes the session title in the event text", () => {
    const url = new URL(getGoogleCalendarUrl(session));
    expect(url.searchParams.get("text")).toContain("Test Session");
  });

  test("sets a 45-minute dates range in Google's UTC format", () => {
    const url = new URL(getGoogleCalendarUrl(session));
    const [start, end] = url.searchParams.get("dates").split("/");

    expect(start).toMatch(/^\d{8}T\d{6}Z$/);
    expect(end).toMatch(/^\d{8}T\d{6}Z$/);

    const toMs = (s) =>
      Date.UTC(
        Number(s.slice(0, 4)),
        Number(s.slice(4, 6)) - 1,
        Number(s.slice(6, 8)),
        Number(s.slice(9, 11)),
        Number(s.slice(11, 13)),
        Number(s.slice(13, 15))
      );

    expect(toMs(end) - toMs(start)).toBe(45 * 60 * 1000);
  });

  test("includes speaker and role in the details", () => {
    const url = new URL(getGoogleCalendarUrl(session));
    const details = url.searchParams.get("details");
    expect(details).toContain("Ada Lovelace");
    expect(details).toContain("Engineer, Test Co");
  });

  test("includes the room in the location", () => {
    const url = new URL(getGoogleCalendarUrl(session));
    expect(url.searchParams.get("location")).toContain("Hall A");
  });
});
