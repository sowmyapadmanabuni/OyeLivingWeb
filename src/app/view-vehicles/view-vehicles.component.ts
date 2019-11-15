import { Component, TemplateRef, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import {AddVehicleService} from '../services/add-vehicle.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import swal from 'sweetalert2';




@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.css']
})
export class ViewVehiclesComponent implements OnInit {
  modalRef: BsModalRef;
  CurrentUnitID: any;
  VehicleData: [];
  vehicledatalength: boolean;
  veMakeMdl: string;
  veRegNo: string;
  veStickNo:string;
  uplNum: string;
  veType: string;
  // UNUnitID: any;
  // MEMemID: any;
  // UPID: any;
  // ASAssnID: any;


  constructor(private globalserviceservice: GlobalServiceService, private bsModalService: BsModalService, private addvehicleservice: AddVehicleService) {
    this.vehicledatalength = false;
    this.VehicleData=[];
   }

  ngOnInit() {
    this.CurrentUnitID = this.globalserviceservice.getCurrentUnitId();
    console.log(this.CurrentUnitID);
    this.getVehicles();
  }

  getVehicles(){
    this.addvehicleservice.getVehicleDetails(this.CurrentUnitID)
    .subscribe(data =>{
      console.log(data);
      this.VehicleData=data['data']['vehicleListByUnitID'];
      console.log(this.VehicleData);
      if(this.VehicleData.length>0){
        this.vehicledatalength = true;
      }

    },
    err=>{
      console.log(err);
    })

  }

  openModal(requestdemo: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(requestdemo, Object.assign({}, { class: 'gray modal-lg' }));
  }

  AddVehicle(){
    let vehiclesData = {
      'veMakeMdl': this.veMakeMdl,
      'veRegNo': this.veRegNo,
      'veStickNo': this.veStickNo,
      'uplNum': this.uplNum,
      'veType': this.veType,
      'UNUnitID': this.globalserviceservice.currentUnitId,
      'MEMemID': '',
      'UPID': '',
      'ASAssnID': this.globalserviceservice.currentAssociationId
    }
    console.log(vehiclesData);
    this.addvehicleservice.addVehicle(vehiclesData)
    .subscribe(()=>{
      this.getVehicles();
      swal.fire({
        title: "Request Sent Successfully",
        text: "",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#f69321",
        confirmButtonText: "OK",
      });
      this.veMakeMdl='';
      this.veRegNo='';
      this.veStickNo='';
      this.uplNum='';
      this.veType='';
     },
     () => {
      swal.fire('Error', 'Something went wrong!', 'error')
     })
     this.modalRef.hide();
  }
}
