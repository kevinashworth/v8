import { Components, registerComponent, withCurrentUser, withSingle } from 'meteor/vulcan:core'
import { FormattedMessage } from 'meteor/vulcan:i18n'
import React, { PureComponent } from 'react'
import { Button, Card, CardBody, CardFooter, CardHeader, CardLink, CardText } from 'reactstrap'
import Markup from 'interweave'
import Users from 'meteor/vulcan:users'
import { Link } from 'react-router-dom'
import mapProps from 'recompose/mapProps'
import moment from 'moment'
import { DATE_FORMAT_LONG, DATE_FORMAT_SHORT } from '../../modules/constants.js'

class UsersProfile extends PureComponent {
  render() {
    const { currentUser, document, loading } = this.props
    if (loading) {
      return (
        <div className='page'>
          <Components.Loading />
        </div>
      )
    } else if (!document) {
      console.log(`// missing user (_id/slug: ${this.props.documentId || this.props.slug})`);
      return (
        <div className='page'>
          <FormattedMessage id='app.404' />
        </div>
      )
    } else {
      const user = document
      let displayDate =
        'User added ' + moment(user.createdAt).format(DATE_FORMAT_SHORT)
      if (user.updatedAt) {
        displayDate += ' / ' +   'Last modified ' + moment(user.updatedAt).format(DATE_FORMAT_LONG)
      }
      return (
        <div className='animated fadeIn'>
          <Components.HeadTags
            url={Users.getProfileUrl(user, true)}
            title={`V8 Alba: ${Users.getDisplayName(user)}`}
          />
          <Card className='card-accent-muted'>
            <CardHeader tag='h2'>{Users.getDisplayName(user)}{ Users.canUpdate({ collection: Users, user: currentUser, document: user })
              ? <div className='float-right'>
                  <Button tag={Link} to={`/users/${user.slug}/edit`}>Edit</Button>
                </div>
              : null}
            </CardHeader>
            <CardBody>
              {user.htmlBio
               ? <Markup content={user.htmlBio} />
               : <CardText>{ user.bio }</CardText>
              }
              {user.website ? (
                <CardText>
                <a href={user.website} target='_websites'>{user.website} </a>
                </CardText>
              ) : null}
            </CardBody>
            {user.twitterUsername ? (
              <CardBody>
                <CardText>
                  <Button className='btn-twitter'>
                    <span><CardLink href={'https://twitter.com/' + user.twitterUsername}> {user.twitterUsername} </CardLink></span>
                  </Button>
                </CardText>
              </CardBody>
            ) : null}
            <CardBody>
              <CardText>
                {this.props.blahblahblah ? <Components.UsersCommentsList /> : null}
              </CardText>
            </CardBody>
            <CardFooter>
              <small className='text-muted'>{displayDate}</small>
            </CardFooter>
          </Card>
        </div>
      )
    }

  }

}

UsersProfile.displayName = 'UsersProfile'

const options = {
  collection: Users,
  fragmentName: 'UsersProfile'
}

const mapPropsFunction = props => ({
  ...props,
  documentId: props.match && props.match.params._id,
  slug: props.match && props.match.params.slug
})

registerComponent({
  name: 'UsersProfile',
  component: UsersProfile,
  hocs: [
    withCurrentUser,
    mapProps(mapPropsFunction), [withSingle, options]
  ]
})
