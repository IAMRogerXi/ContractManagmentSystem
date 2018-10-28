import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractFilingRequestTaskComponent } from './list-contract-filing-request-task.component';

describe('ListContractFilingRequestTaskComponent', () => {
  let component: ListContractFilingRequestTaskComponent;
  let fixture: ComponentFixture<ListContractFilingRequestTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContractFilingRequestTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContractFilingRequestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
