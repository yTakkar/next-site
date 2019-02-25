import Container from '../container';
import Checkmark from '../icons/checkmark';
import { MediaQueryConsumer } from '../media-query';

export default () => (
  <MediaQueryConsumer>
    {({ isMobile, isTablet }) => {
      return (
        <Container gray wide>
          <div className="perfect-for">
            <h4>Perfect For:</h4>
            <ul>
              <li>
                <Checkmark />
                <span>Landing pages</span>
              </li>
              <li>
                <Checkmark />
                <span>Blogs</span>
              </li>
              <li>
                <Checkmark />
                <span>
                  Documentation
                  {isMobile || isTablet ? '' : ' and tutorials'}
                </span>
              </li>
              <li>
                <Checkmark />
                <span>Style guides</span>
              </li>
            </ul>
          </div>
          <style jsx>
            {`
              .perfect-for {
                display: flex;
                width: 100%;
                align-items: center;
                margin: 0 auto;
                padding: 2rem ${isMobile ? '0.5rem' : '1rem'};
                max-width: 64rem;
                flex-direction: ${isMobile ? 'column' : 'row'};
              }

              h4 {
                font-size: 1rem;
                margin: 0;
                margin-bottom: ${isMobile ? '1.5rem' : '0'};
              }

              ul {
                padding: 0 0 0 ${isMobile ? '0.5rem' : '0'};
                margin: 0 0 0 ${isMobile || isTablet ? '0.5rem' : '3.5em'};
                display: flex;
                flex: 1;
                flex-wrap: wrap;
                justify-content: space-between;
                list-style-type: none;
                justify-content: ${isMobile ? 'flex-start' : 'space-between'};
              }

              li {
                display: flex;
                align-items: center;
                width: ${isMobile ? '50%' : 'auto'};
                padding-right: ${isMobile ? '1rem' : '0'};
              }

              li {
                margin-bottom: ${isMobile ? '1rem' : '0'};
              }

              li span {
                height: 1.8rem;
                margin-left: 0.5rem;
              }

              ul > div {
                display: flex;
              }
            `}
          </style>
        </Container>
      );
    }}
  </MediaQueryConsumer>
);
