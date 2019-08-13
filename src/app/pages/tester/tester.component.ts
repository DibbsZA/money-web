import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'src/app/services/schema.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { FormControl } from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';

import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {

  mydate;
  surname = new FormControl('');
  names = new FormControl('');
  sex = new FormControl('');
  nationality = new FormControl('');
  status = new FormControl('');
  email = new FormControl('');

  schemaData: Observable<any>;
  bsModalRef: BsModalRef;

  totalItems = 15;
  currentPage = 4;


  constructor(
    private vcxSchemaSvc: SchemaService,
    private vcxConnectionSvc: ConnectionService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  async fillWithIndy() {

    // 1st Generate random name for new connection for user
    // In real world we could use applicant OTP verified phone number?
    const connectName = 'calculating-3080a3e5-7b04-471f-b7d6-4763fc9b5229'; // faker.hacker.ingverb() + '-' + faker.random.uuid();
    console.log('random connection name: ' + connectName);

    // Check if we don't have connection name already
    try {
      await this.vcxConnectionSvc
        .apiConnectionsIdInviteGet(connectName)
        .toPromise()
        .then(invite => {
          // The user does exist so show the QR again.
          console.log('TCL: TesterComponent -> fillWithIndy -> invite', invite);
          this.openModalWithComponent(invite.invitationString);

        })
        .catch(async e => {
          console.log('TCL: TesterComponent -> fillWithIndy -> error', e);
          const error: HttpErrorResponse = e;
          if (error.status === 404) {
            // The user does not exist so go ahead an create it!
            await this.vcxConnectionSvc
              .apiConnectionsIdPost(connectName)
              .toPromise()
              .then(async x => {
                console.log('TCL: TesterComponent -> fillWithIndy -> x', x);

                // User is created so now we try get the invite code again.
                await this.vcxConnectionSvc
                  .apiConnectionsIdInviteGet(connectName)
                  .toPromise()
                  .then(invite => {
                    console.log('TCL: TesterComponent -> fillWithIndy -> invite', invite);
                    this.openModalWithComponent(invite.invitationString);

                  })
                  .catch();

              })
              // tslint:disable-next-line: no-shadowed-variable
              .catch(async e => {
                console.log('TCL: TesterComponent -> fillWithIndy -> error', e);
                // tslint:disable-next-line: no-shadowed-variable
                const error: HttpErrorResponse = e;
                if (error.status === 404) {

                }
              });
          }

        })
        // .subscribe()
        ;
    } catch (error) {


    }



    // console.log('TCL: TesterComponent -> fillWithIndy -> conncheck', conncheck);

    // Send request to create new connection

    // Get the invite data for the connection

    // show modal with QR code

    // send proof request

    // fill in form with response
  }

  public getSchema() {
    this.schemaData = this.vcxSchemaSvc.apiSchemasGet();
  }

  openModalWithComponent(data) {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
      ],
      title: 'Modal with component',
      qrdata: data
    };
    this.bsModalRef = this.modalService.show(ShowqrComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
