import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  isEditMode = false;
  ticketId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.ticketId = +id;
      this.loadTicket(this.ticketId);
    }
  }

  loadTicket(id: number): void {
    this.ticketService.getTicket(id).subscribe(
      (data) => {
        this.ticketForm.patchValue(data);
      },
      (error) => {
        console.error('Error al cargar el ticket:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      if (this.isEditMode && this.ticketId) {
        this.ticketService.updateTicket(this.ticketId, this.ticketForm.value).subscribe(
          () => {
            this.navigateToTickets();
          },
          (error) => {
            console.error('Error al actualizar el ticket:', error);
          }
        );
      } else {
        this.ticketService.createTicket(this.ticketForm.value).subscribe(
          () => {
            this.navigateToTickets();
          },
          (error) => {
            console.error('Error al crear el ticket:', error);
          }
        );
      }
    }
  }

  navigateToTickets(): void {
    this.router.navigate(['/tickets']);
  }
}