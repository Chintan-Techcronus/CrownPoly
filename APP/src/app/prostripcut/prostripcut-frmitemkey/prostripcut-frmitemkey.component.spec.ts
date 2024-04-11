import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProstripcutFrmitemkeyComponent } from './prostripcut-frmitemkey.component';

describe('ProstripcutFrmitemkeyComponent', () => {
  let component: ProstripcutFrmitemkeyComponent;
  let fixture: ComponentFixture<ProstripcutFrmitemkeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProstripcutFrmitemkeyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProstripcutFrmitemkeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
