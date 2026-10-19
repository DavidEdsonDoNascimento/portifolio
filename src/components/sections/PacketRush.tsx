"use client";

import { ArrowRight, Check, Play, RotateCcw, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useReducer, useRef, type CSSProperties } from "react";
import { buttonClassName } from "@/components/ui/ButtonLink";
import { REALTIME_PROJECT_ID } from "@/data/projects";
import {
  EVENT_TYPES,
  EVENTS_PER_ROUND,
  MAX_SCORE,
  POINTS_CORRECT,
  POINTS_WRONG,
  ROUND_SECONDS,
  ROUTES,
  SERVICES,
  createRound,
  currentEvent,
  initialState,
  reducer,
  type Service,
} from "@/lib/packet-rush";

const TICK_MS = 250;
const LOW_TIME_SECONDS = 5;
// Connector paths drawn from the event (top centre) to each destination column.
const CONNECTORS = ["M150 0 C150 22 50 22 50 44", "M150 0 V44", "M150 0 C150 22 250 22 250 44"];

const statusDot = { idle: "bg-muted", playing: "bg-primary", finished: "bg-secondary" } as const;

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

export function PacketRush() {
  const t = useTranslations("packetRush");
  const [state, dispatch] = useReducer(reducer, initialState);
  const deadline = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { status } = state;

  const start = useCallback(() => {
    deadline.current = performance.now() + ROUND_SECONDS * 1000;
    dispatch({ type: "start", queue: createRound() });
  }, []);

  // One interval per active round: created when play begins, cleared as soon as
  // the round ends (or the component unmounts). It reads a fixed deadline, so
  // throttled background tabs cannot stretch the 15 seconds.
  useEffect(() => {
    if (status !== "playing") return;
    const id = window.setInterval(() => {
      const left = deadline.current - performance.now();
      if (left <= 0) dispatch({ type: "timeout" });
      else dispatch({ type: "tick", secondsLeft: Math.ceil(left / 1000) });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [status]);

  // Keyboard shortcuts 1/2/3 exist only while a round is active.
  useEffect(() => {
    if (status !== "playing") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      if (event.ctrlKey || event.metaKey || event.altKey || isEditable(event.target)) return;
      const index = ["1", "2", "3"].indexOf(event.key);
      if (index !== -1) dispatch({ type: "answer", service: SERVICES[index] });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [status]);

  // The button that was just used unmounts, so hand focus to the new view.
  useEffect(() => {
    if (status === "playing") stageRef.current?.focus({ preventScroll: true });
    if (status === "finished") resultRef.current?.focus({ preventScroll: true });
  }, [status]);

  const event = currentEvent(state);
  const feedback = state.feedback;

  let announcement = "";
  if (status === "playing" && event) {
    const lead = !feedback
      ? t("announce.started")
      : feedback.kind === "correct"
        ? t("announce.correct", { points: POINTS_CORRECT })
        : t("announce.wrong", { event: feedback.event, service: feedback.expected });
    announcement = `${lead} ${t("announce.incoming", { event, description: t(`events.${event}`) })}`;
  }

  return (
    <div role="region" aria-label={t("region")}>
      <div className="border-border flex items-center justify-between gap-3 border-b px-5 py-3 sm:px-7">
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="flex items-center gap-2 max-sm:hidden">
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
            <span className="bg-border size-2.5 rounded-full" />
          </span>
          <span className="text-muted font-mono text-xs whitespace-nowrap">packet-rush.mini</span>
        </div>
        <p className="border-border text-muted inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px]">
          <span className={`size-1.5 rounded-full ${statusDot[status]}`} aria-hidden="true" />
          <span className="sr-only">{t("status.label")} </span>
          {t(`status.${status}`)}
        </p>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {announcement}
      </p>

      <div className="px-5 py-8 sm:px-8 sm:py-10">
        {status === "idle" && <Intro onStart={start} />}

        {status === "playing" && event && (
          <div ref={stageRef} tabIndex={-1} role="group" aria-label={t("playing.groupLabel")} className="outline-none">
            <dl className="mx-auto grid max-w-xl grid-cols-3 gap-3 text-center">
              <div>
                <dt className="text-muted font-mono text-[11px] tracking-widest uppercase">{t("playing.score")}</dt>
                <dd className="font-display text-3xl font-semibold tabular-nums">{state.score}</dd>
              </div>
              <div>
                <dt className="text-muted font-mono text-[11px] tracking-widest uppercase">{t("playing.time")}</dt>
                <dd
                  className={`font-display text-3xl font-semibold tabular-nums ${
                    state.secondsLeft <= LOW_TIME_SECONDS ? "text-danger" : ""
                  }`}
                >
                  <span role="timer" aria-label={t("playing.timerLabel")}>
                    {t("playing.seconds", { seconds: state.secondsLeft })}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-muted font-mono text-[11px] tracking-widest uppercase">{t("playing.routed")}</dt>
                <dd className="font-display text-3xl font-semibold tabular-nums">
                  {state.answered}/{EVENTS_PER_ROUND}
                </dd>
              </div>
            </dl>

            <div className="bg-border mx-auto mt-5 h-1.5 max-w-xl overflow-hidden rounded-full" aria-hidden="true">
              <div
                className={`pr-fill h-full rounded-full ${
                  state.secondsLeft <= LOW_TIME_SECONDS ? "bg-danger" : "bg-primary"
                }`}
                style={{ "--pr-scale": state.secondsLeft / ROUND_SECONDS } as CSSProperties}
              />
            </div>

            <div className="mx-auto mt-8 max-w-xl">
              <div
                key={state.answered}
                className="pr-enter border-border bg-surface-elevated rounded-2xl border px-5 py-6 text-center"
              >
                <p className="text-muted font-mono text-[11px] tracking-widest uppercase">
                  {t("playing.incoming")}
                </p>
                <p className="text-primary mt-2 font-mono text-2xl font-medium break-words sm:text-3xl">
                  {event}
                </p>
                <p className="text-muted mt-2 text-sm">{t(`events.${event}`)}</p>
              </div>

              <div className="mt-3 min-h-6 text-center text-sm" aria-hidden="true">
                {feedback ? (
                  <p
                    key={feedback.seq}
                    className={`pr-enter inline-flex items-center gap-1.5 ${
                      feedback.kind === "correct" ? "text-primary" : "text-danger"
                    }`}
                  >
                    {feedback.kind === "correct" ? (
                      <>
                        <Check size={16} /> {t("feedback.correct", { points: POINTS_CORRECT })}
                      </>
                    ) : (
                      <>
                        <X size={16} />{" "}
                        {t(feedback.delta < 0 ? "feedback.wrongPenalty" : "feedback.wrong", {
                          event: feedback.event,
                          service: feedback.expected,
                          delta: feedback.delta,
                        })}
                      </>
                    )}
                  </p>
                ) : null}
              </div>

              <svg viewBox="0 0 300 44" className="mx-auto block w-full" aria-hidden="true" fill="none">
                {CONNECTORS.map((d) => (
                  <path key={d} d={d} className="stroke-border" strokeWidth="1.5" strokeDasharray="3 5" />
                ))}
                {feedback ? (
                  <path
                    key={feedback.seq}
                    d={CONNECTORS[SERVICES.indexOf(feedback.chosen)]}
                    pathLength={100}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className={`pr-fire ${feedback.kind === "correct" ? "stroke-primary" : "stroke-danger"}`}
                  />
                ) : null}
              </svg>

              <div className="grid grid-cols-3 gap-3">
                {SERVICES.map((service, index) => (
                  <DestinationButton
                    key={service}
                    service={service}
                    index={index}
                    state={state}
                    onSelect={() => dispatch({ type: "answer", service })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {status === "finished" && (
          <div ref={resultRef} tabIndex={-1} className="mx-auto max-w-2xl text-center outline-none">
            <p className="text-muted font-mono text-[11px] tracking-widest uppercase">
              {state.result === "completed" ? t("result.completedLabel") : t("result.timeoutLabel")}
            </p>
            <h3 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {state.result === "completed" ? t("result.completedTitle") : t("result.timeoutTitle")}
            </h3>

            <p className="mt-6">
              <span className="font-display text-primary text-6xl font-semibold tabular-nums">
                {state.score}
              </span>
              <span className="text-muted ml-2 text-lg">{t("result.points", { max: MAX_SCORE })}</span>
            </p>

            <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-3 text-center">
              <div className="border-border bg-surface-elevated rounded-xl border p-4">
                <dt className="text-muted text-xs">{t("result.correct")}</dt>
                <dd className="font-display mt-1 text-2xl font-semibold tabular-nums">
                  {state.correct} / {EVENTS_PER_ROUND}
                </dd>
              </div>
              <div className="border-border bg-surface-elevated rounded-xl border p-4">
                <dt className="text-muted text-xs">{t("result.answered")}</dt>
                <dd className="font-display mt-1 text-2xl font-semibold tabular-nums">
                  {state.answered} / {EVENTS_PER_ROUND}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex justify-center">
              <button type="button" onClick={start} className={buttonClassName("primary")}>
                <RotateCcw size={16} aria-hidden /> {t("result.playAgain")}
              </button>
            </div>

            <div className="border-border mt-10 border-t pt-8">
              <p className="text-muted mx-auto max-w-md leading-relaxed text-pretty">
                {t("result.promo")}
              </p>
              <div className="mt-5 flex justify-center">
                <a href={`#${REALTIME_PROJECT_ID}`} className={buttonClassName("ghost")}>
                  {t("result.projectLink")} <ArrowRight size={16} aria-hidden />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  const t = useTranslations("packetRush.intro");
  const tEvents = useTranslations("packetRush.events");

  return (
    <div className="mx-auto max-w-2xl text-center">
      <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{t("title")}</h3>
      <p className="text-primary mt-2 font-medium">{t("subtitle")}</p>
      <p className="text-muted mt-3 leading-relaxed text-pretty">
        {t("instruction")}
      </p>

      <ul className="mt-8 space-y-3 text-left" aria-label={t("rulesLabel")}>
        {EVENT_TYPES.map((type) => (
          <li
            key={type}
            className="border-border bg-surface-elevated flex flex-col gap-1 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <p className="font-mono text-sm">
              <span className="text-primary">{type}</span>
              <span className="text-muted mx-2" aria-hidden="true">
                →
              </span>
              <span className="sr-only"> {t("goesTo")} </span>
              <span className="text-secondary">{ROUTES[type]}</span>
            </p>
            <p className="text-muted text-sm">{tEvents(type)}</p>
          </li>
        ))}
      </ul>

      <p className="text-muted mt-6 text-sm">
        {t("summary", {
          events: EVENTS_PER_ROUND,
          seconds: ROUND_SECONDS,
          correct: POINTS_CORRECT,
          wrong: POINTS_WRONG,
        })}
      </p>

      <div className="mt-7 flex justify-center">
        <button type="button" onClick={onStart} className={buttonClassName("primary")}>
          <Play size={16} aria-hidden /> {t("start")}
        </button>
      </div>
      <p className="text-muted mt-4 text-xs max-sm:hidden">
        {t("tip")}
      </p>
    </div>
  );
}

function DestinationButton({
  service,
  index,
  state,
  onSelect,
}: {
  service: Service;
  index: number;
  state: typeof initialState;
  onSelect: () => void;
}) {
  const t = useTranslations("packetRush.services");
  const fb = state.feedback;
  const chosen = fb?.chosen === service;
  const expectedMiss = fb?.kind === "wrong" && fb.expected === service;

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-keyshortcuts={String(index + 1)}
      className="border-border bg-surface-elevated hover:border-primary/60 hover:bg-surface relative flex min-h-24 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-4 transition-colors duration-150 motion-safe:active:scale-[0.97]"
    >
      <kbd
        className="border-border text-muted absolute top-2 left-2 hidden rounded border px-1.5 font-mono text-[10px] sm:inline-block"
        aria-hidden="true"
      >
        {index + 1}
      </kbd>
      <span className="font-mono text-sm font-medium sm:text-base">{service}</span>
      <span className="text-muted text-xs">{t(service)}</span>

      {fb && (chosen || expectedMiss) ? (
        <span
          key={fb.seq}
          aria-hidden="true"
          className={`pr-flash pointer-events-none absolute inset-0 rounded-xl border-2 ${
            chosen
              ? fb.kind === "correct"
                ? "border-primary bg-primary/10"
                : "border-danger bg-danger/10"
              : "border-secondary border-dashed"
          }`}
        >
          {chosen ? (
            fb.kind === "correct" ? (
              <Check size={14} className="text-primary absolute top-2 right-2" />
            ) : (
              <X size={14} className="text-danger absolute top-2 right-2" />
            )
          ) : null}
        </span>
      ) : null}
    </button>
  );
}
