import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProstripcutFrmitemkeyComponent } from './prostripcut-frmitemkey/prostripcut-frmitemkey.component';
import { ProstripcutDialogQuantityComponent } from './prostripcut-dialog-quantity/prostripcut-dialog-quantity.component';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { RouterModule } from '@angular/router';
import { ProStripCutRoutes } from './prostripcut-routing.module';

@NgModule({
  declarations: [
    ProstripcutFrmitemkeyComponent,
    ProstripcutDialogQuantityComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProStripCutRoutes),
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class ProstripcutModule { }
