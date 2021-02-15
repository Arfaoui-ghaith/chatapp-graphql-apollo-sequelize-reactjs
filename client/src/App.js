import React from 'react';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import DynamicRoutes from './utils/DynamicRoutes';

import './App.scss';

import { AuthProvider } from './context/auth';

function App() {


  return (
    <ApolloProvider>
    <AuthProvider>
    <Router>
    <React.Fragment>
      <DynamicRoutes exact path='/' component={Home} authenticated />
      <DynamicRoutes path='/register' component={Register} guest />
      <DynamicRoutes path='/login' component={Login} guest />
    </React.Fragment>
    </Router>
    </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
