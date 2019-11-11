import { Component, OnInit } from '@angular/core';
import { AssociationDetails } from '../models/association-details';
import {ViewInvoiceService} from '../services/view-invoice.service';
import { BlocksByAssoc } from '../models/blocks-by-assoc';
import { GlobalServiceService } from '../global-service.service';
import { ActivatedRoute } from '@angular/router';
declare var xepOnline:any;

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent implements OnInit {
  associationDetails: AssociationDetails;
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
  invoiceID: any;
  invoiceDate: any;
  invoiceNumber: any;
  discountedValue: any;
  unitID: any;
  singleUnitDetails: any;
  OwnerFirstName: any;
  OwnerLastName: any;
  OwnerEmail: any;
  InvoiceValue: number;
  invoiceDetails: any[];
  allBlocksByAssnID: BlocksByAssoc[];
  asdPyDate: string;
  blMgrMobile: string;
  currentAssociationID: string;

  constructor(private viewinvoiceservice:ViewInvoiceService,
    private globalservice: GlobalServiceService,
    private route: ActivatedRoute) { 
      this.invoiceNumber=0;
      this.currentAssociationID = this.globalservice.getCurrentAssociationId();
  }

  ngOnInit() {
    this.viewinvoiceservice.GetBlockListByAssocID(this.currentAssociationID)
    .subscribe(data => {
      this.allBlocksByAssnID = data;
      this.asdPyDate = this.allBlocksByAssnID[0]['asdPyDate'];
      this.blMgrMobile = this.allBlocksByAssnID[0]['blMgrMobile'];
      console.log('allBlocksByAssnID', this.allBlocksByAssnID);
    })

    this.route.params.subscribe(data => this.viewNewInvoice(data['inid'],data['inGenDate'],data['inNumber'],data['inDsCVal'],data['unUnitID']));
  }

  downloadPDF(){
    xepOnline.Formatter.Format('content',{pageWidth:'216mm', pageHeight:'279mm'}/*{render:'download'}*/);
  }

  public captureScreen()  
  {  
    //var data = document.getElementById('contentToConvert');  
    var data = <HTMLInputElement>document.getElementById("content");
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }

  viewNewInvoice( inid, inGenDate, inNumber, inDsCVal, unUnitID) {
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
    this.onetimemembershipfee=0;
    this.onetimeoccupancyfees=0;
    this.rentingfees=0;
    this.OneTimeOnBoardingFees=0;


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

        this.viewinvoiceservice.invoiceDetails(inid, unUnitID)
        .subscribe(data => {
          this.InvoiceValue=0;
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
          })
          console.log('InvoiceValue',this.InvoiceValue);
        })

    this.viewinvoiceservice.getassociationlist(this.asdPyDate, this.blMgrMobile, this.currentAssociationID)
      .subscribe(data => {
        console.log('associationDetails', data);
        this.associationDetails = data
      })

  }

}
