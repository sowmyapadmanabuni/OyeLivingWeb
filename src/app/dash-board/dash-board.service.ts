import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  
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
    this.scriptIP="1FDF86AF-94D7-4EA9-8800-5FBCCFF8E5C1";
    this.headers= new HttpHeaders().append('Content-Type',  'application/json')
                                   .append('X-Champ-APIKey', this.scriptIP,)
                                   .append('Access-Control-Allow-Origin', "*");

                                  
   }//Constructor Ends

   getAssociation(accountID:string){
    return this.http.get(this.scopeIP + '/oyeliving/api/v1/GetAssociationListByAccountID/' +accountID ,  {headers:this.headers});
  }

  getMembers(accountID:string){
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/Member/GetMemberListByAccountID/' + accountID,  {headers:this.headers});
  }

  getTickets(associationId:string){
    return this.http.get(this.scopeIP + 'oyeliving/api/v1/GetTicketingListByAssocID/' + associationId, {headers:this.headers});
  //No such API
  }

  getVehicle(associationID:string){
     return this.http.get(this.scopeIP + 'oyeliving/api/v1/Vehicle/GetVehicleListByAssocID/' + associationID, {headers:this.headers} );
  }


}//DashboardService Ends
