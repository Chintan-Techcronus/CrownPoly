import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPrintOldTagsComponent } from './frm-print-old-tags.component';

describe('FrmPrintOldTagsComponent', () => {
  let component: FrmPrintOldTagsComponent;
  let fixture: ComponentFixture<FrmPrintOldTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmPrintOldTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmPrintOldTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
