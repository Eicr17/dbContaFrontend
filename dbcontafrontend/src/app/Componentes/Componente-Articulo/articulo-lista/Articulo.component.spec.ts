import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloComponent } from './Articulo.component';

describe('ArticuloComponent', () => {
  let component: ArticuloComponent;
  let fixture: ComponentFixture<ArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
