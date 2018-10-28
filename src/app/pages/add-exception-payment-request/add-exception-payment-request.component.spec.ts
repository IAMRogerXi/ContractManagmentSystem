import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExceptionPaymentRequestComponent } from './add-exception-payment-request.component';

describe('AddExceptionPaymentRequestComponent', () => {
  let component: AddExceptionPaymentRequestComponent;
  let fixture: ComponentFixture<AddExceptionPaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExceptionPaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExceptionPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
