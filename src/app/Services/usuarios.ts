import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; import { Observable } from 'rxjs';
import { Usuario } from '../Models/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private url = 'http://localhost:3000/api/usuarios';
    constructor(private http: HttpClient) { }

    postUsuarios(data: Partial<Usuario>): Observable<Usuario> {
        return this.http.post<Usuario>(this.url, data);
    }
}