import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPlayerComponent } from './history-player.component';

describe('HistoryPlayerComponent', () => {
  let component: HistoryPlayerComponent;
  let fixture: ComponentFixture<HistoryPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
