import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service'; // Asegúrate de importar el servicio correcto
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      alert("Por favor, completa todos los campos");
      return;
    }

    const { username, password } = this.loginForm.value;

    this.userService.login(username, password).subscribe({
      next: (response) => {
        console.log("Login exitoso:", response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Error en login:", err);
        alert("Credenciales incorrectas");
      }
    });
  }
}
