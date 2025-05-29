import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginCognitoComponent } from './login-cognito/login-cognito.component';


// Acá lo que hacemos es definir las rutas correspondientes para cada tab. 
//Esto es crucial para que la navegación funcione correctamente.
//Si no está creado el .module. Hay que crear un ionic generate page de lo que querramos crear.
// const routes: Routes = [
//   {
//     path: 'perros-perdidos',
//     loadChildren: () => import('./perros-perdidos/perros-perdidos.module').then(m => m.PerrosPerdidosPageModule)
//   },
//   {
//     path: 'perros-encontrados',
//     loadChildren: () => import('./perros-encontrados/perros-encontrados.module').then(m => m.PerrosEncontradosPageModule)
//   },
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   //{ path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
//   { path: 'login', component: LoginCognitoComponent },
//     // component: LoginCognitoComponent },
//   { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) },
//   { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },   {
//     path: 'perros-perdidos',
//     loadChildren: () => import('./perros-perdidos/perros-perdidos.module').then( m => m.PerrosPerdidosPageModule)
//   },
//   {
//     path: 'perros-encontrados',
//     loadChildren: () => import('./perros-encontrados/perros-encontrados.module').then( m => m.PerrosEncontradosPageModule)
//   },
//   {
//     path: 'reset-password',
//     loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
//   }

// // Agrego la ruta para tabs
// ];

// app-routing.module.ts
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
