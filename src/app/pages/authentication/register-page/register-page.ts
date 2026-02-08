import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { AuthenticationService } from '../../../services/authentication.service';
import type { RegisterRequestInterface } from '../../../interfaces/authentication.interface';
import { toast } from 'ngx-sonner';

export const matchPasswordValidator = (
  passwordKey: string,
  confirmKey: string
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value;
    const confirm = group.get(confirmKey)?.value;

    if (!password || !confirm) return null;

    return password === confirm ? null : { passwordMismatch: true };
  };
};

@Component({
  selector: 'register-page',
  imports: [HlmCardImports, HlmButtonImports, HlmLabelImports, HlmInputImports, HlmFormFieldImports, ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  authenticationService = inject(AuthenticationService);
  router = inject(Router); 
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    ]),

    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    dateOfBirth: new FormControl('', [
      Validators.required,
    ]),

    description: new FormControl('', [
      Validators.maxLength(255),
    ]),
  }, {
    validators: matchPasswordValidator('password', 'confirmPassword')
  });

  submit() {

    if (this.registerForm.valid) {
      const form = this.registerForm.controls;
      const payload: RegisterRequestInterface = {
        username: form.username.value as string,
        email: form.email.value as string,
        password: form.password.value as string,
        birthDate: form.dateOfBirth.value as string,
        description: form.description.value as string,
      };

      this.authenticationService.register(payload).subscribe({
        next: () => {
          toast.success("Account created, please connect.");
          this.router.navigate(["/login"]);
        }, error: (err) => {
          toast.error("An error has occured during the registration, please checks your form and try again.");
        }
      });
    }
  }
}
