import { Routes } from '@angular/router';
import { ProScrapComponent } from './pro-scrap/pro-scrap.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProScrapRoutes: Routes = [
  {
      path: 'scrap',
      component: ProScrapComponent,
      canActivate: [AuthGuard],
  }    
];
