import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProductListComponent } from "./product/product-list/product-list.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amazingAnimalPainting';
}
