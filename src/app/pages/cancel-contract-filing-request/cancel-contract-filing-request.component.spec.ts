import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelContractFilingRequestComponent } from './cancel-contract-filing-request.component';

describe('CancelContractFilingRequestComponent', () => {
  let component: CancelContractFilingRequestComponent;
  let fixture: ComponentFixture<CancelContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
