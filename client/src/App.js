import React from 'react';
import ApolloProvider from './ApolloProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home/Home';
import DynamicRoutes from './utils/DynamicRoutes';

import './App.scss';

import { AuthProvider } from './context/auth';
import { MessageProvider } from './context/message';

function App() {


  return (
    <ApolloProvider>
      <AuthProvider>
        <MessageProvider>
          <Router>
            <Container className="pt-5">
              <Switch>
                <DynamicRoutes exact path='/' component={Home} authenticated />
                <DynamicRoutes path='/register' component={Register} guest />
                <DynamicRoutes path='/login' component={Login} guest />
              </Switch>
            </Container>
          </Router>
        </MessageProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
