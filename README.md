# luma-ui

An independent, interactive Luma-style UI prototype built with Expo, React Native, and TypeScript.

This is a **noncommercial study and research prototype**. It is not affiliated with, endorsed by, or sponsored by Luma. All event names and host identities are fictional and used for layout demonstration only.

## What it demonstrates

The main P0 flows of the Luma event app, rendered as a mobile web prototype:

- Promo wall and login sheet
- Home feed with upcoming events and empty states
- Discover feed with popular events and category grid
- Event detail page with hero, host, location and about sections
- Create event form and cover gallery
- Notifications and chat empty states

## Tech stack

- Expo 57 / React Native 0.86 / React Native Web 0.21
- TypeScript
- Roboto (Apache 2.0) for system UI text

## Development

```bash
npm install
npm run web         # start dev server
npm run typecheck   # tsc --noEmit
npm run build:web   # expo export --platform web
```

## License

Released under the M620 Study and Research License 1.0 (noncommercial, self-directed study/research). See [LICENSE](LICENSE). Third-party fonts retain their original licenses.
