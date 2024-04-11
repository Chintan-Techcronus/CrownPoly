import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProScrapRoutes } from './pro-scrap-routing.module';
import { ProScrapComponent } from './pro-scrap/pro-scrap.component';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../shared/shared.module';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';

@NgModule({
  declarations: [
    ProScrapComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProScrapRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    SharedModule,
    QRCodeModule
  ]
})
export class ProScrapModule { }
