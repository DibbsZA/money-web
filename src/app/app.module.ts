
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule, NgControl } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConnectionService } from './services/connection.service';
import { CredentialDefinitionsService } from './services/credential-definitions.service';
import { CredentialsService } from './services/credentials.service';
import { MessageService } from './services/message.service';
import { ProofsService } from './services/proofs.service';
import { SchemaService } from './services/schema.service';
import { Configuration } from './configuration';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QRCodeModule } from 'angularx-qrcode';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AlertModule } from 'ngx-bootstrap/alert';

import { ShowqrComponent } from './components/showqr/showqr.component';
import { TesterComponent } from './pages/tester/tester.component';
import { SignupComponent } from './pages/signup/signup.component';
import { MessagesComponent } from './pages/messages/messages.component';

import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { CredentialsComponent } from './pages/credentials/credentials.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ShowqrComponent,
    TesterComponent,
    MessagesComponent,
    CredentialsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    HttpClientModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [
    ConnectionService,
    CredentialDefinitionsService,
    CredentialsService,
    MessageService,
    ProofsService,
    SchemaService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    ShowqrComponent
  ]
})
export class AppModule {
  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }]
    };
  }
}
