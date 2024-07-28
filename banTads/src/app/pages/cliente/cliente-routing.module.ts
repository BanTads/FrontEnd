import { Routes } from '@angular/router';
import { AuthGuard } from '../login/auth-guard';
import { ClienteComponent } from './cliente.component';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { DepositoComponent } from './deposito/deposito.component';
import { SaqueComponent } from './saque/saque.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { MainComponent } from '../../components/main/main.component';


export const ClienteRoutes: Routes = [
    {
        path: '',
        redirectTo: '/cliente',
        pathMatch: 'full'
    },
            {

                path: 'cliente',
                component: ClienteComponent,
                title: 'Página Inicial',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/editar', //TODO adicionar id /:id
                component: EditarPerfilComponent,
                title: 'Editar Perfil',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/deposito',
                component: DepositoComponent,
                title: 'Depósito',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/saque',
                component: SaqueComponent,
                title: 'Saque',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'movimentacao',
                component: MovimentacaoComponent,
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/transferencia',
                component: TransferenciaComponent,
                title: 'Transferência',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/extrato',
                component: ExtratoComponent,
                title: 'Consulta Extrato',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            }
     
];