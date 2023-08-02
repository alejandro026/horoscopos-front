import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgglomerativeComponent } from './agglomerative/agglomerative.component';
import {MatDialogModule} from '@angular/material/dialog';


// Available options
interface NgxSpinnerConfig {
  type?: string;
}

@NgModule({
  declarations: [
    AdminComponent,
    AgglomerativeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
  ]
})
export class AdminModule { }
