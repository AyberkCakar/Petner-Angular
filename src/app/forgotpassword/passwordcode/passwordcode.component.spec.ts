import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordcodeComponent } from './passwordcode.component';

describe('PasswordcodeComponent', () => {
  let component: PasswordcodeComponent;
  let fixture: ComponentFixture<PasswordcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
