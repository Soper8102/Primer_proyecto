import { Component, OnInit } from '@angular/core';
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
  clientes: Cliente[] = [];

  constructor(
    private clientesService: ClientesService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientesService.getClients().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        console.log('Clientes recibidos del backend:', data);
      },
      error: (error) => {
        console.error('Error al consultar clientes:', error);
      }
    });
  }
}
