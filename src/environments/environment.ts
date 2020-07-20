// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  runfindr: {
    environmentUrl: null,
    serverUrl: 'http://localhost:5000',
    localApiUrl: '',
    googleApiKey: 'INSERT_API_KEY_HERE',
    auth0Domain: 'INSERT_AUTH0_DOMAIN',
    auth0ClientId: 'INSERT_AUTH0_CLIENTID'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
