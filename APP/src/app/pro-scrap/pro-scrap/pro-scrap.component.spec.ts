import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProScrapComponent } from './pro-scrap.component';

describe('ProScrapComponent', () => {
  let component: ProScrapComponent;
  let fixture: ComponentFixture<ProScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProScrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
