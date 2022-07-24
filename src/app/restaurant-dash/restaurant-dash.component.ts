import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantModel } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css']
})
export class RestaurantDashComponent implements OnInit {

  formValue!: FormGroup
  allRestaurantData: any;
  restuarantModelObj: RestaurantModel = new RestaurantModel();
  restoId: any;
  showUpdatebtn!: boolean
  showAddbtn!: boolean

  constructor(private formBuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      service: ['']
    })
    this.getAllRestaurant();
  }

  //Subscribing our data which is mapped via Service class
  addRestaurant() {
    this.restuarantModelObj.name = this.formValue.value.name;
    this.restuarantModelObj.email = this.formValue.value.email;
    this.restuarantModelObj.mobile = this.formValue.value.mobile;
    this.restuarantModelObj.address = this.formValue.value.address;
    this.restuarantModelObj.service = this.formValue.value.service;

    //API call to post the data     
    this.api.postRestautant(this.restuarantModelObj).subscribe(res => {
      console.log(res);
      alert("Restaurant addedd successfully")
      this.formValue.reset();
      //Refreshing the data after adding new details
      this.getAllRestaurant();
    },
      err => {
        alert("Something went wrong here")
      })
  }

  getAllRestaurant() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }

  //deleteing the records
  deleteRestaurant(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert("Deleted Successfully");
      this.getAllRestaurant();
    })
  }

  clickAddRestaurant() {
    //Enable or disable buttons
    this.showAddbtn = true;
    this.showUpdatebtn = false;
  }

  editRestaurant(data: any) {
    //Enable or disable buttons
    this.showAddbtn = false;
    this.showUpdatebtn = true;

    this.restuarantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['service'].setValue(data.service);
  }

  updateRestaurant() {
    this.restuarantModelObj.name = this.formValue.value.name;
    this.restuarantModelObj.email = this.formValue.value.email;
    this.restuarantModelObj.mobile = this.formValue.value.mobile;
    this.restuarantModelObj.address = this.formValue.value.address;
    this.restuarantModelObj.service = this.formValue.value.service;

    this.api.updateRestaurant(this.restuarantModelObj, this.restuarantModelObj.id).subscribe(res => {
      alert("Record updated Successfully");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset()
      this.getAllRestaurant();
    },
      err => {
        alert("Update Operation: Something went wrong")
      })
  }
}
