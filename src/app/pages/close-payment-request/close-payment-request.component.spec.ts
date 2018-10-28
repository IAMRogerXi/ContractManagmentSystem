import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosePaymentRequestComponent } from './close-payment-request.component';

describe('ClosePaymentRequestComponent', () => {
  let component: ClosePaymentRequestComponent;
  let fixture: ComponentFixture<ClosePaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosePaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosePaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
