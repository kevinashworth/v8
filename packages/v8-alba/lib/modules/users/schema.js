import Users from 'meteor/vulcan:users'
import SimpleSchema from 'simpl-schema'

const notificationsGroup = {
  name: 'notifications',
  order: 2
}

// fields we are MODIFYING
Users.addField([
  {
    fieldName: 'createdAt',
    fieldSchema: {
      canRead: ['guests']
    }
  },
  {
    fieldName: 'locale',
    fieldSchema: {
      hidden: true
    }
  },
  {
    fieldName: 'isAdmin',
    fieldSchema: {
      itemProperties: { layout: 'inputOnly' }
    }
  }
])

// fields we are ADDING
Users.addField([
  // email.address - REDUNDANT FOR NOW, MAY NOT KEEP
  {
    fieldName: 'emailAddress',
    fieldSchema: {
      label: 'Email Address (V8 - do not edit)',
      optional: true,
      type: String,
      canRead: ['members'],
      canCreate: ['members'],
      canUpdate: ['admins'],
      resolveAs: {
        resolver: (user) => {
          if (user.email) {
            return user.email
          } else if (user.emails && user.emails[0]) {
            return user.emails[0].address
          }
          return null
        }
      }
    }
  },
  // email.verified
  {
    fieldName: 'emailVerified',
    label: 'Email Verified? (V8 - do not edit)',
    fieldSchema: {
      type: Boolean,
      optional: true,
      defaultValue: false,
      canRead: ['members'],
      canCreate: ['members'],
      canUpdate: ['admins'],
      resolveAs: {
        resolver: (user) => {
          if (user.emails && user.emails[0]) {
            return user.emails[0].verified
          }
          return null
        }
      }
    }
  },
  // email.primary
  {
    fieldName: 'emailPrimary',
    label: 'Primary Email? (V8 - do not edit)',
    fieldSchema: {
      type: Boolean,
      optional: true,
      defaultValue: true,
      canRead: ['members'],
      canCreate: ['members'],
      canUpdate: ['admins'],
      resolveAs: {
        resolver: () => {
          return true
        }
      }
    }
  },
  // Count of user's comments
  {
    fieldName: 'commentCount',
    fieldSchema: {
      type: Number,
      optional: true,
      defaultValue: 0,
      canRead: ['guests']
    }
  },
  // User's bio
  {
    fieldName: 'bio',
    fieldSchema: {
      type: String,
      optional: true,
      mustComplete: true,
      input: 'textarea',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      searchable: true
    }
  },
  // User's bio (Markdown version)
  {
    fieldName: 'htmlBio',
    fieldSchema: {
      type: String,
      optional: true,
      canRead: ['guests']
      // usersEditGenerateHtmlBio in vulcan:users currently does the following
      // onCreate: ({ document }) => {
      //   return Utils.sanitize(marked(document.bio))
      // },
      // onUpdate: ({ data }) => {
      //   return Utils.sanitize(marked(data.bio))
      // }
    }
  },
  {
    fieldName: 'website',
    fieldSchema: {
      type: String,
      regEx: SimpleSchema.RegEx.Url,
      optional: true,
      input: 'text',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      inputProperties: {
        placeholder: 'http://'
      }
    }
  },
  {
    fieldName: 'updatedAt',
    fieldSchema: {
      type: Date,
      optional: true,
      hidden: true,
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      onCreate: () => {
        return new Date()
      },
      onUpdate: () => {
        return new Date()
      }
    }
  },
  // Add notifications options to user profile settings
  {
    fieldName: 'notifications_users',
    fieldSchema: {
      label: 'New users',
      type: Boolean,
      optional: true,
      defaultValue: true,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['admins'],
      canUpdate: ['admins'],
      group: notificationsGroup,
      itemProperties: { layout: 'inputOnly' }
    }
  },
  {
    fieldName: 'notifications_posts',
    fieldSchema: {
      label: 'New posts',
      type: Boolean,
      optional: true,
      defaultValue: true,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
      itemProperties: { layout: 'inputOnly' }
    }
  },
  {
    fieldName: 'notifications_comments',
    fieldSchema: {
      label: 'Comments on my posts',
      type: Boolean,
      optional: true,
      defaultValue: true,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
      itemProperties: { layout: 'inputOnly' }
    }
  },
  {
    fieldName: 'notifications_replies',
    fieldSchema: {
      label: 'Replies to my comments',
      type: Boolean,
      optional: true,
      defaultValue: true,
      input: 'checkbox',
      canRead: ['guests'],
      canCreate: ['members'],
      canUpdate: ['members'],
      group: notificationsGroup,
      itemProperties: { layout: 'inputOnly' }
    }
  }
])

Users.find({ emails: { $exists: true } }).forEach(user => {
  if (user.emails && user.emails[0]) {
    const emailAddress = user.emails[0].address
    const emailVerified = user.emails[0].verified
    Users.update(user._id,
      {
        $set: {
          emailAddress,
          emailVerified
        }
      })
  }
})

// `removeField` causes errors no matter which order.
// Different errors, but errors, unless Vulcan changed to remove both at once.
// So `emails` will be unused, but it will remain in the schema.
// Users.removeField('emails.$')
// Users.removeField('emails')
