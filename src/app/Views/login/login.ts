import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../Services/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private usuarioService = inject(UsuarioService);

  // Bandera para alternar entre el formulario de Login y Registro
  esRegistro: boolean = false;

  // Controles de visibilidad de contraseña
  ocultarPassword = true;
  ocultarConfirmPassword = true;

  // ==========================================
  // 1. FORMULARIO DE LOGIN (Reactive Forms)
  // ==========================================
  loginForm: FormGroup = this.fb.group({
    usuario: ['', [Validators.required]],
    contrasena: ['', [Validators.required]]
  });

  // ==========================================
  // 2. FORMULARIO DE REGISTRO (Reactive Forms)
  // ==========================================
  registroForm: FormGroup = this.fb.group(
    {
      usuario: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, this.validadorSeguridadPassword]],
      confirmarContrasena: ['', [Validators.required]]
    },
    { validators: this.validadorCoincidenciaPasswords }
  );

  // ==========================================
  // VALIDADORES PERSONALIZADOS (Custom Validators)
  // ==========================================

  /**
   * Validador de seguridad de contraseña:
   * Requiere mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.
   */
  validadorSeguridadPassword(control: AbstractControl): ValidationErrors | null {
    const valor = control.value || '';
    const tieneMinimo8 = valor.length >= 8;
    const tieneMayuscula = /[A-Z]/.test(valor);
    const tieneMinuscula = /[a-z]/.test(valor);
    const tieneNumero = /\d/.test(valor);
    const tieneEspecial = /[!@#$%^&*(),.?":{}|<>_\-]/.test(valor);

    const esValida = tieneMinimo8 && tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;

    return esValida ? null : { passwordInsegura: true };
  }

  /**
   * Validador a nivel de formulario para verificar que la contraseña y su confirmación coincidan.
   */
  validadorCoincidenciaPasswords(control: AbstractControl): ValidationErrors | null {
    const pass = control.get('contrasena')?.value;
    const confirm = control.get('confirmarContrasena')?.value;

    if (pass && confirm && pass !== confirm) {
      control.get('confirmarContrasena')?.setErrors({ noCoincide: true });
      return { noCoincide: true };
    }
    return null;
  }

  // ==========================================
  // MÉTODOS DE ACCIÓN Y ALERTAS CON SWEETALERT2
  // ==========================================

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { usuario, contrasena } = this.loginForm.value;

    this.usuarioService.login({ usuario, contrasena }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: 'Inicio de sesión exitoso',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.router.navigate(['/clientes']);
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de acceso',
          text: err.error?.message || 'Usuario o contraseña incorrectos',
          confirmButtonColor: '#3f51b5'
        });
      }
    });
  }

  onRegistro(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    const { usuario, contrasena } = this.registroForm.value;

    this.usuarioService.registro({ usuario, contrasena }).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: '¡Completado!',
          text: 'Registro exitoso. Ya puedes iniciar sesión',
          confirmButtonColor: '#3f51b5'
        }).then(() => {
          this.esRegistro = false;
          this.registroForm.reset();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: err.error?.message || 'No se pudo registrar el usuario',
          confirmButtonColor: '#3f51b5'
        });
      }
    });
  }

  alternarVista(): void {
    this.esRegistro = !this.esRegistro;
    this.loginForm.reset();
    this.registroForm.reset();
  }
}
