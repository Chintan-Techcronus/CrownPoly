import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhsDialogQuantityComponent } from './prohs-dialog-quantity.component';

describe('ProhsDialogQuantityComponent', () => {
  let component: ProhsDialogQuantityComponent;
  let fixture: ComponentFixture<ProhsDialogQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProhsDialogQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProhsDialogQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
