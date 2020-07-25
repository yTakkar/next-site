import { components as docsComponents } from '../docs/documentation';

const H1 = ({ children }) => (
  <h1 className="fw7">
    {children}

    <style jsx>{`
      text-align: center;
      margin-top: 0;
      font-size: 2rem;
    `}</style>
  </h1>
);

const H2 = ({ children }) => (
  <h2 className="fw7">
    {children}{' '}
    <style jsx>{`
      h2 {
        margin-top: 2.5rem;
      }
    `}</style>
  </h2>
);

const H3 = ({ children }) => (
  <h3 className="fw7">
    {children}
    <style jsx>{`
      h3 {
        margin-top: 2rem;
      }
    `}</style>
  </h3>
);

const Ul = ({ children }) => (
  <ul>
    {children}
    <style jsx>{`
      list-style: none;
      margin-bottom: 2rem;
    `}</style>
  </ul>
);

const Li = ({ children }) => (
  <li>
    {children}
    <style jsx>{`
      :before {
        content: '-';
        display: inline-block;
        color: #6d6d6d;
        position: absolute;
        margin-left: -25px;
      }
      li {
        margin-bottom: 0.35rem;
      }
    `}</style>
  </li>
);

const Code = ({ children, syntax }) => {
  return (
    <pre className={syntax ? ` ${syntax}` : ''}>
      <code>{children}</code>
      <style jsx>
        {`
          pre {
            background: #1d1f21;
            color: #f8f8f2;
            white-space: pre;
            overflow: auto;
            padding: 1.5rem;
            margin: 40px 0;
            border-radius: 3px;
            -webkit-overflow-scrolling: touch;
          }

          code {
            font-size: 14px;
            line-height: 20px;
          }
        `}
      </style>
    </pre>
  );
};

const P = ({ children }) => {
  return (
    <p>
      {children}
      <style jsx>{`
        p {
          line-height: 1.8;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </p>
  );
};

const Hr = () => (
  <div>
    <hr />
    <style jsx>{`
      hr {
        margin: 4rem 0;
        border: none;
        border-bottom: 1px solid #eee;
      }
    `}</style>
  </div>
);

export const components = {
  ...docsComponents,
  h1: H1,
  h2: H2,
  h3: H3,
  li: Li,
  ul: Ul,
  code: Code,
  p: P,
  hr: Hr
};
