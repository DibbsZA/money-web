import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  mydate;
  surname = new FormControl('');
  names = new FormControl('');
  sex = new FormControl('');
  nationality = new FormControl('');
  status = new FormControl('');
  email = new FormControl('');

  bsModalRef: BsModalRef;

  constructor(
    private modalService: BsModalService
  ) {
    this.mydate = Date.now();
  }



}
