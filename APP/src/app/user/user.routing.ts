import { Routes } from "@angular/router";
import { UserListComponent } from "./user-list/user-list.component";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { AuthGuard } from "../authentication/auth/auth.guard";
import { AddCaseComponent } from "./add-case/add-case.component";



export const UserRoutes: Routes = [
    // {
    //     path: 'users',
    //     component: UserListComponent,
    //     canActivate: [AuthGuard],
    // },
    // {
    //     path: 'add-edit-user',
    //     component: AddEditUserComponent,
    //     canActivate: [AuthGuard],
    // },
    // {
    //     path: 'add-edit-user/:id',
    //     component: AddEditUserComponent,
    //     canActivate: [AuthGuard],
    // },
    {
        path: 'add-case',
        component: AddCaseComponent,
        canActivate: [AuthGuard],
    }
];
