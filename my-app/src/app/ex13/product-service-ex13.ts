import { Injectable } from '@angular/core';

export interface ProductImage {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductServiceEx13 {
  productsImage: ProductImage[] = [
    { ProductId: 'p1', ProductName: 'Coca', Price: 100, Image: 'assets/ex13/coca.jpg' },
    { ProductId: 'p2', ProductName: 'Pepsi', Price: 300, Image: 'assets/ex13/pepsi.jpg' },
    { ProductId: 'p3', ProductName: 'Sting', Price: 200, Image: 'assets/ex13/sting.jpg' },
  ];

  constructor() {}

  getProductsWithImages(): ProductImage[] {
    return this.productsImage;
  }

  getProductDetail(id: any): ProductImage | undefined {
    return this.productsImage.find((x) => x.ProductId == id);
  }
}
