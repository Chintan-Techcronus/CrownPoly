import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtbFrmchangeComponent } from './protb-frmchange.component';

describe('ProtbFrmchangeComponent', () => {
  let component: ProtbFrmchangeComponent;
  let fixture: ComponentFixture<ProtbFrmchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtbFrmchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtbFrmchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
