import React from 'react';
import { removeToken } from './authenticate';

const User = React.createContext();

export const UserProvider = ({ user: payload, children }) => {
  const [user, setUser] = React.useState(payload || undefined);
  return <User.Provider value={[user, setUser]}>{children}</User.Provider>;
};

export const useGetUser = () => {
  return React.useContext(User)[0];
};

export const useHasUser = () => {
  return Boolean(React.useContext(User)[0]);
};

export const useLogout = () => {
  const setUser = React.useContext(User)[1];

  // Remove the user from the state and the token from cookies
  return () => {
    setUser();
    removeToken();
  };
};
