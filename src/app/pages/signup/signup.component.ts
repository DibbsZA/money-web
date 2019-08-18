import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { ConnectionService } from 'src/app/services/connection.service';
import * as faker from 'faker';
import { HttpErrorResponse } from '@angular/common/http';
import { InvitationString } from 'src/app/models/models';

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

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private vcxConnectionSvc: ConnectionService,
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
    // 1st Generate random name for new connection for user
    // In real world we could use applicant OTP verified phone number/token?
    this.mydate = Date.now().valueOf();
    this.connectName = this.mydate.toString();

    const arr = new Int32Array(1);
    crypto.getRandomValues<Int32Array>(arr);
    const token = arr[0].toString();
    console.log('TCL: SignupComponent -> invite -> token', token);


    this.indyStatusMessage = 'Looking up connection: ' + this.connectName;
    console.log('date based connection name: ' + this.connectName);

    try {
      // // Check if we don't have connection name already
      // await this.vcxConnectionSvc
      //   .apiConnectionsIdInviteGet(this.connectName)
      //   .toPromise()
      //   .then(invite => {
      //     console.log('TCL: SignupComponent -> invite -> invite', invite);
      //     // connection was found
      //     this.indyStatusMessage = 'Found an invite. Showing QR';

      //     // show existing invite
      //     this.openModalWithComponent(invite.invitationString);
      //     // Start poller to see if connection is established.
      //   })
      //   .catch(async e => {
      //     console.error('TCL: SignupComponent -> invite -> e', e);
      //     const err: HttpErrorResponse = e;
      //     if (err.status === 404) {
      //       // I didn't find and existing record.
      this.indyStatusMessage = 'Creating connection ...';

      await this.vcxConnectionSvc
        .connectionCreate(this.connectName)
        .toPromise()
        .then(async conn => {
          console.log('TCL: SignupComponent -> invite -> conn', conn);
          // Connection is created
          this.indyStatusMessage = 'Connection created. Getting invite data...';


          // User is created so now we try get the invite code.
          await this.vcxConnectionSvc
            .connectionInvitationGet(this.connectName)
            .toPromise()
            .then(invite => {
              const inv: InvitationString = JSON.parse(invite.invitationString);
              inv.s.l = 'https://pbs.twimg.com/profile_images/1036552935658926081/bfjI50Q1_normal.jpg';
              inv.s.n = 'SAFBCBank';
              console.log('TCL: TesterComponent -> fillWithIndy -> inv', JSON.stringify(inv));
              this.openModalWithComponent(JSON.stringify(inv));

              // This is where I need to poll if the connection was accepted
              this.indyStatusMessage = 'Found an invite. Showing QR';

            })
            .catch(e => {
              console.error('TCL: SignupComponent -> invite -> e', e);
            });
        })
        .catch(e => {
          console.error('TCL: SignupComponent -> invite -> e', e);
        });
      // }



      //     });
    } catch (error) {
      console.log('TCL: SignupComponent -> invite -> error', error);

    }
  }

  onSubmit() {
    console.warn(this.signupForm.value);
  }

  openModalWithComponent(data) {
    const initialState = {
      title: 'Scan with your Identity Wallet App',
      invitedata: data
    };
    this.bsModalRef = this.modalService.show(ShowqrComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
