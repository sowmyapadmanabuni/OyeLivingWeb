import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-new-amenity',
  templateUrl: './new-amenity.component.html',
  styleUrls: ['./new-amenity.component.css']
})
export class NewAmenityComponent implements OnInit {
@Input() amenityType:string;
@Input() amenityNo:number;
  constructor() { }

  ngOnInit() {
  }

}
