import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-tetris></app-tetris>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    console.log('AppComponent initialized');
  }
}
