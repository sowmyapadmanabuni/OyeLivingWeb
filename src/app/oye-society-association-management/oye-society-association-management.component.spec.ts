import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OyeSocietyAssociationManagementComponent } from './oye-society-association-management.component';

describe('OyeSocietyAssociationManagementComponent', () => {
  let component: OyeSocietyAssociationManagementComponent;
  let fixture: ComponentFixture<OyeSocietyAssociationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OyeSocietyAssociationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OyeSocietyAssociationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
