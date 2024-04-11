import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProPalletizationComponent } from './pro-palletization/pro-palletization.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { SharedModule } from '../shared/shared.module';
import { FrmPalletComponent } from './frm-pallet/frm-pallet.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FrmMoveComponent } from './frm-move/frm-move.component';
import { FrmReprintComponent } from './frm-reprint/frm-reprint.component';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { ProPallatizationRoutes } from './pro-palletization-routing.module';
import { FrmPrintOldTagsComponent } from './frm-print-old-tags/frm-print-old-tags.component';


@NgModule({
  declarations: [
    ProPalletizationComponent,
    FrmPalletComponent,
    FrmMoveComponent,
    FrmReprintComponent,
    FrmPrintOldTagsComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProPallatizationRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    QRCodeModule,
    SharedModule
  ]
})
export class ProPalletizationModule { }
