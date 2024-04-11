import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtbFrmitemkeyComponent } from './protb-frmitemkey.component';

describe('ProtbFrmitemkeyComponent', () => {
  let component: ProtbFrmitemkeyComponent;
  let fixture: ComponentFixture<ProtbFrmitemkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtbFrmitemkeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtbFrmitemkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
