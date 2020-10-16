import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListOwnerComponent } from './car-list-owner.component';

describe('CarListOwnerComponent', () => {
  let component: CarListOwnerComponent;
  let fixture: ComponentFixture<CarListOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarListOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarListOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
