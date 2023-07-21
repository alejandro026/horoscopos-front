import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExportarDatasetComponent } from './exportar-dataset.component';

const routes: Routes = [{ path: '', component: ExportarDatasetComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportarDatasetRoutingModule { }