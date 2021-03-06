import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  postToICICIPaymentGateway(txnAmount) {
    console.log(txnAmount);
    let headers = new HttpHeaders().set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    //return this.http.get(`https://e684d2dc.ngrok.io/api/payment/icici?chargetotal=1.00`);
    return this.http.get(`https://68ebd2f4.ngrok.io/api/payment/icici`,{params:txnAmount});
  }
  CreatePayment() {
    let paymentOptions = {
      "chargeTotal": "100",
      "paymentMethod": "Online",
      "storeID": 1496,
      "registrationID": 1419
    }
    return this.http.post(`http://devwalletapi.azurewebsites.net/wallet/api/v1/CreatePayment`,JSON.stringify(paymentOptions));
  }
  processGateway(iciciPayForm){
    return this.http.post('https://test.ipg-online.com/connect/gateway/processing', JSON.stringify(iciciPayForm));
  }
  postToKotakPaymenGateway(txnAmount){
    console.log(txnAmount);
    return this.http.get(`https://68ebd2f4.ngrok.io/api/payment/ccavenue/kotak`,{params:txnAmount});
  }
  postToAxisPaymentGateway(InvoiceValue){
    console.log(InvoiceValue);
    return this.http.get(`https://68ebd2f4.ngrok.io/api/payment/juspay`,{params:InvoiceValue});
  }
  postToHDFCPaymentGateway(InvoiceValue){
    console.log(InvoiceValue);
    return this.http.get(`https://68ebd2f4.ngrok.io/api/payment/ccavenue/hdfc`,{params:InvoiceValue});
  }
}
