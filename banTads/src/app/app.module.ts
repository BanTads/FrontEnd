import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainComponent } from './components/main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './pages/login/login/login.component';
import { SelfRegisterComponent } from './pages/login/self-register/self-register.component';
import { MatFormField } from "@angular/material/form-field";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "./material/material.module";
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { SquareCardComponent } from './components/cards/square-card/square-card.component';
import { RectangularCardComponent } from './components/cards/rectangular-card/rectangular-card.component';
import { TableCardComponent } from './components/cards/table-card/table-card.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { GerenteComponent } from './pages/gerente/gerente.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ListarClienteComponent } from "./pages/gerente/listar-cliente/listar-cliente.component";
import { ConsultarClienteComponent } from './pages/gerente/consultar-cliente/consultar-cliente.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { ExtratoComponent } from './pages/cliente/extrato/extrato.component';
import { MovimentacaoComponent } from './pages/cliente/movimentacao/movimentacao.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './services/login.service';
import { MotivoRecusaComponent } from './pages/gerente/motivo-recusa/motivo-recusa.component';
import {Top3Component} from "./pages/gerente/top3/top3.component";
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: false,
  decimal: ',',
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.',
  
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavbarComponent,
    LoginComponent,
    SelfRegisterComponent,
    UserDetailsComponent,
    ClienteComponent,
    SquareCardComponent,
    RectangularCardComponent,
    TableCardComponent,
    EditarPerfilComponent,
    GerenteComponent,
    AdminComponent,
    ListarClienteComponent,
    ConsultarClienteComponent,
    ExtratoComponent,
    MovimentacaoComponent,
    MotivoRecusaComponent,
    Top3Component,
  ],
  imports: [
    CurrencyMaskModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    FormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LoginService,
    CookieService,
    provideAnimationsAsync(),
    provideEnvironmentNgxMask(),
    provideAnimations(),
    provideToastr(),
    {
      provide: CURRENCY_MASK_CONFIG,
      useValue: CustomCurrencyMaskConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

