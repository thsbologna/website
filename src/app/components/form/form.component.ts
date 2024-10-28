import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { Email } from '../../interfaces/email';
import { FormService } from '../../services/form.service';
import { CountryCode } from '../../interfaces/country-code';
import { Province } from '../../interfaces/province';
import { Activity } from '../../interfaces/activity';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    CommonModule,
    PasswordModule,
    ToastModule,
    KeyFilterModule
  ],
  providers: [MessageService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  isFormValid!: boolean;
  isFormSubmitted: boolean = false;

  typesOfWork: Activity[] = []; // Assuming Activity is a defined type
  provinces: Province[] = []; // Assuming Province is a defined type
  countryCodes: any[] = []; // Assuming CountryCode is a defined type
  email!: Email;

  errorDetail: string = '';

  // Regular expressions
  private readonly regexPatterns = {
    name: /^[a-zA-ZÀ-ÿ\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    taxCode: /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[A-EHLMPRST](?:[0-9LMNPQRSTUV]{2})(?:[A-Z]{1})(?:[0-9LMNPQRSTUV]{3})([A-Z]{1})$/,
    companyTaxCode: /^[A-Z]{6}\d{2}\w{2}\d{3}[A-Z]$/,
    vatNumber: /^[0-9]{11}$/,
    phoneNumber: /^[0-9]{10}$/,
  };

  constructor(private formBuilder: FormBuilder, private formService: FormService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadDropdowns();
    this.createForm();
  }

  private loadDropdowns() {
    this.countryCodes = Object.keys(CountryCode).map(key => ({
      key: key,
      value: CountryCode[key as keyof typeof CountryCode]
    }));
    this.typesOfWork = [...Object.values(Activity)];
    this.provinces = [...Object.values(Province)];
  }

  taxCodeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValidPersonal = this.regexPatterns.taxCode.test(value);
      const isValidCompany = this.regexPatterns.companyTaxCode.test(value);
      const isValidVatNumber = this.regexPatterns.vatNumber.test(value);

      return (isValidPersonal || isValidCompany || isValidVatNumber) ? null : { invalidTaxCode: true };
    };
  }

  private createForm() {
    this.form = this.formBuilder.group({
      businessName: ['', [Validators.required, Validators.maxLength(60)]],
      taxCode: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(16), this.taxCodeValidator()]],
      emailAddress: ['', [Validators.required, Validators.maxLength(60), Validators.pattern(this.regexPatterns.email)]],
      vatNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(this.regexPatterns.vatNumber)]],
      activity: ['', Validators.required],
      province: ['', Validators.required],
      countryCode: ['', Validators.required],
      phoneNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.regexPatterns.phoneNumber)]],
      message: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10000)]],
    });
  }

  sendForm() {
    this.isFormSubmitted = true;
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.email = this.form.value;
      this.email.activity = this.email.activity.replaceAll("/", '_').replaceAll(" ", "_");
      this.email.countryCode = this.email.countryCode.valueOf();
      this.formService.sendEmail(this.email).subscribe({
        next: () => {
          this.showSuccess();
          this.form.reset();
        },
        error: (err: Error) => {
          this.errorDetail = err.message;
          this.showError(this.errorDetail);
        },
      });
    } else {
      this.errorDetail
      console.error('Form is invalid');
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Inviata', detail: 'Mail inviata correttamente' });
  }

  showError(errorDetail: string) {
    this.messageService.add({ severity: 'error', summary: 'Errore', detail: "Errore durante l'invio della mail\n-" + errorDetail });
  }
}