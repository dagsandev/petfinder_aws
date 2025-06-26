import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginCognitoComponent } from './login-cognito/login-cognito.component';

const routes: Routes = [
  { 
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    //canActivate: [AuthGuard] // Protege esta ruta
  },
  { 
    path: 'login', 
    component: LoginCognitoComponent 
  },
  { 
    path: 'perros-perdidos',
    loadChildren: () => import('./perros-perdidos/perros-perdidos.module').then(m => m.PerrosPerdidosPageModule),
    //canActivate: [AuthGuard] // Protege esta ruta
  },
  { 
    path: 'perros-encontrados',
    loadChildren: () => import('./perros-encontrados/perros-encontrados.module').then(m => m.PerrosEncontradosPageModule),
    //canActivate: [AuthGuard] // Protege esta ruta
  },
  { 
  path: 'favoritos',
  loadChildren: () => import('./favoritos/favoritos.module').then(m => m.FavoritosModule)
},
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
