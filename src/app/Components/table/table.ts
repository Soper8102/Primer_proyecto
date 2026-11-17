import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface TableColumn {
  key: string;     // Propiedad del objeto (ej. 'nombre', 'precio')
  header: string;  // Título visible de la columna (ej. 'Nombre', 'Precio')
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table implements OnChanges {
  // Datos genéricos a mostrar (Clientes, Perros, Componentes, etc.)
  @Input() dataSource: any[] = [];

  // Configuración opcional de columnas a mostrar y sus encabezados
  @Input() columns: TableColumn[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] || changes['columns']) {
      this.cdr.markForCheck();
    }
  }

  // Si no se especifican columnas, se infieren automáticamente del primer objeto
  get effectiveColumns(): TableColumn[] {
    if (this.columns && this.columns.length > 0) {
      return this.columns;
    }
    if (this.dataSource && this.dataSource.length > 0) {
      return Object.keys(this.dataSource[0]).map((key) => ({
        key,
        header: this.formatHeader(key),
      }));
    }
    return [];
  }

  // Lista de identificadores de columna requeridos por mat-header-row y mat-row
  get displayedColumnKeys(): string[] {
    return this.effectiveColumns.map((col) => col.key);
  }

  // Formatea 'categoria_nombre' -> 'Categoria Nombre'
  private formatHeader(key: string): string {
    if (key.toLowerCase() === 'id') return 'ID';
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
