import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  page: number = 0;

  productsList: Array<any> = [];
  title: any;
  constructor(private apiServices: ApisService) {
    apiServices.getProducts().subscribe( (res: any)=>{
      console.log(res.products);
      this.productsList = res.products;
    });    
  }
  nextPage(){
    this.page += 12;
     this.apiServices.getProducts(this.page).subscribe((res: any) => {
      this.productsList = res.products;
   });   
  }
  previousPage(){
    this.page -= 12;
    this.apiServices.getProducts(this.page).subscribe((res: any) => {
      this.productsList = res.products;
    });
  }

}
