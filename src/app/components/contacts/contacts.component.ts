import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

}
