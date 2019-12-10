import { Components, registerComponent, withCurrentUser, withSingle } from 'meteor/vulcan:core'
import Users from 'meteor/vulcan:users'
import { FormattedMessage } from 'meteor/vulcan:i18n'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import mapProps from 'recompose/mapProps'
import { Button, Card, CardBody, CardFooter, CardHeader, CardLink, CardText, CardTitle } from 'reactstrap'
import Interweave from 'interweave'
import styled from 'styled-components'
import moment from 'moment'
import { DATE_FORMAT_LONG, DATE_FORMAT_SHORT } from '../../modules/constants.js'
import { transform } from '../../modules/helpers.js'
import PastProjects from '../../modules/past-projects/collection.js'

const SpanVerticalBarBefore = styled.span`
  ::before { content: " | "; };
`

class PastProjectsSingle extends PureComponent {
  seasonorder (project) {
    if (!project.season) {
      return null
    }

    var so = 'Season Info Missing'
    if (project.renewed && project.status === 'On Hiatus') {
      so = `Renewed for Season ${project.season}`
    } else if (project.status === 'On Hiatus' || project.status === 'Wrapped' || project.status === 'Canceled') {
      so = `Completed Season ${project.season}`
    }
    if (project.status === 'Casting') {
      so = `Season ${project.season}`
    }
    if (project.order) {
      so += ` (${project.order}-episode order)`
    }
    return so
  }

  render () {
    const { currentUser, document, networkStatus } = this.props
    if (networkStatus !== 8 && networkStatus !== 7) {
      return <Components.Loading />
    }
    if (!document) {
      return <FormattedMessage id='app.404' />
    }
    const project = document
    const seasonorder = this.seasonorder(project)
    const displayDate =
      'Project first added to database ' + moment(project.createdAt).format(DATE_FORMAT_SHORT) + ' / ' +
      'Last modified ' + moment(project.updatedAt).format(DATE_FORMAT_LONG)

    return (
      <div className='animated fadeIn'>
        <Components.HeadTags title={`V8 Alba: ${project.projectTitle}`} />
        <Card className='card-accent-secondary'>
          <CardHeader tag='h2'>{ project.projectTitle }{ Users.canUpdate({ collection: PastProjects, user: currentUser, document })
            ? <div className='float-right'>
              <Button tag={Link} to={`/past-projects/${project._id}/edit`}>Edit</Button>
            </div> : null}
          </CardHeader>
          <CardBody>
            <CardTitle className='mb-1'>
              { project.projectType &&
                <span>
                  { project.projectType }
                </span>
              }
              { project.network &&
                <SpanVerticalBarBefore>
                  { project.network }
                </SpanVerticalBarBefore>
              }
              { project.platformType &&
                <SpanVerticalBarBefore>
                  { project.platformType }
                </SpanVerticalBarBefore>
              }
              { project.union &&
                <SpanVerticalBarBefore>
                  { project.union }
                </SpanVerticalBarBefore>
              }
            </CardTitle>
            <CardText className='mb-1'>{ project.status }</CardText>
            { seasonorder &&
              <CardText>{ seasonorder }</CardText>
            }
            {project.htmlSummary
              ? <Interweave content={project.htmlSummary} transform={transform} />
              : <CardText className='mb-1'>{ project.summary }</CardText>
            }
            <hr />
            {project.htmlNotes
              ? <Interweave content={project.htmlNotes} transform={transform} />
              : <CardText className='mb-1'>{ project.notes }</CardText>
            }
            <hr />
            {project.website &&
            <CardText>
              <CardLink href={project.website} target='_websites'>Open official website <i className='fa fa-external-link' /></CardLink>
            </CardText>
            }
          </CardBody>
          <CardBody>
            <CardText className='mb-0'>
              <b>{ project.castingCompany }</b>
            </CardText>
            {project.castingOfficeId &&
              <Components.OfficeMini documentId={project.castingOfficeId} />
            }
            {project.contacts
              ? project.contacts.map(contact => <Components.ContactDetail key={contact.contactId} contact={contact} />)
              : null
            }
            {project.addresses
              ? project.addresses.map(address => <Components.ProjectsAddressDetail key={address} address={address} />)
              : null
            }
            {project.contactId}
          </CardBody>
          {project.links &&
          <CardBody>
            <CardText>
              {project.links.map((link, index) =>
                <Components.LinkDetail key={`link-detail-${index}`} link={link} />
              )}
            </CardText>
          </CardBody>
          }
          <CardFooter>
            <small className='text-muted'>{displayDate}</small>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

const options = {
  collection: PastProjects,
  fragmentName: 'PastProjectsSingleFragment'
}

const mapPropsFunction = props => ({ ...props, documentId: props.match && props.match.params._id, slug: props.match && props.match.params.slug })

registerComponent({
  name: 'PastProjectsSingle',
  component: PastProjectsSingle,
  hocs: [
    withCurrentUser,
    mapProps(mapPropsFunction), [withSingle, options] // mapProps must precede withSingle
  ]
})