import React from 'react';

export default class Caret extends React.PureComponent {
  render() {
    return (
      <span className="caret">
        <style jsx>
          {`
            .caret {
              background: #0076ff;
              display: inline-block;
              width: 7px;
              height: 15px;
              vertical-align: middle;
            }
          `}
        </style>
      </span>
    );
  }
}
