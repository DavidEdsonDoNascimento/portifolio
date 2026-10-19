import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EVENT_TYPES,
  EVENTS_PER_ROUND,
  MAX_SCORE,
  ROUND_SECONDS,
  ROUTES,
  SERVICES,
  createRound,
  currentEvent,
  initialState,
  reducer,
  type EventType,
  type GameState,
  type Service,
} from "./packet-rush.ts";

const QUEUE: EventType[] = [
  "PRICE_UPDATE",
  "STOCK_CHANGED",
  "ORDER_CREATED",
  "PRICE_UPDATE",
  "ORDER_CREATED",
];

const started = (): GameState => reducer(initialState, { type: "start", queue: QUEUE });
const wrongFor = (event: EventType): Service => SERVICES.find((s) => s !== ROUTES[event])!;

describe("routing table", () => {
  it("maps each event to the specified service", () => {
    assert.deepEqual(ROUTES, {
      PRICE_UPDATE: "PRICING",
      STOCK_CHANGED: "STOCK",
      ORDER_CREATED: "ORDERS",
    });
  });
});

describe("start", () => {
  it("begins a playing round from a clean state", () => {
    const s = started();
    assert.equal(s.status, "playing");
    assert.equal(s.score, 0);
    assert.equal(s.answered, 0);
    assert.equal(s.secondsLeft, ROUND_SECONDS);
    assert.equal(currentEvent(s), "PRICE_UPDATE");
  });

  it("is not playing before start", () => {
    assert.equal(initialState.status, "idle");
    assert.equal(currentEvent(initialState), null);
  });
});

describe("scoring", () => {
  it("adds 100 points for a correct route", () => {
    const s = reducer(started(), { type: "answer", service: "PRICING" });
    assert.equal(s.score, 100);
    assert.equal(s.correct, 1);
    assert.equal(s.feedback?.kind, "correct");
    assert.equal(s.feedback?.delta, 100);
  });

  it("never lets the score go below zero", () => {
    const s = reducer(started(), { type: "answer", service: wrongFor("PRICE_UPDATE") });
    assert.equal(s.score, 0);
    assert.equal(s.feedback?.kind, "wrong");
    assert.equal(s.feedback?.delta, 0);
    assert.equal(s.feedback?.expected, "PRICING");
  });

  it("subtracts 50 points from a positive score", () => {
    let s = reducer(started(), { type: "answer", service: "PRICING" });
    s = reducer(s, { type: "answer", service: wrongFor("STOCK_CHANGED") });
    assert.equal(s.score, 50);
    assert.equal(s.feedback?.delta, -50);
    assert.equal(s.correct, 1);
  });

  it("reaches the 500 point maximum with five correct answers", () => {
    let s = started();
    for (const event of QUEUE) s = reducer(s, { type: "answer", service: ROUTES[event] });
    assert.equal(s.score, MAX_SCORE);
    assert.equal(MAX_SCORE, 500);
  });
});

describe("flow", () => {
  it("advances to the next event after each answer", () => {
    let s = started();
    s = reducer(s, { type: "answer", service: "PRICING" });
    assert.equal(s.answered, 1);
    assert.equal(currentEvent(s), "STOCK_CHANGED");
    s = reducer(s, { type: "answer", service: wrongFor("STOCK_CHANGED") });
    assert.equal(currentEvent(s), "ORDER_CREATED");
  });

  it("finishes as completed after five answers", () => {
    let s = started();
    for (let i = 0; i < EVENTS_PER_ROUND; i++) {
      assert.equal(s.status, "playing");
      s = reducer(s, { type: "answer", service: "STOCK" });
    }
    assert.equal(s.status, "finished");
    assert.equal(s.result, "completed");
    assert.equal(s.answered, EVENTS_PER_ROUND);
    assert.equal(currentEvent(s), null);
  });

  it("finishes on timeout keeping score and progress", () => {
    let s = reducer(started(), { type: "answer", service: "PRICING" });
    s = reducer(s, { type: "timeout" });
    assert.equal(s.status, "finished");
    assert.equal(s.result, "timeout");
    assert.equal(s.score, 100);
    assert.equal(s.answered, 1);
    assert.equal(s.secondsLeft, 0);
  });

  it("ignores answers, ticks and timeouts when not playing", () => {
    assert.equal(reducer(initialState, { type: "answer", service: "PRICING" }), initialState);
    assert.equal(reducer(initialState, { type: "tick", secondsLeft: 3 }), initialState);
    assert.equal(reducer(initialState, { type: "timeout" }), initialState);

    const done = reducer(started(), { type: "timeout" });
    assert.equal(reducer(done, { type: "answer", service: "PRICING" }), done);
    assert.equal(reducer(done, { type: "timeout" }), done);
    assert.equal(reducer(done, { type: "tick", secondsLeft: 9 }), done);
  });

  it("ignores ticks that do not change the displayed second", () => {
    const s = started();
    assert.equal(reducer(s, { type: "tick", secondsLeft: ROUND_SECONDS }), s);
    assert.equal(reducer(s, { type: "tick", secondsLeft: 9 }).secondsLeft, 9);
  });
});

describe("play again", () => {
  it("resets score, progress, timer and result", () => {
    let s = started();
    for (const event of QUEUE) s = reducer(s, { type: "answer", service: ROUTES[event] });
    assert.equal(s.status, "finished");

    s = reducer(s, { type: "start", queue: QUEUE });
    assert.equal(s.status, "playing");
    assert.equal(s.score, 0);
    assert.equal(s.correct, 0);
    assert.equal(s.answered, 0);
    assert.equal(s.secondsLeft, ROUND_SECONDS);
    assert.equal(s.result, null);
    assert.equal(s.feedback, null);
  });
});

describe("createRound", () => {
  it("creates five events including every event type", () => {
    for (let i = 0; i < 200; i++) {
      const round = createRound();
      assert.equal(round.length, EVENTS_PER_ROUND);
      for (const type of EVENT_TYPES) assert.ok(round.includes(type), `missing ${type}`);
    }
  });

  it("is deterministic for a given random source", () => {
    const seeded = () => {
      let x = 7;
      return () => (x = (x * 16807) % 2147483647) / 2147483647;
    };
    assert.deepEqual(createRound(seeded()), createRound(seeded()));
  });
});
