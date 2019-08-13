import { Component, OnInit } from '@angular/core';
import { SchemaService } from 'src/app/services/schema.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ShowqrComponent } from 'src/app/components/showqr/showqr.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {

  mydate;
  surname = new FormControl('');
  names = new FormControl('');
  sex = new FormControl('');
  nationality = new FormControl('');
  status = new FormControl('');
  email = new FormControl('');

  schemaData: Observable<any>;
  bsModalRef: BsModalRef;

  totalItems = 64;
  currentPage = 4;


  constructor(
    private schemaSvc: SchemaService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  setPage(pageNo: number): void {
    this.currentPage = pageNo;
  }

  public getSchema() {
    this.schemaData = this.schemaSvc.apiSchemasGet();
  }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ShowqrComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
