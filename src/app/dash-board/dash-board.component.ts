import { Component, OnInit } from '@angular/core';
import {DashBoardService} from './dash-board.service';
import {GlobalServiceService} from '../global-service.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  associations:any= [];
  allMemberByAccount=[];
  allTicketByAssociation=[];
  allVehicleListByAssn=[];
  allStaffByAssn=[];
  allVisitorsByAssn=[];
  accountID:string;
  totalMember:string;
  associationID:string;
  totalTickets:string;
  totalVehicles:string;
  totalStaffs:string;
  totalVisitors:string;
  amount:string;
  AssociationAmountDue:boolean=false;
  memberDeatils:boolean=false;
  ticketDetails:boolean=false;
  vehicleDetails:boolean=false;
  currentAssociationName:string="Association Not Selected";
  association:string;
  amt:any[];
 

  constructor(private dashBrdService: DashBoardService, private appComponent:AppComponent,
     private globalService:GlobalServiceService) { 
       this.association='';

     }

  ngOnInit() {
    this.accountID="21";
    this.getAssociation();
    this.getAmount();
    this.getMembers();
    this.getTickets();
    this.getVehicle();
    this.getStaff();
    this.getVistors();

  }

  getAssociation(){
    console.log(this.accountID);
    this.dashBrdService.getAssociation(this.accountID).subscribe(res => {
      //console.log(JSON.stringify(res));
      var data:any = res;
      this.associations = data.data.associationByAccount;
      console.log('associations',this.associations);
      });
  }
  getAmount(){
    this.dashBrdService.getAmount(this.associationID).subscribe(res=>{
      console.log('amount',res);
      // if (res['data']['errorResponse']) {
      //   this.amount = "0";
      // }
      // else if (res['data']['payments'][1].pyAmtDue) {
      //   this.amount=res['data']['payments'][1].pyAmtDue;
        
      // }
     this.amt =  res['data']['payments'].filter(item=>{
         console.log(item);
         if(item['pyStat'] == "UnPaid"){
         return item['pyAmtDue'];
         }
         })
      
       console.log('amounts',this.amt[0]['pyAmtDue']);
       this.amount = this.amt[0]['pyAmtDue'];
    })
  }

  getMembers(){
      this.dashBrdService.getMembers(this.accountID).subscribe(res => {
        //console.log(JSON.stringify(res));
        var data:any = res;
        this.allMemberByAccount = data.data.memberListByAccount;
        console.log('allMemberByAccount',this.allMemberByAccount);
        this.totalMember= data.data.memberListByAccount.length;
        });
  }

  getTickets() {
    this.dashBrdService.getTickets(this.associationID).subscribe(res => {
      console.log('ticketresult-', res);
      if (res['data']['errorResponse']) {
        this.totalTickets = "0";
      }
      else if (res['data']['ticketing']) {
        this.allTicketByAssociation = res['data']['ticketing'];
        this.totalTickets = res['data']['ticketing'].length;
        console.log('totalTickets', this.totalTickets);
      }
      // var data:any = res;

    });
  }

  getVehicle(){
      this.dashBrdService.getVehicle(this.associationID).subscribe(res => {
        console.log('vehicle',res);
        var data:any = res;
        this.allVehicleListByAssn = data.data.vehicleListByAssocID;
        this.totalVehicles= data.data.vehicleListByAssocID.length;
        });
  }
  getStaff(){
    this.dashBrdService.getStaff(this.associationID).subscribe(res=>{
      console.log('staff',res);
      if (res['data']['errorResponse']) {
        this.totalStaffs = "0";
      }
      else if (res['data']['worker']) {
        this.allStaffByAssn=res['data']['worker'];
      this.totalStaffs=res['data']['worker'].length;
        
     }
    })
  }
  getVistors(){
    this.dashBrdService.getVisitors(this.associationID).subscribe(res=>{
      console.log('visitors',res);
      if (res['data']['errorResponse']) {
        this.totalVisitors = "0";
      }
      else if (res['data']['visitorLog']) {
        this.allStaffByAssn=res['data']['visitorLog'];
      this.totalVisitors=res['data']['visitorLog'].length;
        
     }
    })
  }

  loadAssociation(associationName:string){
    this.appComponent.myMenus=true;
    //console.log("Selected AssociationName: " + JSON.stringify(this.associations));
    this.currentAssociationName = associationName;
    this.associations.forEach(association => {
      if(association.asAsnName == associationName)
      {
        this.globalService.setCurrentAssociationId(association.asAssnID);
        this.globalService.setCurrentAssociationName(associationName);
        this.associationID=this.globalService.getCurrentAssociationId();
        console.log("Selected AssociationId: " + this.globalService.getCurrentAssociationId());
      }
      
    });
    this.getAmount();
    this.getMembers();
    this.getTickets();
    this.getVehicle();
    this.getStaff();
    this.getVistors();
    
  }

  assnAmountDue(){
  this.AssociationAmountDue=true;
  this.memberDeatils=false;
  this.ticketDetails=false;
  this.vehicleDetails=false;
  }

  members(){
    this.AssociationAmountDue=false;
    this.memberDeatils=true;
    this.ticketDetails=false;
    this.vehicleDetails=false;
  }

  tickets(){
    this.AssociationAmountDue=false;
    this.memberDeatils=false;
    this.ticketDetails=true;
    this.vehicleDetails=false;
  }

 vehicles(){
     this.vehicleDetails=true;
     this.AssociationAmountDue=false;
     this.memberDeatils=false;
     this.ticketDetails=false;
 }

}