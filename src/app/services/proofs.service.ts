import { Injectable, Optional, Inject } from '@angular/core';
import { Proof } from '../models/proof.model';
import { Observable } from 'rxjs';
import { HttpResponse, HttpEvent, HttpHeaders, HttpClient } from '@angular/common/http';
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';

@Injectable({
  providedIn: 'root'
})
export class ProofsService {

  // protected basePath = 'https://api.oldmutual.myid.africa';
  basePath: string;
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
   * /_** Creates (requests) proof from counter-party of connection identified by id.
   * @param id identifier of credential definition
   * @param attributes attributes required to be included in proof
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiConnectionsIdProofsPost(id: string, attributes: Array<string>, observe?: 'body', reportProgress?: boolean): Observable<any>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdProofsPost(id: string, attributes: Array<string>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdProofsPost(id: string, attributes: Array<string>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  // tslint:disable-next-line: max-line-length
  public apiConnectionsIdProofsPost(id: string, attributes: Array<string>, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiConnectionsIdProofsPost.');
    }

    if (attributes === null || attributes === undefined) {
      throw new Error('Required parameter attributes was null or undefined when calling apiConnectionsIdProofsPost.');
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

    return this.httpClient.post<any>(`${this.basePath}/api/connections/${encodeURIComponent(String(id))}/proofs`,
      attributes,
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
   * Gets all proofs
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProofsGet(observe?: 'body', reportProgress?: boolean): Observable<Array<Proof>>;
  public apiProofsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Proof>>>;
  public apiProofsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Proof>>>;
  public apiProofsGet(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

    return this.httpClient.get<Array<Proof>>(`${this.basePath}/api/proofs`,
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
   * Deletes proof
   * @param id identifier of proof
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProofsIdDelete(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public apiProofsIdDelete(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public apiProofsIdDelete(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public apiProofsIdDelete(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiProofsIdDelete.');
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

    return this.httpClient.delete<any>(`${this.basePath}/api/proofs/${encodeURIComponent(String(id))}`,
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
   * /_** Gets proof by id
   * @param id identifier of proof
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiProofsIdGet(id: string, observe?: 'body', reportProgress?: boolean): Observable<Proof>;
  public apiProofsIdGet(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Proof>>;
  public apiProofsIdGet(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Proof>>;
  public apiProofsIdGet(id: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiProofsIdGet.');
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

    return this.httpClient.get<Proof>(`${this.basePath}/api/proofs/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers,
        observe,
        reportProgress
      }
    );
  }
}
