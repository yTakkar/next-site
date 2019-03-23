const campaignWords = [
  'Production',
  'Server-Rendered Apps',
  'Static Websites',
  'the Enterprise',
  'the Desktop',
  'the Mobile Web',
  'Lightweight Apps',
  'SEO-Friendly Sites',
  'PWAs',
  'Electron'
];

export default () => {
  const animationDuration = 1.8;
  const animationLength = animationDuration * campaignWords.length;
  const endOfAnimation = 100 / campaignWords.length;
  const animationOverlap = 0.1;

  return (
    <div className="slider-container">
      <div className="words">
        {campaignWords.map((word, index) => (
          <span
            key={word}
            style={{
              animationDelay:
                index === 0 ? '1ms' : `${animationDuration * index}s`
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <style jsx>{`
        .slider-container {
          margin: auto;
          margin-top: 0;
          margin-bottom: -1rem;
          line-height: 1.4em;
          white-space: nowrap;
        }

        .words {
          width: 100%;
          height: 3.4em;
          display: block;
          margin-top: 1rem;
          margin-bottom: 2rem;
        }

        .words span {
          position: absolute;
          opacity: 0;
          overflow: hidden;
          animation: slide-word ${animationLength}s linear infinite 0s;
          animation-timing-function: cubic-bezier(0.19, 0.82, 0.84, 1.06);
        }

        @keyframes slide-word {
          0% {
            opacity: 0;
            transform: translate3d(-50%, 25%, 0px);
            visibility: visible;
          }
          ${1 - 1 * animationOverlap}% {
            opacity: 1;
            transform: translate3d(-50%, 75%, 0px);
          }
          ${endOfAnimation}% {
            opacity: 1;
            transform: translate3d(-50%, 75%, 0px);
            visibility: visible;
          }
          ${endOfAnimation + endOfAnimation * animationOverlap}% {
            opacity: 0;
            transform: translate3d(-50%, 135%, 0px);
            visibility: hidden;
          }
          100% {
            opacity: 0;
            visibility: visible;
          }
        }
      `}</style>
    </div>
  );
};
