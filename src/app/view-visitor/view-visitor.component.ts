import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import {GuestService} from '../services/guest.service'
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-visitor',
  templateUrl: './view-visitor.component.html',
  styleUrls: ['./view-visitor.component.css']
})
export class ViewVisitorComponent implements OnInit {
  modalRef: BsModalRef;
  invitationList: any[];
  invitationListLength: boolean;
  ToDate: any;
  StartDate: any;
  INInvVis: any;

  constructor(private globalService: GlobalServiceService, private guestService: GuestService,
    private modalService: BsModalService,
    private router: Router) {
      this.invitationList = [];
      this.invitationListLength=false;
      this.ToDate = '';
      this.StartDate = ''
     }

  ngOnInit() {
    this.getVisitorList();
  }
  getVisitorList(){
    let date = {
      "StartDate": this.StartDate,
      "Todate": this.ToDate
    }
    console.log(date);
    this.guestService.getVisitorList(date,"Visited")
    .subscribe(data=>{
      console.log(data);
      this.invitationList = data['data']['invitation'];
      console.log(this.invitationList);
      if(this.invitationList.length>0){
        this.invitationListLength=true;
      }
    },
    err=>{
      console.log(err);
    }
    )
  }

}
