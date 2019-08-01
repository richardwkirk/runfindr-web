# runfindr-web

The `runfindr-web` project is developed for [runfindr.uk](http://www.runfindr.uk). The site provides a visual display of parkrun locations and athlete data. The web front end currently connects through a deployment of the web-api in the `runfindr-server` project to source parkrun event and athlete data.

---

## parkrun data

runfindr is not associated with the parkrun organisation. The runfindr projects are used to present parkrun data in different ways. No result data is stored for use beyond the reformatting of the data available through the [parkrun](https://www.parkrun.com) websites. This project is developed as a personal interest project to explore new technologies using an interesting subject matter.

---

## Development server

Copy `environment.ts` to `environment.local.ts` and set the Google API key required.

Run `npm run start:local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

