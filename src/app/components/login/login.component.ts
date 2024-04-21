import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from '../../services/auth.service';
import { ApiResponse } from '../../../assets/Models/DTO/ApiResponse';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    StyleClassModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,  private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSignIn() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      
      this.authService.signIn(email, password).subscribe(
        (response: any) => {
          console.log('Sign-in response:', response); // Log the response to see its structure
          if (response && response.message === 'Login Successful') {
            localStorage.setItem('Access_Token', response.data.token);
            this.router.navigate(['/home']);
          } else {
            console.error('Login failed:', response);
          }
        },
        (error: any) => {
          console.error('Login error:', error);
        }
      );
    }
  }
}