import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import * as XLSX from 'xlsx';
import {GlobalServiceService} from '../global-service.service';
//import {DashboardService} from '../dashboard/dashboard.service';
import Swal from 'sweetalert2';
import * as _ from 'underscore';
//import {BlockDetail} from '../block-detail';
import {ViewAssociationService} from '../view-association/view-association.service';
<<<<<<< HEAD
=======
import {UtilsService} from '../utils/utils.service';
>>>>>>> 915141cb818db85056b13f41a6309813be43ce47

@Component({
  selector: 'app-read-block-and-unitxlsx',
  templateUrl: './read-block-and-unitxlsx.component.html',
  styleUrls: ['./read-block-and-unitxlsx.component.css']
})
export class ReadBlockAndUnitxlsxComponent implements OnInit {
  scopeIP:string;
  scriptIP:string;
  headers:HttpHeaders;
  //associations:object=[];
  associations:any= [];
  associationID:string;
  accountID:number;
  asAsnName:string;
  _association:any[];
  asNofBlks:any;
  asNofUnit:any;
  _totalnoofunits:number;
  _numbers:number[];
  
    public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Champ-APIKey': this.scriptIP,
        'Access-Control-Allow-Origin': "*"
      })
    };
    ipAddress: string;
    block_ID: any;
    currentAssociationName: any;

  constructor(private http: HttpClient,
    private globalserviceservice: GlobalServiceService,
<<<<<<< HEAD
    private viewassociationservice:ViewAssociationService) {
=======
    private viewassociationservice:ViewAssociationService,
    private utilsService:UtilsService) {
>>>>>>> 915141cb818db85056b13f41a6309813be43ce47
      this.scopeIP = "https://apidev.oyespace.com/";
      this.ipAddress = 'http://apidev.oyespace.com/';
      this.scriptIP = "1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
      this.headers = new HttpHeaders().append('Content-Type', 'application/json')
        .append('X-Champ-APIKey', this.scriptIP)
        .append('Access-Control-Allow-Origin', "*");
        this.accountID=this.globalserviceservice.acAccntID;
        this._totalnoofunits=0;
        this.asAsnName='';
        this.asNofBlks=this.viewassociationservice.asNofBlks;
        this.asNofUnit=this.viewassociationservice.asNofUnit;
        console.log('this.viewassociationservice.associationId',this.viewassociationservice.associationId);
   }

  ngOnInit() {
  }

  // below code is for the Excel file upload
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(jsonData);
      this.createblock(jsonData);
    }
    reader.readAsBinaryString(file);
  }

  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
    .set('Content-Type', 'application/json');
    return headers;
    }

    createblock(jsonData) {
      let groupArray= _.groupBy(jsonData['Sheet 1'],'Block Name');
      console.log(groupArray);
      let objkeys= Object.keys(groupArray);
      let objvalues= Object.values(groupArray);
      console.log(objvalues); 
      //alert('objvalues.length'+objvalues.length);
      objkeys.forEach(item => {
       this._totalnoofunits += groupArray[item].length;
       this._totalnoofunits += 1;
      })
      console.log('_totalnoofunits',this._totalnoofunits);
      console.log('objkeys.length',objkeys.length); 
      console.log('this.asNofBlks',this.asNofBlks);
      console.log('this.asNofUnit',this.asNofUnit);
      if (objkeys.length <= this.asNofBlks && this._totalnoofunits <= this.asNofUnit) {
        objkeys.forEach(item => {
          this.block_ID = 0;
    
          console.log("Create Block" + item);
          //** */
          let CreateBockData = {
            "ASAssnID": this.viewassociationservice.associationId,
            "ACAccntID": this.accountID,
            "blocks": [
              {
                "ASAssnID": this.viewassociationservice.associationId,
                "BLBlkName": item,
                "BLBlkType": '',
                "BLNofUnit": '',
                "BLMgrName": '',
                "BLMgrMobile": '',
                "BLMgrEmail": '',
                "ASMtType": '',
                "ASMtDimBs": '',
                "ASMtFRate": '',
                "ASUniMsmt": '',
                "ASIcRFreq": '',
                "ASBGnDate": '',
                "ASLPCType": '',
                "ASLPChrg": '',
                "ASLPSDate": '',
                "ASDPyDate": '',
                "BankDetails": ''
              }
            ]
          }
    
          let headers = this.getHttpheaders();
<<<<<<< HEAD
          let url = `${this.ipAddress}oyeliving/api/v1/Block/create`
=======
          let ipAddress=this.utilsService.createBlock();
          let url = `${ipAddress}oyeliving/api/v1/Block/create`
>>>>>>> 915141cb818db85056b13f41a6309813be43ce47
          this.http.post(url, JSON.stringify(CreateBockData), { headers: headers })
            .subscribe(data => {
              console.log('_blockid', data['data'].blockID);
              console.log('blockID', data['data'].blockID);
              this.block_ID = data['data'].blockID;
              //console.log(groupArray[item]);
              this.createUnits(data['data'].blockID, groupArray[item]);
              //
              let createUnitData =
              {
                "ASAssnID": this.viewassociationservice.associationId,
                "ACAccntID": this.accountID,
                "units": [
                  {
                    "UNUniName": item + "-" + "Common",
                    "UNUniType": '',
                    "UNRate": '',
                    "UNOcStat": '',
                    "UNOcSDate": '',
                    "UNOwnStat": '',
                    "UNSldDate": '',
                    "UNDimens": '',
                    "UNCalType": '',
                    "BLBlockID": data['data'].blockID,
                    "Owner":
                      [{
    
                        "UOFName": '',
                        "UOLName": '',
                        "UOMobile": '',
                        "UOISDCode": '',
                        "UOMobile1": '',
                        "UOMobile2": '',
                        "UOMobile3": '',
                        "UOMobile4": '',
                        "UOEmail": '',
                        "UOEmail1": '',
                        "UOEmail2": '',
                        "UOEmail3": '',
                        "UOEmail4": '',
                        "UOCDAmnt": ''
                      }],
                    "unitbankaccount":
                    {
                      "UBName": '',
                      "UBIFSC": '',
                      "UBActNo": '',
                      "UBActType": '',
                      "UBActBal": '',
                      "BLBlockID": data['data'].blockID
                    },
                    "Tenant":
                      [{
    
                        "UTFName": '',
                        "UTLName": '',
                        "UTMobile": '',
                        "UTISDCode": '',
                        "UTMobile1": '',
                        "UTEmail": '',
                        "UTEmail1": ''
                      }],
                    "UnitParkingLot":
                      [
                        {
                          "UPLNum": '',
                          "MEMemID": '',
                          "UPGPSPnt": ''
    
                        }
                      ]
                  }
                ]
              }
<<<<<<< HEAD
    
              this.http.post(this.scopeIP + 'oyeliving/api/v1/unit/create', createUnitData, { headers: this.headers })
=======
              let ipAddress = this.utilsService.createUnit();
              this.http.post(ipAddress + 'oyeliving/api/v1/unit/create', createUnitData, { headers: this.headers })
>>>>>>> 915141cb818db85056b13f41a6309813be43ce47
                .subscribe(data => {
                  console.log(data);
                 /* Swal.fire({
                    title: "Blocks Created Successfully",
                    text: "",
                    type: "success",
                    confirmButtonColor: "#f69321",
                    confirmButtonText: "OK"
                  }).then(
                    (result) => {
                      if (result.value) {
                        // let element = <HTMLInputElement>document.getElementById("uploadFileinput");
                        // element.value=null;
                      }
                    }); */
                },
                  data => {
                    console.log(data);
                  })
    
    
            }) 
          //** */
        })
      } 
      else{
        Swal.fire({
          title: "Error",
          text: "Total No of Blocks/Units Exceeded",
          type: "error",
          confirmButtonColor: "#f69321"
        }).then(
          (result) => {
            if (result.value) {
              let element = <HTMLInputElement>document.getElementById("file_upload_id");
              element.value=null;
            }
          });
      } 
    
    
    }
    createUnits(blockID,filtered_group){
      console.log('inside createunits-',blockID,filtered_group);
      filtered_group.forEach(data=>{
     let _createUnitData =
    {
      "ASAssnID": this.viewassociationservice.associationId,
      "ACAccntID": this.accountID,
      "units": [
        {
          "UNUniName": data['Unit Name'],
          "UNUniType": '',
          "UNRate": '',
          "UNOcStat": '',
          "UNOcSDate": '',
          "UNOwnStat": '',
          "UNSldDate": '',
          "UNDimens": '',
          "UNCalType": '',
          "BLBlockID": blockID,
          "Owner":
            [{
    
              "UOFName": '',
              "UOLName": '',
              "UOMobile": '',
              "UOISDCode": '',
              "UOMobile1": '',
              "UOMobile2": '',
              "UOMobile3": '',
              "UOMobile4": '',
              "UOEmail": '',
              "UOEmail1": '',
              "UOEmail2": '',
              "UOEmail3": '',
              "UOEmail4": '',
              "UOCDAmnt": ''
            }],
          "unitbankaccount":
          {
            "UBName": '',
            "UBIFSC": '',
            "UBActNo": '',
            "UBActType": '',
            "UBActBal": '',
            "BLBlockID": blockID
          },
          "Tenant":
            [{
    
              "UTFName": '',
              "UTLName": '',
              "UTMobile": '',
              "UTISDCode": '',
              "UTMobile1": '',
              "UTEmail": '',
              "UTEmail1": ''
            }],
          "UnitParkingLot":
            [
              {
                "UPLNum": '',
                "MEMemID": '',
                "UPGPSPnt": ''
    
              }
            ]
        }
      ]
    }
    
    //let headers = this.getHttpheaders();
    console.log('_createUnitData',JSON.stringify(_createUnitData));
<<<<<<< HEAD
    this.http.post(this.scopeIP + 'oyeliving/api/v1/unit/create', _createUnitData, { headers: this.headers })
=======
    let scopeIP=this.utilsService.createUnit();
    this.http.post(scopeIP + 'oyeliving/api/v1/unit/create', _createUnitData, { headers: this.headers })
>>>>>>> 915141cb818db85056b13f41a6309813be43ce47
      .subscribe(data => {
        console.log(data);
      },
        data => {
          console.log(data);
        }) 
      })
    }
    //
    Upload(value) {
      console.log(value);
      document.getElementById("file_upload_id").click();
    }
    upLoad(){
      document.getElementById("file_upload_id").click();
    }

}
