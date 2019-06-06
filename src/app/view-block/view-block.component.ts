import { Component, OnInit } from '@angular/core';
import { ViewBlockService } from './view-block.service';
import { GlobalServiceService } from '../global-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-block',
  templateUrl: './view-block.component.html',
  styleUrls: ['./view-block.component.css']
})
export class ViewBlockComponent implements OnInit {
  blocksData: boolean = true;
  addBlock_form: boolean = false;
  dimensionBasedRate: boolean = false;
  flatRatevalue: boolean = false;
  currentAssociationID: string;
  allBlocksLists: any = [];
  block: any = {};
  bank: any = {};
  createBlockData: any = {};
  associationID: string;
  ACAccntID: string;
  ASAssnID: string;
  currentAssociationName: string;
  config: any;
  viewBlockRow: any = {};
  assnName: string;
  totalNoofblocks: number;
  availableNoOfBlocks: number;




  constructor(private viewBlkService: ViewBlockService,
    private globalService: GlobalServiceService,
    private router: Router) {
    //pagination
    this.config = {
      itemsPerPage: 10,
      currentPage: 1
    };
  }


  pageChanged(event) {
    this.config.currentPage = event;
  }


  ngOnInit() {
    this.currentAssociationID = this.globalService.getCurrentAssociationId();
    this.currentAssociationID = '4217';
    this.currentAssociationName = this.globalService.getCurrentAssociationName();
    this.currentAssociationName = 'MAMAJI ASSOCIATION';
    this.getBlockDetails();
    this.viewBlkService.getassociationlist(this.currentAssociationID)
      .subscribe(data => {
        this.assnName = data['data'].association.asAsnName;
        this.totalNoofblocks = data['data'].association.asNofBlks
      });
  }


  getBlockDetails() {
    this.viewBlkService.getBlockDetails(this.currentAssociationID).subscribe(data => {
      console.log('getBlockDetails', data);
      this.allBlocksLists = data['data'].blocksByAssoc;
      this.availableNoOfBlocks = data['data'].blocksByAssoc.length;
    });
  }

  addBlocksValidation() {
    let totalNoofblocks = this.totalNoofblocks;
    let availableNoOfBlocks = this.availableNoOfBlocks;
    if (totalNoofblocks <= availableNoOfBlocks) {
      Swal.fire({
        title: "Block limit Reached",
        text: "Press Yes to Go Floors Details",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#f69321",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(
        (result) => {

          if (result.value) {
            this.router.navigate(['viewFloors']);
          }
          else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
          }
        }
      )
    } else {
      this.router.navigate(['addBlocks']);
    }
  }

  addBlockForm() {
    this.blocksData = false;
    this.addBlock_form = true;

    console.log(JSON.stringify(this.frequencys));
  }
  /*
    checkRate(){
        this.dimensionBasedRate=false;
        this.flatRatevalue=true; 
    }
  
    checkRate1(){
      this.dimensionBasedRate=true;
      this.flatRatevalue=false; 
  }
  */
  checkRate() {

    if (this.block.rate == true) {
      this.flatRatevalue = true;
    }
    else {
      this.flatRatevalue = false;
    }
    if (this.block.rate1 == true) {
      this.dimensionBasedRate = true;
    }
    else {
      this.dimensionBasedRate = false;
    }

  }

  latePaymentChargeTypes: any = [
    { "name": "Monthly", "displayName": "Monthly" },
    { "name": "Quaterly", "displayName": "Quaterly" },
    { "name": "HalfYearly", "displayName": "HalfYearly" },
    { "name": "Annually", "displayName": "Annually" }
  ];

  frequencys: any = [
    { "name": "Monthly", "displayName": "Monthly" },
    { "name": "Quaterly", "displayName": "Quaterly" },
    { "name": "HalfYearly", "displayName": "Half Yearly" },
    { "name": "Annually", "displayName": "Annually" }
  ];

  accountTypes: any = [
    { "name": "Saving" },
    { "name": "Current" }
  ];

  createBlock() {
    this.createBlockData = {
      "ASAssnID": this.currentAssociationID,
      "ACAccntID": "21",
      "blocks": [{
        "BLBlkName": this.block.blockname,
        "BLBlkType": this.block.blocktype,
        "BLNofUnit": this.block.noofunits
      }]
    };

    console.log(JSON.stringify(this.createBlockData));
    this.viewBlkService.createBlock(this.createBlockData).subscribe(res => {
      console.log("Done")
      //alert("Block Created Successfully")
    });

    Swal.fire({
      title: 'Block Created Successfuly',

    })
  }//createBlock function ends


  viewBlock(repBlock) {
    this.viewBlockRow = {
      blockName: repBlock.blBlkName,
      blockType: repBlock.blBlkType,
      unitNo: repBlock.blNofUnit
    };
  }



}//export class ViewBlockComponent
