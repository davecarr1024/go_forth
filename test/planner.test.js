import test from "node:test";
import assert from "node:assert/strict";
import { stations, services } from "../js/data.js";
import { gardenCatalog } from "../js/gardens.js";
import { directions, modes, plan, timeBands } from "../js/planner.js";

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
  assert.ok(stations.find((station) => station.id === "kanazawa").activities.some((activity) => activity.name === "Kenroku-en"));
});

test("active-travel activities are available as destination traits", () => {
  const onomichi = stations.find((station) => station.id === "onomichi");
  assert.ok(onomichi.features.includes("cycle"));
  assert.ok(onomichi.activities.some((activity) => activity.name === "Shimanami Kaido"));
});

test("activities and rail legs carry usable planning metadata", () => {
  const garden = stations.find((station) => station.id === "kanazawa").activities.find((activity) => activity.name === "Kenroku-en");
  assert.equal(garden.best, "daylight");
  assert.match(garden.mapUrl, /google\.com\/maps/);
  assert.ok(services.every((service) => service.rideNote && service.window && service.ekiben));
});

test("every destination has categorized, sourceable stay ideas", () => {
  assert.ok(stations.every((station) => station.stays?.length === 3));
  assert.ok(stations.every((station) => station.stays.every((stay) => stay.kind && stay.title && stay.area && stay.mapUrl)));
  assert.equal(stations.find((station) => station.id === "kanazawa").stays[1].kind, "WORTH THE NIGHT");
});

test("map searches carry the destination city for disambiguation", () => {
  const kanazawa = stations.find((station) => station.id === "kanazawa");
  assert.match(decodeURIComponent(kanazawa.activities.find((activity) => activity.name === "Kenroku-en").mapUrl), /Kenroku-en Kanazawa Japan/);
  assert.match(decodeURIComponent(kanazawa.stays[0].mapUrl), /Kanazawa Station Kanazawa Japan/);
});

test("planner can recommend staying put and honor time bands", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "quiet", desiredFeatures: ["garden"], includeOrigin: true, timeBand: "nearby" });
  assert.ok(results.some((result) => result.stay && result.destination.id === "kanazawa"));
  assert.equal(timeBands.nearby.max, 90);
});

test("excluded places do not return in a reroll", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "normal", excluded: ["toyama"] });
  assert.ok(results.every((result) => result.destination.id !== "toyama"));
});

test("all-day rail intent favors a long railway day without a duplicate mode", () => {
  assert.equal(Object.hasOwn(modes, "train"), false);
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 500, maxTransfers: 2, mode: "normal", timeBand: "all" });
  assert.ok(results.some((result) => result.edges.reduce((minutes, edge) => minutes + edge.minutes, 0) >= 300));
});

test("direction can trend north independently of the day mode", () => {
  assert.equal(Object.hasOwn(modes, "north"), false);
  assert.equal(directions.north.label, "Trend north");
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "goblin", direction: "north" });
  assert.ok(results.some((result) => result.northward > 0));
  assert.ok(results.some((result) => result.reasons.includes("a meaningful northward move")));
});

test("direction can trend south independently of the day mode", () => {
  const results = plan({ stations, services, origin: "kanazawa", latestMinutes: 420, maxTransfers: 2, mode: "quiet", direction: "south" });
  assert.ok(results.some((result) => result.southward > 0));
  assert.ok(results.some((result) => result.reasons.includes("a meaningful southward move")));
});

test("a faster path cannot consume the transfer needed for a reachable endpoint", () => {
  const points = ["a", "b", "c", "d"].map((id) => ({ id, endpoint: id === "d", features: [], south: 0, hotel: 5, food: 5, interest: 5 }));
  const legs = [
    { from: "a", to: "c", minutes: 5, headway: 0 },
    { from: "c", to: "b", minutes: 5, headway: 0 },
    { from: "a", to: "b", minutes: 30, headway: 0 },
    { from: "b", to: "d", minutes: 10, headway: 0 }
  ];
  const results = plan({ stations: points, services: legs, origin: "a", latestMinutes: 55, maxTransfers: 1 });
  assert.equal(results[0].destination.id, "d");
  assert.deepEqual(results[0].edges.map((edge) => edge.to), ["b", "d"]);
});

test("a preference can select a scenic path over a faster path to the same endpoint", () => {
  const points = ["a", "b", "d"].map((id) => ({ id, endpoint: id === "d", features: [], south: 0, hotel: 5, food: 5, interest: 5 }));
  const legs = [
    { from: "a", to: "d", minutes: 20, headway: 0 },
    { from: "a", to: "b", minutes: 10, headway: 0, scenic: 15 },
    { from: "b", to: "d", minutes: 10, headway: 0, scenic: 15 }
  ];
  const results = plan({ stations: points, services: legs, origin: "a", latestMinutes: 40, maxTransfers: 1, mode: "goblin" });
  assert.deepEqual(results[0].edges.map((edge) => edge.to), ["b", "d"]);
  assert.equal(results[0].stats.scenic, 30);
});

test("garden atlas covers the requested gardens with sourced local access", () => {
  const gardens = stations.flatMap((station) => station.activities.filter((activity) => activity.kind === "GARDEN").map((activity) => ({ ...activity, city: station.name })));
  const names = gardens.map((garden) => garden.name);
  assert.ok(Object.keys(gardenCatalog).every((id) => stations.some((station) => station.id === id)));
  for (const name of ["Sankeien", "Rikugien", "Adachi Museum of Art gardens", "Kenroku-en", "Okayama Korakuen", "Kairakuen"]) {
    assert.ok(names.includes(name), `${name} is in the atlas`);
  }
  assert.equal(gardens.length, 23);
  assert.equal(new Set(names).size, gardens.length);
  assert.ok(gardens.every((garden) => garden.sourceUrl.startsWith("https://") && garden.fromStation && garden.mapUrl.includes(encodeURIComponent(garden.city))));
  assert.ok(stations.every((station) => station.features.includes("garden") === station.activities.some((activity) => activity.kind === "GARDEN")));
});

test("new garden bases and Kamakura are connected to the rail graph", () => {
  assert.ok(stations.every((station) => services.some((service) => service.from === station.id)));
  for (const id of ["mito", "yokohama", "yasugi", "kamakura"]) {
    assert.ok(services.some((service) => service.from === id), `${id} has an onward rail edge`);
    assert.ok(services.some((service) => service.to === id), `${id} has an inbound rail edge`);
  }
  const tokyoGardenIdeas = plan({ stations, services, origin: "tokyo", latestMinutes: 240, maxTransfers: 1, desiredFeatures: ["garden"] });
  assert.ok(tokyoGardenIdeas.some((idea) => idea.destination.id === "mito"));
  assert.ok(tokyoGardenIdeas.some((idea) => idea.destination.id === "yokohama"));
  assert.ok(tokyoGardenIdeas.filter((idea) => idea.matches.includes("garden")).length >= 3);
  const okayamaGardenIdeas = plan({ stations, services, origin: "okayama", latestMinutes: 240, maxTransfers: 1, desiredFeatures: ["garden"] });
  assert.ok(okayamaGardenIdeas.some((idea) => idea.destination.id === "yasugi"));
});
