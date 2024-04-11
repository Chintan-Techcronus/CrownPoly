import { Routes } from '@angular/router';
import { ProhsFrmmainComponent } from './prohs-frmmain/prohs-frmmain.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProHsRoutes: Routes = [
  {
    path: 'hipposak',
    component: ProhsFrmmainComponent,
    canActivate: [AuthGuard]
  }
];