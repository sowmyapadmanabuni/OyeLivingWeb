import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import {GuestService} from '../services/guest.service'
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';


@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {
  modalRef: BsModalRef;
  invitationList: any[];
  invitationListLength: boolean;
  ToDate: any;
  StartDate: any;
  INInvVis: any;



  constructor(private globalService: GlobalServiceService, private guestService: GuestService,
    private modalService: BsModalService,
    private router: Router ) { 
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
    this.guestService.getVisitorList(date,"Invited")
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

  gotoAddVisitor(){
    this.router.navigate(['home/addguest'])
  }
  gotoViewVisitor(){
    this.router.navigate(['home/viewvisitor'])
  }


  // ALL ABOUT OQ CODE--------------$%$%
  qrcodename : any;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: any;
  display = false;
  href : string;
  generateQRCode(){
    if(this.qrcodename == ''){
      this.display = false;
      alert("Please enter the name");
      return;
    }
    else{
      this.value = this.qrcodename;
      this.display = true;
    }
  }
  downloadImage(){
    this.href = document.getElementsByTagName('img')[0].src;
  }

  //  ------POPUP for QR CODE-----//
  OpenModalForQRcode(QRtemplate: TemplateRef<any>, infName,inMobile,inInvtID,unUnitID,insDate,ineDate,inVisCnt,asAssnID,inIsActive) {
    console.log(infName,inMobile,inInvtID,unUnitID,insDate,ineDate,inVisCnt,asAssnID,inIsActive);
    let qrCodeData={
      'infName':infName,
      'inMobile':inMobile,
      'inInvtID':inInvtID,
      'unUnitID':unUnitID,
      'insDate':insDate,
      'ineDate':ineDate,
      'inVisCnt':inVisCnt,
      'asAssnID':asAssnID,
      'inIsActive':inIsActive
    }
    this.display = true;
    this.value=JSON.stringify(qrCodeData);
    this.modalRef = this.modalService.show(QRtemplate,Object.assign({}, { class: 'gray modal-lg' }));

  }
}


