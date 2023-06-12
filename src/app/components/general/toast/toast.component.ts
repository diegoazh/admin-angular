import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubscriptionsService, ToastService } from '../../../shared/services';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService],
})
export class ToastComponent implements OnInit, OnDestroy {
  constructor(
    private readonly messageService: MessageService,
    private readonly toastService: ToastService,
    private readonly subsService: SubscriptionsService,
  ) {}

  ngOnInit(): void {
    this.subsService.add(
      ToastComponent.name,
      this.toastService.messages.subscribe((data) => {
        if (Array.isArray(data)) {
          this.messageService.addAll(data);
        } else {
          this.messageService.add(data);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subsService.unsubscribe(ToastComponent.name);
  }
}
