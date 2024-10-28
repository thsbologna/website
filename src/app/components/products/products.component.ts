import { Component } from '@angular/core';
import { Product } from '../../interfaces/product';

import products from '../../data/products.json'
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  iconClassList = 'text-4xl';

  /**
   * Inizializza l'array di prodotti con i dati forniti e imposta i colori delle icone
   * per ciascun prodotto chiamando il metodo `setIconColor`.
   */
  ngOnInit() {
    this.products = products as Product[];
    this.setIconColor(this.products);
  }

  /**
   * Itera attraverso l'array di prodotti e assegna un colore alle icone in base al colore precedente.
   * I colori sono applicati in sequenza ciclica come segue:
   * - Da "text-blue-500" a "text-yellow-500"
   * - Da "text-yellow-500" a "text-green-600"
   * - Da "text-green-600" a "text-red-700"
   * - Da "text-red-700" si torna a "text-blue-500"
   * 
   * Il colore iniziale è "text-blue-500". Ogni volta che viene applicato un nuovo colore,
   * il colore precedente viene aggiornato per garantire una sequenza continua.
   */
  setIconColor(products: Product[]) {
    var prevColor: string = '';

    for (let i of products) {
      switch (prevColor) {
        case 'text-blue-500':
          i.icon += ' text-yellow-500';
          prevColor = "text-yellow-500";
          break;
        case 'text-yellow-500':
          i.icon += ' text-green-600';
          prevColor = "text-green-600";
          break;
        case 'text-green-600':
          i.icon += ' text-red-700';
          prevColor = "text-red-700";
          break;
        default:
          i.icon += ' text-blue-500';
          prevColor = "text-blue-500";
          break;
      }
    }
  }
}
