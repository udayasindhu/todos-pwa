# Todos

This project will help you in create a Progressive Web App in Angular 13. Here we've used Node for backend, where you can add a todo, update the progress of it. This can work in offline as well since service workers are registered. This can also be downloaded and installed as an application of your device since this is made as PWA.

In order install the application on your device, go to apps in browser options and click on the install application. Then you'll be able to access it locally without internet. But before doing so you've perform the 3rd and 4th point mentioned below.

## Development server

1. Go to frontend folder and run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

2. Go to backend folder and run `node index.js`.

3. Go to frontend folder and run `ng build --prod --aot`.(For Progressive Web App)

4. Go to dist folder and run `http-server`

Issue: 
After serving, if the url is edited manually the link will not work. But it can route based on the actions performed in the UI.

Solution:
In order to over that issue, we've to use `aot` flag while building.

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
