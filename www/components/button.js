import Link from 'next/link';
import classNames from 'classnames';
import css from 'styled-jsx/css';

import withPure from './hoc/pure';

const cachedStyles = css`
  .btn {
    display: inline-block;
    cursor: pointer;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    margin: -0.25rem -0.5rem;
    border-radius: 7px;
    color: rgb(var(--accent-color));
    background-color: transparent;
    border: none;
    font-size: inherit;
    line-height: inherit;
    transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  }
  .btn:hover {
    color: rgb(var(--accent-color));
    background: rgba(var(--accent-color), 0.1);
  }
  .btn.invert {
    margin: 0;
    padding: 0 2rem;
    height: 2.5rem;
    line-height: 2.5rem;
    border-radius: 7px;
    background-color: rgb(var(--accent-color));
    box-shadow: 0 4px 14px 0 rgba(var(--accent-color), 0.39);
    color: white;
  }
  .btn.invert:hover {
    background: rgba(var(--accent-color), 0.9);
    box-shadow: 0 6px 20px rgba(var(--accent-color), 0.23);
  }
  .btn.invert:active {
    background: rgb(var(--accent-color));
  }
`;
export default withPure(function Button({ children, invert, href, as, className, amp, ...props }) {
  const cachedClassNames = classNames(className, 'btn', 'fw4 no-drag', {
    invert
  });
  const isExternal = href && href.startsWith('http');
  const a = (
    <a className={cachedClassNames} href={href} {...props}>
      {children}
      <style jsx>{cachedStyles}</style>
    </a>
  );

  if (href) {
    return amp || isExternal ? (
      a
    ) : (
      <Link href={href} as={as}>
        {a}
      </Link>
    );
  }

  return (
    <button type="button" className={cachedClassNames} {...props}>
      {children}
      <style jsx>{cachedStyles}</style>
    </button>
  );
});
