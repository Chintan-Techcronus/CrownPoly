import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropnpFrmincidentComponent } from './propnp-frmincident.component';

describe('PropnpFrmincidentComponent', () => {
  let component: PropnpFrmincidentComponent;
  let fixture: ComponentFixture<PropnpFrmincidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropnpFrmincidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropnpFrmincidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
