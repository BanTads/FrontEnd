import { Routes } from "@angular/router";
import { GerenteComponent } from "./gerente.component";
import { ListarClienteComponent } from "./listar-cliente/listar-cliente.component";
import { ConsultarClienteComponent } from "./consultar-cliente/consultar-cliente.component";
import { AuthGuard } from "../login/auth-guard";
import { MainComponent } from "../../components/main/main.component";

export const GerenteRoutes: Routes = [
  {
    path: '',
    redirectTo: '/gerente',
    pathMatch: 'full'
  },
  {
    path: "gerente",
    component: GerenteComponent,
    title: 'Página Inicial',
    canActivate: [AuthGuard],
    data: { expectedRole: ['GERENTE'] }
  },
  {
    path: 'gerente/listar',
    component: ListarClienteComponent,
    title: 'Lista de Clientes',

    canActivate: [AuthGuard],
    data: { expectedRole: ['GERENTE'] }
  },
  {
    path: 'gerente/consultar',
    component: ConsultarClienteComponent,
    title: 'Consultar Cliente',
    canActivate: [AuthGuard],
    data: { expectedRole: ['GERENTE'] }
  },

]