import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ExportarDatasetComponent } from './exportar-dataset.component';
import { ExportarDatasetRoutingModule } from './exportar-dataset-routing.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    //ExportarDatasetComponent
  ],
  imports: [
    CommonModule,
    ExportarDatasetRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ExportarDatasetModule { }
