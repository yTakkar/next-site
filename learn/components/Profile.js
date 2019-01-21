import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'

import ProfileCard from './new/profile-card'

export default class Profile extends React.Component {
  fireAction (e, name, ...args) {
    e.preventDefault()
    const action = this.props[name]
    if (action) {
      action(...args)
    }
  }

  login = (e) => {
    this.fireAction(e, 'onLogin')
  }

  logout = (e) => {
    const store = this.props.nextEnv.store
    const loginToken = store.get('loginToken')
    if (loginToken) {
      this.fireAction(e, 'onLogout', loginToken)
    }
  }

  renderUserInfo () {
    const { user } = this.props
    if (!user) return null

    return (
      <span>{user.name}<span> ({user.points} points)</span>
        <style jsx>{`
          span {
            color: #000;
            font-weight: bold;
          }

          span span {
            font-weight: 400;
          }
        `}</style>
      </span>
    )
  }

  render () {
    const startHref = `/learn/content?course=${FIRST_COURSE}&lesson=${FIRST_LESSON}`
    const startAs = `/learn/${FIRST_COURSE}/${FIRST_LESSON}`

    const { user, isMobile } = this.props
    return <ProfileCard user={user} login={this.login} logout={this.logout} isMobile={isMobile}/>
  }
}

Profile.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
  onLogin: PropTypes.func,
  isMobile: PropTypes.bool
}

Profile.userFragment = (c) => c.createFragment(`
  fragment on User {
    points,
    name,
    username
  }
`)
