import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProMRRoutes } from './pro-mr-routing.module';
import { ProMRComponent } from './pro-mr/pro-mr.component';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProMRComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProMRRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    SharedModule
  ]
})
export class ProMRModule { }
