const navItems = {
  topItems: [
    {
      title: true,
      name: 'Home'
    },
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      name: 'Latest Updates',
      url: '/latest',
      icon: 'fa fa-bullhorn'
    },
    {
      title: true,
      name: 'The Info'
    },
  ],
  smItems: [
    {
      name: 'Contacts',
      url: '/contacts',
      icon: 'icon-people'
    },
    {
      name: 'Offices',
      url: '/offices',
      icon: 'icon-briefcase'
    },
    {
      name: 'Projects',
      url: '/projects',
      icon: 'fa fa-camera'
    },
    {
      name: 'Past Projects',
      url: '/past-projects',
      icon: 'fa fa-camera-retro'
    }
  ],
  xsItems: [
    {
      name: 'Contacts (M)',
      url: '/m/contacts',
      icon: 'icon-people'
    },
    {
      name: 'Offices (M)',
      url: '/m/offices',
      icon: 'icon-briefcase'
    },
    {
      name: 'Projects (M)',
      url: '/m/projects',
      icon: 'fa fa-camera'
    }
  ],
  adminItems: [
    {
      title: true,
      name: 'Admin'
    },
    {
      name: 'New Project',
      url: '/projects/new',
      icon: 'fa fa-camera'
    },
    {
      name: 'User Admin',
      url: '/admin/users',
      icon: 'fa fa-user-o'
    },
    {
      name: 'Comments Admin',
      url: '/admin/comments',
      icon: 'fa fa-comments-o'
    },
    {
      name: 'Back Office',
      url: '/backoffice',
      icon: 'fa fa-pencil'
    },
    {
      name: 'Statistics',
      url: '/statistics/list',
      icon: 'fa fa-bar-chart'
    }
  ],
  develItems: [
    {
      title: true,
      name: 'Development'
    },
    {
      name: 'Debug',
      url: '/debug',
      icon: 'fa fa-file-code-o'
    },
    {
      name: 'Fragments',
      url: '/fragments',
      icon: 'fa fa-files-o'
    },
    {
      name: 'QraphQL',
      url: '/graphql',
      icon: 'fa fa-first-order'
    },
    {
      name: 'QraphiQL',
      url: '/graphiql',
      icon: 'fa fa-info',
      wrapper: {
        attributes: { target: '_blank', rel: 'noopener' }
      }
    },
    {
      name: 'Modals',
      url: '/modals',
      icon: 'fa fa-external-link'
    },
    {
      name: 'Contacts (M)',
      url: '/m/contacts',
      icon: 'icon-people'
    },
    {
      name: 'Offices (M)',
      url: '/m/offices',
      icon: 'icon-briefcase'
    },
    {
      name: 'Projects (M)',
      url: '/m/projects',
      icon: 'fa fa-camera'
    },
    {
      name: 'Contacts (L)',
      url: '/contacts/list',
      icon: 'icon-people'
    }
  ]
};

let keyCounter = 0;
export default {
  topItems: navItems.topItems.map(item => ({ ...item, id: keyCounter++ })),
  smItems: navItems.smItems.map(item => ({ ...item, id: keyCounter++ })),
  xsItems: navItems.xsItems.map(item => ({ ...item, id: keyCounter++ })),
  adminItems: navItems.adminItems.map(item => ({ ...item, id: keyCounter++ })),
  develItems: navItems.develItems.map(item => ({ ...item, id: keyCounter++ }))
};


// export default {
//   items: [
//     {
//       title: true,
//       name: 'Dashboard',
//       wrapper: {            // optional wrapper object
//         element: '',        // required valid HTML5 element tag
//         attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
//       },
//       class: ''             // optional class names space delimited list for title item ex: "text-center"
//     },
//     {
//       name: 'Dashboard',
//       url: '/dashboard',
//       icon: 'icon-speedometer',
//       badge: {
//         variant: 'info',
//         text: 'NEW',
//       },
//     },
//     {
//       title: true,
//       name: 'Theme',
//       wrapper: {
//         element: '',
//         attributes: {},
//       }
//     },
//     {
//       name: 'Colors',
//       url: '/theme/colors',
//       icon: 'icon-drop',
//     },
//     {
//       name: 'Typography',
//       url: '/theme/typography',
//       icon: 'icon-pencil',
//     },
//     {
//       title: true,
//       name: 'Components',
//       wrapper: {
//         element: '',
//         attributes: {},
//       },
//     },
//     {
//       name: 'Base',
//       url: '/base',
//       icon: 'icon-puzzle',
//       children: [
//         {
//           name: 'Breadcrumbs',
//           url: '/base/breadcrumbs',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Cards',
//           url: '/base/cards',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Carousel',
//           url: '/base/carousels',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Collapse',
//           url: '/base/collapses',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Dropdowns',
//           url: '/base/dropdowns',
//           icon: 'icon-puzzle'
//         },
//         {
//           name: 'Jumbotrons',
//           url: '/base/jumbotrons',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'List group',
//           url: '/base/list-groups',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Navs',
//           url: '/base/navs',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Paginations',
//           url: '/base/paginations',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Popovers',
//           url: '/base/popovers',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Progress Bar',
//           url: '/base/progress-bar',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Switches',
//           url: '/base/switches',
//           icon: 'icon-puzzle'
//         },
//         {
//           name: 'Tabs',
//           url: '/base/tabs',
//           icon: 'icon-puzzle',
//         },
//         {
//           name: 'Tooltips',
//           url: '/base/tooltips',
//           icon: 'icon-puzzle',
//         },
//       ],
//     },
//     {
//       name: 'Buttons',
//       url: '/buttons',
//       icon: 'icon-cursor',
//       children: [
//         {
//           name: 'Buttons',
//           url: '/buttons/buttons',
//           icon: 'icon-cursor',
//         },
//         {
//           name: 'Brand Buttons',
//           url: '/buttons/brand-buttons',
//           icon: 'icon-cursor',
//         },
//         {
//           name: 'Button groups',
//           url: '/buttons/button-groups',
//           icon: 'icon-cursor',
//         },
//         {
//           name: 'Dropdowns',
//           url: '/buttons/button-dropdowns',
//           icon: 'icon-cursor',
//         },
//         {
//           name: 'Loading Buttons',
//           url: '/buttons/loading-buttons',
//           icon: 'icon-cursor',
//           badge: {
//             variant: 'danger',
//             text: 'PRO',
//           },
//         },
//       ],
//     },
//     {
//       name: 'Charts',
//       url: '/charts',
//       icon: 'icon-pie-chart'
//     },
//     {
//       name: 'Editors',
//       url: '/editors',
//       icon: 'fa fa-code',
//       children: [
//         {
//           name: 'Code Editors',
//           url: '/editors/code-editors',
//           icon: 'fa fa-code',
//           badge: {
//             variant: 'danger',
//             text: 'PRO',
//           },
//         },
//         {
//           name: 'Text Editors',
//           url: '/editors/text-editors',
//           icon: 'icon-note',
//           badge: {
//             variant: 'danger',
//             text: 'PRO',
//           },
//         }
//       ]
//     },
//     {
//       name: 'Forms',
//       url: '/forms',
//       icon: 'icon-note',
//       children: [
//         {
//           name: 'Basic Forms',
//           url: '/forms/basic-forms',
//           icon: 'icon-note'
//         },
//         {
//           name: 'Advanced Forms',
//           url: '/forms/advanced-forms',
//           icon: 'icon-note',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         },
//         {
//           name: 'Validation',
//           url: '/forms/validation-forms',
//           icon: 'icon-note',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         }
//       ]
//     },
//     {
//       name: 'Google Maps',
//       url: '/google-maps',
//       icon: 'icon-map',
//       badge: {
//         variant: 'danger',
//         text: 'PRO'
//       }
//     },
//     {
//       name: 'Icons',
//       url: '/icons',
//       icon: 'icon-star',
//       children: [
//         {
//           name: 'CoreUI Icons',
//           url: '/icons/coreui-icons',
//           icon: 'icon-star',
//           badge: {
//             variant: 'info',
//             text: 'NEW',
//           },
//         },
//         {
//           name: 'Flags',
//           url: '/icons/flags',
//           icon: 'icon-star',
//         },
//         {
//           name: 'Font Awesome',
//           url: '/icons/font-awesome',
//           icon: 'icon-star',
//           badge: {
//             variant: 'secondary',
//             text: '4.7',
//           },
//         },
//         {
//           name: 'Simple Line Icons',
//           url: '/icons/simple-line-icons',
//           icon: 'icon-star',
//         },
//       ],
//     },
//     {
//       name: 'Notifications',
//       url: '/notifications',
//       icon: 'icon-bell',
//       children: [
//         {
//           name: 'Alerts',
//           url: '/notifications/alerts',
//           icon: 'icon-bell',
//         },
//         {
//           name: 'Badges',
//           url: '/notifications/badges',
//           icon: 'icon-bell',
//         },
//         {
//           name: 'Modals',
//           url: '/notifications/modals',
//           icon: 'icon-bell'
//         },
//         {
//           name: 'Toastr',
//           url: '/notifications/toastr',
//           icon: 'icon-bell',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         }
//       ]
//     },
//     {
//       name: 'Plugins',
//       url: '/plugins',
//       icon: 'icon-energy',
//       children: [
//         {
//           name: 'Calendar',
//           url: '/plugins/calendar',
//           icon: 'icon-calendar',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         },
//         {
//           name: 'Draggable',
//           url: '/plugins/draggable',
//           icon: 'icon-cursor-move',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         },
//         {
//           name: 'Spinners',
//           url: '/plugins/spinners',
//           icon: 'fa fa-spinner',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         }
//       ]
//         },
//     {
//       name: 'Tables',
//       url: '/tables',
//       icon: 'icon-list',
//       children: [
//         {
//           name: 'Data Table',
//           url: '/tables/data-table',
//           icon: 'icon-list',
//           badge: {
//             variant: 'danger',
//             text: 'PRO'
//           }
//         },
//         {
//           name: 'Tables',
//           url: '/tables/tables',
//           icon: 'icon-list'
//         }
//       ]
//     },
//     {
//       name: 'Widgets',
//       url: '/widgets',
//       icon: 'icon-calculator',
//       badge: {
//         variant: 'info',
//         text: 'NEW',
//       },
//     },
//     {
//       divider: true,
//     },
//     {
//       title: true,
//       name: 'Extras',
//     },
//     {
//       name: 'Pages',
//       url: '/pages',
//       icon: 'icon-star',
//       children: [
//         {
//           name: 'Login',
//           url: '/login',
//           icon: 'icon-star',
//         },
//         {
//           name: 'Register',
//           url: '/register',
//           icon: 'icon-star',
//         },
//         {
//           name: 'Error 404',
//           url: '/404',
//           icon: 'icon-star',
//         },
//         {
//           name: 'Error 500',
//           url: '/500',
//           icon: 'icon-star',
//         },
//       ],
//     },
//     {
//       name: 'Apps',
//       url: '/apps',
//       icon: 'icon-layers',
//       children: [
//         {
//           name: 'Invoicing',
//           url: '/apps/invoicing',
//           icon: 'icon-speech',
//           children: [
//             {
//               name: 'Invoice',
//               url: '/apps/invoicing/invoice',
//               icon: 'icon-speech',
//               badge: {
//                 variant: 'danger',
//                 text: 'PRO'
//               }
//             }
//           ]
//         },
//         {
//           name: 'Email',
//           url: '/apps/email',
//           icon: 'icon-speech',
//           children: [
//             {
//               name: 'Inbox',
//               url: '/apps/email/inbox',
//               icon: 'icon-speech',
//               badge: {
//                 variant: 'danger',
//                 text: 'PRO',
//               },
//             },
//             {
//               name: 'Message',
//               url: '/apps/email/message',
//               icon: 'icon-speech',
//               badge: {
//                 variant: 'danger',
//                 text: 'PRO',
//               },
//             },
//             {
//               name: 'Compose',
//               url: '/apps/email/compose',
//               icon: 'icon-speech',
//               badge: {
//                 variant: 'danger',
//                 text: 'PRO',
//               },
//             },
//           ],
//         },
//       ]
//     },
//     {
//       divider: true,
//       class: 'm-2'
//     },
//     {
//       title: true,
//       name: 'Labels'
//     },
//     {
//       name: 'Label danger',
//       url: '',
//       icon: 'fa fa-circle',
//       label: {
//         variant: 'danger'
//       },
//     },
//     {
//       name: 'Label info',
//       url: '',
//       icon: 'fa fa-circle',
//       label: {
//         variant: 'info'
//       }
//     },
//     {
//       name: 'Label warning',
//       url: '',
//       icon: 'fa fa-circle',
//       label: {
//         variant: 'warning'
//       }
//     },
//   ]
// };
