import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from 'ng2-admin/src/app/theme/validators';

@Component({
  selector: 'register',
  encapsulation: ViewEncapsulation.None,
  directives: [],
  styles: [require('../css/users.scss')],
  template: require('../views/authentication/signup.client.view.html'),
})
export class Register {

  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;

  public submitted: boolean = false;

  constructor(fb: FormBuilder) {

    this.form = fb.group({
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      // todo add async username availability validator.
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'passwords': fb.group({
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.firstName = this.form.controls['firstName'];
    this.lastName = this.form.controls['lastName'];
    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
