import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProhsFrmconsumeComponent } from './prohs-frmconsume.component';

describe('ProhsFrmconsumeComponent', () => {
  let component: ProhsFrmconsumeComponent;
  let fixture: ComponentFixture<ProhsFrmconsumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProhsFrmconsumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProhsFrmconsumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
