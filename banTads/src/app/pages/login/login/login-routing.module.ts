import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { SelfRegisterComponent } from "../self-register/self-register.component";

export const LoginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
      },
]