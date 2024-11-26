    import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
    import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from 'src/app/services/authorize/auth.service';

    @Component({
      selector: 'app-login',
      standalone: true,
      imports: [FormsModule, CommonModule],
      templateUrl: './login.component.html',
      styleUrl: './login.component.css'
    })
    export class LoginComponent {
      errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(form: any): void {
    if (form.invalid) return;

    const { username, password } = form.value;

    this.authService.login(username, password).subscribe(
      (response: any) => {
        // Spremi token u lokalnu memoriju
        localStorage.setItem('token', response.token);
        this.router.navigate(['/schedule']);
      },
      error => {
        this.errorMessage = 'Wrong username or password';
      }
    );
  }
    
}
