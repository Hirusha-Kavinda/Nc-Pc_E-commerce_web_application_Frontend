import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import  AOS from 'aos';

AOS.init();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm : FormGroup;

  constructor(private auth: AuthService, private router: Router) {}


  
  

  ngOnInit(): void {
    AOS.init();

    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });



    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin']);

      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
      });

      if (this.auth.isLoggedIn()) {
        this.router.navigate(['admin']);
      }

    }
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          this.router.navigate(['/admin']);
        },
        (err: Error) => {

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })


          Toast.fire({
            icon: 'error',
            title: 'Email or the password is incorrect!'
        
          })

       
        }
      );
    }
  }





get email(): FormControl {
  return this.loginForm.get('email') as FormControl;
}

get password(): FormControl {
  return this.loginForm.get('password') as FormControl;
}

}
