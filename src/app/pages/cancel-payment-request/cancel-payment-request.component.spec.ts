import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPaymentRequestComponent } from './cancel-payment-request.component';

describe('CancelPaymentRequestComponent', () => {
  let component: CancelPaymentRequestComponent;
  let fixture: ComponentFixture<CancelPaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelPaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
