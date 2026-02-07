import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
