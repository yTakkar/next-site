import { ellipsis } from 'polished';
import Container from './container';
import withPure from './hoc/pure';

export default withPure(({ href, title, titleMobile, children }) => (
  <div className="notification f6" title={title}>
    <style jsx>
      {`
        .notification {
          width: 100%;
          height: 32px;
          text-align: center;
          background: rgba(var(--foreground-color), 0.06);
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        a {
          color: #999;
        }
        a:hover {
          color: rgb(var(--foreground-color));
        }
      `}
    </style>
    <Container style={ellipsis()}>
      {titleMobile ? (
        <>
          <a href={href} className="display-mobile">
            {titleMobile}
          </a>
          <a href={href} className="hide-mobile">
            {children}
          </a>
        </>
      ) : (
        <a href={href}>{children}</a>
      )}
    </Container>
  </div>
));
