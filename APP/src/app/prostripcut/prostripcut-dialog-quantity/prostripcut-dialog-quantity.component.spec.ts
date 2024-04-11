import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstripcutDialogQuantityComponent } from './prostripcut-dialog-quantity.component';

describe('ProstripcutDialogQuantityComponent', () => {
  let component: ProstripcutDialogQuantityComponent;
  let fixture: ComponentFixture<ProstripcutDialogQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProstripcutDialogQuantityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProstripcutDialogQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
