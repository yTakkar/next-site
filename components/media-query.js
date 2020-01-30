import React, { PureComponent, useState, useCallback, useEffect } from 'react';

const { Provider: MediaQueryProvider, Consumer: MediaQueryConsumer } = React.createContext({
  isMobile: false,
  isTablet: false
});

const withMediaQuery = Comp =>
  class extends PureComponent {
    state = {
      isMobile: false,
      isTablet: false
    };
    componentDidMount() {
      window.addEventListener('resize', this.onResize);
      this.onResize();
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
    onResize = () => {
      const isMobile = window.innerWidth < 640;
      const isTablet = window.innerWidth < 960;

      if (isMobile !== this.state.isMobile) {
        this.setState({ isMobile });
      }
      if (isTablet !== this.state.isTablet) {
        this.setState({ isTablet });
      }
    };
    render() {
      const { isMobile, isTablet } = this.state;

      return (
        <MediaQueryProvider value={{ isMobile, isTablet }}>
          <Comp isMobile={isMobile} isTablet={isTablet} {...this.props} />
        </MediaQueryProvider>
      );
    }
  };

const useMediaQuery = width => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback(e => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

const useIsMobile = () => {
  return useMediaQuery(640);
};

export { MediaQueryProvider, MediaQueryConsumer, withMediaQuery, useMediaQuery, useIsMobile };
