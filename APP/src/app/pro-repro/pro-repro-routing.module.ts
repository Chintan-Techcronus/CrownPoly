import { Routes } from '@angular/router';
import { ProReproComponent } from './pro-repro/pro-repro.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProReproRoutes: Routes = [
  {
      path: 'repro',
      component: ProReproComponent,
      canActivate: [AuthGuard],
  }    
];



