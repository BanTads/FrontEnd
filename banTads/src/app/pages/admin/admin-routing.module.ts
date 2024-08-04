import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthGuard } from "../login/auth-guard";
import {ListarClientesComponent} from "./listar-clientes/listar-clientes.component";
import {ListarGerentesComponent} from "./listar-gerentes/listar-gerentes.component";
import {EditarGerenteComponent} from "./editar-gerente/editar-gerente.component";

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
      {
        path: 'relatorio-de-clientes',
        component: ListarClientesComponent,
        title: 'Relatório de Clientes',
        canActivate: [AuthGuard],
        data: { expectedRole: ['ADMIN'] }
      },
      {
        path: 'gestao-de-gerentes',
        component: ListarGerentesComponent,
        title: 'Relatório de Gerentes',
        canActivate: [AuthGuard],
        data: { expectedRole: ['ADMIN'] }
      },
      {
        path: 'editar-gerente',
        component: EditarGerenteComponent,
        title: 'Editar Gerente',
        canActivate: [AuthGuard],
        data: { expectedRole: ['ADMIN'] }
      }


]
