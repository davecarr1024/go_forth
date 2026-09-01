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

test("GranClass preference keeps a premium-car opportunity visible", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "gran" });
  assert.ok(results.some((result) => result.stats.gran));
});

test("starter network has broad destination coverage and feature-led results", () => {
  assert.ok(stations.length >= 30);
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "normal", desiredFeatures: ["baseball"] });
  assert.ok(results.some((result) => result.reasons.includes("Baseball")));
});

test("every destination has concrete starter activities", () => {
  assert.ok(stations.every((station) => station.activities?.length >= 2));
  assert.equal(stations.find((station) => station.id === "kanazawa").activities[0].name, "Kenroku-en");
});

test("active-travel activities are available as destination traits", () => {
  const onomichi = stations.find((station) => station.id === "onomichi");
  assert.ok(onomichi.features.includes("cycle"));
  assert.ok(onomichi.activities.some((activity) => activity.name === "Shimanami Kaido"));
});
