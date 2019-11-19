import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as _ from 'underscore';
import { UnitListForRoleChange } from '../unit-list-for-role-change';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {UtilsService} from '../utils/utils.service';
import {GlobalServiceService} from '../global-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-family-member',
  templateUrl: './add-family-member.component.html',
  styleUrls: ['./add-family-member.component.css']
})
export class AddFamilyMemberComponent implements OnInit {

  scopeIP: string;
  associationsforchangerole: any = [];
  unitlistbyassociationid: any[];
  scriptIP: string;
  headers: HttpHeaders;
  loadchangedforassociation: boolean;
  unitlistforrolechangeobsrvbl: Observable<UnitListForRoleChange[]>;
  unitlistforrolechange: UnitListForRoleChange[];
  associationname: any;
  role: any[];
  unitID: any;
  asAssnID: any;
  AccountID: any;
  UnitlidtForAssnID: any;
  familymemberarray: any[];
  modalRef: BsModalRef;
  FirstName: any;
  MobileNumber: any;
  Relation: any;
  EditFirstName: any;
  EditMobileNumber: any;
  EditRelation: any;
  fmid:any;

  constructor(private http: HttpClient, private router: Router,
    private modalService: BsModalService,private utilsService:UtilsService,
    private globalService:GlobalServiceService) {
    this.scopeIP = "https://apidev.oyespace.com/";
    this.scriptIP = "1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('X-Champ-APIKey', this.scriptIP)
      .append('Access-Control-Allow-Origin', "*");
    this.asAssnID = this.globalService.currentAssociationId;
    this.unitlistbyassociationid = [];
    this.UnitlidtForAssnID = '';
    this.familymemberarray = [];
    this.FirstName = '';
    this.MobileNumber = '';
    this.Relation = '';
    this.loadchangedforassociation = false;
    this.unitID=this.globalService.currentUnitId;
    this.AccountID=this.globalService.getacAccntID();
    this.EditFirstName='';
    this.EditMobileNumber='';
    this.EditRelation='';
  }

  ngOnInit() {
    this.getAssociation();
    this.loadUnitForAssociation(this.unitID);
  }
  getAssociation() {
    let scopeIP=this.utilsService.getAssociation();
    // return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAssociationListByAccountID/' + this.globalserviceservice.acAccntID, { headers: this.headers })
    return this.http.get(scopeIP + 'oyeliving/api/v1/association/getassociationlist', { headers: this.headers })
      //http://192.168.1.254:52/oyeliving/api/v1/association/getassociationlist
      .subscribe((data) => {
        console.log(data);
        this.associationsforchangerole = data['data']['associations'];
        this.associationsforchangerole = _.sortBy(this.associationsforchangerole, e => e['asAsnName']);
        console.log(this.associationsforchangerole); //acAccntID asAssnID

      })
  }
  loadAssociationforchangerole(asAssnID) {
    this.unitlistforrolechangeobsrvbl = of([]);
    this.unitlistforrolechange = [];
    console.log(asAssnID);
    this.associationname = asAssnID; //ASSOCIATION ID
    let scopeIP=this.utilsService.loadAssociationforchangerole();
    this.http.get(scopeIP + `oyeliving/api/v1/Unit/GetUnitListByAssocID/${asAssnID}`, { headers: this.headers })
      .subscribe(data => {
        console.log(data);
        this.unitlistbyassociationid = data['data']['unit'];
        console.log(data['data']['unit']);
        Array.from(data['data']['unit']).forEach(item => {
          console.log(item['blBlockID']);
          console.log(item['unUnitID']);
          //this.UnitID = item['unUnitID']; //WILL GET UNIT ID
          //this.blockID = item['blBlockID']; //WILL GET BLOCK ID
          console.log(item['block']);
          this.unitlistforrolechange.push(new UnitListForRoleChange(
            item['asAssnID'],
            item['unUnitID'],
            ((item['block'] == null || item['block'] == undefined) ? '' : item['block']['blBlkName']),
            item['unUniName'],
            ((item['owner'].length == 0) ? (item['tenant'].length == 0 ? '' : item['tenant'][0]['utfName']) : item['owner'][0]['uofName']),
            ((item['owner'].length == 0) ? ((item['tenant'].length == 0 ? '' : (item['tenant'][0]['utMobile'].includes("+91", 3)) ? item['tenant'][0]['utMobile'].slice(3) : item['tenant'][0]['utMobile'])) : ((item['owner'][0]['uoMobile'].includes("+91", 3)) ? item['owner'][0]['uoMobile'].slice(3) : item['owner'][0]['uoMobile'])),
            ((item['owner'].length == 0) ? '' : ((item['owner'][0]['uoRoleID'] == 1) ? 'Admin' : '')),
            this.role,
            '',
            item['unOcStat'],
            item['blBlockID']));
        })
        console.log(this.unitlistforrolechange);
        let unitlistforrolechangeOrderbyBlk = _.sortBy(this.unitlistforrolechange, e => e['blBlkName']);
        // let unitlistforrolechangeOrderbyBlk = this.unitlistforrolechange.sort((a, b) => {
        //   return a[1] - b[1];
        // });
        //let unitlistforrolechangeOrderbyUnt = _.sortBy(unitlistforrolechangeOrderbyBlk, e => e['unUniName']);
        this.unitlistforrolechangeobsrvbl = of(unitlistforrolechangeOrderbyBlk);
      },
        err => {
          Swal.fire({
            title: "Error",
            text: `${err['error']['error']['message']}`,
            type: "error",
            confirmButtonColor: "#f69321"
          })
        })

    //http://localhost:54400/oyeliving/api/v1/Unit/GetUnitListByAssocID/%7BAssociationID%7D
  }
  loadUnitForAssociation(UnitlidtForAssnID) {
    this.familymemberarray = [];
    console.log(UnitlidtForAssnID);
    // this.unitID = UnitlidtForAssnID;
    // let unitlistbyassociationid = this.unitlistbyassociationid.filter(item => {
    //   return item['unUnitID'] == UnitlidtForAssnID;
    // })
    // console.log(unitlistbyassociationid);
    //this.unitID = unitlistbyassociationid[0]['unUnitID'];
    //this.asAssnID = unitlistbyassociationid[0]['asAssnID'];
    //if (unitlistbyassociationid[0]['owner'].length > 0) {
      //this.AccountID = unitlistbyassociationid[0]['owner'][0]['acAccntID'];
      console.log('unitID', this.unitID);
      console.log('AccountID', this.AccountID);
      console.log('asAssnID', this.asAssnID);
      let headers = new HttpHeaders().append('Content-Type', 'application/json')
        .append('X-OYE247-APIKey', '7470AD35-D51C-42AC-BC21-F45685805BBE')
        .append('Access-Control-Allow-Origin', "*");
        let scopeIP=this.utilsService.loadUnitForAssociation();
      // http://apidev.oyespace.com/oyesafe/api/v1/GetFamilyMemberListByAssocAndUnitID/{UNUnitID}/{ASAssnID}/{AccountID}
      this.http.get(scopeIP + `oyesafe/api/v1/GetFamilyMemberListByAssocAndUnitID/${this.unitID}/${this.asAssnID}/${this.AccountID}`, { headers: headers })
        .subscribe(data => {
          console.log(data);
          this.familymemberarray = data['data']['familyMembers'];
          if (this.familymemberarray.length > 0) {
            this.loadchangedforassociation = true;
          }
          else {
            console.log(this.familymemberarray);
            this.loadchangedforassociation = false;
          }

        },
          err => {
            console.log(err);
          })
    //}
   /* else {
      this.loadchangedforassociation = false;
      Swal.fire({
        title: "No Owner Exist",
        text: '',
        type: "error",
        confirmButtonColor: "#f69321"
      })
    } */ 
  }

  backtocreateorexistingasn() {
    this.router.navigate(['createorenrollasn']);
  }

  addfamilymember() {
    let familymember = {
      "FMName": this.FirstName,
      "FMMobile": this.MobileNumber,
      "FMISDCode": "+91",
      "UNUnitID": this.unitID,
      "FMRltn": this.Relation,
      "ASAssnID": this.asAssnID,
      "FMImgName": "l.jpeg",
      "FMMinor": false,
      "FMLName": "P",
      "FMGurName": "somu",
      "PAccntID": this.AccountID
    }
    console.log(familymember);
    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('X-OYE247-APIKey', '7470AD35-D51C-42AC-BC21-F45685805BBE')
      .append('Access-Control-Allow-Origin', "*");
    let scopeIP = this.utilsService.addfamilymember();
    this.http.post(scopeIP + `oyesafe/api/v1/FamilyMember/create`, JSON.stringify(familymember), { headers: headers })
      .subscribe(data => {
        console.log(data);
        this.loadUnitForAssociation(this.unitID);
        this.modalRef.hide();
        Swal.fire({
          title: "Family Member Added Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        })
      },
        err => {
          console.log(err);
        })
  }

  resetFamilyMemberModal(){
    this.FirstName='';
    this.MobileNumber='';
    this.Relation='';
  }
  resetUpdateFamilyMemberModal(){
    this.EditFirstName='';
    this.EditMobileNumber='';
    this.EditRelation='';
  }

  openModal(requestdemo: TemplateRef<any>, asAssnID, unUnitID, blBlockID) {
    this.modalRef = this.modalService.show(requestdemo, Object.assign({}, { class: 'gray modal-lg' }));
  }
  OpenEditFamilyMemberModal(EditFamilyMemberModal: TemplateRef<any>,fmName,fmRltn,fmMobile,asAssnID,unUnitID,fmid){
    console.log(fmName,fmRltn,fmMobile,asAssnID,unUnitID,fmid);
    this.EditFirstName=fmName;
    this.EditMobileNumber=fmMobile;
    this.EditRelation=fmRltn;
    this.fmid=fmid;
    this.asAssnID=asAssnID;
    this.unitID=unUnitID;
    this.modalRef = this.modalService.show(EditFamilyMemberModal, Object.assign({}, { class: 'gray modal-lg' }));
  }
  updatefamilymember() {
    let updateFmailyMember = {
      "FMName": this.EditFirstName,
      "FMMobile": this.EditMobileNumber,
      "MEMemID": "1",
      "UNUnitID": this.unitID,
      "ASAssnID": this.asAssnID,
      "FMISDCode": "+91",
      "FMImgName": "1.jpg",
      "FMRltn": this.EditRelation,
      "FMLName": "M",
      "FMMinor": false,
      "FMGurName": "som",
      "FMID": this.fmid
    }

    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('X-OYE247-APIKey', '7470AD35-D51C-42AC-BC21-F45685805BBE');

    let scopeIP = this.utilsService.updatefamilymember();
    console.log(updateFmailyMember);
    this.http.post(scopeIP + `oyesafe/api/v1/FamilyMemberDetails/update`, JSON.stringify(updateFmailyMember), { headers: headers })
    .subscribe(data=>{
      console.log(data);
      if(data['data'] != null){
              Swal.fire({
        title: "Error",
        text: `${data['error']['message']}`,
        type: "error",
        confirmButtonColor: "#f69321"
      })
      }
      else{
        this.modalRef.hide();
        Swal.fire({
          title: "Family Member Updated Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321",
          confirmButtonText: "OK"
        }).then(
          (result) => {
            if (result.value) {
              this.loadUnitForAssociation(this.unitID);
            }
          }
        )
      }

    },
    err=>{
      console.log(err);
    })

  }

  deleteFamilyMember(fmid) {
    console.log(fmid);
    let deleteFmailyMember = {
      "FMID": fmid
    }

    let headers = new HttpHeaders().append('Content-Type', 'application/json')
      .append('X-OYE247-APIKey', '7470AD35-D51C-42AC-BC21-F45685805BBE');

    let scopeIP = this.utilsService.deleteFmailyMember();
    console.log(deleteFmailyMember);
    this.http.post(scopeIP + `oyesafe/api/v1/FamilyMemberDetailsDelete/update`, JSON.stringify(deleteFmailyMember), { headers: headers })
      .subscribe(data => {
        console.log(data);
        swal.fire({
          title: "Family Member Deleted Successfully",
          text: "",
          type: "success",
          confirmButtonColor: "#f69321"
        }).then(
          (result) => {
            if (result.value) {
              this.loadUnitForAssociation(this.unitID);
            }
          }
        )
      },
        err => {
          console.log(err);
        })
  }

}
