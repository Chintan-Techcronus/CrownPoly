import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmMoveComponent } from './frm-move.component';

describe('FrmMoveComponent', () => {
  let component: FrmMoveComponent;
  let fixture: ComponentFixture<FrmMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrmMoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrmMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
