import { Component, OnInit } from '@angular/core';
import { ContributorComponent } from "../../contributor/contributor.component";
import { Contributor } from '../../interfaces/contributor';

import partners from '../../data/partners.json'

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [ContributorComponent],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.css'
})
export class PartnersComponent implements OnInit {
  partners!: Contributor[];

  ngOnInit() {
    this.partners = partners as Contributor[];
  }
}
