import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { ViewInvoiceService } from '../services/view-invoice.service';
import { BlocksByAssoc } from '../models/blocks-by-assoc';
import { AssociationDetails } from '../models/association-details';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { NgxPrinterService } from 'ngx-printer';
import { OrderPipe } from 'ngx-order-pipe';
import { GenerateReceiptService } from '../services/generate-receipt.service';
import { PaymentService } from '../services/payment.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent implements OnInit {
  allBlocksByAssnID: BlocksByAssoc[];
  allblocksbyassnid: BlocksByAssoc[];
  currentPage: number;
  pageSize: number;
  invoiceLists: any[];
  associationDetails: AssociationDetails;
  invoiceID: string;
  invoiceDate: Date;
  invoiceNumber: string;
  discountedValue: number;
  unitID: number;
  singleUnitDetails: object;
  OwnerFirstName: string;
  OwnerLastName: string;
  OwnerEmail: string;
  paymentDueDate: Date;
  previousDue: number;
  amountInWords: number;
  hasnumber: boolean;
  showGateWay: boolean;
  invValFinal: any;
  mainAmt: number;
  currentAssociationID: string;
  storeId: string;
  sharedSecret: string;
  charge: string;
  currency: string;
  timezone: Date;
  strPayOnly: string;
  strLanguage: string;
  strMerchantTransactionId: string;
  responseSuccessURL: string;
  responseFailURL: string;
  strTxntype: string;
  calculatedIPGUtilHash: string;
  blBlockID: string;
  modalRef: BsModalRef;
  modalRefForGenerateRecipt: BsModalRef;
  asdPyDate: string;
  blMgrMobile: string;
  allLineItem: any[];
  subTotal: number;
  totals: number;
  dscntInvinvoiceID: number;
  dscntInvinvoiceNumber: number;
  dscntInvdescription: string;
  dscntInvdiscountedAmount: number;
  totalAmountForValidation: number;
  validationResult: boolean;
  blockid: number;
  p: number;
  isChecked: boolean;
  checkAll: boolean;
  description: string;

  securityfee: number;
  housekeepingfee: number;
  generatorfee: number;
  corpusfee: number;
  commonareafee: number;
  fixedmaintenancefee: number;
  watermeterfee: number;
  unsoldrentalfees: number;
  onetimemembershipfee: number;
  onetimeoccupancyfees: number;
  rentingfees: number;
  OneTimeOnBoardingFees: number;
  InvoiceValue: number;
  iciciPayForm: any = {}

  invoiceDetails: object[];

  currentassociationname: string;
  @ViewChild('template') private template: TemplateRef<any>;
  @ViewChild('generateinvoicemodal') private generateinvoicemodal: TemplateRef<any>;
  @ViewChild('iciciform', {read:ElementRef}) iciciform: ElementRef;

  _unOcStat: string;
  _ineSent: boolean;

  order: string = 'unUnitID';
  reverse: boolean = false;
  sortedCollection: any[];
  unpaidUnits: any[];


  constructor(private viewinvoiceservice: ViewInvoiceService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private globalservice: GlobalServiceService,
    private router: Router,
    private printerService: NgxPrinterService,
    private orderpipe: OrderPipe,
    private generatereceiptservice: GenerateReceiptService,
    private paymentService: PaymentService) {
    this.currentPage = 1;
    this.pageSize = 10;
    this.previousDue = 0.00;
    this.amountInWords = 0;
    this.hasnumber = false;
    this.showGateWay = false;
    this.currentAssociationID = this.globalservice.getCurrentAssociationId();
    this.currentassociationname = this.globalservice.getCurrentAssociationName();
    this.blBlockID = '';
    this.validationResult = true;
    this.p = 1;
    this.isChecked = false;
    this._unOcStat = '';
    this._ineSent = false;
  }

  ngOnInit() {
    console.log('this.currentAssociationID', this.currentAssociationID);
    this.viewinvoiceservice.GetBlockListByAssocID(this.currentAssociationID)
      .subscribe(data => {
        this.allBlocksByAssnID = data;
        this.asdPyDate = this.allBlocksByAssnID[0]['asdPyDate'];
        this.blMgrMobile = this.allBlocksByAssnID[0]['blMgrMobile'];
        console.log('allBlocksByAssnID', this.allBlocksByAssnID);
      })
  }

  getCurrentBlockDetails(blBlockID) {
    this.invoiceLists = [];
    this.blockid = blBlockID;
    console.log('blBlockID-' + blBlockID);
    this.viewinvoiceservice.getCurrentBlockDetails(blBlockID, this.currentAssociationID)
      .subscribe(data => {
        this.invoiceLists = data['data'].invoices;
        console.log('invoiceLists?', this.invoiceLists);
        //
        this.sortedCollection = this.orderpipe.transform(this.invoiceLists, 'unUnitID');
        console.log(this.sortedCollection);
      },
        err => {
          console.log(err);
          swal.fire({
            title: "Error",
            text: `${err['error']['error']['message']}`,
            type: "error",
            confirmButtonColor: "#f69321"
          });
        })
    this.isChecked = false;
    this.checkAll = false;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  /* viewInvoice1(inid, inGenDate, inNumber, inDsCVal, unUnitID) {
     console.log(inid, inGenDate, inNumber, inDsCVal, unUnitID);
     this.router.navigate(['home/newinvoice',inid, inGenDate, inNumber, inDsCVal, unUnitID]);
   } */

  viewInvoice1(event, template: TemplateRef<any>, inid, inGenDate, inNumber, inDsCVal, unUnitID) {
    event.preventDefault();
    //alert('inside viewinvoice');
    console.log('inGenDate', inGenDate);
    console.log('inNumber', inNumber);
    console.log('inid', inid);
    console.log('inDsCVal', inDsCVal);
    console.log('unUnitID', unUnitID);

    this.securityfee = 0;
    this.housekeepingfee = 0;
    this.generatorfee = 0;
    this.corpusfee = 0;
    this.commonareafee = 0;
    this.fixedmaintenancefee = 0;
    this.watermeterfee = 0; ////
    this.unsoldrentalfees = 0;
    this.onetimemembershipfee = 0;
    this.onetimeoccupancyfees = 0;
    this.rentingfees = 0;
    this.OneTimeOnBoardingFees = 0;


    this.invoiceID = inid;
    this.invoiceDate = inGenDate;
    this.invoiceNumber = inNumber;
    this.discountedValue = inDsCVal;
    this.unitID = unUnitID;


    this.viewinvoiceservice.GetUnitListByUnitID(this.unitID)
      .subscribe(data => {
        console.log('GetUnitListByUnitID', data);
        this.singleUnitDetails = data['data'].unit;

        if (data['data'].unit.owner.length > 0) {
          this.OwnerFirstName = data['data']['unit'].owner[0].uofName;
          this.OwnerLastName = data['data']['unit'].owner[0].uolName;
          this.OwnerEmail = data['data']['unit'].owner[0].uoEmail;
        }

      })

    this.viewinvoiceservice.viewInvoice(this.blockid, this.currentAssociationID)
      .subscribe(data => {
        console.log('InvoiceDetails+', data);
        //this.allLineItem = data['data'].invoiceDetails;
        //console.log(data['data'].invoiceDetails);
      },
        data => {
          console.log('InvoiceDetails', data);
        })

    this.viewinvoiceservice.GetAmountBalance(unUnitID)
      .subscribe(data => {
        console.log('GetAmountBalance', data);
        //$scope.previousDue = response.data.data.balanceDue;
      },
        data => {
          console.log('GetAmountBalance', data);
          //previousDue=parseFloat(0.00);
        })

    this.viewinvoiceservice.invoiceDetails(inid, unUnitID)
      .subscribe(data => {
        this.modalRef = this.modalService.show(template,
          Object.assign({}, { class: 'gray modal-lg' }));
        this.InvoiceValue = 0;
        console.log('invoiceDetails--', data['data']['invoiceDetails']);
        this.invoiceDetails = data['data']['invoiceDetails'];
        data['data']['invoiceDetails'].forEach(item => {

          if (item['idDesc'] == "common area electric bill") {
            this.commonareafee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "Fixed Maintenance") {
            this.fixedmaintenancefee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "generator bill") {
            this.generatorfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "security fees") {
            this.securityfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "unsold rental fees") {
            this.unsoldrentalfees = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "corpus") {
            this.corpusfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "housekeeping") {
            this.housekeepingfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "water meter") {
            this.watermeterfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "one time membership fee") {
            this.onetimemembershipfee = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "one time onboarding fee") {
            this.OneTimeOnBoardingFees = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "one time occupancy fee") {
            this.onetimeoccupancyfees = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "renting fees") {
            this.rentingfees = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
          else if (item['idDesc'] == "bill") {
            //this.rentingfees = item['idValue'];
            this.InvoiceValue += item['idValue'];
          }
        })
      },
      err=>{
        console.log(err);
        swal.fire({
          title: "Error",
          text: `${err['error']['error']['message']}`,
          type: "error",
          confirmButtonColor: "#f69321"
        });
      })

    this.viewinvoiceservice.getassociationlist(this.asdPyDate, this.blMgrMobile, this.currentAssociationID)
      .subscribe(data => {
        console.log('associationDetails', data);
        this.associationDetails = data
      },
        err => {
          console.log(err);
        })

  }
  raiseAlert() {
    //alert('test');
  }
  printTemplate() {
    //this.printerService.printAngular(this.template);
    window.print();
  }
  printDiv() {
    var printContents = document.getElementById("printableArea").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
  totalAmountPaid(e?) {

    if (e != undefined) {
      e.preventDefault();
    }

    var total = this.previousDue;
    if (this.allLineItem != undefined) {
      for (var i = 0; i < this.allLineItem.length; i++) {
        var as = this.allLineItem[i].idValue;

        if (as == '' || as == null) {
          total;
          this.subTotal = total;
        } else {
          total += parseFloat(as);
          this.subTotal = total;

        }

      }
    }

    this.totals = total;
    total = total - this.discountedValue;
    this.amountInWords = Math.round(total);
    console.log('amountInWords', this.amountInWords);
    return total;
  }

  onButtonClick(amount) {
    this.mainAmt = amount;
    console.log(this.mainAmt);
    let flatCharges = this.mainAmt * 0.0189;
    console.log('Flat Charge', flatCharges);
    let gst = flatCharges * 0.18;
    console.log('gst', gst);
    let ravVal = this.mainAmt + flatCharges + gst + 1;//razorpay
    let invVal = this.mainAmt + flatCharges + gst + 0.04;//instamojo
    this.invValFinal = invVal.toFixed(2);//instamojo
    let ravValFinal = ravVal;//razorpay

    this.showGateWay = true;
  }

  iciciBank(e, iciciModal: TemplateRef<any>, invValFinal) {
    e.preventDefault();
    this.modalRef = this.modalService.show(iciciModal,
      Object.assign({}, { class: 'gray modal-lg' }));

    let iciciData = {
      "storeId": "3396020566",
      "strTxntype": "sale",
      "strPayOnly": "payonly",
      "strLanguage": "en_EN",
      "currency": "356",
      "sharedSecret": "Gq16esLoVw",
      "strMerchantTransactionId": "330995001_1",
      "charge": invValFinal,
      "responseSuccessURL": "https://demo.oyespace.com:8443/springAppConfig/success.jsp?param1=" + this.mainAmt + "&param2=" + this.invoiceNumber + "&param3=" + this.unitID + "&param4=" + this.currentAssociationID + "&param5=" + invValFinal,
      "responseFailURL": "http://demo.oyespace.com/response_fail.jsp"
    }


    this.viewinvoiceservice.springAppConfigPostAmount(iciciData)
      .subscribe(data => {
        // success
        console.log('success', data);
        this.storeId = data['storeId'];
        this.sharedSecret = data['sharedSecret'];
        this.charge = data['charge'];
        this.currency = data['currency'];
        this.timezone = data['timezone'];
        this.strPayOnly = data['strPayOnly'];
        this.strLanguage = data['strLanguage'];
        this.strMerchantTransactionId = data['strMerchantTransactionId'];
        this.responseSuccessURL = data['responseSuccessURL'];
        this.responseFailURL = data['responseFailURL'];
        this.strTxntype = data['strTxntype'];
        this.calculatedIPGUtilHash = data['calculatedIPGUtilHash'];
      });

  }
  iciciPay(e) {

    let InvoiceValue = { chargetotal: this.InvoiceValue+'.00' }
    //let InvoiceValue = { chargetotal: '1.00' }
    console.log(InvoiceValue);
    
    e.preventDefault();
    this.paymentService.postICICIPaymentDetails(InvoiceValue)
    .subscribe(res => {
      console.log(res);
      this.iciciPayForm = res;
      // this.paymentService.processGateway(this.iciciPayForm)
      // .subscribe(sucess=>{
      //   console.log(sucess);
      // },
      // err=>{
      //   console.log(err);
      // })
      setTimeout(_ => this.iciciform.nativeElement.submit(), 100)
    }, error => {
      console.log("Error=>", error)
    })
  }
  
  addZeroes(num) {
    console.log(num);
    // let value = Number(num);
    // let res = num.split(".");
    // if (res.length == 1 || (res[1].length < 3)) {
    //   return value.toFixed(2);
    // }
    // return value.toString(10)
  }
  discount(discount: TemplateRef<any>, inid, inNumber, inTotVal) {
    this.modalRef = this.modalService.show(discount,
      Object.assign({}, { class: 'gray modal-lg' }));

    console.log(inid, inNumber, inTotVal);
    this.dscntInvinvoiceID = inid;
    this.dscntInvinvoiceNumber = inNumber;
    this.dscntInvdescription = "Type Reason Here";
    this.dscntInvdiscountedAmount = inTotVal;
    this.totalAmountForValidation = inTotVal;
  }
  emptyDisplaytext() {
    this.dscntInvdescription = "";
  }
  checkDiscountedAmount(dscntInvdiscountedAmount) {
    var totalAmount = this.totalAmountForValidation;
    var discountedAmount = dscntInvdiscountedAmount;
    if (totalAmount < discountedAmount) {
      this.toastr.error('', 'Discounted Amount Cannot more than Total Amount', {
        timeOut: 3000
      });
    } else {
      this.validationResult = false;
    }
  }
  discountInvoice(dscntInvinvoiceNumber, dscntInvdiscountedAmount, dscntInvdescription) {
    console.log(dscntInvinvoiceNumber, dscntInvdiscountedAmount, dscntInvdescription);

    var discountData = {
      "INID": dscntInvinvoiceNumber,
      "IDDesc": dscntInvdiscountedAmount,
      "INDsCVal": dscntInvdescription
    }

    this.viewinvoiceservice.UpdateInvoiceDiscountValueAndInsert(discountData)
      .subscribe(data => {
        this.modalRef.hide();
        console.log(data);
      },
        err => {
          this.modalRef.hide();
          console.log(err);
          swal.fire({
            title: "Error",
            text: `${err['error']['error']['message']}`,
            type: "error",
            confirmButtonColor: "#f69321"
          });
        })
  }

  sendInvoiceInMail(inid, unUnitID, ineSent, blBlockID) {
    console.log('inid', inid);
    console.log('unUnitID', unUnitID);
    console.log('ineSent', ineSent);
    console.log('blBlockID', blBlockID);
    //
    this.viewinvoiceservice.GetUnitListByUnitID(unUnitID)
      .subscribe(data => {
        console.log(data);
        this._unOcStat = data['data']['unit']['unOcStat'];
        console.log(this._unOcStat);
        if (data['data']['unit']['unOcStat'] == "UnSold Vacant Unit") {
          swal.fire({
            title: "No Email Address to Send!",
            text: "UnSold Vacant Unit",
            type: "success",
            confirmButtonColor: "#f69321",
            confirmButtonText: "OK"
          })
        }
        else {
          this.viewinvoiceservice.GetInvoiceOwnerListByInvoiceId(inid)
            .subscribe((res) => {
              console.log(res);
              swal.fire({
                title: "Mail Sent Successful",
                text: "",
                type: "success",
                confirmButtonColor: "#f69321",
                confirmButtonText: "OK"
              }).then(
                (result) => {
                  if (result.value) {
                    this.getCurrentBlockDetails(blBlockID);
                  }
                })
              //  console.log(res);
            },
              (res) => {
                console.log(res);
                swal.fire('Error', `${res['error']['exceptionMessage']}`, 'error')
              })
        }
        //
        //http://localhost:54400/oyeliving/api/v1/Invoice/InvoiceListByInvoiceID/%7BInvoiceID%7D
        /*this.viewinvoiceservice.InvoiceListByInvoiceID(inid)
        .subscribe(data=>{
          console.log(data);
         this._ineSent= data['data']['invoices']['ineSent'];
         console.log(this._ineSent);
        })*/
        //

      })
    //

  }

  toggleIsChecked(event) {
    if (event.target.checked) {
      this.isChecked = true;
    }
    else {
      this.isChecked = false;
    }

    let chkboxs = document.querySelectorAll('.chkBox');
    chkboxs.forEach((item) => {
      if (item['checked'] == true) {
        this.isChecked = true;
      }
    })
  }

  toggleAllCheck(event) {
    //alert('toggleAllCheck');
    if (event.target.checked) {
      this.isChecked = true;
      this.checkAll = true;
    } else {
      //alert('toggleunAllCheck')
      this.isChecked = false;
      this.checkAll = false;
    }
  }

  sendEmailToAll() {
    let chkboxs = document.querySelectorAll('.chkBox');

    console.log(chkboxs);
    let inids = [];
    this.invoiceLists.forEach((item) => {
      inids.push(item['inid']);
    })
    //inids=inids.substring(0,inids.length-1);
    console.log(inids);
    this.viewinvoiceservice.GetInvoiceOwnerListByInvoiceId(inids)
      .subscribe((data) => {
        console.log(data);
        swal.fire({
          title: "Mail Sent Successful",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })
      },
        (err) => {
          console.log(err);
          swal.fire('Error', `${err['error']['error']['message']}`, 'error')
        })
  }

  generateReceipt(generatereceiptmodal: TemplateRef<any>) {

    this.generatereceiptservice.GetBlockListByAssocID(this.currentAssociationID)
      .subscribe(data => {
        this.allblocksbyassnid = data['data'].blocksByAssoc;
        console.log('allBlocksByAssnID', this.allblocksbyassnid);
      },
        err => {
          console.log(err);
        });
    //
    this.modalRefForGenerateRecipt = this.modalService.show(generatereceiptmodal,
      Object.assign({}, { class: 'gray modal-xl' }));
  }

  getcurrentblockdetails(blkBlockID) {
    this.generatereceiptservice.getCurrentBlockDetails(blkBlockID, this.currentAssociationID)
      .subscribe(data => {
        console.log('unpaidUnits', data['data']['paymentsUnpaid']);
        this.unpaidUnits = data['data']['paymentsUnpaid'];
      })
  }

}
