import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  SubscriptionsManagerService,
  ToastService,
} from '../../shared/services';
import { ToastModule } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService],
  imports: [ToastModule],
})
export class ToastComponent implements OnInit, OnDestroy {
  constructor(
    private readonly messageService: MessageService,
    private readonly toastService: ToastService,
    private readonly subsManager: SubscriptionsManagerService,
  ) {}

  ngOnInit(): void {
    this.subsManager.add(
      ToastComponent.name,
      this.toastService.messages$.subscribe((data) => {
        if (Array.isArray(data)) {
          this.messageService.addAll(data);
        } else {
          this.messageService.add(data);
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subsManager.unsubscribe(ToastComponent.name);
  }
}
