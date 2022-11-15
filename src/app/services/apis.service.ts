import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsI } from 'src/app/models/products.models';
import { ProductsAddI } from '../models/productAdd.models';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  urlBase = "https://dummyjson.com/";

  constructor(private http: HttpClient) { }

  getProducts (page: number = 0){
    return this.http.get(`${this.urlBase}products`, {
      params: {
        skip: page,
        limit: 12
      }
    });
  }
  public postProducts(body: ProductsAddI){
    return this.http.post(`${this.urlBase}products/add`, body);
  }
}