import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContractFilingRequestTaskComponent } from './view-contract-filing-request-task.component';

describe('ViewContractFilingRequestTaskComponent', () => {
  let component: ViewContractFilingRequestTaskComponent;
  let fixture: ComponentFixture<ViewContractFilingRequestTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContractFilingRequestTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContractFilingRequestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
