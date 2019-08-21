import { Component, OnInit, EventEmitter } from '@angular/core';
import { SchemaService } from 'src/app/services/schema.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { concatMap, map, merge, switchMap, tap, delay, skip } from 'rxjs/operators';
import { concat, of, Observable, BehaviorSubject, timer } from 'rxjs';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { FormControl } from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';
import { GlobalEventService } from 'src/app/services/global-event.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { ProofsService } from 'src/app/services/proofs.service';

import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { Connection } from 'src/app/models/connection.model';
import { CreateProof, InvitationString } from 'src/app/models/models';

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

  connectionsData$: Observable<Connection[]>;
  connectionData$: Observable<Connection>;
  load$ = new BehaviorSubject('');
  connectName: any;
  pollCount = 0;
  connectionEstablished: boolean;




  constructor(
    private vcxSchemaSvc: SchemaService,
    private vcxConnectionSvc: ConnectionService,
    private vcxCredSvc: CredentialsService,
    private vcxProofSvc: ProofsService,
    private modalService: BsModalService,
    private eventSvc: GlobalEventService,
  ) {

  }

  ngOnInit() {
  }

  async fillWithIndy() {

    // 1st Generate random name for new connection for user
    // In real world we could use applicant OTP verified phone number/token?
    this.mydate = Date.now().valueOf();
    this.connectName = this.mydate.toString();

    const arr = new Int32Array(1);
    crypto.getRandomValues<Int32Array>(arr);
    const token = arr[0].toString();
    console.log('TCL: SignupComponent -> invite -> token', token);

    // Check if we don't have connection name already
    try {

      await this.vcxConnectionSvc
        .connectionCreate(this.connectName)
        .toPromise()
        .then(async x => {
          console.log('TCL: TesterComponent -> fillWithIndy -> x', x);

          // User is created so now we try get the invite code
          await this.vcxConnectionSvc
            .connectionInvitationGet(this.connectName)
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
    this.schemaData = this.vcxSchemaSvc.schemasGet();
    this.connectionsData$ = this.vcxConnectionSvc.connectionsGet();
  }

  public async addConnection() {
    this.mydate = Date.now().valueOf();
    this.connectName = this.mydate.toString();
    console.log('random connection name: ' + this.connectName);
    return await this.vcxConnectionSvc
      .connectionCreate(this.connectName)
      .toPromise()
      .then(async connResult => {
        console.log('TCL: TesterComponent -> fillWithIndy -> connResult', connResult);

        return connResult;

      })
      // tslint:disable-next-line: no-shadowed-variable
      .catch(async e => {
        console.log('TCL: TesterComponent -> fillWithIndy -> error', e);
        // tslint:disable-next-line: no-shadowed-variable
        const error: HttpErrorResponse = e;
        return e;
      });
  }

  /**
   * pollConnectionEstablished
   */
  public async pollConnectionEstablished(id) {
    this.pollCount = 0;
    const connection$ = this.vcxConnectionSvc.connectionGet(id);

    let whenToRefresh$ = of('').pipe(
      delay(5000),
      tap(_ => {
        if (this.connectionEstablished) {
          this.load$.unsubscribe();
          whenToRefresh$ = null;
          console.log('stop polling');
        } else {
          this.load$.next('');
        }

      }),
      skip(1),
    );

    // User is created so now we try get the invite code
    await this.vcxConnectionSvc
      .connectionInvitationGet(id)
      .toPromise()
      .then(invite => {
        // Intercept & replace invitation data for now
        const inv: InvitationString = JSON.parse(invite.invitationString);
        inv.s.l = 'https://pbs.twimg.com/profile_images/1036552935658926081/bfjI50Q1_normal.jpg';
        inv.s.n = 'SAFBC Bank3';
        console.log('TCL: TesterComponent -> fillWithIndy -> inv', JSON.stringify(inv));
        console.log('TCL: TesterComponent -> fillWithIndy -> invite', invite);
        this.openModalWithComponent('Scan with your Identity Wallet App', '', JSON.stringify(inv));


      })
      .catch();

    const poll$ = concat(connection$, whenToRefresh$);

    this.connectionData$ = this.load$.pipe(
      concatMap(_ => poll$),
      map((response: Connection) => {
        this.pollCount++;
        if (response.state === 4) {
          this.connectionEstablished = true;
          this.eventSvc.announceEmmiter$.emit({ connectionEstablished: true });
          // now we can request credentials proof
          this.sendCredentialRequest(id);
        }
        return response;
      }),
    );

  }

  public async getConnectionId(id: string) {
    this.connectionData$ = this.vcxConnectionSvc.connectionGet(id);
  }

  public async sendCredentialRequest(id) {
    const req: CreateProof = {
      attributes: ['email'],
      name: 'Email'
    };

    await this.vcxProofSvc.proofRequest(req, id)
      .toPromise()
      .then(r => {
        console.log('TCL: TesterComponent -> sendCredentialRequest -> r', r);

      })
      .catch(e => {
        console.log('TCL: TesterComponent -> sendCredentialRequest -> e', e);

      });
  }

  openModalWithComponent(titleValue: string, textValue?: string, qrData?: string) {
    const initialState = {
      title: titleValue,
      text: textValue,
      invitedata: qrData
    };
    this.bsModalRef = this.modalService.show(ShowqrComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
