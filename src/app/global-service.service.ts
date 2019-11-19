import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

   currentAssociationId:string;
   currentUnitId:string;
   currentAssociationName:string;
   acAccntID:number;
   mobileNumber:number;
   
   
  constructor() { 
    this.currentAssociationName='';
  }


public getCurrentAssociationId(){

  return this.currentAssociationId;

}
public getCurrentUnitId(){

  return this.currentUnitId;

}

public setCurrentAssociationId(associationId:string)
{
  this.currentAssociationId = associationId;
}
public setCurrentUnitId(unitId)
{
  this.currentUnitId = unitId;
}

public setAccountID(acAccntID){
  this.acAccntID=acAccntID;
  localStorage.setItem("login-status", acAccntID);
}

public getacAccntID() :number{
  // return this.acAccntID;
  return Number(localStorage.getItem("login-status"));
}
public clear(){
  localStorage.clear();
}

public getCurrentAssociationName(){
    return this.currentAssociationName;
}

public setCurrentAssociationName(associationName:string){
   this.currentAssociationName=associationName;
}


}
