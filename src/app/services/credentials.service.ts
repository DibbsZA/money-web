import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Credential } from '../models/credential.model';
import { ResourceId } from '../models/resourceId.model';
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';
import { CreateCredential } from '../models/createCredential.model';

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

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
   * /_** Create (issue) Credential identified by credentialId to a connection counter-party specified by connectionId
   * @param connectionId identifier of connection to whom we issue credential
   * @param credentialId identifier of credential definition
   * @param request null
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdCredentialsCredentialIdPost(connectionId: string, credentialId: string, request: CreateCredential, observe?: 'body', reportProgress?: boolean): Observable<ResourceId>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdCredentialsCredentialIdPost(connectionId: string, credentialId: string, request: CreateCredential, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceId>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdCredentialsCredentialIdPost(connectionId: string, credentialId: string, request: CreateCredential, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceId>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdCredentialsCredentialIdPost(connectionId: string, credentialId: string, request: CreateCredential, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (connectionId === null || connectionId === undefined) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Required parameter connectionId was null or undefined when calling apiConnectionsConnectionIdCredentialsCredentialIdPost.');
    }

    if (credentialId === null || credentialId === undefined) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Required parameter credentialId was null or undefined when calling apiConnectionsConnectionIdCredentialsCredentialIdPost.');
    }

    if (request === null || request === undefined) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Required parameter request was null or undefined when calling apiConnectionsConnectionIdCredentialsCredentialIdPost.');
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

    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<ResourceId>(`${this.basePath}/api/connections/${encodeURIComponent(String(connectionId))}/credentials/${encodeURIComponent(String(credentialId))}`,
      request,
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
   * /_** Get all issued Credentials
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<Credential>>;
  public apiCredentialsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Credential>>>;
  public apiCredentialsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Credential>>>;
  public apiCredentialsGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

    return this.httpClient.get<Array<Credential>>(`${this.basePath}/api/credentials`,
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
   * /_** Deletes Credential identified by id.
   * @param id identifier of credential
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCredentialsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiCredentialsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiCredentialsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiCredentialsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiCredentialsIdDelete.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/credentials/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
