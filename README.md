# Go Forth

**Go Forth** is an open-ended Japan railway adventure planner. Rather than
asking where you have already decided to go, it starts from where you are and
helps you discover plausible, enjoyable places to end the day.

> Adventure planning, not departure information. Check current railway
> information before boarding.

## V1

The v1 is a dependency-free, accessible static web app with:

- a small, hand-authored starter network;
- approximate run times and expected waits instead of departures;
- Open, Easy, Progress, GranClass, Goblin, and "I'm cooked" planning modes;
- scored, diverse one-way suggestions with an explanation and confidence note;
- keyboard-operable controls and screen-reader-friendly live results.

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
```

## Project documents

- [Design](docs/design.md)
- [Starter network provenance](docs/data.md)

## License

[MIT](LICENSE)
