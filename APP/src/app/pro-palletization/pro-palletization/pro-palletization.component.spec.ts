import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProPalletizationComponent } from './pro-palletization.component';

describe('ProPalletizationComponent', () => {
  let component: ProPalletizationComponent;
  let fixture: ComponentFixture<ProPalletizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProPalletizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProPalletizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
