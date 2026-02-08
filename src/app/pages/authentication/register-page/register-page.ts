import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, type AbstractControl, type ValidationErrors, type ValidatorFn } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

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
    console.log(this.registerForm.value);
  }
}
