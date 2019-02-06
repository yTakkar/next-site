import Container from '../container';
import Checkmark from '../icons/checkmark';
import { MediaQueryConsumer } from '../media-query';

export default () => (
  <MediaQueryConsumer>
    {({ isMobile, isTablet }) => {
      if (!isMobile && !isTablet) {
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
                  <span>Documentation and tutorials</span>
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
                  padding: 2rem 1rem;
                  max-width: 64rem;
                }

                h4 {
                  font-size: 1rem;
                  margin: 0;
                }

                ul {
                  padding: 0;
                  margin: 0 0 0 3.5rem;
                  display: flex;
                  flex: 1;
                  justify-content: space-between;
                  list-style-type: none;
                }

                li {
                  display: flex;
                  align-items: center;
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
      }

      return null;
    }}
  </MediaQueryConsumer>
);
