import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = environment.apiURL; // Ej: "http://localhost:3000/api"
  private productsEndpoint = "/products";
  
  // URL completa para productos
  private get productsURL(): string {
    return `${this.baseURL}${this.productsEndpoint}`;
  }

  constructor(private http: HttpClient) {}

  // Obtener todos los productos
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.productsURL}/${id}`);
  }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsURL, product);
  }

  // Actualizar un producto completo
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsURL}/${id}`, product);
  }

  // Actualizar solo el stock (método específico)
  updateProductStock(id: number, newStock: number): Observable<Product> {
    return this.http.put<Product>(`${this.productsURL}/${id}/stock`, { stock: newStock });
    // Alternativa si no tienes endpoint específico para stock:
    // return this.http.patch<Product>(`${this.productsURL}/${id}`, { stock: newStock });
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.productsURL}/${id}`);
  }

  // Métodos específicos para incrementar/decrementar stock
  incrementStock(id: number, amount: number = 1): Observable<Product> {
    return this.getProductById(id).pipe(
      switchMap(product => {
        const newStock = product.stock + amount;
        return this.updateProductStock(id, newStock);
      })
    );
  }

  decrementStock(id: number, amount: number = 1): Observable<Product> {
    return this.getProductById(id).pipe(
      switchMap(product => {
        const newStock = Math.max(0, product.stock - amount); // Evita stock negativo
        return this.updateProductStock(id, newStock);
      })
    );
  }
}