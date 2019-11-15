import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiclesComponent } from './add-vehicles.component';

describe('AddVehiclesComponent', () => {
  let component: AddVehiclesComponent;
  let fixture: ComponentFixture<AddVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
