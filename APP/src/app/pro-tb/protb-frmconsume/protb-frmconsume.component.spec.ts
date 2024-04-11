import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtbFrmconsumeComponent } from './protb-frmconsume.component';

describe('ProtbFrmconsumeComponent', () => {
  let component: ProtbFrmconsumeComponent;
  let fixture: ComponentFixture<ProtbFrmconsumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtbFrmconsumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtbFrmconsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
