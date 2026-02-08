import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { AuthenticationService } from '../../../services/authentication.service';
import { toast } from 'ngx-sonner';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'login-page',
  imports: [HlmCardImports, HlmButtonImports, HlmLabelImports, HlmInputImports, HlmFormFieldImports, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html'
})
export class LoginPage {

  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  loginForm = new FormGroup({
    username: new FormControl<String>("", [Validators.required, Validators.minLength(8)]),
    password: new FormControl<String>("", [Validators.required, Validators.minLength(8)])
  });

  send() {
    if (this.loginForm.valid && this.loginForm.controls.username.value && this.loginForm.controls.password.value) {
      this.authenticationService.login(
        {
          username: this.loginForm.controls.username.value as string,
          password: this.loginForm.controls.password.value as string
        }
      ).subscribe({
        next: () => {
          toast.success("Logged in successfuly !");
          this.router.navigate([""]);
        }, error(err) {
          toast.error("Error, please check your credentials !");
        },
      });
    }
  }


}
