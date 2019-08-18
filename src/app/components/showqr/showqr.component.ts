import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalEventService, Announcement } from 'src/app/services/global-event.service';


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
    this.angularxQrCode = this.invitedata;
  }

  close() {
    this.eventSvc.announceEmmiter$.unsubscribe();
    this.bsModalRef.hide();
  }
}
