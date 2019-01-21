import React from 'react'
import { login } from '~/actions/user'

export default class ErrorBox extends React.Component {
  login (e) {
    e.preventDefault()
    login()
  }

  render () {
    const { error } = this.props
    return (
      <div>
        <h1 className='f1'>Error</h1>
        <h2 className='f-reset fw5'>{error.message}</h2>
        <p className='f5'>
          <a href='#' onClick={(e) => this.login(e)}>Login again</a> to resolve the issue.
        </p>
        <style jsx>{`
          div {
            padding: .5rem 1.5rem;
            margin-top: 1rem;
            border-radius: 7px;
            background: rgba(255, 0, 0, 0.1);
          }

          h1 {
            color: #ff2a37;
          }

          p {
            margin: 1rem 0 .8rem;
          }
        `}</style>
      </div>
    )
  }
}
