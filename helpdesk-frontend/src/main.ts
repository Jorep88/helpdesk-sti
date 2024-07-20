import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot([
      {
        path: 'dashboard',
        loadComponent: () => import('./app/components/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'tickets',
        loadComponent: () => import('./app/components/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
      },
      {
        path: 'ticket/new',
        loadComponent: () => import('./app/components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
      },
      {
        path: 'ticket/:id',
        loadComponent: () => import('./app/components/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
      },
      {
        path: 'ticket/edit/:id',
        loadComponent: () => import('./app/components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
      },
      {
        path: 'ticket/:id',
        loadComponent: () => import('./app/components/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
      },
      
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

    ]))
  ]
}).catch(err => console.error(err));