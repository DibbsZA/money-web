import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { TesterComponent } from './pages/tester/tester.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CredentialsComponent } from './pages/credentials/credentials.component';
import { ProofsComponent } from './pages/proofs/proofs.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'tester', component: TesterComponent },
  { path: 'creds', component: CredentialsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'proofs', component: ProofsComponent },
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }
