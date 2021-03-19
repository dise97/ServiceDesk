import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WagesListComponent } from './wages-list.component';

describe('WagesListComponent', () => {
  let component: WagesListComponent;
  let fixture: ComponentFixture<WagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
