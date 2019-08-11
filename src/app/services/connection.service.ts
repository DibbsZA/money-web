import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';


import { Connection } from '../models/connection.models';
import { Invitation } from '../models/invitation.models';
import { ResourceId } from '../models/resource-id.models';
import { Solution } from '../models/solution.models';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

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
   * /_** Submits solution of Challenge specified by connectionId and challengeId
   * @param connectionId identifier of connection
   * @param challengeId identifier of challenge
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdChallengesChallengeIdPost(connectionId: string, challengeId: string, observe?: 'body', reportProgress?: boolean): Observable<Solution>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdChallengesChallengeIdPost(connectionId: string, challengeId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Solution>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdChallengesChallengeIdPost(connectionId: string, challengeId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Solution>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsConnectionIdChallengesChallengeIdPost(connectionId: string, challengeId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (connectionId === null || connectionId === undefined) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Required parameter connectionId was null or undefined when calling apiConnectionsConnectionIdChallengesChallengeIdPost.');
    }

    if (challengeId === null || challengeId === undefined) {
      // tslint:disable-next-line: max-line-length
      throw new Error('Required parameter challengeId was null or undefined when calling apiConnectionsConnectionIdChallengesChallengeIdPost.');
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

    // tslint:disable-next-line: max-line-length
    return this.httpClient.post<Solution>(`${this.basePath}/api/connections/${encodeURIComponent(String(connectionId))}/challenges/${encodeURIComponent(String(challengeId))}`,
      null,
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
   * /_** Returns list of Connections
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<Connection>>;
  public apiConnectionsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Connection>>>;
  public apiConnectionsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Connection>>>;
  public apiConnectionsGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

    return this.httpClient.get<Array<Connection>>(`${this.basePath}/api/connections`,
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
   * /_** Deletes connection specified by ID
   * @param id identifier of connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiConnectionsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiConnectionsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiConnectionsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdDelete.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}`,
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
   * /_** Returns Connection specified by ID
   * @param id identifier of connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<Connection>;
  public apiConnectionsIdGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Connection>>;
  public apiConnectionsIdGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Connection>>;
  public apiConnectionsIdGet(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdGet.');
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

    return this.httpClient.get<Connection>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}`,
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
   * /_** Returns invite of Connection identified by id.
   * @param id identifier of connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdInviteGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<Invitation>;
  public apiConnectionsIdInviteGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Invitation>>;
  public apiConnectionsIdInviteGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Invitation>>;
  public apiConnectionsIdInviteGet(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdInviteGet.');
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

    return this.httpClient.get<Invitation>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}/invite`,
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
   * /_** Creates new Connection identified by id.
   * @param id identifier of connection
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdPost(id: string, observe?: 'body', reportProgress?: boolean): Observable<ResourceId>;
  public apiConnectionsIdPost(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ResourceId>>;
  public apiConnectionsIdPost(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ResourceId>>;
  public apiConnectionsIdPost(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdPost.');
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

    return this.httpClient.post<ResourceId>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}`,
      null,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}
