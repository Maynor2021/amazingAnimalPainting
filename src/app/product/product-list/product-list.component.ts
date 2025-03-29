import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MDCRipple} from '@material/ripple';
import { FlexLayoutModule } from 'ngx-flexible-layout';


import {MatCardModule} from '@angular/material/card';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, MatButtonModule, MatCardModule, AppComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  
})
export class ProductListComponent implements OnInit{

  products:Product[]=[];
  constructor (private productservice:ProductService){

  }
  ngOnInit(): void {
    this.productservice.getProducts().subscribe(data=>{
      this.products=data;
    })
  }

  

}
