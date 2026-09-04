# Go Forth v1 design

## Question

Can a railway planner reveal interesting one-way possibilities from a
traveler's current state instead of demanding a destination first?

## V1 boundary

V1 is a small, static Japan network explorer. It does not know actual
departures, delay information, platform assignments, ticket rules, seat
inventory, walking directions, or hotel availability. It offers ideas; the
traveler verifies the real-world journey before boarding.

## Model

Stations are annotated endpoint nodes. Services are directed pattern edges with
typical duration, approximate headway, comfort options, and confidence. The
planner adds half a headway as expected wait and penalizes transfers. It finds
low-cost routes, scores them by the selected day mode, and returns a varied set
of endpoint cards.

Modes change preference weights, not reachability rules:

- **Quiet** heavily penalizes transfers and sparse services.
- **All damn day** rail-time intent rewards comfortable, scenic railway time.
- **Drift** is an independent preference: Anywhere, Trend North, or Trend South from the current origin.
- **GranClass** rewards an optional premium segment.
- **Goblin** rewards odd, scenic, and railfan-interesting routes.

## Right-now interaction

The primary surface is a compact Today bar: current station, local time, and
the comfortable arrival boundary. The traveler selects a mood and a desired
amount of rail time rather than laboriously configuring an itinerary.

Every result supports a new origin in one action. The planner also has an
explicit stay-here result, an "I'm cooked" low-friction mode, session-only
"not today" exclusions, and a reroll. These choices express the central rule:
movement is optional, reassessment is always available, and no plan is owed
obedience.

## First runnable moment

Starting in Kanazawa at 09:00, the app returns several distinct, explainable
ideas such as a simple move to Tsuruga, a comfortable longer ride to Tokyo, and
an unusual branch that must be checked against a real timetable.
