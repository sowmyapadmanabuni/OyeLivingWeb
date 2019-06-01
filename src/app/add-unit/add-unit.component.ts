import { Component, OnInit } from '@angular/core';
import { ViewUnitService } from '../view-unit/view-unit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.css']
})
export class AddUnitComponent implements OnInit {
  currentAssociationName:string;
  blockID: string;
  allUnitBYBlockID: any[];
  blBlockID: string;
  showCreateUnitemplate:boolean;
  calculationTypes:object[];

  unitTypes:object[];
  unitType:string;
  unitno:number;
  unitdimension:number;
  unitrate:number;
  calculationtype:string;
  occupency:string;
  ownerFirtname:string;
  ownerLastname:string;
  ownerMobnumber:number;
  ownerAltnumber:number;
  ownerEmail:string;
  ownerAltemail:string;
  tenantFirtname:string;
  tenantLastname:string;
  tenantMobnumber:number;
  tenantEmail:string;
  occupencys:object[];
  tenantDetails: boolean = false;
  ownerDetails: boolean = true;
  currentAssociationID:string;
  allBlocksLists: any[];

  constructor(private viewUniService: ViewUnitService) {

    this.currentAssociationName = 'MANAS ASSOCIATION';
    this.blBlockID = '';
    this.occupency='';
    this.unitType='';
    this.calculationtype='';

    this.unitTypes = [
      { "name": "Flat" },
      { "name": "Villa" },
      { "name": "Vaccant Plot" }
    ];

    this.calculationTypes = [
      { "name": "Flat Rate Value" },
      { "name": "Dimension Based" }
    ];

    this.occupencys = [
      { "name": "Sold Owner Occupied" },
      { "name": "Sold Tenant Occupied" },
      { "name": "Sold Vaccant" },
      { "name": "Unsold Vaccant" },
      { "name": "Unsold Tenant Occupied" }
    ];

   }

  ngOnInit() {
    this.currentAssociationID = '1156';
    this.viewUniService.GetBlockListByAssocID(this.currentAssociationID)
    .subscribe(data => {
      this.allBlocksLists = data['data'].blocksByAssoc;
      console.log('allBlocksLists',this.allBlocksLists);
    });
  }

  getAllUnitDetailsByBlockID(blBlockID) {
    this.blockID = blBlockID;
    /*-------------------Get Unit List By Block ID ------------------*/
    this.viewUniService.GetUnitListByBlockID(blBlockID)
      .subscribe(data => {
        console.log('allUnitBYBlockID',data);
        this.allUnitBYBlockID = data['data'].unitsByBlockID;
      });

      this.showCreateUnitemplate=true;
  }

  tenantOwnerdiv(occupency) {
    this.occupency=occupency;
    this.occupencys.forEach(item => {
      if (occupency == 'Unsold Vaccant') {
        this.tenantDetails = true;
        this.ownerDetails = false;
      }
      else if (occupency == 'Unsold Tenant Occupied') {
        this.tenantDetails = true;
        this.ownerDetails = false;
      }
      else {
        this.tenantDetails = false;
        this.ownerDetails = true;
      }
    })
  }

  createUnit() {
    let createUnitData =
    {
      "ASAssnID": 1156,
      "ACAccntID": 21,
      "units": [
        {
          "UNUniName": this.unitno,
          "UNUniType": this.unitType,
          "UNRate": this.unitrate,
          "UNOcStat": this.occupency,
          "UNOcSDate": "2019-03-02",
          "UNOwnStat": "null",
          "UNSldDate": "2019-03-02",
          "UNDimens": this.unitdimension,
          "UNCalType": this.calculationtype,
          "FLFloorID": 1,
          "BLBlockID": this.blockID,
          "Owner":
          {

            "UOFName": this.ownerFirtname,
            "UOLName": this.ownerLastname,
            "UOMobile": this.ownerMobnumber,
            "UOISDCode": "+91",
            "UOMobile1": this.ownerAltnumber,
            "UOMobile2": "null",
            "UOMobile3": "null",
            "UOMobile4": "null",
            "UOEmail": this.ownerEmail,
            "UOEmail1": this.ownerAltemail,
            "UOEmail2": "null",
            "UOEmail3": "null",
            "UOEmail4": "null",
            "UOCDAmnt": ""
          },
          "Tenant":
          {

            "UTFName":this.tenantFirtname,
            "UTLName": this.tenantLastname,
            "UTMobile": this.tenantMobnumber,
            "UTISDCode": "",
            "UTMobile1": "",
            "UTEmail": this.tenantEmail,
            "UTEmail1": ""
          },
          "UnitParkingLot":
            [
              {
                "UPLNum": "null",
                "MEMemID": "null",
                "UPGPSPnt": "null"

              }
            ]
        }
      ]
    }

    console.log(JSON.stringify(createUnitData));
    this.viewUniService.createUnit(createUnitData).subscribe((response) => {

      Swal.fire({
        title: 'Unit Created Successfuly',
        type: 'success',
        confirmButtonText: 'OK'
      })

    },
      (response) => {
        console.log(response);
      });

  }

}
