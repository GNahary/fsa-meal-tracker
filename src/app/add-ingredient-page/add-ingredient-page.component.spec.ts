import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIngredientPageComponent } from './add-ingredient-page.component';

describe('AddIngredientPageComponent', () => {
  let component: AddIngredientPageComponent;
  let fixture: ComponentFixture<AddIngredientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIngredientPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIngredientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
