import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmPalletComponent } from './frm-pallet.component';

describe('FrmPalletComponent', () => {
  let component: FrmPalletComponent;
  let fixture: ComponentFixture<FrmPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmPalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
