import { Injectable } from '@angular/core';

export interface CatalogProduct {
  ProductId: string;
  ProductName: string;
  Price: number;
  Image: string;
}

export interface CatalogCategory {
  Cateid: string;
  CateName: string;
  Products: CatalogProduct[];
}

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  datas: CatalogCategory[] = [
    {
      Cateid: 'cate1',
      CateName: 'nuoc ngot',
      Products: [
        {
          ProductId: 'p1',
          ProductName: 'Coca',
          Price: 100,
          Image: 'assets/ex13/coca.jpg',
        },
        {
          ProductId: 'p2',
          ProductName: 'Pepsi',
          Price: 300,
          Image: 'assets/ex13/pepsi.jpg',
        },
        {
          ProductId: 'p3',
          ProductName: 'Sting',
          Price: 200,
          Image: 'assets/ex13/sting.jpg',
        },
      ],
    },
    {
      Cateid: 'cate2',
      CateName: 'Bia',
      Products: [
        {
          ProductId: 'p4',
          ProductName: 'Heleiken',
          Price: 500,
          Image: 'assets/img/caocap.jpg',
        },
        {
          ProductId: 'p5',
          ProductName: '333',
          Price: 400,
          Image: 'assets/img/mix.jpg',
        },
        {
          ProductId: 'p6',
          ProductName: 'Sai Gon',
          Price: 600,
          Image: 'assets/img/qviet.jpg',
        },
      ],
    },
  ];

  constructor() {}

  getCategories() {
    return this.datas;
  }

  // Backward-compatible alias used by some exercises
  GetCatalog() {
    return this.getCategories();
  }
}
