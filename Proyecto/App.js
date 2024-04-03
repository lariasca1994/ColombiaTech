import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import store from './store';
import client from './graphqlClient';
import Navbar from './components/Navbar';
import HouseList from './components/HouseList';
import UserList from './components/UserList';
import HouseForm from './components/HouseForm';
import UserForm from './components/UserForm';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container mx-auto px-4">
              <Switch>
                <Route exact path="/">
                  <HouseList />
                </Route>
                <Route path="/houses/new">
                  <HouseForm />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/users/new">
                  <UserForm />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </Provider>
  );
}

export default App;