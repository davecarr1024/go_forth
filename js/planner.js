export const modes = {
  normal: { label: "Open day", icon: "✦", copy: "A little comfort, a little surprise.", transfer: 20, train: 1, scenic: 2, green: 7, gran: 4, south: 2, odd: 1 },
  quiet: { label: "Easy day", icon: "◌", copy: "Fewer changes. Easy landing.", transfer: 70, train: 0.25, scenic: 1, green: 10, gran: 6, south: 1, odd: -4 },
  train: { label: "Train day", icon: "↝", copy: "Let the railway be the activity.", transfer: 25, train: 1.8, scenic: 7, green: 11, gran: 10, south: 1, odd: 3 },
  progress: { label: "Go south", icon: "↓", copy: "Change tomorrow's starting point.", transfer: 25, train: 0.6, scenic: 2, green: 5, gran: 3, south: 11, odd: 1 },
  gran: { label: "GranClass", icon: "◇", copy: "A small splurge, if it fits.", transfer: 30, train: 0.8, scenic: 4, green: 9, gran: 32, south: 2, odd: 1 },
  goblin: { label: "Goblin mode", icon: "⌁", copy: "Plausible, unusual, yours.", transfer: 28, train: 1, scenic: 8, green: 2, gran: 1, south: 2, odd: 10 }
};

export function plan({ stations, services, origin, latestMinutes, maxTransfers, mode = "normal" }) {
  const stationMap = new Map(stations.map((station) => [station.id, station]));
  const weights = modes[mode];
  const routes = new Map([[origin, { minutes: 0, edges: [], transfers: 0 }]]);
  const queue = [origin];
  while (queue.length) {
    const from = queue.shift();
    const current = routes.get(from);
    for (const edge of services.filter((candidate) => candidate.from === from)) {
      const next = { minutes: current.minutes + edge.minutes + edge.headway / 2 + (current.edges.length ? 12 : 0), edges: [...current.edges, edge], transfers: current.edges.length ? current.transfers + 1 : 0 };
      if (next.minutes > latestMinutes || next.transfers > maxTransfers) continue;
      if (!routes.has(edge.to) || next.minutes < routes.get(edge.to).minutes) { routes.set(edge.to, next); queue.push(edge.to); }
    }
  }
  const options = [];
  for (const [id, route] of routes) {
    const destination = stationMap.get(id);
    if (id === origin || !destination?.endpoint) continue;
    const stats = route.edges.reduce((s, e) => ({ scenic: s.scenic + (e.scenic || 0), railfan: s.railfan + (e.railfan || 0), green: s.green || e.green, gran: s.gran || e.gran, confidence: s.confidence === "medium" || e.confidence === "medium" ? "medium" : "high" }), { scenic: 0, railfan: 0, green: false, gran: false, confidence: "high" });
    const score = (destination.hotel + destination.food + destination.interest) * 2 + destination.south * weights.south + stats.scenic * weights.scenic + stats.railfan * weights.odd + Number(stats.green) * weights.green + Number(stats.gran) * weights.gran + route.edges.reduce((sum, e) => sum + e.minutes, 0) * weights.train - route.minutes * .25 - route.transfers * weights.transfer - (stats.confidence === "medium" ? 18 : 0);
    options.push({ ...route, destination, stats, score });
  }
  const used = new Set();
  return options.sort((a, b) => b.score - a.score).filter((option) => {
    const key = String(option.stats.gran) + String(option.stats.scenic > 10) + String(option.destination.south > 7);
    if (used.has(key) && used.size > 3) return false;
    used.add(key); return true;
  }).slice(0, 4).map((option, index) => ({ ...option, kind: ["Easy", "Comfortable", "Interesting", "Go farther"][index], reasons: reasons(option, weights) }));
}

function reasons(option, weights) {
  const reasons = [];
  if (option.stats.gran && weights.gran > 15) reasons.push("GranClass is on the way");
  else if (option.stats.green) reasons.push("Green Car is available");
  if (option.stats.scenic >= 10) reasons.push("scenic railway time");
  if (option.destination.south > 6 && weights.south > 5) reasons.push("a meaningful southward move");
  if (option.transfers === 0) reasons.push("no changes");
  if (option.stats.railfan) reasons.push("a little railway weirdness");
  reasons.push("easy place to wake up tomorrow");
  return reasons.slice(0, 3);
}
