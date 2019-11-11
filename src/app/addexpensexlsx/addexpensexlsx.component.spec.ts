import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddexpensexlsxComponent } from './addexpensexlsx.component';

describe('AddexpensexlsxComponent', () => {
  let component: AddexpensexlsxComponent;
  let fixture: ComponentFixture<AddexpensexlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddexpensexlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddexpensexlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
