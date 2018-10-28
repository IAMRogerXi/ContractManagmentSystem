import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPaymentRequestTaskComponent } from './list-payment-request-task.component';

describe('ListPaymentRequestTaskComponent', () => {
  let component: ListPaymentRequestTaskComponent;
  let fixture: ComponentFixture<ListPaymentRequestTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaymentRequestTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPaymentRequestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
