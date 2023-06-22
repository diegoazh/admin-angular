import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private welcomeMessage = false;
  private _emitter$_ = new Subject<Message | Message[]>();

  public messages$ = this._emitter$_.asObservable();

  get welcomeMessageStatus() {
    return this.welcomeMessage;
  }

  set welcomeMessageStatus(value: boolean) {
    this.welcomeMessage = value;
  }

  send(data: Message | Message[]) {
    this._emitter$_.next(data);
  }

  complete() {
    this._emitter$_.complete();
  }
}
