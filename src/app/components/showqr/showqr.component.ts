import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-showqr',
  templateUrl: './showqr.component.html',
  styleUrls: ['./showqr.component.css']
})
export class ShowqrComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  public angularxQrCode: string = null;

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit() {

    // FIXME: Show the data that is passed in and not sample text!!!!

    this.list.push('PROFIT!!!');
    // assign a value
    this.angularxQrCode = 'Your QR code data string';
  }

}
