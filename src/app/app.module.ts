
import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConnectionService } from './services/connection.service';
import { CredentialDefinitionsService } from './services/credential-definitions.service';
import { CredentialsService } from './services/credentials.service';
import { MessageService } from './services/message.service';
import { ProofsService } from './services/proofs.service';
import { SchemaService } from './services/schema.service';
import { SignupComponent } from './pages/signup/signup.component';
import { Configuration } from './configuration';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonsModule.forRoot()
  ],
  providers: [
    ConnectionService,
    CredentialDefinitionsService,
    CredentialsService,
    MessageService,
    ProofsService,
    SchemaService
  ],
  bootstrap: [
    AppComponent
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
