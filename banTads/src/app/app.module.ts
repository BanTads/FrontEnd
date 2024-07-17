import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ConsultaClienteComponent } from './gerente/consulta-cliente/consulta-cliente.component';
import { AutocadastroComponent } from './pages/autocadastro/autocadastro.component';
import { ListarClientesComponent } from './gerente/listar-clientes/listar-clientes.component';
import { LoginComponent } from './pages/login/login/login.component';
import { SelfRegisterComponent } from './pages/login/self-register/self-register.component';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    ConsultaClienteComponent,
    AutocadastroComponent,
    ListarClientesComponent,
    LoginComponent,
    SelfRegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    FormsModule,
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

