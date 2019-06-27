import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { ViewAssociationService } from './view-association.service';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Amenity } from '../models/amenity';
import { ViewChild } from '@angular/core';
import { ExpenseData } from '../models/expense-data';
import { Bank } from '../models/bank';


@Component({
  selector: 'app-view-association',
  templateUrl: './view-association.component.html',
  styleUrls: ['./view-association.component.css']
})
export class ViewAssociationComponent implements OnInit {

  modalRef: BsModalRef;
  @Input() amenityType: string;
  @Input() amenityNo: string;
  enrollAssociation: boolean = false;
  joinAssociation: boolean = false;
  viewAssociation_Table: boolean = true;
  private newAttribute: any = {};

  //crtAssn:CreateAssn;
  selectedFile: File;
  @ViewChild('view-association') form: any;
  accountID: string;
  currentAssociationID: string;
  associations: any = [];
  crtAssn: any = {};
  am: any = {};
  bankDetails: any ={};
  createAsssociationData: any = {};
  association: any = {};
  amenity: any = {};
  bank: any = {};
  PANdiv1: boolean = false;
  PANdiv2: boolean = false;
  amenityDetails: boolean = false;
  amenities: any[];
  bankites: any[];
  newamenities:any[];
  newBank: Bank;
  config: any;
  AmenityT: string;
  AmenityN: string;
  AmenityId: string;
  Bankname: string;
  IFSC: string;
  AccountNumber: string;
  accountType: string;
  AmenityType: string;
  AmenityNo: number;
  logo: boolean = false;
  expensedata: ExpenseData;
  EXPyCopy: string;
  dynamic: number;
  currentAssociationName: string;
  submitted = false;
  modal: any = {};
  filesize: boolean;
  isLargefile: boolean;
  disableButton: boolean;
  isnotValidformat: boolean;
  _validFileExtensions = [".bmp", ".gif", ".png"];
  viewassociationRow: any = {};
  associationname: string;
  propertyName: string;
  locality: string;
  NoofUnits: number;
  country: string;
  pincode: number;
  State: string;
  propertyType: string;
  blocks: number;
  panno: string;
  regno: string;
  BankName: string;
  panNo: string
  panDuplicate: boolean = false;
  file: string;
  city: string;
  pandoc: string;
  isNotValid: boolean;
  asAssnID: number;
  gstno: string;
  firstLetter: string;
  fifthLetter: string;
  editassndata: object;
  BankId:number;
 
  
  //  firstLetter = crtAssn.name.charAt(0).toUpperCase();
  //   fifthLetter = this.panNo.charAt(4).toUpperCase();


  ASAsnName: string;
  ASCountry: string;
  ASAddress: string;
  ASCity: string;
  ASState: string;
  ASPinCode: string;
  ASPrpType: string;
  ASPrpName: string;
  ASNofBlks: string;
  ASNofUnit: string;
  AMType: string;
  NoofAmenities: string
  BABName: string;
  BankN: string;
  BAIFSC: string;
  BAActNo: string;
  BAActType: string;
  AMID: number;
  BAActID: number;
  newBABName: any;
  newBAIFSC: any;
  newAMTypes: any;
  newNoofAmenitie:string;
  newBAActNo: string;
  newBAActType: string;

  accountTypes:object[];
  bankings: any;
  banks:number[];

  constructor(
    private viewAssnService: ViewAssociationService,
    private globalService: GlobalServiceService,
    private router: Router,
    private modalService: BsModalService) {
    //pagination
    this.isLargefile = false;
    this.isnotValidformat = false;
    this.disableButton = false;
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      BankId : 0
    };

    this.isLargefile = false;
    this.amenities = [];

    this.AmenityT = '';
    this.AmenityN = '';
    this.AmenityId = '';

    this.bankites = [];
    this.newamenities=[];
    this.BankN = '';
    this.IFSC = '';
    this.AccountNumber = '';
    this.accountType ='';
    this.newBABName='';
    this.newBAIFSC='';
    this.newAMTypes='';
    this.newNoofAmenitie='';

    this.accountTypes = [
      { "name": "Saving" },
      { "name": "Current" }
    ];

    this.banks=[];
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  viewassociation(repviewreceiptmodalit: any) {
    console.log(JSON.stringify(repviewreceiptmodalit));
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    this.viewassociationRow = {
      associationname: repviewreceiptmodalit.ASAsnName,
      propertyName: repviewreceiptmodalit.ASPrpName,
      locality: repviewreceiptmodalit.ASAddress,
      NoofUnits: repviewreceiptmodalit.ASNofUnit,
      calculationType: repviewreceiptmodalit.unCalType,
      ownershipStatus: repviewreceiptmodalit.unOwnStat
    };

  }
  onUpLoad() {

    const fd = new FormData();
    fd.append('image', this.selectedFile, this.EXPyCopy);
    this.viewAssnService.onUpLoad(fd)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress: ' + Math.round(event.loaded / event.total * 100) + '%');
          this.dynamic = Math.round(event.loaded / event.total * 100);
        }
        else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.dynamic = 0;
        }
      });
  }

  getBank(bankities: object) {

    this.bankites.push(new Bank(bankities['BankName'], bankities['IFSC'], bankities['AccountNumber'], bankities['accountType']));
    this.BankName = '';
    this.IFSC = '';
    this.AccountNumber = '';
    this.accountType = '';
    console.log('bankites', this.bankites);
  }
  getnewbank(event) {
//     BAActNo: "3453453453453453"
// BAActType: "Saving"
// BABName: "icici"
// BAIFSC: "PAAA1111111"
    console.log(event);
    this.bankites.push(new Bank(event['BABName'], event['BAIFSC'], event['BAActNo'], event['BAActType']));
    console.log('bankites',this.bankites);
  }
  addbanks(e) {
    console.log('e-' + e);
    this.banks.push(e);
  }
  // deleteBank(BankId) {
  //   console.log('BankId', BankId);
  //   this.bankites = this.bankites.filter(item => item['BankId'] != BankId);
  // }
  openViewAssociation(viewreceiptmodal: TemplateRef<any>, asAsnName, asPrpName, asAddress, asNofUnit, aSCountry, asPinCode, asState, asPrpType, asNofBlks, aspanNum, asRegrNum, asAsnLogo, asCity, aspanDoc, asAssnID, asgstNo) {
    console.log(asAsnName);
    console.log(asPrpName);
    console.log(asAddress);
    console.log(asNofUnit);
    console.log(aSCountry);
    console.log(asPinCode);
    console.log(asState);
    console.log(asPrpType);
    console.log(asRegrNum);
    console.log(asAsnLogo);
    console.log(asCity);
    console.log(asAsnLogo);
    console.log(aspanDoc);
    console.log('asAssnID', asAssnID);
    console.log(asgstNo);

    this.viewAssnService.getAssociationDetail(asAssnID)
      .subscribe(data => {
        console.log('bank', data['data']['association']['bankDetails'].length);
        console.log('getAssociationDetail', data['data']['association']['amenities'][0]['amType']);
        this.amenityType = data['data']['association']['amenities'][0]['amType'];
        console.log('getAssociationDetail', data['data']['association']['amenities'][0]['noofAmenities']);
        this.amenityNo = data['data']['association']['amenities'][0]['noofAmenities'];

        this.BankName = '';
        this.IFSC = '';
        this.AccountNumber = '';
        this.accountType = '';

        if (data['data']['association']['bankDetails'].length > 0) {

          console.log('getAssociationDetail', data['data']['association']['bankDetails'][0]['babName']);
          this.BankName = data['data']['association']['bankDetails'][0]['babName'];
          console.log('getAssociationDetail', data['data']['association']['bankDetails'][0]['baifsc']);
          this.IFSC = data['data']['association']['bankDetails'][0]['baifsc'];
          this.AccountNumber = data['data']['association']['bankDetails'][0]['baActNo'];
          this.accountType = data['data']['association']['bankDetails'][0]['baActType'];
        }

      })


    this.associationname = asAsnName;
    this.currentAssociationID = asAssnID;
    this.propertyName = asPrpName
    this.locality = asAddress
    this.NoofUnits = asNofUnit;
    this.country = aSCountry;
    this.pincode = asPinCode;
    this.State = asState;
    this.propertyType = asPrpType;
    this.blocks = asNofBlks;
    this.panno = asCity;
    // this.regno=asRegrNum;
    this.file = asRegrNum;
    this.city = asAsnLogo;
    this.pandoc = aspanDoc;
    this.gstno = asgstNo;

    this.modalRef = this.modalService.show(viewreceiptmodal,
      Object.assign({}, { class: 'gray modal-lg' }));
  }



  ngOnInit() {
    //this.accountID="2";
    this.accountID = "21";
    this.currentAssociationID = this.globalService.getCurrentAssociationId();
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    this.getAssociationDetails();
    // this.getAssociationDetail();
    this.firstLetter = this.crtAssn.name.charAt(0).toUpperCase();
    this.firstLetter = this.crtAssn.panno.charAt(4).toUpperCase();
    console.log(this.firstLetter, this.firstLetter);
    if (this.firstLetter == this.firstLetter) {
      this.crtAssn.matching = false;
    } else {
      this.crtAssn.matching = true;
    }

    this.viewAssnService.getAssociationAllDetails()
    .subscribe(item => {
      this.associations = item;
     // this.availableNoOfBlocks = item.length;
      console.log('associations', this.associations);  

    })
  }

  getAssociationDetails() {
    console.log(this.accountID)
    this.viewAssnService.getAssociationDetails(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      console.log(data.data.associationByAccount);
      this.associations = data.data.associationByAccount;
      console.log(this.associations);
    });
  }
  // getAssociationDetail(){
  //   this.viewAssnService.getAssociationDetail()
  //   .subscribe(data=>{
  //     console.log('getAssociationDetail',data);
  //   })
  // }

  enroll() {
    this.enrollAssociation = true;
    this.joinAssociation = false;
    this.viewAssociation_Table = false;
  }


  join() {
    this.enrollAssociation = false;
    this.joinAssociation = true;
    this.viewAssociation_Table = false;
  }
  pan() {

    this.firstLetter = this.crtAssn.name.charAt(0).toUpperCase();
    this.fifthLetter = this.crtAssn.panno.charAt(4).toUpperCase();
    console.log(this.firstLetter, this.fifthLetter);
    if (this.firstLetter == this.firstLetter) {
      this.crtAssn.matching = false;
    } else {
      this.crtAssn.matching = true;
    }

  }
  openPANfield() {
    if (this.crtAssn.country == "India") {
      this.PANdiv1 = true;
    }
    else {
      this.PANdiv1 = false;
    }
    if (this.crtAssn.country != "India") {
      this.PANdiv2 = true;
    }
    else {
      this.PANdiv2 = false;
    }
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png'
      ) {
        if (event.target.files[0].size < 200 * 200) {// Checking height * width}
          if (event.target.files[0].size < 2000000) {// checking size here - 2MB}
          }
        }
      }
    }
  }
  addAmenity(event) {
    console.log('amenity',event);
    this.newamenities.push(new Amenity(event['AMType'],event['NoofAmenities']));
    console.log('newamenities',this.newamenities);

  }

  // getBank(bankities: object) {

  //   addBank() {
  //   this.BankId += 1;
  //   this.addBankites.emit({ "BankName": this.BankName, "IFSC": this.IFSC,"AccountNumber": this.AccountNumber ,"accountType": this.accountType  });
  //   this.BankName = '';
  //   this.IFSC = '';
  //   this.AccountNumber='';
  //   this.accountType='';
   
  // }
 
  // deleteBank(BankId) {
  //   this.bankites.splice(BankId, 1);
  // }this.bankites.push(new Bank(bankities['BankName'], bankities['IFSC'], bankities['AccountNumber'], bankities['accountType'], bankities['BankId']));
  //   this.BankName = '';
  //   this.IFSC = '';
  //   this.AccountNumber = '';
  //   this.accountType = '';
  //   console.log('bankites', this.bankites);
  // }
    
  addBank() {
        this.BankId += 1;
        this.bankings.push({"newBABName": this.newBABName, "newBAIFSC":this.newBAIFSC, "newBAActNo":this.newBAActNo, "newBAActType":this.newBAActType})
        this.newBABName = '';
        this.newBAIFSC = '';
        this.newBAActNo = '';
        this.newBAActType = '';        
    }

    deleteBank(BankId) {
        this.bankings.splice(BankId, 1);
    }



  onFileSelected(event) {
    this.isLargefile = false;
    this.isnotValidformat = false;
    this.disableButton = false;
    this.selectedFile = <File>event.target.files[0];
    console.log('file type', this.selectedFile['type']);

    if (this.selectedFile['type'] == "application/zip") {
      console.log('inside file type');
      this.isnotValidformat = true;
      this.disableButton = true;
    }

    if (this.selectedFile['size'] > 2000000) {
      console.log('inside file size');
      this.isLargefile = true;
      this.disableButton = true;
    }
    let splitarr = this.selectedFile['name'].split('.')
    let currentdate = new Date();
    let expycopy = splitarr[0] + '_' + currentdate.getTime().toString() + '.' + splitarr[1];

    this.EXPyCopy = expycopy;
  }
  
  deleteAmenity(AMType) {
    console.log('AMType',AMType);
   this.newamenities= this.newamenities.filter(item=>{
     return item['AMType'] != AMType;
    })
    console.log('newamenities',this.newamenities);
  }

  removeSelectedfile() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add('', '');
    console.log('dataTransfer', dataTransfer);
    const inputElement: HTMLInputElement = document.getElementById('uploadFileinput') as HTMLInputElement;
    console.log('inputElement', inputElement.files);
    inputElement.files = dataTransfer.files;
    this.disableButton = false;
    this.isnotValidformat = false;
    this.isLargefile = false;
  }
  removePanfile() {
    const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
    dataTransfer.items.add('', '');
    console.log('dataTransfer', dataTransfer);
    const inputElements: HTMLInputElement = document.getElementById('uploadPaninput') as HTMLInputElement;
    console.log('inputElement', inputElements.files);
    inputElements.files = dataTransfer.files;
    this.disableButton = false;
    this.isnotValidformat = false;
    this.isLargefile = false;
  }

  countries: any = [
    { "name": "Afghanistan" }, { "name": "Algeria" }, { "name": "Argentina" }, { "name": "Australia" }, { "name": "Austria" },
    { "name": "	Belgium" }, { "name": "Bhutan" }, { "name": "Brazil" },
    { "name": "Canada" }, { "name": "China" }, { "name": "Cuba" },
    { "name": "Denmark" },
    { "name": "Finland" }, { "name": "France" },
    { "name": "Germany" },
    { "name": "India" }, { "name": "Ireland" }, { "name": "Israel" }, { "name": "Italy" },
    { "name": "Japan" },
    { "name": "Malaysia" }, { "name": "Mexico" },
    { "name": "Mexico" }, { "name": "Netherlands" }, { "name": "Norway" },
    { "name": "Qatar" },
    { "name": "Russia" },
    { "name": "Singapore" }, { "name": "Switzerland" },
    { "name": "United Arab Emirates" }, { "name": "United Kingdom" }, { "name": "United States of America" },
    { "name": "Qatar" }, { "name": "Qatar" }
  ];

  propertyTypes: any = [
    { "name": "residential", "displayName": "Residential Property" },
    { "name": "commercial", "displayName": "Commercial Property" },
    { "name": "residentialCumCommercial", "displayName": "Residential Cum Commercial Property" }
  ];


  onSubmit() {

    console.log("Creating Association");
    console.log("locality: " + this.crtAssn.locality);
    this.createAsssociationData = {
      // "ACAccntID":"2",
      "ACAccntID": "21",
      "association": {
        "ASAddress": this.crtAssn.locality,
        "ASCountry": this.crtAssn.country,
        "ASCity": this.crtAssn.city,
        "ASAsnLogo": "logo",
        "ASState": this.crtAssn.state,
        "ASPinCode": this.crtAssn.postalCode,
        "ASAsnName": this.crtAssn.name,
        "ASPrpName": this.crtAssn.propertyName,
        "ASRegrNum":  "avcx",    //this.crtAssn.assnRegisterNo,
        "ASPANNum": this.crtAssn.PANNumber,
        "ASPrpType": this.crtAssn.propertyType,
        //"ASWebURL":"",
        "ASPANStat": "True",
        //"ASPANNum":"AAAAm1234A",
        //"ASPANNum": this.crtAssn.assnPANNo,
        "ASNofBlks": this.crtAssn.totalNoBlocks,
        "ASNofUnit": this.crtAssn.totalNoUnits,
        "ASONStat": "False",
        "ASOMStat": "False",
        "ASOLOStat": "False",
        "ASOTPStat": "False",
        "ASOPStat": "False",
        "ASPANDoc": "uploadPANCard",
        //"aspanDoc": this.crtAssn.uploadPANCard,
        //"ASRegrNum": this.crtAssn.assnRegisterNo,
        // "BankName": this.crtAssn.BankName,
        // "accountType": this.crtAssn.accountType,
        // "IFSC": this.crtAssn.IFSC,
        // "AccountNumber": this.crtAssn.AccountNumber,

        // "AmenityT":this.crtAssn.AmenityT,
        // "AmenityN":this.crtAssn.AmenityN,
        // "amenityType":this.amenityType,
        // "amenityNo":this.amenityNo,
        "ASTrnsCur": "ghfy",
        "ASRefCode": "454545",
        //"ASGSTNo":"",        
        "GSTNumber": this.crtAssn.GSTNumber,
        "ASGPSPnt": "12.12.123",
        // "ASDCreated": "2019-01-05",
        // "ASDUpdated": "2019-01-05",
        // "ASIsActive": "True",
        "ASFaceDet": "False",
        "ASAsnEmail":"jhg",
        "Amenities": this.newamenities,
      
      "BankDetails": this.bankites
    }
  };

    this.viewAssnService.createAssn(this.createAsssociationData).subscribe(res => {
      console.log('success',res);
    },
      res => {
        console.log('error', res);
      });

    // Swal.fire({
    //   title: 'Association Created Successfuly',
    // }).then(
    //   (result) => {

    //     if (result.value) {
    //       //this.form.reset();

    //     } else if (result.dismiss === swal.DismissReason.cancel) {
    //       this.router.navigate(['']);
    //     }
    //   }
    // )

  }

  deletenewbank(acno) {
    console.log('acno',acno);
  this.bankites= this.bankites.filter(item => {
      //console.log('item',typeof item['BAActNo']);
     return parseInt(item['BAActNo']) != parseInt(acno);
    })
  }

  OpenModal(template: TemplateRef<any>, asAsnName: string, asCountry: string, asAddress: string, asCity: string, asState, asPinCode, asPrpType, asPrpName, asNofBlks, asNofUnit, amType, noofAmenities, baBName, baIFSC, baActNo, baActType, asAssnID) {
    console.log('amType-', amType, 'noofAmenities-', noofAmenities);
    this.ASAsnName = asAsnName;
    this.ASCountry = asCountry;
    this.ASAddress = asAddress;
    this.ASCity = asCity;
    this.ASState = asState;
    this.ASPinCode = asPinCode;
    this.ASPrpType = asPrpType;
    this.ASPrpName = asPrpName;
    this.ASNofBlks = asNofBlks;
    this.ASNofUnit = asNofUnit;
    this.BABName = baBName;
    this.BAIFSC = baIFSC;
    this.BAActNo = baActNo;
    this.BAActType = baActType;
    console.log(asAsnName);
    console.log(asPrpName);
    console.log(asAddress);
    console.log(asNofUnit);
    console.log(asCountry);
    console.log(asPinCode);
    console.log(asState);
    console.log(asPrpType);
    console.log(asCity);
    console.log(asAssnID);
    console.log(amType);
    console.log(baBName);

    this.viewAssnService.getAssociationDetails(asAssnID)

    this.viewAssnService.getAssociationDetailsByAssociationid(asAssnID).subscribe(res => {
      //console.log(JSON.str ingify(res));
      var data: any = res;
      console.log(res['data']['association']['amenities'][0].amType);
      console.log(res['data']['association']['amenities'][0].noofAmenities);
      this.AMType = res['data']['association']['amenities'][0].amType;
      this.NoofAmenities = res['data']['association']['amenities'][0].noofAmenities;
      console.log(res['data']['association']['bankDetails'][0].babName);
      console.log(res['data']['association']['bankDetails'][0].baifsc);
      console.log(res['data']['association']['bankDetails'][0].baActNo);
      console.log(res['data']['association']['bankDetails'][0].baActType);
      this.BABName = res['data']['association']['bankDetails'][0].babName;
      this.BAIFSC = res['data']['association']['bankDetails'][0].baifsc;
      this.BAActNo = res['data']['association']['bankDetails'][0].baActNo;
      this.BAActType = res['data']['association']['bankDetails'][0].baActType;
      console.log(res['data']['association'][0].asPrpType);
      this.ASPrpType = res['data']['association'][0].asPrpType;
    });

    console.log('editassndata', this.editassndata)

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

}
