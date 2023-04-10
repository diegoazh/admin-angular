import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private components? = new Map<string, Subscription>();

  public add(componentName: string, sub: Subscription): void {
    if (!this.components?.has(componentName)) {
      this.components?.set(componentName, new Subscription());
    }

    const store = this.components?.get(componentName);
    store?.add(sub);
  }

  public unsubscribe(componentName: string): void {
    if (this.components?.has(componentName)) {
      const store = this.components.get(componentName);
      store?.unsubscribe();
    }
  }

  public destroy() {
    this.components?.forEach((store) => store.unsubscribe());
    this.components?.clear();
    this.components = undefined;
  }
}
