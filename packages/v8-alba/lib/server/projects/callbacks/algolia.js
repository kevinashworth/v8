import { Promise } from 'meteor/promise'
import algoliasearch from 'algoliasearch'
import _ from 'lodash'
import { ACTIVE_PROJECT_STATUSES_ARRAY } from '../../../modules/constants.js'

const applicationid = Meteor.settings.private.algolia.ApplicationID
const adminapikey   = Meteor.settings.private.algolia.AdminAPIKey
const algoliaindex  = Meteor.settings.private.algolia.AlgoliaIndex

export function ProjectEditUpdateAlgoliaBefore (data, { document, originalDocument }) {
  var indexedObject = {
    objectID: document._id
  }
  var dirty = false
  if (document.summary !== originalDocument.summary) {
    indexedObject.body = document.summary
    dirty = true
  }
  if (document.notes !== originalDocument.notes) {
    indexedObject.notes = document.notes
    dirty = true
  }
  if (document.projectTitle !== originalDocument.projectTitle) {
    indexedObject.name = document.projectTitle
    dirty = true
  }
  if (document.network !== originalDocument.network) {
    indexedObject.network = document.network
    dirty = true
  }
  if (document.slug !== originalDocument.slug) {
    indexedObject.url = `/projects/${document._id}/${document.slug}`
    dirty = true
  }
  if (document.status !== originalDocument.status) {
    if (_.includes(ACTIVE_PROJECT_STATUSES_ARRAY, document.status)) {
      indexedObject.url = `/projects/${document._id}/${document.slug}`
    } else {
      indexedObject.url = `/past-projects/${document._id}/${document.slug}`
    }
    dirty = true
  }

  if (dirty) {
    const client = algoliasearch(applicationid, adminapikey)
    const index = client.initIndex(algoliaindex)
    indexedObject['updatedAt'] = new Date()
    Promise.await(index.partialUpdateObject(indexedObject,
      (err, response) => {
        if (err) {
          console.error('partialUpdateObject error:', err)
        }
        console.log('partialUpdateObject response:', response)
      }))
  }
}

export function ProjectCreateSaveToAlgolia (document) {
 const indexedObject = {
   objectID: document._id,
   name: document.projectTitle,
   body: document.summary,
   notes: document.notes,
   network: document.network,
   url: `/projects/${document._id}/${document.slug}`,
   updatedAt: document.createdAt,
   boosted: 2
 }

 const client = algoliasearch(applicationid, adminapikey)
 const index = client.initIndex(algoliaindex)
 Promise.await(index.saveObject(indexedObject,
   (err, response) => {
     if (err) {
       console.error('saveObject error:', err)
     }
     console.log('saveObject response:', response)
   }))
}