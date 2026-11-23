import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  styleUrl: './table.css',
  templateUrl: './table.html',
})
export class Table implements OnChanges {
  // Datos que vienen del backend (cuerpo del JSON de la BD)
  @Input() dataSource: any[] = [];

  // Columnas extraídas automáticamente a partir de las claves (keys) del JSON
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      this.generarColumnasDesdeJson();
    }
  }

  // Genera las columnas dinámicamente según la estructura del primer objeto del JSON
  private generarColumnasDesdeJson(): void {
    if (this.dataSource && this.dataSource.length > 0) {
      this.displayedColumns = Object.keys(this.dataSource[0]);
    } else {
      this.displayedColumns = [];
    }
  }

  // Formato simple para los encabezados (ej: "categoria_nombre" -> "Categoria Nombre")
  formatHeader(key: string): string {
    if (!key) return '';
    if (key.toLowerCase() === 'id') return 'ID';
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
