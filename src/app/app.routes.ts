import { Routes } from '@angular/router';
import { Clientes } from './Views/clientes/clientes';
import { Inventarios } from './Views/inventarios/inventarios';
import { Compras } from './Views/compras/compras';
import { Usuarios } from './Views/usuarios/usuarios';


export const routes: Routes = [

    { path: 'clientes', component: Clientes },
    { path: 'inventarios', component: Inventarios },
    { path: 'compras', component: Compras },
    { path: 'usuarios', component: Usuarios },
];
