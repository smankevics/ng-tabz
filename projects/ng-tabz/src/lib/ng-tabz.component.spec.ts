import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTabzComponent } from './ng-tabz.component';

describe('NgTabzComponent', () => {
  let component: NgTabzComponent;
  let fixture: ComponentFixture<NgTabzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgTabzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTabzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
