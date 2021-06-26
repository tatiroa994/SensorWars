import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAlertComponent } from './register-alert.component';

describe('RegisterAlertComponent', () => {
  let component: RegisterAlertComponent;
  let fixture: ComponentFixture<RegisterAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
