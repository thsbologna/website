import { Component, Input } from '@angular/core';
import { Contributor } from '../interfaces/contributor';

@Component({
  selector: 'app-contributor',
  standalone: true,
  imports: [],
  templateUrl: './contributor.component.html',
  styleUrl: './contributor.component.css'
})
export class ContributorComponent {
  @Input() contributor!: Contributor;
}
