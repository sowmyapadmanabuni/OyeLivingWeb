import { Component, TemplateRef, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {RegisterService} from '../services/register.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  termsConditionmodalRef: BsModalRef;
  refundPolicymodalRef: BsModalRef;
  firstName : String;
  lastName : String;
  email : String;

  code: string;
  title = 'mylogin';
  mobile: number;
  mobilenumber: string;
  otp: number;
  ipAddress = 'http://apidev.oyespace.com/';
  inpt: any;
  public countrydata: object;
  @ViewChild('myButton1') myButton1: any;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,
    private requestService: RegisterService ) { }

  ngOnInit() {
  }

  telInputObject(telinputobj) {
    this.code = '+' + telinputobj['b'].getAttribute('data-dial-code');
    console.log(this.code);
  }
  hasError(errorobj) {
    console.log(errorobj);
  }
  getNumber(numberobj) {
    console.log(numberobj);
  }
  onCountryChange(countryobj) {
    this.code = countryobj['dialCode']
    console.log(countryobj);
  }




  getCountryData() {
    alert('test')
  }


  termsConditionModel(termsCondition: TemplateRef<any>) {
    this.termsConditionmodalRef = this.modalService.show(termsCondition, Object.assign({}, { class: 'gray modal-lg' }));
  }

  privacyPolicyModel(privacyPolicy: TemplateRef<any>) {
    this.refundPolicymodalRef = this.modalService.show(privacyPolicy, Object.assign({}, { class: 'gray modal-lg' }));
  }

  register() {

    let requestData = {
      'ACFName': this.firstName,
      'ACLName' : this.lastName,
      'ACEmail': this.email,
      'ACMobile': this.mobilenumber
    }
    console.log('requestData',JSON.stringify(requestData));
   
   
   this.requestService.register(requestData)
   .subscribe((response)=>{
     alert('inside success');
     console.log('response',response);
    swal.fire({
      title: "Registered Successfully",
      text: "",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#f69321",
      confirmButtonText: "OK",
    });
    this.firstName='';
    this.lastName='';
    this.email='';
    this.mobilenumber='';
   },
   () => {
    swal.fire('Error', 'Something went wrong!', 'error')
   })
   
   }


   _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

}
