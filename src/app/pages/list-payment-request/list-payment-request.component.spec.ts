import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentRequestComponent } from './list-payment-request.component';

describe('ListPaymentRequestComponent', () => {
  let component: ListPaymentRequestComponent;
  let fixture: ComponentFixture<ListPaymentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaymentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaymentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
