import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentRequestComponent } from './view-payment-request.component';

describe('ViewPaymentRequestComponent', () => {
  let component: ViewPaymentRequestComponent;
  let fixture: ComponentFixture<ViewPaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
