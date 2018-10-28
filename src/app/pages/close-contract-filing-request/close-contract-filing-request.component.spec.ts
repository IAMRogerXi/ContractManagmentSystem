import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseContractFilingRequestComponent } from './close-contract-filing-request.component';

describe('CloseContractFilingRequestComponent', () => {
  let component: CloseContractFilingRequestComponent;
  let fixture: ComponentFixture<CloseContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
