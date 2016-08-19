import { OpaqueToken, Inject } from '@angular/core';
import { Window, IWindow } from '../../../core/client/platform/Window';
import {User} from '../../../core/client/models/User';

export let Authentication = new OpaqueToken("Authenitcation Provider");

export let AuthenticationFactory = function(@Inject(Window) window:IWindow){
  let auth = {
    user: window.user
  };
  return auth;
};

export let AuthenticationProvider = {
  provide: Authentication,
  useFactory: AuthenticationFactory,
  deps: [Window]
};
