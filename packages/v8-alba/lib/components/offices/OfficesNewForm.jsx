import { Components, getFragment, registerComponent } from 'meteor/vulcan:core'
import React from 'react'
import { withRouter } from 'react-router'
import Offices from '../../modules/offices/collection.js'

const OfficesNewForm = ({ documentId, params, router, toggle }) => {
  const theDocumentId = documentId || params._id
  return (
    <div className='animated fadeIn'>
      <Components.SmartForm
        collection={Offices}
        documentId={theDocumentId}
        mutationFragment={getFragment('OfficesItemFragment')}
        successCallback={document => {
          if (toggle) {
            toggle()
          } else {
            router.push(`/offices/${theDocumentId}`)
          }
        }}
      />
    </div>
  )
}

registerComponent('OfficesNewForm', OfficesNewForm, withRouter)