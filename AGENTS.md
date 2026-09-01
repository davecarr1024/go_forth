# Go Forth agent guide

Read [README.md](README.md) and [docs/design.md](docs/design.md) before
changing behavior. The planner is deliberately approximate: never present its
starter data as live schedule, fare, disruption, ticket, or availability data.

- Keep routing logic in `js/planner.js` pure and covered by `node --test`.
- Keep the interface dependency-free and progressively usable with keyboard and
  assistive technology.
- Preserve the distinction between hard constraints and preference weights.
- Run `npm test` and `git diff --check` before pushing.
