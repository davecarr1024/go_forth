import { stations, services } from "./data.js";
import { modes, plan } from "./planner.js";

const state = { origin: "kanazawa", mode: "normal", latestMinutes: 420, transfers: 2 };
const app = document.querySelector("#app");
const stationMap = new Map(stations.map((station) => [station.id, station]));
const time = (minutes) => String(Math.floor(minutes / 60)).padStart(2, "0") + ":" + String(minutes % 60).padStart(2, "0");
const esc = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;");

function mapLines() {
  return services.filter((edge) => edge.from < edge.to).map((edge) => {
    const from = stationMap.get(edge.from); const to = stationMap.get(edge.to);
    return '<line x1="' + from.x + '" y1="' + from.y + '" x2="' + to.x + '" y2="' + to.y + '" class="rail ' + (edge.line.includes("Shinkansen") ? "shinkansen" : "") + '"/>';
  }).join("");
}
function mapStations() {
  return stations.map((station) => '<g class="station ' + (station.id === state.origin ? "is-origin" : "") + '"><circle cx="' + station.x + '" cy="' + station.y + '" r="' + (station.id === state.origin ? "2.6" : "1.2") + '"/><text x="' + (station.x + 2) + '" y="' + (station.y - 1.8) + '">' + esc(station.name) + "</text></g>").join("");
}
function modeButtons() {
  return Object.entries(modes).map(([key, mode]) => '<button class="mode ' + (state.mode === key ? "selected" : "") + '" data-mode="' + key + '"><b>' + mode.icon + "</b><span>" + mode.label + "</span><small>" + mode.copy + "</small></button>").join("");
}
function card(option) {
  const duration = Math.round(option.minutes);
  const route = [...new Set(option.edges.map((edge) => edge.line))].join(" · ");
  const reasonList = option.reasons.map((reason) => "<li>" + reason + "</li>").join("");
  const detail = option.edges.map((edge) => edge.line + " → " + stationMap.get(edge.to).name).join("<br>");
  return '<article class="card"><div class="card-top"><span class="kind">' + option.kind + '</span><span class="confidence ' + option.stats.confidence + '">' + option.stats.confidence + ' confidence</span></div><div class="card-place"><span class="place-dot"></span><h2>' + option.destination.name + '</h2><span class="arrow">↘</span></div><p class="journey">' + route + '</p><div class="duration"><strong>' + Math.floor(duration / 60) + '<small>h</small> ' + duration % 60 + '<small>m</small></strong><span>typical journey<br>including wait</span></div><ul>' + reasonList + '</ul><details><summary>See the shape of the day <span>+</span></summary><p>' + detail + "</p></details></article>";
}
function render() {
  const results = plan({ stations, services, origin: state.origin, latestMinutes: state.latestMinutes, maxTransfers: state.transfers, mode: state.mode });
  const originOptions = stations.filter((station) => station.endpoint).map((station) => '<option value="' + station.id + '"' + (station.id === state.origin ? " selected" : "") + ">" + station.name + "</option>").join("");
  app.innerHTML = '<main><header class="masthead"><a class="wordmark" href="#" aria-label="Go Forth home">GO <span>FORTH</span></a><p>JAPAN RAILWAY POSSIBILITY ENGINE <i></i> v0.1</p><button class="about" data-about aria-label="About this prototype">?</button></header><section class="hero"><div class="hero-copy"><p class="eyebrow">STARTING FROM</p><div class="location-row"><span class="pin">✦</span><select id="origin" aria-label="Starting station">' + originOptions + '</select></div><h1>Where could today <em>take you?</em></h1><p class="lede">Choose the feeling. We’ll trace a few good ways forward.</p></div><div class="map-wrap"><div class="map-glow"></div><svg class="network" viewBox="0 0 100 100" role="img" aria-label="Illustrative network diagram">' + mapLines() + mapStations() + '</svg><p class="map-key"><span></span> hand-drawn starter network</p></div></section><section class="controls" aria-label="Adventure preferences"><div class="mode-scroller">' + modeButtons() + '</div><div class="limits"><label><span>Home by</span><output id="time-output">' + time(540 + state.latestMinutes) + '</output><input id="time" type="range" min="360" max="780" step="30" value="' + (540 + state.latestMinutes) + '" aria-label="Latest arrival time"></label><label><span>Changes</span><output id="transfer-output">' + (state.transfers === 0 ? "Direct only" : state.transfers + " or fewer") + '</output><input id="transfers" type="range" min="0" max="3" step="1" value="' + state.transfers + '" aria-label="Maximum changes"></label></div></section><section class="results" aria-live="polite"><div class="section-head"><p class="eyebrow">YOUR POSSIBILITIES</p><p class="muted">' + modes[state.mode].label + " · leave now · approximately " + time(540 + state.latestMinutes) + '</p></div><div class="cards">' + (results.length ? results.map(card).join("") : '<div class="empty"><b>Nothing feels comfortably possible yet.</b><p>Try adding time or allowing one more change.</p></div>') + '</div></section><aside class="notice" id="notice"><b>NOT A TIMETABLE.</b> This is an illustrative planning prototype using approximate, hand-authored service patterns. Check current official railway information before boarding.</aside></main>';
  bind();
}
function bind() {
  document.querySelector("#origin").addEventListener("change", (event) => { state.origin = event.target.value; render(); });
  document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { state.mode = button.dataset.mode; render(); }));
  document.querySelector("#time").addEventListener("input", (event) => { state.latestMinutes = Number(event.target.value) - 540; render(); });
  document.querySelector("#transfers").addEventListener("input", (event) => { state.transfers = Number(event.target.value); render(); });
  document.querySelector("[data-about]").addEventListener("click", () => document.querySelector("#notice").classList.toggle("open"));
}
render();
