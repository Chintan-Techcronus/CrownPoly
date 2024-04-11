import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromasterstripFrmmainComponent } from './promasterstrip-frmmain/promasterstrip-frmmain.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ProMasterStripRoutes } from './promasterstrip-routing.module';
import { DemoMaterialModule } from '../demo-material-module';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ProstripcutFrmmainComponent } from '../prostripcut/prostripcut-frmmain/prostripcut-frmmain.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProMasterStripRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DemoMaterialModule,
    SharedModule
  ],
  providers: [AuthGuard],
  declarations: [
    PromasterstripFrmmainComponent,
    ProstripcutFrmmainComponent,
  ]

})
export class PromasterstripModule { }
