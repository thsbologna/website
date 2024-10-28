import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CompanySection } from '../../interfaces/company-section';
import { CompanySectionComponent } from "../company-section/company-section.component";

import CompanySections from '../../data/company-sections.json'
import { ProductsComponent } from '../products/products.component';
import { ReferencesComponent } from "../references/references.component";
import { PartnersComponent } from '../partners/partners.component';


@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CompanySectionComponent, ProductsComponent, ReferencesComponent, ReferencesComponent, PartnersComponent],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  sections: CompanySection[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.sections = CompanySections as CompanySection[];
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
}
