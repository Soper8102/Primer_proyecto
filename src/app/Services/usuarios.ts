import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private url = `${API_BASE_URL}/api/usuarios`;
    constructor(private http: HttpClient) { }

    // Iniciar sesión
    login(data: Partial<Usuario>): Observable<any> {
        return this.http.post<any>(`${this.url}/login`, data);
    }

    // Registrar nuevo usuario
    registro(data: Partial<Usuario>): Observable<any> {
        return this.http.post<any>(`${this.url}/registro`, data);
    }

    // Método previo por compatibilidad
    postUsuarios(data: Partial<Usuario>): Observable<Usuario> {
        return this.http.post<Usuario>(this.url, data);
    }
}