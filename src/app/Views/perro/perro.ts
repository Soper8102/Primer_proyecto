import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PerrosService } from '../../Services/perros';
import { Perro } from '../../Models/PerroModels';

@Component({
  imports: [CommonModule, MatTableModule, MatCardModule, MatIconModule],
  selector: 'app-perro',
  styleUrl: './perro.css',
  templateUrl: './perro.html',
})
export class PerroComponent implements OnInit {
  perros = signal<Perro[]>([]);
  displayedColumns: string[] = ['id', 'nombre', 'edad', 'raza', 'color'];
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
