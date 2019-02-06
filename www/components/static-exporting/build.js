import React from 'react';

import Container from '../container';
import Checkmark from '../icons/checkmark';

import Terminal from './terminal';
import Input from './svg/Input';
import Result from './svg/Result';

export default class Build extends React.PureComponent {
  state = {
    showResult: false,
    demoInView: true
  };

  demo = React.createRef();

  componentDidMount() {
    const { scrollY } = window;
    const demoInView = scrollY <= this.demo.current.offsetTop + this.demo.current.clientHeight;
    if (demoInView !== this.state.demoInView) {
      this.setState({ demoInView });
    }
    this.scrollspy();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.scrollSpyID);
  }

  scrollspy = () => {
    this.scrollSpyID = requestAnimationFrame(() => {
      const { scrollY } = window;

      if (scrollY === this.lastFrameScroll) {
        this.lastFrameScroll = scrollY;
        return this.scrollspy();
      }

      this.lastFrameScroll = scrollY;

      // Section animation triggers
      const demoInView = scrollY <= this.demo.current.offsetTop + this.demo.current.clientHeight;

      if (demoInView !== this.state.demoInView) {
        this.setState(
          {
            demoInView
          },
          this.scrollspy
        );
      } else {
        this.scrollspy();
      }
    });
  };

  render() {
    return (
      <Container wide dark center>
        <div className="col">
          <div className="content">
            <ul>
              <li>
                <Checkmark inverse />
                <h4>Faster Delivery</h4>
              </li>
              <li>
                <Checkmark inverse />
                <h4>Modern Frontend Features</h4>
              </li>
              <li>
                <Checkmark inverse />
                <h4>No Lock-In</h4>
              </li>
              <li>
                <Checkmark inverse />
                <h4>Painless Developer Workflow</h4>
              </li>
            </ul>
          </div>

          <div ref={this.demo} className="animation-row">
            <div className="input">
              <Input animating={this.state.demoInView} />
            </div>
            <div className="terminal-wrapper">
              <Terminal running="true" showResult={() => this.setState({ showResult: true })} />
            </div>
            <div className="result">
              <Result animating={this.state.showResult} />
            </div>
          </div>
        </div>
        <style jsx>
          {`
            @keyframes shift {
              from {
                stroke-dashoffset: 0%;
              }
              to {
                stroke-dashoffset: -100%;
              }
            }

            :global(.line-dash) {
              animation: 20s shift linear forwards infinite;
              transform: translateZ(0);
              backface-visibility: hidden;
            }

            .content {
              display: flex;
              justify-content: center;
              max-width: 1024px;
              margin: 2.5rem auto;
            }

            .col {
              display: flex;
              flex-direction: column;
            }

            ul {
              padding: 0;
              margin: 0 1rem;
              display: flex;
              list-style-type: none;
              align-items: center;
              justify-content: space-between;
              width: 64rem;
            }

            li {
              display: flex;
              align-items: center;
            }

            .row > div {
              display: flex;
              align-items: center;
            }

            h4 {
              height: 2rem;
              margin: 0 0 0 0.5rem;
            }

            .animation-row {
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 0 0 1rem;

              max-width: 100%;
              height: 300px;
            }

            .terminal-wrapper {
              width: 480px;
              z-index: 1;
              /* tune position of terminal with respect to input and output */
              margin-top: -36px;
              box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.48), 0px 14px 50px rgba(0, 0, 0, 0.38);
            }

            .input,
            .result {
              visibility: ${this.state.demoInView ? 'visible' : 'hidden'};
            }

            @media screen and (max-width: 1024px) {
              .content {
                margin: 1rem 0 2rem 0;
              }
              .animation-row {
                margin: 3rem 0 1rem 0;
              }
              .col {
                flex-direction: column-reverse;
              }
              ul {
                width: auto;
                flex-direction: column;
                align-items: flex-start;
              }
              li {
                margin: 1rem 0;
              }
            }

            @media screen and (max-width: 840px) {
              .terminal-wrapper {
                margin: 0 2rem;
              }

              .input,
              .result {
                display: none;
              }
            }
          `}
        </style>
      </Container>
    );
  }
}
