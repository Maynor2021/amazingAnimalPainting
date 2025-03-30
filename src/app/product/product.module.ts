import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { MatCard } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,FlexLayoutModule,MatCard
  ]
})
export class ProductModule { }
