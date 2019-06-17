import { Injectable,Component, TemplateRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import  {CreateAssn} from './../create-assn';
import {BsModalService,BsModalRef} from 'ngx-bootstrap/modal'

@Injectable({
  providedIn: 'root'
})
export class ViewAssociationService { 
  
  modalRef:BsModalRef;
  scopeIP:string;
  scriptIP:string;
  url:string;
  headers:HttpHeaders;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Champ-APIKey': this.scriptIP,
      'Access-Control-Allow-Origin': "*"
    })
  };

  onUpLoad(fd: FormData) {
    //let headers = this.getHttpheaders();
    this.url = `http://mediaupload.oyespace.com/oyeliving/api/v1/association/upload`
    return this.http.post(this.url, fd, {
       reportProgress: true,
       observe: 'events'
     })
  }

  constructor(private http:HttpClient, private modalService: BsModalService) {
    this.scopeIP="https://apidev.oyespace.com/";
    //this.scopeIP = "https://apidemo.oyespace.com/";
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers = new HttpHeaders().append('Content-Type', 'application/json')
    .append('X-Champ-APIKey', this.scriptIP)
    .append('Access-Control-Allow-Origin', '*');
   }



   createAssn(createAsssociationData)
  {
    console.log('createAsssociationData',createAsssociationData);
    return this.http.post(this.scopeIP + 'oyeliving/api/v1/association/create', createAsssociationData,  {headers:this.headers});
  }


  getAssociationDetails(accountID:string)
  {
    console.log(accountID);
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAssociationListByAccountID/' + 21,  {headers:this.headers});
  }


  privacyPolicyModel(viewreceiptmodal: TemplateRef<any>) {
    this.modalRef = this.modalService.show(viewreceiptmodal, Object.assign({}, { class: 'gray modal-lg' }));
}
getAssociationDetail(currentAssociationID){
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/association/getAssociationList/'+ currentAssociationID , {headers:this.headers});
}
getAssociationDetailsByAssociationid(asAssnID:string)
{
  console.log(asAssnID);
  return this.http.get(this.scopeIP + 'oyeliving/api/v1/association/getAssociationList/' +asAssnID ,  {headers:this.headers});
}

UpdateAssociation(editassndata) {
  console.log(JSON.stringify(editassndata));
  let headers = this.getHttpheaders();
  this.url = `http://apidev.oyespace.com/oyeliving/api/v1/association/Update`;
  return this.http.post(this.url, JSON.stringify(editassndata), { headers: headers });
}

getHttpheaders(): HttpHeaders {
  const headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('X-Champ-APIKey', '1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1')
    .set('Content-Type', 'application/json');
  return headers;
}

}
