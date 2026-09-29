export const modes = {
  normal: { label: "Open day", icon: "✦", copy: "A little comfort, a little surprise.", transfer: 20, train: 1, scenic: 2, green: 7, gran: 4, odd: 1 },
  quiet: { label: "Easy day", icon: "◌", copy: "Fewer changes. Easy landing.", transfer: 70, train: 0.25, scenic: 1, green: 10, gran: 6, odd: -4 },
  gran: { label: "GranClass", icon: "◇", copy: "A small splurge, if it fits.", transfer: 30, train: 0.8, scenic: 4, green: 9, gran: 32, odd: 1 },
  goblin: { label: "Goblin mode", icon: "⌁", copy: "Plausible, unusual, yours.", transfer: 28, train: 1, scenic: 8, green: 2, gran: 1, odd: 10 },
  rail: { label: "Ride the rails", icon: "↝", copy: "The journey can be the day.", transfer: 22, train: 1.1, scenic: 11, green: 5, gran: 3, odd: 7 },
  cooked: { label: "I'm cooked", icon: "☾", copy: "Low effort. Good bed. Food nearby.", transfer: 110, train: 0.05, scenic: 0, green: 13, gran: 3, odd: -8 }
};

export const directions = {
  any: { label: "Anywhere", icon: "↔" },
  north: { label: "Trend north", icon: "↑" },
  south: { label: "Trend south", icon: "↓" }
};

export const featureLabels = {
  scenic: "Scenic", arcade: "Arcades", "easy-food": "Easy food", baseball: "Baseball",
  garden: "Gardens", onsen: "Onsen", railfan: "Railway oddity", goblin: "Goblin energy",
  "easy-overnight": "Easy overnight", sea: "By the water", castle: "Castle", coffee: "Coffee",
  hike: "Hiking", cycle: "Cycling"
};

export const timeBands = {
  flexible: { label: "Any amount", min: 0, max: Infinity },
  nearby: { label: "Nearby", min: 0, max: 90 },
  few: { label: "A few hours", min: 120, max: 270 },
  day: { label: "Most of the day", min: 300, max: 510 },
  all: { label: "All damn day", min: 420, max: Infinity }
};

export function plan({ stations, services, origin, latestMinutes, maxTransfers, mode = "normal", direction = "any", desiredFeatures = [], timeBand = "flexible", includeOrigin = false, excluded = [] }) {
  const stationMap = new Map(stations.map((station) => [station.id, station]));
  const originStation = stationMap.get(origin);
  const weights = modes[mode];
  const directionWeight = direction === "north" ? 11 : direction === "south" ? 11 : 0;
  const outgoing = new Map(stations.map((station) => [station.id, []]));
  for (const edge of services) outgoing.get(edge.from)?.push(edge);
  const options = [];
  const band = timeBands[timeBand] || timeBands.flexible;
  // Simple paths can close at their origin. This admits true circuits and
  // out-and-back rides without allowing repeated-edge scenic-score farming.
  const queue = [{ id: origin, minutes: 0, edges: [], transfers: 0, visited: new Set([origin]) }];
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    if (current.edges.length >= 6) continue;
    for (const edge of outgoing.get(current.id) || []) {
      const loop = edge.to === origin && current.edges.length > 0;
      if (current.visited.has(edge.to) && !loop) continue;
      const previous = current.edges.at(-1);
      const change = previous && !(previous.line && previous.line === edge.line);
      const route = { minutes: current.minutes + edge.minutes + (change || !previous ? edge.headway / 2 : 0) + (change ? 12 : 0), edges: [...current.edges, edge], transfers: current.transfers + Number(Boolean(change)) };
      if (route.minutes > latestMinutes || route.transfers > maxTransfers) continue;
      if (!loop) queue.push({ ...route, id: edge.to, visited: new Set([...current.visited, edge.to]) });
      const id = edge.to;
      const destination = stationMap.get(id);
      const routeId = route.edges.map((leg) => `${leg.from}>${leg.to}:${leg.line || "rail"}`).join("|");
      if (!destination?.endpoint || excluded.includes(id) || excluded.includes(routeId)) continue;
      // A through service split into multiple station edges should not earn
      // its scenic reward repeatedly just because it has intermediate stops.
      const stats = route.edges.reduce((s, e) => {
        const continuation = Boolean(e.line && e.line === s.lastLine);
        const scenic = e.scenic || 0; const railfan = e.railfan || 0;
        return { scenic: s.scenic + (continuation ? Math.max(0, scenic - s.lastScenic) : scenic), railfan: s.railfan + (continuation ? Math.max(0, railfan - s.lastRailfan) : railfan), lastLine: e.line, lastScenic: continuation ? Math.max(s.lastScenic, scenic) : scenic, lastRailfan: continuation ? Math.max(s.lastRailfan, railfan) : railfan, green: Boolean(s.green || e.green), gran: Boolean(s.gran || e.gran), confidence: s.confidence === "medium" || e.confidence === "medium" ? "medium" : "high" };
      }, { scenic: 0, railfan: 0, lastLine: null, lastScenic: 0, lastRailfan: 0, green: false, gran: false, confidence: "high" });
      const matches = destination.features.filter((feature) => desiredFeatures.includes(feature));
      const railMinutes = route.edges.reduce((sum, e) => sum + e.minutes, 0);
      const inBand = railMinutes >= band.min && railMinutes <= band.max;
      const southward = destination.south - originStation.south;
      const northward = originStation.south - destination.south;
      const allDayRailBonus = timeBand === "all" ? railMinutes * .75 + stats.scenic * 5 + Number(stats.green) * 8 : 0;
      const directionalBonus = direction === "north" ? northward * directionWeight : direction === "south" ? southward * directionWeight : 0;
      const score = (loop ? 0 : (destination.hotel + destination.food + destination.interest) * 2) + directionalBonus + stats.scenic * weights.scenic + stats.railfan * weights.odd + Number(stats.green) * weights.green + Number(stats.gran) * weights.gran + matches.length * (loop ? 0 : 28) + railMinutes * weights.train - route.minutes * .25 - route.transfers * weights.transfer - (stats.confidence === "medium" ? 18 : 0) + (inBand ? 32 : timeBand === "flexible" ? 0 : -16) + allDayRailBonus + (loop && mode === "rail" ? 45 : 0);
      options.push({ ...route, id: routeId, destination, stats, matches: loop ? [] : matches, southward, northward, score, loop, railMinutes });
    }
  }
  if (includeOrigin && !excluded.includes(origin)) {
    const destination = stationMap.get(origin);
    const matches = destination.features.filter((feature) => desiredFeatures.includes(feature));
    const score = (destination.hotel + destination.food + destination.interest) * 2 + matches.length * 38 + (mode === "quiet" || mode === "cooked" ? 45 : 0);
    options.push({ id: "stay", minutes: 0, edges: [], transfers: 0, destination, stats: { scenic: 0, railfan: 0, green: false, gran: false, confidence: "high" }, matches, score, stay: true });
  }
  const stays = options.filter((option) => option.stay);
  const sorted = options.filter((option) => !option.stay && (!option.loop || mode === "rail" || timeBand === "all" || timeBand === "day")).sort((a, b) => b.score - a.score);
  const byDestination = new Map();
  for (const option of sorted) {
    const key = option.loop ? "loop" : option.destination.id;
    const routes = byDestination.get(key) || [];
    const signature = (route) => route.edges.map((leg) => leg.line || `${leg.from}>${leg.to}`).filter((line, index, lines) => index === 0 || line !== lines[index - 1]).join("|");
    if (!routes.some((other) => signature(other) === signature(option))) routes.push(option);
    byDestination.set(key, routes);
  }
  const primary = [...byDestination.values()].map((routes) => routes[0]).sort((a, b) => b.score - a.score);
  const matches = primary.filter((option) => option.matches.length);
  const nearbyMatches = [...matches].sort((a, b) => {
    const distance = (option) => (option.destination.x - originStation.x) ** 2 + (option.destination.y - originStation.y) ** 2;
    return distance(a) - distance(b) || a.minutes - b.minutes;
  }).slice(0, 3);
  const preferred = desiredFeatures.length ? [...new Set([matches[0], ...nearbyMatches].filter(Boolean))] : [];
  const loop = mode === "rail" || timeBand === "all" ? byDestination.get("loop")?.[0] : null;
  const picked = [...new Set([...(loop ? [loop] : []), ...preferred, ...primary])].slice(0, Math.max(0, 5 - stays.length));
  // Reserve one visible card for a genuinely different path to a shown place.
  const alternate = picked.filter((option) => !option.loop).map((option) => (byDestination.get(option.destination.id) || [])[1]).find((option) => option && !picked.includes(option));
  if (alternate) picked.push(alternate);
  return [...stays, ...picked].slice(0, 6).map((option, index) => ({
    ...option,
    kind: option.stay ? "Stay here" : option.loop ? "Round-trip ride" : option === alternate ? "Another way there" : desiredFeatures.includes("garden") && option.matches.includes("garden") ? "Garden idea" : ["Easy", "Best fit", "Go farther", "Wildcard", "Rail day"][index % 5],
    reasons: reasons(option, weights, direction)
  }));
}

function reasons(option, weights, direction) {
  if (option.stay) return [...option.matches.map((feature) => featureLabels[feature]), "You do not need to move today", "Keep the good hotel and decide later"].slice(0, 3);
  const reasons = [];
  if (option.loop) reasons.push("back where you started");
  if (option.stats.gran && weights.gran > 15) reasons.push("GranClass is on the way");
  else if (option.stats.green) reasons.push("Green Car is available");
  if (option.stats.scenic >= 10) reasons.push("scenic railway time");
  if (option.southward > 2 && direction === "south") reasons.push("a meaningful southward move");
  if (option.northward > 2 && direction === "north") reasons.push("a meaningful northward move");
  if (option.transfers === 0) reasons.push("no changes");
  if (option.stats.railfan) reasons.push("a little railway weirdness");
  reasons.push("easy place to wake up tomorrow");
  return [...option.matches.map((feature) => featureLabels[feature]), ...reasons].slice(0, 3);
}
