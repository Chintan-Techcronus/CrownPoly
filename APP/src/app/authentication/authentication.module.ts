import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProdLineListComponent } from './prod-line-list/prod-line-list.component';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { DemoMaterialModule } from '../demo-material-module';
import { SharedModule } from '../shared/shared.module';
import { ShiftLineComponent } from './shift-line/shift-line.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    LoginComponent,
    ProdLineListComponent,
    ShiftLineComponent,
  ], 
  imports: [
    CommonModule,
     AuthenticationRoutingModule,
     MatCardModule,
     FlexLayoutModule,
     MatFormFieldModule,
     MatInputModule,
     MatCheckboxModule,
     FormsModule,
     HttpClientModule,
     ReactiveFormsModule,
     CdkTableModule,
     DemoMaterialModule,
     SharedModule,
     MatProgressSpinnerModule
    ], 
})
export class AuthenticationModule {}
