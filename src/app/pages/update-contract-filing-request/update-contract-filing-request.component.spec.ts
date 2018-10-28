import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractFilingRequestComponent } from './update-contract-filing-request.component';

describe('UpdateContractFilingRequestComponent', () => {
  let component: UpdateContractFilingRequestComponent;
  let fixture: ComponentFixture<UpdateContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
