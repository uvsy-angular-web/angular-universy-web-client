import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCareersComponent } from './my-careers.component';

describe('MyCareersComponent', () => {
  let component: MyCareersComponent;
  let fixture: ComponentFixture<MyCareersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCareersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCareersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
