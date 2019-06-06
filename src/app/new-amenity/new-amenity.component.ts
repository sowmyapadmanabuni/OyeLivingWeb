import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Amenity } from '../models/amenity';

@Component({
  selector: 'app-new-amenity',
  templateUrl: './new-amenity.component.html',
  styleUrls: ['./new-amenity.component.css']
})
export class NewAmenityComponent implements OnInit {

  @Input() amenities: Amenity[];
  @Output() addAmenities = new EventEmitter<object>();
  @Output() deleteamenity = new EventEmitter<object>();
  AmenityId: number;
  AmenityT: string;
  AmenityN: string;


  constructor() {
    this.AmenityId = 0;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('amenities', this.amenities);
  }

  addAmenity() {
    this.AmenityId += 1;
    this.addAmenities.emit({ "AmenityId": this.AmenityId, "AmenityT": this.AmenityT, "AmenityN": this.AmenityN });
    this.AmenityT = '';
    this.AmenityN = '';
  }

  deleteAmenity(AmenityId) {
    this.deleteamenity.emit(AmenityId);
  }

}
