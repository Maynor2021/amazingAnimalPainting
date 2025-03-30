import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
        this.showError('Error al cargar productos');
      }
    });
  }

  // Aumentar stock
  increaseStock(product: Product): void {
    const newStock = product.stock + 1;
    this.productService.updateProductStock(product.id, newStock).subscribe({
      next: (updatedProduct) => {
        product.stock = updatedProduct.stock;
        this.showSuccess('Stock aumentado');
      },
      error: (err) => {
        console.error('Error increasing stock:', err);
        this.showError('Error al aumentar stock');
      }
    });
  }

  // Disminuir stock
  decreaseStock(product: Product): void {
    if (product.stock <= 0) return;

    const newStock = product.stock - 1;
    this.productService.updateProductStock(product.id, newStock).subscribe({
      next: (updatedProduct) => {
        product.stock = updatedProduct.stock;
        this.showSuccess('Stock disminuido');
      },
      error: (err) => {
        console.error('Error decreasing stock:', err);
        this.showError('Error al disminuir stock');
      }
    });
  }

  // Mostrar mensaje de éxito
  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  // Mostrar mensaje de error
  private showError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }
}