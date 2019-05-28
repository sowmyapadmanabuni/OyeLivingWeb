import { Component, OnInit } from '@angular/core';
import { ViewUnitService } from './view-unit.service';
import { switchAll } from 'rxjs/operators';
//import {AlertsService} from 'angular-alert-module';
import Swal from 'sweetalert2';
//import * as swal from 'sweetalert2';
import { GlobalServiceService } from '../global-service.service';


@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent implements OnInit {
  addUnitISTPage: boolean = true;
  addUnit2NDPage: boolean = false;
  blockID: string;
  addmyVehicle: boolean = false;
  ACAccntID: string;
  ASAssnID: string;
  associationID: string;
  currentAssociationID: string;
  currentAssociationName: string;
  tenantDetails: boolean = false;
  ownerDetails: boolean = true;
  unit_Form: boolean = false;
  selectBlock: boolean = false;
  allBlocksLists:any[];
  blBlockID:string;


  blocks: any = [];
  units: any = [];
  bank: any = {};
  unit: any = {};
  owner: any = {};
  tenant: any = {};
  createUnitData: any = {};
  config: any;
  repUnit: any = {};
  viewUnitRow: any = {};
  parkings: any = [];
  newParking: any = {};
  allUnitBYBlockID:any[];





  constructor(private viewUniService: ViewUnitService, private globalService: GlobalServiceService) {
    //pagination
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };

    this.blBlockID='';
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }


  ngOnInit() {
    this.currentAssociationID = this.globalService.getCurrentAssociationId();
    this.currentAssociationID = '1156';
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    this.currentAssociationName='MANAS ASSOCIATION';
    //this.associationID="10";
    this.getUnitDetails();
    this.getBlocks();
    this.viewUniService.GetBlockListByAssocID(this.currentAssociationID)
      .subscribe(data =>{
       this.allBlocksLists=data['data'].blocksByAssoc;
      });
  }


  accountTypes: any = [
    { "name": "Saving" },
    { "name": "Current" }
  ];

  unitTypes: any = [
    { "name": "Flat" },
    { "name": "Villa" },
    { "name": "Vaccant Plot" }
  ];

  calculationTypes: any = [
    { "name": "Flat Rate Value" },
    { "name": "Dimension Based" }
  ];

  occupencys: any = [
    { "name": "All Units" },
    { "name": "Single Unit" },
    { "name": "All sold Owner Occupied Units" },
    { "name": "All sold Tenant Occupied Units" },
    { "name": "Sold Vaccant" },
    { "name": "Unsold Vaccant" }
  ];

  getUnitDetails() {
    //console.log(this.associationID);
    console.log(" Current association ID:" + this.currentAssociationID);
    this.viewUniService.getUnitDetails(this.currentAssociationID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      this.units = data.data.unit;
    });
  }

  getBlocks() {
    this.viewUniService.getBlocks(this.currentAssociationID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data: any = res;
      this.blocks = data.data.blocksByAssoc;

    });
  }

  addBlockForm() {
    this.addUnitISTPage = false;
    this.addUnit2NDPage = true;
    this.selectBlock = true;
  }

  loadBlock(block: string) {
    this.selectBlock = false;
    this.unit_Form = true;
    this.blockID = block;
    console.log("blockID:" + this.blockID);
  }

  /*
    addVehicle(){
      this.addmyVehicle=true;
    }
    */

  addParking() {
    this.parkings.push(this.newParking)
    this.newParking = {};
  }


  deleteParking(index) {
    this.parkings.splice(index, 1);
  }

  tenantOwnerdiv() {
    if (this.unit.occupency == "All sold Tenant Occupied Units") {
      this.tenantDetails = true;
      this.ownerDetails = false;
    }
    else {
      this.tenantDetails = false;
      this.ownerDetails = true;
    }
  }


  createUnit() {
    this.createUnitData = {
      "ASAssnID": this.currentAssociationID,
      "ACAccntID": "21",
      "units": [{
        "UNUniName": this.unit.unitno,
        "UNUniType": this.unit.unitType,
        "UNDimens": this.unit.unitdimension,
        //unit rate field not there in API?
        //"" : this.unit.unitrate,
        "UNCalType": this.unit.calculationType,
        "BLBlockID": this.blockID,
        //ownership & occupency field not there in API
        // "" : this.unit.occupency,
        "Owner": {
          "UOFName": this.owner.ownerFirtname,
          "UOLName": this.owner.ownerLastname,
          "UOMobile": this.owner.ownerMobnumber,
          "UOMobile1": this.owner.ownerAltnumber,
          "UOEmail": this.owner.ownerEmail,
          "UOEmail1": this.owner.ownerAltemail,
        },
        "Tenant": {
          "UTFName": this.tenant.tenantFirtname,
          "UTLName": this.tenant.tenantLastname,
          "UTMobile": this.tenant.tenantMobnumber,
          "UTMobile1": this.tenant.tenantAltnumber,
          "UTEmail": this.tenant.tenantEmail,
          "UTEmail1": this.tenant.tenantAltemail,
        },
        "unitbankaccount": {
          "UBName": this.bank.BankName,
          "UBIFSC": this.bank.IFSC,
          "UBActNo": this.bank.AccountNumber,
          "UBActType": this.bank.accountType,
        },
        "UnitParkingLot": [{
          "UnitParkingLot": this.unit.parkingNo
          //vehicleNumber
        }]
      }]
    };
    console.log(JSON.stringify(this.unit.parkingNo));
    console.log(JSON.stringify(this.createUnitData));
    this.viewUniService.createUnit(this.createUnitData).subscribe(res => {
      console.log("Done")
      //alert("Unit Created Successfully");

      Swal.fire({
        title: 'Unit Created Successfuly',
        //text: 'You will not be able to recover this imaginary file!',
        //type: 'warning',
        // showCancelButton: true,
        //confirmButtonText: 'Yes, delete it!',
        //cancelButtonText: 'No, keep it'
      })
      /*
      .then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          )
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      });
      */

    });

  }//createUnit function ends

  viewUnit(repUnit: any) {
    console.log(JSON.stringify(repUnit));
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    this.viewUnitRow = {
      unitNo: repUnit.unUniName,
      unitType: repUnit.unUniType,
      unitDimen: repUnit.unDimens,
      rate: repUnit.unRate,
      calculationType: repUnit.unCalType,
      ownershipStatus: repUnit.unOwnStat
    };

  }

  getAllUnitDetailsByBlockID(blBlockID){
    /*-------------------Get Unit List By Block ID ------------------*/
    this.viewUniService.GetUnitListByBlockID(blBlockID)
    .subscribe(data=>{
      console.log(data);
      this.allUnitBYBlockID = data['data'].unitsByBlockID;
    });
};

}//class ends
