import { Iproduct } from './../interfaces/iproduct';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private arrProducts: Iproduct[] = [];

  constructor() {
    this.arrProducts = [];
    this.loadProducts();
  }

  private loadProducts(): void {
    fetch("https://jsonblob.com/api/1330568335225708544")
      .then(response => response.json())
      .then(ropa => {
        this.arrProducts = ropa.map((element: any) => element as Iproduct);
        console.log("Datos cargados:", this.arrProducts);
      })
      .catch(error => console.error('No se cargan los datos:', error));
  }

  getAllProducts(): Iproduct[] {
    return this.arrProducts;
  }

  addProduct(product: Iproduct): void {
    this.arrProducts.push(product);
  }

  deleteProduct(name: string): Iproduct[] {
    let i = this.arrProducts.findIndex(product => product.name == name);
    if (i != -1 && i >= 0 && i < this.arrProducts.length) {
      this.arrProducts.splice(i, 1);
    }
    return this.arrProducts;
  }

  filterProducts(filters: any): Iproduct[] {
    return this.arrProducts.filter((product) => {
      const matchesName = !filters.nombre || product.name.toLowerCase().includes(filters.nombre.toLowerCase());
      const matchesCategory = !filters.categoria || product.category.trim() === filters.categoria.trim();
      const matchesMinPrice = !filters.precioMin || product.price >= Number(filters.precioMin);
      const matchesMaxPrice = !filters.precioMax || product.price <= Number(filters.precioMax);
      const matchesActive = filters.activo === undefined || product.active === (filters.activo === 'true' || filters.activo === true);

      return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesActive;
    });
  }
}