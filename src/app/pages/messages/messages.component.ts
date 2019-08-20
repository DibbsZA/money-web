import { Component, OnInit } from '@angular/core';
// import { SchemaService } from 'src/app/services/schema.service';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, timer, BehaviorSubject } from 'rxjs';
// import { map, tap, take, concatMap, merge, switchMap } from 'rxjs/operators';
// import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
// import { FormControl } from '@angular/forms';
import { ConnectionService } from 'src/app/services/connection.service';

// import * as faker from 'faker';
// import { HttpErrorResponse } from '@angular/common/http';
import { Connection } from 'src/app/models/connection.model';
import { Message, MessagePayload, MessagePayloadMsg, LibindyProof } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  connectionId: string;
  connectionsData$: Observable<Connection[]>;
  connectionData$: Observable<Connection>;
  messagesData$: Observable<Message[]>;
  messageData$: Observable<Message>;
  load$ = new BehaviorSubject('');

  constructor(
    private vcxMessageSvc: MessageService,
    private vcxConnectionSvc: ConnectionService,
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

  public selectId(id: string) {
    this.connectionId = id;
    this.getMessagesById(id);
  }

  /**
   * getMessages
   */
  public getMessagesById(connectionId: string) {
    this.messagesData$ = this.vcxMessageSvc.messagesGet(connectionId)
      .pipe(
        map((d, i) => {
          if (null != d[i].payload) {
            const pyld: MessagePayload = d[i].payload;
            const msg: MessagePayloadMsg = JSON.parse(pyld['@msg']);
            const libindy: LibindyProof = JSON.parse(msg.libindy_proof);
            console.log(libindy);
          }
          return d;
        })
      );
  }
}
