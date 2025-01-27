import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Iproduct } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

  addProductForm!: FormGroup;  
  submitted = false;

  arrProducts: Iproduct[] = [];
  categories: string[] = [];

  productService = inject(ProductService);
  router = inject(Router);
  
  constructor() {
    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(150),
      ]),
      price: new FormControl('', [Validators.required, Validators.min(0.01)]),
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        ),
      ]),
      active: new FormControl('true', Validators.required),
    });

    this.loadProducts();
  }

  loadProducts(): void {
    setTimeout(() => {
      this.arrProducts = this.productService.getAllProducts();
      this.categories = [
        ...new Set(this.arrProducts.map(product => product.category)),
      ];
      console.log("Productos cargados:", this.arrProducts);
      console.log("Categorías:", this.categories);
    }, 1000); // Pongo un timeout ya que el metodo getAllProducts(); es llamado antes de que carguen los datos
  }


  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return (
      this.addProductForm.get(FormControlName)?.hasError(validator) &&
      this.addProductForm.get(FormControlName)?.touched
    )
  }

  resetForm() {
    this.submitted = false;
    this.addProductForm.reset();
  }

  onSubmit(event: Event): void {
    this.submitted = true;
    if (this.addProductForm.valid && this.addProductForm.value) {
        const formProduct = {
            ...this.addProductForm.value,
            id: Date.now().toString() // para generar un ID basado en la fecha
        };

        this.productService.addProduct(formProduct);
        console.log('Producto añadido:', formProduct);
        this.resetForm();
    } else {
        console.error('Producto no añadido');
    }
}

}
  






