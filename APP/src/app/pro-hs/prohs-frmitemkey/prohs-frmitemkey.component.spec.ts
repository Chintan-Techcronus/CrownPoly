import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhsFrmitemkeyComponent } from './prohs-frmitemkey.component';

describe('ProhsFrmitemkeyComponent', () => {
  let component: ProhsFrmitemkeyComponent;
  let fixture: ComponentFixture<ProhsFrmitemkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProhsFrmitemkeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProhsFrmitemkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
