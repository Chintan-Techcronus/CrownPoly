import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProReproComponent } from './pro-repro/pro-repro.component';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import { SharedModule } from '../shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ProReproRoutes } from './pro-repro-routing.module';

@NgModule({
  declarations: [
    ProReproComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProReproRoutes),
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
export class ProReproModule { }
