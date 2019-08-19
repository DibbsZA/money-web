import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection, Credential, CredentialDef, Message, CreateCredential } from 'src/app/models/models';
import { MessageService } from 'src/app/services/message.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { CredentialDefinitionsService } from 'src/app/services/credential-definitions.service';

import * as faker from 'faker';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

  connectionId: string;
  credentialDefsData$: Observable<CredentialDef[]>;
  credentialDefData$: Observable<CredentialDef>;
  credentialsData$: Observable<Credential[]>;
  credentialData$: Observable<Credential>;
  connectionsData$: Observable<Connection[]>;
  createData: CreateCredential;
  credAttributes: any;
  issueResult: string;

  constructor(
    private vcxMessageSvc: MessageService,
    private vcxConnectionSvc: ConnectionService,
    private vcxCredentialSvc: CredentialsService,
    private vcxCredentialDefinitionsSvc: CredentialDefinitionsService,
  ) {

  }


  ngOnInit() {


    this.getConnections();
    this.getCredentials();
  }

  /**
   * getConnections
   */
  public getConnections() {
    this.connectionsData$ = this.vcxConnectionSvc.connectionsGet();
  }


  public selectId(id: string) {
    this.connectionId = id;

  }


  /**
   * @description
   * @author G de Beer
   * @date 2019-08-15
   */
  public getCredentials() {
    this.credentialsData$ = this.vcxCredentialSvc.credentialsGet();
  }

  /**
   * name
   */
  public async  issueCreds() {

    // this.connectionId = 'NewMusk';
    this.credAttributes = { email: faker.internet.email() };

    this.createData = {
      credDefId: 'omb-email',
      credentialName: this.connectionId + '-cred-' + 'Email1',
      values: this.credAttributes
    };

    await this.vcxCredentialSvc
      .credentialCreate(
        this.createData,
        this.connectionId,
        'omb-email2')
      .toPromise()
      .then(r => {
        console.log('TCL: CredentialsComponent -> issueCreds -> r', r);
        this.issueResult = 'Email credential offered to: ' + r.id;
        this.getCredentials();
      })
      .catch(e => {
        console.log('TCL: CredentialsComponent -> issueCreds -> e', e);
        this.issueResult = 'Error: ' + JSON.stringify(e);
      });

  }

}
