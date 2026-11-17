import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Table } from '../../Components/table/table';
import { PerrosService } from '../../Services/perros';
import { Perro } from '../../Models/PerroModels';

@Component({
  imports: [CommonModule, MatCardModule, MatIconModule, Table],
  selector: 'app-perro',
  styleUrl: './perro.css',
  templateUrl: './perro.html',
})
export class PerroComponent implements OnInit {
  perros = signal<Perro[]>([]);

  // Configuración para la tabla genérica
  columnasPerros = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Nombre' },
    { key: 'edad', header: 'Edad (años)' },
    { key: 'raza', header: 'Raza' },
    { key: 'color', header: 'Color' }
  ];

  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(
    private perrosService: PerrosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarPerros();
  }

  cargarPerros(): void {
    this.loading.set(true);
    this.error.set('');
    this.perrosService.getPerros().subscribe({
      next: (data) => {
        this.perros.set(data);
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar perros desde la base de datos:', err);
        this.error.set('Error al cargar los datos de los perros. Verifica que el backend esté en ejecución.');
        this.loading.set(false);
        this.cdr.markForCheck();
      }
    });
  }
}
