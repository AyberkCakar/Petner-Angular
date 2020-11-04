import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertDetailComponent } from './advert-detail.component';

describe('AdvertDetailComponent', () => {
  let component: AdvertDetailComponent;
  let fixture: ComponentFixture<AdvertDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
