import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeSearchResultsListComponent } from './recipe-search-results-list.component';

describe('RecipeSearchResultsListComponent', () => {
  let component: RecipeSearchResultsListComponent;
  let fixture: ComponentFixture<RecipeSearchResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeSearchResultsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeSearchResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
