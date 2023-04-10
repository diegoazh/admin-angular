import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private welcomeMessage = false;
  private emitter = new Subject<Message | Message[]>();

  public messages = this.emitter.asObservable();

  get welcomeMessageStatus() {
    return this.welcomeMessage;
  }

  set welcomeMessageStatus(value: boolean) {
    this.welcomeMessage = value;
  }

  send(data: Message | Message[]) {
    this.emitter.next(data);
  }

  complete() {
    this.emitter.complete();
  }
}
