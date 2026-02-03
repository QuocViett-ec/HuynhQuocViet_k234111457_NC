import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contact_name: string = 'Quốc Việt';
  contact_email: string = 'huynhquocviet0609@gmail.com';
  contact_phone: string = '123-456-7890';
  sendContact(your_name: string): void {
    alert(`Bạn ${your_name} muốn gửi contact`);
  }
}
