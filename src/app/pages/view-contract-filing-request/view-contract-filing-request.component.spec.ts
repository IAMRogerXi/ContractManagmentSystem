import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractFilingRequestComponent } from './view-contract-filing-request.component';

describe('ViewContractFilingRequestComponent', () => {
  let component: ViewContractFilingRequestComponent;
  let fixture: ComponentFixture<ViewContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
