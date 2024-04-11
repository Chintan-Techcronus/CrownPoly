import { Routes } from '@angular/router';
import { AuthGuard } from '../authentication/auth/auth.guard';
import { ProstripcutFrmmainComponent } from './prostripcut-frmmain/prostripcut-frmmain.component';

export const ProStripCutRoutes: Routes = [
  {
    path: 'stripcut',
    component: ProstripcutFrmmainComponent,
    canActivate: [AuthGuard],
  }
];