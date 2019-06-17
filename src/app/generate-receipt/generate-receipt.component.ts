import { Component, OnInit } from '@angular/core';
import { GenerateReceiptService } from '../services/generate-receipt.service';
import { formatDate } from '@angular/common';

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
  chequeDate: Date;

  voucherNo: string;
  PymtRefNo: string;
  ddNo: string;
  chequeNo: string;
  dateandTime: Date;
  getMemberId: number;
  curAssociationID: number;
  amountPaid: number;
  invoice: number;

  constructor(private generatereceiptservice: GenerateReceiptService) {
    this.blBlockID = '';
    this.unit = '';
    this.paymentmethod = '';
    this.dateandTime = new Date();
    this.curAssociationID = 4217;


    this.methodArray = [{ 'name': 'Cash', 'displayName': 'Cash', 'id': 1 },
    { 'name': 'Cheque', 'displayName': 'Cheque', 'id': 2 },
    { 'name': 'Demand Draft', 'displayName': 'Demand Draft', 'id': 3 },
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

  generateReceipt() {

    if (this.voucherNo != '' || this.voucherNo != undefined) {
      this.PymtRefNo = this.voucherNo;
    } else if (this.ddNo != '' || this.ddNo != undefined) {
      this.PymtRefNo = this.ddNo;
    } else if (this.chequeNo != '' || this.chequeNo != undefined) {
      this.PymtRefNo = this.chequeNo;
    } else {
      this.PymtRefNo = '';
    }

    let newReceipt = {
      "CurrentMemberID": this.getMemberId,
      "CreateTime": formatDate(this.dateandTime, 'yyyy-MM-dd hh:mm:ss', 'en'),
      "UpdateTime": formatDate(this.dateandTime, 'yyyy-MM-dd hh:mm:ss', 'en'),
      "CategoryID": 1,
      "AssociationID": this.curAssociationID,
      //"NeedApproval": false,
      "PymtMethodID": this.paymentmethod,
      "PymtDate": formatDate(this.dateandTime, 'yyyy-MM-dd hh:mm:ss', 'en'),
      "PymtRefNo": this.PymtRefNo,
      "PymtBankDetails": this.checkField,
      //"Notes": $scope.recpt.notes,
      //"AmountDue": $scope.invoiceComputedAmount,
      "AmountPaid": this.amountPaid,
      "UnitIdentifier": this.unit,
      "InvoiceNumber": this.invoice
    }

  }

}
