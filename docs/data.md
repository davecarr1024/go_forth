# Starter data

The v1 dataset is a hand-authored, illustrative service-pattern model created
for interface and routing development. Its durations, waiting assumptions,
comfort flags, and scenic scores are editorial approximations, **not validated
for operational use**. The regional line topology below was checked against
operator information in September 2026; that does not validate a particular
departure, connection, seat, or service day.

## Regional rail expansion

- [JR Central's Hida information](https://railway.jr-central.co.jp/tickets/hida-toyama-waribiki/)
  and [Takayama Line timetable](https://railway.jr-central.co.jp/time-schedule/srch/_pdf/data/202403/takayama_Inotani_D_e_u.pdf)
  support the Nagoya–Gifu–Gero–Takayama–Toyama corridor. The Toyama end is
  sparse in the model and needs a current operating check.
- [JR Central's Shinano route map](https://jr-central.co.jp/news/release/_pdf/000042834.pdf)
  supports Nagoya–Kiso-Fukushima–Matsumoto–Nagano. Tokaido and Hokuriku links
  make this a genuine alternative to other north-country routes.
- [JR East's Gono Line guide](https://www.jreast.co.jp/akita/gonosen/)
  and [Resort Shirakami calendar](https://www.jreast.co.jp/en/multi/joyful/shirakami_timetable.html)
  support the Aomori/Hirosaki–Goshogawara–Fukaura–Higashi-Noshiro–Akita
  coast. Resort Shirakami is a dated, reserved-seat choice; the direct
  Aomori–Akita edge represents the full scenic ride, while segment edges let
  the planner suggest intermediate stops.
- [JR West's Nanao Line timetable](https://timetable.jr-odekake.net/line-timetable/2849)
  and [Noto Railway timetable](https://timetable.jr-odekake.net/line-timetable/2839)
  support Kanazawa–Nanao–Wakura Onsen–Anamizu. The current graph ends at
  Anamizu and offers a return ride from the rail terminus.
- [JR Shikoku's Shimanto service](https://www.jr-shikoku.co.jp/01_trainbus/vehicle-info/shimanto.html),
  [Kochi–Kubokawa sightseeing train](https://www.jr-shikoku.co.jp/yoakenomonogatari/en/),
  [Yodo Line](https://www.jr-shikoku.co.jp/yodo_line/), and
  [Iyonada Monogatari](https://www.jr-shikoku.co.jp/01_trainbus/event_train/seat_info/iyonadamonogatari)
  support an inland/river/coastal circuit through Kochi, Kubokawa, Uwajima,
  Iyo-Ozu, and Matsuyama. Special trains need date and seat checks.
- [JR Kyushu's Yufuin no Mori](https://www.jrkyushu.co.jp/english/train/yufuin_no_mori.html),
  [Aso Boy](https://www.jrkyushu.co.jp/english/train/asoboy.html), and
  [Ibusuki no Tamatebako](https://www.jrkyushu.co.jp/english/train/ibutama.html)
  support inland Yufuin/Aso options and a Kagoshima–Ibusuki coastal
  out-and-back. The model also links Beppu and the east coast so the slower
  choices can compete with more direct travel. Dates and reservations must be
  checked with the operator.

The graph intentionally permits multiple edge patterns between a few places
and a return to the origin. Its connection allowance and half-headway wait are
rough planning cushions, not proof that two specific trains connect. A card's
"check date / seats" marker flags sparse or dated scenic services. A day plan is
an idea to verify against current operator information before travel.

The [garden atlas research](gardens.md) is a separately sourced editorial
layer: 23 gardens in 16 rail bases, reviewed in September 2026 against garden
operators and official local tourism sources. Each garden stores a source link
and a coarse local-access note. These sources confirm the place and connection;
they do not turn the starter rail graph into a current timetable.

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

The garden preference tag is derived from sourced garden activities. Selecting
Gardens brings those activities to the front of destination cards and day plans;
the garden atlas exposes the full list, including places beyond the current
result cards. Garden transit beyond the rail base is shown separately
and is not included in the planner's rail journey duration.

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
active stay strategy to Hotels.com, prefilled with the current local date by
default. Every activity and stay map handoff includes the destination city to
avoid ambiguous landmark searches. It cannot inspect availability or
complete a booking. Instead, the traveler explicitly records that the current
strategy did not fit (sold out, wrong price, wrong feel), and the interface
advances through destination-specific alternatives while preserving the rest
of the day plan. A "candidate found" state records the selected strategy but
does not claim a booking is held or complete.
