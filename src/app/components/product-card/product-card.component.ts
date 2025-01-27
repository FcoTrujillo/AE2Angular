import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Iproduct } from '../../interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  ProductService = inject(ProductService);

  @Input() product: Iproduct = {
    id: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    active: false
  };

  @Output() deleteProduct = new EventEmitter<string>();

  onDelete(): void {
    this.deleteProduct.emit(this.product.id);
  }

}



