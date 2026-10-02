import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface Cliente {
  nombre: string;
  apellido: string;
  edad: number;
  sexo: string;
}

const CLIENTE_DATA: Cliente[] = [
  { nombre: 'Carlos', apellido: 'Gómez', edad: 28, sexo: 'M' },
  { nombre: 'María', apellido: 'Rodríguez', edad: 34, sexo: 'F' },
  { nombre: 'Juan', apellido: 'Pérez', edad: 45, sexo: 'M' },
  { nombre: 'Ana', apellido: 'Martínez', edad: 22, sexo: 'F' },
  { nombre: 'Luis', apellido: 'Hernández', edad: 31, sexo: 'M' },
  { nombre: 'Laura', apellido: 'Díaz', edad: 29, sexo: 'F' },
  { nombre: 'Pedro', apellido: 'Torres', edad: 52, sexo: 'M' },
  { nombre: 'Sofía', apellido: 'Vargas', edad: 26, sexo: 'F' },
  { nombre: 'Diego', apellido: 'Castro', edad: 39, sexo: 'M' },
  { nombre: 'Elena', apellido: 'Morales', edad: 41, sexo: 'F' },
];
@Component({
  imports: [MatTableModule],
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table {
  displayedColumns: string[] = ['nombre', 'apellido', 'edad', 'sexo'];
  dataSource = CLIENTE_DATA;
}
