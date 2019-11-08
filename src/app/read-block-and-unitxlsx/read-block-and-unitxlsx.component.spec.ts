import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBlockAndUnitxlsxComponent } from './read-block-and-unitxlsx.component';

describe('ReadBlockAndUnitxlsxComponent', () => {
  let component: ReadBlockAndUnitxlsxComponent;
  let fixture: ComponentFixture<ReadBlockAndUnitxlsxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadBlockAndUnitxlsxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadBlockAndUnitxlsxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
