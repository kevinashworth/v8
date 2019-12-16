Package.describe({
  name: 'v8-alba',
  version: '1.14.0'
});

Package.onUse(function (api) {
  api.use([
    'vulcan:core',
    'vulcan:accounts',
    'vulcan:admin',
    'vulcan:forms',
    'vulcan:redux',
    'fourseven:scss',
    'percolate:migrations'
  ]);

  api.addFiles('lib/stylesheets/ContactsVirtualizedList.css', 'client');
  api.addFiles('lib/stylesheets/react-bootstrap-table-all.min.css', 'client');
  api.addFiles('lib/stylesheets/react-select.min.css', 'client');
  api.addFiles('lib/stylesheets/react-virtualized-select-styles.css', 'client');
  api.addFiles('lib/stylesheets/react-virtualized-styles.css', 'client');
  api.addFiles('lib/stylesheets/simple-line-icons.scss', 'client');
  api.addFiles('lib/stylesheets/spinner.scss', 'client');

  api.addFiles([
    'lib/stylesheets/alba-2.0.9/react-perfect-scrollbar-styles.css',
    'lib/stylesheets/alba-2.0.9/style.css',
    'lib/stylesheets/alba-2.0.9/custom-btn.css',
    'lib/stylesheets/alba-2.0.9/custom-comments.scss',
    'lib/stylesheets/alba-2.0.9/custom-grid.scss'
  ], ['client']);

  api.addAssets([
    'lib/static/brand/logo.svg',
    'lib/static/brand/sygnet.svg',
    'lib/static/brand/logo-pro.svg',
    'lib/static/brand/sygnet-pro.svg'
  ], ['client']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
