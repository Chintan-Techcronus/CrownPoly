import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PropnpFrmmainComponent } from './propnp-frmmain/propnp-frmmain.component';
import { PropnpFrmchangeComponent } from './propnp-frmchange/propnp-frmchange.component';
import { PropnpFrmincidentComponent } from './propnp-frmincident/propnp-frmincident.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { ProPnpRoutes } from './pro-pnp-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PropnpFrmmainComponent,
    PropnpFrmchangeComponent,
    PropnpFrmincidentComponent
  ],
  providers: [AuthGuard],
  imports: [
    CommonModule,
    RouterModule.forChild(ProPnpRoutes),
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ]
})
export class ProPNPModule { }
