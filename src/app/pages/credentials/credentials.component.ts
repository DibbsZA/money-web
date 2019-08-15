import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection, Credential, CredentialDef, Message } from 'src/app/models/models';
import { MessageService } from 'src/app/services/message.service';
import { ConnectionService } from 'src/app/services/connection.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { CredentialDefinitionsService } from 'src/app/services/credential-definitions.service';

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

  constructor(
    private vcxMessageSvc: MessageService,
    private vcxConnectionSvc: ConnectionService,
    private vcxCredentialSvc: CredentialsService,
    private vcxCredentialDefinitionsSvc: CredentialDefinitionsService,
  ) {

  }


  ngOnInit() {
    this.connectionId = 'NewMusk';
    this.getConnections();
  }

  /**
   * getConnections
   */
  public getConnections() {
    this.connectionsData$ = this.vcxConnectionSvc.apiConnectionsGet();
  }


  /**
   * @description
   * @author G de Beer
   * @date 2019-08-15
   */
  public getCredentials(connectionId: string) {
    this.credentialsData$ = this.vcxCredentialSvc.apiCredentialsGet();
  }

}
