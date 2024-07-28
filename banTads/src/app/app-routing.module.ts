import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteRoutes } from './pages/cliente/cliente-routing.module';
import { LoginRoutes } from './pages/login/login/login-routing.module';
import { GerenteRoutes } from './pages/gerente/gerente-routing.module';
import { AdminRoutes } from './pages/admin/admin-routing.module';
import { MainRoute } from './components/main/main-routing.module';

const routes: Routes = [
  
  ...MainRoute,
  ...LoginRoutes,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
