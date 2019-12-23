import algoliasearch from 'algoliasearch'

const applicationid = Meteor.settings.private.algolia.ApplicationID
const adminapikey   = Meteor.settings.private.algolia.AdminAPIKey
const algoliaindex  = Meteor.settings.private.algolia.AlgoliaIndex

export function ContactEditUpdateAlgoliaBefore (data, { document, originalDocument }) {
  var indexedObject = {
    objectID: document._id
  }
  var dirty = false
  if (document.body !== originalDocument.body) {
    indexedObject.body = document.body
    dirty = true
  }
  if (document.displayName !== originalDocument.displayName) {
    indexedObject.name = document.displayName
    dirty = true
  }
  if (document.addressString !== originalDocument.addressString) {
    indexedObject['addressString'] = document.addressString
    dirty = true
  }
  if (document.slug !== originalDocument.slug) {
    indexedObject['url'] = `/contacts/${document._id}/${document.slug}`
    dirty = true
  }

  if (dirty) {
    const client = algoliasearch(applicationid, adminapikey)
    const index = client.initIndex(algoliaindex)
    indexedObject['updatedAt'] = new Date()
    Promise.await(index.partialUpdateObject(indexedObject,
      (err, content) => {
        if (err) {
          console.error('partialUpdateObject error:', err)
        } else {
          console.log('partialUpdateObject response:', content)
          data.updatedAlgoliaAt = new Date()
        }
      }))
  }

  console.log('ContactEditUpdateAlgoliaBefore data at return:', data)
  return data
}
