// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDL-_f_lQb4dnkx6GRrL7O7L7sp2A1Kj1w',
    authDomain: 'ds-mobile-dev.firebaseapp.com',
    databaseURL: 'https://ds-mobile-dev.firebaseio.com',
    projectId: 'ds-mobile-dev',
    storageBucket: 'ds-mobile-dev.appspot.com',
    messagingSenderId: '931169905269'
  },
  firebaseConfigProd: {
    apiKey: 'AIzaSyAexP1Haz3RsxHqPX--XncgC1Rxef_wMDA',
    authDomain: 'ds-mobile-prod.firebaseapp.com',
    databaseURL: 'https://ds-mobile-prod.firebaseio.com',
    projectId: 'ds-mobile-prod',
    storageBucket: '',
    messagingSenderId: '662623055885'
  }
};


