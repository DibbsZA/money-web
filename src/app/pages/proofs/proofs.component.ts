import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection, Proof } from 'src/app/models/models';
import { ConnectionService } from 'src/app/services/connection.service';
import { CredentialsService } from 'src/app/services/credentials.service';
import { CredentialDefinitionsService } from 'src/app/services/credential-definitions.service';
import { ProofsService } from 'src/app/services/proofs.service';

@Component({
  selector: 'app-proofs',
  templateUrl: './proofs.component.html',
  styleUrls: ['./proofs.component.css']
})
export class ProofsComponent implements OnInit {

  connectionId: string;
  proofsData$: Observable<Proof[]>;
  proofData$: Observable<Proof>;
  connectionsData$: Observable<Connection[]>;

  constructor(
    private vcxProofSvc: ProofsService,
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
  public getProofsId(connectionId: string) {
    this.proofData$ = this.vcxProofSvc.apiProofsIdGet(connectionId);
  }

}
