import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfaundComponent } from './notfaund.component';

describe('NotfaundComponent', () => {
  let component: NotfaundComponent;
  let fixture: ComponentFixture<NotfaundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotfaundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotfaundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
