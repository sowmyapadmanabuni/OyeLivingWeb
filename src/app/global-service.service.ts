import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

   currentAssociationId:string;
   currentAssociationName:string;
  constructor() { }


public getCurrentAssociationId(){

  return this.currentAssociationId;

}

public setCurrentAssociationId(associationId:string)
{
  this.currentAssociationId = associationId;
}

public getCurrentAssociationName(){
    return this.currentAssociationName;
}

public setCurrentAssociationName(associationName:string){
   this.currentAssociationName=associationName;
}


}
