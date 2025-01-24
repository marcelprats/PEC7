import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserStoreService } from '../../services/user-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;  // 🔹 Formulari reactiu

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userStore: UserStoreService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {  // 🔹 Funció per gestionar el login
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.userService.login(username, password).subscribe(response => {
        if (response.token) {
          this.userStore.setToken(response.token);
          this.router.navigate(['/article/list']);
        } else {
          alert("Credencials incorrectes!");
        }
      }, error => {
        alert("Error en l'autenticació!");
      });
    }
  }
}
