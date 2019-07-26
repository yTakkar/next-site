import React from 'react';

export default class Prompt extends React.PureComponent {
  render() {
    return (
      <span className="prompt">
        <span className="triangle">▲</span> ~/my-site{' '}
        <style jsx>
          {`
            .triangle {
              color: #fff;
            }
            .prompt {
              color: #ccc;
            }
          `}
        </style>
      </span>
    );
  }
}
