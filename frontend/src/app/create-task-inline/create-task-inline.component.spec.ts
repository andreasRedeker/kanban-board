import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskInlineComponent } from './create-task-inline.component';

describe('CreateTaskInlineComponent', () => {
  let component: CreateTaskInlineComponent;
  let fixture: ComponentFixture<CreateTaskInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskInlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTaskInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
