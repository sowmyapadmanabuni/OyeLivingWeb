import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import {Bank} from '../models/bank';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  @Input()  bankites:Bank[];
  @Output() addBankites = new EventEmitter<object>();
  @Output() deletebank = new EventEmitter<object>();
  BankId:number;
  BankName:string; 
  IFSC:string;
  AccountNumber:string;
  accountType:string;
  
  constructor() {
    this.BankId = 0;
   }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('bankites', this.bankites);
  }
 
  addBank() {
    this.BankId += 1;
    this.addBankites.emit({ "BankId": this.BankId, "BankName": this.BankName, "IFSC": this.IFSC,"AccountNumber": this.AccountNumber ,"accountType": this.accountType  });
    this.BankName = '';
    this.IFSC = '';
    this.AccountNumber='';
    this.accountType='';
   
  }
 
  deleteBank(BankId) {
    this.bankites.splice(BankId, 1);
  }
  accountTypes :any=[
    {"name":"Saving"}, 
    {"name":"Current"}
  ];

}
