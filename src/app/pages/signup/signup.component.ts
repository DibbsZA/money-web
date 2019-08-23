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
import { EKyc } from 'src/app/models/e-kyc.model';

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
  proofReqUID: string;
  proofSent: boolean;

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



    this.createConnection(this.connectName).then(b => {
      console.log('promis returned true');

      this.showInviteQR(this.connectName);
      // .then(() => {
      //   this.pollConnectionEstablished(this.connectName);
      // });

      // .then(c => {
      //   if (this.connectionEstablished) {
      //     this.indyStatusMessage = 'Connection Established!!!';
      //     return true;
      //   }
      // });
    });

  }

  /**
   *
   */
  public createConnection(id) {
    return this.vcxConnectionSvc
      .connectionCreate(this.connectName)
      .toPromise()
      .then(conn => {
        console.log('TCL: SignupComponent -> createConnection -> conn', conn);
        // Connection is created
        this.indyStatusMessage = 'Connection created. returning';
        return true;
      });
  }

  /**
   * showInviteQR
   */
  public showInviteQR(id) {
    // User is created so now we try get the invite code
    return this.vcxConnectionSvc
      .connectionInvitationGet(id)
      .toPromise()
      .then(async invite => {
        // Intercept & replace invitation data for now
        const inv: InvitationString = JSON.parse(invite.invitationString);
        inv.s.l = 'https://pbs.twimg.com/profile_images/1036552935658926081/bfjI50Q1_normal.jpg';
        inv.s.n = 'SAFBC Bank ' + id;

        this.indyStatusMessage = 'Creating connection: ' + inv.s.n;
        // console.log('TCL: TesterComponent -> fillWithIndy -> inv', JSON.stringify(inv));
        // console.log('TCL: TesterComponent -> fillWithIndy -> invite', invite);
        this.openModalWithComponent('Scan with your Identity Wallet App', inv.s.n, JSON.stringify(inv));
        await this.pollConnectionEstablished(id);
        // return true;
      })
      .catch();
  }

  /**
   * pollConnectionEstablished
   */
  public pollConnectionEstablished(id) {
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

    const poll$ = concat(connection$, whenToRefresh$);

    this.load$
      .pipe(
        concatMap(_ => poll$),
        map((response: Connection) => {
          this.pollCount++;
          if (response.state === 4) {
            this.connectionEstablished = true;
            this.eventSvc.announceEmmiter$.emit({ connectionEstablished: true });
            // FIXME: The modal is closing, but click input to page is still blocked????

            // now we can request credentials proof
            this.sendCredentialRequest(id);
          }
          return response;
        }),
      ).subscribe(x => {
        console.log(x);
        return x;
      });
  }

  public sendCredentialRequest(id) {
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
        'fullAddress',
        // 'cellphone',
        // 'email'
      ],
      name: 'FULL-KYC-' + id
    };

    this.indyStatusMessage = 'Sending proof request to your phone: ' + id;
    // this.openModalWithComponent(
    //   'Sending proof request to your phone',
    //   'Open your Identity app and approve the data request.',
    //   null);
    this.vcxProofSvc
      .proofRequest(req, id)
      .pipe(
        tap(x => {
          console.log(x);
          this.proofReqUID = x.id;
          this.proofSent = true;
          return x.id;
        })
      )
      .subscribe();
    // .toPromise()
    // .then(async r => {
    //   console.log('TCL: TesterComponent -> sendProofRequest -> r', r);

    // })
    // .catch(e => {
    //   console.log('TCL: TesterComponent -> sendCredentialRequest -> e', e);
    //   return e;
    // });
  }

  getProofResponse(uuid) {

    let proofData: EKyc;

    this.vcxProofSvc.proofGet(uuid)
      .pipe(
        tap(p => {
          console.log(p);
          if (p.state === 'accepted') {
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < p.requestedAttrs.length; index++) {
              const attrName = p.requestedAttrs[index].name;
              const attrValu = p.proofData.shift();

              switch (attrName) {
                case 'names':
                  // this.signupForm.patchValue('names', )
                  break;
                case 'surname':

                  break;
                case 'identityNumber':

                  break;
                case 'sex':

                  break;
                case 'nationality':

                  break;
                case 'dateOfBirth':

                  break;
                case 'countryOfBirth':

                  break;
                case 'status':

                  break;
                case 'fullAddress':

                  break;

                default:
                  break;
              }
            }
          }
        })
      ).subscribe();
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
