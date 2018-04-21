import { registerFragment } from "meteor/vulcan:core";

registerFragment(/* GraphQL */ `
  fragment ContactsItemFragment on Contact {
    _id
    createdAt
    updatedAt
    userId
    displayName
    slug
  }
`);

registerFragment(/* GraphQL */ `
  fragment ContactsDetailsFragment on Contact {
    _id
    createdAt
    updatedAt
    userId
    displayName
    fullName
    body
    street1
    street2
    city
    state
    zip
    slug
  }
`);

registerFragment(/* GraphQL */ `
  fragment ContactsEditFragment on Contact {
    displayName
    body
    street1
    street2
    city
    state
    zip
  }
`);
