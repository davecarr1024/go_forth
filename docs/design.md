# Go Forth v1 design

## Question

Can a railway planner reveal interesting journeys, including scenic routes
and returns to the same base, without demanding a destination first?

## V1 boundary

V1 is a small, static Japan network explorer. It does not know actual
departures, delay information, platform assignments, ticket rules, seat
inventory, walking directions, or hotel availability. It offers ideas; the
traveler verifies the real-world journey before boarding.

## Model

Stations are annotated endpoint nodes. Services are directed pattern edges with
illustrative duration, approximate headway, comfort options, and confidence.
The planner adds half a headway as expected wait at boarding and line changes,
plus a connection allowance at line changes. Consecutive edges on the same
named service count as one ride. It then enforces the selected arrival and
change limits and explores simple routes that may close at the origin. Both
circuits and out-and-back rides can be
shown without repeatedly harvesting the same scenic edge. It keeps a leading
route for each endpoint and can show a distinct alternative path to a visible
endpoint. Route IDs, rather than destination IDs, drive cards, day sheets, and
session skips.

Modes change preference weights, not reachability rules:

- **Quiet** heavily penalizes transfers and sparse services.
- **All damn day** rail-time intent rewards comfortable, scenic railway time.
- **Drift** is an independent preference: Anywhere, Trend North, or Trend South from the current origin.
- **GranClass** rewards an optional premium segment.
- **Goblin** rewards odd, scenic, and railfan-interesting routes.
- **Ride the rails** rewards scenic railway time and makes a return to the
  starting base a valid day plan. The rail-time bands still express a preference;
  the arrival and change limits are hard constraints.

Selected interests receive places in the small result set when matching
destinations are reachable; other feasible ideas can still appear. The garden
atlas adds a sourced editorial layer of 23 gardens in 16 rail bases. A garden
result is a rail journey to a base city, followed by a separately described
local connection. The app shows official garden links and does not count local
transit, walking, garden hours, or museum shuttles in its rail duration.

## Right-now interaction

The primary surface is a compact Today bar: current station, editable Japan
departure time (initialized to the current Japan time), and the comfortable
arrival boundary. The travel budget is the difference between those times.
The traveler selects a mood and a desired
amount of rail time rather than laboriously configuring an itinerary.

Every one-way result supports a new origin in one action. The planner also has an
explicit stay-here result, an "I'm cooked" low-friction mode, session-only
route skips, and a reroll. These choices express the central rule:
movement is optional, reassessment is always available, and no plan is owed
obedience.

## First runnable moment

Starting in Kanazawa at 09:00, the app returns several distinct, explainable
ideas such as a simple move to Tsuruga, a comfortable longer ride to Tokyo, and
an unusual branch that must be checked against a real timetable.
