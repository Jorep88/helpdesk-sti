import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  ticket: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTicket(+id);
    }
  }

  loadTicket(id: number): void {
    this.ticketService.getTicket(id).subscribe(
      (data) => {
        this.ticket = data;
      },
      (error) => {
        console.error('Error al cargar el ticket:', error);
      }
    );
  }

  deleteTicket(): void {
    if (this.ticket && confirm('¿Estás seguro de que quieres eliminar este ticket?')) {
      this.ticketService.deleteTicket(this.ticket.id).subscribe(
        () => {
          this.router.navigate(['/tickets']);
        },
        (error) => {
          console.error('Error al eliminar el ticket:', error);
        }
      );
    }
  }
}