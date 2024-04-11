// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  platform: 'local',
  host: 'http://localhost:4200',
  //origin: 'http://localhost:5275/api/'
  origin: 'https://crownpolybackendapp.azurewebsites.net/api/'
};

//******************Frontend deployment steps on Azure app service*****************************************
// 1) Change backend url in environment file
// 2) Run build command
// 3) deploy dist folder on azure app service
// Note : if create new app service for frontend please change below configuration in app service
// 1) Application Settings: do SCM_DO_BUILD_DURING_DEPLOYMENT = false
// 2) General Settings: Starter command = pm2 serve /home/site/wwwroot --no-daemon --spa