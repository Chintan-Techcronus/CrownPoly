import { Routes } from "@angular/router";
import { PromasterstripFrmmainComponent } from "./promasterstrip-frmmain/promasterstrip-frmmain.component";
import { AuthGuard } from "../authentication/auth/auth.guard";

export const ProMasterStripRoutes: Routes = [
    {
        path: 'masterstrip',
        component: PromasterstripFrmmainComponent,
        canActivate: [AuthGuard]
    }
];
