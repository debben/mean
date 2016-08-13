import { OpaqueToken } from '@angular/core';
import { User } from '../models/User';

export const Window = new OpaqueToken('window');
export interface IWindow {
  user: User;
  location: any;
};
