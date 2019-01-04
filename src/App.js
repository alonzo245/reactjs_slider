import React from 'react';
import './App.scss';
import StoriesWidget from './containers/StoriesWidget/StoriesWidget';
import Layout from './hoc/Layout/Layout';

const App = () => (
  <div className="App">
    <Layout>
      <StoriesWidget />
    </Layout>
  </div>
);

export default App;