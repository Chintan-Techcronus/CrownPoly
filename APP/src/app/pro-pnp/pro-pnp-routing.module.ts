import { Routes } from '@angular/router';
import { PropnpFrmmainComponent } from './propnp-frmmain/propnp-frmmain.component';
import { AuthGuard } from '../authentication/auth/auth.guard';

export const ProPnpRoutes: Routes = [
  {
    path: 'pullnpak',
    component: PropnpFrmmainComponent,
    canActivate: [AuthGuard]
  }
];