import { Component } from '@angular/core';

type Product = { id: string; name: string; price: number; image: string };

@Component({
  selector: 'app-learn-ditective',
  standalone: false,
  templateUrl: './learn-ditective.html',
  styleUrl: './learn-ditective.css',
})
export class LearnDitective {
  show_view: number = 1;
  change_view() {
    if (this.show_view == 1) this.show_view = 2;
    else this.show_view = 1;
  }

  provinces: string[] = ['Hà Nội', 'Hải Phòng', 'Quảng Ninh', 'Thái Bình', 'Nam Định'];
  products: Product[] = [
    {
      id: '1',
      name: 'Iphone 14 Pro Max',
      price: 30000000,
      image:
        'https://i5.walmartimages.com/seo/Restored-Apple-iPhone-14-Pro-Max-Carrier-Unlocked-128GB-Gold-MQ8Q3LL-A-Refurbished_ebaa4145-2d5f-48c9-897f-8284cb7dfc78.917a10bac69f122d8a008486a632b946.jpeg',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S23 Ultra',
      price: 28000000,
      image:
        'https://tse3.mm.bing.net/th/id/OIP.7Pjkiv52oKG8asG5OUy80QHaEm?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: '3',
      name: 'Xiaomi 13 Pro',
      price: 20000000,
      image:
        'https://tse2.mm.bing.net/th/id/OIP.ZtXeqkt5NX9D60h8rTiDFQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: '4',
      name: 'Oppo Find X5 Pro',
      price: 22000000,
      image: 'https://fdn2.gsmarena.com/vv/pics/oppo/oppo-find-x5-pro-1.jpg',
    },
    {
      id: '5',
      name: 'Vivo X80 Pro',
      price: 21000000,
      image: 'https://fdn2.gsmarena.com/vv/pics/vivo/vivo-x80-pro-1.jpg',
    },
  ];
}
