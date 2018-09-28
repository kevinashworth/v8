import { registerFragment } from 'meteor/vulcan:core'

registerFragment(/* GraphQL */ `
  fragment ProjectsItemFragment on Project {
    _id
    createdAt
    updatedAt
    userId
    projectTitle
    slug
  }
`)

registerFragment(/* GraphQL */ `
  fragment ProjectsSingleFragment on Project {
    _id
    createdAt
    updatedAt
    userId
    projectTitle
    projectType
    castingCompany
    addresses
    contacts
    network
    status
    union
    notes
    htmlNotes
    logline
    htmlLogline
    website
    season
    order
    slug
  }
`)

registerFragment(/* GraphQL */ `
  fragment ProjectsEditFragment on Project {
    _id
    projectTitle
    projectType
    castingCompany
    contacts
    addresses
    network
    status
    union
    notes
    htmlNotes
    logline
    htmlLogline
    website
    season
    order
  }
`)
