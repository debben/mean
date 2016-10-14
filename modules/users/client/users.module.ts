import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ResourceModule } from 'ng2-resource-rest';
import { NgaModule } from '../../core/client/nga.module';

/* Providers */
import { AuthenticationProvider,
         UsersService } from './services/index.ts';

/* Components */
import { EditUser, ListUsers, User, Login, Register} from './components';

// routes
import { routing } from './routes/user.client.routes';

@NgModule({
  declarations: [
    Login,
    Register,
    User,
    ListUsers,
    EditUser
  ],
  imports: [
    HttpModule,
    BrowserModule,
    ResourceModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgaModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    AuthenticationProvider,
    UsersService
  ]
})
export class UsersModule {
}
