import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../Models/ClientesModels';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {
    private readonly baseUrl = 'http://localhost:3000/api/v1/clientes';

    constructor(private http: HttpClient) { }

    // GET: Obtener todos los clientes o un cliente por ID
    getClients(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.baseUrl);
    }


    getClientById(id: number | string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    // POST: Crear un nuevo cliente
    createClient(data: any): Observable<any> {
        return this.http.post<any>(this.baseUrl, data);
    }

    // PUT: Reemplazo completo del recurso
    updateClient(id: number | string, data: any): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${id}`, data);
    }

    // PATCH: Actualización parcial
    patchClient(id: number | string, data: any): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/${id}`, data);
    }

    // DELETE: Eliminar un cliente
    deleteClient(id: number | string): Observable<any> {
        return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }

    // HEAD: Solo obtiene las cabeceras (sin body)
    checkHeaders(): Observable<any> {
        return this.http.head<any>(this.baseUrl, { observe: 'response' });
    }

    // OPTIONS: Consultar métodos permitidos por el endpoint
    getOptions(): Observable<any> {
        return this.http.options<any>(this.baseUrl, { observe: 'response' });
    }
}
