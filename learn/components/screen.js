import PropTypes from 'prop-types'
import React from 'react'

class Screen extends React.Component {
  getChildContext() {
    return {
      darkBg:
        this.props.darkBg != null
          ? this.props.darkBg
          : this.context.darkBg || false
    }
  }

  render() {
    const { id, children, fullWidth = false, offset = null } = this.props
    const darkBg =
      this.props.darkBg != null
        ? this.props.darkBg
        : this.context.darkBg || false
    return (
      <div
        id={id}
        className={`screen ${darkBg ? 'dark' : ''}`}
        style={{
          minHeight: offset != null ? `calc(100vh - ${offset}px)` : ''
        }}
      >
        <div className="wrap">{children}</div>
        <style jsx>{`
          .screen {
            display: flex;
            min-height: 100vh;
            align-items: center;
            background: #fff;
          }
          .wrap {
            margin: auto;
            width: ${fullWidth ? '100%' : 'auto'};
          }
          .dark {
            background: #000;
            color: #fff;
          }
        `}</style>
      </div>
    )
  }
}

Screen.childContextTypes = {
  darkBg: PropTypes.bool
}

Screen.contextTypes = {
  darkBg: PropTypes.bool
}

export default Screen