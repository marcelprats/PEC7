import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.userService.register(username, password).subscribe(
        response => {
          console.log('Usuari registrat:', response);
          this.router.navigate(['/login']);
        },
        error => {
          this.errorMessage = 'Error en el registre. Intenta-ho de nou.';
          console.error('Error en el registre:', error);
        }
      );
    }
  }
}
