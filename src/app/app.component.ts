import { Component } from '@angular/core';
import { SchemaService } from './services/schema.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'money-web';

  schemaData: Observable<any>;
  mydate;
  surname = new FormControl('');
  names = new FormControl('');
  sex = new FormControl('');
  nationality = new FormControl('');
  status = new FormControl('');
  email = new FormControl('');

  constructor(
    private schemaSvc: SchemaService,
  ) {
    this.mydate = Date.now();
  }


  public getSchema() {
    this.schemaData = this.schemaSvc.apiSchemasGet();
  }
}
