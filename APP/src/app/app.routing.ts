import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './authentication/login/login.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: FullComponent,
        children: [
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }, // Default route
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-hs/pro-hs.module').then(m => m.ProHSModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./user/user.module').then(m => m.UserModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./promasterstrip/promasterstrip.module').then(m => m.PromasterstripModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-tb/pro-tb.module').then(m => m.ProTBModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-mr/pro-mr.module').then(m => m.ProMRModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-pnp/pro-pnp.module').then(m => m.ProPNPModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-repro/pro-repro.module').then(m => m.ProReproModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-scrap/pro-scrap.module').then(m => m.ProScrapModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./pro-palletization/pro-palletization.module').then(m => m.ProPalletizationModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./prostripcut/prostripcut.module').then(m => m.ProstripcutModule)
            },
            {
                path: '',
                loadChildren:
                    () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
            },
            {
                path: '',
                loadChildren: () => import('./reactivate-line/reactivate-line.module').then(m => m.ReactivateLineModule)
            },
        ]
    }
];
