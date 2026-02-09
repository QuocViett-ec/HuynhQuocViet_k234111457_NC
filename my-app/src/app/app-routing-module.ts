import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ex10 } from './ex10/ex10';
import { About } from './about/about';
import { ListProduct1 } from './list-product-1/list-product-1';
import { ListProduct2 } from './list-product-2/list-product-2';
import { ListProduct3 } from './list-product-3/list-product-3';
import { PageNotFound } from './page-not-found/page-not-found';
import { ListCustomers } from './list-customers/list-customers';
import { CustomerDetail } from './customer-detail/customer-detail';
import { ListCustomerService } from './list-customer-service/list-customer-service';
import { ListCustomerHttpService } from './list-customer-http-service/list-customer-http-service';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { Ex19 } from './ex19/ex19';
import { Form } from './form/form';
import { ReactiveForm } from './reactive-form/reactive-form';
import { Ex26 } from './ex26/ex26';
import { Ex27 } from './ex27/ex27';
import { Ex28 } from './ex28/ex28';
import { Books } from './books/books';
import { Bookdetail } from './bookdetail/bookdetail';
import { Ex50 } from './ex50/ex50';
import { Ex50Bookdetail } from './ex50/ex50-bookdetail/ex50-bookdetail';

const routes: Routes = [
  { path: '', redirectTo: '/ex50', pathMatch: 'full' },
  { path: 'ABOUT', component: About },
  { path: 'EX10', component: Ex10 },
  { path: 'form', component: Form },
  { path: 'reactive', component: ReactiveForm },
  { path: 'ex26', component: Ex26 },
  { path: 'ex27', component: Ex27 },
  { path: 'ex28', component: Ex28 },
  { path: 'product-1', component: ListProduct1 },
  { path: 'product-2', component: ListProduct2 },
  { path: 'product-3', component: ListProduct3 },
  { path: 'product', component: Product },
  { path: 'list-product', component: ListProduct },
  { path: 'service-product', component: ServiceProduct },
  { path: 'ex19', component: Ex19 },
  { path: 'list-customers', component: ListCustomers },
  { path: 'list-customers/:id', component: CustomerDetail },
  { path: 'list-customers-service', component: ListCustomerService },
  { path: 'list-customers-service/:id', component: ListCustomerService },
  { path: 'list-customers-http-service', component: ListCustomerHttpService },
  { path: 'list-customers-http-service/:id', component: CustomerDetail },
  { path: 'ex39', component: Books },
  { path: 'ex41', component: Bookdetail },
  { path: 'ex41/:id', component: Bookdetail },
  { path: 'ex50', component: Ex50 },
  { path: 'ex50-create', component: Ex50Bookdetail },
  { path: 'ex50/:id', component: Ex50Bookdetail },
  //{ path: '**', component: PageNotFound },
];

export const RoutingComponent = [Product, ListProduct, ServiceProduct];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
