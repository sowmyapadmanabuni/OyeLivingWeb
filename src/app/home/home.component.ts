import { Component, OnInit,HostListener } from '@angular/core';
import {GlobalServiceService} from '../global-service.service';
import { LoginAndregisterService } from '../services/login-andregister.service';
import {DashBoardService} from '../dash-board/dash-board.service';
import {HomeService} from './home.service';
import {Router, NavigationEnd, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute} from '@angular/router';
//declare var $: any;
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander(event) {
    return false;
  }

  isvalidaccountId:boolean;
  acAccntID:number;
  returnUrl:string;

  title = 'OYESPACE. You Live It. We Manage It';
  accountID:number;
  account:any[];
  acfName: any;
  aclName: any;

  constructor(private globalService: GlobalServiceService,
    private dashboardservice: DashBoardService,
    private router: Router,
    private avroute: ActivatedRoute,
    private homeservice:HomeService) {

    this.acAccntID = this.globalService.acAccntID;
    //alert('in home component');
    //alert('this.globalService.acAccntID'+this.globalService.acAccntID);

    if (this.acAccntID == undefined) {
      //alert('acAccntID undefined');
      //alert('in app acAccntID-' + this.acAccntID);
      //this.isvalidaccountId = false;
      //this.router.navigate(['/login']);
      //alert('isvalidaccountId-' + this.isvalidaccountId);
    }

    //alert('inside home component');
    //alert('displaying accountID..' + this.accountID);
    //alert('displaying mrroleid-'+this.dashboardservice.mrmRoleID);

  }

  ngOnInit() {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // this.router.events.subscribe((evt) => {
    //   if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });
this.getAccountFirstName();
    this.getMembers();
  }

  ngAfterViewInit() {
    //alert('inside home component-ngAfterViewInit');
    $(document).ready(function () {
      //alert('inside document.ready fuction')

      $(document).unbind().on('click', '#sidebarCollapse', function () {
        //alert('inside sidebarCollapse');
        $('#sidebar, #content').toggleClass('active');
      });

      $(document).on('click', ".dropdown-btn", function () {
        $(".dropdown-container").slideToggle();
      });

      $(document).on('click', ".dropdown-btns", function () {
        $(".dropdown-children").slideToggle();
      });

    });
  }

  getAccountFirstName(){
    this.dashboardservice.getAccountFirstName(this.acAccntID).subscribe(res => {
      var data:any = res;
      this.account = data.data.account;
     this.acfName= this.account[0]['acfName'];
     this.aclName= this.account[0]['aclName'];
     this.dashboardservice.acfName=this.acfName;
      });
}

  gotoLoginPage() {
    this.globalService.acAccntID=undefined;
    this.router.navigate(['login']);
  }

  gotoViewassociation(){
    //alert('gotoViewassociation 109');
    this.homeservice.toggleviewassociationtable=true;
    this.router.navigate(['home/association']);
  }

  getMembers() {
    //alert('inside getmembers');
    this.dashboardservice.getMembers(this.accountID).subscribe(res => {
      this.dashboardservice.mrmRoleID = res['data'].memberListByAccount[0]['mrmRoleID'];
      console.log(this.dashboardservice.mrmRoleID);
    },
      res => {
        console.error();
      });
  }

  enableMyMenus(event) {
    //alert(event);
    this.router.navigate(['dashboard']);
  }

  goToAssociation(){
    //alert('gotoViewassociation 130');
    //alert('goToAssociation');
    this.homeservice.toggleviewassociationtable=true;
    this.router.navigate(['home/association']);
  }

  enableViewAssociationTable(){
    //alert('enableViewAssociationTable 137');
    this.homeservice.toggleviewassociationtable=true;
    this.router.navigate(['home/association']);
  }

}
