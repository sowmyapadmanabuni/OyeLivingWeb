import { Component, OnInit, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { ViewAssociationService } from './view-association.service';
import {GlobalServiceService} from '../global-service.service';
import Swal from 'sweetalert2';
import {Router } from '@angular/router';
import swal from 'sweetalert2';
import { Amenity } from '../models/amenity';


@Component({
  selector: 'app-view-association',
  templateUrl: './view-association.component.html',
  styleUrls: ['./view-association.component.css']
})
export class ViewAssociationComponent implements OnInit {
  enrollAssociation:boolean=false;
  joinAssociation:boolean=false;
  viewAssociation_Table:boolean=true;
  //crtAssn:CreateAssn;
  selectedFile: File;
  @ViewChild('view-association') form: any;
  accountID:string;
  currentAssociationID:string;
  associations:any = [];
  crtAssn:any = {};
  createAsssociationData:any ={};
  association:any={};
  amenity:any={};
  PANdiv1:boolean=false;
  PANdiv2:boolean=false;
  amenityDetails:boolean=false;
  amenities:Amenity[];
 newAmenity:Amenity;
 config:any;
 AmenityT:string;
 AmenityN:string;
 AmenityType:string;
 AmenityNo:number;
  logo:boolean=false;
  EXPyCopy:string;
  dynamic: number;
  registerForm: FormGroup;
  submitted = false;
  modal: any = {};
 filesize:boolean;
 isLargefile:boolean;
 disableButton:boolean;
 isnotValidformat:boolean;
 _validFileExtensions = [ ".bmp", ".gif", ".png"];
 accountTypes:any[];
  
 

  constructor(private viewAssnService:ViewAssociationService, 
    private globalService:GlobalServiceService,
    private router:Router) { 
    //pagination
    this.config = {
      itemsPerPage:10,
      currentPage: 1
     
    };


    this.amenities = [];

    this.AmenityT='';
    this.AmenityN='';

    this.accountTypes=[
      {"name":"Saving"},
      {"name":"Current"}
    ];

  }
  
  pageChanged(event){
    this.config.currentPage = event;
  }


  ngOnInit() {
    //this.accountID="2";
   this.accountID="21";
    this.currentAssociationID=this.globalService.getCurrentAssociationId();
    this.getAssociationDetails();
  }

  getAssociationDetails()
  {
    console.log(this.accountID)
    this.viewAssnService.getAssociationDetails(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data:any = res;
      
      this.associations = data.data.associationByAccount;
        });
  }


  enroll(){
    this.enrollAssociation=true;
    this.joinAssociation=false;
    this.viewAssociation_Table=false;
  }


  join(){
    this.enrollAssociation=false;
    this.joinAssociation=true;
    this.viewAssociation_Table=false;
  }


  openPANfield(){
    if(this.crtAssn.country == "India"){
        this.PANdiv1=true;
      }
    else{
        this.PANdiv1=false;
        }
    if(this.crtAssn.country != "India"){
      this.PANdiv2=true;
       }
  else{
      this.PANdiv2=false;
      }
  }


addAmenity() {
  this.amenities.push(new Amenity(this.AmenityT,this.AmenityN));
  this.AmenityT='';
  this.AmenityN='';
  console.log('amenities',this.amenities);
}


deleteAmenity(index){
  this.amenities.splice(index, 1);
}


  countries:any= [
    {"name":"Afghanistan"}, {"name":"Algeria"}, {"name":"Argentina"}, {"name":"Australia"}, {"name":"Austria"},
    {"name":"	Belgium"}, {"name":"Bhutan"}, {"name":"Brazil"},
    {"name":"Canada"}, {"name":"China"}, {"name":"Cuba"},	
    {"name":"Denmark"},								
    {"name":"Finland"}, {"name":"France"},	
    {"name":"Germany"},	
    {"name":"India"},	{"name":"Ireland"}, {"name":"Israel"}, {"name":"Italy"},						
    {"name":"Japan"},
    {"name":"Malaysia"}, {"name":"Mexico"},
    {"name":"Mexico"}, {"name":"Netherlands"}, {"name":"Norway"},
    {"name":"Qatar"},
    {"name":"Russia"},
    {"name":"Singapore"},{"name":"Switzerland"},
    {"name":"United Arab Emirates"}, {"name":"United Kingdom"}, {"name":"United States of America"},
    {"name":"Qatar"}, {"name":"Qatar"}
    ]; 

  propertyTypes:any= [
    {"name":"residential", "displayName":"Residential Property"},
    {"name":"commercial", "displayName": "Commercial Property"},
    {"name":"residentialCumCommercial", "displayName": "Residential Cum Commercial Property"}								
    ];
    
    removeSelectedfile(){
      const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
       dataTransfer.items.add('', '');
       console.log('dataTransfer', dataTransfer);
       const inputElement: HTMLInputElement = document.getElementById('uploadFileinput') as HTMLInputElement;
       console.log('inputElement', inputElement.files);
       inputElement.files = dataTransfer.files;
       this.disableButton=false;
       this.isnotValidformat = false;
       this.isLargefile = false;
     }
     removePanfile(){
      const dataTransfer = new ClipboardEvent('').clipboardData || new DataTransfer();
       dataTransfer.items.add('', '');
       console.log('dataTransfer', dataTransfer);
       const inputElements: HTMLInputElement = document.getElementById('uploadPaninput') as HTMLInputElement;
       console.log('inputElement', inputElements.files);
       inputElements.files = dataTransfer.files;
       this.disableButton=false;
       this.isnotValidformat = false;
       this.isLargefile = false;
     }

     onFileSelected(event) {
      this.isLargefile = false;
      this.isnotValidformat = false;
      this.disableButton=false;
      this.selectedFile = <File>event.target.files[0];
      console.log('file type',this.selectedFile['type']);
     
      if (this.selectedFile['type'] == "application/zip") {
        console.log('inside file type');
        this.isnotValidformat = true;
        this.disableButton=true;
      }
     
      if (this.selectedFile['size'] > 2000000) {
        console.log('inside file size');
        this.isLargefile = true;
        this.disableButton=true;
      }
      let splitarr = this.selectedFile['name'].split('.')
      let currentdate = new Date();
      let expycopy = splitarr[0] + '_' + currentdate.getTime().toString() + '.' + splitarr[1];
     
      this.EXPyCopy = expycopy;
     }

  createAssociation(){
    
    console.log("Creating Association");
    console.log("locality: "+this.crtAssn.locality);
    this.createAsssociationData = {
     // "ACAccntID":"2",
      "ACAccntID":"21",
      "association" : {
        "ASAddress": this.crtAssn.locality,
        "ASCountry": this.crtAssn.country,
        "ASCity": this.crtAssn.city,
        "ASState": this.crtAssn.state,
        "ASPinCode": this.crtAssn.postalCode,
        "ASAsnName":this.crtAssn.name,
        "ASPrpName": this.crtAssn.propertyName,
        "ASRegrNum":this.crtAssn.assnRegNo,
        //"ASWebURL":"",
        "ASPANStat":"True",
        //"ASPANNum":"AAAAm1234A",
        "ASPANNum":this.crtAssn.assnPANNo,
        "ASNofBlks": this.crtAssn.totalNoBlocks ,
        "ASNofUnit": this.crtAssn.totalNoUnits,
        "ASONStat":"False",
        "ASOMStat":"False",
        "ASOLOStat":"False",
        "ASOTPStat":"False",
        "ASOPStat":"False",
        "ASPANDoc":"qwq3234",
       // "ASPANDoc":this.crtAssn.uploadPANCard,
        "ASTrnsCur":"ghfy",
        "ASRefCode":"454545",
        //"ASGSTNo":"",        
        "ASGSTNo":this.crtAssn.GSTNumber,
        "ASGPSPnt":"12.12.123",
        "ASDCreated":"2019-01-05",
        "ASDUpdated":"2019-01-05",
        "ASIsActive":"True",
        "ASFaceDet":"False",
        "Amenities":[
        {
                      "asAssnID":this.currentAssociationID,
                      "AMType":this.amenity.amenityType,
                      "NoofAmenities":this.amenity.amenityType
        }
        ]
        /*
          "ASAddress": this.crtAssn.locality,
          "ASAsnName": this.crtAssn.name ,
      // "ASAsnLogo": this.crtAssn.logo ,          
         "ASAsnLogo" :"Images/Robo.jpeg",
          "ASCountry": this.crtAssn.country,
          "ASPinCode": this.crtAssn.postalCode,
          "ASState": this.crtAssn.state,
          "ASCity": this.crtAssn.city,
          "ASPrpName": this.crtAssn.propertyName ,
          "ASPropType": this.crtAssn.propertyType,
          
          "ASNofBlks": this.crtAssn.totalNoBlocks ,
          "ASNofUnit": this.crtAssn.totalNoUnits,
          
  "ASAsnEmail":"tapaswini_ransingh@careofhomes.com",
  "ASWebURL" :"www.oyespace.com",
  "ASPANStat":"True",
  "ASPANNum":"TESTS9090909",
  "ASRegrNum" :"TESTS2121232",
  "ASBToggle":"True",
  "ASAVPymnt":"False",
 // "ASRegrNum" :"TESTS2121232",

          
          "Amenities":{
                       "AMType": this.amenity.amenityType,
                       "NoofUnits": this.amenity.amenityNo,
                       "AMDCreated":"2019-01-21"

                      }
          
*/
          //"ASAddress": this.crtAssn.locality,
          //"ASCountry":  this.crtAssn.country,
          //"ASCity":   this.crtAssn.city,
          //"ASState":   this.crtAssn.state,
          //"ASPinCode": this.crtAssn.postalCode,
         // "ASAsnLogo": this.crtAssn.logo ,
          //"ASAsnName": this.crtAssn.name ,
          //"ASPrpName": this.crtAssn.propertyName ,
          //"ASPropType": this.crtAssn.propertyType,
          //"ASNofBlks": this.crtAssn.totalNoBlocks ,
         // "ASNofUnit": this.crtAssn.totalNoUnits,
           //Amenities- field are not there in API

         // "ASBToggle":    this.crtAssn.autoVendorPymtTogg,
          //"ASAVPymnt":  this.crtAssn.autoVendorPymt,
         // "ASRegrNum": this.crtAssn.registerNo,
          //"ASWebURL":  this.crtAssn.URL,
          //"ASMgrName": this.crtAssn.managerName,
          //"ASMgrMobile": "7008295630",
          //"ASMgrEmail": this.crtAssn.mgrEmailID,
          //"ASAsnEmail": this.crtAssn.assnEmailid  ,
          //"ASPANStat": "True",
          //"ASPANNum": this.crtAssn.panNo,
         // "ASONStat": "False",
          //"ASOMStat": "False",
          //"ASOLLOStat" :"False",
         // "ASOTPStat" : "False",
          //"ASOPStat" : "False",
          //"ASMtType": "FlatRate", 
          //"ASMtDimBs": this.crtAssn.maintenanceValue ,
          // "ASMtFRate": this.crtAssn.flatRatevalue ,
          // "ASUniMsmt":  this.crtAssn.UnitOFMeasurement,
          // "ASICrFreq": this.crtAssn.frequencies ,/* Need to check with UI wheather Present or Not(08-01-2019) */
          // "ASBGnDate": this.crtAssn.billGenerationDate,
          // "ASDPyDate": this.crtAssn.dueDate,
          // "ASLPCType": this.crtAssn.latePaymentChargeType.displayName,
          // "ASLPChrg": this.crtAssn.latePaymentCharge ,
          // "ASLPSDate": this.crtAssn.startsFrom,


/*************************************************************************/
          //"BankDetails": this.crtAssn.bankData /*********  one extra field need to be Added  *********/
      },
  };
  console.log(JSON.stringify(this.createAsssociationData));
  this.viewAssnService.createAssn(this.createAsssociationData).subscribe(res => {console.log("Done");
  console.log(JSON.stringify(res));
//alert("Association Created Successfully")
});
  
Swal.fire({
  title: 'Association Created Successfuly',
}).then(
  (result) => {

    if (result.value) {
      //this.form.reset();
    
    } else if (result.dismiss === swal.DismissReason.cancel) {
      this.router.navigate(['']);
    }
  }
)

  }

}
