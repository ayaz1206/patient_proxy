//import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
//import { appConfig } from './app/app.config';
//import { AppM } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));
