import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropnpFrmmainComponent } from './propnp-frmmain.component';

describe('PropnpFrmmainComponent', () => {
  let component: PropnpFrmmainComponent;
  let fixture: ComponentFixture<PropnpFrmmainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropnpFrmmainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropnpFrmmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
