import React, { PureComponent } from 'react'

export default class extends PureComponent {
  state = {
    scrolled: false,
    fixed: false,
    active: false
  }
  onScroll = () => {
    let scroll = window.scrollY || document.body.scrollTop
    let scrolled = scroll > (this.props.distance || 0)
    let fixed = scroll >= (this.props.distance || 0)
    let active = scroll >= (this.props.active || 0)

    if (
      scrolled !== this.state.scrolled ||
      fixed !== this.state.fixed ||
      active !== this.state.active
    ) {
      this.setState({ scrolled, fixed, active })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    this.onScroll()
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
  render() {
    const { scrolled, fixed, active } = this.state
    const { height, offset, shadow, zIndex, background, defaultActive, children } = this.props

    return (
      <header>
        <style jsx>{`
          header {
            left: 0;
            top: 0;
            width: 100%;
            height: ${height}px;
          }
          .fixed-container {
            position: relative;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            left: 0;
            z-index: ${zIndex || 1000};
            background: ${background || 'rgba(255, 255, 255, 0.98)'};
            transition: box-shadow 0.5s ease;
          }
          .fixed {
            position: fixed;
            top: ${offset || 0}px;
          }
          .scrolled {
            position: fixed;
            top: ${offset || 0}px;
          }
          .active {
            ${shadow ? `box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);` : ''}
          }
        `}</style>
        <div
          className={`fixed-container${scrolled ? ' scrolled' : ''}${fixed ? ' fixed' : ''}${
            active || defaultActive ? ' active' : ''
          }`}
        >
          {children}
        </div>
      </header>
    )
  }
}
