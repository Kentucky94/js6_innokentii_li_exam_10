import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from "./components/Layout/Layout";
import NewsPage from "./containers/NewsPage/NewsPage";
import AddNewsPage from "./containers/AddNewsPage/AddNewsPage";
import FullNewsPage from "./containers/FullNewsPage/FullNewsPage";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/' exact component={NewsPage} />
          <Route path='/news/add' exact component={AddNewsPage} />
          <Route path='/news/:id' exact component={FullNewsPage} />
          <Route render={() => <h3>NOT FOUND</h3>} />
        </Switch>
      </Layout>
    );
  }
}

export default App;