# Go Forth

**Go Forth** is an open-ended Japan railway adventure planner. Rather than
asking where you have already decided to go, it starts from where you are and
helps you discover plausible, enjoyable places to end the day.

> Adventure planning, not departure information. Check current railway
> information before boarding.

## V1

The v1 is a dependency-free, accessible static web app with:

- a small, hand-authored starter network;
- approximate run times and expected waits instead of departures, with an editable
  Japan-time departure and arrival boundary;
- independent day-feel modes (Open, Easy, GranClass, Goblin, and "I'm cooked") and north/south drift preferences;
- scored, diverse one-way suggestions with an explanation and confidence note;
- keyboard-operable controls and screen-reader-friendly live results.

The [garden atlas](docs/gardens.md) adds 23 researched garden ideas across 16
rail bases, including Sankeien, Rikugien, the Adachi Museum of Art gardens,
and Japan's three classic gardens. Select **Gardens** in the app to bring
garden visits forward, or open the atlas to browse every source and rail base.

The data is intentionally illustrative, incomplete, and not suitable for
operational travel decisions.

## Run locally

Open `index.html` in a modern browser, or serve the directory:

```bash
npx serve .
```

## Verify

```bash
npm test
npm run check
```

## Project documents

- [Design](docs/design.md)
- [Starter network provenance](docs/data.md)
- [Garden atlas research](docs/gardens.md)

## License

[MIT](LICENSE)
