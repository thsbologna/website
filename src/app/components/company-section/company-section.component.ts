import { Component, Input } from '@angular/core';
import { CompanySection } from '../../interfaces/company-section';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './company-section.component.html',
  styleUrl: './company-section.component.css'
})
export class CompanySectionComponent {
  @Input({ required: true }) section!: CompanySection;
}
