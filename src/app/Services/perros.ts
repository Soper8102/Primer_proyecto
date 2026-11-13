import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Perro } from '../Models/PerroModels';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class PerrosService {
    private readonly baseUrl = `${API_BASE_URL}/api/v1/perros`;

    constructor(private http: HttpClient) { }

    // GET: Obtener todos los perros
    getPerros(): Observable<Perro[]> {
        return this.http.get<Perro[]>(this.baseUrl).pipe(
            tap((data) => console.log('[PerrosService] Perros obtenidos de la BD:', data))
        );
    }

    // GET: Obtener un perro por id
    getPerroById(id: number | string): Observable<Perro> {
        return this.http.get<Perro>(`${this.baseUrl}/${id}`);
    }

    // POST: Crear un nuevo perro
    createPerro(data: Partial<Perro>): Observable<Perro> {
        return this.http.post<Perro>(this.baseUrl, data);
    }
}
