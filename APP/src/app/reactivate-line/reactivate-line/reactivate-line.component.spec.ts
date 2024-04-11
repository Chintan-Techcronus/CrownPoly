import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateLineComponent } from './reactivate-line.component';

describe('ReactivateLineComponent', () => {
  let component: ReactivateLineComponent;
  let fixture: ComponentFixture<ReactivateLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactivateLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactivateLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
