import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
require('../img/buttons/facebook.png')
@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  template: require('../views/authentication/signin.client.view.html'),
  styles: [require('../css/users.scss')]
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;

  constructor(fb:FormBuilder) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.email = this.form.controls['email'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      // your code goes here
      // console.log(values);
    }
  }
}
