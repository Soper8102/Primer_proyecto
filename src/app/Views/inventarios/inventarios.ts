import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table } from '../../Components/table/table';
import { ComponentesService } from '../../Services/componentes';
import { Componente } from '../../Models/ComponenteModels';

@Component({
  imports: [CommonModule, Table],
  selector: 'app-inventarios',
  styleUrl: './inventarios.css',
  templateUrl: './inventarios.html',
})
export class Inventarios implements OnInit {
  componentes = signal<Componente[]>([]);

  // Configuración para la tabla genérica
  columnasInventario = [
    { key: 'id', header: 'ID' },
    { key: 'nombre', header: 'Componente' },
    { key: 'marca', header: 'Marca' },
    { key: 'categoria_nombre', header: 'Categoría' },
    { key: 'precio', header: 'Precio' },
    { key: 'unidades', header: 'Stock' },
    { key: 'estado', header: 'Estado' }
  ];

  loading = signal<boolean>(true);
  error = signal<string>('');

  constructor(
    private componentesService: ComponentesService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarComponentes();
  }

  cargarComponentes(): void {
    this.loading.set(true);
    this.error.set('');
    this.componentesService.getComponentes().subscribe({
      next: (data) => {
        this.componentes.set(data);
        this.loading.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error al cargar componentes:', err);
        this.error.set('Error al cargar los datos del inventario. Verifica que el backend esté en ejecución.');
        this.loading.set(false);
        this.cdr.markForCheck();
      }
    });
  }
}
