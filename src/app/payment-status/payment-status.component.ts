import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  transactionId: string;
  status: string;
  
  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
  this.transactionId = this.route.snapshot.queryParamMap.get('transactionId');
  this.status = this.route.snapshot.queryParamMap.get('status');
  console.log( this.transactionId,this.status);
  }

}
