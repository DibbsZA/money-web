import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalEventService, Announcement } from 'src/app/services/global-event.service';


@Component({
  selector: 'app-showqr',
  templateUrl: './showqr.component.html',
  styleUrls: ['./showqr.component.css']
})
export class ShowqrComponent implements OnInit {
  title: string = null;
  text: string = null;
  closeBtnName: string;
  invitedata: string;

  angularxQrCode: string = null;

  constructor(
    public bsModalRef: BsModalRef,
    private eventSvc: GlobalEventService
  ) {
  }

  ngOnInit() {

    this.eventSvc.announceEmmiter$.subscribe(item => {
      if (item) {
        const announcement: Announcement = item;
        if (announcement.connectionEstablished) {
          this.eventSvc.announceEmmiter$.unsubscribe();
          this.bsModalRef.hide();
        }
      }
    });
    if (this.invitedata !== '') {
      this.angularxQrCode = this.invitedata;
    } else {
      this.angularxQrCode = null;
    }

  }

  close() {
    this.eventSvc.announceEmmiter$.unsubscribe();
    this.bsModalRef.hide();
  }
}
