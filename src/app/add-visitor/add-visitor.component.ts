import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import {DashBoardService} from '../dash-board/dash-board.service';
import {AddVisitorService} from '../services/add-visitor.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-add-visitor',
  templateUrl: './add-visitor.component.html',
  styleUrls: ['./add-visitor.component.css']
})
export class AddVisitorComponent implements OnInit {
  INFName: any;
  INLName: any;
  INMobile: any;
  INVchlNo: any;
  INEmail: any;
  INPOfInv: any;
  INVisCnt: any;
  INSDate: any;
  INEDate: any;
  todayDate: Date;


  constructor(private globalService: GlobalServiceService, private addvisitorservice: AddVisitorService,
private dashBoardservice: DashBoardService, private router: Router) {
    this.INFName = '';
    this.INLName = '';
    this.INMobile = '';
    this.INVchlNo = '';
    this.INEmail = '';
    this.INPOfInv = '';
    this.INVisCnt = '';
    this.INSDate = '';
    this.INEDate = '';
    this.todayDate=new Date();
  }

  ngOnInit() {
  }
  addVisitor() {
    console.log( this.INFName ,
    this.INLName ,
    this.INMobile ,
    this.INVchlNo ,
    this.INEmail ,
    this.INPOfInv ,
    this.INVisCnt ,
    this.INSDate ,
    this.INEDate )
    let visitorData = {
      "MeMemID": this.dashBoardservice.mrmRoleID,
      "UnUnitID": this.globalService.currentUnitId,
      "INFName": this.INFName,
      "INLName": this.INLName,
      "INMobile": this.INMobile,
      "INEmail": this.INEmail,
      "INVchlNo": this.INVchlNo,
      "INVisCnt": this.INVisCnt,
      "INPhoto": "SD",
      "INSDate": this.INSDate,
      "INEDate": this.INEDate,
      "INPOfInv": this.INPOfInv,
      "INMultiEy": "true",
      "ASAssnID": this.globalService.currentAssociationId,
      "INQRCode": "True",
      "ACAccntID": this.globalService.getacAccntID()
    };
    this.addvisitorservice.addVisitor(visitorData)
    .subscribe(data=>{
      console.log(data);
      swal.fire({
        title: "Visitor Added Successfully",
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#f69321",
        confirmButtonText: "OK",
      });
    },
    err=>{
      console.log(err);
    })
  }


  goBack(){
    this.router.navigate(['home/guest'])
  }
}
