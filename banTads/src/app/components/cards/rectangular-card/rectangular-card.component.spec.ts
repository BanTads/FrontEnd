import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangularCardComponent } from './rectangular-card.component';

describe('RectangularCardComponent', () => {
  let component: RectangularCardComponent;
  let fixture: ComponentFixture<RectangularCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectangularCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RectangularCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
