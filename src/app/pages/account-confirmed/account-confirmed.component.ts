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

import { CreateCredential } from 'src/app/models/models';
import { AccountProof } from 'src/app/models/account-proof.model';
// import { EKyc } from 'src/app/models/e-kyc.model';
import { formatDate } from '@angular/common';
import { CredentialsService } from 'src/app/services/credentials.service';
import { SignupForm } from 'src/app/models/forms.model';


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
  resourceId: import("/Users/garyd/NewCode/SAFBC/IFWG/money-web/src/app/models/resourceId.model").ResourceId;

  constructor(
    public activatedRoute: ActivatedRoute,
    // private fb: FormBuilder,
    // private modalService: BsModalService,
    // private vcxConnectionSvc: ConnectionService,
    private vcxCredentialSvc: CredentialsService
  ) {
    this.indyStatusMessage = null;
    this.indyLoading = false;

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
  }

  /**
   * issueAccountCred
   */
  public issueAccountCred() {
    // 1566771477146
    const issueCred: CreateCredential = {
      credDefId: 'safbc-account-' + this.formData.connectionId,
      credentialName: 'safbc-account',
      values: this.accountCred
    };

    this.vcxCredentialSvc.credentialCreate(issueCred, this.formData.connectionId, 'safbc-account')
      .pipe(
        tap(r => {
          console.log(r);
          this.resourceId = r;
        })
      )
      .subscribe();

  }

}
