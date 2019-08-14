import { Component, OnInit, Input } from '@angular/core';
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
  invitedata: string;

  angularxQrCode: string;

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit() {

    this.angularxQrCode = this.invitedata;
  }

}
