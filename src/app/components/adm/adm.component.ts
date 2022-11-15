import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsI } from 'src/app/models/products.models';
import { ApisService } from 'src/app/services/apis.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent {
  products: ProductsI[] = [];

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
    ).subscribe( (res: any)=>{
      //console.log("Producto creado con exito");
      this.openDialog();
    }); 
  }
  openDialog():void{
    const dialogRef = this.dialog.open(DialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    })
  }
  validators(){
    return this.productForm.invalid && this.productForm.touched;
  }
}