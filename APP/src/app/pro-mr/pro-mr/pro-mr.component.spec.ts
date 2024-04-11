import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProMRComponent } from './pro-mr.component';

describe('ProMRComponent', () => {
  let component: ProMRComponent;
  let fixture: ComponentFixture<ProMRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProMRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProMRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
