import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConsultaClienteComponent } from './gerente/consulta-cliente/consulta-cliente.component';
import {LoginComponent} from "./pages/login/login/login.component";
import {ClienteComponent} from "./pages/cliente/cliente.component";
import {EditarPerfilComponent} from "./pages/editar-perfil/editar-perfil.component";
import {GerenteComponent} from "./pages/gerente/gerente.component";
import {AdminComponent} from "./pages/admin/admin.component";
import {SaqueComponent} from "./pages/cliente/saque/saque.component";
import {DepositarComponent} from "./pages/cliente/depositar/depositar.component";
import {TransferenciaComponent} from "./pages/cliente/transferencia/transferencia.component";
import {ListarClienteComponent} from "./pages/gerente/listar-cliente/listar-cliente.component";
import {ConsultarClienteComponent} from "./pages/gerente/consultar-cliente/consultar-cliente.component";

const routes: Routes = [
  //{ path: '', redirectTo: '/autenticacao', pathMatch: 'full' },
  {
    path:'login',
    component: LoginComponent,

  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Pagina Inicial'
      },
      {
        path: 'cliente',
        component: ClienteComponent,
        title: 'Página Inicial'
      },
      {
        path: 'cliente/editar', //TODO adicionar id /:id
        component: EditarPerfilComponent,
        title: 'Editar Perfil'
      },
      {
        path: 'cliente/saque',
        component: SaqueComponent,
        title: 'Saque'
      },
      {
        path: 'cliente/deposito',
        component: DepositarComponent,
        title: 'Depositar'
      },
      {
        path: 'cliente/transferencia',
        component: TransferenciaComponent,
        title: 'Transferência'
      },
      {
        path: "gerente",
        component: GerenteComponent,
        title: 'Página Inicial'
      },
      {
        path:'gerente/listar',
        component: ListarClienteComponent,
        title: 'Lista de Clientes'
      },
      {
        path: 'gerente/consultar',
        component: ConsultarClienteComponent,
        title: 'Consultar Cliente'
      },
      {
        path: "admin",
        component: AdminComponent,
        title: 'Página Inicial'
      }
      // {
      //   path: 'relatorio-de-clientes'
      // },
      // {
      //   path: 'gestao-de-gerentes'
      // },
      {
        path: 'consulta-cliente',
        component: ConsultaClienteComponent,
        title: 'Consultar Cliente'
      },
      // {
      //   path: 'melhores-clientes',

      //   title: 'Melhores Clientes'
      // },

      // {
      //   path: 'cliente/depositos'
      // },

      // {
      //   path: 'cliente/saques'
      // },

      // {
      //   path: 'cliente/transferencias'
      // },

      // {
      //   path: 'cliente/extratos'
      // },
      // {
      //   path: '/meu-perfil/:id'
      // },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
