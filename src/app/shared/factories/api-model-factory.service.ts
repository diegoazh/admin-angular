import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  CategoryModel,
  CommentModel,
  PostModel,
  ProfileModel,
  TagModel,
  UserModel,
} from '../../models';
import { ApiModels, DynamicAppModels } from '../types';
import { BaseApiService } from './base-api.service';

export class ApiModelFactory<
  T extends
    | UserModel
    | ProfileModel
    | PostModel
    | CategoryModel
    | TagModel
    | CommentModel,
> {
  private api?: BaseApiService<T>;

  public build(resource: ApiModels, http: HttpClient) {
    this.api = new BaseApiService<T>(resource, http);
    return this;
  }

  public count(): Observable<number> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.count().pipe(map((res) => res.data.count));
  }

  public find(): Observable<DynamicAppModels<T>[]> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    const cbk = (value: T) => this.buildSingleModel(value);
    return this.api.find().pipe(map((res) => res.data.items.map(cbk)));
  }

  public findById(id: string): Observable<DynamicAppModels<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api
      .findById(id)
      .pipe(map((res) => this.buildSingleModel(res.data.item)));
  }

  public overwrite(id: string, data: T): Observable<DynamicAppModels<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api
      .overwrite(id, data)
      .pipe(map((res) => this.buildSingleModel(res.data.item)));
  }

  public update(id: string, data: Partial<T>): Observable<DynamicAppModels<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api
      .updated(id, data)
      .pipe(map((res) => this.buildSingleModel(res.data.item)));
  }

  public remove(id: string): Observable<number> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.remove(id).pipe(map((res) => res.data.deleted));
  }

  private buildSingleModel<
    T extends
      | UserModel
      | PostModel
      | CategoryModel
      | CommentModel
      | ProfileModel
      | TagModel,
  >(data: T): DynamicAppModels<T> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    switch (this.api.resource) {
      case 'users':
        return new UserModel(data as UserModel) as DynamicAppModels<T>;
      case 'posts':
        return new PostModel(data as PostModel) as DynamicAppModels<T>;
      case 'categories':
        return new CategoryModel(data as CategoryModel) as DynamicAppModels<T>;
      case 'comments':
        return new CommentModel(data as CommentModel) as DynamicAppModels<T>;
      case 'profiles':
        return new ProfileModel(data as ProfileModel) as DynamicAppModels<T>;
      case 'tags':
        return new TagModel(data as TagModel) as DynamicAppModels<T>;
      default:
        throw new Error(`the resource: ${this.api.resource} doesn't exists`);
    }
  }
}
