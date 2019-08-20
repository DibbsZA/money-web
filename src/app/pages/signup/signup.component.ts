import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { concatMap, map, merge, switchMap, tap, delay, skip } from 'rxjs/operators';
import { concat, of, Observable, BehaviorSubject, timer } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { ConnectionService } from 'src/app/services/connection.service';
import { ProofsService } from 'src/app/services/proofs.service';
import { GlobalEventService } from 'src/app/services/global-event.service';
import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { InvitationString, Connection, CreateProof } from 'src/app/models/models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  signupForm = this.fb.group({
    identityNumber: ['', [Validators.required, Validators.minLength(13)]],
    surname: [''],
    names: [''],
    initials: [''],
    sex: [''],
    nationality: [''],
    countryOfBirth: [''],
    status: [''],
    email: [''],
    cellphone: [''],
    title: [''],
    dateOfBirth: [''],
    address: ['']
  });


  bsModalRef: BsModalRef;
  connectName: string;
  mydate: number;
  indyLoading = false;
  indyStatusMessage: string;
  connectionEstablished: boolean;

  pollCount = 0;
  connectionsData$: Observable<Connection[]>;
  connectionData$: Observable<Connection>;
  load$ = new BehaviorSubject('');

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private vcxConnectionSvc: ConnectionService,
    private vcxProofSvc: ProofsService,
    private eventSvc: GlobalEventService,
  ) {
    this.indyStatusMessage = null;
    this.indyLoading = false;
  }

  ngOnInit(): void {
    // this.signupForm.patchValue({ identityNumber: '1234567890123' });
  }
  /**
   * invite
   */
  public async invite() {
    this.pollCount = 0;
    // 1st Generate random name for new connection for user
    // In real world we could use applicant OTP verified phone number/token?
    this.mydate = Date.now().valueOf();
    this.connectName = this.mydate.toString();
    console.log('date based connection name: ' + this.connectName);

    this.indyStatusMessage = 'Creating connection ...';

    await this.vcxConnectionSvc
      .connectionCreate(this.connectName)
      .toPromise()
      .then(async conn => {
        console.log('TCL: SignupComponent -> invite -> conn', conn);
        // Connection is created
        this.indyStatusMessage = 'Connection created. Getting invite data...';

        // set up connection observer
        const connection$ = this.vcxConnectionSvc.connectionGet(this.connectName);

        // setup observer polling logic
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

        // Connection is created so now we try get the invite code.
        await this.vcxConnectionSvc
          .connectionInvitationGet(this.connectName)
          .toPromise()
          .then(invite => {
            // Intercept & replace invitation data for now
            const inv: InvitationString = JSON.parse(invite.invitationString);
            inv.s.l = 'https://pbs.twimg.com/profile_images/1036552935658926081/bfjI50Q1_normal.jpg';
            inv.s.n = 'SAFBC Bank2';
            console.log('TCL: TesterComponent -> fillWithIndy -> inv', JSON.stringify(inv));

            // This is where I need to poll if the connection was accepted
            this.indyStatusMessage = 'Found an invite. Showing QR';
            // show qr code
            this.openModalWithComponent('Scan with your Identity Wallet App', '', JSON.stringify(inv));


            const poll$ = concat(connection$, whenToRefresh$);
            this.connectionData$ = this.load$.pipe(
              concatMap(_ => poll$),
              map((response: Connection) => {
                console.log('pollcount', this.pollCount++);
                if (response.state === 4) {
                  this.connectionEstablished = true;

                  // send announcement to close modal
                  this.eventSvc.announceEmmiter$.emit({ connectionEstablished: true });
                  // now we can request credentials proof
                  this.sendCredentialRequest(this.connectName);
                }
                return response;
              }),
            );
          })
          .catch(e => {
            console.error('TCL: SignupComponent -> invite -> e', e);
          });
      })
      .catch(e => {
        console.error('TCL: SignupComponent -> invite -> e', e);
      });
  }

  public async sendCredentialRequest(id) {
    const req: CreateProof = {
      attributes: [
        'names',
        'surname',
        'identityNumber',
        'sex',
        'nationality',
        'dateOfBirth',
        'countryOfBirth',
        'status',
        // 'fullAddress',
        // 'cellphone',
        // 'email'
      ],
      name: 'FULL-KYC-' + id
    };

    this.indyStatusMessage = 'Sending proof request to your phone';
    this.openModalWithComponent(
      'Sending proof request to your phone',
      'Open your Identity app and approve the data request.',
      null);
    await this.vcxProofSvc.proofRequest(req, id)
      .toPromise()
      .then(async r => {
        console.log('TCL: TesterComponent -> sendProofRequest -> r', r);
        await this.vcxProofSvc.proofGet(r.id)
          .toPromise()
          .then(p => {
            console.log('TCL: SignupComponent -> proofGet -> p', p);

          })
          .catch(e => {
            console.log('TCL: SignupComponent -> proofGet -> e', e);

          });
      })
      .catch(e => {
        console.log('TCL: TesterComponent -> sendCredentialRequest -> e', e);

      });
  }


  onSubmit() {
    console.warn(this.signupForm.value);
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
