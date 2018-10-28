import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTaxDocumentComponent } from './upload-tax-document.component';

describe('UploadTaxDocumentComponent', () => {
  let component: UploadTaxDocumentComponent;
  let fixture: ComponentFixture<UploadTaxDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadTaxDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTaxDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
