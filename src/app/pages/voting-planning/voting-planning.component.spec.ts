import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingPlanningComponent } from './voting-planning.component';

describe('VotingPlanningComponent', () => {
  let component: VotingPlanningComponent;
  let fixture: ComponentFixture<VotingPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotingPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
