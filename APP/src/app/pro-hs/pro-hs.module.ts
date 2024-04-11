import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProhsFrmmainComponent } from './prohs-frmmain/prohs-frmmain.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProhsFrmchangeComponent } from './prohs-frmchange/prohs-frmchange.component';
import { ProhsFrmconsumeComponent } from './prohs-frmconsume/prohs-frmconsume.component';
import { ProhsFrmitemkeyComponent } from './prohs-frmitemkey/prohs-frmitemkey.component';
import { ProhsDialogQuantityComponent } from './prohs-dialog-quantity/prohs-dialog-quantity.component';
import { ProHsRoutes } from './pro-hs-routing.module';
import { AuthGuard } from '../authentication/auth/auth.guard';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ProhsFrmmainComponent,
    ProhsFrmchangeComponent,
    ProhsFrmconsumeComponent,
    ProhsFrmitemkeyComponent,
    ProhsDialogQuantityComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProHsRoutes),
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class ProHSModule { }
