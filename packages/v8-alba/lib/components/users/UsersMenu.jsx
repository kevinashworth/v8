import { Meteor } from 'meteor/meteor';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { STATES } from 'meteor/vulcan:accounts';
import Users from 'meteor/vulcan:users';
import { FormattedMessage } from 'meteor/vulcan:i18n';
import { withApollo } from 'react-apollo';
import React from 'react';
import PropTypes from 'prop-types';

const UsersMenu = ({ currentUser, currentUserLoading, client, state }) => {
  return (
    <div className="users-menu">
      {currentUserLoading ? (
        <Components.Loading />
      ) : currentUser ? (
        <UserLoggedInMenu currentUser={currentUser} client={client} />
      ) : (
        <UserLoggedOutMenu state={state} />
      )}
    </div>
  );
};

const UserLoggedInMenu = ({ currentUser, client }) => {
  const menuItems = [
    {
      itemProps: { header: true },
      label: Users.getDisplayName(currentUser)
    },
    {
      to: `/users/${currentUser.slug}`,
      labelId: 'users.profile',
    },
    {
      to: '/account',
      labelId: 'users.edit_account',
    },
  ];

  if (Users.isAdmin(currentUser)) {
    menuItems.push({
      to: '/admin',
      labelId: 'admin.users',
    });
    // menuItems.push({
    //   to: '/admin/categories',
    //   labelId: 'admin.categories',
    // });
    // menuItems.push({
    //   to: '/admin/comments',
    //   labelId: 'admin.comments',
    // });
    // menuItems.push({
    //   to: '/admin/posts',
    //   labelId: 'admin.posts',
    // });
  }

  menuItems.push({
    labelId: 'users.log_out',
    itemProps: {
      onClick: () => Meteor.logout(() => {
        client.resetStore();
        window.location.assign('/');
      }),
    },
  });

  return (
    <Components.Dropdown
      buttonProps={{ variant: 'secondary' }}
      id="user-dropdown"
      trigger={
        <div className="dropdown-toggle-inner">
          <Components.Avatar size="small" user={currentUser} addLink={false} />
          <div className="users-menu-name">{Users.getDisplayName(currentUser)}</div>
        </div>
      }
      menuItems={menuItems}
      variant={ 'flat' }
    />
  );
};

const UserLoggedOutMenu = ({ state }) => (
  <Components.Dropdown
    buttonProps={{ variant: 'btn-secondary' }}
    id="accounts-dropdown"
    className="users-account-menu"
    trigger={
      <div className="dropdown-toggle-inner">
        <Components.Icon name="user" />
        <FormattedMessage id="users.sign_up_log_in" />
      </div>
    }
    menuContents={<Components.AccountsLoginForm formState={state ? STATES[state] : STATES.SIGN_UP} />}
  />
);

UsersMenu.propsTypes = {
  currentUser: PropTypes.object,
  client: PropTypes.object,
};

registerComponent({
  name: 'UsersMenu',
  component: UsersMenu,
  hocs: [withCurrentUser, withApollo]
});
