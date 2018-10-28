import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractFilingRequestComponent } from './list-contract-filing-request.component';

describe('ListContractFilingRequestComponent', () => {
  let component: ListContractFilingRequestComponent;
  let fixture: ComponentFixture<ListContractFilingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContractFilingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContractFilingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
