import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractFilingIdComponent } from './update-contract-filing-id.component';

describe('UpdateContractFilingIdComponent', () => {
  let component: UpdateContractFilingIdComponent;
  let fixture: ComponentFixture<UpdateContractFilingIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContractFilingIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractFilingIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
