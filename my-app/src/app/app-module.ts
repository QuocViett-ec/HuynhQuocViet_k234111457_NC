import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RoutingComponent } from './app-routing-module';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Mybinding } from './mybinding/mybinding';
import { Ptb1 } from './ptb1/ptb1';
import { Gpa } from './gpa/gpa';
import { FormsModule } from '@angular/forms';
import { Ptb2 } from './ptb2/ptb2';
import { LearnDitective } from './learn-directive/learn-ditective';
import { ListProduct1 } from './list-product-1/list-product-1';
import { ListProduct2 } from './list-product-2/list-product-2';
import { Customer } from './customer/customer';
import { ListProduct3 } from './list-product-3/list-product-3';
import { Ex15 } from './ex15/ex15';
import { Ex18 } from './ex18/ex18';
import { Ex10 } from './ex10/ex10';
import { PageNotFound } from './page-not-found/page-not-found';
import { ListCustomers } from './list-customers/list-customers';
import { CustomerDetail } from './customer-detail/customer-detail';
import { ListCustomerService } from './list-customer-service/list-customer-service';
import { ListCustomerHttpService } from './list-customer-http-service/list-customer-http-service';
import { ServiceProductImageEvent } from './ex13/service-product-image-event/service-product-image-event';
import { ServiceProductImageEventDetail } from './ex13/service-product-image-event-detail/service-product-image-event-detail';
import { Ex14 } from './ex14/ex14';
import { Ex19 } from './ex19/ex19';
import { Product } from './ex19/product/product';
import { ListProduct } from './ex19/list-product/list-product';
import { ServiceProduct } from './ex19/service-product/service-product';
import { Form } from './form/form';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveForm } from './reactive-form/reactive-form';
import { Ex26 } from './ex26/ex26';
import { Ex27 } from './ex27/ex27';
import { Ex28 } from './ex28/ex28';
import { Books } from './books/books';
import { Bookdetail } from './bookdetail/bookdetail';
import { Ex50 } from './ex50/ex50';
import { Ex50Bookdetail } from './ex50/ex50-bookdetail/ex50-bookdetail';

@NgModule({
  declarations: [
    App,
    About,
    Contact,
    Mybinding,
    Ptb1,
    Gpa,
    Ptb2,
    LearnDitective,
    ListProduct1,
    ListProduct2,
    Customer,
    ListProduct3,
    Ex15,
    Ex18,
    Ex10,
    PageNotFound,
    ListCustomers,
    CustomerDetail,
    ListCustomerService,
    ListCustomerHttpService,
    ServiceProductImageEvent,
    ServiceProductImageEventDetail,
    Ex19,
    RoutingComponent,
    Ex19,
    Product,
    ListProduct,
    ServiceProduct,
    Form,
    ReactiveForm,
    Ex26,
    Ex27,
    Ex28,
    Books,
    Bookdetail,
    Ex50,
    Ex50Bookdetail,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ex14,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
