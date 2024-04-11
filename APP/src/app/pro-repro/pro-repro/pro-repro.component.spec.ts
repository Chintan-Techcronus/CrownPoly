import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProReproComponent } from './pro-repro.component';

describe('ProReproComponent', () => {
  let component: ProReproComponent;
  let fixture: ComponentFixture<ProReproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProReproComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProReproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
