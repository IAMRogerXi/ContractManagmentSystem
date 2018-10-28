import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentRequestComponent } from './add-payment-request.component';

describe('AddPaymentRequestComponent', () => {
  let component: AddPaymentRequestComponent;
  let fixture: ComponentFixture<AddPaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
