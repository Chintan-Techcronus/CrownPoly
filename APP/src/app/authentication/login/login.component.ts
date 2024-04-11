// login.component.ts
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pin: number = 0;
  loginForm!: FormGroup;
  submitted = false;
  isLoading: any;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notificationService: NotificationService) { }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm() {
    this.loginForm = this.fb.group({
      pin: ['', [Validators.required]]
    });
  }

  login(): void {
    this.isLoading = true;
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // if (this.pin != null && this.pin > 0) 
    if (this.loginForm.valid) {
      this.pin = this.loginForm.get('pin')?.value;
      this.authService.login(this.pin).subscribe((data : any) => {
        if(data==null){
          this.isLoading = false;
            this.notificationService.showError(
              'Invalid credentials. Please try again.',
              'Error'
            );
        }
        else{
          const user = data.user;
          if (user.isActive == true) {
            this.notificationService.showSuccess('Login successful', 'Success');
            const userRole = this.authService.getUserDetails();
            const selectedProdLines = this.authService.getSelectedProdLines();
            if (parseInt(userRole?.roleId?.toString() ?? '0', 10) === 1) {
              localStorage.setItem("logIn", formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en')); 
              setTimeout(() => {
                this.isLoading = false;
              }, 500);  
              this.router.navigate(['/reactivate-line']);
            }
            else if (selectedProdLines && selectedProdLines.length === 1) {
              localStorage.setItem("logIn", formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'));
              const prodLineName = selectedProdLines[0].Name; 
              localStorage.setItem("prodLineName", prodLineName); //add Name in user model
              setTimeout(() => {
                this.isLoading = false;
              }, 500);  
              this.authService.openShiftLinePopup(prodLineName);
            }
            else if (selectedProdLines && selectedProdLines.length > 1) {
              localStorage.setItem("logIn", formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en'));
              setTimeout(() => {
                this.isLoading = false;
              }, 500);  
              this.router.navigate(['/prod-line-list']);
            }
            else if (selectedProdLines?.length == 0) {
              this.isLoading = false;
              Swal.fire({
                icon: 'warning',
                title: 'You do not have any production line. Contact Plant Manager.',
                showConfirmButton: false,
                timer: 5000
              });
            }
            else {
              console.error('No selected prodlines found.');
            }
          } 
          else if (user.isActive == false) {
            this.isLoading = false;
            this.notificationService.showError(
              'Inactive user, Please contact admin',
              'Error'
            );
          }
          else {
            this.isLoading = false;
            this.notificationService.showError(
              'Invalid credentials. Please try again.',
              'Error'
            );
          }}
      });
    } else {
      console.error('PIN is required.');
      this.isLoading = false;
    }
  }

}

