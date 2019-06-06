import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-blocks',
  templateUrl: './add-blocks.component.html',
  styleUrls: ['./add-blocks.component.css']
})
export class AddBlocksComponent implements OnInit {
  assnName: string;
  frequencies:object[];

  constructor() {
    this.assnName='MANO';

    this.frequencies = [
      {"name":"Monthly", "displayName": "Monthly"},
      {"name":"Quarterly", "displayName": "Quarterly"},
      {"name":"halfYearly", "displayName": "Half Yearly"},
      {"name":"Yearly", "displayName": "Yearly"}
      ];
   }

  ngOnInit() {
  }

}
