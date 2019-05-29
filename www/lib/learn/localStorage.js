import React from 'react';

let isLocalStorageReady = false;

const storage = typeof window !== 'undefined' ? localStorage : { getItem: () => {} };

export const getStoredValue = key => {
  try {
    return JSON.parse(storage.getItem(key));
  } catch (e) {
    // Ignore invalid JSON from localStorage
  }
};

export const useLocalStorage = (key, reducer, initialState) => {
  const [isReady, setIsReady] = React.useState(isLocalStorageReady);
  const [state, dispatch] = React.useReducer(
    reducer,
    (isReady && getStoredValue(key)) || initialState
  );

  // Defer the usage of localStorage after the initial render to avoid unmatching content
  React.useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      isLocalStorageReady = true;

      const value = getStoredValue(key);

      dispatch({
        type: 'init',
        serverState: state,
        clientState: value
      });
    }
  }, [isReady]);

  React.useEffect(() => {
    const nextState = JSON.stringify(state);

    if (nextState !== undefined) {
      storage.setItem(key, nextState);
    } else {
      storage.removeItem(key);
    }
  }, [state]);

  return [state, dispatch];
};
