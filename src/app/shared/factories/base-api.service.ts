import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private customHeaders: HttpHeaders;

  public resource: string;

  constructor(resource: ApiModels, http: HttpClient) {
    this.http = http;
    this.resource = resource;
    this.uriResource = `${environment.api.url}/${resource}`;
    this.customHeaders = new HttpHeaders({
      'X-Apikey': environment.api.key,
    });
  }

  public count(): Observable<IApiResponse<number>> {
    return this.http.get<IApiResponse<number>>(`${this.uriResource}/count`, {
      headers: this.customHeaders,
    });
  }

  public find(): Observable<IApiResponse<T[]>> {
    return this.http.get<IApiResponse<T[]>>(`${this.uriResource}`, {
      headers: this.customHeaders,
    });
  }

  public findById(id: string): Observable<IApiResponse<T>> {
    return this.http.get<IApiResponse<T>>(`${this.uriResource}/${id}`, {
      headers: this.customHeaders,
    });
  }

  public create<U>(data: U): Observable<IApiResponse<T>> {
    return this.http.post<IApiResponse<T>>(`${this.uriResource}`, data, {
      headers: this.customHeaders,
    });
  }
  public overwrite(id: string, data: T): Observable<IApiResponse<T>> {
    return this.http.put<IApiResponse<T>>(`${this.uriResource}/${id}`, data, {
      headers: this.customHeaders,
    });
  }

  public updated(id: string, data: Partial<T>): Observable<IApiResponse<T>> {
    return this.http.patch<IApiResponse<T>>(`${this.uriResource}/${id}`, data, {
      headers: this.customHeaders,
    });
  }

  public remove(id: string): Observable<IApiResponse<number>> {
    return this.http.delete<IApiResponse<number>>(`${this.uriResource}/${id}`, {
      headers: this.customHeaders,
    });
  }
}
