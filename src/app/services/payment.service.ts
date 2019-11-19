import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }
  postICICIPaymentDetails(txnAmount) {
    console.log(txnAmount);

    return this.http.get("https://ed6ab601.ngrok.io/api/payment/icici", {params:txnAmount})
  }
  processGateway(iciciPayForm){
    return this.http.post('https://test.ipg-online.com/connect/gateway/processing', JSON.stringify(iciciPayForm));
  }
}
