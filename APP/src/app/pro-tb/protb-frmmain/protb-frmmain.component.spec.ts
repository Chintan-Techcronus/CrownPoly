import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtbFrmmainComponent } from './protb-frmmain.component';

describe('ProtbFrmmainComponent', () => {
  let component: ProtbFrmmainComponent;
  let fixture: ComponentFixture<ProtbFrmmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtbFrmmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtbFrmmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
