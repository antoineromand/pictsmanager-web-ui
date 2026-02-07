import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';

@Component({
  selector: 'login-page',
  imports: [HlmCardImports, HlmButtonImports, HlmLabelImports, HlmInputImports, HlmFormFieldImports, ReactiveFormsModule],
  templateUrl: './login-page.html'
})
export class LoginPage {
  loginForm = new FormGroup({
    username: new FormControl<String>(""),
    password: new FormControl<String>("")
  });

  send() {
    console.log(this.loginForm.value);
  }


}
