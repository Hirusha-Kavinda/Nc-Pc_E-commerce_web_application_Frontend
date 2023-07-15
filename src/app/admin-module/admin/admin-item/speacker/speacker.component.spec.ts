import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeackerComponent } from './speacker.component';

describe('SpeackerComponent', () => {
  let component: SpeackerComponent;
  let fixture: ComponentFixture<SpeackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
