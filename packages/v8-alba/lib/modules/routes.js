import { addRoute } from 'meteor/vulcan:core';

addRoute([
  {path: '/',           name:'root',       componentName: 'Dashboard'}, // <Redirect from="/" to="/dashboard"/>
  {path: "/dashboard",  name: "Dashboard", componentName: 'Dashboard'},
]);
