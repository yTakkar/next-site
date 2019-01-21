import React, { Children } from 'react'
import '../lib/polyfill'
import RouterEvents from '../lib/router-events'
import {trackPageview} from '../lib/analytics'

RouterEvents.on('routeChangeComplete', (url) => {
  trackPageview(url)
})

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <style jsx global>{`
        html {
          height: 100%;
          font-size: 62.5%;
        }
          body {
            position: relative;
        min-height: 100%;
        margin: 0;
        padding: 0;
        padding-bottom: 6rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        text-rendering: optimizeLegibility;
        line-height: 1.5;
        font-size: 1.6rem;
          }
        `}</style>
        { this.props.children }
      </div>
    )
  }
}
