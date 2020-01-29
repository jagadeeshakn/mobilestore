import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      country: [],
  });
  }

     // convenience getter for easy access to form fields
     get f() { return this.registerForm.controls; }

     onSubmit() {
      this.submitted = true;
         // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.loading = true;
      const user = this.registerForm.value;
      this.userService.createUser(user).subscribe((response: any) => {
      this.router.navigate(['/login'], { relativeTo: this.route });
    });
     }
}
