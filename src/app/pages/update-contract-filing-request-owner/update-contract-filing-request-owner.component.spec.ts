import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractFilingRequestOwnerComponent } from './update-contract-filing-request-owner.component';

describe('UpdateContractFilingRequestOwnerComponent', () => {
  let component: UpdateContractFilingRequestOwnerComponent;
  let fixture: ComponentFixture<UpdateContractFilingRequestOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContractFilingRequestOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractFilingRequestOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
