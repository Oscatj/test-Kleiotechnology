import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsI } from '../models/products.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  urlBase = "https://dummyjson.com/";

  constructor(private http: HttpClient) { }

  listProducts(){
    return this.http.get(`${this.urlBase}products`);
  }

  getProducts (page: number = 0){
    return this.http.get(`${this.urlBase}products`, {
      params: {
        skip: page,
        limit: 12
      }
    });
  } 

  postProducts(body: ProductsI): Observable<ProductsI>{
    return this.http.post(`${this.urlBase}products/add`, body);
  }

  deleteProduct(id: number): Observable<ProductsI>{
    return this.http.delete(`${this.urlBase}products/${id}`)
  }

  updateProduct(id: String, updateProduct: ProductsI): Observable<ProductsI>{
    return this.http.put(`${this.urlBase}products${id}`, updateProduct);
  }

}