import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { Table } from '../../Components/table/table';
import { ClientesService } from '../../Services/clientes';
import { Cliente } from '../../Models/ClientesModels';

@Component({
  imports: [Table],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {
  clientes = signal<Cliente[]>([]);

  constructor(
    private clientesService: ClientesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.getClients().subscribe({
      next: (data: Cliente[]) => {
        this.clientes.set(data);
        this.cdr.markForCheck();
        console.log('Clientes recibidos del backend:', data);
      },
      error: (error) => {
        console.error('Error al consultar clientes:', error);
      }
    });
  }
}
