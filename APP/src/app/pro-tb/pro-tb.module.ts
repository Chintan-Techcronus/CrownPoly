import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProTbRoutes } from './pro-tb-routing.module';
import { ProtbFrmmainComponent } from './protb-frmmain/protb-frmmain.component';
import { MatCardModule } from '@angular/material/card';
import { ProtbFrmchangeComponent } from './protb-frmchange/protb-frmchange.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProtbFrmconsumeComponent } from './protb-frmconsume/protb-frmconsume.component';
import { ProtbFrmitemkeyComponent } from './protb-frmitemkey/protb-frmitemkey.component';
import { ProtbDialogQuantityComponent } from './protb-dialog-quantity/protb-dialog-quantity.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth/auth.guard';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
  declarations: [
    ProtbFrmmainComponent,
    ProtbFrmchangeComponent,
    ProtbFrmconsumeComponent,
    ProtbFrmitemkeyComponent,
    ProtbDialogQuantityComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule.forChild(ProTbRoutes),
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class ProTBModule { }
