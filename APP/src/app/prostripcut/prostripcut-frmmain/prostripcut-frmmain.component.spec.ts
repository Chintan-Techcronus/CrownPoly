import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstripcutFrmmainComponent } from './prostripcut-frmmain.component';

describe('ProstripcutFrmmainComponent', () => {
  let component: ProstripcutFrmmainComponent;
  let fixture: ComponentFixture<ProstripcutFrmmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProstripcutFrmmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProstripcutFrmmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
