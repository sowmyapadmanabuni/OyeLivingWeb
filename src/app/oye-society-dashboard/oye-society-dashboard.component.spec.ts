import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OyeSocietyDashboardComponent } from './oye-society-dashboard.component';

describe('OyeSocietyDashboardComponent', () => {
  let component: OyeSocietyDashboardComponent;
  let fixture: ComponentFixture<OyeSocietyDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OyeSocietyDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OyeSocietyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
