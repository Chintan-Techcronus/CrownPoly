import { Routes } from '@angular/router';
import { ReactivateLineComponent } from './reactivate-line/reactivate-line.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ReactivateLineRoutes: Routes = [
  {
    path: 'reactivate-line',
    component: ReactivateLineComponent,
    canActivate: [AuthGuard],
  }
];
