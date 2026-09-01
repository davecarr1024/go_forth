# Starter data

The v1 dataset is a hand-authored, illustrative service-pattern model created
for interface and routing development. It contains approximate durations,
frequencies, and annotations inspired by public knowledge of the Japanese rail
network, but it is **not sourced or validated for operational use**.

It intentionally avoids copying a live timetable. Before any wider or
production-quality dataset is added, imports must record their source,
licensing terms, transformation, release date, and validation results.

## Destination traits

Each endpoint has subjective, composable traits that describe why it may make
a good unplanned overnight: scenery, arcades, easy food, baseball, gardens,
onsen, railway oddity, goblin energy, easy overnight, water, castles, coffee,
and a wider internal vocabulary such as ramen, udon, sea, temples, trams,
volcanoes, and ferries. These values are editorial prompts for discovery, not
claims about opening hours, current events, or availability.

## Activity cards

Every endpoint now has two named starter activities. An activity records a
category, a durable landmark, food, event type, or local experience, and a
short explanation of why it makes the endpoint worth choosing. These are
curated planning prompts—not listings, booking integrations, or claims that a
venue is open on a particular day.

Hiking and cycling are both destination traits and activity categories. Their
activity cards name a starter trail, hill walk, waterfront loop, or regional
cycle continuation; they are not route-safety, weather, equipment, or trail
condition advice.

## Practical activity context

Each starter activity also has deliberately coarse planning metadata: a best
time of day, rough duration, effort, likely station friction, and whether a
reservation is worth checking. It includes a Google Maps search URL, a source
marker of "curated starter data", and a review month. This makes the interface
inspectable without pretending it has live venue, accessibility, trail, event,
or opening-hour information. Travelers must verify those details directly.

## Rail-day cues

Each service pattern includes a short editorial ride note, a window-seat cue,
and an ekiben suggestion. These are experience prompts for a visual day plan,
not service guarantees or onboard-food claims.

## Stay ideas

Every endpoint has three curated ways to stay: an easy station landing, a
destination-specific "worth the night" option, and either a goblin-mode city
base or a convenience base for the first train. They carry a rough price-band
prompt, an area, short rationale, and a map-search link. They are not hotel
listings, availability, booking advice, accessibility assertions, or price
quotes; use the link to find and validate current choices.

### Hotel-finding loop

The interface accepts a check-in date, nights, and guests, then hands the
active stay strategy to a live web search. It cannot inspect availability or
complete a booking. Instead, the traveler explicitly records that the current
strategy did not fit (sold out, wrong price, wrong feel), and the interface
advances through destination-specific alternatives while preserving the rest
of the day plan. A "candidate found" state records the selected strategy but
does not claim a booking is held or complete.
