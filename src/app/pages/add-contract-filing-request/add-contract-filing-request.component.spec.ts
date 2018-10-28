import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContractFilingRequestComponent } from './add-contract-filing-request.component';

describe('AddContractFilingRequestComponent', () => {
  let component: AddContractFilingRequestComponent;
  let fixture: ComponentFixture<AddContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
