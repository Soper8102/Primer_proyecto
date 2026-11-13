import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Componente } from '../Models/ComponenteModels';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class ComponentesService {
    private readonly baseUrl = `${API_BASE_URL}/api/v1/componentes`;

    constructor(private http: HttpClient) { }

    // GET: Obtener todos los componentes
    getComponentes(): Observable<Componente[]> {
        return this.http.get<Componente[]>(this.baseUrl);
    }

    // GET: Obtener componente por ID
    getComponenteById(id: number | string): Observable<Componente> {
        return this.http.get<Componente>(`${this.baseUrl}/${id}`);
    }

    // POST: Crear un nuevo componente
    createComponente(data: any): Observable<Componente> {
        return this.http.post<Componente>(this.baseUrl, data);
    }

    // PUT: Actualizar componente
    updateComponente(id: number | string, data: any): Observable<Componente> {
        return this.http.put<Componente>(`${this.baseUrl}/${id}`, data);
    }

    // DELETE: Eliminar componente
    deleteComponente(id: number | string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
}
