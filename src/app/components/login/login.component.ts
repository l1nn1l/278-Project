import { Component, OnInit } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ApiResponse } from '../../../assets/Models/DTO/ApiResponse';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    StyleClassModule,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSignIn() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // this.onLoginClick(this.loginForm.value.email, this.loginForm.value.password)
    }
  }


  // onLoginClick(email:string, password:string) {
  //   console.log('Button Clicked');
    
  //   this.userService.signIn(email, password).subscribe(
  //     (response) => {
  //       console.log('Full response:', response); // Log the full response
  
  //       // Assuming the API response is directly the body if not use { observe: 'response' }
        
        
  //         if(response.statusCode==401){
  //           console.log('Token is invalid');
  //         }


  //         const apiResponse = new ApiResponse(
  //         response.message,
  //         response.statusCode,
  //         response.data
  //       );

  //       if(apiResponse.StatusCode == 200){ 
  //         //Here we save the tokens:
  //         localStorage.setItem('Access_Token',apiResponse.responseData.tokens.access_token)
  //         localStorage.setItem('Refresh_Token',apiResponse.responseData.tokens.refresh_token)
  //         // this.router.navigate(['/main/welcome']);
  //       }
  //       else{
      
  //       }
  //     },
  //     (error) => {
  //       // Handle any errors here
  //       console.error('Login error:', error);
  //     }
  //   );
  // }


  

}