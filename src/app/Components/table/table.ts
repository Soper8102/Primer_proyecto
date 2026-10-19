import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../../Models/ClientesModels';

@Component({
  imports: [MatTableModule],
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table {
  @Input() dataSource: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'estado'];
}
