import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinComponent } from './win.component';

describe('WinComponent', () => {
  let component: WinComponent;
  let fixture: ComponentFixture<WinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WinComponent]
    });
    fixture = TestBed.createComponent(WinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
