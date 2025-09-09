import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component'),
    children: [
      {
        path: 'login',
        title: 'Iniciar Sesion',
        loadComponent: () => import('./auth/login/login.component'),
      },
      {
        path: 'recover',
        title: 'Recuperar Contraseña',
        loadComponent: () => import('./auth/recover/recover.component'),
      },
      {
        path: 'password/:id',
        title: 'Actualizar Contraseña',
        loadComponent: () => import('./auth/password/password.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'home',
        title: 'Dashboard',
        loadComponent: () => import('./dashboard/home/home.component'),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'prefix'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  }
];
