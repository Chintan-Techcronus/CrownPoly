import { Routes } from '@angular/router';
import { ProPalletizationComponent } from './pro-palletization/pro-palletization.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProPallatizationRoutes: Routes = [
  {
      path: 'palletization',
      component: ProPalletizationComponent,
      canActivate: [AuthGuard],
  }    
];