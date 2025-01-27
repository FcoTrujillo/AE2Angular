import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductFilterComponent } from '../product-filter/product-filter.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterComponent, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  arrProducts: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];

  productService = inject(ProductService);

  ngOnInit(): void{
    this.arrProducts = this.productService.getAllProducts();
    console.log(this.arrProducts);
  }

  onDeleteProduct(id: string): void {
    this.productService.deleteProduct(id);
    this.filteredProducts = this.productService.getAllProducts();
  }
  
  applyFilters(filters: any): void {
    console.log('Filtros:', filters);
    if (Object.keys(filters).length === 0) {
      this.filteredProducts = this.arrProducts.slice();
    } else {
      this.filteredProducts = this.productService.filterProducts(filters);
    }
    console.log('Productos filtrados:', this.filteredProducts);
  }

  }

