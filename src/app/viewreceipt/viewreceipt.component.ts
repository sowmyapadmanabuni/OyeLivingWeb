import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-viewreceipt',
  templateUrl: './viewreceipt.component.html',
  styleUrls: ['./viewreceipt.component.css']
})
export class ViewreceiptComponent implements OnInit {
  viewPayments: object[];
  modalRef: BsModalRef;

  constructor( private modalService: BsModalService) {

    this.viewPayments = [{
      'unitIdentifier': 'UNIDEN001',
      'invoiceNumber': 'INV001',
      'pymtDate': '05-12-2019 10:13:12',
      'amountPaid': 1000
    },
    {
      'unitIdentifier': 'UNIDEN002',
      'invoiceNumber': 'INV002',
      'pymtDate': '05-13-2019 8:13:12',
      'amountPaid': 2000
    },
    {
      'unitIdentifier': 'UNIDEN003',
      'invoiceNumber': 'INV003',
      'pymtDate': '05-14-2019 9:13:12',
      'amountPaid': 3000
    }]


  }

  ngOnInit() {
  }

  viewReceipt(viewreceiptmodal: TemplateRef<any>,unitIdentifier,invoiceNumber,pymtDate,amountPaid){
    this.modalRef = this.modalService.show(viewreceiptmodal,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

}
