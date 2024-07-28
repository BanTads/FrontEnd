import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "../login/auth-guard";

export const AdminRoutes: Routes = [
  {
    path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  {
        path: 'admin',
        component: AdminComponent,
        title: 'Página Inicial',
        canActivate: [AuthGuard],
        data: { expectedRole: ['ADMIN'] } 
      },
      // {
      //   path: 'relatorio-de-clientes'
      // },
      // {
      //   path: 'gestao-de-gerentes'
      // },
      
]