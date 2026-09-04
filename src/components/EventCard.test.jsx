import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import EventCard from "./EventCard";
import { useAuthStore } from "../store/authStore";
import { useRsvpStore } from "../store/rsvpStore";

const session = {
  id: "sess-01",
  title: "Test Session",
  speaker: "Ada Lovelace",
  role: "Engineer, Test Co",
  track: "Engineering",
  date: "Oct 14",
  time: "09:30",
  room: "Hall A",
};

beforeEach(() => {
  useAuthStore.setState({ user: null, loading: false });
  useRsvpStore.setState({ ids: [], loaded: true });
});

describe("EventCard", () => {
  test('shows "RSVP now" when the session is not attended', () => {
    render(
      <MemoryRouter>
        <EventCard session={session} />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /rsvp now/i })).toBeInTheDocument();
  });

  test('shows "Attending" when the session id is in the RSVP list', () => {
    useRsvpStore.setState({ ids: ["sess-01"], loaded: true });
    render(
      <MemoryRouter>
        <EventCard session={session} />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /attending/i })).toBeInTheDocument();
  });

  test("redirects a logged-out user to /login instead of RSVPing", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<EventCard session={session} />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole("button", { name: /rsvp now/i }));

    expect(await screen.findByText("Login Page")).toBeInTheDocument();
  });
});
