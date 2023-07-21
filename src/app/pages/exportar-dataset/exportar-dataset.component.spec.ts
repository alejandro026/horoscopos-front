import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportarDatasetComponent } from './exportar-dataset.component';

describe('ExportarDatasetComponent', () => {
  let component: ExportarDatasetComponent;
  let fixture: ComponentFixture<ExportarDatasetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExportarDatasetComponent]
    });
    fixture = TestBed.createComponent(ExportarDatasetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
