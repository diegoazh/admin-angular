import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsManagerService {
  private _components? = new Map<string, Subscription>();

  public add(componentName: string, subs: Subscription): void {
    if (!this._components?.has(componentName)) {
      this._components?.set(componentName, new Subscription());
    }

    const store = this._components?.get(componentName);
    store?.add(subs);
  }

  public unsubscribe(componentName?: string): void {
    if (!componentName) {
      this._components?.forEach((store) => store.unsubscribe());
    }

    if (componentName && this._components?.has(componentName)) {
      const store = this._components.get(componentName);
      store?.unsubscribe();
      this._components.delete(componentName);
    }
  }

  public destroy() {
    this._components?.forEach((store) => store.unsubscribe());
    this._components?.clear();
    this._components = undefined;
  }
}
