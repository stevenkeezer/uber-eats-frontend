import React from 'react';
import { useReactiveVar } from '@apollo/client';
import '../styles/styles.css';
import { isLoggedInVar } from '../apollo';
import { LoggedOutRouter } from '../routers/logged-out-router';
import { LoggedInRouter } from '../routers/logged-in-router';

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
};

export default App;
