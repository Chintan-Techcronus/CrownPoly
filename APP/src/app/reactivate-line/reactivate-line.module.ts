import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactivateLineComponent } from './reactivate-line/reactivate-line.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactivateLineRoutes } from './reactivate-line-routing.module';
import { AuthGuard } from '../authentication/auth/auth.guard';

@NgModule({
  declarations: [
    ReactivateLineComponent,
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ReactivateLineRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    SharedModule
  ]
})
export class ReactivateLineModule { }
