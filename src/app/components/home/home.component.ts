import { Component } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';

import carouselItems from '../../data/carousel-items.json';
import { CarouselItem } from '../../interfaces/carousel-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  carouselItems: CarouselItem[] = [];

  ngOnInit() {
    this.carouselItems = carouselItems as CarouselItem[]
  }

  /**
   * Crea un Intersection Observer per osservare la visibilita' di ogni elemento del carosello dopo l'inizializzazione di quest'ultimo
   */
  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(this._callback.bind(this), {
        threshold: 0.5
      });

      document.querySelectorAll('.carousel_item').forEach(item => {
        observer.observe(item);
      });
    }
  }

  /**
   * Funzione di callback per l'osservatore dell'intersection.
   * 
   * @param {IntersectionObserverEntry[]} entries - Un array di entries contenenti informazioni
   * sullo stato di intersezione di ciascun elemento osservato.
   * 
   * Questa funzione itera ogni voce e aggiunge o rimuove la classe “visibile"
   * dagli elementi h1, img, p all'interno del carosello di destinazione, in base al visualizzazione dell'elemento padre.
   */
  private _callback = (entries: any) => {
    entries.forEach((entry: any) => {
      const target = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        target.querySelectorAll('h1, img, p').forEach(el => {
          el.classList.add('visible');
        });
      } else {
        target.querySelectorAll('h1, img, p').forEach(el => {
          el.classList.remove('visible');
        });
      }
    });
  }
}
