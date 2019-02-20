import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturaEmailFormComponent } from './captura-email-form.component';

describe('CapturaEmailFormComponent', () => {
  let component: CapturaEmailFormComponent;
  let fixture: ComponentFixture<CapturaEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapturaEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturaEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
