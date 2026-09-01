import test from "node:test";
import assert from "node:assert/strict";
import { stations, services } from "../js/data.js";
import { plan } from "../js/planner.js";

test("Kanazawa has multiple reachable adventures", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "normal" });
  assert.ok(results.length >= 3);
  assert.equal(results[0].destination.id !== "kanazawa", true);
  assert.ok(results.every((result) => result.minutes <= 420));
});

test("direct-only setting prevents transfer routes", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 500, maxTransfers: 0, mode: "normal" });
  assert.ok(results.every((result) => result.transfers === 0));
});

test("GranClass preference finds the Tokyo opportunity", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "gran" });
  assert.ok(results.some((result) => result.destination.id === "tokyo" && result.stats.gran));
});
