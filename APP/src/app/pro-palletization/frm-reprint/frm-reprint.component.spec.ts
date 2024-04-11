import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmReprintComponent } from './frm-reprint.component';

describe('FrmReprintComponent', () => {
  let component: FrmReprintComponent;
  let fixture: ComponentFixture<FrmReprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmReprintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmReprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
