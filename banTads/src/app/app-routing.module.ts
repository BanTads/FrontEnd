import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {LoginComponent} from "./pages/login/login/login.component";
import {ClienteComponent} from "./pages/cliente/cliente.component";
import {EditarPerfilComponent} from "./pages/editar-perfil/editar-perfil.component";
import {GerenteComponent} from "./pages/gerente/gerente.component";
import {AdminComponent} from "./pages/admin/admin.component";

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
        path: "gerente",
        component: GerenteComponent,
        title: 'Página Inicial'
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
      // {
      //   path: 'consultar-cliente'
      // },
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
