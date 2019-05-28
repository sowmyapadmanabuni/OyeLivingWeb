import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  {CreateAssn} from './../create-assn';

@Injectable({
  providedIn: 'root'
})
export class ViewAssociationService { 

  scopeIP:string;
  scriptIP:string;
  headers:HttpHeaders;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Champ-APIKey': this.scriptIP,
      'Access-Control-Allow-Origin': "*"
    })
  };


  constructor(private http:HttpClient) {
    this.scopeIP="https://apidev.oyespace.com/";
    //this.scopeIP = "https://apidemo.oyespace.com/";
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers = new HttpHeaders().append('Content-Type', 'application/json')
    .append('X-Champ-APIKey', this.scriptIP)
    .append('Access-Control-Allow-Origin', '*');
   }



   createAssn(createAsssociationData:any)
  {
    return this.http.post(this.scopeIP + 'oyeliving/api/v1/association/create', createAsssociationData,  {headers:this.headers});
  }


  getAssociationDetails(accountID:string)
  {
    console.log(accountID);
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetAssociationListByAccountID/' +accountID ,  {headers:this.headers});
  }
}
