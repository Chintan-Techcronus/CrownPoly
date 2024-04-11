import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropnpFrmchangeComponent } from './propnp-frmchange.component';

describe('PropnpFrmchangeComponent', () => {
  let component: PropnpFrmchangeComponent;
  let fixture: ComponentFixture<PropnpFrmchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropnpFrmchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropnpFrmchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
