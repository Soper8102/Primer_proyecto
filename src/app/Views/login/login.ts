import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from '../../Services/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Variables para capturar los datos de los inputs
  usuario: string = '';
  contrasena: string = '';

  // Variable para mostrar mensajes de error si falla el login
  mensajeError: string = '';

  // Control visual para ver u ocultar contraseña
  hidePassword = true;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  iniciarSesion(): void {
    // Validación básica de campos vacíos
    if (!this.usuario || !this.contrasena) {
      this.mensajeError = 'Por favor completa todos los campos';
      return;
    }

    this.mensajeError = '';

    // Llamamos al servicio pasando los datos del usuario
    this.usuarioService.postUsuarios({
      usuario: this.usuario,
      contrasena: this.contrasena
    }).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        // Redirigimos al usuario a la vista principal
        this.router.navigate(['/clientes']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
