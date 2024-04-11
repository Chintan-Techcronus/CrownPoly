import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtbDialogQuantityComponent } from './protb-dialog-quantity.component';

describe('ProtbDialogQuantityComponent', () => {
  let component: ProtbDialogQuantityComponent;
  let fixture: ComponentFixture<ProtbDialogQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtbDialogQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtbDialogQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
