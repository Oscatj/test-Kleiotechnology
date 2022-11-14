import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmComponent } from './components/adm/adm.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'adm', component: AdmComponent},
  {path: 'products', component: ProductsComponent},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
