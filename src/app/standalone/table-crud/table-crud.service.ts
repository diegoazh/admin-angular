import { BehaviorSubject, Subscription } from 'rxjs';
import { ICrudServices } from '../../shared/interfaces';
import { AppModels } from '../../shared/types';

export abstract class TableCrudService<T extends AppModels>
  implements ICrudServices<T>
{
  private _subscriptions = new Subscription();

  private _store: T[] = [];

  private _items$_ = new BehaviorSubject<T[]>([]);

  public items$ = this._items$_.asObservable();

  public get items() {
    return this._store;
  }

  public set items(value: T[]) {
    this._store = [...value];
    this._items$_.next([...this._store]);
  }

  public abstract findAll(): void;

  public addOrRemoveItem({
    item,
    overwrite = false,
  }: {
    item: T;
    overwrite?: boolean;
  }): void {
    const index = this._store.findIndex((value) => value?.id === item?.id);

    if (index >= 0) {
      overwrite
        ? this._store.splice(index, 1, item)
        : this._store.splice(index, 1);
    } else {
      this._store.push(item);
    }

    this._items$_.next(this.items);
  }

  public destroy() {
    this._subscriptions.unsubscribe();
  }
}
