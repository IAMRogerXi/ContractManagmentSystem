import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentRequestComponent } from './update-payment-request.component';

describe('UpdatePaymentRequestComponent', () => {
  let component: UpdatePaymentRequestComponent;
  let fixture: ComponentFixture<UpdatePaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
