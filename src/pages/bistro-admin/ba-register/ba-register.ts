import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-ba-register',
  templateUrl: 'ba-register.html',
})
export class BaRegisterPage {

  phone = "";
  password = "";
  retypePass = "";
  loginForm: FormGroup;
  isSubmitted = false;
  phoneErrorMessage = "";
  passwordErrorMessage = "";
  nameErrorMessage = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.maxLength(20), Validators.minLength(8), Validators.required, Validators.pattern(/^\d+$/)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      name: ['', Validators.compose([Validators.required])]
    })
  }

  register() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log("register");
      this.navCtrl.popToRoot();
    } else {
      this.checkForm();
    }
  }

  checkForm() {
    let phoneError = this.loginForm.controls.phone.errors;
    if (phoneError) {
      if (phoneError.hasOwnProperty('required')) {
        this.phoneErrorMessage = "Vui lòng điền số điện thoại";
      } else {
        this.phoneErrorMessage = "Số điện thoại không hợp lệ";
      }
    }
    let passwordError = this.loginForm.controls.password.errors;
    if (passwordError) {
      if (passwordError.hasOwnProperty('required')) {
        this.passwordErrorMessage = "Vui lòng điền mật khẩu";
      } else {
        this.passwordErrorMessage = "Mật khẩu phải có độ dài tối thiểu 6 kí tự";
      }
    }
    let nameError = this.loginForm.controls.name.errors;
    console.log(nameError);
    if (nameError) {
      if (nameError.hasOwnProperty('required')) {
        this.nameErrorMessage = "Vui lòng nhập tên";
      }
    }
  }

  gotoLogin() {
    this.navCtrl.push("BaLoginPage");
    if (this.navCtrl.length() > 1) {
      this.navCtrl.remove(1, this.navCtrl.length() - 1);
    }
  }

}
