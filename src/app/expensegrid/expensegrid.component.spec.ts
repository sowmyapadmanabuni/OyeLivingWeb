import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensegridComponent } from './expensegrid.component';

describe('ExpensegridComponent', () => {
  let component: ExpensegridComponent;
  let fixture: ComponentFixture<ExpensegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
