import { Routes } from '@angular/router';
import { ProtbFrmmainComponent } from './protb-frmmain/protb-frmmain.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProTbRoutes: Routes = [
  {
    path: 'trashbag',
    component: ProtbFrmmainComponent,
    canActivate: [AuthGuard]
  }
];
