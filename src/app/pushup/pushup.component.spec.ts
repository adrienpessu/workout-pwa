import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PushupComponent } from './pushup.component';

describe('PushupComponent', () => {
  let component: PushupComponent;
  let fixture: ComponentFixture<PushupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PushupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PushupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
