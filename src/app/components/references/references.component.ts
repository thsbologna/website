import { Component, OnInit } from '@angular/core';
import { ContributorComponent } from '../../contributor/contributor.component';
import { Contributor } from '../../interfaces/contributor';

import references from '../../data/references.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule, ContributorComponent],
  templateUrl: './references.component.html',
  styleUrl: './references.component.css'
})
export class ReferencesComponent implements OnInit {
  references!: Contributor[];

  ngOnInit() {
    this.references = references as Contributor[];
  }
}
