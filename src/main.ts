import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { ProductModule } from './app/product/product.module';
import { HttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
