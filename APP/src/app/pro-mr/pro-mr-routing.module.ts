import { Routes } from '@angular/router';
import { ProMRComponent } from './pro-mr/pro-mr.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProMRRoutes: Routes = [
  {
      path: 'masterroll',
      component: ProMRComponent,
      canActivate: [AuthGuard]
  }    
];