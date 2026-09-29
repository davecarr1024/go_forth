import test from "node:test";
import assert from "node:assert/strict";
import { addDays, japanClock, journeyBudget } from "../js/time.js";

test("Japan clock uses the destination time zone across midnight", () => {
  assert.deepEqual(japanClock(new Date("2026-09-29T15:30:00Z")), { date: "2026-09-30", minutes: 30 });
});

test("arrival budget is measured from the selected departure", () => {
  assert.equal(journeyBudget(9 * 60, 21 * 60), 720);
  assert.equal(journeyBudget(20 * 60, 21 * 60), 60);
  assert.equal(journeyBudget(22 * 60, 21 * 60), 0);
});

test("stay search checkout dates cross months", () => {
  assert.equal(addDays("2026-09-30", 2), "2026-10-02");
});
