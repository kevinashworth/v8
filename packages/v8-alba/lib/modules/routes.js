import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {path: '/',                  name: 'Home',           componentName: 'Dashboard'}, // <Redirect from='/' to='/dashboard'/>
  {path: '/dashboard',         name: 'Dashboard',      componentName: 'Dashboard'},
  {path: '/contacts',          name: 'Contacts (T)',   componentName: 'ContactsTable'},
  {path: '/contactsdatatable', name: 'Contacts (DT)',  componentName: 'ContactsDataTable'},
  {path: '/modals',            name: 'Modals Test',    componentName: 'Modals'},
]);
