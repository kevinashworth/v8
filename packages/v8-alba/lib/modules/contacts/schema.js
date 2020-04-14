import { Utils } from 'meteor/vulcan:core'
import SimpleSchema from 'simpl-schema'
import marked from 'marked'
import { addressSubSchema, linkSubSchema, officeSubSchema } from '../shared_schemas.js'
import { CASTING_TITLES_ENUM } from '../constants.js'
import { getAddress, getFullAddress, getFullNameFromContact } from '../helpers.js'

const getHtmlBody = (contact) => {
  if (contact.body) {
    return Utils.sanitize(marked(contact.body))
  } else {
    return null
  }
}

const getAddressString = (contact) => {
  try {
    return getFullAddress(getAddress({ contact }))
  } catch (e) {
    console.group('Error in addressString for ', contact._id, ':')
    console.error(e)
    console.groupEnd()
    return 'Error in getAddressString'
  }
}

const projectGroup = {
  name: 'projects',
  label: 'Projects',
  order: 10
}

const officeGroup = {
  name: 'offices',
  label: 'Offices (Preferred Over Addresses)',
  order: 20
}

const addressGroup = {
  name: 'addresses',
  label: 'Addresses (Not Available Under Offices)',
  order: 30
}

const linkGroup = {
  name: 'links',
  label: 'Links',
  order: 40
}

const pastProjectGroup = {
  name: 'pastProjects',
  label: 'Past Projects',
  order: 50,
  startCollapsed: true
}

const projectSubSchema = new SimpleSchema({
  projectId: {
    type: String,
    input: 'SelectProjectIdNameTitle',
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    options: props => props.data.projects.results.map(project => ({
      value: project._id,
      label: project.projectTitle
    }))
  },
  projectTitle: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  titleForProject: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  }
})

const pastProjectSubSchema = new SimpleSchema({
  projectId: {
    type: String,
    input: 'SelectPastProjectIdNameTitle',
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    options: props => props.data.pastProjects.results.map(project => ({
      value: project._id,
      label: project.projectTitle
    }))
  },
  projectTitle: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  titleForProject: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  }
})

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests']
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date()
    }
  },
  userId: {
    type: String,
    optional: true,
    canRead: ['members']
  },

  // custom properties

  firstName: {
    label: 'First',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  middleName: {
    label: 'Middle',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  lastName: {
    label: 'Last',
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  displayName: {
    type: String,
    optional: true,
    canRead: ['guests'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    onCreate: ({ document: contact }) => getFullNameFromContact(contact),
    onUpdate: ({ data, document: contact }) => {
      if (data.displayName) {
        return data.displayName
      }
      return getFullNameFromContact({
        firstName: data.firstName ? data.firstName : null,
        middleName: data.middleName ? data.middleName : null,
        lastName: data.lastName ? data.lastName : null
      })
    }
  },
  title: {
    type: String,
    optional: true,
    input: 'MySelect',
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    options: CASTING_TITLES_ENUM
  },
  gender: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  // Body (Markdown)
  body: {
    label: 'Notes',
    type: String,
    optional: true,
    input: 'textarea',
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins']
  },
  // HTML version of Body
  htmlBody: {
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    onCreate: ({ document: contact }) => getHtmlBody(contact),
    onUpdate: ({ data: contact }) => getHtmlBody(contact)
  },
  links: {
    label: 'Links',
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    group: linkGroup
  },
  'links.$': {
    type: linkSubSchema
  },
  allLinks: {
    type: String,
    optional: true,
    canRead: ['members'],
    resolveAs: {
      resolver: (o) => {
        if (o.links) {
          const linkStrings = o.links.map(contact => contact.platformName + ' ' + contact.profileName + ' ' + contact.profileLink)
          return linkStrings.join(' ')
        }
        return null
      }
    }
  },
  addresses: {
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    group: addressGroup
  },
  'addresses.$': {
    type: addressSubSchema
  },
  allAddresses: {
    type: String,
    optional: true,
    canRead: ['members'],
    resolveAs: {
      resolver: (o) => {
        if (o.addresses) {
          const addressStrings = o.addresses.map(contact => getFullAddress(contact))
          return addressStrings.join(' ')
        }
        return null
      }
    }
  },
  addressString: {
    label: 'Computed Address String',
    type: String,
    optional: true,
    hidden: true,
    canRead: ['members'],
    onCreate: ({ document: contact }) => getAddressString(contact),
    onUpdate: ({ data: contact }) => getAddressString(contact)
  },
  // field to ease transition from address to addresses,
  // to provide a 'main' address, and used for caculating `location`
  theAddress: {
    label: 'Address Object',
    type: addressSubSchema,
    optional: true,
    canRead: ['members'],
    onCreate: ({ document }) => getAddress({ contact: document }),
    onUpdate: ({ document }) => getAddress({ contact: document }),
    defaultValue: {
      street1: 'theAddress',
      street2: 'isNotReadyYet',
      city: '',
      state: '',
      zip: '',
      location: 'Unknown'
    }
  },
  slug: {
    type: String,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    onCreate: ({ document: contact }) => {
      return Utils.slugify(getFullNameFromContact(contact))
    },
    onUpdate: ({ data, document: contact }) => {
      if (data.slug) {
        return Utils.slugify(data.slug)
      }
      return Utils.slugify(getFullNameFromContact({
        firstName: data.firstName ? data.firstName : null,
        middleName: data.middleName ? data.middleName : null,
        lastName: data.lastName ? data.lastName : null
      }))
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    canRead: ['guests'],
    onCreate: () => {
      return new Date()
    },
    onUpdate: () => {
      return new Date()
    }
  },

  // A contact has many offices
  offices: {
    label: 'Offices',
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    group: officeGroup,
    query:/* GraphQL */`
      query OfficesNameAndId {
        offices {
          results {
            _id
            displayName
          }
        }
      }
    `
  },
  'offices.$': {
    type: officeSubSchema
  },

  // A contact has many projects
  projects: {
    label: 'Projects',
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    group: projectGroup,
    query:/* GraphQL */`
      query ProjectsTitleAndId {
        projects {
          results {
            _id
            projectTitle
          }
        }
      }
    `
  },
  'projects.$': {
    type: projectSubSchema
  },

  // A contact has many pastProjects
  pastProjects: {
    label: 'Past Projects',
    type: Array,
    optional: true,
    canRead: ['members'],
    canCreate: ['members', 'admins'],
    canUpdate: ['members', 'admins'],
    group: pastProjectGroup,
    query:/* GraphQL */`
      query PastProjectsTitleAndId {
        pastProjects {
          results {
            _id
            projectTitle
          }
        }
      }
    `,
  },
  'pastProjects.$': {
    type: pastProjectSubSchema
  },

  // GraphQL only fields

  fullName: {
    label: 'Full Name',
    type: String,
    optional: true,
    canRead: ['members'],
    resolveAs: {
      type: 'String',
      resolver: (o) => getFullNameFromContact(o)
    }
  }
}

export default schema
