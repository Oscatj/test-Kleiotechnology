import { Component } from '@angular/core';
import { ApisService } from './services/apis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  productsList: Array<any> = [];
  title: any;
  constructor(private apiServices: ApisService) {
    apiServices.getProducts().subscribe( (res: any)=>{
      //console.log(res.products);
      this.productsList = res.products;
    });
    
  }
}
