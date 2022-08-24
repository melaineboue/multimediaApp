import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationProgrammeComponent } from './generation-programme.component';

describe('GenerationProgrammeComponent', () => {
  let component: GenerationProgrammeComponent;
  let fixture: ComponentFixture<GenerationProgrammeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationProgrammeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationProgrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
