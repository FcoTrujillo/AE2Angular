import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Iproduct } from '../../interfaces/iproduct';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent {
  
  @Input() arrProducts: Iproduct[] = [];
  @Output() filtersChanged = new EventEmitter<any>();
  categories: string[] = [];

  filters: any = {
    nombre: '',
    categoria: '',
    precioMin: undefined,
    precioMax: undefined,
    activo: undefined,
  };

  constructor() {}

  ngOnChanges(): void {
    console.log('Productos recibidos en el filtro:', this.arrProducts);
  }


  applyFilters(filterForm: NgForm): void {
    const values = { ...filterForm.value };
  
    if (values.activo === 'true') {
      values.activo = true;
    } else if (values.activo === 'false') {
      values.activo = false;
    } else {
      values.activo = undefined;
    } 
    this.filtersChanged.emit(values);
  }
  

  clearFilters(form: NgForm): void {
    form.resetForm();
    this.filtersChanged.emit({});
  }
}
