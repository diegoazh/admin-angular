import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CategoryModel,
  CommentModel,
  PostModel,
  ProfileModel,
  TagModel,
  UserModel,
} from '../../models';
import { IApiResponse } from '../interfaces';
import { ApiModels } from '../types';

export class BaseApiService<
  T extends
    | UserModel
    | ProfileModel
    | PostModel
    | CategoryModel
    | TagModel
    | CommentModel
    | Array<
        | UserModel
        | ProfileModel
        | PostModel
        | CategoryModel
        | TagModel
        | CommentModel
      >,
> {
  private http: HttpClient;

  private uriResource: string;

  get resource() {
    return this.uriResource;
  }

  constructor(resource: ApiModels, http: HttpClient) {
    this.http = http;
    this.uriResource = `${environment.apiUrl}/${resource}`;
  }

  public count(): Observable<IApiResponse<number>> {
    return this.http.get<IApiResponse<number>>(`${this.uriResource}/count`);
  }

  public find(): Observable<IApiResponse<T[]>> {
    return this.http.get<IApiResponse<T[]>>(`${this.uriResource}`);
  }

  public findById(id: string): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.uriResource}/${id}`);
  }

  public create(data: T): Observable<IApiResponse<T>> {
    return this.http.post<IApiResponse<T>>(`${this.uriResource}`, data);
  }
  public overwrite(id: string, data: T): Observable<IApiResponse<T>> {
    return this.http.put<IApiResponse<T>>(`${this.uriResource}/${id}`, data);
  }

  public updated(id: string, data: Partial<T>): Observable<IApiResponse<T>> {
    return this.http.patch<IApiResponse<T>>(`${this.uriResource}/${id}`, data);
  }

  public remove(id: string): Observable<IApiResponse<number>> {
    return this.http.delete<IApiResponse<number>>(`${this.uriResource}/${id}`);
  }
}
