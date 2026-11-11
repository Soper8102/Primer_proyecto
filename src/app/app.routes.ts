import { Routes } from '@angular/router';
import { Clientes } from './Views/clientes/clientes';
import { Inventarios } from './Views/inventarios/inventarios';
import { Compras } from './Views/compras/compras';
import { Usuarios } from './Views/usuarios/usuarios';
import { PerroComponent } from './Views/perro/perro';
import { LoginComponent } from './Views/login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'clientes', component: Clientes },
    { path: 'inventarios', component: Inventarios },
    { path: 'compras', component: Compras },
    { path: 'usuarios', component: Usuarios },
    { path: 'perro', component: PerroComponent },
];
