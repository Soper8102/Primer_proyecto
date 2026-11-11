import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../../Models/ClientesModels';

@Component({
  imports: [MatTableModule],
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table implements OnChanges {
  @Input() dataSource: Cliente[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'email', 'telefono', 'direccion', 'estado'];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.cdr.markForCheck();
    }
  }
}
