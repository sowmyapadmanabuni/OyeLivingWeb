import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
toggleviewassociationtable:boolean;

  constructor() { 
    this.toggleviewassociationtable=false;
  }
}
