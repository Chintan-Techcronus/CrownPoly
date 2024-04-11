import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhsFrmmainComponent } from './prohs-frmmain.component';

describe('ProhsFrmmainComponent', () => {
  let component: ProhsFrmmainComponent;
  let fixture: ComponentFixture<ProhsFrmmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProhsFrmmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProhsFrmmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
