// PARA NUMEROS
// onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;"
// PARA CORREO
// pattern="[a-zA-Z0-9!#$%&amp;'*+\/=?^_`{|}~.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*"


import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/admin/home',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Pilares'
  },
  {
    name: 'Admin',
    url: '/admin/wasa',
    icon: 'icon-drop',
    children: [
      {
        name: 'Lista Admins',
        url: '/admin/admin/list',
        icon: 'icon-puzzle'
      },
      {
        name: 'Crear Admin',
        url: '/admin/admin/create',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    name: 'Cliente',
    url: '/admin/wasa',
    icon: 'icon-pencil',
    children: [
      {
        name: 'Lista Clientes',
        url: '/admin/cliente/list',
        icon: 'icon-puzzle'
      },
      {
        name: 'Crear Cliente',
        url: '/admin/cliente/create',
        icon: 'icon-puzzle'
      },
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Procesos'
  },
  {
    name: 'Proceso1',
    url: '/admin/wasa',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Subproceso1',
        url: '/admin/procesos/proceso1/subproceso1',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Proceso2',
    url: '/admin/wasa',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Subproceso1',
        url: '/admin/procesos/proceso2/subproceso1',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Proceso3',
    url: '/admin/wasa',
    icon: 'icon-pie-chart',
    children: [
      {
        name: 'Subproceso1',
        url: '/admin/procesos/proceso3/subproceso1',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Reportes',
  },
  {
    name: 'Reportes',
    url: '/admin/wasa',
    icon: 'icon-star',
    children: [
      {
        name: 'Lista de Reportes',
        url: '/admin/reportes/list',
        icon: 'icon-star'
      }
    ]
  }
];
