import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {GlobalServiceService} from '../global-service.service';
import {ViewReceiptService} from '../services/view-receipt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-viewreceipt',
  templateUrl: './viewreceipt.component.html',
  styleUrls: ['./viewreceipt.component.css']
})
export class ViewreceiptComponent implements OnInit {
  viewPayments: object[];
  modalRef: BsModalRef;
  currentAssociationID: string;
  unitIdentifier:any;
  invoiceNumber:any;
  pymtDate:any;
  amountPaid:any;

  constructor( private modalService: BsModalService,
    private globalservice:GlobalServiceService,
    private viewreceiptservice:ViewReceiptService,
    private router:Router) {

    this.currentAssociationID=this.globalservice.getCurrentAssociationId();
    this.unitIdentifier='';
    this.invoiceNumber='';
    this.pymtDate='';
    this.amountPaid='';
    //this.viewPayments = this.viewreceiptservice.getpaymentlist(this.currentAssociationID)
  }

  ngOnInit() {
    this.viewreceiptservice.getpaymentlist(this.currentAssociationID)
    .subscribe(data=>{
      console.log(data['data']['payments']);
      this.viewPayments=data['data']['payments']
    })
  }

  gotoGenerateReceipt(){
    this.router.navigate(['home/generatereceipt']);
  }

  viewReceipt(unitIdentifier, invoiceNumber, pymtDate, amountPaid) {
    console.log(unitIdentifier, invoiceNumber, pymtDate, amountPaid);
    this.unitIdentifier = unitIdentifier;
    this.invoiceNumber = invoiceNumber;
    this.pymtDate = pymtDate;
    this.amountPaid = amountPaid;
  }

}
