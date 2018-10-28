import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentRequestTaskComponent } from './view-payment-request-task.component';

describe('ViewPaymentRequestTaskComponent', () => {
  let component: ViewPaymentRequestTaskComponent;
  let fixture: ComponentFixture<ViewPaymentRequestTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPaymentRequestTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPaymentRequestTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
