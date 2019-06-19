import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AddBlockService } from '../services/add-block.service';
import { GlobalServiceService } from '../global-service.service';
import swal from 'sweetalert2';
import { ViewChild } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-add-blocks',
  templateUrl: './add-blocks.component.html',
  styleUrls: ['./add-blocks.component.css']
})
export class AddBlocksComponent implements OnInit {

  frequencies: object[];
  assnName: string;
  bsConfig: object;
  latePymtChrgTypes: object[];
  addRate: string;
  addRate1: string;

  blockname: string;
  blocktype: string;
  noofunits: number;
  mngName: string;
  mobile: number;
  manageremail: number;
  flatRatevalue: number;
  maintenanceValue: number;
  measurements: number;
  billGenerationDate: Date;
  dueDate: string;
  latePymtChargeType: string;
  latePymtCharge: number;
  startsFrom: Date;
  frequency: string;

  blocktypes: object[];

  minDate: Date;
  startsFromMaxDate: Date;

  currentAssociationID: string;
  currentAssociationName: string;

  @ViewChild('ctrateBlockform') ctrateBlockform: any;


  constructor(private addblockservice: AddBlockService,
    private globalservice: GlobalServiceService) {
    this.currentAssociationID = this.globalservice.getCurrentAssociationId();
    this.currentAssociationName = this.globalservice.getCurrentAssociationName();
    this.assnName = this.currentAssociationName;
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange', dateInputFormat: 'YYYY-MM-DD' });
    this.frequency = '';
    this.latePymtChargeType = '';
    this.blocktype = '';

    this.latePymtChrgTypes = [
      { "name": "Monthly", "displayName": "Monthly" },
      { "name": "quaterly", "displayName": "Quaterly" },
      { "name": "Annually", "displayName": "Annually" }
    ];

    this.frequencies = [
      { "name": "Monthly", "displayName": "Monthly" },
      { "name": "Quarterly", "displayName": "Quarterly" },
      { "name": "Half Yearly", "displayName": "Half Yearly" },
      { "name": "Yearly", "displayName": "Yearly" }
    ];

    this.blocktypes = [{
      'name': 'Residential', 'displayName': 'Residential'
    },
    {
      'name': 'Commercial', 'displayName': 'Commercial'
    },
    {
      'name': 'Residential and Commercial', 'displayName': 'Residential and Commercial'
    }]

  }

  ngOnInit() {
    $(document).ready(function () {
      $("intlphone").click(function () {
        alert('button clicked');
      });
    });
  }

  onValueChange(value: Date): void {
    console.log(value);
    this.minDate = new Date(value);
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  onDueDateValueChange(value: Date) {
    this.startsFromMaxDate = new Date(value);
    this.startsFromMaxDate.setDate(this.startsFromMaxDate.getDate() + 1);
  }

  checkRate(rate) {
    if (rate == true) {
      this.addRate = 'flatRatevalue';
    } else {
      this.addRate = '';
    }
  }

  checkRate1(rate1) {
    if (rate1 == true) {
      this.addRate1 = 'dimension';
    } else {
      this.addRate1 = '';
    }
  }

  passvalue(frequency) {
    console.log(frequency);
  }

  createBlock(frm) {
    frm.classList.add('was-validated');
    if (this.ctrateBlockform.valid) {
      let CreateBockData = {
        "ASAssnID": this.currentAssociationID,
        "ACAccntID": 21,
        "blocks": [
          {
            "ASAssnID": this.currentAssociationID,
            "BLBlkName": this.blockname,
            "BLBlkType": this.blocktype,
            "BLNofUnit": this.noofunits,
            "BLMgrName": this.mngName,
            "BLMgrMobile": this.mobile,
            "BLMgrEmail": this.manageremail,
            "ASMtType": '',
            "ASMtDimBs": this.maintenanceValue,
            "ASMtFRate": this.flatRatevalue,
            "ASUniMsmt": this.measurements,
            "ASBGnDate": formatDate(this.billGenerationDate, 'yyyy/MM/dd', 'en'),
            "ASLPCType": this.latePymtChargeType,
            "ASLPChrg": this.latePymtCharge,
            "ASLPSDate": formatDate(this.startsFrom, 'yyyy/MM/dd', 'en'),
            "ASDPyDate": formatDate(this.dueDate, 'yyyy/MM/dd', 'en'),
            "BankDetails": ''
          }
        ]
      }

      console.log('CreateBockData', CreateBockData);
      this.addblockservice.createBlock(CreateBockData)
        .subscribe(data => {
          console.log(data);
          swal.fire({
            title: "Block Created Successfully",
            text: "",
            type: "success",
            confirmButtonColor: "#f69321"
          });
        },
          () => {
            swal.fire({
              title: "Error",
              text: "Block Creation Unsuccessfull",
              type: "error",
              confirmButtonColor: "#f69321"
            });
          });

    }
  }

  removeValidationClass(frm) {
    frm.classList.remove('was-validated');
  }

}
