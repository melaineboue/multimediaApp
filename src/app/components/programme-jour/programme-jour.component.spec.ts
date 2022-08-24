import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeJourComponent } from './programme-jour.component';

describe('ProgrammeJourComponent', () => {
  let component: ProgrammeJourComponent;
  let fixture: ComponentFixture<ProgrammeJourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeJourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammeJourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
