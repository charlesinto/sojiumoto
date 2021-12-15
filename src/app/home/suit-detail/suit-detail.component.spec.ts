import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitDetailComponent } from './suit-detail.component';

describe('SuitDetailComponent', () => {
  let component: SuitDetailComponent;
  let fixture: ComponentFixture<SuitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
