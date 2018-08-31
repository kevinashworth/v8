Package.describe({
  name: 'example-movies',
});

Package.onUse(function (api) {

  api.use([

    'promise',

    // vulcan core
    'vulcan:core@1.12.3',

    // vulcan packages
    'vulcan:forms@1.12.3',
    'vulcan:accounts@1.12.3',
    'vulcan:ui-bootstrap@1.12.3',

  ]);

  api.addFiles('lib/stylesheets/bootstrap.min.css');

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
