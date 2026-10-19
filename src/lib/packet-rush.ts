/**
 * Packet Rush rules: a pure reducer with no React or browser dependencies, so
 * it can be unit-tested with `node --test` (see packet-rush.test.ts).
 * Keep this file free of enums and other syntax Node's type stripping rejects.
 */

export type EventType = "PRICE_UPDATE" | "STOCK_CHANGED" | "ORDER_CREATED";
export type Service = "PRICING" | "STOCK" | "ORDERS";

export const EVENT_TYPES: readonly EventType[] = ["PRICE_UPDATE", "STOCK_CHANGED", "ORDER_CREATED"];
/** Order matters: it maps to the keyboard shortcuts 1, 2 and 3. */
export const SERVICES: readonly Service[] = ["PRICING", "STOCK", "ORDERS"];

export const ROUTES: Record<EventType, Service> = {
  PRICE_UPDATE: "PRICING",
  STOCK_CHANGED: "STOCK",
  ORDER_CREATED: "ORDERS",
};

export const EVENTS_PER_ROUND = 5;
export const ROUND_SECONDS = 15;
export const POINTS_CORRECT = 100;
export const POINTS_WRONG = 50;
export const MAX_SCORE = EVENTS_PER_ROUND * POINTS_CORRECT;

export type Feedback = {
  kind: "correct" | "wrong";
  event: EventType;
  chosen: Service;
  expected: Service;
  /** Points gained (positive) or lost (negative, after clamping at zero). */
  delta: number;
  /** Unique within a round; lets the UI retrigger its flash animation. */
  seq: number;
};

export type GameState = {
  status: "idle" | "playing" | "finished";
  queue: readonly EventType[];
  /** Number of answered events; also the index of the event currently shown. */
  answered: number;
  correct: number;
  score: number;
  secondsLeft: number;
  result: "completed" | "timeout" | null;
  feedback: Feedback | null;
};

export type GameAction =
  | { type: "start"; queue: readonly EventType[] }
  | { type: "answer"; service: Service }
  | { type: "tick"; secondsLeft: number }
  | { type: "timeout" };

export const initialState: GameState = {
  status: "idle",
  queue: [],
  answered: 0,
  correct: 0,
  score: 0,
  secondsLeft: ROUND_SECONDS,
  result: null,
  feedback: null,
};

/**
 * Five events per round: every event type appears at least once, the remaining
 * two are random, and the whole set is shuffled. `rng` is injectable for tests.
 */
export function createRound(rng: () => number = Math.random): EventType[] {
  const round: EventType[] = [...EVENT_TYPES];
  while (round.length < EVENTS_PER_ROUND) {
    round.push(EVENT_TYPES[Math.floor(rng() * EVENT_TYPES.length)]);
  }
  for (let i = round.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [round[i], round[j]] = [round[j], round[i]];
  }
  return round;
}

export function currentEvent(state: GameState): EventType | null {
  return state.status === "playing" ? (state.queue[state.answered] ?? null) : null;
}

export function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "start":
      // Also serves as "Play Again": always begins from a clean state.
      return { ...initialState, status: "playing", queue: action.queue };

    case "answer": {
      const event = currentEvent(state);
      if (event === null) return state;

      const expected = ROUTES[event];
      const isCorrect = action.service === expected;
      const score = isCorrect
        ? state.score + POINTS_CORRECT
        : Math.max(0, state.score - POINTS_WRONG);
      const answered = state.answered + 1;
      const done = answered >= state.queue.length;

      return {
        ...state,
        status: done ? "finished" : "playing",
        result: done ? "completed" : null,
        answered,
        correct: state.correct + (isCorrect ? 1 : 0),
        score,
        feedback: {
          kind: isCorrect ? "correct" : "wrong",
          event,
          chosen: action.service,
          expected,
          delta: score - state.score,
          seq: answered,
        },
      };
    }

    case "tick":
      if (state.status !== "playing" || state.secondsLeft === action.secondsLeft) return state;
      return { ...state, secondsLeft: action.secondsLeft };

    case "timeout":
      if (state.status !== "playing") return state;
      return { ...state, status: "finished", result: "timeout", secondsLeft: 0 };
  }
}
