import { Injectable } from '@angular/core';
import {UtilsService} from '../utils/utils.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GlobalServiceService } from '../global-service.service';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ViewDeliveryService {
  constructor(private http: HttpClient, private utilsService: UtilsService, private globalService: GlobalServiceService) { }
  getVisitorList(date):Observable<any> {
    let headers = this.getHttpheaders();
    let ipAddress = this.utilsService.getIPaddress();
    let url = `${ipAddress}oyesafe/api/v1/VisitorLog/GetVisitorLogByDatesAssocAndUnitID`
    var DeliveryData = {
      "StartDate":(date['StartDate']=='')? "2019-08-11" : date['StartDate'],
      "EndDate": (date['EndDate']=='')? "2019-15-11" : date['EndDate'],
      "ASAssnID": this.globalService.currentAssociationId,
      "UNUnitID": this.globalService.currentUnitId,
      "ACAccntID": this.globalService.getacAccntID()
      
      // "ToDate": (date['Todate']=='')? formatDate(new Date(),'yyyy-MM-dd','en') : date['Todate']
      
    }
    console.log('req data',DeliveryData);
   return this.http.post(url, JSON.stringify(DeliveryData), { headers: headers })
  }
  getHttpheaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('X-OYE247-APIKey', '7470AD35-D51C-42AC-BC21-F45685805BBE')
      .set('Content-Type', 'application/json');
    return headers;
  }
}