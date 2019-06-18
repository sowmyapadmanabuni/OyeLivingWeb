import { Component, OnInit, Input, TemplateRef } from '@angular/core';
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
import Swal from 'sweetalert2';


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
  //crtAssn:CreateAssn;
  selectedFile: File;
  @ViewChild('view-association') form: any;
  accountID: string;
  currentAssociationID: string;
  associations: any = [];
  crtAssn: any = {};
  createAsssociationData: any = {};
  association: any = {};
  amenity: any = {};
  bank: any = {};
  PANdiv1: boolean = false;
  PANdiv2: boolean = false;
  amenityDetails: boolean = false;
  amenities: Amenity[];
  bankites: Bank[];
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
  BAIFSC: string;
  BAActNo: string;
  BAActType: string;
  AMID: number;
  BAActID: number;

  associationId:number;

  constructor(private viewAssnService: ViewAssociationService,

    private globalService: GlobalServiceService,
    private router: Router,
    private modalService: BsModalService) {
    //pagination
    this.isLargefile = false;
    this.isnotValidformat = false;
    this.disableButton = false;
    this.config = {
      itemsPerPage: 10,
      currentPage: 1

    };

    this.isLargefile = false;
    this.amenities = [];

    this.AmenityT = '';
    this.AmenityN = '';
    this.AmenityId = '';

    this.bankites = [];
    this.Bankname = '';
    this.IFSC = '';
    this.AccountNumber = '';
    this.accountType = '';
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
  getAmenities(amenities: object) {

    this.amenities.push(new Amenity(amenities['AmenityT'], amenities['AmenityN'], amenities['AmenityId']));
    this.AmenityT = '';
    this.AmenityN = '';
    console.log('amenities', this.amenities);
  }

  deleteamenity(AmenityId) {
    console.log('AmenityId', AmenityId);
    this.amenities = this.amenities.filter(item => item['amenityId'] != AmenityId);
  }
  getBank(bankities: object) {

    this.bankites.push(new Bank(bankities['BankName'], bankities['IFSC'], bankities['AccountNumber'], bankities['accountType'], bankities['BankId']));
    this.BankName = '';
    this.IFSC = '';
    this.AccountNumber = '';
    this.accountType = '';
    console.log('bankites', this.bankites);
  }
  deleteBank(BankId) {
    console.log('BankId', BankId);
    this.bankites = this.bankites.filter(item => item['BankId'] != BankId);
  }
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
    console.log()

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
  }

  getAssociationDetails() {
    console.log(this.accountID)
    this.viewAssnService.getAssociationDetails(this.accountID).subscribe(res => {
      console.log(res);
      
      this.associations = res['data'].associationByAccount;
      console.log('associations',this.associations);
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
  // addAmenity() {
  //   this.amenities.push(new Amenity(this.AmenityT,this.AmenityN));
  //   this.AmenityT='';
  //   this.AmenityN='';
  //   console.log('amenities',this.amenities);
  // }
  // addBank(){
  //    this.bankites.push(new Bank(this.Bankname,this.IFSC,this.AccountNumber,this.accountType));
  //    this.Bankname='';
  //    this.IFSC='';
  //    this.AccountNumber='';
  //    this.accountType='';
  //    console.log('bankites',this.bankites);
  // }
  // deleteBank(index){
  //   this.bankites.splice(index, 1);
  // }
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
  deleteAmenity(index) {
    this.amenities.splice(index, 1);
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
  accountTypes: any = [
    { "name": "Saving" },
    { "name": "Current" }
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
        "ASAsnLogo": this.crtAssn.logo,
        "ASState": this.crtAssn.state,
        "ASPinCode": this.crtAssn.postalCode,
        "ASAsnName": this.crtAssn.name,
        "ASPrpName": this.crtAssn.propertyName,
        "ASRegrNum": this.crtAssn.assnRegNo,
        "PANNumber": this.crtAssn.PANNumber,
        "ASPropType": this.crtAssn.propertyType,
        //"ASWebURL":"",
        "ASPANStat": "True",
        //"ASPANNum":"AAAAm1234A",
        "ASPANNum": this.crtAssn.assnPANNo,
        "ASNofBlks": this.crtAssn.totalNoBlocks,
        "ASNofUnit": this.crtAssn.totalNoUnits,
        "ASONStat": "False",
        "ASOMStat": "False",
        "ASOLOStat": "False",
        "ASOTPStat": "False",
        "ASOPStat": "False",
        "ASPANDoc": "qwq3234",
        "uploadPANCard": this.crtAssn.uploadPANCard,
        "assnRegisterNo": this.crtAssn.assnRegisterNo,
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
        "ASDCreated": "2019-01-05",
        "ASDUpdated": "2019-01-05",
        "ASIsActive": "True",
        "ASFaceDet": "False",
        "Amenities": [
          {

            "AMType": this.AmenityT,
            "NoofAmenities": this.AmenityN

          }
        ]
      },
      "BankDetails": {
        // "BankName": this.bank.BankN,
        // "IFSC": this.bank.IFSCN,
        // "AccountNumber": this.bank.AccountN,
        // "accountType": this.bank.accountT,
        // "BankNam": this.BankName,
        // "IFS": this.IFSC,
        // "AccountNumbe": this.AccountNumber,
        // "accountTyp": this.accountType,

        "BABName": this.BankName,
        "BAIFSC": this.IFSC,
        "BAActNo": this.AccountNumber,
        "BAActType": this.accountType
      }
    };
    console.log(JSON.stringify(this.createAsssociationData));

    this.viewAssnService.createAssn(this.createAsssociationData).subscribe(res => {
      console.log("Done");
      console.log(JSON.stringify(res));
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
    this.associationId=asAssnID;

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
    //console.log('amid',amid);

    this.viewAssnService.getAssociationDetails(asAssnID)

    this.viewAssnService.getAssociationDetailsByAssociationid(asAssnID).subscribe(res => {
      console.log(JSON.stringify(res));
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
      //this.AMID = res['data']['association']['amenities'][0].amid;
      console.log(res['data']['association']);
    });

    console.log('editassndata', this.editassndata)

    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

    //Edit Association
    UpdateAssociation(associationId){
    
      console.log(associationId);
      this.editassndata = {
        ASAsnName:this.ASAsnName,
        ASCountry:this.ASCountry,
        ASAddress:this.ASAddress,
        ASCity:this.ASCity,
        ASState:this.ASState,
        ASPinCode:this.ASPinCode,
        ASPrpType:this.ASPrpType,
        ASPrpName:this.ASPrpName,
        ASNofBlks:this.ASNofBlks,
        ASNofUnit:this.ASNofUnit,
        ASAssnID:associationId,
        "Amenities":[{
          AMType:this.AMType,
          NoofAmenities:this.NoofAmenities,
          AMID:this.AMID,
          ASAssnID:associationId
        }],
        "BankDetails":[{
          BABName:this.BABName,
          BAIFSC:this.BAIFSC,
          BAActType:this.BAActType,
          BAActNo:this.BAActNo,
          ASAssnID:associationId,
          BAActID:this.BAActID
        }]
    };
    console.log(JSON.stringify(this.editassndata));
    this.viewAssnService.UpdateAssociation(this.editassndata).subscribe(res => {console.log("Done");
    console.log(JSON.stringify(res));
  //alert("Association Created Successfully")
  Swal.fire({
    title: 'Association Updated Successfuly',
  }).then(
    (result) => {
  
      if (result.value) {
        //this.form.reset();
        this.modalRef.hide();
      
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.router.navigate(['']);
      }
    }
  )
  });
    

  
    }

}
