# Todos

This project will help you in create a Progressive Web App in Angular 13. Here we've used Node for backend, where you can add a todo, update the progress of it. This can work in offline as well since service workers are registered. This can also be downloaded and installed as an application of your device since this is made as PWA.

In order install the application on your device, go to apps in browser options and click on the install application. Then you'll be able to access it locally without internet. But before doing so you've perform the 3rd and 4th point mentioned below.

To get the list of todos for the first time, provide `admin` as username.

## Development server

1. Go to frontend folder and run `ng serve` for a dev  or local server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

2. Go to backend folder and run `node server.js` to start the node backend server.

If you want to start a angular application as Progressive web app run below 2 steps.

1. Go to frontend folder and run `ng build --prod --aot`.(For Progressive Web App)

2. Open cmd prompt in frontend\dist folder and run `http-server`

Issue: 
After deploying build files in http server user can't manually navigate to any custom path due to build issue. If you don't want to run into this issue we have to build files with `aot` flag like mentioned in above command.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
