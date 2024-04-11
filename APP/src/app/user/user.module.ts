import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { DemoMaterialModule } from '../demo-material-module';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutes } from './user.routing';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { PinInputDirective } from '../common/pin-input.directive';
import { SharedModule } from '../shared/shared.module';
import { AddCaseComponent } from './add-case/add-case.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
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
    AddEditUserComponent,
    UserListComponent,
    PinInputDirective,
    AddCaseComponent,
    
  ]
})
export class UserModule { }
