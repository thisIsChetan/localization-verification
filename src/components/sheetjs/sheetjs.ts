import { Component } from '@angular/core';

/**
 * Generated class for the SheetjsComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'sheetjs',
  templateUrl: 'sheetjs.html'
})
export class SheetjsComponent {

  text: string;

  constructor() {
    console.log('Hello SheetjsComponent Component');
    this.text = 'Hello World';
  }

}
