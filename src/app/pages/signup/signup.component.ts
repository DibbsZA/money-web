import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormControlName, FormGroup, FormControl } from '@angular/forms';
import { concat, of, Observable, BehaviorSubject, timer, empty } from 'rxjs';
import { concatMap, map, tap, delay, skip } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { ConnectionService } from 'src/app/services/connection.service';
import { ProofsService } from 'src/app/services/proofs.service';
import { GlobalEventService } from 'src/app/services/global-event.service';
import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { InvitationString, Connection, CreateProof } from 'src/app/models/models';
import {
  KycNamesCred, KycSurnameCred, KycIdentityNumberCred, KycSexCred, KycNationalityCred,
  KycDateOfBirthCred, KycCountryOfBirthCred, KycStatusCred, KycResidence,
  CredEmail, CredCellphone
} from 'src/app/models/e-kyc.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


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
  kycIdFilled = false;
  kycNameFilled = false;
  kycAddrFilled = false;
  kycEmailFilled = false;
  kycCellFilled = false;
  kycAddFilled = false;
  kycSexFilled = false;
  kycNationalityFilled = false;
  kycDobFilled = false;
  kycSurnameFilled = false;


  signupForm: FormGroup;
  public fidentityNumber = new FormControl(null, Validators.required);
  public fsurname = new FormControl(null, Validators.required);
  public fnames = new FormControl(null, Validators.required);
  // public ftitle = new FormControl(null, Validators.required);
  public fsex = new FormControl(null, Validators.required);
  public fdateOfBirth = new FormControl(null, Validators.required);

  public fnationality = new FormControl(null, Validators.required);
  public fcountryOfBirth = new FormControl();
  public fstatus = new FormControl(null, Validators.required);

  public faddress = new FormControl(null, Validators.required);
  public femail = new FormControl(null, Validators.required);
  public fcellphone = new FormControl(null, Validators.required);

  public fconnectId = new FormControl();


  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private vcxConnectionSvc: ConnectionService,
    private vcxProofSvc: ProofsService,
    private eventSvc: GlobalEventService,
    private router: Router
  ) {
    this.indyStatusMessage = null;
    this.indyLoading = false;
  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      identityNumber: this.fidentityNumber,
      surname: this.fsurname,
      names: this.fnames,
      // title: this.ftitle,
      sex: this.fsex,
      dateOfBirth: this.fdateOfBirth,
      nationality: this.fnationality,
      countryOfBirth: this.fcountryOfBirth,
      status: this.fstatus,
      email: this.femail,
      cellphone: this.fcellphone,
      fullAddress: this.faddress,
      connectionId: this.fconnectId
    });
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

    this.indyStatusMessage = 'Creating connection DID ...';

    this.fconnectId.setValue(this.connectName);


    this.createConnection(this.connectName)
      .then(b => {

        this.showInviteQR(this.connectName);
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
        this.indyStatusMessage = 'Connection DID created. returning';
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
        const inv: InvitationString = JSON.parse(invite.invitationString);

        // Uncomment to Intercept & replace invitation data for testing
        // inv.s.l = 'https://pbs.twimg.com/profile_images/1036552935658926081/bfjI50Q1_normal.jpg';
        // inv.s.n = 'SAFBC Bank ' + id;

        this.indyStatusMessage = 'Showing Invitation QR: ' + inv.s.n;
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

            this.indyStatusMessage = 'Sovrin Connection established.';

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



    this.vcxProofSvc
      .proofRequest(req, id)
      .pipe(
        tap(x => {
          console.log(x);
          this.proofReqUID = x.id;
          this.proofSent = true;
          this.indyStatusMessage = 'Sent credential request to your phone. \nPlease confirm it in the app and then click FILL ID below. ';
          return x.id;
        })
      )
      .subscribe();
  }

  getProofResponse(uuid) {

    this.vcxProofSvc.proofGet(uuid)
      .pipe(
        tap(p => {
          console.log(p);
          if (p.state === 'accepted') {

            this.signupForm.disable();

            p.proofData.forEach(el => {

              if (el.hasOwnProperty('names')) {
                const o: KycNamesCred = el;
                this.fnames.setValue(o.names);
                this.kycNameFilled = true;
              }
              if (el.hasOwnProperty('surname')) {
                const o: KycSurnameCred = el;
                this.signupForm.patchValue({ surname: o.surname });
                this.kycSurnameFilled = true;
              }
              if (el.hasOwnProperty('identityNumber')) {
                const o: KycIdentityNumberCred = el;
                this.signupForm.patchValue({ identityNumber: o.identityNumber });
                this.kycIdFilled = true;
              }
              if (el.hasOwnProperty('sex')) {
                const o: KycSexCred = el;
                this.signupForm.patchValue({ sex: o.sex });
                this.kycSexFilled = true;
              }
              if (el.hasOwnProperty('nationality')) {
                const o: KycNationalityCred = el;
                this.fnationality.setValue(o.nationality);
                this.kycNationalityFilled = true;
              }
              if (el.hasOwnProperty('dateOfBirth')) {
                const o: KycDateOfBirthCred = el;
                this.signupForm.patchValue({ dateOfBirth: o.dateOfBirth });
                this.kycDobFilled = true;
              }
              if (el.hasOwnProperty('countryOfBirth')) {
                const o: KycCountryOfBirthCred = el;
                this.signupForm.patchValue({ countryOfBirth: o.countryOfBirth });
              }
              if (el.hasOwnProperty('status')) {
                const o: KycStatusCred = el;
                this.signupForm.patchValue({ status: o.status });
              }
              if (el.hasOwnProperty('fullAddress')) {
                const o: KycResidence = el;
                this.faddress.setValue(o.fullAddress);
                this.kycAddrFilled = true;
              }
              if (el.hasOwnProperty('email')) {
                const o: CredEmail = el;
                this.femail.setValue(o.email);
                this.kycEmailFilled = true;
              } else {
                this.femail.enable();
              }
              if (el.hasOwnProperty('cellphone')) {
                const o: CredCellphone = el;
                this.fcellphone.setValue(o.cellphone);
                this.kycCellFilled = true;
              } else {
                this.fcellphone.enable();
              }


              // console.log(this.signupForm);
            });

          }
        })
      ).subscribe();
  }


  onSubmit() {
    this.signupForm.enable();
    console.warn(this.signupForm.value);
    this.router.navigateByUrl('/confirmed', { state: this.signupForm.value });
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
