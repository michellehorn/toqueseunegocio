import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroselAtrativosComponent } from './carrosel-atrativos.component';

describe('CarroselAtrativosComponent', () => {
  let component: CarroselAtrativosComponent;
  let fixture: ComponentFixture<CarroselAtrativosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarroselAtrativosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarroselAtrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
