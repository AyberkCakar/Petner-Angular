import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertComponent } from './add-advert.component';

describe('AddAdvertComponent', () => {
  let component: AddAdvertComponent;
  let fixture: ComponentFixture<AddAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
