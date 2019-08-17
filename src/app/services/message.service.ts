import { Injectable, Optional, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

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
   * /_** Get all messages received from connection specified by id
   * @param id Id of the Connection resource.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdMessagesGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<Array<Message>>;
  public apiConnectionsIdMessagesGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Message>>>;
  public apiConnectionsIdMessagesGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Message>>>;
  public apiConnectionsIdMessagesGet(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdMessagesGet.');
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

    return this.httpClient.get<Array<Message>>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}/messages`,
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
   * /_** Send a text message with to connection specified by id
   * @param id Id of the Connection resource.
   * @param msg message content
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdMessagesPost(id: string, msg: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdMessagesPost(id: string, msg: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiConnectionsIdMessagesPost(id: string, msg: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiConnectionsIdMessagesPost(id: string, msg: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdMessagesPost.');
    }

    if (msg === null || msg === undefined) {
      throw new Error('Required parameter msg was null or undefined when calling apiConnectionsIdMessagesPost.');
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

    return this.httpClient.post<any>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}/messages`,
      msg,
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
   * /_** Updates status of message
   * @param id Id of the Connection resource.
   * @param uids message content
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdMessagesPut(id: string, uids: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<any>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdMessagesPut(id: string, uids: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdMessagesPut(id: string, uids: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdMessagesPut(id: string, uids: Array<string>, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdMessagesPut.');
    }

    if (uids === null || uids === undefined) {
      throw new Error('Required parameter uids was null or undefined when calling apiConnectionsIdMessagesPut.');
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

    return this.httpClient.put<any>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}/messages`,
      uids,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }

}
