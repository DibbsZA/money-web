import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection, Proof, CreateProof } from 'src/app/models/models';
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
  proofResult: string;
  selectedAttributes = {
    email: false,
    cellphone: false,
    fullAddress: false
  };
  proofAttributes = [];

  constructor(
    private vcxProofSvc: ProofsService,
    private vcxConnectionSvc: ConnectionService,
    private vcxCredentialSvc: CredentialsService,
    private vcxCredentialDefinitionsSvc: CredentialDefinitionsService,
  ) {

  }


  ngOnInit() {
    this.getConnections();
  }

  /**
   * getConnections
   */
  public getConnections() {
    this.connectionsData$ = this.vcxConnectionSvc.connectionsGet();
  }


  /**
   * @description
   * @author G de Beer
   * @date 2019-08-15
   */
  public getProofsId(connectionId: string) {
    this.proofsData$ = this.vcxProofSvc.proofsGet(); // .proofGet(connectionId);
  }

  public selectId(id: string) {
    this.connectionId = id;
    this.getProofsId(id);
  }

  public async sendProofRequest(id: string) {
    this.proofAttributes = [];
    if (this.selectedAttributes.email) {
      this.proofAttributes.push('email');
    }
    if (this.selectedAttributes.cellphone) {
      this.proofAttributes.push('cellphone');
    }
    if (this.selectedAttributes.fullAddress) {
      this.proofAttributes.push('fullAddress');
    }

    const req: CreateProof = {
      attributes: this.proofAttributes,
      name: 'Proof Request Test'
    };

    if (this.proofAttributes.length > 0) {

      await this.vcxProofSvc.proofRequest(req, id)
        .toPromise()
        .then(r => {
          console.log('TCL: TesterComponent -> sendCredentialRequest -> r', r);
          this.proofResult = 'Requested ' + req.attributes + ' from: ' + JSON.stringify(r);
        })
        .catch(e => {
          console.log('TCL: TesterComponent -> sendCredentialRequest -> e', e);
          this.proofResult = 'Error: ' + JSON.stringify(e);

        });
    } else {
      console.log('No attributes selected');
    }


  }

}
