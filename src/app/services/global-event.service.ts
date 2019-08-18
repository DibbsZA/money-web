import { Injectable, EventEmitter } from '@angular/core';

export interface Announcement {
  connectionEstablished?: boolean;

}


@Injectable({
  providedIn: 'root'
})
export class GlobalEventService {

  public announceEmmiter$: EventEmitter<Announcement>;

  constructor() {
    this.announceEmmiter$ = new EventEmitter();
  }

  closeModal(state: boolean): void {

    const announcement: Announcement = {
      connectionEstablished: state
    };
    this.announceEmmiter$.emit(announcement);
  }

}
