import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProhsFrmchangeComponent } from './prohs-frmchange.component';

describe('ProhsFrmchangeComponent', () => {
  let component: ProhsFrmchangeComponent;
  let fixture: ComponentFixture<ProhsFrmchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProhsFrmchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProhsFrmchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
