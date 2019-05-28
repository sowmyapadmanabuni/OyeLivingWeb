import { Component, OnInit } from '@angular/core';
import { GenerateReceiptService } from '../services/generate-receipt.service';

@Component({
  selector: 'app-generate-receipt',
  templateUrl: './generate-receipt.component.html',
  styleUrls: ['./generate-receipt.component.css']
})
export class GenerateReceiptComponent implements OnInit {

  allBlocksByAssnID: any[];
  blBlockID: string;
  unpaidUnits: any[];
  unit: string;
  methodArray: object[];
  paymentmethod: string;
  checkField: string;
  chequeDate:Date;

  constructor(private generatereceiptservice: GenerateReceiptService) {
    this.blBlockID = '';
    this.unit = '';
    this.paymentmethod = '';

    this.methodArray = [{ 'name': 'Cash', 'displayName': 'Cash', 'id': 1 },
    { 'name': 'Cheque', 'displayName': 'Cheque', 'id': 2 },
    { 'name': 'DemandDraft', 'displayName': 'Demand Draft', 'id': 3 },
    { 'name': 'OnlinePay', 'displayName': 'OnlinePay', 'id': 4 }
    ];
  }

  ngOnInit() {
    this.generatereceiptservice.GetBlockListByAssocID()
      .subscribe(data => {
        this.allBlocksByAssnID = data['data'].blocksByAssoc;
        console.log('allBlocksByAssnID', this.allBlocksByAssnID);
      });
  }

  getCurrentBlockDetails(blBlockID) {
    this.generatereceiptservice.getCurrentBlockDetails(blBlockID)
      .subscribe(data => {
        console.log(data);
        //$scope.unpaidUnits = response.data.data.paymentsUnpaid;
        this.unpaidUnits = [];
      })
  }

  showMethod(paymentmethod) {
    this.checkField = paymentmethod;
  }

}
