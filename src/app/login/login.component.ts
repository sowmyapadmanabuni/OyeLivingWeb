import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  code: string;
  title = 'mylogin';
  mobile: number;
  mobilenumber: number;
  otp: number;
  ipAddress = 'http://apidev.oyespace.com/';
  inpt: any;
  public countrydata: object;
  @ViewChild('myButton1') myButton1: any;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit() {
  }

  sendOTP() {
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}/oyeliving/api/v1/account/sendotp`
    // document.getElementById("myButton1").value="Resend";
    var mobileNoData = {
      // CountryCode: this.code,
      CountryCode: this.code,
      MobileNumber: this.mobilenumber
    };

    var timeLeft = 30;
    var elem = document.getElementById('some_div');

    var timerId = setInterval(countdown, 1000);

    function countdown() {
      if (timeLeft == 0) {
        clearTimeout(timerId);

        var element = <HTMLInputElement>document.getElementById("myButton1");
        element.disabled = true;
        element.value = "Resend";
        // doSomething();
      } else {
        elem.innerHTML = timeLeft - 1 + ' seconds to resend';
        timeLeft--;
        var myButton1element = <HTMLInputElement>document.getElementById("myButton1");
        myButton1element.disabled = true;
        var otpBycallelement = <HTMLInputElement>document.getElementById("otpBycall");
        otpBycallelement.disabled = true;

      }
    }

    console.log(mobileNoData);
    return this.http.post(url, JSON.stringify(mobileNoData), { headers: headers })
      .subscribe(data => { console.log(data) })
  }








  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
      .set('Content-Type', 'application/json');
    return headers;
  }




  verifyOtp() {
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}oyeliving/api/v1/account/verifyotp`
    var otpdata = {
      // CountryCode : this.code,
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    this.http.post(url, JSON.stringify(otpdata), { headers: headers })
      .subscribe(data => {
        console.log(data)
        if (data['data'] == null) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
            text: 'Please register your Number!',
            footer: '<a href>Why do I have this issue?</a>'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['register']);
            }
          })
        }
      })

  }


  otpCall(e) {
    e.preventDefault();
    let headers = this.getHttpheaders();
    var reSendOtpData = {
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    let url = `http://control.msg91.com/api/retryotp.php?authkey=261622AtznpKYJ5c5ab60e&mobile=${this.code}${this.mobilenumber}&retrytype=voice`;
    //http://control.msg91.com/api/retryotp.php?authkey=261622AtznpKYJ5c5ab60e&mobile=917975536425&retrytype=voice
    console.log(url);
    console.log('reSendOtpData', reSendOtpData);
    this.http.get(url)
      .subscribe(data => {
        console.log(data)
      })
  }





  resendOtp(e) {
    e.preventDefault();
    alert('inside resendOtp');
    let headers = this.getHttpheaders();
    let url = `${this.ipAddress}oyeliving/api/v1/account/resendotp`
    var reSendOtpData = {
      CountryCode: this.code,
      MobileNumber: this.mobilenumber,
      OTPnumber: this.otp
    };
    console.log('reSendOtpData', reSendOtpData);
    this.http.post(url, JSON.stringify(reSendOtpData), { headers: headers })
      .subscribe(data => {
        console.log(data)
      })
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
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

}
