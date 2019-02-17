import classNames from 'classnames'

export default ({isMobile, light, invert, selected, onClick, children}) => (
  <button className={classNames('fw4 no-drag no-tap-highlight', { selected, f5: isMobile })} onClick={onClick}>
    <style jsx>{`
      button {
        display: inline-block;
        border-radius: 7px;
        cursor: pointer;
        text-decoration: none;
        padding: .25rem .5rem;
        margin: ${isMobile ? '.25rem' : '0 1rem'};
        color: ${invert ? '#8D8D8D' : '#999'};
        transition: all .2s ease;
        background-color: transparent;
        font-size: inherit;
        border: none;
        line-height: inherit;
      }
      button:hover {
        // color;
        ${light ? '' : invert ? 'background-color: rgba(255, 255, 255, .05)' : 'background-color: rgba(0, 0, 0, .05)'};
      }
      button.selected {
        color: ${invert ? '#efefef' : 'inherit'};
        ${light ? '' : invert ? 'background-color: rgba(255, 255, 255, .1)' : 'background-color: rgba(0, 0, 0, .1)'};
      }
    `}</style>
    {children}
  </button>
)
