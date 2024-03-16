import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/autenticacao', pathMatch: 'full' },
  // { path: 'autenticacao', component: LoginComponent },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Pagina Inicial'
      },
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
