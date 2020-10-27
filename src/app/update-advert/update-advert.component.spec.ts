import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdvertComponent } from './update-advert.component';

describe('UpdateAdvertComponent', () => {
  let component: UpdateAdvertComponent;
  let fixture: ComponentFixture<UpdateAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
