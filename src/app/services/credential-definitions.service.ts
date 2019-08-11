import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { Configuration } from '../configuration';
import { CredentialDef } from '../models/credential-def.models';
import { Observable } from 'rxjs/';
import { ResourceId } from '../models/resource-id.models';
import { BASE_PATH } from '../variables';

import { CustomHttpUrlEncodingCodec } from '../encoder';

@Injectable({
  providedIn: 'root'
})
export class CredentialDefinitionsService {

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
   * /_** Get list of Credential Definitions
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialDefsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<CredentialDef>>;
  public apiCredentialDefsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CredentialDef>>>;
  public apiCredentialDefsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CredentialDef>>>;
  public apiCredentialDefsGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
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

    return this.httpClient.get<Array<CredentialDef>>(`${this.basePath}/api/credential-defs`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   * /_** Deletes Credential Definition identified by id
   * @param id identifier of connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialDefsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiCredentialDefsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiCredentialDefsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiCredentialDefsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiCredentialDefsIdDelete.');
    }

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
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

    return this.httpClient.delete<any>(`${this.basePath}/api/credential-defs/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   * Get Credential Definitions by id
   * @param id identifier of credential definition
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialDefsIdGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<CredentialDef>;
  public apiCredentialDefsIdGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CredentialDef>>;
  public apiCredentialDefsIdGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CredentialDef>>;
  public apiCredentialDefsIdGet(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiCredentialDefsIdGet.');
    }

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
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

    return this.httpClient.get<CredentialDef>(`${this.basePath}/api/credential-defs/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   * Creates new Credential Definition identified by id.
   * @param id identifier of credential definition
   * @param schemaId credential schema id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialDefsIdPost(id: string, schemaId: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceId>;
  // tslint:disable-next-line: max-line-length
  public apiCredentialDefsIdPost(id: string, schemaId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceId>>;
  // tslint:disable-next-line: max-line-length
  public apiCredentialDefsIdPost(id: string, schemaId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceId>>;
  public apiCredentialDefsIdPost(id: string, schemaId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiCredentialDefsIdPost.');
    }

    if (schemaId === null || schemaId === undefined) {
      throw new Error('Required parameter schemaId was null or undefined when calling apiCredentialDefsIdPost.');
    }

    let headers = this.defaultHeaders;

    // authentication (BasicAuth) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set('Authorization', 'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password));
    }

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
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

    return this.httpClient.post<ResourceId>(`${this.basePath}/api/credential-defs/${encodeURIComponent(String(id))}`,
      schemaId,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
