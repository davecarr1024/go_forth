import { stations, services } from "./data.js";
import { modes, featureLabels, plan } from "./planner.js";

const state = { origin: "kanazawa", mode: "normal", latestMinutes: 420, transfers: 2, features: [] };
const app = document.querySelector("#app");
const stationMap = new Map(stations.map((station) => [station.id, station]));
let visibleResults = [];
const localToday = () => { const date = new Date(); return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); };
const addDays = (value, days) => { const [year, month, day] = value.split("-").map(Number); const date = new Date(year, month - 1, day); date.setDate(date.getDate() + days); return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); };
const hotelSearch = { destinationId: null, checkIn: localToday(), nights: 1, guests: 1, attempt: 0, candidate: false };
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
function featureButtons() {
  return Object.entries(featureLabels).map(([key, label]) => '<button class="feature ' + (state.features.includes(key) ? "selected" : "") + '" data-feature="' + key + '">' + label + "</button>").join("");
}
function card(option) {
  const duration = Math.round(option.minutes);
  const route = [...new Set(option.edges.map((edge) => edge.line))].join(" · ");
  const reasonList = option.reasons.map((reason) => "<li>" + reason + "</li>").join("");
  const detail = option.edges.map((edge) => edge.line + " → " + stationMap.get(edge.to).name).join("<br>");
  const traits = option.destination.features.slice(0, 5).map((feature) => '<span>' + (featureLabels[feature] || feature) + "</span>").join("");
  const preferredActivities = option.destination.activities.filter((activity) => state.features.includes(activity.kind === "HIKING" ? "hike" : activity.kind === "CYCLING" ? "cycle" : ""));
  const activities = [...preferredActivities, ...option.destination.activities.filter((activity) => !preferredActivities.includes(activity))].slice(0, 2).map((activity) => '<li><b>' + activity.kind + " · " + activity.name + "</b><span>" + activity.detail + '</span><em>' + activity.best + " · " + activity.duration + "</em></li>").join("");
  return '<article class="card"><div class="card-top"><span class="kind">' + option.kind + '</span><span class="confidence ' + option.stats.confidence + '">' + option.stats.confidence + ' confidence</span></div><div class="card-place"><span class="place-dot"></span><h2>' + option.destination.name + '</h2><span class="arrow">↘</span></div><p class="journey">' + route + '</p><div class="duration"><strong>' + Math.floor(duration / 60) + '<small>h</small> ' + duration % 60 + '<small>m</small></strong><span>typical journey<br>including wait</span></div><ul>' + reasonList + '</ul><div class="traits">' + traits + '</div><div class="activities"><p>DO THIS THERE</p><ol>' + activities + '</ol></div><button class="day-sheet-button" data-plan="' + option.destination.id + '">Open the day <span>↗</span></button><details><summary>Route at a glance <span>+</span></summary><p>' + detail + "</p></details></article>";
}
function openPlan(destinationId) {
  const option = visibleResults.find((result) => result.destination.id === destinationId);
  if (!option) return;
  if (hotelSearch.destinationId !== destinationId) Object.assign(hotelSearch, { destinationId, checkIn: localToday(), nights: 1, guests: 1, attempt: 0, candidate: false });
  const dialog = document.querySelector("#day-plan");
  const legs = option.edges.map((edge) => '<li><p class="timeline-label">RIDE · ' + esc(edge.line) + '</p><b>To ' + esc(stationMap.get(edge.to).name) + '</b><span>' + esc(edge.rideNote) + '</span><small>WINDOW: ' + esc(edge.window) + '<br>EKIBEN: ' + esc(edge.ekiben) + '</small></li>').join("");
  const activities = option.destination.activities.map((activity) => '<li><p class="timeline-label">' + esc(activity.kind) + '</p><b>' + esc(activity.name) + '</b><span>' + esc(activity.detail) + '</span><small>BEST: ' + esc(activity.best) + ' · ' + esc(activity.duration) + ' · ' + esc(activity.effort) + '<br>FROM STATION: ' + esc(activity.fromStation) + ' · RESERVATION: ' + esc(activity.reservation) + '</small><a href="' + esc(activity.mapUrl) + '" target="_blank" rel="noreferrer">Open map search ↗</a></li>').join("");
  const stays = [...option.destination.stays].sort((a, b) => (a.kind === "WORTH THE NIGHT" ? -1 : b.kind === "WORTH THE NIGHT" ? 1 : 0));
  const activeStay = stays[Math.min(hotelSearch.attempt, stays.length - 1)];
  const checkOut = addDays(hotelSearch.checkIn, hotelSearch.nights);
  const hotelsSearch = (place) => "https://www.hotels.com/Hotel-Search?destination=" + encodeURIComponent(place + ", Japan") + "&startDate=" + hotelSearch.checkIn + "&endDate=" + checkOut + "&adults=" + hotelSearch.guests + "&rooms=1";
  const searchUrl = hotelsSearch(activeStay.area);
  const broadSearchUrl = hotelsSearch(option.destination.name);
  const nextStay = stays[hotelSearch.attempt + 1];
  const bookingState = hotelSearch.candidate ? '<p class="hotel-state found"><b>Candidate found.</b> Keep the tab open to book; this plan now remembers the area that worked.</p>' : '<p class="hotel-state">Start with the strongest fit. If it is sold out, too expensive, or just wrong, tell Go Forth and it will change strategy without losing the day.</p>';
  const alternatives = stays.map((stay, index) => '<li class="' + (index === hotelSearch.attempt ? "active" : "") + '"><button type="button" data-stay-index="' + index + '" aria-pressed="' + (index === hotelSearch.attempt) + '"><p>' + esc(stay.kind) + ' <span>' + esc(stay.price) + '</span></p><b>' + esc(stay.title) + '</b><span>' + esc(stay.detail) + '</span><small>AREA: ' + esc(stay.area) + '</small></button></li>').join("");
  const iteration = hotelSearch.candidate ? '' : '<div class="hotel-actions"><a class="hotel-search-link" href="' + searchUrl + '" target="_blank" rel="noreferrer">Search live stays ↗</a><button type="button" data-stay-success>I found a candidate</button>' + (nextStay ? '<button type="button" class="try-next" data-stay-failed>No fit — try ' + esc(nextStay.kind.toLowerCase()) + ' →</button>' : '<a class="try-next" href="' + broadSearchUrl + '" target="_blank" rel="noreferrer">None fit — widen to ' + esc(option.destination.name) + ' ↗</a>') + '</div>';
  dialog.innerHTML = '<form method="dialog"><button class="dialog-close" aria-label="Close day plan">×</button></form><p class="eyebrow">THE SHAPE OF THE DAY</p><h2>' + esc(option.destination.name) + '</h2><p class="dialog-lede">A loose visual plan for a ' + Math.floor(option.minutes / 60) + 'h ' + Math.round(option.minutes % 60) + 'm rail day. Keep what sparks; ignore the rest.</p><ol class="plan-timeline">' + legs + '<li class="arrival"><p class="timeline-label">ARRIVE · MAKE A DAY OF IT</p></li>' + activities + '</ol><section class="stay-section"><p class="eyebrow">FIND A STAY</p><p class="stay-intro">Pick any area card to make it active. Go Forth then hands the exact dates and party size to Hotels.com.</p><div class="stay-search-fields"><label>Check in<input id="hotel-checkin" type="date" value="' + esc(hotelSearch.checkIn) + '"></label><label>Nights<input id="hotel-nights" type="number" min="1" max="14" value="' + hotelSearch.nights + '"></label><label>Guests<input id="hotel-guests" type="number" min="1" max="6" value="' + hotelSearch.guests + '"></label><button type="button" data-search-stays>Update search</button></div>' + bookingState + '<ol class="stay-options">' + alternatives + '</ol>' + iteration + '</section><p class="source-note">Stay ideas are curated starter data, not availability or booking advice. Hotels.com receives the selected place, dates, and party size; verify price, cancellation, access, and the final booking directly.</p>';
  if (!dialog.open) dialog.showModal();
}
function render() {
  const results = plan({ stations, services, origin: state.origin, latestMinutes: state.latestMinutes, maxTransfers: state.transfers, mode: state.mode, desiredFeatures: state.features });
  visibleResults = results;
  const originOptions = stations.filter((station) => station.endpoint).map((station) => '<option value="' + station.id + '"' + (station.id === state.origin ? " selected" : "") + ">" + station.name + "</option>").join("");
  app.innerHTML = '<main><header class="masthead"><a class="wordmark" href="#" aria-label="Go Forth home">GO <span>FORTH</span></a><p>JAPAN RAILWAY POSSIBILITY ENGINE <i></i> v0.1</p><button class="about" data-about aria-label="About this prototype">?</button></header><section class="hero"><div class="hero-copy"><p class="eyebrow">STARTING FROM</p><div class="location-row"><span class="pin">✦</span><select id="origin" aria-label="Starting station">' + originOptions + '</select></div><h1>Where could today <em>take you?</em></h1><p class="lede">Choose the feeling. We’ll trace a few good ways forward.</p></div><div class="map-wrap"><div class="map-glow"></div><svg class="network" viewBox="0 0 100 100" role="img" aria-label="Illustrative network diagram">' + mapLines() + mapStations() + '</svg><p class="map-key"><span></span> hand-drawn starter network</p></div></section><section class="controls" aria-label="Adventure preferences"><div class="mode-scroller">' + modeButtons() + '</div><div class="limits"><label><span>Home by</span><output id="time-output">' + time(540 + state.latestMinutes) + '</output><input id="time" type="range" min="360" max="780" step="30" value="' + (540 + state.latestMinutes) + '" aria-label="Latest arrival time"></label><label><span>Changes</span><output id="transfer-output">' + (state.transfers === 0 ? "Direct only" : state.transfers + " or fewer") + '</output><input id="transfers" type="range" min="0" max="3" step="1" value="' + state.transfers + '" aria-label="Maximum changes"></label></div></section><section class="results" aria-live="polite"><div class="section-head"><p class="eyebrow">YOUR POSSIBILITIES</p><p class="muted">' + modes[state.mode].label + " · leave now · approximately " + time(540 + state.latestMinutes) + '</p></div><div class="cards">' + (results.length ? results.map(card).join("") : '<div class="empty"><b>Nothing feels comfortably possible yet.</b><p>Try adding time or allowing one more change.</p></div>') + '</div></section><aside class="notice" id="notice"><b>NOT A TIMETABLE.</b> This is an illustrative planning prototype using approximate, hand-authored service patterns. Check current official railway information before boarding.</aside></main>';
  document.querySelector(".mode-scroller").insertAdjacentHTML("afterend", '<div class="feature-area"><p>WHAT SOUNDS GOOD?</p><div class="feature-strip">' + featureButtons() + "</div></div>");
  app.insertAdjacentHTML("beforeend", '<dialog id="day-plan"></dialog>');
  bind();
}
function bind() {
  document.querySelector("#origin").addEventListener("change", (event) => { state.origin = event.target.value; render(); });
  document.querySelectorAll("[data-mode]").forEach((button) => button.addEventListener("click", () => { state.mode = button.dataset.mode; render(); }));
  document.querySelectorAll("[data-feature]").forEach((button) => button.addEventListener("click", () => { const feature = button.dataset.feature; state.features = state.features.includes(feature) ? state.features.filter((item) => item !== feature) : [...state.features, feature]; render(); }));
  document.querySelector("#time").addEventListener("input", (event) => { state.latestMinutes = Number(event.target.value) - 540; render(); });
  document.querySelector("#transfers").addEventListener("input", (event) => { state.transfers = Number(event.target.value); render(); });
  document.querySelector("[data-about]").addEventListener("click", () => document.querySelector("#notice").classList.toggle("open"));
  document.querySelectorAll("[data-plan]").forEach((button) => button.addEventListener("click", () => openPlan(button.dataset.plan)));
  document.querySelector("#day-plan").addEventListener("click", (event) => { if (event.target === event.currentTarget) event.currentTarget.close(); });
  document.querySelector("#day-plan").addEventListener("click", (event) => {
    const dialog = event.currentTarget;
    const stayButton = event.target.closest("[data-stay-index]");
    if (event.target.matches("[data-search-stays]")) { hotelSearch.checkIn = dialog.querySelector("#hotel-checkin").value || localToday(); hotelSearch.nights = Number(dialog.querySelector("#hotel-nights").value) || 1; hotelSearch.guests = Number(dialog.querySelector("#hotel-guests").value) || 1; openPlan(hotelSearch.destinationId); }
    if (stayButton) { hotelSearch.attempt = Number(stayButton.dataset.stayIndex); hotelSearch.candidate = false; openPlan(hotelSearch.destinationId); }
    if (event.target.matches("[data-stay-failed]")) { hotelSearch.attempt += 1; hotelSearch.candidate = false; openPlan(hotelSearch.destinationId); }
    if (event.target.matches("[data-stay-success]")) { hotelSearch.candidate = true; openPlan(hotelSearch.destinationId); }
  });
}
render();
