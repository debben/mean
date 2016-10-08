import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ResourceModule } from 'ng2-resource-rest';
import { NgaModule } from '../../core/client/nga.module';

/* Providers */
import { AuthenticationProvider } from './services'

/* Components */
import { EditUser, ListUsers, User, Login, Register} from './components';

@NgModule({
  declarations: [
    Login,
    Register,
    User,
    ListUsers,
    EditUser
  ],
  imports: [
    BrowserModule,
    ResourceModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    AuthenticationProvider
  ],
  exports: [
  ]
})

export class UsersModule {
}
