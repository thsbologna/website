import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CompanyComponent } from './components/company/company.component';
import { ReferencesComponent } from './components/references/references.component';
import { PartnersComponent } from './components/partners/partners.component';
import { StoreComponent } from './components/store/store.component';
import { ContactsComponent } from './components/contacts/contacts.component';

export const routes: Routes = [
    {
        path: 'home',
        title: 'TH&S Bologna SRL - Soluzioni Informatiche',
        component: HomeComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'azienda',
        component: CompanyComponent,
        title: 'TH&S Bologna SRL - Azienda',
    },
    {
        path: 'referenze',
        component: ReferencesComponent,
        title: 'TH&S Bologna SRL - Referenze',
    },
    {
        path: 'partners',
        component: PartnersComponent,
        title: 'TH&S Bologna SRL - Partners',
    },
    {
        path: 'store',
        component: StoreComponent,
        title: 'TH&S Bologna SRL - Store',
    },
    {
        path: 'contatti',
        component: ContactsComponent,
        title: 'TH&S Bologna SRL - Contatti',
    },
];
