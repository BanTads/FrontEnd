import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoRecusaComponent } from './motivo-recusa.component';

describe('MotivoRecusaComponent', () => {
  let component: MotivoRecusaComponent;
  let fixture: ComponentFixture<MotivoRecusaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotivoRecusaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotivoRecusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
