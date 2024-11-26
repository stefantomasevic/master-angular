import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authorize/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) return;

    const { username, email, password } = this.signUpForm.value;

    this.authService.signUp(username, email, password).subscribe(
      (response: any) => {
        // Posle uspešne registracije, možete preusmeriti korisnika ili pokazati poruku
        console.log('Registracija uspešna');
      },
      error => {
        this.errorMessage = 'Neuspešna registracija. Pokušajte ponovo.';
      }
    );
  }
}
