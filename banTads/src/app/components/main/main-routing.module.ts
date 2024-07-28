import { Routes } from "@angular/router";
import { GerenteRoutes } from "../../pages/gerente/gerente-routing.module";
import { ClienteRoutes } from "../../pages/cliente/cliente-routing.module";
import { AdminRoutes } from "../../pages/admin/admin-routing.module";
import { AuthGuard } from "../../pages/login/auth-guard";
import { MainComponent } from "./main.component";
import { RedirectComponent } from "./redirect.component";

export const MainRoute: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: ['CLIENTE', 'GERENTE', 'ADMIN'] },
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RedirectComponent
            },
            ...GerenteRoutes,
            ...ClienteRoutes,
            ...AdminRoutes
        ]
    }
];
