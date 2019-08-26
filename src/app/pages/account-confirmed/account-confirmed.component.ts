import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, Validators, FormControlName } from '@angular/forms';
// import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal';
// import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
// import { ConnectionService } from 'src/app/services/connection.service';
// import * as faker from 'faker';

import { AccountProof, CreateCredential, SignupForm, ResourceId } from 'src/app/models/models';
// import { EKyc } from 'src/app/models/e-kyc.model';
import { formatDate } from '@angular/common';
import { CredentialsService } from 'src/app/services/credentials.service';


@Component({
  selector: 'app-account-confirmed',
  templateUrl: './account-confirmed.component.html',
  styleUrls: ['./account-confirmed.component.css']
})
export class AccountConfirmedComponent implements OnInit {

  formData: SignupForm;

  accountCred: AccountProof;

  bsModalRef: BsModalRef;
  connectName: string;
  mydate: number;
  indyLoading = false;
  indyStatusMessage: string;
  state$: Observable<any>;
  resourceId: ResourceId;

  constructor(
    public activatedRoute: ActivatedRoute,
    // private fb: FormBuilder,
    // private modalService: BsModalService,
    // private vcxConnectionSvc: ConnectionService,
    private vcxCredentialSvc: CredentialsService
  ) {
    this.indyStatusMessage = null;

  }

  ngOnInit(): void {

    this.formData = window.history.state;

    console.log(this.formData);

    this.accountCred = {
      bank: 'SAFBC BANK',
      accountHolder: this.formData.names + ' ' + this.formData.surname,
      accountType: 'SAVINGS',
      accountNo: '99012345679',
      branchCode: '920001',
      openDate: formatDate(Date.now(), 'yyyy-MM-dd', 'en-ZA')
    };

    this.indyStatusMessage = 'Account created. Ready to issue credential.';
  }

  /**
   * issueAccountCred
   */
  public issueAccountCred() {
    if (this.formData.connectionId === null) {
      this.formData.connectionId = '1566674030127';   // testing value
    }
    //
    this.indyStatusMessage = 'Issuing credential.';
    const issueCred: CreateCredential = {
      credDefId: 'safbc-account-' + this.formData.connectionId,
      credentialName: 'safbc-account',
      values: this.accountCred
    };

    const credId = this.formData.connectionId + '-cred-' + Math.floor(Date.now() / 1000).toString();

    this.vcxCredentialSvc.credentialCreate(issueCred, this.formData.connectionId, credId)
      .pipe(
        tap(r => {
          this.indyStatusMessage = 'Credential issued. \nConfirm acceptance in your Identity App.';
          console.log(r);
          this.resourceId = r;
        })
      )
      .subscribe();

  }

}
