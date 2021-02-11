import React from 'react';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import './App.scss';

function App() {


  return (
    <ApolloProvider>
    <Router>
    <React.Fragment>
      <Route path='/' component={Home}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
    </React.Fragment>
    </Router>
    </ApolloProvider>
  );
}

export default App;
