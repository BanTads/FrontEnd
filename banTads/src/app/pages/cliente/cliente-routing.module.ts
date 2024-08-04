import { Routes } from '@angular/router';
import { AuthGuard } from '../login/auth-guard';
import { ClienteComponent } from './cliente.component';
import { EditarPerfilComponent } from '../editar-perfil/editar-perfil.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { ExtratoComponent } from './extrato/extrato.component';

export const ClienteRoutes: Routes = [
    {
        path: '',
        redirectTo: '/cliente',
        pathMatch: 'full'
    },
            {
                path: 'cliente',
                component: ClienteComponent,
                title: 'BanTads - Seu Banco Digital',
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
                path: 'movimentacao',
                component: MovimentacaoComponent,
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'cliente/extrato',
                component: ExtratoComponent,
                title: 'Consulta Extrato',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
            {
                path: 'meu-perfil/:id',
                component: EditarPerfilComponent,
                title: 'Meu Perfil',
                canActivate: [AuthGuard],
                data: { expectedRole: ['CLIENTE'] }
            },
     
];