import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApisService } from 'src/app/services/apis.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { ProductsI } from 'src/app/models/products.models';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit{
  products: ProductsI[] = [];
  index: number = 0;

  productForm: FormGroup = this.fb.group({
    title: this.fb.control("", [Validators.required, Validators.maxLength(30)]),
    description: this.fb.control("", [Validators.maxLength(256)]),
    price: this.fb.control(0, [Validators.required]),
    stock: this.fb.control(0, [Validators.maxLength(5), Validators.required]),
    brand: this.fb.control("", [Validators.required]),
    category: this.fb.control("", [Validators.required]),
    rating: this.fb.control(0)

  });

  constructor(private fb: FormBuilder,
              private apiServices: ApisService,
              public dialog: MatDialog) {} 

  ngOnInit(): void {}

  addProducts(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }
    this.apiServices.postProducts(
      {
        title: this.productForm.value.title,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        stock: this.productForm.value.stock,
        brand: this.productForm.value.brand,
        category: this.productForm.value.category,
        rating: this.productForm.value.rating,
      },
    ).subscribe((res:ProductsI) => {
      this.products.push(res);
      this.openDialog();
    }); 
  }

  openDialog():void{
    const dialogRef = this.dialog.open(DialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }

  deleteProduct(product: ProductsI){
    const producto = {id: product.id}
    this.apiServices.deleteProduct(producto.id!).subscribe();
    this.products = this.products.filter((p:ProductsI) => p.id != product.id);
  }

  /*updateProduct(product: ProductsI){
    const producto = {id: this.products[0], product}
    this.apiServices.updateProduct(producto.id, producto.product).subscribe();
    this.products = this.products.filter((p:ProductsI) => p.id != product.id);
  }*/

  validators(){
    return this.productForm.invalid && this.productForm.touched;
  }
}