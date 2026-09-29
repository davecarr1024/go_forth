import test from "node:test";
import assert from "node:assert/strict";
import { stations } from "../js/data.js";
import { orderedActivities } from "../js/activities.js";

test("garden preference brings sourced gardens onto a destination card", () => {
  const tokyo = stations.find((station) => station.id === "tokyo");
  const topTwo = orderedActivities(tokyo.activities, ["garden"]).slice(0, 2);
  assert.deepEqual(topTwo.map((activity) => activity.name), ["Rikugien", "Koishikawa Korakuen"]);
  assert.ok(topTwo.every((activity) => activity.sourceUrl && activity.fromStation));
});

test("other interests and default activities keep their own order", () => {
  const tokyo = stations.find((station) => station.id === "tokyo");
  assert.equal(orderedActivities(tokyo.activities, [])[0].name, "Akihabara");
  assert.equal(orderedActivities(tokyo.activities, ["cycle"])[0].kind, "CYCLING");
});
