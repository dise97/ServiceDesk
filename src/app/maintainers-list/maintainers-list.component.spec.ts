import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainersListComponent } from './maintainers-list.component';

describe('MaintainersListComponent', () => {
  let component: MaintainersListComponent;
  let fixture: ComponentFixture<MaintainersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
