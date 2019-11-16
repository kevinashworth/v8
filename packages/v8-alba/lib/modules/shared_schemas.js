import SimpleSchema from 'simpl-schema'

export const addressSchema = {
  street1: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  street2: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  city: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  state: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  zip: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  location: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  }
}

export const addressSubSchema = new SimpleSchema(addressSchema)

export const linkSubSchema = new SimpleSchema({
  platformName: {
    type: String,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  profileName: {
    type: String,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  profileLink: {
    type: String,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  }
})
