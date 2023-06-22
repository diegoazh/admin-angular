import { Observable } from 'rxjs';
import { AppModels } from '../types';

export interface ICrudServices<T extends AppModels> {
  items$: Observable<T[]>;

  addOrRemoveItem(data: { item: T; overwrite?: boolean }): void;

  findAll(): void;
}
