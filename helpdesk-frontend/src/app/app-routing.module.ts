import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'tickets',
    loadComponent: () => import('./components/ticket-list/ticket-list.component').then(m => m.TicketListComponent)
  },
  {
    path: 'ticket/new',
    loadComponent: () => import('./components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
  },
  {
    path: 'ticket/:id',
    loadComponent: () => import('./components/ticket-detail/ticket-detail.component').then(m => m.TicketDetailComponent)
  },
  {
    path: 'ticket/edit/:id',
    loadComponent: () => import('./components/ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }