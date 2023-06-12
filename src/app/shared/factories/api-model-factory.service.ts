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
import { IApiResponse } from '../interfaces';
import {
  ApiModels,
  ApiResponse,
  DataApiResponse,
  DefineAppModels,
} from '../types';
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

    return this.api.count().pipe(map(this.mapCallback));
  }

  public find(): Observable<ApiResponse<T[]>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.find().pipe(map(this.mapCallback));
  }

  public findById(id: string): Observable<ApiResponse<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.findById(id).pipe(map(this.mapCallback));
  }

  public create<U>(data: U): Observable<ApiResponse<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.create(data).pipe(map(this.mapCallback));
  }

  public overwrite(id: string, data: T): Observable<ApiResponse<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.overwrite(id, data).pipe(map(this.mapCallback));
  }

  public update(id: string, data: Partial<T>): Observable<ApiResponse<T>> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.updated(id, data).pipe(map(this.mapCallback));
  }

  public remove(id: string): Observable<number | void> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    return this.api.remove(id).pipe(map(this.mapCallback));
  }

  private buildSingleModel<
    T extends
      | UserModel
      | PostModel
      | CategoryModel
      | CommentModel
      | ProfileModel
      | TagModel,
  >(data: { [key: string]: any }): DefineAppModels<T> {
    if (!this.api) {
      throw new Error(
        'You need to build the api first using the "build" method',
      );
    }

    switch (this.api.resource) {
      case 'users':
        return new UserModel(data as UserModel) as DefineAppModels<T>;
      case 'posts':
        return new PostModel(data as PostModel) as DefineAppModels<T>;
      case 'categories':
        return new CategoryModel(data as CategoryModel) as DefineAppModels<T>;
      case 'comments':
        return new CommentModel(data as CommentModel) as DefineAppModels<T>;
      case 'profiles':
        return new ProfileModel(data as ProfileModel) as DefineAppModels<T>;
      case 'tags':
        return new TagModel(data as TagModel) as DefineAppModels<T>;
      default:
        throw new Error(`the resource: ${this.api.resource} doesn't exists`);
    }
  }

  private mapCallback = <T extends DataApiResponse>(
    res: IApiResponse<T>,
  ): ApiResponse<T> => {
    if (res) {
      if (Array.isArray(res?.data)) {
        return res.data.map((model) =>
          this.buildSingleModel(model),
        ) as ApiResponse<T>;
      }

      if (typeof res?.data === 'number') {
        return res.data as ApiResponse<T>;
      }

      if (
        CategoryModel.isCategory(res?.data) ||
        CommentModel.isComment(res?.data) ||
        PostModel.isPost(res?.data) ||
        ProfileModel.isProfile(res?.data) ||
        TagModel.isTag(res?.data) ||
        UserModel.isUser(res?.data)
      ) {
        return this.buildSingleModel(res.data) as ApiResponse<T>;
      }

      if (res?.errors?.length) throw res.errors;
      if (res?.data?.error) throw res.data.error;
      if (res?.data?.errorMessage) throw res.data.errorMessage;

      throw new Error('unknown response structure');
    }

    return undefined as ApiResponse<T>;
  };
}
