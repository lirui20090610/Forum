import React, { Component } from 'react';
import APPDrawer from './components/APPDrawer';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }


  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <APPDrawer />
          <Container>
            {/* <ItemModal /> */}
            {/* <ShoppingList /> */}
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
