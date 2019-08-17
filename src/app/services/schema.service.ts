import { Injectable, Optional, Inject } from '@angular/core';
import { Schema } from '../models/schema.model';
import { CreateSchema } from '../models/createSchema.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class SchemaService {

  protected basePath = 'https://api.oldmutual.myid.africa';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   *
   * /_** Get Schemas. If **\&quot;selection\&quot;** query object is specified, only matching schema is returned.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiSchemasGet(observe?: 'body', reportProgress?: boolean): Observable<Array<Schema>>;
  public apiSchemasGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Schema>>>;
  public apiSchemasGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Schema>>>;
  public apiSchemasGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json',
      'application/xml'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.get<Array<Schema>>(`${this.basePath}/api/schemas`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   *
   * /_** Delete Schema specified by id.
   * @param id VCXS schema resource id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiSchemasIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiSchemasIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiSchemasIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiSchemasIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiSchemasIdDelete.');
    }

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json',
      'application/xml'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];

    return this.httpClient.delete<any>(`${this.basePath}/api/schemas/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

  /**
   *
   * /_** Creates new Schema identified by VCXS resource id.
   * @param id identifier of credential definition
   * @param request For **\&quot;method\&quot;** use value **\&quot;load\&quot;** if schema already exists on ledger and you
   * only want to create its representation it VCXS.
   * Use value **\&quot;create\&quot;** if new schema shall be created and written on the ledger.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiSchemasIdPost(id: string, request: CreateSchema, observe?: 'body', reportProgress?: boolean): Observable<Schema>;
  // tslint:disable-next-line: max-line-length
  public apiSchemasIdPost(id: string, request: CreateSchema, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Schema>>;
  public apiSchemasIdPost(id: string, request: CreateSchema, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Schema>>;
  public apiSchemasIdPost(id: string, request: CreateSchema, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiSchemasIdPost.');
    }

    if (request === null || request === undefined) {
      throw new Error('Required parameter request was null or undefined when calling apiSchemasIdPost.');
    }

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = [
      'application/json',
      'application/xml'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<Schema>(`${this.basePath}/api/schemas/${encodeURIComponent(String(id))}`,
      request,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }
}
