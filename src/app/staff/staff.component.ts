import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '../global-service.service'
import { ViewStaffService } from '../services/view-staff.service'
  import { from } from 'rxjs';
  import * as _ from 'underscore';
  import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  modalRef: BsModalRef;
  StartDate: any;
  EndDate: any;
  WorkerNameList: any[];
  reportlists: any[];
  WorkerID: any;
  constructor(private globalServiceService: GlobalServiceService,private modalService: BsModalService, private viewStaffService: ViewStaffService) {
    this.EndDate = '';
    this.StartDate = '';
    this.WorkerNameList= [];
    this.reportlists= [];
    this.WorkerID= '';
   }
  ngOnInit() {
    this.StaffList();
  }
StaffList(){
  this.viewStaffService.GetStaffList()
  .subscribe(data=>{
    console.log(data);
    this.WorkerNameList=data['data']['worker'];
    this.WorkerNameList = _.sortBy(this.WorkerNameList, e => e['wkfName']);
    console.log(this.WorkerNameList);
  },
  err=>{
    console.log(err);
  })
}

OpenModalForReport(Reporttemplate: TemplateRef<any>, wkWorkID) {
  console.log(wkWorkID);
  let Data = {
    "StartDate": this.StartDate,
    "EndDate": this.EndDate,
    "wkWorkID": wkWorkID
  }
 this.viewStaffService.getStaffReport(Data)
 .subscribe(data=>{
   console.log(data);
   this.reportlists=data['data']['worker'];
   console.log(this.reportlists);
 },
 err=>{
   console.log(err);
 })
  this.modalRef = this.modalService.show(Reporttemplate,Object.assign({}, { class: 'gray modal-lg' }));
}
}