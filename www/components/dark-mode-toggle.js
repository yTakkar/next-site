import useDarkMode from 'use-dark-mode';

import Sun from './icons/sun';
import Moon from './icons/moon';

export default function DarkModeToggle() {
  const darkMode = useDarkMode(false);

  return (
    <div className="wrapper">
      <svg width="11" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="10.4615"
          y1="0.192308"
          x2="0.461538"
          y2="24.1923"
          stroke="rgba(var(--foreground-color), 0.4)"
        />
      </svg>

      <button className="toggle" type="button" onClick={darkMode.toggle}>
        {darkMode.value ? <Sun /> : <Moon />}
      </button>
      <style jsx>{`
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 1rem;
        }
        .toggle {
          appearance: none;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          margin-left: 5px;
          color: rgb(var(--foreground-color));
        }
        .toggle:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}
