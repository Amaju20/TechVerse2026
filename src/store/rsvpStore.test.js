import { describe, test, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../api/axios";

vi.mock("../api/axios", () => ({
  default: { get: vi.fn(), post: vi.fn() },
}));

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn(), success: vi.fn(), info: vi.fn() },
}));

import { useRsvpStore } from "./rsvpStore";

beforeEach(() => {
  useRsvpStore.setState({ ids: [], loaded: false });
  vi.clearAllMocks();
});

describe("loadRsvps", () => {
  test("populates ids from the API on success", async () => {
    axiosInstance.get.mockResolvedValueOnce({ data: { sessionIds: ["sess-01", "sess-02"] } });

    await useRsvpStore.getState().loadRsvps();

    expect(useRsvpStore.getState().ids).toEqual(["sess-01", "sess-02"]);
    expect(useRsvpStore.getState().loaded).toBe(true);
  });

  test("falls back to an empty list on failure (e.g. not logged in yet)", async () => {
    axiosInstance.get.mockRejectedValueOnce({ response: { status: 401 } });

    await useRsvpStore.getState().loadRsvps();

    expect(useRsvpStore.getState().ids).toEqual([]);
    expect(useRsvpStore.getState().loaded).toBe(true);
  });
});

describe("toggleRsvp", () => {
  test("optimistically adds the session id before the request resolves", async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { attending: true, sessionIds: ["sess-01"] } });

    const pending = useRsvpStore.getState().toggleRsvp("sess-01");
    expect(useRsvpStore.getState().ids).toEqual(["sess-01"]);

    await pending;
    expect(useRsvpStore.getState().ids).toEqual(["sess-01"]);
  });

  test("optimistically removes a session id that was already RSVP'd", async () => {
    useRsvpStore.setState({ ids: ["sess-01"] });
    axiosInstance.post.mockResolvedValueOnce({ data: { attending: false, sessionIds: [] } });

    await useRsvpStore.getState().toggleRsvp("sess-01");

    expect(useRsvpStore.getState().ids).toEqual([]);
  });

  test("rolls back the optimistic update if the request fails", async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error("network error"));

    await useRsvpStore.getState().toggleRsvp("sess-01");

    expect(useRsvpStore.getState().ids).toEqual([]);
  });

  test("posts to the correct per-session endpoint", async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { attending: true, sessionIds: ["sess-02"] } });

    await useRsvpStore.getState().toggleRsvp("sess-02");

    expect(axiosInstance.post).toHaveBeenCalledWith("/rsvps/sess-02");
  });
});

describe("clearRsvps", () => {
  test("resets ids and loaded back to their initial state", () => {
    useRsvpStore.setState({ ids: ["sess-01"], loaded: true });

    useRsvpStore.getState().clearRsvps();

    expect(useRsvpStore.getState().ids).toEqual([]);
    expect(useRsvpStore.getState().loaded).toBe(false);
  });
});
